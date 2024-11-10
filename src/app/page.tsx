"use client"

import WorkoutTimer from '@/components/WorkoutTimer'
import WorkoutSelector from '@/components/WorkoutSelector'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col px-4 pt-12">
      {/* Title section - reduced top spacing */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1">jim</h1>
        <p className="text-gray-500">Just-In-time Interval Manager</p>
      </div>
      
      {/* Main content - centered with less spacing */}
      <div className="flex flex-col items-center max-w-md mx-auto w-full">
        <WorkoutTimer />
        <WorkoutSelector />
      </div>
    </div>
  )
}