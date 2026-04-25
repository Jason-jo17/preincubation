"use client";

import React from "react";
import { 
  Rocket, 
  Target, 
  Zap, 
  Activity, 
  Map, 
  Users, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useAssessmentStore } from "@/lib/store/assessment";

export default function StudentDashboard() {
  const { getFrameworkLevel } = useAssessmentStore();
  
  const stats = [
    { label: "TRL Level", value: `0${getFrameworkLevel('TRL')}`, icon: Rocket, color: "text-orange-500", desc: "Technology Readiness" },
    { label: "CRL Level", value: `0${getFrameworkLevel('CRL')}`, icon: Activity, color: "text-emerald-500", desc: "Commercial Readiness" },
    { label: "IRL Level", value: `0${getFrameworkLevel('IRL')}`, icon: Layers, color: "text-blue-500", desc: "Investment Readiness" },
  ];
  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Innovator Node
             </div>
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Cohort: MSME-Q2</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Innovator <span className="text-accent">Workspace</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Comprehensive advancement terminal. Track progress, manage stakeholders, and execute strategic experiments.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="h-14 px-8 border-2 font-black uppercase italic text-[11px] tracking-widest rounded-2xl">
             Download Report
          </Button>
          <Button className="bg-text-primary text-bg-base h-14 px-8 font-black uppercase italic text-[11px] tracking-widest rounded-2xl shadow-xl shadow-text-primary/10 hover:bg-accent transition-all group">
             Record Interaction <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Progress Matrix */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon className="w-24 h-24" />
            </div>
            <div className="space-y-4 relative z-10">
               <p className="text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">{stat.label}</p>
               <div className="flex items-baseline gap-4">
                  <h3 className="text-6xl font-black italic tracking-tighter">Stage {stat.value}</h3>
                  <span className={cn("text-xs font-bold", stat.color)}>+1 lvl</span>
               </div>
               <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.desc}</p>
               <div className="h-1.5 w-full bg-bg-base rounded-full overflow-hidden border border-border">
                  <div className={cn("h-full", stat.color.replace('text', 'bg'))} style={{ width: `${(parseInt(stat.value) / 9) * 100}%` }} />
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left Column: Intelligence Feed */}
         <div className="lg:col-span-8 space-y-8">
            <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] overflow-hidden">
               <CardHeader className="p-8 border-b border-border flex flex-row items-center justify-between bg-bg-raised/50">
                  <div className="flex items-center gap-3">
                     <Sparkles className="w-5 h-5 text-accent" />
                     <CardTitle className="text-sm font-black uppercase tracking-widest">Co-Founder Insights</CardTitle>
                  </div>
                  <Badge variant="outline" className="rounded-none font-black text-[9px] uppercase tracking-widest bg-accent/10 text-accent border-accent/20 px-3">AI Powered</Badge>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  {[
                    { t: "Market Entry Validation", d: "Recommended: Shift focus to Nagpur regional industrial cluster based on recent sector trends.", type: "Strategy" },
                    { t: "Technical Compliance", d: "Action Required: Update safety documentation for TRL 5 verification readiness.", type: "Task" },
                    { t: "Stakeholder Momentum", d: "Positive: Interaction frequency with Tier 1 partners has increased by 40% this week.", type: "Growth" }
                  ].map((insight, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-bg-base/50 border border-border group hover:border-accent/30 transition-all">
                       <div className="size-12 rounded-2xl bg-bg-raised border border-border flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <Zap className="w-5 h-5" />
                       </div>
                       <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                             <h4 className="font-black italic uppercase text-sm tracking-tight">{insight.t}</h4>
                             <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{insight.type}</span>
                          </div>
                          <p className="text-xs text-text-secondary font-medium leading-relaxed">{insight.d}</p>
                       </div>
                    </div>
                  ))}
               </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Map className="w-4 h-4 text-accent" /> Journey Roadmap
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="space-y-4">
                        {[
                          { l: "Problem Mapping", s: "Completed" },
                          { l: "Solution Design", s: "In Progress" },
                          { l: "Market Validation", s: "Scheduled" }
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-4">
                             <div className={cn(
                               "size-3 rounded-full",
                               step.s === 'Completed' ? "bg-success shadow-[0_0_10px_rgba(34,197,94,0.3)]" : 
                               step.s === 'In Progress' ? "bg-accent animate-pulse" : "bg-bg-raised border border-border"
                             )} />
                             <div className="flex-1">
                                <p className="text-[11px] font-black uppercase tracking-tight">{step.l}</p>
                                <p className="text-[9px] font-bold text-text-muted uppercase italic">{step.s}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                     <Button variant="outline" className="w-full h-12 rounded-xl font-black uppercase italic text-[10px] tracking-widest" asChild>
                        <Link href="/student/roadmap">Enter Strategic Map <ArrowUpRight className="w-3.5 h-3.5 ml-1" /></Link>
                     </Button>
                  </CardContent>
               </Card>

               <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" /> Active Stakeholders
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="space-y-4">
                        {[
                          { n: "Dr. Sameer K.", r: "Regional Advisor", i: 12 },
                          { n: "TechCorp Ltd", r: "Industry Partner", i: 5 },
                          { n: "MSINS Hub", r: "Incubation Node", i: 8 }
                        ].map((stk, i) => (
                          <div key={i} className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center font-black text-[10px] text-accent">
                                   {stk.n[0]}
                                </div>
                                <div className="space-y-0.5">
                                   <p className="text-[11px] font-black uppercase tracking-tight">{stk.n}</p>
                                   <p className="text-[9px] font-bold text-text-muted uppercase italic">{stk.r}</p>
                                </div>
                             </div>
                             <span className="text-[10px] font-black text-text-muted">{stk.i} Int.</span>
                          </div>
                        ))}
                     </div>
                     <Button variant="outline" className="w-full h-12 rounded-xl font-black uppercase italic text-[10px] tracking-widest" asChild>
                        <Link href="/student/interactions">View Full Lattice <ArrowUpRight className="w-3.5 h-3.5 ml-1" /></Link>
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Right Column: Control Center */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-text-primary text-bg-base rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Target className="w-48 h-48 -mr-16 -mt-16" />
               </div>
               <CardContent className="p-10 space-y-8 relative z-10">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Strategic<br/>Next Step</h3>
                     <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Priority Alpha</p>
                  </div>
                  
                  <div className="p-6 bg-bg-base/10 rounded-3xl border border-bg-base/20 space-y-4">
                     <p className="text-sm font-bold italic leading-relaxed">
                        "Initiate a high-stakes interview with your primary industry lead to validate the 'Core' efficiency gap detected in your last synthesis."
                     </p>
                     <Button className="w-full h-12 bg-accent text-white font-black uppercase italic text-[10px] tracking-[0.2em] rounded-xl shadow-lg shadow-accent/20 group-hover:scale-[1.02] transition-transform" asChild>
                        <Link href="/mosi/setup">Launch MOSI Setup</Link>
                     </Button>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-bg-base/10">
                     <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">System Readiness</h4>
                     {[
                       { l: "Documentation", v: 85 },
                       { l: "Stakeholder Access", v: 62 },
                       { l: "Evidence Vault", v: 94 }
                     ].map(r => (
                       <div key={r.l} className="space-y-1.5">
                          <div className="flex justify-between text-[9px] font-black uppercase">
                             <span>{r.l}</span>
                             <span>{r.v}%</span>
                          </div>
                          <div className="h-1 bg-bg-base/20 rounded-full overflow-hidden">
                             <div className="h-full bg-accent" style={{ width: `${r.v}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] overflow-hidden">
               <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Network Pulse</CardTitle>
               </CardHeader>
               <CardContent className="p-8 text-center space-y-4">
                  <div className="flex justify-center">
                     <div className="relative">
                        <div className="size-24 rounded-full border-4 border-accent/20 flex items-center justify-center">
                           <TrendingUp className="w-8 h-8 text-accent" />
                        </div>
                        <div className="absolute inset-0 size-24 rounded-full border-4 border-accent border-t-transparent animate-spin-slow" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xl font-black italic tracking-tighter uppercase">88% Aligned</p>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Ecosystem Integration Score</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
