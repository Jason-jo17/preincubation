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
      className="bg-white flex flex-col rounded-[2.5rem] border-2 border-slate-100 overflow-hidden group/card h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500"
    >

      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[2rem]">
        <img 
          src={thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent opacity-60" />
        
        {/* Chips */}
        <div className="absolute top-5 left-5 flex gap-2.5">
            <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase backdrop-blur-md border ${
              project.ceedCategory === 'DISRUPTION' ? 'bg-red-50 border-red-100 text-red-600' : 
              project.ceedCategory === 'EFFICIENCY' ? 'bg-amber-50 border-amber-100 text-amber-600' :
              project.ceedCategory === 'EXPANSION' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
              'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {project.ceedCategory}
            </div>
            <div className="px-3 py-1.5 rounded-xl text-[10px] bg-slate-900 text-white font-black tracking-widest uppercase shadow-xl">
               {project.projectType.replace('_', ' ')}
            </div>
        </div>

        {/* Score Badge */}
        <div className="absolute bottom-5 right-5 w-14 h-14 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center shadow-2xl border border-slate-50">
           <span className="text-lg font-black leading-none text-amber-600">{project.ceedScore}</span>
           <span className="text-[7px] font-black uppercase tracking-[0.2em] mt-1 text-slate-400">CEED</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6">
           {primarySector && (
             <div className="flex items-center gap-2.5 mb-3">
                <span className="text-base bg-slate-50 w-8 h-8 rounded-lg flex items-center justify-center shadow-inner">{primarySector.icon}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{primarySector.name}</span>
             </div>
           )}
           <h3 className="text-xl font-black text-slate-900 leading-tight group-hover/card:text-amber-600 transition-colors">
             {project.title}
           </h3>
           <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed font-bold">
             {project.shortDescription}
           </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 border-y-2 border-slate-50 py-6 mb-6">
           <div className="text-center">
              <div className="text-sm font-black text-slate-900">{project.deployments}</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Builds</div>
           </div>
           <div className="text-center border-x-2 border-slate-50">
              <div className="text-sm font-black text-slate-900">{project.activeUsers}</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Users</div>
           </div>
           <div className="text-center">
              <div className="text-sm font-black text-slate-900">{project.views}</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Views</div>
           </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-white flex items-center justify-center font-black text-xs text-slate-600 overflow-hidden shadow-sm">
                {project.creator.avatar ? <img src={project.creator.avatar} /> : project.creator.name[0]}
              </div>
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{project.creator.name}</span>
           </div>
           <button type="button" className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all p-2 bg-amber-50 rounded-xl">
             EXPLORE <span>→</span>
           </button>
        </div>
      </div>
    </motion.div>
  );
}
