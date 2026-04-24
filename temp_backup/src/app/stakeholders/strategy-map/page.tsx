"use client";

import React from "react";
import { 
  Network, 
  Target, 
  Lightbulb, 
  Layers, 
  Activity,
  ArrowUpRight,
  Plus,
  Zap,
  ChevronRight,
  Settings,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const NODES = {
  STRATEGIC: [
    { id: 1, title: "Regional Water Resilience", type: "Problem", severity: "Critical", status: "Active" },
    { id: 2, title: "Rural Education Access", type: "Problem", severity: "High", status: "Active" },
    { id: 3, title: "MSME Agri-Tech Adoption", type: "Problem", severity: "Medium", status: "Monitoring" },
  ],
  TACTICAL: [
    { id: 4, title: "Precision Seafood Classifier", type: "Solution", progress: 75, impact: "High" },
    { id: 5, title: "EduConnect Lattice", type: "Solution", progress: 40, impact: "Very High" },
  ],
  FOUNDATIONAL: [
    { id: 6, title: "Coastal Belt Data Hub", type: "Data Node", health: "98%", sync: "Live" },
    { id: 7, title: "Talent Lattice: Mangaluru", type: "Talent Node", health: "85%", sync: "Synced" },
  ]
};

export default function StrategyMapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Toolbar */}
      <header className="h-16 border-b border-border bg-bg-surface flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="size-8 bg-accent rounded-lg flex items-center justify-center text-bg-base">
                <Network className="w-5 h-5" />
             </div>
             <h2 className="text-sm font-black uppercase tracking-widest italic">Strategy <span className="text-accent">Mapper</span></h2>
          </div>
          <div className="h-4 w-px bg-border mx-2" />
          <nav className="flex items-center gap-4">
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-accent">Active Map</Button>
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary">Simulations</Button>
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary">Node History</Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest italic gap-2">
              <Share2 className="w-3.5 h-3.5" /> Share
           </Button>
           <Button size="sm" className="h-9 px-4 rounded-xl bg-accent text-bg-base text-[10px] font-black uppercase tracking-widest italic gap-2 shadow-lg shadow-accent/20">
              <Plus className="w-3.5 h-3.5" /> New Node
           </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border bg-bg-raised flex flex-col p-8 overflow-y-auto shrink-0">
           <div className="space-y-8">
              <div className="space-y-2">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Node Toolbox</p>
                 <p className="text-xs font-medium text-text-secondary italic">Drag and drop entities into the canvas to map dependencies.</p>
              </div>

              <div className="space-y-3">
                 {[
                   { label: "Impact Node", icon: Target, color: "text-accent", bg: "bg-accent/10" },
                   { label: "Solution Node", icon: Lightbulb, color: "text-success", bg: "bg-success/10" },
                   { label: "Data Source", icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
                   { label: "Talent Hub", icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" },
                 ].map((tool) => (
                   <div key={tool.label} className="flex items-center justify-between p-4 bg-bg-surface border border-border rounded-2xl cursor-grab hover:border-accent/50 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-xl ${tool.bg} ${tool.color}`}>
                            <tool.icon className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest">{tool.label}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-border">
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Active Layers</p>
                    <Settings className="w-3.5 h-3.5 text-text-muted" />
                 </div>
                 <div className="space-y-2">
                    {["Problem Gaps", "Innovation Pipeline", "Ecosystem Resources"].map((layer) => (
                      <label key={layer} className="flex items-center gap-3 p-2 cursor-pointer group">
                         <div className="size-4 rounded border-2 border-accent bg-accent/20 flex items-center justify-center">
                            <div className="size-1.5 rounded-sm bg-accent" />
                         </div>
                         <span className="text-[10px] font-bold text-text-secondary group-hover:text-text-primary transition-colors">{layer}</span>
                      </label>
                    ))}
                 </div>
              </div>
           </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 bg-bg-base relative overflow-hidden p-20 flex flex-col gap-24 items-center overflow-auto canvas-grid">
           {/* Section 1: Problems */}
           <div className="w-full flex flex-col items-center gap-8 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent" />
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent italic">Strategic Gaps</h3>
                 <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                 {NODES.STRATEGIC.map((node) => (
                   <motion.div
                     key={node.id}
                     whileHover={{ y: -5 }}
                     className="w-72 bg-bg-surface border-l-4 border-accent p-6 rounded-2xl shadow-xl border border-border group cursor-pointer"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <Badge variant="outline" className="border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">{node.severity}</Badge>
                         <Zap className="w-4 h-4 text-accent animate-pulse" />
                      </div>
                      <h4 className="text-lg font-black italic uppercase tracking-tighter mb-2 group-hover:text-accent transition-colors">{node.title}</h4>
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Type: {node.type}</span>
                         <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-all" />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Section 2: Solutions */}
           <div className="w-full flex flex-col items-center gap-8 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="h-px w-24 bg-gradient-to-r from-transparent to-success" />
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-success italic">Tactical Solutions</h3>
                 <div className="h-px w-24 bg-gradient-to-l from-transparent to-success" />
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                 {NODES.TACTICAL.map((node) => (
                   <motion.div
                     key={node.id}
                     whileHover={{ y: -5 }}
                     className="w-72 bg-bg-surface border-t-4 border-success p-6 rounded-2xl shadow-xl border border-border group cursor-pointer"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <Badge variant="outline" className="border-success/20 text-success text-[8px] font-black uppercase tracking-widest">{node.impact} Impact</Badge>
                         <Lightbulb className="w-4 h-4 text-success" />
                      </div>
                      <h4 className="text-lg font-black italic uppercase tracking-tighter mb-4 group-hover:text-success transition-colors">{node.title}</h4>
                      <div className="space-y-2">
                         <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-text-muted">
                            <span>Readiness</span>
                            <span>{node.progress}%</span>
                         </div>
                         <div className="h-1 bg-bg-base rounded-full overflow-hidden border border-border">
                            <div className="h-full bg-success" style={{ width: `${node.progress}%` }} />
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Section 3: Data */}
           <div className="w-full flex flex-col items-center gap-8 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-500" />
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 italic">Foundational Nodes</h3>
                 <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-500" />
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                 {NODES.FOUNDATIONAL.map((node) => (
                   <motion.div
                     key={node.id}
                     whileHover={{ y: -5 }}
                     className="w-64 bg-bg-surface border border-border p-5 rounded-2xl shadow-lg group cursor-pointer hover:border-blue-500/50 transition-colors"
                   >
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                            <Layers className="w-4 h-4" />
                         </div>
                         <h4 className="text-xs font-black uppercase tracking-widest group-hover:text-blue-500 transition-colors">{node.title}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Health</p>
                            <p className="text-sm font-black text-success uppercase italic">{node.health}</p>
                         </div>
                         <div className="space-y-1 text-right">
                            <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Sync</p>
                            <p className="text-sm font-black text-blue-500 uppercase italic">{node.sync}</p>
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* SVG Connections Placeholder */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </main>
      </div>
    </div>
  );
}
