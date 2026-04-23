"use client";

import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { BuildForXPRD } from '@/lib/types/prd';
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions';
import { getNewCompanyById } from '@/lib/demo-data/new-companies';
import Link from 'next/link';
import { 
  FileText, 
  Target, 
  Settings, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Layout,
  Code,
  ArrowRight,
  Sparkles,
  Database,
  Binary,
  Mic,
  MessageSquare,
  Clock,
  Quote,
  TrendingUp,
  Globe,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface PRDDetailViewProps {
  prd: BuildForXPRD;
}

const PRDDetailView: React.FC<PRDDetailViewProps> = ({ prd }) => {
  const company = getNewCompanyById(prd.company_id);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600 hover:bg-blue-700 border-none px-3 font-black uppercase tracking-widest text-[9px] py-1">
              {prd.competition_type}
            </Badge>
            <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-500 font-black uppercase tracking-widest text-[9px] py-1">
               ID: {prd.prd_code}
            </Badge>
            <Badge variant="outline" className="border-blue-200 bg-blue-50/50 text-blue-700 font-black uppercase tracking-widest text-[9px] py-1 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-blue-600" /> SECTOR LOGIN: {prd.sector_id?.split('-').slice(0, 2).join(' ').toUpperCase() || 'GENERAL'}
            </Badge>
            {company && (
              <Link href={`/companies/${company.id}`}>
                <Badge className="bg-slate-900 text-white border-none px-3 font-black uppercase tracking-widest text-[9px] py-1 flex items-center gap-1.5 cursor-pointer hover:bg-black transition-colors shadow-lg shadow-black/10">
                  <Building2 className="w-3 h-3 text-blue-400" /> {company.name} Profile
                </Badge>
              </Link>
            )}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">{prd.title}</h1>
          <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">{prd.executive_summary}</p>
        </div>
        <div className="flex gap-3">
          {company?.regional_context && (
            <Link href={`/regional/sectors/${prd.sector_id || 'all'}`}>
              <button className="bg-slate-900 text-white hover:bg-black py-3 px-6 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 group border border-slate-800">
                <Globe className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 text-blue-400">Regional Intel</span>
                  <span className="block text-xs font-black uppercase tracking-widest text-white">Full Market Context</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
          <div className="bg-blue-50 border border-blue-100 text-blue-600 py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[11px] font-black uppercase tracking-widest">Expected TRL: {prd.trl_level_expected}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="problem" className="w-full">
        <TabsList className="bg-slate-100/50 border border-slate-200 p-1 h-auto flex-wrap sm:flex-nowrap gap-1 rounded-2xl shadow-inner">
          <TabsTrigger value="problem" className="flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all rounded-xl">
            Problem
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all rounded-xl">
            Requirements
          </TabsTrigger>
          <TabsTrigger value="specs" className="flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all rounded-xl">
            Tech Specs
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all rounded-xl">
            Evaluation
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all rounded-xl">
            Discovery Intel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
               <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                     <Target className="w-4 h-4 text-blue-500" /> Problem Overview
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-6">
                  <p className="text-slate-600 leading-relaxed font-medium">{prd.problem_statement?.overview}</p>
                  <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 border-l-4 border-l-blue-600 shadow-sm">
                     <h4 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" /> Business Impact
                     </h4>
                     <p className="text-slate-900 font-bold text-lg italic tracking-tight leading-snug">"{prd.problem_statement?.impact}"</p>
                  </div>
               </CardContent>
            </Card>

            <div className="space-y-6">
               <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3 border-b border-slate-50">
                     <CardTitle className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Stakeholders</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <ul className="space-y-2">
                        {prd.problem_statement?.stakeholders_affected?.map((s, i) => (
                           <li key={i} className="flex items-center gap-3 text-xs text-slate-700 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {s}
                           </li>
                        ))}
                     </ul>
                  </CardContent>
               </Card>
               
               <Card className="bg-amber-50/30 border-amber-100 shadow-sm rounded-2xl border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Root Causes
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <ul className="space-y-3">
                        {prd.problem_statement?.root_causes?.map((c, i) => (
                           <li key={i} className="text-xs text-slate-600 font-bold flex gap-3 items-start">
                              <span className="p-0.5 rounded-full bg-amber-200 text-amber-700 mt-0.5"><CheckCircle2 className="w-2.5 h-2.5" /></span> {c}
                           </li>
                        ))}
                     </ul>
                  </CardContent>
               </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="mt-6">
            <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
               <CardHeader className="flex flex-row justify-between items-center border-b border-slate-100 bg-slate-50/30 px-6 py-6">
                  <CardTitle className="text-lg font-black italic tracking-tighter flex items-center gap-2 text-slate-900">
                     <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Functional Requirements
                  </CardTitle>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                     {prd.functional_requirements?.length} Active Needs
                  </Badge>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {prd.functional_requirements?.map((req, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-blue-400 bg-slate-50/50 group transition-all duration-300 shadow-sm hover:shadow-md">
                           <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-lg">{req.id}</span>
                              <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase border-0 py-1 ${
                                 req.priority === 'Must Have' ? 'bg-blue-100 text-blue-700' : 
                                 req.priority === 'Should Have' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                              }`}>
                                 {req.priority}
                              </Badge>
                           </div>
                           <h4 className="text-slate-900 font-black text-base mb-3 group-hover:text-blue-600 transition-colors italic tracking-tight">{req.requirement}</h4>
                           <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                                 <Layout className="w-3 h-3" /> Acceptance Criteria
                              </p>
                              {req.acceptance_criteria.map((ac, j) => (
                                 <p key={j} className="text-xs text-slate-500 font-medium pl-4 border-l-2 border-slate-200 leading-relaxed group-hover:border-blue-400 transition-colors">{ac}</p>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                 <CardHeader className="border-b border-slate-50">
                    <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Code className="w-4 h-4 text-purple-500" /> Technical Stack
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 space-y-8">
                    <div className="flex flex-wrap gap-2">
                       {prd.technical_specifications?.tech_stack?.map((t, i) => (
                          <Badge key={i} className="bg-purple-50 text-purple-700 border border-purple-100 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest rounded-xl">
                             {t}
                          </Badge>
                       ))}
                    </div>
                    <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Settings className="w-3 h-3" /> Architecture Guidelines
                       </h4>
                       <p className="text-sm text-slate-700 leading-relaxed font-bold italic tracking-tight">"{prd.technical_specifications?.architecture}"</p>
                    </div>
                 </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                 <CardHeader className="border-b border-slate-50">
                    <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Database className="w-4 h-4 text-pink-500" /> Data Model
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="p-8 bg-slate-900 border-t border-slate-800 font-mono text-[12px] text-emerald-400 leading-normal">
                       <div className="flex items-center gap-2 mb-4 text-slate-500 font-black uppercase text-[9px] tracking-widest">
                          <Binary className="w-4 h-4" /> Schema Definition
                       </div>
                       <pre className="whitespace-pre-wrap">{prd.technical_specifications?.data_model}</pre>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="evaluation" className="mt-6">
           <Card className="bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden border-t-0">
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
              <CardHeader className="px-8 py-8 bg-slate-50/50">
                 <CardTitle className="text-2xl font-black italic tracking-tighter flex items-center gap-3 text-slate-900">
                    <Award className="w-6 h-6 text-blue-600" /> Evaluation Matrix
                 </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                 <div className="space-y-12">
                    {Object.entries(prd.evaluation_criteria || {}).map(([category, criteria], idx) => (
                       <div key={idx} className="space-y-6">
                          <div className="flex items-center gap-4">
                             <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] whitespace-nowrap">{category} Metrics</h4>
                             <div className="h-[1px] flex-1 bg-slate-100" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {(criteria as any).map((c: any, i: number) => (
                                <div key={i} className="flex justify-between items-center gap-6 p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                                   <div className="space-y-2">
                                      <h5 className="font-black text-slate-900 text-base tracking-tight italic">{c.criterion}</h5>
                                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">{c.description}</p>
                                   </div>
                                   <div className="text-right flex flex-col items-end">
                                      <span className="text-3xl font-black text-blue-600 tracking-tighter">{c.weight}%</span>
                                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Weightage</span>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="discovery" className="mt-6 space-y-6">
           {(() => {
              const session = MOSI_SESSIONS.find(s => s.id === prd.mosi_session_id);
              if (!session) return (
                 <Card className="bg-slate-50 border-dashed border-2 py-20 text-center">
                    <Mic className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold italic">No linked discovery session found for this challenge.</p>
                 </Card>
              );

              return (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                    <div className="lg:col-span-2 space-y-6">
                       {/* High-Fidelity Discovery Summary */}
                       <Card className="bg-blue-600 text-white rounded-3xl border-none shadow-xl shadow-blue-500/10 overflow-hidden">
                          <CardContent className="p-8">
                             <div className="flex items-center gap-2 mb-4">
                                <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-widest px-2">Discovery Audit Overview</Badge>
                             </div>
                             <h3 className="text-2xl font-black italic tracking-tighter mb-4 leading-tight">Problem Summary</h3>
                             <p className="text-blue-50 font-bold text-lg leading-relaxed italic">"{session.problem_summary}"</p>
                          </CardContent>
                       </Card>

                       <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-6">
                             <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-lg">
                                   <Mic className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                   <CardTitle className="text-lg font-black italic tracking-tighter uppercase">{session.title}</CardTitle>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{session.date} • {Math.floor(session.duration/60)} Mins Audit</p>
                                </div>
                             </div>
                          </CardHeader>
                          <CardContent className="p-0">
                             <div className="max-h-[600px] overflow-y-auto p-8 space-y-6 bg-slate-50/10">
                                {session.transcript?.map((entry, i) => (
                                   <div key={i} className={`flex flex-col ${entry.speaker === 'Interviewer' ? 'items-start' : 'items-end'}`}>
                                      <div className="flex items-center gap-2 mb-1.5 px-1">
                                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{entry.speaker}</span>
                                         <span className="text-[9px] text-slate-300 font-bold">{entry.time}</span>
                                      </div>
                                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border ${
                                         entry.speaker === 'Interviewer' 
                                         ? 'bg-white border-slate-100 rounded-tl-none text-slate-700' 
                                         : 'bg-blue-600 border-blue-500 text-white rounded-tr-none'
                                      } ${entry.opportunity ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}>
                                         {entry.text}
                                         {entry.opportunity && (
                                            <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                                               <Sparkles className="w-3 h-3 text-amber-200" /> Strategic Opportunity Identified
                                            </div>
                                         )}
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </CardContent>
                       </Card>
                    </div>

                    <div className="space-y-6">
                       {/* Gap Analysis Card */}
                       {company?.gap_analysis && (
                        <Card className="bg-white border-slate-200 shadow-sm rounded-3xl overflow-hidden border-t-4 border-t-red-500">
                          <CardHeader className="pb-2">
                             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> MOSI Gap Analysis
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                             <div className="flex justify-between items-end mb-2">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Readiness Score</span>
                               <span className="text-2xl font-black text-slate-900">{company.gap_analysis.overall_gap_score}%</span>
                             </div>
                             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                               <div 
                                 className="bg-red-500 h-full rounded-full transition-all duration-1000" 
                                 style={{ width: `${company.gap_analysis.overall_gap_score}%` }} 
                               />
                             </div>
                             <div className="space-y-2 pt-2">
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Critical Production Gaps</span>
                               {company.gap_analysis.critical_gaps?.map((gap, i) => (
                                 <div key={i} className="flex gap-2 items-start text-xs font-bold text-slate-700 bg-red-50/50 p-2 rounded-lg border border-red-100">
                                   <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" />
                                   {gap}
                                 </div>
                               ))}
                             </div>
                          </CardContent>
                        </Card>
                       )}

                       {/* Global Benchmark Card */}
                       {company?.benchmark_msme && (
                        <Card className="bg-slate-900 text-white rounded-3xl border-none shadow-xl overflow-hidden">
                          <CardHeader className="border-b border-white/10 pb-4 bg-blue-600">
                             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Global Benchmark Peer
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-4">
                             <div>
                               <h4 className="text-lg font-black italic tracking-tighter text-blue-400">{company.benchmark_msme.name}</h4>
                               <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                 <MapPin className="w-3 h-3" /> {company.benchmark_msme.location} • Revenue: {company.benchmark_msme.revenue}
                               </p>
                             </div>
                             <p className="text-xs font-medium text-slate-300 leading-relaxed italic">"{company.benchmark_msme.description}"</p>
                             
                             <div className="space-y-3 pt-2">
                               <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Capability Comparison</span>
                               {company.benchmark_msme.gap_comparison.map((cmp, i) => (
                                 <div key={i} className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/10">
                                   <div className="flex justify-between text-[10px] font-black">
                                     <span className="text-slate-300 tracking-tight">{cmp.category}</span>
                                     <span className="text-blue-400">{cmp.current_score} / {cmp.benchmark_score}</span>
                                   </div>
                                   <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
                                     <div 
                                       className="bg-blue-500 h-full rounded-l-full" 
                                       style={{ width: `${cmp.current_score}%` }} 
                                     />
                                     <div 
                                       className="bg-blue-300/40 h-full rounded-r-full" 
                                       style={{ width: `${cmp.benchmark_score - cmp.current_score}%` }} 
                                     />
                                   </div>
                                   <p className="text-[9px] text-slate-500 italic leading-snug">{cmp.rationale}</p>
                                 </div>
                               ))}
                             </div>
                          </CardContent>
                        </Card>
                       )}

                       <Card className="bg-slate-900 text-white rounded-3xl border-none shadow-xl overflow-hidden">
                          <CardHeader className="border-b border-white/10 pb-4">
                             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Strategic Rationale</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-6">
                             {session.rationales.map((rat, i) => (
                                <div key={i} className="flex gap-3 items-start group">
                                   <div className="mt-1 p-1 rounded-md bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                      <CheckCircle2 className="w-3 h-3" />
                                   </div>
                                   <p className="text-xs font-bold text-slate-300 italic leading-relaxed">{rat}</p>
                                </div>
                             ))}
                          </CardContent>
                       </Card>

                       {/* Technical Recommendations From Discovery */}
                       <Card className="bg-indigo-600 text-white rounded-3xl border-none shadow-xl shadow-indigo-500/10 overflow-hidden">
                          <CardHeader className="border-b border-white/10 pb-4">
                             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Recommended Tech Stack</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6">
                             <div className="flex flex-wrap gap-2">
                                {session.tech_stack_recommended?.map((tech, i) => (
                                   <Badge key={i} className="bg-white/10 text-white border-0 py-1.5 px-3 font-black text-[9px] uppercase tracking-widest rounded-lg">
                                      {tech}
                                   </Badge>
                                ))}
                             </div>
                          </CardContent>
                       </Card>

                       <Card className="bg-white border-slate-200 rounded-3xl shadow-sm border-l-4 border-l-amber-500">
                          <CardHeader className="pb-2">
                             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Quote className="w-3 h-3 text-amber-500" /> Key Witness Statements
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                             {session.context_quotes.map((quote, i) => (
                                <p key={i} className="text-[13px] font-black text-slate-800 italic leading-snug tracking-tight">"{quote}"</p>
                             ))}
                          </CardContent>
                       </Card>

                       <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 space-y-3">
                          <div className="flex items-center gap-2">
                             <Target className="w-4 h-4 text-blue-600" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Projected ROI</span>
                          </div>
                          <p className="text-xl font-black text-slate-900 tracking-tighter italic leading-none">{session.potential_roi}</p>
                       </div>
                    </div>
                 </div>
              );
           })()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Award = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

export default PRDDetailView;
