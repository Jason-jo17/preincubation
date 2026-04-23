"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, ArrowRight, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function KPIProgress({ onNavigate, profile }: { onNavigate?: (tab: string) => void, profile?: any }) {
    const stages = ["Ideation", "Validation", "Development", "GTM"]
    const [currentStageIdx, setCurrentStageIdx] = useState(1) // Default: Validation

    const getStageKpis = (stageIdx: number) => {
        const stageNum = stageIdx + 1
        
        if (!profile?.sprints || profile.sprints.length === 0) {
            return [{
                title: "Loading Sprints",
                status: "pending",
                tool: "Awaiting mapping",
                link: "#",
                date: "Pending",
                type: "none"
            }]
        }

        const stageSprints = profile.sprints.filter((s: any) => s.stageNumber === stageNum)
        
        if (stageSprints.length === 0) {
             return [{
                title: `Stage ${stageNum} Locked`,
                status: "pending",
                tool: "Complete prior stages",
                link: "#",
                date: "Locked",
                type: "none"
            }]
        }

        const kpis: any[] = []
        stageSprints.forEach((sprint: any) => {
            sprint.toolSubmissions?.forEach((tool: any) => {
                kpis.push({
                    title: tool.toolName,
                    status: tool.status === 'gate_passed' || tool.status === 'submitted' ? 'completed' : tool.status === 'pending' ? 'pending' : 'in-progress',
                    tool: sprint.name,
                    link: "roadmap",
                    date: tool.status === 'pending' ? 'Pending' : tool.status === 'gate_passed' ? 'Approved' : 'In Progress',
                    type: "tab",
                    progress: tool.status === 'in_progress' ? 50 : 0
                })
            })
        })

        return kpis
    }

    const kpis = getStageKpis(currentStageIdx)

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 mb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Current Stage & KPIs
                </CardTitle>
                <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-1 py-0.5">
                    <Button
                        suppressHydrationWarning
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-emerald-700 hover:text-emerald-800 hover:bg-emerald-200 dark:text-emerald-400"
                        onClick={() => setCurrentStageIdx(Math.max(0, currentStageIdx - 1))}
                        disabled={currentStageIdx === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap px-1">
                        Stage: {stages[currentStageIdx]}
                    </div>
                    <Button
                        suppressHydrationWarning
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-emerald-700 hover:text-emerald-800 hover:bg-emerald-200 dark:text-emerald-400"
                        onClick={() => setCurrentStageIdx(Math.min(stages.length - 1, currentStageIdx + 1))}
                        disabled={currentStageIdx === stages.length - 1}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {kpis.map((kpi, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors relative group overflow-hidden">
                            {kpi.status === 'in-progress' && kpi.progress && (
                                <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: `${kpi.progress}%` }} />
                            )}
                            <div className="mt-0.5 z-10">
                                {kpi.status === 'completed' ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : kpi.status === 'in-progress' ? (
                                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground/30" />
                                )}
                            </div>
                            <div className="flex-1 space-y-1 z-10 w-full">
                                <div className="flex items-center justify-between w-full">
                                    <p className={`text-sm font-medium ${kpi.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                                        {kpi.title}
                                    </p>
                                    <span className="text-xs text-muted-foreground ml-2">{kpi.date}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-muted-foreground">Via: {kpi.tool}</p>
                                    {kpi.status !== 'pending' && kpi.type !== 'none' && (
                                        kpi.type === 'tab' ? (
                                            <Button
                                                suppressHydrationWarning
                                                variant="ghost"
                                                size="sm"
                                                className="h-auto p-0 px-2 text-xs text-primary hover:bg-transparent hover:text-primary/80 transition-colors cursor-pointer"
                                                onClick={() => onNavigate && onNavigate(kpi.link)}
                                            >
                                                Edit / View <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        ) : (
                                            <Button
                                                suppressHydrationWarning
                                                variant="ghost"
                                                size="sm"
                                                className="h-auto p-0 px-2 text-xs text-primary hover:bg-transparent hover:text-primary/80 transition-colors"
                                                asChild
                                            >
                                                <Link href={kpi.link}>
                                                    Edit / View <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
