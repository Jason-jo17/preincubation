"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export function ProgressTrackerAnalytics({ profile }: { profile?: any }) {
    
    let totalTools = 0
    let completedTools = 0
    let currentStage = 1

    if (profile?.sprints) {
        profile.sprints.forEach((sprint: any) => {
            if (sprint.status === 'in_progress' || sprint.status === 'active') {
                currentStage = sprint.stageNumber
            }
            sprint.toolSubmissions?.forEach((tool: any) => {
                totalTools++
                if (tool.status !== 'pending') {
                    completedTools++
                }
            })
        })
    }

    const overallProgress = totalTools > 0 ? Math.round((completedTools / totalTools) * 100) : 0

    return (
        <Card className="col-span-12 md:col-span-8 h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    Overall Progression
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
                <div className="relative flex items-center justify-center w-48 h-48">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-slate-700"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={80 * 2 * Math.PI}
                            strokeDashoffset={80 * 2 * Math.PI - (overallProgress / 100) * (80 * 2 * Math.PI)}
                            className="text-emerald-400 transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-white">{overallProgress}%</span>
                        <span className="text-sm font-medium text-slate-400 mt-1">Completed</span>
                    </div>
                </div>

                <div className="w-full flex justify-around mt-8 text-center bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div>
                        <p className="text-xl font-bold text-emerald-400">{completedTools}</p>
                        <p className="text-xs text-slate-400 font-medium">Tools Utilized</p>
                    </div>
                    <div className="w-px h-8 bg-slate-700"></div>
                    <div>
                        <p className="text-xl font-bold text-white">{totalTools}</p>
                        <p className="text-xs text-slate-400 font-medium">Required Tools</p>
                    </div>
                    <div className="w-px h-8 bg-slate-700"></div>
                    <div>
                        <p className="text-xl font-bold text-white">{currentStage}</p>
                        <p className="text-xs text-slate-400 font-medium">Current Stage</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
