"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Minus, TrendingUp, Save, Loader2 } from "lucide-react"
import { saveToolData } from '@/app/actions/roadmap'
import { RecordValueDialog } from "@/components/student/RecordValueDialog"

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function PerceivedValueTool({ tool, progress, onDataSaved, readOnly }: Props) {
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const data = {
                metrics,
                feedbacks,
                overallScore: 84 // From component UI
            }
            const res = await saveToolData(tool.toolId, data)
            if (res?.error) {
                console.error('Save failed:', res.error)
            } else {
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            console.error('Save error:', e)
        } finally {
            setSaving(false)
        }
    }

    // Mock Data
    const metrics = [
        { name: "Ease of Use", score: 85, trend: "up" },
        { name: "Problem Solving", score: 92, trend: "up" },
        { name: "Cost Efficiency", score: 70, trend: "stable" },
        { name: "Support Quality", score: 88, trend: "up" }
    ]

    const feedbacks = [
        { stakeholder: "Ramesh Fisheres", comment: "This solution really helps me save ice costs.", sentiment: "positive" },
        { stakeholder: "Local Panchayat", comment: "Implementation was a bit slow, but good outcome.", sentiment: "neutral" },
        { stakeholder: "Health Worker", comment: "Very intuitive interface.", sentiment: "positive" }
    ]

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/20 p-4 rounded-xl border">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Stakeholder Perceived Value
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Analysis of how stakeholders perceive the value of your deployed solutions.
                    </p>
                </div>
                <div className="flex gap-2">
                    <RecordValueDialog />
                    {!readOnly && (
                        <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Sync Metrics Snapshot
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Value Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl border-t">
                        <div className="text-6xl font-black text-emerald-600 mb-2">84<span className="text-2xl text-muted-foreground">/100</span></div>
                        <div className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+5% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Key Value Drivers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {metrics.map((m, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-semibold">{m.name}</span>
                                    <span className="font-black text-primary">{m.score}%</span>
                                </div>
                                <Progress value={m.score} className="h-2.5" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-muted-foreground" /> Direct Feedback Log
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {feedbacks.map((f, i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors shadow-sm cursor-default">
                        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                            <p className="text-sm font-medium italic text-foreground leading-relaxed">"{f.comment}"</p>
                            <div className="flex justify-between items-center pt-3 border-t">
                                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{f.stakeholder}</span>
                                <div className={`p-1.5 rounded-full ${f.sentiment === 'positive' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : f.sentiment === 'negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'}`}>
                                    {f.sentiment === 'positive' && <ThumbsUp className="h-3 w-3" />}
                                    {f.sentiment === 'neutral' && <Minus className="h-3 w-3" />}
                                    {f.sentiment === 'negative' && <ThumbsDown className="h-3 w-3" />}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
