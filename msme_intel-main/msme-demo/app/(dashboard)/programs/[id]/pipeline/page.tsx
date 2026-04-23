"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    ChevronLeft, 
    Target, 
    Users, 
    ArrowRight, 
    Zap, 
    Activity, 
    ShieldCheck, 
    Network,
    Mic,
    FileText,
    TrendingUp,
    LayoutDashboard
} from 'lucide-react';
import { PageHeader } from "@/components/shared/page-header";
import { PROGRAMS } from '@/lib/demo-data/programs';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function ProgramPipelinePage() {
    const params = useParams();
    const router = useRouter();
    const programId = params.id as string;
    const program: any = PROGRAMS.find(p => p.id === programId) || PROGRAMS[0];

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
            <Breadcrumbs 
                items={[
                    { label: "Programs", href: "/programs" },
                    { label: `${program.name} Pipeline` }
                ]} 
            />
            <PageHeader 
                title={`${program.name} Intelligence Pipeline`}
                description="Forensic mapping of industrial whitespace to active student solutions for the sector."
                backHref="/programs"
                backLabel="Back to Programs Hub"
                action={
                    <Badge className="bg-indigo-600 text-white font-black px-4 py-1">{program.trl_range}</Badge>
                }
            />

            {/* Stage Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: 'Active Pipeline', value: program.metrics?.participants || '1,240', icon: Users, color: 'text-blue-600' },
                    { label: 'Intelligence Gaps', value: '34', icon: Mic, color: 'text-orange-600' },
                    { label: 'Funding Pool', value: `₹${program.metrics?.funding_committed || '0.8'} Cr`, icon: TrendingUp, color: 'text-green-600' },
                    { label: 'Success Velocity', value: `${program.metrics?.success_rate || '12'}%`, icon: Activity, color: 'text-purple-600' }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</CardTitle>
                             <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* The Intelligence Bridge Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                
                {/* 1. Discovery Input */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">1</div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter">Discovery Intake</h3>
                    </div>
                    <Card className="border-dashed border-2 border-slate-200 bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                             <Badge variant="outline" className="w-fit mb-2">SOURCE: MOSI ENGINE</Badge>
                             <CardTitle className="text-lg">Unstructured Painpoints</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="p-3 bg-slate-50 rounded-lg border italic text-xs text-slate-500">
                                "...inspection takes us 40 minutes per gear. Half our rejection is due to visual fatigue..."
                             </div>
                             <div className="p-3 bg-slate-50 rounded-lg border italic text-xs text-slate-500">
                                "...we can't find talent who understands both PLC and Edge AI..."
                             </div>
                             <Button variant="ghost" className="w-full text-[10px] font-black text-indigo-600 hover:bg-indigo-50">
                                VIEW ALL RAW INPUTS <ChevronLeft className="h-3 w-3 rotate-180" />
                             </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* 2. Pipeline Processing */}
                <div className="space-y-4 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">2</div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter">Active Solutions</h3>
                    </div>
                    
                    {/* The "Arrow" connector (CSS only) */}
                    <div className="absolute left-[-20px] top-1/2 hidden lg:block">
                        <ArrowRight className="h-8 w-8 text-slate-300" />
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'AI Gear-Visual QC', stage: 'Shortlisted', progress: 85 },
                            { name: 'PLC-to-Cloud Middleware', stage: 'Prototyping', progress: 40 },
                            { name: 'Edge-AI Maintenance Tool', stage: 'Ideation', progress: 15 }
                        ].map((sol, i) => (
                            <Card key={i} className="hover:border-indigo-200 transition-colors cursor-pointer group">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm text-slate-800">{sol.name}</h4>
                                        <Badge className="text-[8px] bg-emerald-50 text-emerald-700 border-emerald-200">{sol.stage}</Badge>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 group-hover:bg-indigo-500 transition-all" style={{ width: `${sol.progress}%` }} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 3. Industry Output */}
                <div className="space-y-4 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">3</div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter">Industry Exit</h3>
                    </div>
                    
                    <div className="absolute left-[-20px] top-1/2 hidden lg:block">
                        <ArrowRight className="h-8 w-8 text-slate-300" />
                    </div>

                    <Card className="bg-emerald-900 text-white border-none shadow-xl overflow-hidden relative">
                        <CardHeader>
                             <CardTitle className="text-emerald-100">Conversion Value</CardTitle>
                             <CardDescription className="text-emerald-300">Ready for pilot deployment</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="text-3xl font-black mb-4">₹4.2 Cr <span className="text-xs font-normal text-emerald-400">PROJECTED ARR</span></div>
                             <div className="space-y-4">
                                 <div className="flex items-center gap-3">
                                     <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                     <span className="text-xs font-bold">12 Registered IP Filings</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <Network className="h-5 w-5 text-emerald-400" />
                                     <span className="text-xs font-bold">4 Strategic Partnerships</span>
                                 </div>
                             </div>
                        </CardContent>
                        <Zap className="absolute right-[-20px] bottom-[-20px] h-32 w-32 text-white/5 rotate-12" />
                    </Card>
                    
                    <Button className="w-full bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50 font-black shadow-lg">
                        LAUNCH PILOT PROGRAM <Activity className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            </div>

            {/* Bottom Insight Feed */}
            <div className="mt-12 bg-white rounded-2xl border p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                     <h2 className="font-black text-slate-900 text-xl flex items-center gap-3 uppercase tracking-tighter">
                         <LayoutDashboard className="h-6 w-6 text-indigo-600" />
                         Pipeline Intelligence Feed
                     </h2>
                     <Button variant="outline" size="sm" className="text-[10px] font-black tracking-widest">REAL-TIME DATA ENABLED</Button>
                 </div>
                 <div className="grid md:grid-cols-2 gap-8 divide-x border-t pt-8">
                      <div className="space-y-4 pr-8">
                           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Critical Blockers</h4>
                           <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                                <p className="text-sm font-bold text-rose-900 tracking-tight">Talent Gap: Edge Computing Infrastructure</p>
                                <p className="text-[11px] text-rose-700 mt-1 italic">Shortage of students skilled in low-latency industrial protocols.</p>
                           </div>
                      </div>
                      <div className="space-y-4 pl-8">
                           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Next Phase Readiness</h4>
                           <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                <p className="text-sm font-bold text-indigo-900 tracking-tight">Hical Prototype Pilot Readiness</p>
                                <p className="text-[11px] text-indigo-700 mt-1 italic">Solution #402 meets 85% of stakeholder technical criteria.</p>
                           </div>
                      </div>
                 </div>
            </div>
        </div>
    );
}
