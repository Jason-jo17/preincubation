"use client";

import React from "react";
import { 
  BarChart3, 
  Layers, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const SECTORS = [
  { name: "Advanced Manufacturing", growth: "+12.4%", nodes: 450, impact: "High", health: 92 },
  { name: "Agri-Tech Solutions", growth: "+8.2%", nodes: 320, impact: "Medium", health: 85 },
  { name: "Fintech Systems", growth: "+15.8%", nodes: 210, impact: "Very High", health: 78 },
  { name: "Clean Energy Node", growth: "+22.1%", nodes: 180, impact: "High", health: 64 },
  { name: "EdTech Platforms", growth: "+5.4%", nodes: 410, impact: "Medium", health: 88 },
];

export default function SectorIntelPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accent">
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vertical Analysis</span>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">
          Sector <span className="text-accent">Intelligence</span>
        </h1>
        <p className="text-text-secondary max-w-2xl font-medium">
          Detailed performance metrics across the 6 primary industrial verticals and 9 strategic dimensions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTORS.map((sector, idx) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">{sector.name}</h3>
                <div className="flex items-center gap-2">
                   <div className="w-full h-1.5 bg-bg-base rounded-full overflow-hidden border border-border">
                      <div 
                        className="h-full bg-accent transition-all duration-1000" 
                        style={{ width: `${sector.health}%` }}
                      />
                   </div>
                   <span className="text-[10px] font-black">{sector.health}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Growth</span>
                  <div className="text-xs font-black text-success flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> {sector.growth}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Nodes</span>
                  <div className="text-xs font-black">{sector.nodes}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-1 text-[8px] font-black text-text-muted uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> IMPACT: {sector.impact}
                 </div>
                 <Button variant="ghost" size="sm" className="h-8 px-2 text-accent">
                    <ChevronRight className="w-4 h-4" />
                 </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
