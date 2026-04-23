"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, Clock, 
  TrendingUp, Zap, Target, ShieldCheck, 
  MessageSquare, Save, Send, ChevronRight,
  BarChart3, BrainCircuit, Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PENDING_REVIEWS_MOCK } from '@/data/experts';
import { cn } from '@/lib/utils';

export default function RoadmapReviewDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const review = PENDING_REVIEWS_MOCK.find(r => r.id === reviewId) || PENDING_REVIEWS_MOCK[0];
  
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'modify'>('pending');

  const scores = [
    { label: "Technical Feasibility", score: 88, color: "bg-emerald-500" },
    { label: "Market Alignment", score: 74, color: "bg-amber-500" },
    { label: "State Policy Synergy", score: 92, color: "bg-emerald-500" },
    { label: "Scaling Potential", score: 65, color: "bg-orange-500" },
  ];

  return (
    <DashboardLayout shellRole="ceo">
      <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-20">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="group gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/ceo/expert-hub')}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Review Queue
          </Button>
          <div className="flex items-center gap-3">
             <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 uppercase tracking-widest text-[10px] font-bold px-3">
                ID: {reviewId || "REV-2026-X"}
             </Badge>
             <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-3 font-bold text-[10px] uppercase tracking-wider">
               Priority: High
             </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <BrainCircuit className="h-64 w-64 text-primary" />
           </div>
           
           <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{review.companies?.name}</h1>
                    <p className="text-sm text-muted-foreground font-medium">{review.company_roadmaps?.title}</p>
                 </div>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1">
                "{review.company_roadmaps?.executive_summary}"
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader className="border-b border-border/50 bg-slate-50/50 py-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Roadmap Strategic Pillars
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-amber-500" /> Key Milestones
                       </h4>
                       <ul className="space-y-3">
                          {[
                            "Q3-26: Cloud-native ERP migration for inventory visibility",
                            "Q4-26: ISO-9001 certification automation via AI audit tools",
                            "Q1-27: Integration into Defence PSUs supply portal"
                          ].map((m, i) => (
                            <li key={i} className="flex gap-3 text-sm text-foreground/90">
                               <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                               {m}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <AlertCircle className="h-3.5 w-3.5 text-rose-500" /> Identified Risks
                       </h4>
                       <ul className="space-y-3">
                          {[
                            "Latency in high-precision sensor procurement from EU",
                            "Workforce resistance to automation dashboard adoption",
                            "Initial 15% CAPEX surplus required for bespoke ETL"
                          ].map((r, i) => (
                            <li key={i} className="flex gap-3 text-sm text-foreground/90">
                               <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                               {r}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>

                 <Separator />

                 <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                       <Lightbulb className="h-3.5 w-3.5 text-primary" /> Expert Evaluation Guidance
                    </h4>
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 text-sm text-foreground/80 leading-relaxed">
                       <p>
                         This roadmap leverages the <strong>Nagpur Aerospace Cluster</strong> synergy. Please validate if the projected 18% efficiency gain in QC is realistic based on current MSME baseline data in the region.
                       </p>
                       <p>
                         Special Focus: <em>Regulatory Compliance Phase (Q4 2026)</em> - Verify if the proposed AI audit tool meets current state cybersecurity incentives.
                       </p>
                    </div>
                 </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border shadow-sm">
               <CardHeader className="py-4">
                 <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Evaluation Metrics
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {scores.map(s => (
                       <div key={s.label} className="space-y-3">
                          <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                             <span>{s.label}</span>
                             <span className="text-foreground">{s.score}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                             <div className={cn("h-full rounded-full transition-all duration-1000", s.color)} style={{ width: `${s.score}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* Review Sidebar */}
          <div className="space-y-6">
             <Card className="rounded-2xl border-primary/20 shadow-lg shadow-primary/5 sticky top-24">
                <CardHeader className="bg-primary/5 rounded-t-2xl border-b border-primary/10 py-5">
                   <CardTitle className="text-base font-bold flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-primary" /> 
                      Your Review
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-6">
                   <div className="space-y-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Overall Status</p>
                      <div className="grid grid-cols-3 gap-2">
                         <Button 
                            variant={status === 'approved' ? 'default' : 'outline'} 
                            className={cn("h-14 flex-col text-[10px] font-bold uppercase tracking-tighter gap-1", status === 'approved' && "bg-emerald-600 hover:bg-emerald-700")}
                            onClick={() => setStatus('approved')}
                         >
                            <CheckCircle2 className="h-4 w-4" /> Approve
                         </Button>
                         <Button 
                            variant={status === 'modify' ? 'default' : 'outline'} 
                            className={cn("h-14 flex-col text-[10px] font-bold uppercase tracking-tighter gap-1", status === 'modify' && "bg-amber-500 hover:bg-amber-600")}
                            onClick={() => setStatus('modify')}
                         >
                            <Clock className="h-4 w-4" /> Modify
                         </Button>
                         <Button 
                            variant="outline" 
                            className="h-14 flex-col text-[10px] font-bold uppercase tracking-tighter gap-1 text-rose-500 hover:bg-rose-50"
                         >
                            <AlertCircle className="h-4 w-4" /> Reject
                         </Button>
                      </div>
                   </div>

                   <Separator />

                   <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground pl-1 flex items-center justify-between">
                         Validation Feedback
                         <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      </p>
                      <textarea 
                        className="w-full min-h-[160px] rounded-xl border border-border bg-slate-50/50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Provide detailed feedback on technical feasibility or market alignment..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                   </div>

                   <div className="space-y-3 pt-2">
                      <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest shadow-md">
                         <Send className="h-4 w-4 mr-2" /> Submit Review
                      </Button>
                      <Button variant="ghost" className="w-full h-10 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground">
                         <Save className="h-4 w-4 mr-2" /> Save Draft
                      </Button>
                   </div>
                </CardContent>
             </Card>

             <Card className="rounded-2xl bg-slate-900 text-white p-5 border-none">
                <div className="flex items-center gap-3 mb-4">
                   <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <BarChart3 className="h-5 w-5" />
                   </div>
                   <div>
                      <h5 className="text-sm font-bold">Incentive Pool</h5>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">State-wide Expert Rewards</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">This Review</span>
                      <span className="font-bold text-emerald-400">₹2,500</span>
                   </div>
                   <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                   </div>
                   <p className="text-[10px] text-slate-500 italic">
                      Payout processed automatically upon roadmap validation completion.
                   </p>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { 
  ClipboardCheck
} from 'lucide-react';
