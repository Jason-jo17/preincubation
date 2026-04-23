'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Info, Search, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRubricForTool, CRL_IRL_RUBRIC, scoreRubric, type RubricCriterion } from '@/lib/tool-rubric'
import { SubmissionDisplay } from './SubmissionDisplay'

interface ToolRubricProps {
  submissionId: string
  submissionType: 'SprintToolSubmission' | 'CRLEvidence' | 'IRLEvidence'
  toolId?: string
  toolName?: string
  gateCheck?: string          // from SprintToolSubmission.gateCheck
  submittedData?: any
  currentAiScore?: number     // from CRL/IRL aiScore
  assessmentNotes?: string    // AI feedback
  criterionScores?: Record<string, number>  // AI-generated per-criterion scores
  onApprove: (data: ReviewPayload) => void
  onReject: (data: ReviewPayload) => void
  isSubmitting?: boolean
}

export interface ReviewPayload {
  submissionId: string
  type: string
  status: 'approved' | 'rejected'
  managerScore: number
  managerNotes: string
  rubricScores: Record<string, number>  // criterionId â†’ score
  rubricChecks?: Array<{ label: string; passed: boolean; note: string }>
}

export function RubricPanel({
  submissionId, submissionType, toolId, toolName, gateCheck,
  submittedData, currentAiScore, assessmentNotes: initialAiNotes, criterionScores, onApprove, onReject, isSubmitting
}: ToolRubricProps) {

  const isCRLIRL = submissionType === 'CRLEvidence' || submissionType === 'IRLEvidence'
  const staticCriteria: RubricCriterion[] = isCRLIRL
    ? CRL_IRL_RUBRIC
    : getRubricForTool(toolId || '')

  const [criteria, setCriteria] = useState<RubricCriterion[]>(staticCriteria)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [showData, setShowData] = useState(false)
  const [loadingRubric, setLoadingRubric] = useState(!isCRLIRL && !!toolId)
  const [aiNotes, setAiNotes] = useState(initialAiNotes)
  const [assessing, setAssessing] = useState(false)

  // Fetch dynamic rubric if exists
  useEffect(() => {
    if (isCRLIRL || !toolId) return

    async function fetchCustomRubric() {
      try {
        const res = await fetch(`/api/admin/rubrics`)
        if (res.ok) {
          const allRubrics = await res.json()
          const custom = allRubrics.find((r: any) => r.toolId === toolId)
          if (custom) {
            setCriteria(custom.criteria)
            // Re-initialize scores for new criteria
            const init: Record<string, number> = {}
            custom.criteria.forEach((c: any) => {
              init[c.id] = criterionScores?.[c.id] ?? 0
            })
            setScores(init)
          } else {
            // Fallback already set in state initialization
            const init: Record<string, number> = {}
            staticCriteria.forEach(c => {
              init[c.id] = criterionScores?.[c.id] ?? 0
            })
            setScores(init)
          }
        }
      } catch (e) {
        console.error("Failed to fetch custom rubric:", e)
      } finally {
        setLoadingRubric(false)
      }
    }

    fetchCustomRubric()
  }, [toolId, isCRLIRL, criterionScores])

  // Initial scores for static/CRLIRL case
  useEffect(() => {
    if (isCRLIRL || !toolId) {
      const init: Record<string, number> = {}
      staticCriteria.forEach(c => {
        init[c.id] = criterionScores?.[c.id] ?? 0
      })
      setScores(init)
    }
  }, [isCRLIRL, toolId, criterionScores])

  const totalScore = scoreRubric(scores, criteria)

  const handleAiAssess = async () => {
      setAssessing(true)
      try {
          const res = await fetch(`/api/manager/review/${submissionId}/assess`, { method: 'POST' })
          if (res.ok) {
              const data = await res.json()
              setAiNotes(data.aiResult.notes + "\n\nFEEDBACK: " + data.aiResult.feedback)
              // Update scores based on AI criteria bits
              const updatedScores = { ...scores }
              criteria.forEach((c, idx) => {
                  if (data.aiResult.criteriaPass[idx]) {
                      updatedScores[c.id] = c.maxPoints
                  } else {
                      updatedScores[c.id] = 0
                  }
              })
              setScores(updatedScores)
          }
      } catch (e) {
          console.error("AI Assess error:", e)
      } finally {
          setAssessing(false)
      }
  }

  const buildPayload = (status: 'approved' | 'rejected'): ReviewPayload => ({
    submissionId,
    type: submissionType,
    status,
    managerScore: totalScore,
    managerNotes: notes,
    rubricScores: scores,
    rubricChecks: gateCheck
      ? [{ label: gateCheck, passed: status === 'approved', note: notes }]
      : undefined
  })

  return (
    <div className="space-y-5">

      {/* Gate Check â€” for SprintToolSubmissions */}
      {gateCheck && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-0.5">
              Gate Check Requirement
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300">{gateCheck}</p>
          </div>
        </div>
      )}

      {/* AI Assessment Area */}
      {(!isCRLIRL || currentAiScore !== undefined) && (
        <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/20">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">AI Assistant</span>
                    {assessing && <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                </div>
                <div className="flex items-center gap-3">
                    {currentAiScore !== undefined && (
                        <Badge className={cn(
                            'text-sm font-bold',
                            currentAiScore >= 65 ? 'bg-green-100 text-green-700 border-green-200' :
                            currentAiScore >= 45 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-red-100 text-red-700 border-red-200'
                        )}>
                            {currentAiScore}/100
                        </Badge>
                    )}
                    {!isCRLIRL && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-[9px] font-black uppercase tracking-widest bg-white"
                            onClick={handleAiAssess}
                            disabled={assessing}
                        >
                            {assessing ? "Assessing..." : "Run AI Assess"}
                        </Button>
                    )}
                </div>
            </div>

            {aiNotes && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 italic leading-relaxed">
                    <div className="flex items-center gap-1.5 mb-1.5 opacity-60">
                        <Scale className="h-3 w-3" />
                        <span className="font-black uppercase tracking-tighter text-[9px]">GenAI Evaluation Summary</span>
                    </div>
                    {aiNotes}
                </div>
            )}
        </div>
      )}

      {/* Rubric Criteria â€” scored by manager */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Rubric {loadingRubric ? '(Loading...)' : `(${criteria.length} criteria)`}
          </Label>
          <span className={cn(
            'text-lg font-black italic',
            totalScore >= 70 ? 'text-emerald-600' :
            totalScore >= 50 ? 'text-amber-600' : 'text-red-500'
          )}>
            {totalScore}/100
          </span>
        </div>

        <div className="space-y-4">
          {loadingRubric ? (
            <div className="space-y-3">
              <div className="h-12 bg-muted animate-pulse rounded" />
              <div className="h-12 bg-muted animate-pulse rounded" />
            </div>
          ) : criteria.length === 0 ? (
            <p className="text-xs text-muted-foreground italic text-center py-2">No rubric criteria available.</p>
          ) : (
            criteria.map(c => (
            <div key={c.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{c.label}</span>
                  <span className="text-[10px] text-muted-foreground">({c.maxPoints} pts)</span>
                </div>
                <span className={cn(
                  'text-sm font-bold',
                  scores[c.id] >= c.maxPoints * 0.7 ? 'text-emerald-600' :
                  scores[c.id] >= c.maxPoints * 0.4 ? 'text-amber-600' : 'text-red-500'
                )}>
                  {scores[c.id]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <Info className="h-3 w-3 mt-0.5 shrink-0" /> {c.description}
              </p>
              <Slider
                min={0}
                max={c.maxPoints}
                step={1}
                value={[scores[c.id]]}
                onValueChange={([v]) => setScores(prev => ({ ...prev, [c.id]: v }))}
              />
            </div>
          ))
        )}
      </div>
    </div>

      {/* Student Entry Review Section */}
      {submittedData && (
        <Card className="border-2 border-primary/10 overflow-hidden shadow-sm">
          <Button
            variant="ghost" 
            size="sm"
            className={cn(
                "w-full justify-between h-10 px-4 text-xs font-black uppercase tracking-widest transition-colors",
                showData ? "bg-primary text-white hover:bg-primary/90 rounded-none" : "hover:bg-primary/5"
            )}
            onClick={() => setShowData(!showData)}
          >
            <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                {showData ? "Close Entry Preview" : "Review Student Entry"}
            </div>
            {showData ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
          {showData && (
            <div className="p-6 bg-white max-h-[500px] overflow-y-auto border-t">
               <SubmissionDisplay 
                toolId={toolId} 
                toolName={toolName} 
                data={submittedData} 
               />
            </div>
          )}
        </Card>
      )}

      {/* Manager Notes */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Feedback to Student
        </Label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Specific improvement guidance â€” what exactly needs to change, and what good looks like..."
          className="min-h-[90px] text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <Button
          onClick={() => onApprove(buildPayload('approved'))}
          disabled={isSubmitting}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold h-11"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Approve {totalScore >= 70 ? '' : `(${totalScore}/100)`}
        </Button>
        <Button
          onClick={() => onReject(buildPayload('rejected'))}
          disabled={isSubmitting || !notes.trim()}
          variant="destructive"
          className="flex-1 font-bold h-11"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Request Rework
        </Button>
      </div>
      {!notes.trim() && (
        <p className="text-[11px] text-muted-foreground text-center -mt-2">
          Add feedback notes to enable rejection
        </p>
      )}
    </div>
  )
}
