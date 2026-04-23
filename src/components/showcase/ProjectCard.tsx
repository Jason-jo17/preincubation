"use client";

import React from "react";
import { motion } from "framer-motion";
import { SECTORS } from "@/constants/sectors";
import { Users, Eye, Layers, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    shortDescription: string;
    projectType: string;
    ceedCategory: string;
    ceedScore: number;
    sectorTags: string[];
    creator: {
      name: string;
      avatar?: string;
    };
    media: any[];
    views: number;
    deployments: number;
    activeUsers: number;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primarySector = SECTORS.find(s => s.id === project.sectorTags[0]);
  const thumbnail = project.media?.[0]?.url || 'https://images.unsplash.com/photo-1639322537228-f730d846310a?q=80&w=600&auto=format&fit=crop';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-bg-surface border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-2xl">
        <img 
          src={thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent" />
        
        {/* Category & Type Chips */}
        <div className="absolute top-4 left-4 flex gap-2">
            <div className={cn(
              "px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase backdrop-blur-md border",
              project.ceedCategory === 'DISRUPTION' ? 'bg-danger/10 border-danger/20 text-danger' : 
              project.ceedCategory === 'EFFICIENCY' ? 'bg-warning/10 border-warning/20 text-warning' :
              project.ceedCategory === 'EXPANSION' ? 'bg-success/10 border-success/20 text-success' :
              'bg-accent/10 border-accent/20 text-accent'
            )}>
              {project.ceedCategory}
            </div>
            <div className="px-2.5 py-1 rounded-lg text-[10px] bg-bg-surface/80 text-text-primary border border-border/50 font-black tracking-widest uppercase backdrop-blur-md">
               {project.projectType.replace('_', ' ')}
            </div>
        </div>

        {/* Score Badge */}
        <div className="absolute bottom-4 right-4 size-14 rounded-2xl bg-bg-surface/90 backdrop-blur-md text-text-primary flex flex-col items-center justify-center border border-border shadow-xl">
           <span className="text-xl font-black leading-none text-accent">{project.ceedScore}</span>
           <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-1 text-text-muted">CEED</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-2 flex-1 flex flex-col space-y-4">
        <div>
           {primarySector && (
             <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-bg-raised size-6 rounded flex items-center justify-center border border-border">{primarySector.icon}</span>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{primarySector.name}</span>
             </div>
           )}
           <h3 className="text-xl font-black text-text-primary tracking-tight group-hover:text-accent transition-colors leading-tight">
             {project.title}
           </h3>
           <p className="text-text-secondary text-sm mt-2 line-clamp-2 leading-relaxed">
             {project.shortDescription}
           </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-border py-4 my-2">
           <div className="flex flex-col items-center">
              <Layers className="w-3.5 h-3.5 text-text-muted mb-1" />
              <div className="text-xs font-bold font-mono">{project.deployments}</div>
              <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Builds</div>
           </div>
           <div className="flex flex-col items-center border-x border-border">
              <Users className="w-3.5 h-3.5 text-text-muted mb-1" />
              <div className="text-xs font-bold font-mono">{project.activeUsers}</div>
              <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Users</div>
           </div>
           <div className="flex flex-col items-center">
              <Eye className="w-3.5 h-3.5 text-text-muted mb-1" />
              <div className="text-xs font-bold font-mono">{project.views}</div>
              <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Views</div>
           </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
           <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-bg-raised border border-border flex items-center justify-center font-black text-[10px] text-text-primary overflow-hidden">
                {project.creator.avatar ? <img src={project.creator.avatar} /> : project.creator.name[0]}
              </div>
              <span className="text-[10px] font-black text-text-primary uppercase tracking-tight">{project.creator.name}</span>
           </div>
           <button className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest group/btn">
             EXPLORE <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}
