"use client";

import React from "react";
import { 
  Building2, 
  Search, 
  Filter, 
  Globe, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COMPANIES = [
  { name: "Precision Forge Ltd", sector: "Manufacturing", location: "Pune", growth: "+14%", status: "Verified" },
  { name: "AquaPure Systems", sector: "Agri-Tech", location: "Nashik", growth: "+8%", status: "Review" },
  { name: "LogiChain Solutions", sector: "Logistics", location: "Mumbai", growth: "+22%", status: "Verified" },
  { name: "GreenWatt Energy", sector: "Clean Energy", location: "Nagpur", growth: "+11%", status: "Verified" },
  { name: "EduNode Platforms", sector: "EdTech", location: "Aurangabad", growth: "+5%", status: "Review" },
  { name: "FinFlow Systems", sector: "Fintech", location: "Pune", growth: "+18%", status: "Verified" },
];

export default function IntelCompaniesPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Corporate Registry</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Company <span className="text-accent">Nodes</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Strategic directory of MSMEs integrated into the regional intelligence lattice.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search company nodes..." 
            className="pl-12 h-14 bg-bg-surface border-2 rounded-2xl font-bold"
          />
        </div>
        <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black uppercase italic text-[10px] tracking-widest gap-2">
          <Filter className="w-4 h-4" /> Filter Matrix
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPANIES.map((company, idx) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-8 rounded-3xl hover:border-accent/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-16 h-16 -mr-8 -mt-8" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{company.location} Node</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest ${company.status === 'Verified' ? 'bg-success/10 text-success border border-success/20' : 'bg-warning/10 text-warning border border-warning/20'}`}>
                  {company.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Sector</span>
                  <div className="text-xs font-bold">{company.sector}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Growth</span>
                  <div className="text-xs font-black text-success flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> {company.growth}
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full h-12 bg-bg-base hover:bg-accent hover:text-white transition-all rounded-xl font-black uppercase italic text-[9px] tracking-widest group-hover:shadow-lg group-hover:shadow-accent/20">
                Audit Node <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
