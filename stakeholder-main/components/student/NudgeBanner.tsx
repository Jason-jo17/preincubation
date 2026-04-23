// components/student/NudgeBanner.tsx
"use client"

import { useState } from "react"
import { AlertTriangle, Lock, Sparkles, X, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { NudgeResult } from "@/hooks/use-nudge"

// Map toolId → page path for navigation
const TOOL_PATHS: Record<string, string> = {
  mtp_ikigai: '/student/cofounder/trl-tracker',
  mind_map_5w1h: '/student/cofounder/trl-tracker',
  empathy_mapping: '/student/cofounder/trl-tracker',
  seven_whys: '/student/cofounder/trl-tracker',
  fishbone_diagram: '/student/cofounder/trl-tracker',
  event_pattern: '/student/cofounder/trl-tracker',
  stakeholder_mapping: '/student/cofounder/trl-tracker',
  interview_guide: '/student/cofounder/trl-tracker',
  interview_summary: '/student/cofounder/trl-tracker',
  affinity_mapping: '/student/cofounder/trl-tracker',
  persona_journey: '/student/cofounder/trl-tracker',
  vpc_builder: '/student/cofounder/trl-tracker',
  vpc_tool: '/student/cofounder/trl-tracker',
  errc_canvas: '/student/cofounder/trl-tracker',
  crazy8: '/student/cofounder/trl-tracker',
  sprint_decision_matrix: '/student/cofounder/trl-tracker',
  storyboarding: '/student/cofounder/trl-tracker',
}

interface Props {
  nudge: NudgeResult | null
  onDismiss?: () => void
  className?: string
}

export function NudgeBanner({ nudge, onDismiss, className = '' }: Props) {
  const [dismissed, setDismissed] = useState(false)
  const [hintsExpanded, setHintsExpanded] = useState(true)

  if (!nudge || nudge.nudgeType === 'CLEAR' || dismissed) return null

  const handleDismiss = () => { setDismissed(true); onDismiss?.() }

  // ── BLOCK ────────────────────────────────────────────────────────
  if (nudge.nudgeType === 'BLOCK') {
    return (
      <div className={`relative rounded-xl border-2 border-red-200 bg-red-50 p-4 ${className}`}>
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-2 bg-red-100 rounded-lg flex-shrink-0">
            <Lock className="h-5 w-5 text-red-600" />
          </div>
          <div className="space-y-3 flex-1 pr-6">
            <div>
              <p className="text-sm font-bold text-red-800">Prerequisite Required</p>
              <p className="text-sm text-red-700 mt-1 whitespace-pre-line leading-relaxed">
                {nudge.message}
              </p>
            </div>
            {nudge.blockedByToolId && (
              <Button size="sm" variant="destructive" className="h-7 text-xs gap-1.5" asChild>
                <Link href={TOOL_PATHS[nudge.blockedByToolId] || '/student/cofounder/trl-tracker'}>
                  Go to {nudge.blockedByToolName} <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── WARN ─────────────────────────────────────────────────────────
  if (nudge.nudgeType === 'WARN') {
    return (
      <div className={`relative rounded-xl border-2 border-amber-200 bg-amber-50 p-4 ${className}`}>
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-amber-400 hover:text-amber-600">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-2 bg-amber-100 rounded-lg flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div className="space-y-2 flex-1 pr-6">
            <p className="text-sm font-bold text-amber-800">Partial Prerequisites</p>
            <p className="text-sm text-amber-700 leading-relaxed">{nudge.message}</p>
            {nudge.fillHints && nudge.fillHints.length > 0 && (
              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Available context:</p>
                {nudge.fillHints.map((h, i) => (
                  <div key={i} className="text-xs bg-white/70 border border-amber-200 rounded px-2 py-1 text-amber-900">
                    <span className="font-semibold">{h.fieldName.replace(/_/g, ' ')}:</span> {h.hint}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── FILL_GUIDE ───────────────────────────────────────────────────
  if (nudge.nudgeType === 'FILL_GUIDE' && nudge.fillHints && nudge.fillHints.length > 0) {
    return (
      <div className={`rounded-xl border-2 border-blue-200 bg-blue-50 overflow-hidden ${className}`}>
        {/* Header — always visible, click to expand/collapse */}
        <button
          onClick={() => setHintsExpanded(p => !p)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-100/50 transition-colors"
        >
          <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-blue-800">✨ Fill Hints from Your Prior Work</p>
            <p className="text-[11px] text-blue-600">
              {nudge.fillHints.length} hint{nudge.fillHints.length !== 1 ? 's' : ''} from previous tools — use these to fill the fields below
            </p>
          </div>
          <div className="flex-shrink-0">
            {hintsExpanded ? (
              <ChevronUp className="h-4 w-4 text-blue-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-blue-400" />
            )}
          </div>
        </button>

        {/* Hints list — collapsible */}
        {hintsExpanded && (
          <div className="px-4 pb-4 space-y-2 border-t border-blue-200">
            <p className="text-[10px] text-blue-500 font-semibold pt-3 uppercase tracking-wider">
              Reference data from your earlier canvases:
            </p>
            {nudge.fillHints.map((hint, i) => (
              <div key={i} className="bg-white rounded-lg border border-blue-200 px-3 py-2.5 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                    {hint.fieldName.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[9px] text-blue-400 bg-blue-50 px-1.5 py-0.5 rounded">
                    ← {hint.sourceToolName}
                  </span>
                </div>
                <p className="text-xs text-blue-900 leading-relaxed">{hint.hint}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}
