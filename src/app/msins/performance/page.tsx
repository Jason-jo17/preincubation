"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  Trophy, 
  Target, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Search, 
  Filter,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const INCUBATORS = [
  { name: "COEP Bhau Institute of Innovation", district: "Pune", incubated: 142, active: 86, graduated: 48, jobs: 680, funds: "₹18.4Cr", score: 96, status: "Active" },
  { name: "IIT Bombay Society for Innovation", district: "Mumbai", incubated: 128, active: 72, graduated: 42, jobs: 620, funds: "₹16.2Cr", score: 94, status: "Active" },
  { name: "Venture Center Pune", district: "Pune", incubated: 118, active: 68, graduated: 38, jobs: 540, funds: "₹14.8Cr", score: 92, status: "Active" },
  { name: "VNIT Technology Business Incubator", district: "Nagpur", incubated: 86, active: 52, graduated: 28, jobs: 380, funds: "₹10.2Cr", score: 82, status: "Active" },
  { name: "Kolhapur Innovation Hub", district: "Kolhapur", incubated: 72, active: 44, graduated: 22, jobs: 320, funds: "₹8.6Cr", score: 78, status: "Active" },
  { name: "Nashik AgriTech Incubator", district: "Nashik", incubated: 68, active: 40, graduated: 20, jobs: 280, funds: "₹7.8Cr", score: 76, status: "Active" },
];

export default function MsinsPerformancePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = INCUBATORS.filter(inc => 
    inc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inc.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Performance Metric</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Incubation <span className="text-accent">Performance</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Measure and compare incubation center effectiveness across the regional innovation grid.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-black uppercase italic text-[10px] tracking-widest px-6 h-12 rounded-none border-2">
            Export Audit
          </Button>
          <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 h-12 shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
            New Assessment
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Centers", value: "47", icon: Target },
          { label: "Graduated Startups", value: "486", icon: Briefcase },
          { label: "Jobs Created", value: "8,420", icon: Users },
          { label: "Avg Efficiency", value: "72%", icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-surface border border-border p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-bg-base rounded-xl border border-border">
              <stat.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">{stat.label}</p>
              <h3 className="text-xl font-black italic tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest">Incubator Directory</h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input 
                placeholder="Search matrix..." 
                className="pl-10 bg-bg-base border-border h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-base">
                {["Incubator", "District", "Incubated", "Jobs", "Score", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-text-muted border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc, idx) => (
                <tr key={inc.name} className="hover:bg-bg-base transition-colors group cursor-pointer">
                  <td className="px-6 py-4 border-b border-border">
                    <div className="flex flex-col">
                      <span className="text-sm font-black italic uppercase tracking-tight group-hover:text-accent transition-colors">{inc.name}</span>
                      <span className="text-[9px] font-bold text-text-muted uppercase">EST. 2018</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <span className="text-xs font-bold text-text-secondary">{inc.district}</span>
                  </td>
                  <td className="px-6 py-4 border-b border-border font-mono text-xs font-bold">
                    {inc.incubated}
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold">{inc.jobs}</span>
                      <ArrowUpRight className="w-3 h-3 text-success" />
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className="w-12 h-12 rounded-full border-4 border-accent/10 flex items-center justify-center relative">
                       <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle 
                            cx="24" cy="24" r="20" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            className="text-accent"
                            strokeDasharray={`${(inc.score / 100) * 126} 126`}
                          />
                       </svg>
                       <span className="text-[10px] font-black">{inc.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className={cn(
                      "px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest w-fit flex items-center gap-1.5",
                      inc.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    )}>
                      {inc.status === "Active" ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {inc.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
