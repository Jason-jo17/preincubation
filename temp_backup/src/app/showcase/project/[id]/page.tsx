"use client";

import React from "react";
import { 
  Rocket, 
  Target, 
  Layers, 
  Activity, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  Code2,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for a single project
  const project = {
    title: "EcoPack AI Node",
    sector: "Manufacturing",
    status: "Incubating",
    score: 94.2,
    lead: "Siddharth Mehta",
    date: "March 2024",
    description: "AI-driven sustainable packaging optimization engine designed to reduce material waste by 40% in industrial supply chains.",
    tech: ["React", "Python", "TensorFlow", "PostgreSQL"],
    milestones: [
      { name: "Prototype Phase", status: "Completed" },
      { name: "Beta Node Testing", status: "In Progress" },
      { name: "Market Integration", status: "Upcoming" }
    ]
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link href="/showcase">
        <Button variant="ghost" className="text-text-muted hover:text-accent font-black uppercase italic text-[10px] tracking-widest gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Button>
      </Link>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Rocket className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Innovation Node: {id}</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 pt-2">
               <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-black uppercase tracking-widest text-accent">{project.sector}</span>
               <span className="px-3 py-1 bg-success/10 border border-success/20 rounded-full text-[9px] font-black uppercase tracking-widest text-success">{project.status}</span>
            </div>
          </div>

          <p className="text-lg font-medium text-text-secondary leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
             <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1"><User className="w-3 h-3" /> Lead</span>
                <p className="font-bold">{project.lead}</p>
             </div>
             <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
                <p className="font-bold">{project.date}</p>
             </div>
             <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1"><Code2 className="w-3 h-3" /> Tech Stack</span>
                <p className="font-bold">{project.tech.length} Modules</p>
             </div>
             <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1"><Globe className="w-3 h-3" /> Node ID</span>
                <p className="font-bold">{id.toUpperCase()}</p>
             </div>
          </div>
        </div>

        {/* Score Card */}
        <div className="lg:col-span-4 bg-bg-surface border border-border p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Target className="w-32 h-32 -mr-16 -mt-16" />
           </div>
           <div className="relative z-10 space-y-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">CEED Impact Score</p>
              <h2 className="text-7xl font-black italic tracking-tighter text-accent">{project.score}</h2>
              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden border border-border">
                 <div className="h-full bg-accent" style={{ width: `${project.score}%` }} />
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase">Top 2% of Current Sprint</p>
              <Button className="w-full bg-accent text-white font-black uppercase italic text-[10px] tracking-widest h-12 rounded-xl mt-4">
                 <ExternalLink className="w-4 h-4 mr-2" /> View Repository
              </Button>
           </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
         <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
               <Layers className="w-4 h-4 text-accent" /> Structural Roadmap
            </h3>
            <div className="space-y-4">
               {project.milestones.map((m, idx) => (
                 <div key={m.name} className="flex items-center gap-4 p-4 bg-bg-base/50 rounded-2xl border border-border group">
                    <div className={`size-8 rounded-full border-2 flex items-center justify-center ${m.status === 'Completed' ? 'bg-success/20 border-success text-success' : 'bg-bg-surface border-border text-text-muted'}`}>
                       <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{m.status}</p>
                       <h4 className="font-bold">{m.name}</h4>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-4 h-4 text-accent" /> Technical Lattice
            </h3>
            <div className="flex flex-wrap gap-2">
               {project.tech.map(t => (
                 <div key={t} className="px-6 py-3 bg-bg-surface border border-border rounded-2xl font-black italic text-sm hover:border-accent hover:text-accent transition-all cursor-default">
                    {t}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
