"use client"

import React, { useState } from 'react'
import {
    ClipboardCheck,
    Search,
    Filter,
    ChevronRight,
    Scale,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    TrendingUp,
    LineChart,
    X
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { RubricPanel, type ReviewPayload } from '@/components/manager/RubricPanel'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const ExpertReviewDashboard = () => {
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const queryClient = useQueryClient()

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/manager/review')
            const data = await res.json()
            setReviews(data)
        } catch (err) {
            console.error("Fetch reviews error:", err)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchReviews()
    }, [])

    const reviewMutation = useMutation({
        mutationFn: async (payload: ReviewPayload) => {
            const res = await fetch(`/api/manager/review/${payload.submissionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: payload.status,
                    score: payload.managerScore,
                    notes: payload.managerNotes,
                    type: selectedReview?.type,
                    rubricScores: payload.rubricScores,
                    rubricChecks: payload.rubricChecks
                })
            })
            if (!res.ok) throw new Error('Review failed')
            return res.json()
        },
        onSuccess: () => {
            setSelectedStudent(null)
            fetchReviews()
        }
    })

    const selectedReview = reviews.find(r => r.id === selectedStudent)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">Expert Review Terminal</h2>
                    <p className="text-muted-foreground font-medium">Precision Grading & Gate Approval Workflow</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9 h-11 w-[300px] shadow-sm" placeholder="Filter by student or project..." />
                    </div>
                    <Button variant="outline" className="h-11 gap-2 font-bold uppercase tracking-widest text-xs">
                        <Filter className="h-4 w-4" /> Filters
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Side: Work Queue */}
                <Card className="md:col-span-8 shadow-lg border-2 border-primary/5">
                    <CardHeader className="bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ClipboardCheck className="h-5 w-5 text-primary" />
                                <CardTitle className="text-sm font-black uppercase tracking-widest mb-0">Review Queue</CardTitle>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{reviews.length} Items Pending</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent bg-muted/10 font-black uppercase text-[10px]">
                                    <TableHead>Innovator</TableHead>
                                    <TableHead>Submission Type</TableHead>
                                    <TableHead>AI Score</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center py-8">Loading queue...</TableCell></TableRow>
                                ) : reviews.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-40">Queue empty</TableCell></TableRow>
                                ) : reviews.map((review: any) => (
                                    <TableRow key={review.id} className="group cursor-pointer hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border-2 border-primary/10">
                                                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">{review.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-bold text-sm tracking-tight">{review.name}</div>
                                                    <div className="text-[10px] text-muted-foreground font-medium">{review.project} • {review.level}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider h-5 bg-background">
                                                {review.type}
                                            </Badge>
                                            <div className="text-[10px] text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString()}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {review.score !== null ? (
                                                    <>
                                                        <Progress value={review.score} className="h-1.5 w-16" />
                                                        <span className={cn(
                                                            "text-xs font-black italic",
                                                            review.score < 50 ? "text-destructive" : review.score < 80 ? "text-amber-500" : "text-emerald-500"
                                                        )}>
                                                            {review.score}%
                                                        </span>
                                                    </>
                                                ) : <span className="text-[9px] font-bold opacity-30">N/A</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {review.status === 'ai_flagged' || review.status === 'submitted' ? (
                                                <div className="flex items-center gap-1.5 text-destructive font-black uppercase text-[9px] tracking-widest italic animate-pulse">
                                                    <AlertCircle className="h-3 w-3" /> Manual Req
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-emerald-500 font-bold uppercase text-[9px] tracking-widest">
                                                    {review.status}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="h-9 px-4 font-black uppercase tracking-widest text-[10px] shadow-sm hover:scale-105 transition-all"
                                                onClick={() => setSelectedStudent(review.id)}
                                            >
                                                Review
                                                <ChevronRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Right Side: Stats & Insights */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="bg-primary text-white shadow-xl shadow-primary/20 border-0 overflow-hidden relative">
                        <CardHeader className="relative z-10 pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Cohort Readiness Index</CardTitle>
                            <div className="text-4xl font-black italic tracking-tighter">74.2%</div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-2 py-1 rounded">
                                <TrendingUp className="h-3 w-3" /> +12.5% from last month
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase opacity-80">
                                        <span>CRL (Commercial)</span>
                                        <span>68%</span>
                                    </div>
                                    <div className="h-1 lg:h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[68%]" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase opacity-80">
                                        <span>IRL (Innovation)</span>
                                        <span>81%</span>
                                    </div>
                                    <div className="h-1 lg:h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[81%]" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-400/20 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />
                    </Card>

                    <Card className="border-2 border-emerald-500/10 shadow-lg">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <LineChart className="h-4 w-4 text-emerald-500" />
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-0">Precision Signals</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50">
                                <h6 className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 mb-1">Top Performer</h6>
                                <p className="text-xs font-bold leading-tight">Maria Garcia's prototype validation hit 88% alignment.</p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/50">
                                <h6 className="text-[10px] font-black uppercase text-red-700 dark:text-red-400 mb-1">Critical Block</h6>
                                <p className="text-xs font-bold leading-tight">Alex Johnson is stuck on TRL 3 due to market validation gap.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Manual Grading Overlay */}
            {selectedReview && (
                <Card className="border-2 border-primary shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    <CardHeader className="flex flex-row items-center justify-between border-b">
                        <div>
                            <CardTitle className="text-xl font-black italic uppercase tracking-tighter">Reviewing {selectedReview.name}</CardTitle>
                            <CardDescription>{selectedReview.type} - {selectedReview.level}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(null)} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6">
                        <RubricPanel
                            submissionId={selectedReview.id}
                            submissionType={selectedReview.type}
                            toolId={selectedReview.toolId}
                            toolName={selectedReview.toolName}
                            gateCheck={selectedReview.gateCheck}
                            submittedData={selectedReview.submittedData}
                            currentAiScore={selectedReview.score}
                            assessmentNotes={selectedReview.assessmentNotes}
                            criterionScores={selectedReview.criterionScores}
                            onApprove={(data) => reviewMutation.mutate(data)}
                            onReject={(data) => reviewMutation.mutate(data)}
                            isSubmitting={reviewMutation.isPending}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
