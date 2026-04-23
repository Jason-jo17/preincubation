"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
    Users, 
    Target, 
    CheckCircle2, 
    Activity,
    Layers,
    MessageSquare,
    Zap
} from 'lucide-react'
import { MindMap5W1H } from '@/components/student/roadmap/tools/MindMap5W1H'
import { EmpathyMap } from '@/components/student/roadmap/tools/EmpathyMap'

interface SubmissionDisplayProps {
    toolId?: string
    toolName?: string
    data: any
}

export function SubmissionDisplay({ toolId, toolName, data }: SubmissionDisplayProps) {
    if (!data) return <div className="text-center py-8 opacity-40 italic">No data submitted</div>

    const normalizedId = (toolId || toolName || '').toLowerCase().replace(/[^a-z0-9]/g, '_')

    // Dispatch to specific renderers
    switch (normalizedId) {
        case 'mtp_ikigai':
        case 'ikigai':
            return <MtpIkigaiDisplay data={data} />
        case 'empathy_map':
        case 'empathy_mapping':
            return <EmpathyMap progress={{ submittedData: data }} isReadOnly={true} />
        case 'persona_journey':
        case 'persona':
        case 'user_persona':
            return <PersonaJourneyDisplay data={data} />
        case 'vpc':
        case 'vpc_builder':
        case 'value_proposition_canvas':
            return <VpcDisplay data={data} />
        case 'six_paths':
        case 'six_paths_framework':
            return <SixPathsDisplay data={data} />
        case 'crazy_8s':
        case 'crazy_8':
            return <Crazy8sDisplay data={data} />
        case 'errc_grid':
        case 'errc_canvas':
        case 'strategy_canvas':
            return <GridDisplay data={data} title={toolName || "Strategy Grid"} />
        case 'mind_map_5w1h':
        case 'five_whys_one_how':
        case '5w1h':
        case 'brainstorming':
            return <MindMap5W1H progress={{ submittedData: data }} isReadOnly={true} />
        case 'swot_analysis':
        case 'swot':
            return <GridDisplay data={data} title="SWOT Analysis" />
        case 'lean_canvas':
            return <GridDisplay data={data} title="Lean Canvas" />
        case 'seven_whys':
        case '7_whys':
            return <SevenWhysDisplay data={data} />
        case 'fishbone_diagram':
        case 'ishikawa':
            return <FishboneDisplay data={data} />
        case 'interview_summary':
        case 'interviews':
            return <InterviewSummaryDisplay data={data} />
        case 'storyboarding':
        case 'storyboard':
            return <StoryboardingDisplay data={data} />
        case 'user_testing':
        case 'usability_testing':
            return <UserTestingDisplay data={data} />
        case 'prototyping_hub':
        case 'prototype':
            return <PrototypingHubDisplay data={data} />
        default:
            return <GenericDisplay data={data} title={toolName} />
    }
}

function StoryboardingDisplay({ data }: { data: any }) {
    const panels = data.panels || []
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {panels.map((p: any, i: number) => (
                    <Card key={i} className="overflow-hidden border-2 shadow-sm">
                        <div className="aspect-video bg-slate-50 relative flex items-center justify-center border-b">
                            {p.imageUrl ? (
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-[10px] uppercase font-black text-slate-300 italic">No Scene Image</div>
                            )}
                            <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shadow-lg">
                                {i + 1}
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="text-xs font-black uppercase tracking-tighter text-slate-900">{p.title || `Panel ${i+1}`}</div>
                            <div className="text-xs text-slate-500 font-medium leading-relaxed">{p.action || p.description}</div>
                            {p.dialogue && (
                                <div className="bg-blue-50/50 p-2 rounded text-[11px] italic text-blue-700 border-l-2 border-blue-200">
                                    "{p.dialogue}"
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function UserTestingDisplay({ data }: { data: any }) {
    const sessions = data.sessions || []
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {sessions.map((s: any, i: number) => (
                    <Card key={i} className="border-2 shadow-sm">
                        <div className="p-4 flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-black italic text-sm">{s.testerName}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{s.testerRole}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={s.outcome === 'Success' ? 'default' : 'destructive'} className="text-[9px] font-black uppercase">
                                        {s.outcome}
                                    </Badge>
                                    <span className="text-[10px] font-bold text-slate-400">{s.duration}</span>
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black uppercase text-slate-400">Feedback / Quotes</div>
                                    <p className="text-xs italic leading-relaxed text-slate-600">"{s.feedback}"</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black uppercase text-red-500/60">Friction Points</div>
                                    <ul className="text-xs space-y-0.5 list-disc list-inside font-medium text-red-700">
                                        {s.frictionPoints?.map((p: string, k: number) => <li key={k}>{p}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function PrototypingHubDisplay({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border-b-4 border-primary group">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Functional Prototype</h4>
                    </div>
                    {data.demoUrl && (
                        <a href={data.demoUrl} target="_blank" className="text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors">
                            Launch Demo
                        </a>
                    )}
                </div>
                <div className="text-2xl font-black italic tracking-tighter mb-2">{data.title}</div>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">{data.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-2">
                    <CardHeader className="p-4 border-b bg-muted/10">
                        <CardTitle className="text-xs font-black uppercase tracking-widest">Key Features & Flows</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.keyFeatures?.map((f: any, i: number) => (
                                <div key={i} className="p-3 rounded-lg border-2 border-slate-50 bg-white space-y-1">
                                    <div className="text-xs font-black text-slate-900">{f.title}</div>
                                    <div className="text-[10px] text-slate-500 leading-tight">{f.description}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2">
                    <CardHeader className="p-4 border-b bg-muted/10">
                        <CardTitle className="text-xs font-black uppercase tracking-widest">Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-wrap gap-2">
                        {data.toolStack?.map((t: string, i: number) => (
                            <Badge key={i} variant="outline" className="font-bold py-1 px-2">{t}</Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function MindMapDisplay({ data, title }: { data: any, title: string }) {
    const nodes = data.nodes || []
    
    // Extract labels for standard 5W1H keys
    const getLabel = (id: string, fallback: string) => {
        const node = nodes.find((n: any) => n.id === id)
        return node?.data?.label || fallback
    }

    const center = getLabel('center', 'Problem Statement')
    const who = getLabel('who', '')
    const what = getLabel('what', '')
    const when = getLabel('when', '')
    const where = getLabel('where', '')
    const why = getLabel('why', '')
    const how = getLabel('how', '')

    const fields = [
        { id: 'who', label: 'Who', value: who },
        { id: 'what', label: 'What', value: what },
        { id: 'when', label: 'When', value: when },
        { id: 'where', label: 'Where', value: where },
        { id: 'why', label: 'Why', value: why },
        { id: 'how', label: 'How', value: how },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border-b-4 border-primary">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{title}</h4>
                </div>
                <div className="text-xl font-black italic">"{center}"</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map(f => f.value && (
                    <Card key={f.id} className="border-2 shadow-none hover:border-primary/20 transition-colors">
                        <CardHeader className="p-3 bg-muted/20 border-b">
                            <CardTitle className="text-[10px] font-black uppercase tracking-wider">{f.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-sm font-medium leading-relaxed">{f.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* Fallback for other nodes if any */}
            {nodes.length > 7 && (
                <div className="pt-4 border-t">
                    <div className="text-[9px] font-black uppercase text-slate-400 mb-3">Additional Brainstorming Nodes</div>
                    <div className="flex flex-wrap gap-2">
                        {nodes.filter((n: any) => !['center', 'who', 'what', 'when', 'where', 'why', 'how'].includes(n.id))
                            .map((n: any, i: number) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 font-bold border-0">
                                    {n.data?.label || n.id}
                                </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function SevenWhysDisplay({ data }: { data: any }) {
    const whys = data.whys || []
    return (
        <div className="space-y-4">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border-b-4 border-red-500">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Root Cause Analysis</h4>
                <div className="text-lg font-black italic">"{data.problemStatement}"</div>
            </div>
            <div className="relative space-y-3 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {whys.map((w: any, i: number) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[29px] top-1.5 h-7 w-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-black italic text-slate-400">
                            {i + 1}
                        </div>
                        <div className="p-4 rounded-xl border-2 border-slate-100 bg-white">
                            <div className="text-[9px] font-black uppercase text-primary/60 mb-1">Why?</div>
                            <div className="text-sm font-bold text-slate-900">{w.question}</div>
                            {w.answer && (
                                <div className="mt-3 pt-3 border-t border-slate-50">
                                    <div className="text-[9px] font-black uppercase text-emerald-600 mb-1">Answer / Because...</div>
                                    <div className="text-sm font-medium text-slate-700">{w.answer}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {data.rootCause && (
                <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-100 mt-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-2">Identified Root Cause</h4>
                    <p className="text-sm font-bold text-slate-900 italic">"{data.rootCause}"</p>
                </div>
            )}
        </div>
    )
}

function FishboneDisplay({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border-b-4 border-orange-500">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Fishbone Diagram (Ishikawa)</h4>
                <div className="text-lg font-black italic">"{data.problemEffect}"</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.categories?.map((cat: any, i: number) => (
                    <Card key={i} className="border-2 hover:border-orange-200 transition-colors">
                        <CardHeader className="p-3 bg-muted/20 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-[10px] font-black uppercase tracking-wider">{cat.name}</CardTitle>
                            <Badge variant="outline" className="text-[8px] opacity-60">{cat.causes?.length || 0} causes</Badge>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {cat.causes?.map((cause: any, j: number) => (
                                <div key={j} className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="text-[11px] font-bold text-slate-900">{cause.text}</div>
                                    {cause.subCauses?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pl-2 border-l-2 border-slate-200">
                                            {cause.subCauses.map((sc: string, k: number) => (
                                                <span key={k} className="text-[9px] font-medium text-slate-500">â€¢ {sc}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function InterviewSummaryDisplay({ data }: { data: any }) {
    const interviews = data.interviews || []
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interviews.map((int: any, i: number) => (
                    <Card key={i} className="border-2 shadow-sm">
                        <CardHeader className="p-4 border-b bg-muted/10">
                            <div className="flex justify-between items-center">
                                <div className="font-black italic text-sm text-slate-900">{int.participantName || `Interview ${i+1}`}</div>
                                <Badge className="text-[9px] uppercase font-black">{int.role}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4 text-xs">
                            <div className="space-y-1">
                                <div className="text-[9px] font-black uppercase text-red-500/60">Core Pain Point</div>
                                <p className="font-medium text-slate-700 leading-relaxed italic">"{int.painInTheirWords}"</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black uppercase text-slate-400">Current Workaround</div>
                                    <p className="font-medium">{int.workaround}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black uppercase text-slate-400">WTP Signal</div>
                                    <div className="flex items-center gap-1">
                                        <Badge variant={int.wtpSignal === 'High' ? 'default' : 'outline'} className="text-[8px] font-black bg-emerald-50 text-emerald-700 border-emerald-200">{int.wtpSignal}</Badge>
                                    </div>
                                </div>
                            </div>
                            {int.keyQuote && (
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex gap-2">
                                    <MessageSquare className="h-3 w-3 text-slate-300 mt-0.5 shrink-0" />
                                    <p className="italic text-slate-500">"{int.keyQuote}"</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// --- Specific Renderers ---

function SixPathsDisplay({ data }: { data: any }) {
    const paths = [
        { id: 'path1', label: "Alternative Industries", content: data.paths?.path1 },
        { id: 'path2', label: "Strategic Groups", content: data.paths?.path2 },
        { id: 'path3', label: "Buyer Chain", content: data.paths?.path3 },
        { id: 'path4', label: "Complementary Offerings", content: data.paths?.path4 },
        { id: 'path5', label: "Functional-Emotional Appeal", content: data.paths?.path5 },
        { id: 'path6', label: "Time/Trends", content: data.paths?.path6 },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border-b-4 border-blue-600">
                <div className="flex items-center gap-3 mb-2">
                    <Layers className="h-5 w-5 text-blue-400" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Market Reconstruction</h4>
                </div>
                <div className="text-xl font-black italic">"{data.industryContext}"</div>
                <p className="text-sm text-slate-400 mt-2 font-medium">{data.currentBusinessModel}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {paths.map((p) => (
                    <Card key={p.id} className="border-2 shadow-none hover:border-blue-200 transition-colors">
                        <CardHeader className="p-3 bg-muted/20 border-b">
                            <CardTitle className="text-[10px] font-black uppercase tracking-wider">{p.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                            <GenericDisplay data={p.content || {}} title="" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {data.synthesis && (
                <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-100">
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4">Blue Ocean Synthesis</h4>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="text-[9px] font-black text-blue-400 uppercase">Recommended Focus</div>
                            <div className="text-sm font-bold text-slate-900">{data.synthesis.recommendedFocus}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-blue-400 uppercase">Blue Ocean Opportunities</div>
                                <ul className="text-xs font-medium list-disc list-inside">
                                    {data.synthesis.blueOceanOpportunities?.map((o: any, i: number) => <li key={i}>{o.title || o}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Crazy8sDisplay({ data }: { data: any }) {
    const user = data.participants?.[0]
    const panels = user?.panels || []
    const votes = data.votingResults || []

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black tracking-tighter italic text-slate-900">{data.challengePrompt}</h3>
                <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="font-black uppercase tracking-tighter text-[9px]">{data.config?.mode} Mode</Badge>
                    <Badge variant="outline" className="font-black uppercase tracking-tighter text-[9px]">{panels.length} Concepts Produced</Badge>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {panels.map((p: any, i: number) => {
                    const isWinner = votes.some((v: any) => v.panelId === p.id)
                    return (
                        <Card key={p.id} className={cn("overflow-hidden border-2 transition-all", isWinner ? "border-amber-400 shadow-lg scale-105 z-10" : "opacity-80 scale-95")}>
                            <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center border-b">
                                {p.sketchData ? (
                                    <img src={p.sketchData} alt={p.title} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <div className="text-[10px] uppercase font-black text-slate-300 italic">No Sketch</div>
                                )}
                                <div className="absolute top-2 left-2 h-5 w-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                                    {i + 1}
                                </div>
                                {isWinner && (
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <div className="bg-amber-400 text-slate-900 p-1 rounded-full shadow-lg">
                                            <Zap size={10} className="fill-current" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-white space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-tighter text-slate-900 truncate">{p.title || `Concept ${i + 1}`}</div>
                                <div className="text-[9px] text-slate-400 font-medium leading-tight line-clamp-2">{p.description || "No description provided."}</div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

function MtpIkigaiDisplay({ data }: { data: any }) {
    const circles = [
        { label: "What you love", color: "bg-red-50 text-red-700 border-red-100", items: data.love || [] },
        { label: "What you're good at", color: "bg-blue-50 text-blue-700 border-blue-100", items: data.skills || [] },
        { label: "What the world needs", color: "bg-green-50 text-green-700 border-green-100", items: data.needs || [] },
        { label: "What you can be paid for", color: "bg-amber-50 text-amber-700 border-amber-100", items: data.paid || [] },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Massive Transformative Purpose</h4>
                <p className="text-lg font-black italic text-slate-900 leading-tight">"{data.mtp || "Not defined"}"</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {circles.map((c, i) => (
                    <div key={i} className={cn("p-3 rounded-lg border", c.color)}>
                        <h5 className="text-[9px] font-black uppercase mb-2 tracking-wider">{c.label}</h5>
                        <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(c.items) && c.items.length > 0 ? c.items.map((item: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[10px] bg-white/50 border-current/20">
                                    {item}
                                </Badge>
                            )) : <span className="text-[10px] opacity-40">None listed</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function EmpathyMapDisplay({ data }: { data: any }) {
    const quadrants = [
        { label: "SAYS", icon: MessageSquare, items: data.says || [] },
        { label: "THINKS", icon: Activity, items: data.thinks || [] },
        { label: "DOES", icon: Zap, items: data.does || [] },
        { label: "FEELS", icon: Target, items: data.feels || [] },
    ]

    return (
        <div className="grid grid-cols-2 gap-4">
            {quadrants.map((q, i) => (
                <Card key={i} className="shadow-none border-2">
                    <CardHeader className="p-3 bg-muted/30">
                        <div className="flex items-center gap-2">
                            <q.icon className="h-3.5 w-3.5 text-primary" />
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest">{q.label}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 space-y-2">
                        {Array.isArray(q.items) && q.items.map((item: string, j: number) => (
                            <div key={j} className="text-xs p-2 rounded bg-slate-50 border border-slate-100 flex items-start gap-2">
                                <div className="h-1 w-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function PersonaJourneyDisplay({ data }: { data: any }) {
    return (
        <div className="space-y-8">
            {/* Personas Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-1">Target Personas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.personas?.map((p: any) => (
                        <Card key={p.id} className="shadow-sm border-2 border-primary/5">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {p.name?.[0]}
                                    </div>
                                    <div>
                                        <div className="font-black italic text-sm">{p.name}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{p.role}</div>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-2 rounded italic text-xs leading-relaxed text-slate-600">
                                    "{p.quote}"
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black uppercase text-primary/60">Top Goal</div>
                                    <div className="text-[11px] font-bold">{p.psychographics?.goals?.[0]}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Journeys Section */}
            {data.journeys?.map((j: any) => (
                <div key={j.id} className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-1">
                        Journey Map: {j.scenario}
                    </h4>
                    <div className="relative space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/10">
                        {j.stages?.map((s: any) => (
                            <div key={s.id} className="relative pl-9">
                                <div className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary border-4 border-white ring-2 ring-primary/20 shadow-sm" />
                                <div className="p-4 rounded-xl border-2 border-slate-100 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="font-black text-sm uppercase tracking-tighter">{s.name}</div>
                                        <Badge variant="outline" className="text-[9px] font-bold">{s.duration}</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black uppercase text-slate-400">Actions</div>
                                            <ul className="text-[10px] space-y-0.5 list-disc list-inside font-medium">
                                                {s.actions?.map((a: string, k: number) => <li key={k}>{a}</li>)}
                                            </ul>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black uppercase text-slate-400">Thoughts</div>
                                            <p className="text-[10px] italic text-slate-500">"{s.thoughts?.[0]}"</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded w-fit">
                                        <Activity className="h-3 w-3" /> Sentiment: {s.emotion?.valence > 0 ? "Positive" : "Challenging"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function VpcDisplay({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-2 gap-8 relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg border-4 border-white">
                    <Zap className="h-5 w-5" />
                </div>
            </div>

            {/* Value Map */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary/10 p-1.5 rounded-lg"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Value Map</h4>
                </div>
                <div className="space-y-3">
                    <Card className="border-emerald-100 bg-emerald-50/30">
                        <CardHeader className="p-3 pb-0"><CardTitle className="text-[10px] font-black text-emerald-700 uppercase">Gain Creators</CardTitle></CardHeader>
                        <CardContent className="p-3 pt-2 text-[11px] space-y-1">
                            {data.valueMap?.gainCreators?.map((it: string, i: number) => <div key={i}>â€¢ {it}</div>)}
                        </CardContent>
                    </Card>
                    <Card className="border-blue-100 bg-blue-50/30">
                        <CardHeader className="p-3 pb-0"><CardTitle className="text-[10px] font-black text-blue-700 uppercase">Products & Services</CardTitle></CardHeader>
                        <CardContent className="p-3 pt-2 text-[11px] space-y-1">
                            {data.valueMap?.products?.map((it: string, i: number) => <div key={i}>â€¢ {it}</div>)}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Customer Profile */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2 justify-end text-right">
                    <h4 className="text-xs font-black uppercase tracking-widest">Customer Profile</h4>
                    <div className="bg-primary/10 p-1.5 rounded-lg"><Users className="h-4 w-4 text-primary" /></div>
                </div>
                <div className="space-y-3">
                    <Card className="border-amber-100 bg-amber-50/30">
                        <CardHeader className="p-3 pb-0"><CardTitle className="text-[10px] font-black text-amber-700 uppercase">Gains</CardTitle></CardHeader>
                        <CardContent className="p-3 pt-2 text-[11px] space-y-1">
                            {data.customerProfile?.gains?.map((it: string, i: number) => <div key={i}>â€¢ {it}</div>)}
                        </CardContent>
                    </Card>
                    <Card className="border-slate-100 bg-slate-50/30">
                        <CardHeader className="p-3 pb-0"><CardTitle className="text-[10px] font-black text-slate-700 uppercase">Customer Jobs</CardTitle></CardHeader>
                        <CardContent className="p-3 pt-2 text-[11px] space-y-1">
                            {data.customerProfile?.jobs?.map((it: string, i: number) => <div key={i}>â€¢ {it}</div>)}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function GridDisplay({ data, title }: { data: any, title: string }) {
    const items = Array.isArray(data) ? data : data.items || data.grids || data.paths || []
    
    return (
        <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-1">
                {title} Strategy Canvas
            </h4>
            <div className="grid grid-cols-2 gap-4">
                {Array.isArray(items) && items.length > 0 ? items.map((item: any, i: number) => (
                    <Card key={i} className="shadow-sm border-2">
                        <CardHeader className="p-3 border-b bg-muted/20">
                            <CardTitle className="text-[11px] font-black uppercase text-primary">
                                {item.label || item.name || item.title || `Segment ${i+1}`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 text-xs leading-relaxed font-medium">
                            {typeof item.value === 'string' || typeof item.content === 'string' 
                                ? (item.value || item.content) 
                                : <pre className="whitespace-pre-wrap text-[10px] bg-muted/30 p-2 rounded">{JSON.stringify(item.value || item.content || item, null, 2)}</pre>}
                        </CardContent>
                    </Card>
                )) : <GenericDisplay data={data} />}
            </div>
        </div>
    )
}

function GenericDisplay({ data, title }: { data: any, title?: string }) {
    const renderNode = (key: string, value: any, depth = 0) => {
        if (value === null || value === undefined) return null
        
        if (Array.isArray(value)) {
            return (
                <div key={key} className={cn("space-y-2", depth > 0 && "ml-4 border-l-2 pl-3 py-1")}>
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="space-y-2">
                        {value.map((item, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-xs">
                                {typeof item === 'object' ? Object.entries(item).map(([k, v]) => renderNode(k, v, depth + 1)) : String(item)}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div key={key} className={cn("space-y-2", depth > 0 && "ml-4 border-l-2 pl-3 py-1")}>
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-display">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="grid grid-cols-1 gap-3">
                        {Object.entries(value).map(([k, v]) => renderNode(k, v, depth + 1))}
                    </div>
                </div>
            )
        }

        return (
            <div key={key} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase text-primary/60 tracking-tight">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-xs font-bold text-slate-800">{String(value)}</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
                <Layers className="h-4 w-4 text-primary/40" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">{title || "Entry Data"}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {Object.entries(data).map(([k, v]) => renderNode(k, v))}
            </div>
        </div>
    )
}
