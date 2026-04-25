'use client';

import { motion } from 'framer-motion';
import { SECTORS } from '@/constants/sectors';

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
      whileHover={{ y: -12, scale: 1.02 }}
      className="bg-bg-surface flex flex-col rounded-[2.5rem] border-2 border-border/50 overflow-hidden group/card h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500"
    >

      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[2rem]">
        <img 
          src={thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-bg-surface/10 to-transparent opacity-60" />
        
        {/* Chips */}
        <div className="absolute top-5 left-5 flex gap-2.5">
            <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase backdrop-blur-md border ${
              project.ceedCategory === 'DISRUPTION' ? 'bg-danger/10 border-danger/20 text-danger' : 
              project.ceedCategory === 'EFFICIENCY' ? 'bg-accent/10 border-accent/20 text-accent' :
              project.ceedCategory === 'EXPANSION' ? 'bg-success/10 border-success/20 text-success' :
              'bg-accent/10 border-accent/20 text-accent'
            }`}>
              {project.ceedCategory}
            </div>
            <div className="px-3 py-1.5 rounded-xl text-[10px] bg-text-primary text-bg-surface font-black tracking-widest uppercase shadow-xl">
               {project.projectType.replace('_', ' ')}
            </div>
        </div>

        {/* Score Badge */}
        <div className="absolute bottom-5 right-5 w-14 h-14 rounded-2xl bg-bg-surface text-text-primary flex flex-col items-center justify-center shadow-2xl border border-border/30">
           <span className="text-lg font-black leading-none text-accent">{project.ceedScore}</span>
           <span className="text-[7px] font-black uppercase tracking-[0.2em] mt-1 text-text-muted">CEED</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6">
           {primarySector && (
             <div className="flex items-center gap-2.5 mb-3">
                <span className="text-base bg-bg-raised w-8 h-8 rounded-lg flex items-center justify-center shadow-inner">{primarySector.icon}</span>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{primarySector.name}</span>
             </div>
           )}
           <h3 className="text-xl font-black text-text-primary leading-tight group-hover/card:text-accent transition-colors">
             {project.title}
           </h3>
           <p className="text-text-secondary text-sm mt-3 line-clamp-2 leading-relaxed font-bold">
             {project.shortDescription}
           </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 border-y-2 border-border/30 py-6 mb-6">
           <div className="text-center">
              <div className="text-sm font-black text-text-primary">{project.deployments}</div>
              <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Builds</div>
           </div>
           <div className="text-center border-x-2 border-border/30">
              <div className="text-sm font-black text-text-primary">{project.activeUsers}</div>
              <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Users</div>
           </div>
           <div className="text-center">
              <div className="text-sm font-black text-text-primary">{project.views}</div>
              <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Views</div>
           </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-bg-raised border-2 border-bg-surface flex items-center justify-center font-black text-xs text-text-secondary overflow-hidden shadow-sm">
                {project.creator.avatar ? <img src={project.creator.avatar} /> : project.creator.name[0]}
              </div>
              <span className="text-[11px] font-black text-text-primary uppercase tracking-tight">{project.creator.name}</span>
           </div>
           <button type="button" className="text-[10px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all p-2 bg-accent/5 rounded-xl">
             EXPLORE <span>→</span>
           </button>
        </div>
      </div>
    </motion.div>
  );
}
