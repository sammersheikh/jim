"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';

const WorkoutTimer = () => {
  const [mainTime, setMainTime] = useState(0);
  const [restTime, setRestTime] = useState(45);
  const [exerciseTransitionTime, setExerciseTransitionTime] = useState(90);
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [isTransitionRunning, setIsTransitionRunning] = useState(false);
  const [restActive, setRestActive] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);
  const [setCount, setSetCount] = useState(0);
  
  const audioRef = useRef(new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hwFwpGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVq3n77NqGgY+ltryxnMpBSl+zPLaizsIGGS57OihUg8MUqji8LVnGwU6k9jzyn4uBSZ5yfDckEILFF+16+uocBcKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmUgND1at5++zah8T1pePxdCTt0tZw3lN6/7hmmP8qnL7wY4kXrS/9+ihaRgJQ5rf88B1KAQsfcvx3Y89CRVjtuvqpVUOC1Gm4/C2aRwFOpLX88t+LgUleMnw3ZFDCxRftevqqHAXCkaf4PK+bCEFMYfR89OCMwYebsDv45lIDQ9Wref1ymIndK7Can+/uyI8p5DIwpR3G5O7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvspWYQB0Cd4PK/cCMFMYfR89OCMwYebsDv45lIDQ9Wref0y2IgcKu9Z32+vCU9qZLIwpR3G5O7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2IgcKu9Zn2+uiQ6pJHGwZN1G5S7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2IgcKu9Zn2+uiQ6pJHGwZN1G5S7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2IgcKu9Zn2+uiQ6pJHGwZN1G5S7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2IgcKu9Zn2+uiQ6pJHGwZN1G5S7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2IgcKu9Zn2+uiQ6pJHGwZN1G5S7y9dHfIHa/u6gXBYGOZPY88p9LQUleMnw3ZBCChRftuvsp2oUDEml4e+6bB8GM4nS89GEMwYebsDv45lIDQ9Wref0y2Ig')); 

  useEffect(() => {
    let interval;
    if (isMainRunning) {
      interval = setInterval(() => {
        setMainTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMainRunning]);

  useEffect(() => {
    let interval;
    if (isRestRunning && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prevTime => {
          if (prevTime <= 1) {
            setIsRestRunning(false);
            if (isSoundEnabled) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
            setIsJumping(true);
            setJumpCount(0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestRunning, isSoundEnabled]);

  useEffect(() => {
    let interval;
    if (isTransitionRunning && exerciseTransitionTime > 0) {
      interval = setInterval(() => {
        setExerciseTransitionTime(prevTime => {
          if (prevTime <= 1) {
            setIsTransitionRunning(false);
            if (isSoundEnabled) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
            setIsJumping(true);
            setJumpCount(0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTransitionRunning, isSoundEnabled]);

  useEffect(() => {
    if (isJumping && jumpCount < 3) {
      const timeout = setTimeout(() => {
        setJumpCount(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (jumpCount >= 3) {
      setIsJumping(false);
      setJumpCount(0);
      if (restTime === 0) {
        handleDismissRest();
        setSetCount(prev => prev + 1);
      }
      if (exerciseTransitionTime === 0) {
        handleDismissTransition();
        setSetCount(1);
      }
    }
  }, [isJumping, jumpCount, restTime, exerciseTransitionTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isMainRunning && mainTime === 0) {
      setSetCount(1);
    }
    setIsMainRunning(!isMainRunning);
  };

  const handleSetEnded = () => {
    setRestActive(true);
    setIsRestRunning(true);
    setRestTime(45);
  };

  const handleExerciseComplete = () => {
    setTransitionActive(true);
    setIsTransitionRunning(true);
    setExerciseTransitionTime(90);
  };

  const handleReset = () => {
    setMainTime(0);
    setRestTime(45);
    setExerciseTransitionTime(90);
    setIsMainRunning(false);
    setIsRestRunning(false);
    setIsTransitionRunning(false);
    setRestActive(false);
    setTransitionActive(false);
    setIsJumping(false);
    setJumpCount(0);
    setSetCount(0);
  };

  const handleDismissRest = () => {
    setRestActive(false);
    setIsRestRunning(false);
    setRestTime(45);
  };

  const handleDismissTransition = () => {
    setTransitionActive(false);
    setIsTransitionRunning(false);
    setExerciseTransitionTime(90);
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const getTimerStyles = (time, isActive, type) => {
    const baseStyles = "font-bold font-mono mb-4 transition-all duration-200";
    
    if (time <= 5) {
      return `${baseStyles} text-6xl text-red-600 transform ${
        (jumpCount % 2 === 0) ? 'scale-125' : 'scale-100'
      }`;
    }
    
    const colors = {
      rest: "text-blue-600",
      transition: "text-purple-600"
    };
    
    return `${baseStyles} text-5xl ${colors[type]}`;
  };

  const TimerDisplay = ({ 
    title, 
    time, 
    isActive, 
    type, 
    onDismiss 
  }) => (
    <div className="relative text-center bg-gray-50 p-4 rounded-lg shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDismiss}
        className="absolute top-1 right-1 h-8 w-8 hover:bg-gray-200 transition-colors"
      >
        <X size={16} />
      </Button>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className={getTimerStyles(time, isActive, type)}>
        {formatTime(time)}
      </div>
    </div>
  );

  return (
    <Card className="w-full p-4 bg-white shadow-xl mb-4">
      <div>
        {/* Header with Set Counter and Sound Button */}
        <div className="flex justify-between items-center">
          {setCount > 0 && (
            <div className="text-sm font-semibold text-gray-600">
              Set {setCount}
            </div>
          )}
          <div className="flex-1"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="h-8 w-8"
          >
            {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
        </div>

        {/* Title and Timer */}
        <div className="text-center -mt-2">
          <h2 className="text-lg font-semibold mb-2">Workout Timer</h2>
          <div className="text-6xl font-bold font-mono">
            {formatTime(mainTime)}
          </div>
        </div>
      </div>

      {/* Secondary Timers */}
      <div className="space-y-2 mt-2">
        {restActive && (
          <TimerDisplay
            title="Set Rest"
            time={restTime}
            isActive={restActive}
            type="rest"
            onDismiss={handleDismissRest}
          />
        )}

        {transitionActive && (
          <TimerDisplay
            title="Exercise Transition"
            time={exerciseTransitionTime}
            isActive={transitionActive}
            type="transition"
            onDismiss={handleDismissTransition}
          />
        )}
      </div>

      {/* Control Buttons */}
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