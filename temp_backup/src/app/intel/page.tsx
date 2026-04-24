"use client";

import React from "react";
import { 
  BarChart3, 
  Map, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Download, 
  Globe, 
  Activity,
  Layers,
  ArrowUpRight,
  Zap
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const SECTOR_DATA = [
  { name: "Manufacturing", value: 35, color: "#786BF9" },
  { name: "Textiles", value: 25, color: "#1EC075" },
  { name: "IT Services", value: 20, color: "#FECE0A" },
  { name: "Agri-Processing", value: 15, color: "#3B82F6" },
  { name: "Others", value: 5, color: "#F43F5E" },
];

const REVENUE_TREND = [
  { month: "JAN", rev: 120 },
  { month: "FEB", rev: 145 },
  { month: "MAR", rev: 132 },
  { month: "APR", rev: 168 },
  { month: "MAY", rev: 189 },
  { month: "JUN", rev: 210 },
];

import { RegionalMap } from "@/components/intel/RegionalMap";

const STATS = [
  { label: "Active MSMEs", value: "2,482", change: "+8%", icon: Globe },
  { label: "Total Revenue", value: "₹48.2Cr", change: "+14%", icon: TrendingUp },
  { label: "Job Growth", value: "+1,240", change: "+12%", icon: Activity },
  { label: "System Nodes", value: "18", change: "Stable", icon: Layers },
];

export default function RegionalIntelPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Map className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Geospatial Intelligence</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Regional <span className="text-accent">Intelligence</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Strategic oversight of the MSME ecosystem across regional clusters and industrial nodes.
          </p>
        </div>
        <Button variant="outline" className="font-black uppercase italic text-[10px] tracking-widest px-8 h-12 rounded-none border-2">
          <Download className="w-4 h-4 mr-2" />
          Download Matrix
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Map and Stats */}
        <div className="lg:col-span-8 space-y-8">
           <RegionalMap />
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-surface border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-accent/50 transition-all shadow-sm"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-text-muted tracking-widest">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-black italic tracking-tighter">{stat.value}</h3>
                      <span className="text-[9px] font-bold text-success flex items-center">
                        <ArrowUpRight className="w-3 h-3" /> {stat.change}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Right Column: Industrial Composition */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-bg-surface border border-border p-8 rounded-[2rem] space-y-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-accent" /> Industrial Composition
              </h3>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SECTOR_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SECTOR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
               {SECTOR_DATA.map(s => (
                 <div key={s.name} className="flex items-center justify-between group cursor-default">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] font-black uppercase tracking-tight group-hover:text-accent transition-colors">{s.name}</span>
                   </div>
                   <span className="text-[10px] font-bold text-text-muted">{s.value}%</span>
                 </div>
               ))}
            </div>
            <Button className="w-full h-12 bg-accent text-bg-base font-black uppercase italic text-[9px] tracking-[0.2em] rounded-xl shadow-lg shadow-accent/20">
               Sector Deep-Dive <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="bg-accent p-8 rounded-[2rem] text-bg-base space-y-4 shadow-xl shadow-accent/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Zap className="w-16 h-16" />
             </div>
             <h3 className="text-lg font-black italic uppercase tracking-tighter">AI Opportunity Gap</h3>
             <p className="text-[10px] font-medium opacity-80 leading-relaxed uppercase tracking-wide">
                Current data indicates a 22% efficiency gap in the Manufacturing cluster that can be addressed via agentic workflows.
             </p>
             <button className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1 border-b border-bg-base/40 pb-0.5 hover:border-bg-base transition-all">
                View Recommendations
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
