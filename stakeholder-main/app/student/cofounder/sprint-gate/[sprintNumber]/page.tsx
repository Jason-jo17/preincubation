"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
    CheckCircle2, 
    XCircle, 
    ChevronRight, 
    Loader2, 
    AlertTriangle, 
    Info, 
    ExternalLink,
    Flag
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import Link from "next/link"

interface GateCheck {
    checkId: string
    label: string
    passed: boolean
    confirmedAt?: string
}

interface SprintTool {
    id: string
    toolId: string
    toolName: string
    status: string
    gateCheck: string
    isGateLevel: boolean
}

interface Nudge {
    id: string
    nudgeType: 'BLOCK' | 'WARN' | 'FILL_GUIDE'
    targetToolId: string
    targetToolName: string
    message: string
}

export default function SprintGatePage({ params }: { params: Promise<{ sprintNumber: string }> }) {
    const resolvedParams = use(params)
    const sprintNumber = parseInt(resolvedParams.sprintNumber)
    const router = useRouter()
    const queryClient = useQueryClient()
    const [trl4Confirmed, setTrl4Confirmed] = useState<Record<string, boolean>>({})

    // 1. Fetch Sprint Data
    const { data: sprintData, isLoading: isSprintLoading } = useQuery({
        queryKey: ['student-sprint', sprintNumber],
        queryFn: async () => {
            const res = await fetch('/api/student/sprint')
            const data = await res.json()
            return data.sprints.find((s: any) => s.sprintNumber === sprintNumber)
        }
    })

    // 2. Fetch Active Nudges
    const { data: nudges, isLoading: isNudgesLoading } = useQuery({
        queryKey: ['student-nudges'],
        queryFn: async () => {
            const res = await fetch('/api/student/nudge')
            return res.json()
        }
    })

    const completeMutation = useMutation({
        mutationFn: async (payload: any) => {
            const res = await fetch(`/api/student/sprint/${sprintNumber}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            if (!res.ok) throw new Error('Failed to complete sprint')
            return res.json()
        },
        onSuccess: (data) => {
            if (data.sprintCompleted) {
                toast.success("Sprint completed! Next level unlocked.")
                router.push('/student/cofounder')
            } else {
                toast.success("Checklist updated.")
            }
            queryClient.invalidateQueries({ queryKey: ['student-sprint'] })
        }
    })

    if (isSprintLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin h-8 w-8" /></div>
    if (!sprintData) return <div className="p-8">Sprint not found</div>

    const gateChecks: GateCheck[] = sprintData.gateChecks || []
    const tools: SprintTool[] = sprintData.toolSubmissions || []
    const allPassed = gateChecks.every(c => c.passed) && (sprintNumber !== 9 || Object.values(trl4Confirmed).filter(Boolean).length === 4)

    const handleComplete = () => {
        completeMutation.mutate({ 
            status: 'completed',
            trl4Criteria: sprintNumber === 9 ? trl4Confirmed : undefined
        })
    }

    const getNudgeColor = (type: string) => {
        switch (type) {
            case 'BLOCK': return 'bg-red-500/10 border-red-500/20 text-red-600'
            case 'WARN': return 'bg-amber-500/10 border-amber-500/20 text-amber-600'
            case 'FILL_GUIDE': return 'bg-blue-500/10 border-blue-500/20 text-blue-600'
            default: return 'bg-gray-500/10 border-gray-500/20 text-gray-600'
        }
    }

    return (
        <div className="container py-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-black uppercase tracking-widest text-[10px]">Sprint {sprintNumber}</Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">{sprintData.trlGate}</Badge>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter italic text-primary uppercase">{sprintData.name}</h1>
                    <p className="text-muted-foreground mt-2 font-medium">Verification Gateway Checklist</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Target Milestone</div>
                    <div className="text-xl font-black italic text-indigo-600">{sprintData.crlIrlOutput}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Checklist */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/5">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Flag className="h-5 w-5 text-primary" />
                                Execution Evidence
                            </CardTitle>
                            <CardDescription>All gate-level tools must be submitted and pass review to proceed.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-primary/5">
                                {tools.map((tool) => {
                                    const check = gateChecks.find(gc => gc.checkId === tool.toolId)
                                    return (
                                        <div key={tool.id} className="p-6 flex items-start justify-between hover:bg-primary/[0.02] transition-colors">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-lg tracking-tight">{tool.toolName}</span>
                                                    {tool.isGateLevel && <Badge className="bg-indigo-500 text-[10px] h-4">GATE</Badge>}
                                                </div>
                                                <p className="text-sm text-muted-foreground italic">&ldquo;{tool.gateCheck}&rdquo;</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {tool.status === 'gate_passed' || check?.passed ? (
                                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold flex items-center gap-1">
                                                            <CheckCircle2 className="h-3 w-3" /> Gate Passed
                                                        </Badge>
                                                    ) : tool.status === 'blocked' ? (
                                                        <Badge variant="destructive" className="font-bold flex items-center gap-1">
                                                            <XCircle className="h-3 w-3" /> Blocked
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="font-bold">
                                                            {tool.status === 'submitted' ? 'Review Pending' : 'Action Required'}
                                                        </Badge>
                                                    )}
                                                    {check?.confirmedAt && (
                                                        <span className="text-[10px] text-muted-foreground">Passed on {format(new Date(check.confirmedAt), 'MMM d')}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/student/roadmap/tool/${tool.toolId}`}>
                                                    <Button variant="outline" size="sm" className="font-bold h-8 text-xs">
                                                        View Tool <ChevronRight className="ml-1 h-3 w-3" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sprint 9: TRL 4 Criteria */}
                    {sprintNumber === 9 && (
                        <Card className="border-none shadow-2xl bg-indigo-600 text-white relative overflow-hidden">
                            <div className="relative z-10 p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">TRL 4 Laboratory Validation</CardTitle>
                                    <p className="opacity-80 text-sm font-medium">Final requirements for commercial entry readiness.</p>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    {[
                                        "Functional prototype tested in simulated environment",
                                        "Component performance data matches design expectations",
                                        "Integration of all critical components confirmed",
                                        "Safety and compliance baseline verified"
                                    ].map((criteria, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                                            <Checkbox 
                                                id={`trl4-${i}`} 
                                                className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-indigo-600"
                                                checked={trl4Confirmed[`c${i}`]}
                                                onCheckedChange={(val) => setTrl4Confirmed(prev => ({ ...prev, [`c${i}`]: !!val }))}
                                            />
                                            <label htmlFor={`trl4-${i}`} className="text-sm font-bold cursor-pointer leading-tight">
                                                {criteria}
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        </Card>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button 
                            size="lg" 
                            disabled={!allPassed || completeMutation.isPending}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest px-12 h-14 shadow-xl shadow-emerald-500/20"
                            onClick={handleComplete}
                        >
                            {completeMutation.isPending ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
                            Mark Sprint Complete
                        </Button>
                    </div>
                </div>

                {/* Nudge Panel */}
                <div className="space-y-6">
                    <div className="bg-card/50 backdrop-blur rounded-3xl p-6 border border-primary/5 shadow-2xl italic">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                            <Info className="h-4 w-4 text-indigo-500" />
                            Agent Insights
                        </h4>
                        <div className="space-y-4">
                            {nudges?.filter((n: any) => n.targetToolId !== 'GENERAL').length > 0 ? (
                                nudges.map((n: any) => (
                                    <Card key={n.id} className={`border-none ${getNudgeColor(n.nudgeType)} rounded-2xl`}>
                                        <CardContent className="p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-widest">{n.nudgeType}</span>
                                                <Badge variant="outline" className="text-[8px] bg-white/50">{n.targetToolName}</Badge>
                                            </div>
                                            <p className="text-xs font-bold leading-relaxed">{n.message}</p>
                                            <Link href={`/student/roadmap/tool/${n.targetToolId}`}>
                                                <Button size="sm" variant="ghost" className="h-6 text-[10px] p-0 font-black hover:bg-transparent uppercase tracking-tighter mt-1">
                                                    Resolve Tool <ChevronRight className="h-3 w-3 inline ml-0.5" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-12 opacity-50">
                                    <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                                    <p className="text-xs font-bold">No active blocks or warnings. You are clear to proceed.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Card className="border-none bg-gradient-to-br from-indigo-600 to-indigo-900 text-white shadow-2xl rounded-3xl overflow-hidden group">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black italic uppercase tracking-tighter">Roadmap Pulse</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs opacity-70 font-medium leading-relaxed">
                                Gate reviews ensure your evidence is ready for external validation. Each "GATE" tool adds directly to your CRL/IRL readiness scores.
                            </p>
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 w-2/3 transition-all duration-1000 group-hover:w-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
