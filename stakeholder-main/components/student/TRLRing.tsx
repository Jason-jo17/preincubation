"use client"

import React from 'react'
import { cn } from "@/lib/utils"

interface TRLRingProps {
  level: number // 1-9
  size?: number
  strokeWidth?: number
  className?: string
}

export const TRLRing = ({ 
  level, 
  size = 120, 
  strokeWidth = 10,
  className 
}: TRLRingProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (level / 9) * 100
  const offset = circumference - (progress / 100) * circumference

  // TRL Color Mapping
  const getColor = (lvl: number) => {
    if (lvl <= 2) return "text-blue-500" // Stage 1
    if (lvl <= 4) return "text-purple-500" // Stage 2
    if (lvl <= 6) return "text-emerald-500" // Stage 3
    return "text-orange-500" // Stage 4
  }

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Circle */}
        <circle
          className="text-muted/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className={cn("transition-all duration-700 ease-in-out", getColor(level))}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">TRL</span>
        <span className="text-3xl font-bold leading-none">{level}</span>
      </div>
    </div>
  )
}
