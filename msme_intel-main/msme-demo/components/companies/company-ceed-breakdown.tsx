"use client";

import React from 'react';
import { 
  Shield, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Mic,
  Activity,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CEEDRadarChart from '@/components/ceed/ceed-radar-chart';

interface CompanyCEEDBreakdownProps {
  companyId: string;
  analysis: any;
}

export default function CompanyCEEDBreakdown({ companyId, analysis }: CompanyCEEDBreakdownProps) {
  if (!analysis) return <div className="p-12 text-center text-slate-500">No CEED intelligence available for this entity.</div>;

  const quadrants = [
    { id: 'core', label: 'Core Strength', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'expansion', label: 'Expansion', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'efficiency', label: 'Efficiency', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'disruption', label: 'Disruption', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Visual Matrix Column */}
          <div className="xl:col-span-5 space-y-6">
             <CEEDRadarChart 
                core={analysis.scores.core}
                expansion={analysis.scores.expansion}
                efficiency={analysis.scores.efficiency}
                disruption={analysis.scores.disruption}
                companyName={analysis.company_name}
             />

             <Card className="bg-slate-900 border-slate-800 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                   <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-blue-600/20 text-blue-400">
                         <Activity className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Intelligence Synthesis</span>
                   </div>
                   <CardTitle className="text-lg font-black text-white italic tracking-tighter mt-2">Strategic <span className="text-blue-500">Verdict</span></CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      High potential for <span className="text-white font-bold italic">Efficiency Transformation</span> driven by 
                      evidence of manual bottlenecks. Current digital maturity is low, suggesting high ROI for entry-level automation.
                   </p>
                </CardContent>
             </Card>
          </div>

          {/* Evidence Registry Column */}
          <div className="xl:col-span-7 space-y-6">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Evidence Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {quadrants.map((q) => {
                      const data = analysis.assessments[q.id];
                      return (
                         <Card key={q.id} className="bg-slate-950 border-slate-900 group hover:border-slate-800 transition-all">
                            <CardHeader className="pb-2">
                               <div className="flex justify-between items-center">
                                  <div className={`p-1.5 rounded-lg ${q.bg} ${q.color}`}>
                                     <q.icon className="w-4 h-4" />
                                  </div>
                                  <span className="text-xl font-black text-white">{data.score}%</span>
                               </div>
                               <CardTitle className="text-sm font-black text-slate-200 uppercase tracking-widest mt-2">{q.label}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <div className="space-y-1.5">
                                  {Object.entries(data.sub_scores).map(([label, val]: [string, any]) => (
                                     <div key={label} className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-tight">
                                           <span>{label}</span>
                                           <span>{val}%</span>
                                        </div>
                                        <div className="h-0.5 bg-slate-900 rounded-full overflow-hidden">
                                           <div className={`h-full ${q.bg.split('/')[0]}`} style={{ width: `${val}%` }} />
                                        </div>
                                     </div>
                                  ))}
                               </div>
                               
                               <div className="pt-3 border-t border-slate-900">
                                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Discovery Evidence</p>
                                  <ul className="space-y-2">
                                     {data.evidence.map((ev: string, idx: number) => (
                                        <li key={idx} className="flex gap-2 text-[11px] text-slate-400 font-medium italic leading-tight">
                                           <Mic className="w-3 h-3 text-purple-500 shrink-0 mt-0.5" />
                                           "{ev}"
                                        </li>
                                     ))}
                                  </ul>
                               </div>
                            </CardContent>
                         </Card>
                      );
                   })}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
