"use client"

import { useStudentProfile, useMyStakeholders, useMyValuePropositions } from "@/hooks/use-student"
import { StatCard, StakeholderList, InteractionTimeline, ManagerCard, UpcomingTasksList } from "@/components/student/DashboardComponents"
import {
    Users, Target, MessageSquare, AlertCircle, Plus, Map, LayoutDashboard,
    Rocket, ShieldCheck, Zap, ChevronRight, Activity, ShieldAlert, Layers, MapPin,
    Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoadmapView } from "@/components/student/roadmap/RoadmapView"
import { useSearchParams, useRouter } from "next/navigation"
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"
import { RecommendationsList } from "@/components/student/Recommendations"
import { CofounderRecommendations } from "@/components/student/CofounderRecommendations"
import { useState, Suspense } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LivingNotes } from "@/components/student/LivingNotes"
import { CoInnovatorBot } from "@/components/student/CoInnovatorBot"
import { useQuery } from "@tanstack/react-query"

// Sprint Engine Components
import { SprintPipeline } from "@/components/student/SprintPipeline"
import { CRLIRLPanel } from "@/components/student/CRLIRLPanel"
import { TRLRing } from "@/components/student/TRLRing"
import { BandRadar } from "@/components/student/BandRadar"
import { getBandForTRL } from "@/lib/sprint-registry"

// Global Components
import { AIReadinessAssessment } from "@/components/student/dashboard/AIReadinessAssessment"
import { KPIProgress } from "@/components/student/dashboard/KPIProgress"
import { ProgressTrackerAnalytics } from "@/components/student/dashboard/ProgressTrackerAnalytics"
import { TargetedRecommendations } from "@/components/student/dashboard/TargetedRecommendations"
import { GamificationCard } from "@/components/student/dashboard/GamificationCard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const SECTORS = ["Energy", "Health", "Fintech", "Agritech", "Edtech", "Deeptech", "Smart Cities"]
const SOLUTIONS = ["Software/AI", "Hardware/IoT", "D2C/Service", "Deep Science", "Social Enterprise"]

function StudentDashboardContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: profile } = useStudentProfile()
    const { data: stakeholders } = useMyStakeholders()
    const { data: valueProps } = useMyValuePropositions()

    // Innovator Filters
    const [selectedSector, setSelectedSector] = useState("Energy")
    const [selectedSolution, setSelectedSolution] = useState("Software/AI")
    const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null)

    // Fetch problem statements for dropdown
    const { data: problems } = useQuery({
        queryKey: ['problem-statements'],
        queryFn: async () => {
            const res = await fetch('/api/student/problem-statements')
            return res.json()
        },
    })

    // Update journey with selected problem
    const updateProblem = async (problemId: string) => {
        setSelectedProblemId(problemId)
        await fetch('/api/student/journey', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ problemStatementId: problemId }),
        })
    }

    // Fetch recommendations for tool card injection
    const { data: recommendations } = useQuery({
        queryKey: ['cofounder-recommendations', selectedSector, selectedSolution, selectedProblemId],
        queryFn: async () => {
            const params = new URLSearchParams({
                sector: selectedSector,
                solution: selectedSolution,
                problemId: selectedProblemId || ''
            })
            const res = await fetch(`/api/student/recommendations?${params.toString()}`)
            return res.json()
        },
    })

    const recs = recommendations?.recommendations || []
    const getRecForCategory = (cat: string) => recs.find((r: any) => r.category === cat)
    const context = recommendations?.context || { trl: profile?.trlLevel || 1, crl: 0, irl: 0 }
    const currentBand = getBandForTRL(context.trl)

    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "dashboard")

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        router.push(`?tab=${value}`, { scroll: false })
    }

    return (
        <div className="container py-6 space-y-6 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.user?.name}!</h1>
                    <p className="text-muted-foreground mt-1">
                        Active Workspace: Manage your project details and roadmap
                    </p>
                </div>

                <Suspense fallback={null}>
                    <IntelligenceAlerts />
                </Suspense>

                {/* Global Project Selectors */}
                <div className="flex flex-wrap items-center gap-3 bg-muted/50 p-2 rounded-xl border">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground pl-1">Sector</span>
                        <Select defaultValue="Energy" onValueChange={setSelectedSector}>
                            <SelectTrigger className="w-[140px] h-8 text-xs font-bold border-indigo-200" suppressHydrationWarning>
                                <SelectValue placeholder="Sector" />
                            </SelectTrigger>
                            <SelectContent>
                                {SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground pl-1">Solution</span>
                        <Select defaultValue="Software/AI" onValueChange={setSelectedSolution}>
                            <SelectTrigger className="w-[140px] h-8 text-xs font-bold border-indigo-200" suppressHydrationWarning>
                                <SelectValue placeholder="Solution" />
                            </SelectTrigger>
                            <SelectContent>
                                {SOLUTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground pl-1">Focus Problem</span>
                        <Select value={selectedProblemId || "none"} onValueChange={updateProblem}>
                            <SelectTrigger className="w-[180px] h-8 text-xs font-bold border-indigo-200" suppressHydrationWarning>
                                <SelectValue placeholder="Focus Problem" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">General Project</SelectItem>
                                {Array.isArray(problems) && problems.map((p: any) => (
                                    <SelectItem key={p.id} value={p.id}>
                                        {p.code}: {p.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-4 max-w-[800px] bg-muted/50 p-1">
                    <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="sprint" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Activity className="h-4 w-4" />
                        Sprint Pipeline
                    </TabsTrigger>
                    <TabsTrigger value="roadmap" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Map className="h-4 w-4" />
                        Journey Roadmap
                    </TabsTrigger>
                    <TabsTrigger value="innovator" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Target className="h-4 w-4" />
                        Inunity Innovator
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="m-0 focus-visible:outline-none">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        <div className="xl:col-span-8 space-y-6 flex flex-col">
                            <AIReadinessAssessment recommendations={recommendations} />
                            <ProgressTrackerAnalytics profile={profile} />

                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        My Stakeholders
                                    </h3>
                                    <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                                        <Link href="/student/intermediate">View Full Analysis <ChevronRight className="ml-1 h-3 w-3" /></Link>
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="md:col-span-2">
                                        <CardHeader className="flex flex-row items-center justify-between py-3">
                                            <CardTitle className="text-sm font-bold">Active Connections</CardTitle>
                                            <AddStakeholderDialog
                                                mode="student"
                                                trigger={
                                                    <Button size="sm" variant="secondary" className="h-7 text-xs" suppressHydrationWarning>
                                                        <Plus className="h-3 w-3 mr-1" /> Add
                                                    </Button>
                                                }
                                            />
                                        </CardHeader>
                                        <CardContent className="px-4 pb-4">
                                            <StakeholderList stakeholders={stakeholders?.slice(0, 5) || []} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Innovator Tools
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'trl', title: 'TRL Tracker', icon: Rocket, color: 'text-orange-500', path: 'trl-tracker' },
                                        { id: 'roadmap', title: 'Strategic Roadmap', icon: Map, color: 'text-blue-500', path: 'roadmap' },
                                        { id: 'compliance', title: 'Compliance Hub', icon: ShieldCheck, color: 'text-emerald-500', path: 'compliance' },
                                        { id: 'experiments', title: 'Experiment Sandbox', icon: Zap, color: 'text-amber-500', path: 'experiments' },
                                        { id: 'resources', title: 'Resource Network', icon: Users, color: 'text-purple-500', path: 'resources' },
                                        { id: 'industry', title: 'Industry Connect', icon: Target, color: 'text-red-500', path: 'industry' },
                                        { id: 'api', title: 'API Directory', icon: LayoutDashboard, color: 'text-cyan-500', path: 'api-directory' }
                                    ].map((tool) => {
                                        const rec = getRecForCategory(tool.id)
                                        const Icon = tool.icon
                                        return (
                                            <Card key={tool.id} className="group hover:border-primary/50 transition-all shadow-sm overflow-hidden flex flex-col">
                                                <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3 space-y-0">
                                                    <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                                                        <Icon className={`h-4 w-4 ${tool.color}`} />
                                                    </div>
                                                    <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">
                                                        {tool.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-3 pt-0 flex-1 flex flex-col justify-between space-y-3">
                                                    <div className="min-h-[50px] p-2 rounded-lg bg-muted/30 text-[11px] leading-relaxed border border-transparent flex-1">
                                                        {rec ? (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-1.5 font-bold text-primary">
                                                                    <Zap className="h-3 w-3 fill-primary" />
                                                                    NEXT STEP
                                                                </div>
                                                                <p className="text-muted-foreground line-clamp-2">{rec.description}</p>
                                                            </div>
                                                        ) : (
                                                            <p className="text-muted-foreground italic opacity-50">Explore tool to update progress...</p>
                                                        )}
                                                    </div>
                                                    <Button asChild variant="ghost" size="sm" className="w-full h-8 text-xs font-semibold group-hover:bg-primary group-hover:text-white border border-transparent group-hover:border-primary shrink-0">
                                                        <Link href={`/student/cofounder/${tool.path}`}>
                                                            Enter Tool <ChevronRight className="ml-1 h-3 w-3" />
                                                        </Link>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 space-y-6 flex flex-col">
                            <GamificationCard />
                            <KPIProgress onNavigate={handleTabChange} profile={profile} />
                            <TargetedRecommendations recommendations={recs} />
                            <Card>
                                <CardHeader className="py-3">
                                    <CardTitle className="text-sm font-bold">Recent Interactions</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <InteractionTimeline interactions={profile?.interactions?.slice(0, 3) || []} />
                                </CardContent>
                            </Card>
                            <LivingNotes />
                            <div className="min-h-[400px]">
                                <CoInnovatorBot />
                            </div>
                        </div>
                    </div>
                </TabsContent>


                <TabsContent value="sprint" className="m-0 space-y-6 focus-visible:outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 flex flex-col gap-6">
                            <SprintPipeline />
                            <CRLIRLPanel />
                        </div>
                        <div className="md:col-span-4 space-y-6">
                            <Card className="shadow-lg border-2 border-primary/10 overflow-hidden">
                                <CardHeader className="bg-primary/5 pb-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary">Readiness Radar</h4>
                                    <CardTitle className="text-xl font-black italic tracking-tighter">Stage Alignment</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <BandRadar
                                        currentTRL={context.trl}
                                        currentCRL={context.crl}
                                        currentIRL={context.irl}
                                        targetBands={currentBand ? { 
                                            crlMin: currentBand.crlMin, 
                                            crlMax: currentBand.crlMax, 
                                            irlMin: currentBand.irlMin, 
                                            irlMax: currentBand.irlMax 
                                        } : { crlMin: 0, crlMax: 100, irlMin: 0, irlMax: 100 }}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg border-2 border-emerald-500/10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-600">Phase Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20">
                                        <TRLRing level={profile?.trlLevel || 1} size={60} strokeWidth={6} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-emerald-700">Tech Level</p>
                                            <p className="text-sm font-bold">Stage {Math.ceil((profile?.trlLevel || 1) / 2)} Deployment</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <RecommendationsList profile={profile} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="roadmap" className="m-0 space-y-6 focus-visible:outline-none">
                    <RoadmapView onViewRecommendations={() => handleTabChange("innovator")} />
                </TabsContent>

                <TabsContent value="innovator" className="m-0 space-y-6 focus-visible:outline-none">
                    <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold tracking-tight">Co Innovator Workspace</h2>
                            <p className="text-sm text-muted-foreground">Tailored advice for your project path based on the selected Problem and Solution</p>
                        </div>
                        <Button asChild size="sm" variant="outline" className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-white transition-all">
                            <Link href="/student/cofounder">Full Dashboard</Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left: Tools Grid (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'trl', title: 'TRL Tracker', icon: Rocket, color: 'text-orange-500', path: 'trl-tracker' },
                                    { id: 'roadmap', title: 'Strategic Roadmap', icon: Map, color: 'text-blue-500', path: 'roadmap' },
                                    { id: 'compliance', title: 'Compliance Hub', icon: ShieldCheck, color: 'text-emerald-500', path: 'compliance' },
                                    { id: 'experiments', title: 'Experiment Sandbox', icon: Zap, color: 'text-amber-500', path: 'experiments' },
                                    { id: 'resources', title: 'Resource Network', icon: Users, color: 'text-purple-500', path: 'resources' },
                                    { id: 'industry', title: 'Industry Connect', icon: Target, color: 'text-red-500', path: 'industry' },
                                    { id: 'api', title: 'API Directory', icon: LayoutDashboard, color: 'text-cyan-500', path: 'api-directory' }
                                ].map((tool) => {
                                    const rec = getRecForCategory(tool.id)
                                    const Icon = tool.icon
                                    return (
                                        <Card key={tool.id} className="group hover:border-primary/50 transition-all shadow-sm overflow-hidden flex flex-col">
                                            <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3 space-y-0">
                                                <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                                                    <Icon className={`h-4 w-4 ${tool.color}`} />
                                                </div>
                                                <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">
                                                    {tool.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-3 pt-0 flex-1 flex flex-col justify-between space-y-3">
                                                <div className="min-h-[50px] p-2 rounded-lg bg-muted/30 text-[11px] leading-relaxed border border-transparent group-hover:border-primary/10 flex-1">
                                                    {rec ? (
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-1.5 font-bold text-primary">
                                                                <Zap className="h-3 w-3 fill-primary" />
                                                                NEXT STEP
                                                            </div>
                                                            <p className="text-muted-foreground line-clamp-2">{rec.description}</p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted-foreground italic opacity-50">Fetching advice...</p>
                                                    )}
                                                </div>
                                                <Button asChild variant="ghost" size="sm" className="w-full h-8 text-xs font-semibold group-hover:bg-primary group-hover:text-white border border-transparent group-hover:border-primary shrink-0">
                                                    <Link href={`/student/cofounder/${tool.path}`}>
                                                        Enter Tool <ChevronRight className="ml-1 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right: Workspace Sidebar (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="min-h-[300px]">
                                <CofounderRecommendations sector={selectedSector} solution={selectedSolution} />
                            </div>
                            <div className="min-h-[220px]">
                                <LivingNotes />
                            </div>
                            <div className="min-h-[320px]">
                                <CoInnovatorBot />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function IntelligenceAlerts() {
    const { data } = useQuery({
        queryKey: ['student-intelligence-alerts'],
        queryFn: async () => {
            const res = await fetch('/api/student/intelligence')
            return res.json()
        }
    })

    const reports = data?.intelligence?.weeklyReports || []
    if (reports.length === 0) return null

    const latestReport = reports[reports.length - 1]
    const generatedAt = new Date(latestReport.generatedAt)
    const isNew = (new Date().getTime() - generatedAt.getTime()) < 2 * 24 * 60 * 60 * 1000 // 2 days

    if (!isNew) return null

    return (
        <Alert className="mb-6 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <AlertTitle className="text-indigo-900 dark:text-indigo-400 font-bold">New Weekly Intelligence Ready</AlertTitle>
            <AlertDescription className="text-indigo-800 dark:text-indigo-300">
                Your co-founder AI has summarized your progress and calculated a new Loveability Score.
                Check the Innovator tab for full details.
            </AlertDescription>
        </Alert>
    )
}

export default function StudentDashboard() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <StudentDashboardContent />
        </Suspense>
    )
}
