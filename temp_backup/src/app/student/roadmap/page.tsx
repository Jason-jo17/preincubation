"use client";

import React from "react";
import { 
  Map, 
  Rocket, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  Activity,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ROADMAP_STAGES = [
  {
    id: 1,
    title: "Ideation & Problem Mapping",
    status: "Completed",
    description: "Deep dive into stakeholder pain points and industrial gaps.",
    tools: [
      { id: "p1", name: "Stakeholder Compass", status: "Done" },
      { id: "p2", name: "Problem Evidence Log", status: "Done" },
      { id: "p3", name: "Value Prop Canvas", status: "Done" }
    ]
  },
  {
    id: 2,
    title: "Solution Design & Prototyping",
    status: "Active",
    description: "Developing the technical architecture and proof of concept.",
    tools: [
      { id: "s1", name: "Technical Blueprint", status: "Active" },
      { id: "s2", name: "Low-Fi Simulation", status: "Pending" },
      { id: "s3", name: "Experiment Sandbox", status: "Pending" }
    ]
  },
  {
    id: 3,
    title: "Market Validation",
    status: "Locked",
    description: "Pilot testing and industrial integration verification.",
    tools: [
      { id: "m1", name: "Pilot Protocol", status: "Locked" },
      { id: "m2", name: "Regulatory Compliance", status: "Locked" }
    ]
  },
  {
    id: 4,
    title: "Industrial Scale-up",
    status: "Locked",
    description: "Full production deployment and ecosystem integration.",
    tools: [
      { id: "sc1", name: "Production Node", status: "Locked" }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Strategic Path
          </div>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
          Journey <span className="text-accent">Roadmap</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto font-medium tracking-tight">
          Visualizing your advancement from ideation to industrial scale.
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative space-y-12">
        {/* Connection Line */}
        <div className="absolute left-[39px] top-8 bottom-8 w-1 bg-gradient-to-b from-success via-accent to-border hidden md:block" />

        {ROADMAP_STAGES.map((stage, idx) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex flex-col md:flex-row gap-8"
          >
            {/* Timeline Node */}
            <div className="hidden md:flex flex-col items-center">
               <div className={cn(
                 "size-20 rounded-[2rem] border-4 flex items-center justify-center relative z-10 transition-all shadow-xl",
                 stage.status === 'Completed' ? "bg-success border-success/20 text-white" : 
                 stage.status === 'Active' ? "bg-accent border-accent/20 text-white scale-110" : 
                 "bg-bg-surface border-border text-text-muted"
               )}>
                  {stage.status === 'Completed' ? <CheckCircle2 className="w-8 h-8" /> : 
                   stage.status === 'Active' ? <Rocket className="w-8 h-8" /> : 
                   <Lock className="w-8 h-8" />}
               </div>
            </div>

            {/* Stage Card */}
            <div className="flex-1">
               <Card className={cn(
                 "rounded-[2.5rem] border-2 transition-all overflow-hidden shadow-sm",
                 stage.status === 'Active' ? "border-accent shadow-2xl shadow-accent/5" : "border-border"
               )}>
                  <div className={cn(
                    "p-8 border-b-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
                    stage.status === 'Active' ? "bg-accent/5 border-accent/10" : "bg-bg-raised border-border/50"
                  )}>
                     <div className="space-y-1">
                        <div className="flex items-center gap-3">
                           <h3 className="text-2xl font-black italic tracking-tighter uppercase">{stage.title}</h3>
                           <Badge className={cn(
                             "text-[8px] font-black uppercase tracking-widest px-3 py-0.5 border-none",
                             stage.status === 'Completed' ? "bg-success text-white" : 
                             stage.status === 'Active' ? "bg-accent text-white" : "bg-bg-raised text-text-muted"
                           )}>
                              {stage.status}
                           </Badge>
                        </div>
                        <p className="text-xs text-text-muted font-medium uppercase tracking-widest">{stage.description}</p>
                     </div>
                     {stage.status === 'Active' && (
                       <Button className="bg-accent text-white font-black uppercase italic text-[10px] tracking-widest px-6 h-10 rounded-xl">
                          Focus Phase
                       </Button>
                     )}
                  </div>
                  
                  <CardContent className="p-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stage.tools.map((tool) => (
                          <div 
                            key={tool.id} 
                            className={cn(
                              "p-5 rounded-2xl border transition-all group cursor-pointer",
                              tool.status === 'Done' ? "bg-success/5 border-success/20 hover:bg-success/10" : 
                              tool.status === 'Active' ? "bg-accent/5 border-accent/20 hover:border-accent" : 
                              "bg-bg-base/30 border-border opacity-50 hover:opacity-80"
                            )}
                          >
                             <div className="flex items-center justify-between mb-3">
                                {tool.status === 'Done' ? <CheckCircle2 className="w-4 h-4 text-success" /> : 
                                 tool.status === 'Active' ? <Zap className="w-4 h-4 text-accent animate-pulse" /> : 
                                 <Lock className="w-4 h-4 text-text-muted" />}
                                <ArrowUpRight className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-tight group-hover:text-accent transition-colors">{tool.name}</p>
                          </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-8 bg-bg-raised border border-border rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-xl shadow-accent/20">
               <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-0.5 text-center md:text-left">
               <p className="text-sm font-black italic uppercase tracking-tight">System Guidance Active</p>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Next checkpoint: TRL 5 verification terminal</p>
            </div>
         </div>
         <Button className="bg-text-primary text-bg-base font-black uppercase italic text-[11px] tracking-[0.2em] px-10 h-14 rounded-2xl">
            Audit Progress
         </Button>
      </div>
    </div>
  );
}
