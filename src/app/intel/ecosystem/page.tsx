"use client";

import React from "react";
import { 
  Globe, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Target, 
  Map as MapIcon,
  Zap,
  ArrowUpRight,
  Maximize2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CLUSTERS = [
  { name: "Pune Tech Corridor", nodes: 124, health: 94, activity: "High" },
  { name: "Mumbai Fin-Node", nodes: 88, health: 92, activity: "Intense" },
  { name: "Nashik Agri-Grid", nodes: 56, health: 85, activity: "Moderate" },
  { name: "Nagpur Logistics", nodes: 42, health: 78, activity: "Growing" },
];

export default function IntelEcosystemPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Geospatial Intelligence</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Ecosystem <span className="text-accent">Lattice</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Visualizing the interconnected structural network of regional industrial nodes.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 h-12 shadow-lg shadow-accent/20">
          <Maximize2 className="w-4 h-4 mr-2" /> Expand Global View
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Visualization Placeholder */}
        <div className="lg:col-span-8 bg-bg-surface border border-border rounded-3xl h-[600px] relative overflow-hidden shadow-sm group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-muted),transparent_70%)] opacity-30" />
           
           {/* Decorative Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(120,107,249,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,107,249,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

           {/* Mock Data Nodes */}
           {[
             { t: 20, l: 30, s: 92 },
             { t: 45, l: 60, s: 78 },
             { t: 70, l: 25, s: 85 },
             { t: 30, l: 75, s: 94 },
           ].map((node, i) => (
             <motion.div
               key={i}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: i * 0.2 }}
               className="absolute size-4 bg-accent rounded-full shadow-[0_0_20px_rgba(120,107,249,0.5)] cursor-pointer hover:scale-150 transition-transform"
               style={{ top: `${node.t}%`, left: `${node.l}%` }}
             >
               <div className="absolute inset-0 animate-ping bg-accent rounded-full opacity-30" />
             </motion.div>
           ))}

           <div className="absolute bottom-8 left-8 right-8 p-6 bg-bg-overlay/80 backdrop-blur-md border border-border rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-text-muted">Total Nodes</p>
                    <p className="text-xl font-black italic">1,482</p>
                 </div>
                 <div className="w-px h-8 bg-border" />
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-text-muted">Lattice Health</p>
                    <p className="text-xl font-black italic text-success">94.2%</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[9px] font-black uppercase">Live Linkage</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Cluster List */}
        <div className="lg:col-span-4 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" /> Active Clusters
           </h3>
           <div className="space-y-4">
              {CLUSTERS.map((cluster, idx) => (
                <motion.div
                  key={cluster.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition-all cursor-pointer group"
                >
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black italic uppercase tracking-tight group-hover:text-accent transition-colors">{cluster.name}</h4>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Nodes</span>
                         <div className="text-xs font-bold">{cluster.nodes}</div>
                      </div>
                      <div className="space-y-1 text-right">
                         <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Activity</span>
                         <div className="text-xs font-black text-accent">{cluster.activity}</div>
                      </div>
                   </div>
                   <div className="mt-4 h-1 bg-bg-base rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${cluster.health}%` }} />
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
