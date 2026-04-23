// components/student/NudgeBlockModal.tsx
"use client"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { NudgeResult } from "@/hooks/use-nudge"

interface Props {
  open: boolean
  onClose: () => void
  nudge: NudgeResult
  requestedToolName: string
}

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
  errc_canvas: '/student/cofounder/trl-tracker',
  crazy8: '/student/cofounder/trl-tracker',
}

export function NudgeBlockModal({ open, onClose, nudge, requestedToolName }: Props) {
  // Parse the message to show structured steps
  const lines = nudge.message.split('\n').filter(Boolean)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Lock className="h-7 w-7 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Prerequisite Required</DialogTitle>
              <DialogDescription className="text-sm mt-0.5">
                "{requestedToolName}" needs prior work first
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* What's needed */}
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {lines.map((line, i) => (
                  <p key={i} className="text-sm text-red-800 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Blocked-by tool card */}
          {nudge.blockedByToolId && nudge.blockedByToolName && (
            <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                Complete this first:
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-800 font-black text-sm">1</span>
                  </div>
                  <span className="font-semibold text-sm text-amber-900">{nudge.blockedByToolName}</span>
                </div>
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white h-8 text-xs gap-1.5 flex-shrink-0"
                  asChild
                  onClick={onClose}
                >
                  <Link href={TOOL_PATHS[nudge.blockedByToolId] || '/student/cofounder/trl-tracker'}>
                    Open Tool <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Why this matters */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <span>
              The InUnity Sprint Engine requires tools to build on each other.
              Each canvas feeds real data into the next — skipping steps means your later work
              won't have the evidence base it needs for gate checks.
            </span>
          </div>

          <Button variant="outline" className="w-full" onClick={onClose}>
            Got it — I'll complete the prerequisite first
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
