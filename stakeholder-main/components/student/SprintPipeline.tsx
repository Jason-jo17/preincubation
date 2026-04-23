"use client"

import React, { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  Play,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Clock,
  UploadCloud,
  Layers,
  Trash2
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NudgeBanner } from './NudgeBanner'
import { TaskDialog } from './roadmap/TaskDialog'

import { useNudge } from '@/hooks/use-nudge'
import { useQueryClient } from "@tanstack/react-query"
import { SPRINT_REGISTRY } from '@/lib/sprint-registry'

interface SprintToolSubmission {
  id: string
  toolId: string
  toolName: string
  status: 'pending' | 'submitted' | 'gate_passed' | 'blocked'
  gateCheck: string
  isGateLevel: boolean
  trlContribution: string
  crlDimension?: string
  irlDimension?: string
  fillHintsAvailable: boolean
  resources: { title: string, url: string, type: string }[]
  iterationName?: string
  iterationNumber: number
  isDraft: boolean
  submittedAt?: string
}

interface Sprint {
  id: string
  sprintNumber: number
  name: string
  stageNumber: number
  weekRange: string
  trlGate: string
  crlIrlOutput: string
  status: 'locked' | 'active' | 'in_progress' | 'completed' | 'blocked'
  gateChecks: any[]
  toolSubmissions: SprintToolSubmission[]
}

export const SprintPipeline = () => {
  const router = useRouter()
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSprint, setSelectedSprint] = useState<number | null>(null)
  const { nudge, checkNudge, clearNudge } = useNudge()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedToolData, setSelectedToolData] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const [templates, setTemplates] = useState<any[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')

  const queryClient = useQueryClient()

  useEffect(() => {
    fetchSprints()
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/student/sprint-template')
      const data = await res.json()
      if (Array.isArray(data)) setTemplates(data)
    } catch (err) {
      console.error("Failed to fetch templates:", err)
    }
  }

  const fetchSprints = async () => {
    try {
      const res = await fetch('/api/student/sprint')
      const data = await res.json()
      if (data.sprints) {
        setSprints(data.sprints)
        // Auto-select the active or in-progress sprint
        const active = data.sprints.find((s: Sprint) => s.status === 'active' || s.status === 'in_progress')
        if (active) setSelectedSprint(active.sprintNumber)
      }
    } catch (err) {
      console.error("Failed to fetch sprints", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToolClick = async (toolId: string, submissionId?: string) => {
    const result = await checkNudge(toolId)

    // Find specific submission or default
    const submissions = currentSprint?.toolSubmissions.filter(t => t.toolId === toolId) || []
    const submission = submissionId 
      ? submissions.find(s => s.id === submissionId) 
      : submissions.sort((a, b) => b.iterationNumber - a.iterationNumber)[0]

    setSelectedToolData({ ...submission, toolId }) // Ensure toolId is there for registry lookup if needed

    // Sync URL slug
    router.push(`?tool=${toolId}${submissionId ? `&submission=${submissionId}` : ''}`, { scroll: false })

    // Open TaskDialog
    setDialogOpen(true)
  }

  const handleAddNewEntry = async (toolId: string) => {
    // This will be handled inside the ToolRunner/Save logic or we can pre-create?
    // User wants "Add Entry" to be explicit.
    // For now, let's just open the dialog with a flag to create new on save.
    const result = await checkNudge(toolId)
    setSelectedToolData({ toolId, createNew: true })
    setDialogOpen(true)
  }

  const handleApplyTemplate = async () => {
    if (!selectedTemplateId) return

    setIsUploading(true)
    try {
      const res = await fetch('/api/student/sprint/override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selectedTemplateId })
      })
      
      if (res.ok) {
        alert("Mentor Sprint Track applied successfully!")
        fetchSprints()
        queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] })
        setSelectedTemplateId('')
      } else {
        alert("Failed to apply Mentor Sprint Track.")
      }
    } catch (err) {
      console.error("Apply error:", err)
      alert("Failed to apply track.")
    } finally {
      setIsUploading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading Sprint Engine...</div>

  const stages = [
    { num: 1, name: "Stage 1: Problem Discovery", color: "bg-blue-500" },
    { num: 2, name: "Stage 2: Solution Thinking", color: "bg-purple-500" },
    { num: 3, name: "Stage 3: Prototype & Build", color: "bg-emerald-500" },
    { num: 4, name: "Stage 4: Pilot & Scale", color: "bg-orange-500" },
  ]

  const currentSprint = sprints.find(s => s.sprintNumber === selectedSprint)

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Overall Progress */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Sprint Engine v7.1</h2>
          <p className="text-muted-foreground">Stage Intelligence & Precision Roadmapping</p>
        </div>
        <div className="text-right">
          <div className="flex gap-1 mb-2">
            {sprints.map(s => (
              <div
                key={s.id}
                className={cn(
                  "h-2 w-8 rounded-full transition-all duration-500",
                  s.status === 'completed' ? "bg-emerald-500" :
                    s.status === 'in_progress' ? "bg-primary animate-pulse" :
                      s.status === 'active' ? "bg-primary/40" : "bg-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block text-right mb-4">
            {sprints.filter(s => s.status === 'completed').length} / 9 Sprints Completed
          </span>
          <div className="flex gap-2 items-center justify-end">
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
               <SelectTrigger className="w-[200px] h-8 text-[10px] font-bold uppercase">
                  <SelectValue placeholder="Select Mentor Track" />
               </SelectTrigger>
               <SelectContent>
                  {templates.map(t => (
                    <SelectItem key={t.id} value={t.id}>Sprint {t.sprintNumber}: {t.name}</SelectItem>
                  ))}
               </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 font-bold uppercase tracking-widest text-[10px] h-8"
              disabled={isUploading || !selectedTemplateId}
              onClick={handleApplyTemplate}
            >
              <CheckCircle2 className="h-4 w-4" /> 
              {isUploading ? "Applying..." : "Apply Track"}
            </Button>
          </div>
        </div>
      </div>

      {/* Nudge Banner for the overall sprint or currently selected tool */}
      {nudge && nudge.nudgeType !== 'CLEAR' && (
        <NudgeBanner nudge={nudge} className="mb-6 shadow-lg" />
      )}

      {/* The Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageSprints = sprints.filter(s => s.stageNumber === stage.num)

          return (
            <div key={stage.num} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-1 h-4 rounded-full", stage.color)} />
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  {stage.name}
                </h3>
              </div>

              <div className="space-y-2">
                {stageSprints.map((sprint) => (
                  <button
                    key={sprint.id}
                    onClick={() => setSelectedSprint(sprint.sprintNumber)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all duration-200 group flex items-center justify-between",
                      selectedSprint === sprint.sprintNumber
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                        : sprint.status === 'locked'
                          ? "opacity-60 grayscale hover:bg-muted/40 cursor-pointer"
                          : "hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                        sprint.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" :
                          sprint.status === 'in_progress' ? "border-primary text-primary animate-pulse" :
                            sprint.status === 'active' ? "border-primary text-primary" : "border-muted text-muted-foreground"
                      )}>
                        {sprint.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> :
                          sprint.status === 'locked' ? <Lock className="h-4 w-4" /> :
                            <span className="text-sm font-black">{sprint.sprintNumber}</span>}
                      </div>
                      <div className="overflow-hidden min-w-0 flex-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase leading-none mb-1">Sprint {sprint.sprintNumber}</p>
                        <h4 className="text-sm font-bold truncate leading-tight group-hover:text-primary transition-colors">{sprint.name}</h4>
                      </div>
                    </div>
                    {sprint.status !== 'locked' && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Sprint Details Panel */}
      {currentSprint && (
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase bg-primary text-white px-1.5 py-0.5 rounded">Sprint {currentSprint.sprintNumber}</span>
                  <CardTitle className="text-2xl font-black">{currentSprint.name}</CardTitle>
                </div>
                <CardDescription className="font-medium text-muted-foreground uppercase flex items-center gap-4">
                  <span>{currentSprint.weekRange}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] lowercase italic">{currentSprint.crlIrlOutput}</span>
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-muted-foreground uppercase mb-1">Completion Progress</div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={(currentSprint.toolSubmissions.filter(t => t.status !== 'pending').length / currentSprint.toolSubmissions.length) * 100}
                    className="w-32 h-2"
                  />
                  <span className="text-lg font-black italic">
                    {Math.round((currentSprint.toolSubmissions.filter(t => t.status !== 'pending').length / currentSprint.toolSubmissions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: TRL Gate Requirements */}
              <div className="md:col-span-4 p-6 bg-muted/30 border-r border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Play className="h-4 w-4 text-primary fill-primary" />
                  <h5 className="text-xs font-black uppercase tracking-widest leading-none">The Gate Mission</h5>
                </div>
                <div className="p-4 rounded-lg bg-background border-2 border-primary/10 shadow-sm mb-6">
                  <p className="text-sm font-bold leading-relaxed italic text-muted-foreground">
                    "{currentSprint.trlGate}"
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <h5 className="text-xs font-black uppercase tracking-widest leading-none">Gate Checklist (★)</h5>
                  </div>
                  <div className="space-y-2">
                    {currentSprint.toolSubmissions.filter(t => t.isGateLevel).map(tool => (
                      <div key={tool.id} className="flex items-start gap-2 p-2 rounded bg-background/50 border text-xs">
                        <div className={cn(
                          "mt-0.5 rounded-full p-0.5",
                          tool.status === 'gate_passed' || tool.status === 'submitted' ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                        )}>
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span className={cn(
                          "leading-tight font-medium",
                          tool.status === 'gate_passed' || tool.status === 'submitted' ? "text-foreground" : "text-muted-foreground"
                        )}>
                          ★ {tool.gateCheck}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Tools Pipeline */}
              <div className="md:col-span-8 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-black uppercase tracking-widest leading-none">Sprint Tools</h5>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Tools marked with ★ must be completed to unlock the next sprint.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-6">
                  {/* Group tools by SPRINT_REGISTRY definitions */}
                  {SPRINT_REGISTRY.find(s => s.sprintNumber === currentSprint.sprintNumber)?.tools.map((toolDef) => {
                    const submissions = currentSprint.toolSubmissions.filter(ts => ts.toolId === toolDef.toolId)
                    const isGatePassed = submissions.some(s => s.status === 'gate_passed')
                    const isSubmitted = submissions.some(s => s.status === 'submitted')
                    const hasDraft = submissions.some(s => s.isDraft)

                    return (
                      <div key={toolDef.toolId} className="space-y-3">
                        <div
                          className={cn(
                            "group p-4 rounded-xl border-2 transition-all flex items-center justify-between bg-card",
                            submissions.length === 0 ? "border-muted/50 opacity-80" :
                              isGatePassed ? "border-emerald-500/20 bg-emerald-500/5 shadow-sm" :
                                isSubmitted ? "border-primary/20 bg-primary/5" :
                                  "border-amber-500/20 bg-amber-500/5"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border",
                              submissions.length === 0 ? "bg-background text-muted-foreground" :
                                isGatePassed ? "bg-emerald-500 text-white border-emerald-600" :
                                  isSubmitted ? "bg-primary/20 text-primary border-primary/20" :
                                    "bg-amber-500/20 text-amber-600 border-amber-200"
                            )}>
                              {isGatePassed ? <CheckCircle2 className="h-5 w-5" /> :
                                submissions.length === 0 ? <Circle className="h-5 w-5" /> :
                                  <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />}
                            </div>
                            <div>
                              <h6 className="font-black text-lg leading-none mb-1">
                                {toolDef.isGateLevel && <span className="text-primary mr-1">★</span>}
                                {toolDef.toolName}
                              </h6>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase text-muted-foreground">
                                <span className="bg-primary/5 text-primary px-1.5 py-0.5 rounded italic">{toolDef.trlContribution}</span>
                                {toolDef.crlDimension && (
                                  <span className="text-primary/70">{toolDef.crlDimension.replace('_', ' ')}</span>
                                )}
                                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 uppercase">
                                  <Layers className="h-3 w-3" />
                                  <span>Data from: {toolDef.dataNeededFrom}</span>
                                </div>
                                {submissions.length > 0 && (
                                  <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{submissions.length} Entry{submissions.length > 1 ? 's' : ''}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                             {submissions.length === 0 ? (
                               <Button
                                 size="sm"
                                 className="font-bold uppercase tracking-widest text-[10px] h-8 shadow-sm"
                                 onClick={() => handleToolClick(toolDef.toolId)}
                               >
                                 Begin Tool
                               </Button>
                             ) : (
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="font-bold uppercase tracking-widest text-[10px] h-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all"
                                 onClick={() => handleAddNewEntry(toolDef.toolId)}
                               >
                                 Add New Entry
                               </Button>
                             )}
                          </div>
                        </div>

                        {/* Iterations List */}
                        {submissions.length > 0 && (
                          <div className="pl-14 space-y-2">
                            {submissions.sort((a, b) => b.iterationNumber - a.iterationNumber).map((sub) => (
                              <div 
                                key={sub.id} 
                                className="flex items-center justify-between p-2 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors group/sub"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    sub.status === 'gate_passed' ? "bg-emerald-500" :
                                    sub.isDraft ? "bg-amber-400" : "bg-primary"
                                  )} />
                                  <div>
                                    <p className="text-xs font-bold leading-none mb-0.5">
                                      {sub.iterationName || `Iteration ${sub.iterationNumber}`}
                                      {sub.isDraft && <span className="ml-2 text-[8px] bg-amber-100 text-amber-700 px-1 rounded uppercase tracking-tighter">Draft</span>}
                                    </p>
                                    <p className="text-[9px] text-muted-foreground uppercase flex items-center gap-2">
                                      <Clock className="h-2 w-2" />
                                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Work in progress'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-[9px] font-bold uppercase tracking-tighter opacity-0 group-hover/sub:opacity-100 transition-opacity"
                                    onClick={() => handleToolClick(toolDef.toolId, sub.id)}
                                  >
                                    Open
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover/sub:opacity-100 transition-opacity"
                                    onClick={async () => {
                                      if (confirm("Are you sure you want to delete this entry?")) {
                                        const res = await fetch(`/api/student/sprint/active/submission/${sub.id}`, {
                                          method: 'DELETE'
                                        });
                                         if (res.ok) {
                                           await fetchSprints();
                                           router.refresh();
                                         }
                                      }
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {currentSprint.status === 'completed' ? (
                  <div className="bg-emerald-500 text-white p-4 rounded-xl flex items-center justify-between shadow-lg animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8" />
                      <div>
                        <h4 className="font-black text-xl leading-none mb-1">Sprint Accomplished!</h4>
                        <p className="text-xs font-bold uppercase opacity-80">Next phase ready for deployment</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="font-black uppercase tracking-tighter italic"
                      onClick={() => setSelectedSprint(currentSprint.sprintNumber + 1)}
                    >
                      Next Sprint <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : currentSprint.toolSubmissions.every(t => t.status !== 'pending') && (
                  <div className="bg-amber-500 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8" />
                      <div>
                        <h4 className="font-black text-xl leading-none mb-1">Awaiting Expert Review</h4>
                        <p className="text-xs font-bold uppercase opacity-80">All tools submitted, waiting for gate seal of approval</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedToolData && (
        <TaskDialog
          tool={selectedToolData}
          progress={currentSprint?.toolSubmissions.find(t => t.toolId === selectedToolData.toolId)}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          nudge={nudge}
          readOnly={currentSprint?.status === 'locked'}
          onTaskUpdated={() => {
            fetchSprints()
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] })
          }}
        />
      )}


    </div>
  )
}
