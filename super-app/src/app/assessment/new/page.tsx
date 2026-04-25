import React from 'react'
import { AssessmentHub } from '@/components/assessment/AssessmentHub'

export const metadata = {
  title: 'New Assessment | InUnity Venture Readiness',
  description: 'Complete the 8-pillar diagnostic to map your venture roadmap.',
}

export default function NewAssessmentPage() {
  return (
    <main className="min-h-screen bg-bg-base pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
            V3 Diagnostic System
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-text">Venture Readiness Diagnostic</h1>
        <p className="text-text-muted mt-2">Evaluate your startup across 8 frameworks to generate your growth roadmap.</p>
      </div>

      <AssessmentHub />
    </main>
  )
}
