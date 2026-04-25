import React from 'react'
import { RoadmapRadar } from '@/components/assessment/RoadmapRadar'
import { MaturityGrid } from '@/components/assessment/MaturityGrid'
import { StoreHydrator } from '@/components/assessment/StoreHydrator'
import { getLatestReadinessAssessment } from '@/app/actions/assessment'
import { TrendingUp, Target, Zap, Clock, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Readiness Tracker | InUnity',
  description: 'Monitor your TRL, CRL, and IRL progress in real-time.',
}

export default async function TrackerPage() {
  const result = await getLatestReadinessAssessment()
  const latestAssessment = result.success ? result.data : null

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Sync Server Data to Client Store */}
      <StoreHydrator data={latestAssessment} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-accent" size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Performance Metrics</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-text">Maturity <span className="text-accent">Tracker</span></h1>
          <p className="text-text-muted mt-2 text-lg">Unified dashboard for TRL, BRL, CRL, MRL, and beyond.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-bg-surface border border-border rounded-[40px] p-8 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-widest text-text mb-6">Readiness Radar</h3>
              <RoadmapRadar />
              <div className="mt-8 pt-8 border-t border-border/50 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-text-muted">Overall Maturity</span>
                    <span className="text-2xl font-black tracking-tighter text-accent">
                      {latestAssessment?.stage || 'Idea Phase'}
                    </span>
                 </div>
                 <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[20%] rounded-full shadow-[0_0_10px_rgba(63,208,201,0.5)]" />
                 </div>
              </div>
           </div>

           <div className="bg-bg-surface border border-border rounded-3xl p-6">
              <h4 className="text-xs font-black uppercase tracking-widest mb-4">Milestone History</h4>
              <div className="space-y-4">
                 {latestAssessment ? (
                    <div className="flex gap-4">
                       <div className="w-1 h-12 bg-accent/20 rounded-full flex-shrink-0" />
                       <div>
                          <div className="text-[10px] font-black uppercase text-text-muted">Latest Assessment</div>
                          <div className="text-sm font-bold">Updated on {new Date(latestAssessment.updatedAt).toLocaleDateString()}</div>
                       </div>
                    </div>
                 ) : (
                    <p className="text-[10px] text-text-muted uppercase font-bold italic">No diagnostic history found</p>
                 )}
              </div>
           </div>
        </div>

        <MaturityGrid />
      </div>
    </div>
  )
}
