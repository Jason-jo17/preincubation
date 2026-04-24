"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Info, Globe, Layers, Zap } from "lucide-react";

const REGIONS = [
  { id: "R1", name: "Mangaluru Cluster", pos: { x: 45, y: 35 }, count: 120, health: "Optimal", color: "bg-success" },
  { id: "R2", name: "Udupi Tech Node", pos: { x: 35, y: 25 }, count: 85, health: "Optimal", color: "bg-success" },
  { id: "R3", name: "Coastal Agri Belt", pos: { x: 55, y: 55 }, count: 210, health: "Warning", color: "bg-warning" },
  { id: "R4", name: "Industrial Corridor", pos: { x: 65, y: 40 }, count: 45, health: "Critical", color: "bg-danger" },
  { id: "R5", name: "Port Logistics Node", pos: { x: 50, y: 70 }, count: 160, health: "Optimal", color: "bg-success" },
];

export function RegionalMap() {
  const [activeRegion, setActiveRegion] = React.useState<typeof REGIONS[0] | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] bg-bg-base rounded-[2.5rem] border border-border overflow-hidden group shadow-inner">
       {/* Map Backdrop */}
       <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
             <defs>
                <pattern id="dotGrid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                   <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-text-muted" />
                </pattern>
             </defs>
             <rect width="100" height="100" fill="url(#dotGrid)" />
             <path 
                d="M30,20 Q50,10 70,20 T90,50 T70,80 T30,90 T10,50 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className="text-accent/30"
                strokeDasharray="2 2"
             />
          </svg>
       </div>

       {/* Region Nodes */}
       {REGIONS.map((region) => (
         <motion.div
           key={region.id}
           className="absolute cursor-pointer"
           style={{ left: `${region.pos.x}%`, top: `${region.pos.y}%` }}
           whileHover={{ scale: 1.2 }}
           onClick={() => setActiveRegion(region)}
         >
            <div className="relative">
               <div className={`size-4 rounded-full ${region.color} shadow-lg shadow-current/20 animate-pulse`} />
               <div className={`absolute -inset-2 rounded-full border border-current opacity-20 animate-ping ${region.color.replace('bg-', 'text-')}`} />
               
               {/* Label */}
               <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[7px] font-black uppercase tracking-widest bg-bg-surface px-1.5 py-0.5 rounded border border-border shadow-sm">
                    {region.name}
                  </span>
               </div>
            </div>
         </motion.div>
       ))}

       {/* Active Node Info Card */}
       <div className="absolute bottom-6 left-6 right-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={activeRegion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="bg-bg-surface border border-border p-5 rounded-2xl shadow-2xl flex items-center justify-between"
          >
             {activeRegion && (
               <>
                 <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-xl ${activeRegion.color} flex items-center justify-center text-white shadow-lg`}>
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-xs font-black uppercase tracking-widest">{activeRegion.name}</h4>
                       <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                         {activeRegion.count} Active Nodes • System Health: <span className={activeRegion.health === 'Optimal' ? 'text-success' : activeRegion.health === 'Warning' ? 'text-warning' : 'text-danger'}>{activeRegion.health}</span>
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="h-8 px-4 bg-accent text-bg-base text-[8px] font-black uppercase tracking-widest italic rounded-lg">View Details</button>
                    <button className="h-8 w-8 bg-bg-base border border-border flex items-center justify-center rounded-lg hover:border-accent transition-colors">
                       <Info className="w-3.5 h-3.5 text-text-muted" />
                    </button>
                 </div>
               </>
             )}
             {!activeRegion && (
               <div className="flex items-center gap-3 text-text-muted italic">
                  <Globe className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Select a node for geospatial intelligence pulse</span>
               </div>
             )}
          </motion.div>
       </div>

       {/* Overlay Labels */}
       <div className="absolute top-6 left-6 space-y-1">
          <div className="flex items-center gap-2">
             <Layers className="w-3.5 h-3.5 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent italic">Regional Lattice</span>
          </div>
          <p className="text-[7px] font-black text-text-muted uppercase tracking-widest">Real-time sync: Active</p>
       </div>
    </div>
  );
}
