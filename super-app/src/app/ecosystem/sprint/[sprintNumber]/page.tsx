"use client";

import React from "react";
import { 
  Flag, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Activity,
  Layers,
  Rocket,
  ShieldCheck,
  Target,
  ArrowLeft,
  XCircle,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const TOOLS = [
  { id: "T1", name: "Problem Hub Sync", status: "Gate Passed", gate: true, desc: "Alignment with active ecosystem gaps verified." },
  { id: "T2", name: "Solution Architecture", status: "Review Pending", gate: true, desc: "Technical lattice must support v1.0 deployment." },
  { id: "T3", name: "Stakeholder Map", status: "Action Required", gate: false, desc: "Mapping of secondary value chain nodes." },
  { id: "T4", name: "Resource Inventory", status: "Gate Passed", gate: true, desc: "Infrastructure availability confirmed." },
];

export default function SprintDetailPage({ params }: { params: Promise<{ sprintNumber: string }> }) {
  const { sprintNumber } = React.use(params);
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-4">
           <Link href="/ecosystem/sprint" className="group flex items-center gap-2 text-text-muted hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Engine</span>
           </Link>
           <div className="space-y-2">
              <div className="flex items-center gap-2">
                 <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-accent/20 text-accent px-3">Sprint {sprintNumber}</Badge>
                 <Badge className="bg-success/10 text-success border border-success/20 text-[9px] font-black uppercase tracking-widest px-3">TRL 3-4 Focus</Badge>
              </div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                Laboratory <span className="text-accent">Lattice Synthesis</span>
              </h1>
              <p className="text-text-secondary max-w-2xl font-medium">Verification Gateway Checklist for commercial entry readiness.</p>
           </div>
        </div>
        <div className="text-right space-y-1">
           <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Target Milestone</p>
           <p className="text-xl font-black italic text-accent uppercase tracking-tighter">Alpha-Node Deployment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Checklist */}
         <div className="lg:col-span-8 space-y-8">
            <Card className="bg-bg-surface border-border rounded-[2.5rem] overflow-hidden shadow-xl">
               <CardHeader className="bg-bg-base/50 border-b border-border p-8">
                  <div className="flex items-center gap-3">
                     <Flag className="w-5 h-5 text-accent" />
                     <CardTitle className="text-lg font-black italic uppercase tracking-tighter">Execution Evidence</CardTitle>
                  </div>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">All gate-level tools must be verified to proceed.</CardDescription>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-border">
                     {TOOLS.map((tool, i) => {
                       const hrefs = {
                         "T1": "/ecosystem/problems",
                         "T2": "/ecosystem/solutions",
                         "T3": "/ecosystem",
                         "T4": "/intel"
                       };
                       return (
                         <div key={tool.id} className="p-8 flex items-start justify-between hover:bg-bg-base/30 transition-all group">
                            <div className="space-y-3">
                               <div className="flex items-center gap-3">
                                  <h4 className="text-lg font-black italic uppercase tracking-tight group-hover:text-accent transition-colors">{tool.name}</h4>
                                  {tool.gate && <Badge className="bg-accent text-bg-base text-[8px] font-black uppercase tracking-[0.2em] h-5">GATE</Badge>}
                               </div>
                               <p className="text-[11px] font-medium text-text-secondary italic">&ldquo;{tool.desc}&rdquo;</p>
                               <div className="flex items-center gap-3 mt-4">
                                  {tool.status === 'Gate Passed' ? (
                                    <Badge className="bg-success/10 text-success border border-success/20 font-black uppercase italic text-[8px] tracking-widest py-1 px-3">
                                       <CheckCircle2 className="w-3 h-3 mr-1" /> Gate Passed
                                    </Badge>
                                  ) : tool.status === 'Review Pending' ? (
                                    <Badge className="bg-bg-base text-text-muted border border-border font-black uppercase italic text-[8px] tracking-widest py-1 px-3">
                                       <Clock className="w-3 h-3 mr-1" /> Review Pending
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-danger/10 text-danger border border-danger/20 font-black uppercase italic text-[8px] tracking-widest py-1 px-3">
                                       <XCircle className="w-3 h-3 mr-1" /> Action Required
                                    </Badge>
                                  )}
                               </div>
                            </div>
                            <Link href={hrefs[tool.id as keyof typeof hrefs] || "#"}>
                               <Button variant="outline" className="h-10 border-2 font-black uppercase italic text-[9px] tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all">
                                  View Node <ChevronRight className="w-4 h-4 ml-1" />
                               </Button>
                            </Link>
                         </div>
                       );
                     })}
                  </div>
               </CardContent>
            </Card>

            <div className="flex justify-end">
               <Button className="bg-success text-bg-base h-16 px-12 font-black uppercase italic tracking-[0.2em] rounded-2xl shadow-xl shadow-success/20">
                  Mark Sprint Complete <CheckCircle2 className="w-5 h-5 ml-2" />
               </Button>
            </div>
         </div>

         {/* Sidebar Insights */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="bg-bg-surface border-border p-8 rounded-[2.5rem] italic relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Zap className="w-24 h-24 -mr-8 -mt-8 text-accent" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" /> Agent Insights
               </h3>
               <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-danger/5 border border-danger/20 rounded-2xl space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-danger">Block Detected</span>
                        <Badge variant="outline" className="text-[7px] border-danger/20 text-danger">Solution Architecture</Badge>
                     </div>
                     <p className="text-[10px] font-bold leading-relaxed text-danger/80">
                        Critical dependency missing in the architectural lattice. Node synthesis aborted.
                     </p>
                  </div>
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl space-y-2 opacity-60">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-accent">Optimization Node</span>
                        <Badge variant="outline" className="text-[7px] border-accent/20 text-accent">Resource Inventory</Badge>
                     </div>
                     <p className="text-[10px] font-bold leading-relaxed text-accent/80">
                        Infrastructure nodes are operating at peak efficiency. Ready for TRL 4 gate.
                     </p>
                  </div>
               </div>
            </Card>

            <Card className="bg-accent text-bg-base p-8 rounded-[2.5rem] shadow-2xl shadow-accent/20 group">
               <h3 className="text-lg font-black italic uppercase tracking-tighter mb-4">Roadmap Pulse</h3>
               <p className="text-[10px] font-medium opacity-80 leading-relaxed uppercase tracking-wide mb-6">
                  Gate reviews ensure your evidence is ready for external validation. Each "GATE" tool adds directly to your CRL/IRL readiness scores.
               </p>
               <div className="h-1 bg-bg-base/20 rounded-full overflow-hidden">
                  <div className="h-full bg-bg-base w-2/3 group-hover:w-full transition-all duration-1000" />
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
