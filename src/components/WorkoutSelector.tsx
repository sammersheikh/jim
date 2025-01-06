"use client"

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

type Exercise = {
  id: string;
  name: string;
  tips: string[];
  gifUrl: string;
};

const exercises = {
  push: [
    { 
      id: 'incline-press',
      name: 'Incline DB Press',
      tips: [
        'Set bench to 30-45 degrees',
        'Keep core tight',
        'Drive weights up smoothly',
        'Control descent',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/incline-press.gif'
    },
    { 
      id: 'bench-press',
      name: 'Flat DB Press',
      tips: [
        'Keep back flat on bench',
        'Feet firmly planted',
        'Control the weight',
        'Full range of motion',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/chest-press.gif'
    },
    { 
      id: 'db-fly',
      name: 'Dumbbell Flys',
      tips: [
        'Slight bend in elbows',
        'Wide arc movement',
        'Feel chest stretch',
        'Control the weight',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/incline-fly.gif'
    },
    { 
      id: 'shoulder-press',
      name: 'DB Overhead Press',
      tips: [
        'Maintain neutral spine',
        'Drive up smoothly',
        'Full lockout',
        'Control descent',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/shoulder-press.gif'
    },
    { 
      id: 'tricep-ext',
      name: 'Overhead Tricep Ext',
      tips: [
        'Keep elbows close',
        'Full extension',
        'Control descent',
        'Feel tricep stretch',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/tricep-ext.gif'
    },
    { 
      id: 'side-raise',
      name: 'DB Lateral Raises',
      tips: [
        'Slight bend in elbows',
        'Lead with elbows',
        'Control movement',
        'Don\'t swing',
        'Sets: 3 × 12-15'
      ],
      gifUrl: '/gifs/lateral-raises.gif'
    }
  ],
  pull: [
    {
      id: 'single-row',
      name: 'Single Arm DB Row',
      tips: [
        'Support on bench',
        'Keep back straight',
        'Pull to hip',
        'Control descent',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/barbell-row.gif'
    },
    {
      id: 'bent-fly',
      name: 'Bent Over Flies',
      tips: [
        'Hinge at hips',
        'Slight elbow bend',
        'Squeeze rear delts',
        'Control movement',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/face-pull.gif'
    },
    {
      id: 'db-shrug',
      name: 'DB Shrugs',
      tips: [
        'Shoulders back',
        'Lift straight up',
        'Hold at top',
        'Control descent',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/db-shrug.gif'
    },
    {
      id: 'bicep-curl',
      name: 'DB Bicep Curls',
      tips: [
        'Keep elbows still',
        'Full range of motion',
        'Control the weight',
        'Squeeze at top',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/bicep-curl.gif'
    },
    {
      id: 'hammer-curl',
      name: 'Hammer Curls',
      tips: [
        'Keep elbows tucked',
        'Neutral grip',
        'Control movement',
        'Full range',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/hammer-curl.gif'
    }
  ],
  legs: [
    {
      id: 'bulgarian-split',
      name: 'Bulgarian Split Squat',
      tips: [
        'Back foot elevated',
        'Front foot forward',
        'Control descent',
        'Keep chest up',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/bulgarian-split.gif'
    },
    {
      id: 'goblet-squat',
      name: 'Goblet Squat',
      tips: [
        'Hold DB at chest',
        'Keep chest up',
        'Break parallel',
        'Control descent',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/goblet-squat.gif'
    },
    {
      id: 'walking-lunge',
      name: 'Walking Lunges',
      tips: [
        'Step forward naturally',
        'Keep torso upright',
        'Control movement',
        'Alternate legs',
        'Sets: 3 × 10-12'
      ],
      gifUrl: '/gifs/walking-lunge.gif'
    },
    {
      id: 'rdl',
      name: 'Romanian Deadlift',
      tips: [
        'Hinge at hips',
        'Soft knee bend',
        'Feel hamstring stretch',
        'Keep back straight',
        'Sets: 3 × 8-12'
      ],
      gifUrl: '/gifs/rdl.gif'
    }
  ]
};

const loadTenor = () => {
  if (window.Tenor) {
    window.Tenor.promote();
  }
};

const WorkoutSelector = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    
    script.onload = () => {
      loadTenor();
    };
    
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    loadTenor();
  }, [selectedExercise]);

  return (
    <div className="space-y-4">
      {selectedExercise && (
        <Card className="w-full max-w-md p-6 bg-card text-card-foreground">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => setSelectedExercise(null)}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Form Tips:</h4>
              <ul className="space-y-2">
                {selectedExercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2 mr-2"></span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            {selectedExercise?.gifUrl && (
              <Image 
                src={selectedExercise.gifUrl}
                alt={`${selectedExercise.name} demonstration`}
                width={400}
                height={300}
                className="rounded-lg w-full"
                unoptimized
              />
            )}
          </div>
        </Card>
      )}

      {/* Exercise Buttons */}
      <div className="space-y-4">
        {/* Push Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">Push</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.push.map((exercise) => (
              <Button
                key={exercise.id}
                variant={selectedExercise?.id === exercise.id ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedExercise(exercise)}
              >
                {exercise.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Pull Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">Pull</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.pull.map((exercise) => (
              <Button
                key={exercise.id}
                variant={selectedExercise?.id === exercise.id ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedExercise(exercise)}
              >
                {exercise.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Legs Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">Legs</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.legs.map((exercise) => (
              <Button
                key={exercise.id}
                variant={selectedExercise?.id === exercise.id ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedExercise(exercise)}
              >
                {exercise.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSelector;