"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, CheckCircle, Clock, ArrowRight, FileText, Sparkles, AlertTriangle, Trash2 } from "lucide-react"
import { useState } from "react"

interface ToolCardProps {
    tool: any
    progress: any
    submissions?: any[]
    onStart: (toolId: string) => void
    onOpen: (toolId: string, submissionId?: string) => void
    isStageLocked: boolean
    isAdmin?: boolean
    isUnlocked?: boolean
    nudgeStatus?: { nudgeType: 'BLOCK' | 'WARN' | 'FILL_GUIDE' | 'CLEAR', message?: string }
}

export function ToolCard({ 
    tool, 
    progress, 
    submissions = [], 
    onStart, 
    onOpen, 
    isStageLocked, 
    isAdmin = false,
    isUnlocked = false,
    nudgeStatus: propNudgeStatus
}: ToolCardProps) {
    const status = (isAdmin || isUnlocked)
        ? "unlocked"
        : (progress?.status || (tool.isLocked || isStageLocked ? "locked" : "unlocked"))

    const totalTasks = tool.tasks.length
    const completedTasks = progress?.taskProgress
        ?.filter((tp: any) => tp.status === "approved" || tp.status === "submitted").length || 0
    const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    const nudgeType = propNudgeStatus?.nudgeType

    const nudgeBadge = nudgeType === 'BLOCK'
        ? <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
            <Lock className="h-2.5 w-2.5" /> Prereq needed
        </span>
        : nudgeType === 'WARN'
            ? <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                <AlertTriangle className="h-2.5 w-2.5" /> Partial prereqs
            </span>
            : nudgeType === 'FILL_GUIDE'
                ? <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                    <Sparkles className="h-2.5 w-2.5" /> Hints ready
                </span>
                : null

    return (
        <Card
            className={`relative ${status === 'locked' ? 'opacity-75 bg-muted/50' : ''}`}
        >
            {status === 'locked' && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/10 z-10">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
            )}

            <CardHeader className="dir-col pb-2">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                    <Badge variant={
                        status === 'completed' ? 'default' :
                            status === 'in_progress' ? 'secondary' : 'outline'
                    }>
                        {status.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                        {nudgeBadge}
                        <span className="text-xs text-muted-foreground">Week {tool.week}</span>
                    </div>
                </div>
                <CardTitle className="text-lg leading-tight mt-2">{tool.name}</CardTitle>
            </CardHeader>

            <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>

                {status !== 'locked' && (
                    <div className="mt-4 space-y-3">
                        {submissions.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-slate-100 mt-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Past Entries</span>
                                <div className="max-h-[80px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                    {submissions.map((sub: any) => (
                                        <div key={sub.id} className="flex gap-1 group/item">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onOpen(tool.toolId, sub.id)
                                                }}
                                                className="flex-1 text-left p-1.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors text-[11px] flex justify-between items-center group"
                                            >
                                                <span className="truncate font-medium text-slate-600 group-hover:text-indigo-600">
                                                    {sub.iterationName || `Entry ${sub.iterationNumber}`}
                                                </span>
                                                {sub.isDraft && <span className="text-[9px] bg-slate-200 px-1 rounded">Draft</span>}
                                            </button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    if(confirm("Delete this entry?")) {
                                                        const res = await fetch(`/api/student/sprint/active/submission/${sub.id}`, { method: 'DELETE' });
                                                        if(res.ok) window.location.reload();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{Math.round(percent)}%</span>
                            </div>
                            <Progress value={percent} className="h-2" />
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-2">
                {(status === 'unlocked' || !progress) ? (
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={() => isAdmin ? onOpen(tool.toolId) : onStart(tool.toolId)}
                        disabled={status === 'locked' && !isAdmin && !isUnlocked}
                        variant={nudgeType === 'BLOCK' && !isAdmin && !isUnlocked ? 'outline' : 'default'}
                    >
                        {nudgeType === 'BLOCK' && !isAdmin && !isUnlocked
                            ? <><Lock className="mr-2 h-3.5 w-3.5" /> Prereq Required</>
                            : <>{isAdmin ? 'Test Tool' : (isUnlocked ? 'Use Tool' : 'Start Tool')} <ArrowRight className="ml-2 h-4 w-4" /></>
                        }
                    </Button>
                ) : (
                        <Button
                            size="sm"
                            variant={status === 'completed' ? "outline" : "default"}
                            className="w-full"
                            onClick={() => onOpen(tool.toolId)}
                        >
                            {status === 'completed' ? 'Review Work' : 'Continue'}
                            <FileText className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
