"use client"

import { useMentee } from "@/hooks/use-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractionTimeline } from "@/components/student/DashboardComponents"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useMenteeSubmissions, useReviewSubmission } from "@/hooks/use-manager"
import { ExternalLink, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { ToolRunner } from "@/components/student/roadmap/ToolRunner"
import { RubricPanel, type ReviewPayload } from '@/components/manager/RubricPanel'
import { useState, use } from "react"

export default function MenteeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { data: mentee } = useMentee(id)

    if (!mentee) return <div className="container py-8">Loading...</div>

    return (
        <div className="container py-8">
            {/* Mentee Header */}
            <Card className="mb-6">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={mentee?.user.avatar || undefined} />
                        <AvatarFallback>{mentee?.user.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold">{mentee?.user.name || "Unknown Innovator"}</h1>
                        <p className="text-muted-foreground">
                            {mentee?.institution} • {mentee?.program}
                        </p>
                        <div className="text-sm font-medium mt-1">Project: {mentee.projectName}</div>
                        <div className="flex justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{mentee?._count?.stakeholders || 0} Stakeholders</span>
                            <span>{mentee?._count?.interactions || 0} Interactions</span>
                            <span>{mentee?._count?.valuePropositions || 0} Value Propositions</span>
                        </div>
                    </div>

                    <Button onClick={() => {
                        const tab = document.querySelector('[role="tab"][value="submissions"]') as HTMLElement;
                        if (tab) tab.click();
                    }}>
                        Review Progress
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="value-props">Value Props</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
                        <CardContent>Content for project overview...</CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="stakeholders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stakeholder Connections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mentee.stakeholders.map((s: any) => (
                                    <div key={s.id} className="p-4 border rounded flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{s.user?.name || "Unknown Stakeholder"}</div>
                                            <div className="text-sm text-muted-foreground">{s.organization}</div>
                                        </div>
                                        <Button variant="outline" size="sm">View</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interactions">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Interaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <InteractionTimeline
                                interactions={mentee?.interactions}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="value-props">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentee?.valuePropositions.map((vp: any) => (
                            <Card key={vp.id}>
                                <CardHeader>
                                    <CardTitle className="text-base">{vp.productsServices[0]}</CardTitle>
                                    <Badge className="w-fit" variant={vp.validationStatus === 'validated' ? 'default' : 'secondary'}>{vp.validationStatus}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground">Created: {new Date(vp.createdAt).toLocaleDateString()}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="submissions">
                    <SubmissionsList menteeId={id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function SubmissionsList({ menteeId }: { menteeId: string }) {
    const { data: submissions, isLoading } = useMenteeSubmissions(menteeId)
    const reviewMutation = useReviewSubmission()
    const [openReviewId, setOpenReviewId] = useState<string | null>(null)

    if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading submissions...</div>
    if (!submissions?.length) return <div className="p-8 text-center text-muted-foreground border rounded-lg bg-muted/20">No active submissions to review.</div>

    return (
        <div className="space-y-4">
            {submissions.map((sub: any) => {
                const isOpen = openReviewId === sub.id
                return (
                    <Card key={sub.id} className={`overflow-hidden transition-colors ${sub.status === 'submitted' ? 'border-primary/50 bg-primary/5' : ''}`}>
                        <CardHeader className="py-3 flex flex-row items-center justify-between bg-muted/20">
                            <div className="flex items-center gap-3">
                                <Badge variant={
                                    sub.status === 'approved' || sub.status === 'gate_passed' ? 'default' :
                                        sub.status === 'rejected' || sub.status === 'blocked' ? 'destructive' :
                                            'secondary'
                                } className={sub.status === 'submitted' ? 'bg-amber-500 hover:bg-amber-600' : ''}>
                                    {sub.status.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    Submitted: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : new Date(sub.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-primary">{sub.toolName || sub.toolId}</span>
                                {sub.status === 'submitted' && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1"
                                        onClick={() => setOpenReviewId(isOpen ? null : sub.id)}
                                    >
                                        {isOpen ? 'Close Review' : 'Open Review'}
                                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {!isOpen && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">Target Sprint: {sub.sprint?.name || "Sprint " + sub.sprint?.sprintNumber}</h4>
                                        {sub.toolId ? (
                                            <div className="border rounded-xl p-4 bg-muted/10 mt-2 pointer-events-none opacity-90 overflow-hidden relative">
                                                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold z-50 text-muted-foreground border">READ-ONLY TOOL PREVIEW</div>
                                                <div className="max-h-[300px] overflow-y-auto no-scrollbar scale-[0.85] origin-top-left w-[117%] -mb-[7.5%]">
                                                    <ToolRunner
                                                        tool={{ toolId: sub.toolId, name: sub.toolName }}
                                                        progress={sub}
                                                    />
                                                </div>
                                            </div>
                                        ) : sub.submittedData && Object.keys(sub.submittedData).length > 0 ? (
                                            <div className="bg-muted p-3 flex rounded-md text-sm border whitespace-pre-wrap font-mono text-xs max-h-48 overflow-auto">
                                                {JSON.stringify(sub.submittedData, null, 2)}
                                            </div>
                                        ) : (
                                            <div className="flex text-sm p-3 bg-muted rounded-md border text-muted-foreground">
                                                No submission data provided.
                                            </div>
                                        )}
                                    </div>

                                    {(sub.managerNotes || (sub.submittedData as any)?.mentorFeedback) && (
                                        <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-md border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
                                            <strong>Manager Feedback: </strong> {sub.managerNotes || (sub.submittedData as any)?.mentorFeedback}
                                            {sub.managerScore !== null && <Badge className="ml-2 bg-blue-100 text-blue-700">{sub.managerScore}/100</Badge>}
                                        </div>
                                    ) }
                                </div>
                            )}

                            {isOpen && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="mb-6">
                                        <h4 className="font-black uppercase text-xs tracking-widest text-muted-foreground mb-4">Submission Preview</h4>
                                        <div className="border rounded-xl p-4 bg-muted/10 overflow-hidden relative">
                                            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                                                <ToolRunner
                                                    tool={{ toolId: sub.toolId, name: sub.toolName }}
                                                    progress={sub}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <RubricPanel
                                        submissionId={sub.id}
                                        submissionType="SprintToolSubmission"
                                        toolId={sub.toolId}
                                        toolName={sub.toolName}
                                        gateCheck={sub.gateCheck}
                                        submittedData={sub.submittedData}
                                        onApprove={(data: ReviewPayload) => {
                                            reviewMutation.mutate({
                                                taskId: sub.id,
                                                status: 'approved',
                                                feedback: data.managerNotes,
                                                score: data.managerScore,
                                                rubricScores: data.rubricScores,
                                                rubricChecks: data.rubricChecks
                                            })
                                            setOpenReviewId(null)
                                        }}
                                        onReject={(data: ReviewPayload) => {
                                            reviewMutation.mutate({
                                                taskId: sub.id,
                                                status: 'rejected',
                                                feedback: data.managerNotes,
                                                score: data.managerScore,
                                                rubricScores: data.rubricScores,
                                                rubricChecks: data.rubricChecks
                                            })
                                            setOpenReviewId(null)
                                        }}
                                        isSubmitting={reviewMutation.isPending}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
