"use client";

import React from "react";
import { 
  Rocket, 
  Target, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  Calendar,
  ChevronRight,
  Activity,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const STATS = [
  { label: "TRL Level", value: "Level 4", sub: "Alpha Prototype", color: "text-accent", icon: Rocket, progress: 44 },
  { label: "Compliance", value: "82%", sub: "Regulatory Sync", color: "text-success", icon: ShieldCheck, progress: 82 },
  { label: "Pilot Status", value: "Ready", sub: "Market Validated", color: "text-amber-500", icon: Target, progress: 90 },
  { label: "Exp. Velocity", value: "12", sub: "Active Nodes", color: "text-blue-500", icon: Activity, progress: 65 },
];

const RECOMMENDATIONS = [
  { title: "IP Strategy Node", desc: "Initiate provisional patent filing for core AI lattice.", priority: "high" },
  { title: "Regional Pilot Hub", desc: "Sync with Pune Tech Corridor for manufacturing testbed.", priority: "medium" },
  { title: "Compliance Audit", desc: "Update data privacy tokens for v2.0 deployment.", priority: "low" },
];

export default function CoinovatorPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Rocket className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Acceleration Engine</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Co <span className="text-accent">Innovator</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Strategic acceleration lattice for student-led innovation nodes.
          </p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-12 border-2 font-black uppercase italic text-[10px] tracking-widest rounded-none" asChild>
              <Link href="/mosi">
                <Zap className="w-4 h-4 mr-2" /> AI Advisor
              </Link>
           </Button>
           <Button className="bg-accent text-white h-12 font-black uppercase italic text-[10px] tracking-widest rounded-none shadow-lg shadow-accent/20" asChild>
              <Link href="/stakeholders/sprint">
                Update Journey Node
              </Link>
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-6 rounded-3xl hover:border-accent/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase text-text-muted tracking-[0.2em]">{stat.label}</p>
                <p className={`text-2xl font-black italic uppercase tracking-tighter ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-text-muted uppercase">{stat.sub}</p>
              <div className="h-1 bg-bg-base rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  className={`h-full ${stat.color.replace('text-', 'bg-')}`} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Actions */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "TRL Tracker", icon: Rocket, color: "text-accent", desc: "Readiness Levels", href: "/stakeholders/sprint" },
                { name: "Roadmap", icon: Calendar, color: "text-indigo-500", desc: "Milestone Sync", href: "/stakeholders/sprint" },
                { name: "Compliance", icon: ShieldCheck, color: "text-emerald-500", desc: "Risk Audit", href: "/stakeholders/coinovator" },
                { name: "Experiments", icon: Activity, color: "text-orange-500", desc: "Validation Hub", href: "/stakeholders/coinovator" },
                { name: "Resources", icon: Users, color: "text-blue-500", desc: "Expert Lattice", href: "/stakeholders" },
                { name: "Industry", icon: Target, color: "text-purple-500", desc: "Pilot Gates", href: "/intel" },
              ].map((action, i) => (
                <Link key={action.name} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 + 0.5 }}
                    className="bg-bg-surface border border-border p-6 rounded-[2rem] hover:border-accent/50 transition-all cursor-pointer group h-full"
                  >
                     <action.icon className={`w-8 h-8 ${action.color} mb-4 group-hover:scale-110 transition-transform`} />
                     <h3 className="text-xs font-black uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">{action.name}</h3>
                     <p className="text-[9px] font-bold text-text-muted uppercase tracking-tight leading-none">{action.desc}</p>
                  </motion.div>
                </Link>
              ))}
           </div>

           {/* Recommendations Card */}
           <Card className="bg-bg-surface border-border p-8 rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Zap className="w-32 h-32 -mr-12 -mt-12 text-accent" />
              </div>
              <div className="space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Strategic <span className="text-accent">Directives</span></h3>
                    <Badge variant="outline" className="border-accent/20 text-accent font-black uppercase italic text-[8px] tracking-widest">v4.2 AI Model</Badge>
                 </div>
                 <div className="space-y-4">
                    {RECOMMENDATIONS.map((rec, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-bg-base border border-border rounded-2xl hover:border-accent/30 transition-colors group">
                        <div className={`p-2 rounded-xl ${rec.priority === 'high' ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'}`}>
                           <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-[11px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">{rec.title}</h4>
                           <p className="text-[10px] font-medium text-text-secondary mt-1">{rec.desc}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-all" />
                      </div>
                    ))}
                 </div>
              </div>
           </Card>
        </div>

        {/* Activity Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-bg-surface border-border p-8 rounded-[2.5rem] h-full">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Activity className="w-4 h-4 text-accent" /> System Logs
              </h3>
              <div className="space-y-6 relative">
                 <div className="absolute left-2 top-0 bottom-0 w-px bg-border ml-[-1px]" />
                 {[
                   { type: "TRL", msg: "Evidence submitted for TRL 4 Verification", date: "2 Hours Ago" },
                   { type: "EXP", msg: "Alpha Experiment 12: Success State Reached", date: "5 Hours Ago" },
                   { type: "COMP", msg: "Compliance Lattice Synced with Pune Hub", date: "Yesterday" },
                   { type: "IP", msg: "IP Strategy Session Scheduled", date: "2 Days Ago" },
                 ].map((log, i) => (
                   <div key={i} className="relative pl-8 space-y-1">
                      <div className="absolute left-0 top-1.5 size-4 rounded-full bg-bg-surface border-2 border-accent" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent leading-none">{log.type} LOG</p>
                      <p className="text-[11px] font-bold text-text-primary leading-tight">{log.msg}</p>
                      <p className="text-[9px] font-bold text-text-muted uppercase italic">{log.date}</p>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
