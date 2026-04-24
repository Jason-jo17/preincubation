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
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const SPRINTS = [
  { 
    id: 1, 
    name: "Core Idea Validation", 
    trl: "TRL 1-2", 
    status: "Completed", 
    date: "Mar 10, 2024",
    gates: 4,
    progress: 100
  },
  { 
    id: 2, 
    name: "Architectural Synthesis", 
    trl: "TRL 3", 
    status: "Active", 
    date: "Mar 22, 2024",
    gates: 6,
    progress: 65
  },
  { 
    id: 3, 
    name: "Laboratory Lattice", 
    trl: "TRL 4", 
    status: "Locked", 
    date: "Pending",
    gates: 8,
    progress: 0
  },
];

export default function SprintListingPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Execution Matrix</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Sprint <span className="text-accent">Engine</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Phased execution gateways for structural innovation development.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 h-12 shadow-lg shadow-accent/20" asChild>
          <Link href="/manager/dashboard">
            Initialize Next Sprint
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {SPRINTS.map((sprint, idx) => (
          <motion.div
            key={sprint.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-bg-surface border p-8 rounded-[2rem] transition-all group relative overflow-hidden ${sprint.status === 'Active' ? 'border-accent shadow-xl shadow-accent/5' : 'border-border opacity-70 hover:opacity-100'}`}
          >
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex items-center gap-6">
                   <div className={`size-16 rounded-2xl flex items-center justify-center font-black italic text-2xl border-2 ${sprint.status === 'Active' ? 'bg-accent text-bg-base border-accent shadow-lg shadow-accent/20' : 'bg-bg-base text-text-muted border-border'}`}>
                      {sprint.id}
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">{sprint.name}</h3>
                         <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-accent/20 text-accent">{sprint.trl}</Badge>
                      </div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                         <Target className="w-3 h-3" /> {sprint.gates} Verification Gates • {sprint.date}
                      </p>
                   </div>
                </div>

                <div className="flex-1 max-w-xs w-full space-y-2">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                      <span className="text-text-muted">Sprint Health</span>
                      <span className="text-accent">{sprint.progress}%</span>
                   </div>
                   <div className="h-1.5 bg-bg-base rounded-full overflow-hidden border border-border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sprint.progress}%` }}
                        className="h-full bg-accent" 
                      />
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest ${sprint.status === 'Completed' ? 'bg-success/10 text-success border border-success/20' : sprint.status === 'Active' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-bg-base text-text-muted border border-border'}`}>
                      {sprint.status}
                   </div>
                   <Link href={`/stakeholders/sprint/${sprint.id}`}>
                      <Button variant="outline" className="h-12 w-12 rounded-xl border-2 p-0 group-hover:border-accent group-hover:text-accent transition-all">
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </Link>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-bg-raised border-border p-10 rounded-[3rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flag className="w-32 h-32 -mr-12 -mt-12 text-accent" />
         </div>
         <div className="space-y-4 relative z-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Gateway <span className="text-accent">Verification</span></h3>
            <p className="text-xs font-medium text-text-secondary max-w-xl leading-relaxed uppercase tracking-wide">
               Sprints are the structural units of development. Each sprint concludes with a Gateway Review where all accumulated evidence is verified for TRL advancement.
            </p>
            <div className="flex gap-4 pt-4">
               <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Evidence Synced</span>
               </div>
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Risk Assessed</span>
               </div>
            </div>
         </div>
      </Card>
    </div>
  );
}
