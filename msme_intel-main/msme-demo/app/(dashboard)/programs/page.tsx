"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Hammer, 
    Lightbulb, 
    Rocket,  
    Users, 
    ArrowRight, 
    CheckCircle2, 
    Clock, 
    Trophy,
    Target,
    Zap,
    ChevronRight,
    PlayCircle,
    ExternalLink,
    Sparkles,
    Plus,
    History as HistoryIcon
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { PageContainer } from "@/components/shared/page-container";
import { ContentCard } from "@/components/shared/content-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PROGRAMS, PROGRAM_STATS } from "@/lib/demo-data/programs-data";
import { cn } from "@/lib/utils";

export default function ProgramsPage() {
    const router = useRouter();
    const [activeProgram, setActiveProgram] = useState(PROGRAMS[0]);

    const getProgramIcon = (type: string) => {
        switch (type) {
            case 'ideation': return Lightbulb;
            case 'makeathon': return Hammer;
            default: return Rocket;
        }
    };

    const getProgramColor = (type: string) => {
        switch (type) {
            case 'ideation': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'makeathon': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-indigo-600 bg-indigo-50 border-indigo-100';
        }
    };

    return (
        <PageContainer 
            title="Talent Progression Hub" 
            description="Accelerating entrepreneurial talent from ideation to industrial deployment (TRL 2-5)"
            actions={
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider border-slate-200">
                        <HistoryIcon className="mr-2 h-3.5 w-3.5" /> History
                    </Button>
                    <Button size="sm" className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-3.5 w-3.5" /> Create New Event
                    </Button>
                </div>
            }
        >
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {PROGRAM_STATS.map((stat, idx) => (
                    <MetricCard 
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change ? 12 : undefined}
                        icon={stat.title.includes('Talent') ? <Users className="h-4 w-4" /> : 
                              stat.title.includes('Challenges') ? <Target className="h-4 w-4" /> :
                              stat.title.includes('Conversion') ? <Rocket className="h-4 w-4" /> : 
                              <Trophy className="h-4 w-4" />}
                        description={stat.description}
                        trend="up"
                    />
                ))}
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="progression" className="w-full space-y-6">
                <TabsList className="bg-slate-100/50 p-1 rounded-xl h-11 border border-slate-200">
                    <TabsTrigger value="progression" className="rounded-lg gap-2 font-bold text-[10px] uppercase tracking-wider px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        Progression Pipeline
                    </TabsTrigger>
                    <TabsTrigger value="active-events" className="rounded-lg gap-2 font-bold text-[10px] uppercase tracking-wider px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        Active Events
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="progression" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-6 md:grid-cols-3">
                        {PROGRAMS.map((program) => {
                            const Icon = getProgramIcon(program.type);
                            const colorClasses = getProgramColor(program.type);
                            const isSelected = activeProgram.id === program.id;

                            return (
                                <Card 
                                    key={program.id} 
                                    className={cn(
                                        "relative overflow-hidden transition-all group flex flex-col h-full",
                                        isSelected ? "border-blue-500 ring-2 ring-blue-50 shadow-md" : "border-slate-200/60 hover:border-slate-300"
                                    )}
                                    onClick={() => setActiveProgram(program)}
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={cn("p-2 rounded-xl border", colorClasses)}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider border-slate-200 text-slate-500">
                                                {program.trl_range}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {program.name}
                                        </CardTitle>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{program.type}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-5 flex-grow">
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                            {program.description}
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                <span>Cohort Completion</span>
                                                <span className="text-slate-900">75%</span>
                                            </div>
                                            <Progress value={75} className="h-1.5" />
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 space-y-3">
                                            <h5 className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">Key Outcomes</h5>
                                            <ul className="space-y-2">
                                                {program.outcomes?.map((o: string, i: number) => (
                                                    <li key={i} className="text-[11px] flex items-center gap-2 text-slate-600">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                                        {o}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex flex-col gap-3">
                                        <div className="w-full flex gap-2">
                                            <Button 
                                                variant={isSelected ? "default" : "outline"}
                                                size="sm"
                                                className="flex-1 h-8 text-[10px] font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/programs/${program.id}/pipeline`);
                                                }}
                                            >
                                                View Pipeline
                                            </Button>
                                            {program.id === 'catalyst' && (
                                                <a
                                                    href="https://stakeholder-fawn.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 h-8 inline-flex items-center justify-center bg-white text-blue-600 border border-blue-200 text-[10px] font-bold uppercase tracking-wider rounded-md px-3 hover:bg-blue-50 transition-colors"
                                                >
                                                    Build on Platform <ExternalLink className="ml-1.5 h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                        {program.id === 'catalyst' && (
                                            <div className="bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl flex items-start gap-3">
                                                <Sparkles className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                                                <p className="text-[9px] font-bold text-blue-700 leading-normal">
                                                    Note: Students must build progress on the <span className="underline decoration-blue-200">ExO Stakeholder Platform</span> for cohort evaluation.
                                                </p>
                                            </div>
                                        )}
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Stage Details */}
                    <ContentCard 
                        title={`${activeProgram.name} Intelligence`} 
                        description={`Operational workflow and metrics for ${activeProgram.trl_range}`}
                        className="border-none shadow-sm"
                    >
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <PlayCircle className="h-3.5 w-3.5 text-blue-600" /> Engagement Framework
                                </h4>
                                <div className="space-y-6 relative ml-2">
                                    <div className="absolute left-[-1px] top-1 bottom-1 w-[2px] bg-slate-100 border-l border-dashed border-slate-200" />
                                    
                                    <div className="relative pl-8">
                                        <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-[9px] font-bold text-blue-600 shadow-sm">1</div>
                                        <div className="font-bold text-slate-900 text-sm">Challenge Publication</div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Regional problem statements are published to the student community via BuildForX portal.</p>
                                    </div>
                                    
                                    <div className="relative pl-8">
                                        <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-400 group-hover:border-blue-600">2</div>
                                        <div className="font-bold text-slate-900 text-sm">Talent Sourcing & Evaluation</div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Participants submit initial conceptual solutions or functional prototypes for peer review.</p>
                                    </div>
                                    
                                    <div className="relative pl-8">
                                        <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-400">3</div>
                                        <div className="font-bold text-slate-900 text-sm">Industry Hub Transition</div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Shortlisted talent is engaged with stakeholders for pilot projects or pre-incubation pathways.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Trophy className="h-3.5 w-3.5 text-emerald-600" /> Success Metrics & ROI
                                </h4>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">{activeProgram.metrics?.success_rate}%</div>
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Progression Rate</div>
                                        </div>
                                        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 flex flex-col gap-1">
                                            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-700">₹{activeProgram.metrics?.funding_committed}</div>
                                            <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Funding Linked</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden group shadow-lg">
                                        <div className="relative z-10 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <Zap className="h-3 w-3 text-blue-400" />
                                                </div>
                                                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Strategic Multiplier</div>
                                            </div>
                                            <div className="text-2xl font-bold tracking-tight">2.4x Value Growth</div>
                                            <p className="text-[11px] text-slate-400 leading-relaxed pr-8">
                                                Participating MSMEs see a 2.4x increase in R&D synergy compared to non-participants in regional industrial corridors.
                                            </p>
                                        </div>
                                        <Rocket className="absolute right-[-10px] bottom-[-10px] h-24 w-24 text-white/5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentCard>
                </TabsContent>

                <TabsContent value="active-events">
                    <ContentCard 
                        title="Live Event Dashboard" 
                        description="Real-time monitoring of ongoing cohort activities"
                    >
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
                            <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                                <Clock className="h-8 w-8" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base font-bold text-slate-900">No Live Events</h3>
                                <p className="text-xs text-slate-500">Real-time tracking of hackathons, expert reviews, and cohort submissions will appear here once an event is active.</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-9 px-6 text-[10px] font-bold uppercase tracking-wider rounded-lg gap-2">
                                View History Archive <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </ContentCard>
                </TabsContent>
            </Tabs>
        </PageContainer>
    );
}
