'use client'

import React, { useState, useEffect } from 'react'
import { PARAMETERS_CONFIG } from '@/config/profiler-parameters'
import { calculateOverallScore, classifyStage } from '@/utils/profiler-scores'
import SectionTabs from '@/components/profiler/SectionTabs'
import Section1BasicInfo from '@/components/profiler/sections/Section1BasicInfo'
import Section1Character from '@/components/profiler/sections/Section1Character'
import Section2CustomerDiscovery from '@/components/profiler/sections/Section2CustomerDiscovery'
import Section3ProductTRL from '@/components/profiler/sections/Section3ProductTRL'
import Section4Differentiation from '@/components/profiler/sections/Section4Differentiation'
import Section5Market from '@/components/profiler/sections/Section5Market'
import Section6BusinessModel from '@/components/profiler/sections/Section6BusinessModel'
import Section7Traction from '@/components/profiler/sections/Section7Traction'
import Section8Team from '@/components/profiler/sections/Section8Team'
import Section9Moats from '@/components/profiler/sections/Section9Moats'
import ProgressTracker from '@/components/profiler/ProgressTracker'
import { TeamProfile, TeamBaseSchema } from '@/types/profiler.types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Send, Rocket, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfilerStepProps {
  onComplete: (data: TeamProfile) => void
  onBack: () => void
  initialData?: Partial<TeamProfile>
}

export function ProfilerStep({ onComplete, onBack, initialData }: ProfilerStepProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  // Initialize with default values from schema
  const [localTeam, setLocalTeam] = useState<TeamProfile>(() => {
    const base = TeamBaseSchema.parse({})
    return {
      ...base,
      id: 'temp-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...initialData
    } as TeamProfile
  })

  const [saving, setSaving] = useState(false)

  function handleDataChange(field: string, value: any) {
    const nextTeam = { ...localTeam, [field]: value }
    const { stage, level } = classifyStage(nextTeam)
    const { overall } = calculateOverallScore(nextTeam)

    const updated = { 
      ...nextTeam, 
      detected_stage: stage,
      overall_weighted_score: overall,
      updated_at: new Date().toISOString()
    }
    
    setLocalTeam(updated)
    
    // Simulate auto-save feedback
    setSaving(true)
    setTimeout(() => setSaving(false), 500)
  }

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0: return <Section1BasicInfo team={localTeam} onChange={handleDataChange} />
      case 1: return <Section1Character data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 2: return <Section2CustomerDiscovery data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 3: return <Section3ProductTRL data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 4: return <Section4Differentiation data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 5: return <Section5Market data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 6: return <Section6BusinessModel data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 7: return <Section7Traction data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 8: return <Section8Team data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      case 9: return <Section9Moats data={localTeam} onChange={handleDataChange} readOnlyScores={true} />
      default: return <Section1BasicInfo team={localTeam} onChange={handleDataChange} />
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="w-fit gap-2 -ml-2 text-text-muted hover:text-text-primary"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Context Setup
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-navy tracking-tight">Startup <span className="text-accent">Profiler</span></h2>
            <p className="text-text-secondary font-medium">Map your venture across 9 critical strategic parameters.</p>
          </div>
          <div className="flex items-center gap-4">
             {saving && (
                <div className="flex items-center gap-2 text-smoke text-[9px] font-black uppercase tracking-wider bg-white px-4 py-2 rounded-full border border-rule shadow-sm">
                   <Save size={12} className="text-teal" /> Syncing...
                </div>
             )}
             <div className="bg-white border border-rule px-5 py-2.5 rounded-2xl flex flex-col items-end shadow-sm">
                <span className="text-[9px] font-black text-smoke uppercase tracking-wider">Baseline Score</span>
                <span className="text-xl font-black text-navy">{(localTeam.overall_weighted_score || 0).toFixed(1)}</span>
             </div>
          </div>
        </div>
      </div>

      <ProgressTracker team={localTeam} activeSection={activeTab} />

      <SectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-white rounded-[40px] border border-rule p-8 md:p-12 shadow-xl shadow-navy/5 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between bg-bg-surface p-6 rounded-3xl border border-rule">
        <Button
          variant="outline"
          onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
          disabled={activeTab === 0}
          className="h-14 px-8 rounded-2xl gap-3 border-rule text-navy font-bold uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft size={18} />
          Previous Phase
        </Button>

        {activeTab < 9 ? (
          <Button
            onClick={() => setActiveTab(activeTab + 1)}
            className="h-14 px-8 rounded-2xl gap-3 bg-navy text-gold hover:bg-navy/90 font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-navy/20"
          >
            Next Phase: P{activeTab + 1}
            <ChevronRight size={18} />
          </Button>
        ) : (
          <Button
            onClick={() => onComplete(localTeam)}
            className="h-14 px-10 rounded-2xl gap-3 bg-success text-bg-base hover:bg-success/90 font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-success/20"
          >
            <Send size={16} />
            Complete Profiling
          </Button>
        )}
      </div>
    </div>
  )
}
