"use client";

import React from "react";
import { 
  Layers, 
  Rocket, 
  Zap, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PIPELINE_STAGES = [
  { 
    name: "Ideation", 
    count: 12, 
    color: "var(--color-text-muted)",
    projects: ["EcoPack AI", "AquaFlow Node", "SolarGrid-X"]
  },
  { 
    name: "Incubation", 
    count: 8, 
    color: "var(--color-accent)",
    projects: ["Precision Seafood", "Cashew Predictor", "LogiTrack"]
  },
  { 
    name: "Graduated", 
    count: 45, 
    color: "var(--color-success)",
    projects: ["SmartLogistics", "Hospitality Bot"]
  }
];

export default function MsinsPipelinePage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Pipeline</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Innovation <span className="text-accent">Pipeline</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Monitor the structural flow of startups through the multi-stage incubation funnel.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 h-12 shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5 mr-2" />
          Ingest Startup
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PIPELINE_STAGES.map((stage, idx) => (
          <div key={stage.name} className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-accent rounded-full" style={{ backgroundColor: stage.color }} />
                  <h3 className="text-sm font-black uppercase tracking-widest">{stage.name}</h3>
               </div>
               <span className="text-[10px] font-black px-2 py-1 bg-bg-surface border border-border rounded-lg">{stage.count}</span>
            </div>

            <div className="space-y-4">
              {stage.projects.map((project, pIdx) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (idx * 0.2) + (pIdx * 0.1) }}
                  className="bg-bg-surface border border-border p-5 rounded-2xl shadow-sm hover:border-accent/50 transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[7px] font-black uppercase tracking-widest text-text-muted">Node ID: {(idx + 1) * 1000 + pIdx}</span>
                       <button className="text-text-muted hover:text-text-primary"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <h4 className="text-sm font-black italic uppercase tracking-tight group-hover:text-accent transition-colors">{project}</h4>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 h-1 bg-bg-base rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-2/3" />
                       </div>
                       <span className="text-[9px] font-bold text-text-muted">65%</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                       <div className="flex -space-x-2">
                          {[1,2].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-surface bg-bg-base flex items-center justify-center text-[8px] font-black">
                               {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                       </div>
                       <Button size="sm" variant="ghost" className="h-6 px-2 text-text-muted hover:text-accent group-hover:translate-x-1 transition-all">
                          <ArrowRight className="w-3 h-3" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full py-4 bg-bg-base border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-text-muted hover:border-accent/30 hover:text-accent transition-all text-[10px] font-black uppercase tracking-widest">
               <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
