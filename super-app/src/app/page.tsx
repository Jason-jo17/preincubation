"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Lightbulb, 
  BarChart3, 
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Zap,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    title: "Stakeholder Management",
    description: "Track and manage all institutional partners and individual stakeholders.",
    icon: Users,
    href: "/ecosystem",
    color: "var(--color-accent)",
    stats: "124 Active"
  },
  {
    title: "MOSI Interview System",
    description: "AI-driven interview analysis and talent evaluation platform.",
    icon: MessageSquare,
    href: "/mosi",
    color: "#4AFF91",
    stats: "12 Pending"
  },
  {
    title: "Innovation Showcase",
    description: "Highlighting groundbreaking projects and pre-incubation startups.",
    icon: Lightbulb,
    href: "/showcase",
    color: "#FFAA2E",
    stats: "45 Projects"
  },
  {
    title: "MSME Intelligence",
    description: "Advanced data analytics and market insights for small enterprises.",
    icon: BarChart3,
    href: "/intel",
    color: "#47D1FF",
    stats: "890 Data Pts"
  },
  {
    title: "MSINS Platform",
    description: "Comprehensive ecosystem management for innovation and sustainability.",
    icon: Layers,
    href: "/msins",
    color: "#B747FF",
    stats: "5 Nodes"
  }
];

import { industryGaps, talentMatches } from "@/data/intelligence";
import { GapToOpportunityCard } from "@/components/shared/GapToOpportunityCard";
import { TalentMatchCard } from "@/components/shared/TalentMatchCard";
import { TargetedRecommendations } from "@/components/intelligence/TargetedRecommendations";
import { AIReadinessAssessment } from "@/components/intelligence/AIReadinessAssessment";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useAuth();
  const role = user?.role || "STUDENT";

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               System Online
             </div>
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Node ID: 8892-X</span>
          </div>
          <h1 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.85] tracking-tighter italic">
            Unified <span className="text-accent">Ecosystem</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Central command for regional transformation. Mapping industry gaps to innovation talent.
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
           <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Current Role</p>
              <p className="text-sm font-black text-accent uppercase italic">{role}</p>
           </div>
           <div className="size-12 rounded-2xl bg-bg-surface border border-border flex items-center justify-center shadow-2xl">
              <Activity className="w-6 h-6 text-accent animate-pulse" />
           </div>
        </div>
      </header>

      {/* Primary Analytics Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <AIReadinessAssessment />
           <TargetedRecommendations />
        </div>
        
        <div className="lg:col-span-4 p-8 bg-accent text-bg-base rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
          <TrendingUp className="absolute top-0 right-0 w-64 h-64 opacity-10 -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3 italic">Network<br/>Intelligence</h2>
            <p className="text-bg-base/70 text-[10px] font-black uppercase tracking-widest">
              Live aggregate ecosystem metrics
            </p>
          </div>
          <div className="relative z-10 pt-12">
            <div className="text-7xl font-black tracking-tighter mb-1 leading-none">3.4x</div>
            <div className="text-[10px] uppercase tracking-widest font-black opacity-70">
              Avg Innovation ROI vs Benchmarks
            </div>
            <Button variant="outline" className="mt-8 w-full bg-bg-base/10 border-bg-base/20 hover:bg-bg-base/20 text-bg-base rounded-2xl font-black uppercase tracking-widest text-[10px] h-12">
              View Detailed Report
            </Button>
          </div>
        </div>
      </section>

      {/* Module Quick Access */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
           <Layers className="w-5 h-5 text-accent" />
           <h2 className="text-xl font-black uppercase tracking-tight">Integrated Sub-Systems</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {modules.map((module, i) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link 
                href={module.href}
                className="group relative block p-6 bg-bg-surface border border-border rounded-2xl hover:border-accent transition-all duration-300 h-full overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-bg-raised border border-border group-hover:border-accent/50 transition-colors">
                    <module.icon className="w-5 h-5 text-accent" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </div>

                <h3 className="text-[11px] font-black uppercase tracking-wider mb-2">{module.title}</h3>
                
                <div className="flex items-center gap-2 mt-auto">
                  <Activity className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-mono font-bold text-text-muted">{module.stats}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Role-Specific Opportunity Feed */}
      <section className="space-y-8 bg-bg-raised/50 -mx-8 lg:-mx-12 px-8 lg:px-12 py-16 border-y border-border/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-3xl bg-accent text-bg-base flex items-center justify-center shadow-xl shadow-accent/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                {role === "STUDENT" ? "Open Problem Needs" : "Top Talent Discovery"}
              </h2>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">
                {role === "STUDENT" ? "High-priority industry gaps seeking innovation" : "Top-ranked projects ready for industrial scale-up"}
              </p>
            </div>
          </div>
          <Button variant="outline" className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 border-border hover:border-accent transition-colors">
            Explore All Insights
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(role === "STUDENT" || role === "ADMIN") ? (
            industryGaps.map((gap) => (
              <GapToOpportunityCard key={gap.id} gap={gap} />
            ))
          ) : null}
          {(role === "MSME" || role === "ADMIN") ? (
            talentMatches.map((match) => (
              <TalentMatchCard key={match.id} match={match} />
            ))
          ) : null}
        </div>
      </section>

      {/* System Node Footer */}
      <footer className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 p-8 bg-bg-surface border border-border rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
             <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                <div className="size-1.5 rounded-full bg-success animate-pulse" />
                Live Sync Active
             </div>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight mb-8">Node Architecture Status</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Prisma Nodes", value: "02", status: "Operational" },
              { label: "Supabase Clusters", value: "03", status: "Operational" },
              { label: "Regional Hubs", value: "09", status: "Connected" },
              { label: "Active Procs", value: "124", status: "Synced" },
            ].map((node, i) => (
              <div key={i} className="space-y-3">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">{node.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter">{node.value}</span>
                  <span className="text-[8px] font-black text-success uppercase">{node.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
           <div className="size-14 rounded-full bg-bg-raised border border-border flex items-center justify-center text-text-muted">
              <Plus className="w-6 h-6" />
           </div>
           <div>
              <p className="font-black text-sm uppercase tracking-tight">Add Intelligence Node</p>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Connect external data stream</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
