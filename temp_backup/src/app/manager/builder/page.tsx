"use client";

import React from "react";
import { 
  Settings2, 
  Plus, 
  Trash2, 
  GripVertical, 
  Zap, 
  Target,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const SPRINT_NODES = [
  { id: "n1", title: "Problem Discovery Matrix", description: "Define 3 core industry pain points and validate with stakeholders.", type: "Validation", weight: 20 },
  { id: "n2", title: "Solution Blueprinting", description: "Design high-fidelity architecture for the proposed innovation.", type: "Technical", weight: 30 },
  { id: "n3", title: "TRL 3 Verification", description: "Complete proof-of-concept testing in controlled environment.", type: "Verification", weight: 50 },
];

export default function SprintBuilderPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Settings2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Advancement Engineering</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Sprint <span className="text-accent">Builder</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Engineer specialized advancement sprints and verification rubrics for your cohort.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-12 border-2 font-black uppercase italic text-[10px] tracking-widest px-6 rounded-none">
              Save Draft
           </Button>
           <Button className="bg-accent text-white h-12 font-black uppercase italic text-[10px] tracking-widest px-8 rounded-none shadow-lg shadow-accent/20">
              Deploy Sprint Node
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Sprint Node Lattice */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-bg-surface border border-border p-8 rounded-[2.5rem] shadow-sm space-y-8">
               <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                     <Layers className="w-4 h-4 text-accent" /> Sprint Node Lattice
                  </h3>
                  <Button size="sm" className="bg-accent/10 text-accent hover:bg-accent/20 rounded-lg h-8 px-4 text-[9px] font-black uppercase tracking-widest">
                     <Plus className="w-3.5 h-3.5 mr-1" /> Add Node
                  </Button>
               </div>

               <div className="space-y-4">
                  {SPRINT_NODES.map((node, idx) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-start gap-4 p-5 bg-bg-base border border-border rounded-2xl hover:border-accent/30 transition-all relative"
                    >
                       <div className="mt-1 cursor-grab active:cursor-grabbing opacity-30 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="w-5 h-5 text-text-muted" />
                       </div>
                       <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <h4 className="font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">{node.title}</h4>
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-accent/20 text-accent bg-accent/5">
                                   {node.type}
                                </Badge>
                             </div>
                             <div className="text-[10px] font-black italic text-text-muted">Weight: {node.weight}%</div>
                          </div>
                          <p className="text-[10px] font-bold text-text-muted italic uppercase leading-relaxed max-w-lg">
                             {node.description}
                          </p>
                       </div>
                       <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-danger hover:bg-danger/10">
                             <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-accent hover:bg-accent/10">
                             <ArrowUpRight className="w-4 h-4" />
                          </Button>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Column: Configuration Matrix */}
         <div className="space-y-6">
            <div className="bg-bg-surface border border-border p-8 rounded-[2.5rem] space-y-8 shadow-sm">
               <h3 className="text-sm font-black uppercase tracking-widest border-b border-border pb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" /> Sprint Metrics
               </h3>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Total Sprints</label>
                     <div className="text-2xl font-black italic tracking-tighter uppercase">03 <span className="text-accent">Active Nodes</span></div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Cumulative Weight</label>
                     <div className="flex items-end gap-2">
                        <div className="text-2xl font-black italic tracking-tighter uppercase">100%</div>
                        <div className="mb-1 size-2 rounded-full bg-success shadow-lg shadow-success/20 animate-pulse"></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Target Cohort</label>
                     <Input defaultValue="GENESIS_COHORT_2024" className="h-10 bg-bg-base border-border font-black uppercase tracking-widest text-[9px] text-accent" />
                  </div>
               </div>
            </div>

            <div className="bg-accent p-8 rounded-[2.5rem] text-bg-base space-y-6 shadow-xl shadow-accent/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Zap className="w-32 h-32 -mr-12 -mt-12" />
               </div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase relative z-10">Verification Node</h3>
               <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest leading-relaxed relative z-10">
                  Deploy high-fidelity verification gates for automated TRL assessment.
               </p>
               <Button className="h-12 w-full bg-bg-base text-accent font-black uppercase italic text-[9px] tracking-widest rounded-xl relative z-10 hover:bg-bg-base/90">
                  Engineer Node
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}

