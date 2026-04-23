"use client"

import React from 'react'
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts'
import { cn } from "@/lib/utils"

interface BandRadarProps {
  currentTRL: number
  currentCRL: number
  currentIRL: number
  targetBands: {
    crlMin: number
    crlMax: number
    irlMin: number
    irlMax: number
  }
  className?: string
}

export const BandRadar = ({ 
  currentTRL, 
  currentCRL, 
  currentIRL, 
  targetBands,
  className 
}: BandRadarProps) => {
  // Normalize TRL to 0-100 scale for radar visualization
  const data = [
    { subject: 'TRL (Tech)', value: (currentTRL / 9) * 100, fullMark: 100 },
    { subject: 'CRL (Comm)', value: currentCRL, fullMark: 100 },
    { subject: 'IRL (Inno)', value: currentIRL, fullMark: 100 },
  ]

  // Calculate status
  const crlStatus = currentCRL < targetBands.crlMin ? "behind" : currentCRL > targetBands.crlMax ? "ahead" : "aligned"
  const irlStatus = currentIRL < targetBands.irlMin ? "behind" : currentIRL > targetBands.irlMax ? "ahead" : "aligned"

  return (
    <div className={cn("flex flex-col items-center justify-center p-4 bg-card rounded-xl border", className)}>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false} 
            />
            
            {/* Target Area (Band) - Simplified as one triangle */}
            <Radar
              name="Target Band"
              dataKey="fullMark"
              stroke="transparent"
              fill="var(--primary)"
              fillOpacity={0.05}
            />

            {/* Current Values */}
            <Radar
              name="Current"
              dataKey="value"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full mt-4 text-center">
        <div>
          <p className="text-[10px] uppercase text-muted-foreground font-bold">Tech (TRL)</p>
          <p className="text-xl font-bold">{currentTRL}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground font-bold">Comm (CRL)</p>
          <div className="flex flex-col items-center">
             <p className="text-xl font-bold">{currentCRL}%</p>
             <span className={cn(
               "text-[9px] px-1.5 rounded-full",
               crlStatus === "behind" ? "bg-red-500/10 text-red-500" : 
               crlStatus === "ahead" ? "bg-blue-500/10 text-blue-500" :
               "bg-emerald-500/10 text-emerald-500"
             )}>
               {crlStatus.toUpperCase()}
             </span>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground font-bold">Inno (IRL)</p>
          <div className="flex flex-col items-center">
             <p className="text-xl font-bold">{currentIRL}%</p>
             <span className={cn(
               "text-[9px] px-1.5 rounded-full",
               irlStatus === "behind" ? "bg-red-500/10 text-red-500" : 
               irlStatus === "ahead" ? "bg-blue-500/10 text-blue-500" :
               "bg-emerald-500/10 text-emerald-500"
             )}>
               {irlStatus.toUpperCase()}
             </span>
          </div>
        </div>
      </div>
    </div>
  )
}
