"use client";

import React from "react";
import { 
  Target, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity,
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VALUE_PROPS = [
  {
    id: "VP-001",
    title: "AI Logistics Node",
    status: "Validated",
    updatedAt: "2024-03-20",
    jobs: 5,
    pains: 8,
    solutions: 4
  },
  {
    id: "VP-002",
    title: "AgriGrid Sensor Hub",
    status: "Draft",
    updatedAt: "2024-03-18",
    jobs: 3,
    pains: 5,
    solutions: 2
  },
  {
    id: "VP-003",
    title: "FinFlow Core Node",
    status: "In Review",
    updatedAt: "2024-03-15",
    jobs: 7,
    pains: 12,
    solutions: 6
  }
];

export default function ValuePropositionsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Target className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Market-Fit Lattice</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Value <span className="text-accent">Propositions</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Structural validation of business model canvases across the innovation ecosystem.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 h-12 shadow-lg shadow-accent/20">
          <Plus className="w-5 h-5 mr-2" />
          New Canvas Node
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VALUE_PROPS.map((vp, idx) => (
          <motion.div
            key={vp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-8 rounded-3xl hover:border-accent/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-16 h-16 -mr-8 -mt-8" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">
                    {vp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-tight">Sync: {vp.updatedAt}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest ${vp.status === 'Validated' ? 'bg-success/10 text-success border border-success/20' : 'bg-bg-base text-text-muted border border-border'}`}>
                  {vp.status}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Customer Jobs</span>
                   <span className="text-xs font-bold text-accent">{vp.jobs}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Pain Points</span>
                   <span className="text-xs font-bold text-danger">{vp.pains}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Solution Maps</span>
                   <span className="text-xs font-bold text-success">{vp.solutions}</span>
                </div>
              </div>

              <div className="pt-2">
                 <div className="h-1.5 bg-bg-base rounded-full overflow-hidden border border-border">
                    <div 
                      className="h-full bg-accent transition-all duration-1000" 
                      style={{ width: `${(vp.solutions / (vp.pains || 1)) * 100}%` }}
                    />
                 </div>
                 <div className="flex justify-between mt-1.5">
                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Convergence Health</span>
                    <span className="text-[8px] font-black text-accent">{Math.round((vp.solutions / (vp.pains || 1)) * 100)}%</span>
                 </div>
              </div>

              <Button variant="ghost" className="w-full h-12 bg-bg-base hover:bg-accent hover:text-white transition-all rounded-xl font-black uppercase italic text-[9px] tracking-widest group-hover:shadow-lg group-hover:shadow-accent/20">
                Open Canvas <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
