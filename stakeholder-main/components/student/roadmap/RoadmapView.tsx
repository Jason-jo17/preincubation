
"use client"

import { useEffect, useState } from "react"
import { getRoadmapData, startTool, getAdminRoadmapData } from "@/app/actions/roadmap"
import { StageCard } from "./StageCard"
import { TaskDialog } from "./TaskDialog"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Zap, MessageSquare, Target, ChevronRight, Rocket, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { useNudge } from "@/hooks/use-nudge"
import { useSearchParams, useRouter } from "next/navigation"


interface RoadmapViewProps {
    isAdmin?: boolean
    onViewRecommendations?: () => void
}

export function RoadmapView({ isAdmin = false, onViewRecommendations }: RoadmapViewProps) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [selectedTool, setSelectedTool] = useState<any>(null)
    const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | undefined>(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [unlockAll, setUnlockAll] = useState(false)
    const { nudge, checkNudge, clearNudge } = useNudge()

    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const urlToolSlug = searchParams.get('tool')
    const urlSubId = searchParams.get('sub')

    // Fetch recommendations for the smart card
    const { data: recommendations } = useQuery({
        queryKey: ['cofounder-recommendations'],
        queryFn: async () => {
            const res = await fetch(`/api/student/recommendations`)
            return res.json()
        },
    })

    const strategicPath = recommendations?.strategicPath
    const mentorFeedback = recommendations?.mentorFeedback

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = isAdmin ? await getAdminRoadmapData() : await getRoadmapData()
            if ('error' in res && res.error) {
                toast.error(res.error)
            } else {
                console.log("Roadmap data loaded:", { isAdmin: res.isAdmin, hasNudgeMap: !!res.nudgeMap })
                setData(res)
            }
        } catch (e) {
            toast.error("Failed to load roadmap")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Synchronize UI modal state to URL
    useEffect(() => {
        if (!data || !data.stages) return;
        
        if (urlToolSlug && !dialogOpen) {
            const stage = data.stages.find((s: any) => s.tools.find((t: any) => t.toolId === urlToolSlug))
            const tool = stage?.tools.find((t: any) => t.toolId === urlToolSlug)
            
            if (tool) {
                setSelectedTool(tool)
                setSelectedSubmissionId(urlSubId || undefined)
                setDialogOpen(true)
                if (!isAdmin && !unlockAll) {
                    checkNudge(urlToolSlug)
                }
            }
        } else if (!urlToolSlug && dialogOpen) {
            setDialogOpen(false)
            setSelectedTool(null)
            setSelectedSubmissionId(undefined)
        }
    }, [urlToolSlug, urlSubId, data])

    const handleStartTool = async (toolId: string) => {
        // Always allow the tool to open — never block the user.
        // Check nudge in background and display as banner suggestion inside dialog.
        if (!isAdmin) {
            checkNudge(toolId) 
        }

        try {
            const res = await startTool(toolId)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Tool started!")
                queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] })
                fetchData()
                handleOpenTool(toolId)
            }
        } catch (e) {
            toast.error("Failed to start tool")
        }
    }

    const handleOpenTool = async (toolId: string, submissionId?: string) => {
        // Find tool data
        const stage = data.stages.find((s: any) => s.tools.find((t: any) => t.toolId === toolId))
        const tool = stage?.tools.find((t: any) => t.toolId === toolId)

        if (!tool) return

        if (!isAdmin) {
            await checkNudge(toolId) 
        }

        router.push(`?tool=${toolId}${submissionId ? `&sub=${submissionId}` : ''}`)
    }

    if (loading && !data) {
        return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (!data) return <div className="p-4 text-center">Failed to load roadmap. Please try refreshing or contact support.</div>

    // BetterResilience: check stages existence
    if (!data.stages || data.stages.length === 0) {
        return (
            <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-primary/20">
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold">No Roadmap Content Found</h3>
                <p className="text-muted-foreground mt-2">The roadmap configuration hasn't been initialized yet.</p>
                <Button variant="outline" className="mt-6" onClick={fetchData}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Retry
                </Button>
            </div>
        )
    }

    // Build map of progress for easy lookup
    const toolProgressMap = data.progress?.toolProgress?.reduce((acc: any, curr: any) => {
        acc[curr.toolId] = curr
        return acc
    }, {}) || {}

    const stageProgressMap = data.progress?.stageProgress?.reduce((acc: any, curr: any) => {
        acc[curr.stageNumber] = curr
        return acc
    }, {}) || {}

    // Support for multiple submissions
    const toolSubmissionsMap = data.sprintToolSubmissions?.reduce((acc: any, curr: any) => {
        if (!acc[curr.toolId]) acc[curr.toolId] = []
        acc[curr.toolId].push(curr)
        return acc
    }, {}) || {}

    const currentStageId = data.progress?.currentStageId || 1

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Student Journey Roadmap
                        {isAdmin && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200">Admin Preview Mode</span>}
                    </h2>
                    <p className="text-muted-foreground">Team: {data.team?.name || 'Admin Sandbox'} • Cohort: {data.team?.cohort || 'Test'}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm">
                        <label htmlFor="unlock-all" className="text-xs font-black uppercase tracking-widest text-primary cursor-pointer">
                            Unlock All Tools
                        </label>
                        <input
                            id="unlock-all"
                            type="checkbox"
                            checked={unlockAll}
                            onChange={(e) => setUnlockAll(e.target.checked)}
                            className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchData}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </Button>
                </div>
            </div>

            {/* Innovator Recommendation Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900">
                <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                                <Zap className="h-6 w-6 text-indigo-600 fill-indigo-100" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground">Innovator Recommendation</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {recommendations?.recommendations?.[0]?.description || "Based on your current progress, we recommend connecting with an Inunity Innovator."}
                                </p>
                                <div className="flex gap-4 mt-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">TRL</span>
                                        <span className="text-sm font-black text-indigo-700">{recommendations?.context?.trl || 1}</span>
                                    </div>
                                    <div className="flex flex-col border-l border-indigo-100 pl-4">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">CRL</span>
                                        <span className="text-sm font-black text-indigo-700">{recommendations?.context?.crl || 0}%</span>
                                    </div>
                                    <div className="flex flex-col border-l border-indigo-100 pl-4">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">IRL</span>
                                        <span className="text-sm font-black text-indigo-700">{recommendations?.context?.irl || 0}%</span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="mt-4 border-indigo-200 hover:bg-indigo-50 text-indigo-600 font-bold"
                                    onClick={onViewRecommendations}
                                >
                                    <Target className="mr-2 h-4 w-4" /> View Full Strategist Report
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-indigo-100 dark:border-indigo-900 pt-6">
                            {/* Next Stage Section */}
                            <div className="space-y-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100/50">
                                <div className="flex items-center gap-2">
                                    <Rocket className="h-4 w-4 text-purple-600" />
                                    <h4 className="text-sm font-bold text-purple-900 dark:text-purple-100 uppercase tracking-tight">Strategic Path Suggestion</h4>
                                </div>
                                {strategicPath ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none font-bold">
                                                Next: {strategicPath.nextStage}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            "{strategicPath.reasoning}"
                                        </p>
                                    </div>
                                ) : (
                                    <div className="animate-pulse h-16 bg-muted rounded-lg" />
                                )}
                            </div>

                            {/* Mentors Comments Section */}
                            <div className="space-y-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100/50">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-tight">Mentor Feedback Feed</h4>
                                </div>
                                {mentorFeedback ? (
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {mentorFeedback}
                                    </p>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">
                                        No recent mentor feedback found. Continue working on your tools to get feedback!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {data.stages?.map((stage: any) => (
                    <StageCard
                        key={stage.id}
                        stage={stage}
                        stageProgress={stageProgressMap[stage.stageNumber]}
                        toolProgressMap={toolProgressMap}
                        toolSubmissionsMap={toolSubmissionsMap}
                        onStartTool={handleStartTool}
                        onOpenTool={handleOpenTool}
                        isLocked={isAdmin || data.isAdmin || unlockAll ? false : (stage.stageNumber > currentStageId && stage.stageNumber !== 1)}
                        isAdmin={isAdmin || data.isAdmin}
                        isUnlocked={unlockAll}
                        nudgeMap={data.nudgeMap}
                    />
                ))}
            </div>

            <TaskDialog
                tool={selectedTool}
                progress={selectedTool ? toolProgressMap[selectedTool.toolId] : null}
                submissionId={selectedSubmissionId}
                isNewIteration={!selectedSubmissionId && toolProgressMap[selectedTool?.toolId]?.status === 'completed'}
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        router.push('?', { scroll: false })
                    }
                }}
                nudge={nudge}
                onTaskUpdated={() => {
                    fetchData()
                    queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] })
                    queryClient.invalidateQueries({ queryKey: ['cofounder-recommendations'] })
                }}
            />


        </div>
    )
}
