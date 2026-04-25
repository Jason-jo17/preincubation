"use client";

import React from 'react'
import { useAssessmentStore } from '@/lib/store/assessment'
import { FRAMEWORKS } from '@/data/venture-readiness-data'
import { Target, ChevronRight } from 'lucide-react'

export function MaturityGrid() {
  const { getFrameworkLevel } = useAssessmentStore()

  return (
    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.keys(FRAMEWORKS).map(id => {
        const level = getFrameworkLevel(id)
        const progress = Math.round((level / 9) * 100)
        
        return (
          <div key={id} className="bg-bg-surface border border-border rounded-[32px] p-6 hover:border-accent/40 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-50 mb-1">{id} Level</div>
                <div className="text-4xl font-black tracking-tighter text-text">0{level}</div>
              </div>
              <div className="p-3 rounded-2xl bg-bg-base border border-border group-hover:text-accent transition-colors">
                <Target size={24} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span>Progress</span>
                <span className="text-accent">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-bg-base rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <button className="w-full py-3 rounded-xl bg-bg-base border border-border text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-bg-base transition-all flex items-center justify-center gap-2">
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
