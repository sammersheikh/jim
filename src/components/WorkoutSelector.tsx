"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const exercises = {
  chest: [
    { 
      id: 'chest-press',
      name: 'Dumbbell Chest Press',
      tips: [
        'Keep back flat against bench',
        'Feet firmly planted',
        'Control the weight',
        'Full range of motion'
      ]
    },
    { 
      id: 'incline-press',
      name: 'Incline Chest Press',
      tips: [
        'Set bench to 30-45 degrees',
        'Keep core tight',
        'Drive weights up smoothly',
        'Control descent'
      ]
    },
    { 
      id: 'incline-fly',
      name: 'Incline Fly',
      tips: [
        'Slight bend in elbows',
        'Wide arc movement',
        'Feel chest stretch',
        'Don\'t go too heavy'
      ]
    },
    { 
      id: 'close-grip',
      name: 'Close Grip Bench Press',
      tips: [
        'Elbows close to body',
        'Narrow grip width',
        'Focus on triceps',
        'Control the tempo'
      ]
    }
  ],
  shoulders: [
    { 
      id: 'shoulder-press',
      name: 'Shoulder Press',
      tips: [
        'Maintain neutral spine',
        'Drive up smoothly',
        'Full lockout',
        'Control descent'
      ]
    },
    { 
      id: 'lateral-raises',
      name: 'Lateral Raises',
      tips: [
        'Slight bend in elbows',
        'Lead with elbows',
        'Control the weight',
        'Don\'t swing'
      ]
    },
    { 
      id: 'frontal-raises',
      name: 'Frontal Raises',
      tips: [
        'Keep core tight',
        'Straight arm raise',
        'Control tempo',
        'Don\'t swing body'
      ]
    }
  ],
  triceps: [
    { 
      id: 'tricep-ext',
      name: 'Tricep Extensions',
      tips: [
        'Keep elbows still',
        'Full extension',
        'Control descent',
        'Feel the squeeze'
      ]
    },
    { 
      id: 'overhead-ext',
      name: 'Overhead Tricep Extension',
      tips: [
        'Keep elbows close',
        'Full range of motion',
        'Control the weight',
        'Don\'t arch back'
      ]
    },
    { 
      id: 'skull-crushers',
      name: 'Skull Crushers',
      tips: [
        'Keep elbows steady',
        'Lower to forehead',
        'Control the weight',
        'Full extension'
      ]
    }
  ]
};

const WorkoutSelector = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="space-y-4">
      {/* Selected Exercise Details Card - Appears between timer and buttons when exercise is selected */}
      {selectedExercise && (
        <Card className="w-full max-w-md p-6 bg-white shadow-xl">
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
              <h4 className="font-semibold text-gray-700 mb-2">Form Tips:</h4>
              <ul className="space-y-2">
                {selectedExercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-2"></span>
                    <span className="text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
              [Exercise GIF Placeholder]
            </div>
          </div>
        </Card>
      )}

      {/* Exercise Buttons */}
      <div className="space-y-4">
        {/* Chest Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-1">Chest</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.chest.map((exercise) => (
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

        {/* Shoulders Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-1">Shoulders</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.shoulders.map((exercise) => (
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

        {/* Triceps Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-1">Triceps</h3>
          <div className="flex flex-wrap gap-2">
            {exercises.triceps.map((exercise) => (
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