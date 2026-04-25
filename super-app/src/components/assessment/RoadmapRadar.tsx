'use client'

import React from 'react'
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts'
import { useAssessmentStore } from '@/lib/store/assessment'
import { FRAMEWORKS } from '@/data/venture-readiness-data'

export function RoadmapRadar() {
  const { getFrameworkLevel } = useAssessmentStore()

  const data = Object.keys(FRAMEWORKS).map((id) => ({
    subject: id,
    level: getFrameworkLevel(id),
    fullMark: 9
  }))

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#888', fontSize: 12, fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 9]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Readiness"
            dataKey="level"
            stroke="var(--color-accent, #3fd0c9)"
            fill="var(--color-accent, #3fd0c9)"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
