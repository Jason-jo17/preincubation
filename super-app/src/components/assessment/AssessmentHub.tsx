'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAssessmentStore, FrameworkId } from '@/lib/store/assessment'
import { FRAMEWORKS, STAGES } from '@/data/venture-readiness-data'
import { AssessmentRubric } from './AssessmentRubric'
import { RoadmapRadar } from './RoadmapRadar'
import { cn } from '@/lib/utils'
import { ChevronRight, LayoutDashboard, Target, Zap, TrendingUp, Save } from 'lucide-react'
import { saveReadinessAssessment } from '@/app/actions/assessment'

export function AssessmentHub() {
  const { 
    activeFrameworkId, 
    activeLevelIndex, 
    setActiveFramework, 
    setActiveLevel,
    getFrameworkLevel,
    getOverallStage
  } = useAssessmentStore()

  const currentFramework = FRAMEWORKS[activeFrameworkId]
  const overallStage = getOverallStage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 max-w-[1600px] mx-auto">
      {/* Left Sidebar: Framework Selector */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <LayoutDashboard className="text-accent" size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest text-text">Frameworks</h2>
          </div>
          
          <div className="space-y-2">
            {(Object.keys(FRAMEWORKS) as FrameworkId[]).map((id) => {
              const fw = FRAMEWORKS[id]
              const currentLvl = getFrameworkLevel(id)
              const isActive = activeFrameworkId === id
              
              return (
                <button
                  key={id}
                  onClick={() => setActiveFramework(id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all border",
                    isActive 
                      ? "bg-accent/10 border-accent text-text shadow-sm" 
                      : "bg-transparent border-transparent text-text-muted hover:bg-bg-base hover:border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-8 rounded-full" 
                      style={{ backgroundColor: fw.color }} 
                    />
                    <div className="text-left">
                      <div className="text-[11px] font-black uppercase tracking-wider">{id}</div>
                      <div className="text-xs font-bold truncate max-w-[120px]">{fw.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-black tracking-tighter">{currentLvl}</div>
                    <div className="text-[9px] font-black uppercase opacity-40">Level</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-accent" size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest text-text">Visual Map</h2>
          </div>
          <RoadmapRadar />
          <div className="mt-4 pt-4 border-t border-border/50 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">
              Detected Stage
            </div>
            <div className="text-3xl font-black tracking-tighter text-accent italic">
              {overallStage}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-8">
        {/* Framework Header */}
        <motion.div 
          key={activeFrameworkId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-surface border border-border rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <div className="text-9xl font-black italic">{activeFrameworkId}</div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-1 rounded-full" 
                style={{ backgroundColor: currentFramework.color }} 
              />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                {currentFramework.name}
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-text mb-4">
              {currentFramework.name}
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {currentFramework.short}
            </p>
          </div>
        </motion.div>

        {/* Level Selector Slider */}
        <div className="bg-bg-surface border border-border rounded-2xl p-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {[...Array(9)].map((_, i) => {
              const isActive = activeLevelIndex === i
              const isAchieved = getFrameworkLevel(activeFrameworkId) > i
              
              return (
                <button
                  key={i}
                  onClick={() => setActiveLevel(i)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl transition-all border-2",
                    isActive
                      ? "bg-accent text-bg-base border-accent shadow-lg shadow-accent/20"
                      : isAchieved
                        ? "bg-green-500/10 border-green-500/50 text-green-500"
                        : "bg-bg-base border-border text-text-muted hover:border-accent/50"
                  )}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Level</span>
                  <span className="text-2xl font-black tracking-tighter leading-none mt-1">0{i+1}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Rubric View */}
        <motion.div
          key={`${activeFrameworkId}-${activeLevelIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bg-surface border border-border rounded-3xl p-8"
        >
          <AssessmentRubric frameworkId={activeFrameworkId} levelIndex={activeLevelIndex} />
        </motion.div>

        {/* Save Action */}
        <div className="flex justify-end gap-4">
           <button 
             onClick={async () => {
               const state = useAssessmentStore.getState()
               const levels: any = {}
               Object.keys(FRAMEWORKS).forEach(id => {
                 levels[id] = state.getFrameworkLevel(id)
               })
               
               const res = await saveReadinessAssessment({
                 scores: state.scores,
                 levels,
                 stage: state.getOverallStage()
               })
               
               if (res.success) {
                 alert("Assessment Saved!")
               } else {
                 alert("Error: " + res.error)
               }
             }}
             className="flex items-center gap-2 px-8 py-4 bg-accent text-bg-base rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20"
           >
             <Save size={20} />
             Save Assessment
           </button>
        </div>
      </div>
    </div>
  )
}
