"use client"

import WorkoutTimer from '@/components/WorkoutTimer'
import WorkoutSelector from '@/components/WorkoutSelector'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col px-4 pt-6 md:pt-12">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-4xl font-bold mb-1">jim</h1>
        <p className="text-muted-foreground">Just-In-time Interval Manager</p>
      </div>
      
      <div className="flex flex-col items-center max-w-md mx-auto w-full">
        <WorkoutTimer />
        <WorkoutSelector />
      </div>
    </div>
  )
}