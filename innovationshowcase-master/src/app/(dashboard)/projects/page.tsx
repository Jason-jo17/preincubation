'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';

const USER_PROJECTS = [
  {
    id: 'u1',
    title: 'Smart Agri-Irrigation Node',
    shortDescription: 'IoT-linked moisture sensors and automated valve control for rubber plantations.',
    projectType: 'IOT_SOLUTION',
    ceedCategory: 'CORE',
    ceedScore: 6.9,
    sectorTags: ['agriculture'],
    creator: { name: 'Adithya Shenoy' },
    media: [{ url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop' }],
    views: 140,
    deployments: 2,
    activeUsers: 3,
    status: 'ACTIVE',
  },
  {
    id: 'u2',
    title: 'Cashew Yield Predictor v2',
    shortDescription: 'Upgraded satellite imagery processing for Cashew Processing units.',
    projectType: 'ML_MODEL',
    ceedCategory: 'EFFICIENCY',
    ceedScore: 8.9,
    sectorTags: ['cashew'],
    creator: { name: 'Adithya Shenoy' },
    media: [{ url: 'https://images.unsplash.com/photo-1598212175051-78921a8f90ad?q=80&w=800&auto=format&fit=crop' }],
    views: 45,
    deployments: 0,
    activeUsers: 0,
    status: 'DRAFT',
  },
];

export default function MyProjectsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">My Innovation Hub</h1>
           <p className="text-slate-500 font-medium max-w-lg">Lifecycle management and analytics for your regional industrial deployments.</p>
        </div>


        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
           NEW CYCLE <span>+</span>
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {USER_PROJECTS.map((project, i) => (
          <div key={project.id} className="relative group">
             <div className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-white/90 backdrop-blur-md border border-slate-100 text-[8px] font-black tracking-widest uppercase shadow-sm">

                {project.status === 'ACTIVE' ? (
                   <span className="text-emerald-500 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Live</span>
                ) : (
                   <span className="text-slate-500 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-500" /> Draft</span>
                )}
             </div>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
                <ProjectCard project={project as any} />
             </motion.div>
          </div>
        ))}

        <button className="h-[400px] border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50 flex flex-col items-center justify-center gap-4 group hover:bg-white hover:border-amber-500/30 transition-all shadow-sm">
           <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg">+</div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mint Innovation Node</div>
        </button>

      </div>

      <div className="bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[3rem] p-12 mt-20 shadow-xl">
         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Innovation Analytics</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-lg">Track how your agentic workflows are performing across multiple MSME endpoints in Dakshina Kannada.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
               {[
                 { label: 'Total Views', val: '185' },
                 { label: 'Active Links', val: '2' },
                 { label: 'Deployments', val: '2' },
               ].map(stat => (
                 <div key={stat.label} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center shadow-sm">
                    <div className="text-xl font-black text-slate-900">{stat.val}</div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                 </div>
               ))}

            </div>
         </div>
      </div>
    </div>
  );
}
