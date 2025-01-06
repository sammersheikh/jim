"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';

interface TimerDisplayProps {
  title: string;
  time: number;
  isActive: boolean;
  type?: 'rest' | 'exercise';
  onDismiss?: () => void;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const getTimerStyles = (time: number, isActive: boolean, type?: 'rest' | 'exercise'): string => {
  const baseStyles = "text-6xl font-mono";
  if (type === 'rest') return `${baseStyles} text-blue-500`;
  if (type === 'exercise') return `${baseStyles} text-purple-500`;
  return baseStyles;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  title, 
  time, 
  isActive, 
  type, 
  onDismiss 
}) => (
  <div className="relative text-center bg-card p-4 rounded-lg shadow-sm">
    {onDismiss && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onDismiss}
        className="absolute top-1 right-1 h-8 w-8 hover:bg-accent transition-colors"
      >
        <X size={16} />
      </Button>
    )}
    <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
    <div className={getTimerStyles(time, isActive, type)}>
      {formatTime(time)}
    </div>
  </div>
);

const WorkoutTimer = () => {
  const [mainTime, setMainTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    // Only create audio element if running in browser
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.src = '/timer-end.mp3';
      // Preload the audio file
      audio.load();
      audioRef.current = audio;
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMainRunning) {
      interval = setInterval(() => {
        setMainTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMainRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRestRunning && restTime > 0) {
      hasIncrementedRef.current = false;
      interval = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1 && !hasIncrementedRef.current) {
            setIsRestRunning(false);
            playSound();
            hasIncrementedRef.current = true;
            setCurrentSet(curr => curr + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestRunning, restTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExerciseRunning && exerciseTime > 0) {
      hasIncrementedRef.current = false;
      interval = setInterval(() => {
        setExerciseTime(prev => {
          if (prev <= 1 && !hasIncrementedRef.current) {
            setIsExerciseRunning(false);
            playSound();
            hasIncrementedRef.current = true;
            setCurrentSet(1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseRunning, exerciseTime]);

  const handleStartStop = () => {
    setIsMainRunning(!isMainRunning);
  };

  const handleReset = () => {
    setMainTime(0);
    setIsMainRunning(false);
    setRestTime(0);
    setIsRestRunning(false);
    setExerciseTime(0);
    setIsExerciseRunning(false);
    setCurrentSet(1);
    hasIncrementedRef.current = false;
  };

  const handleSetEnded = () => {
    setRestTime(45);
    setIsRestRunning(true);
  };

  const handleExerciseComplete = () => {
    setExerciseTime(85);
    setIsExerciseRunning(true);
  };

  const playSound = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  };

  return (
    <Card className="w-full max-w-md p-4 md:p-6 bg-card text-card-foreground">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">Workout Timer</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="h-8 w-8"
        >
          {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </Button>
      </div>

      <div className="space-y-4 mb-4">
        <div className="text-center">
          <div className="text-sm font-medium mb-1">Set {currentSet}</div>
          <div className="text-6xl md:text-7xl font-mono">
            {formatTime(mainTime)}
          </div>
        </div>

        {restTime > 0 && (
          <TimerDisplay
            title="Rest Timer"
            time={restTime}
            isActive={isRestRunning}
            type="rest"
            onDismiss={() => setRestTime(0)}
          />
        )}

        {exerciseTime > 0 && (
          <TimerDisplay
            title="Exercise Timer"
            time={exerciseTime}
            isActive={isExerciseRunning}
            type="exercise"
            onDismiss={() => setExerciseTime(0)}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button 
          className="h-12 text-base font-semibold"
          onClick={handleStartStop}
        >
          {isMainRunning ? (
            <><Pause className="mr-2" size={20} /> Pause</>
          ) : (
            <><Play className="mr-2" size={20} /> Start</>
          )}
        </Button>

        <Button
          className="h-12 text-base font-semibold"
          variant="destructive"
          onClick={handleReset}
        >
          <RotateCcw className="mr-2" size={20} /> Reset
        </Button>

        <Button
          className="h-12 text-base font-semibold"
          variant="outline"
          onClick={handleSetEnded}
        >
          <Timer className="mr-2" size={20} /> Set Rest (45s)
        </Button>

        <Button
          className="h-12 text-base font-semibold"
          variant="secondary"
          onClick={handleExerciseComplete}
        >
          <Timer className="mr-2" size={20} /> Next Exercise
        </Button>
      </div>
    </Card>
  );
};

export default WorkoutTimer;