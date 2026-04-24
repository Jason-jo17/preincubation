'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import ScoreDots from './ScoreDots'
import type { TeamProfile } from '@/types/profiler.types'

interface Question {
  id: string
  label: string
  type: 'text' | 'number' | 'select' | 'team'
  placeholder?: string
  description?: string
  example?: string
  options?: readonly string[]
}

interface DiagnosticFieldProps {
  parameterId: string
  question: Question
  data: TeamProfile
  onChange: (field: string, value: any) => void
  readOnlyScores?: boolean
}

export default function DiagnosticField({
  parameterId,
  question,
  data,
  onChange,
  readOnlyScores = false,
}: DiagnosticFieldProps) {
  const fieldKey = `${parameterId}_${question.id}` as keyof TeamProfile
  const scoreKey = `${parameterId}_${question.id}_score` as keyof TeamProfile
  const value = (data[fieldKey] as string | number) ?? ''
  const score = (data[scoreKey] as number) ?? 0

  return (
    <div className="space-y-3 bg-white border border-rule p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative">
      {/* Header */}
      <div className="flex justify-between items-start">
        <label className="text-[10px] font-black text-navy uppercase tracking-widest flex items-center gap-2 pl-1">
          {question.label}
        </label>
        {!readOnlyScores && question.type !== 'select' && question.type !== 'team' && (
          <ScoreDots
            value={score}
            onChange={(val) => onChange(String(scoreKey), val)}
            readOnly={readOnlyScores}
          />
        )}
        {readOnlyScores && score > 0 && (
          <span className="text-[10px] font-black text-accent uppercase tracking-widest">
            {score}/5
          </span>
        )}
      </div>

      {/* Description */}
      {question.description && (
        <p className="text-[10px] text-slate-400 font-medium pl-1 leading-relaxed">
          {question.description}
        </p>
      )}

      {/* Input */}
      {question.type === 'text' && (
        <textarea
          value={String(value)}
          onChange={(e) => onChange(String(fieldKey), e.target.value)}
          placeholder={question.placeholder || ''}
          rows={3}
          className="w-full bg-smoke/50 border border-transparent rounded-xl p-4 text-sm text-navy focus:bg-white focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none resize-none transition-all font-medium leading-relaxed"
        />
      )}

      {question.type === 'number' && (
        <input
          type="number"
          value={value === 0 ? '' : String(value)}
          onChange={(e) => onChange(String(fieldKey), parseFloat(e.target.value) || 0)}
          placeholder={question.placeholder || '0'}
          className="w-full bg-smoke/50 border border-transparent rounded-xl p-4 text-sm text-navy focus:bg-white focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-medium"
        />
      )}

      {question.type === 'select' && (
        <div className="relative">
          <select
            value={String(value)}
            onChange={(e) => onChange(String(fieldKey), e.target.value)}
            className="w-full bg-smoke/50 border border-transparent rounded-xl p-4 text-sm text-navy focus:bg-white focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none appearance-none transition-all"
          >
            <option value="" disabled>Select an option...</option>
            {question.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-silver">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      )}

      {/* Example hint */}
      {question.example && !readOnlyScores && (
        <details className="group/hint">
          <summary className="text-[9px] font-black text-slate-300 uppercase tracking-widest cursor-pointer hover:text-slate-500 transition-colors list-none flex items-center gap-1.5 pl-1">
            <span className="text-[8px]">▶</span> See example
          </summary>
          <p className="mt-2 text-[10px] text-slate-400 font-medium italic pl-1 border-l-2 border-slate-100 leading-relaxed">
            {question.example}
          </p>
        </details>
      )}
    </div>
  )
}
