'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SECTORS } from '@/constants/sectors';
import { useState, useEffect } from 'react';
import { msmeIntelClient } from '@/lib/msme-intel';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Precision Seafood Classifier',
    shortDescription: 'AI-driven quality assessment for seafood export, reducing inspection time by 80%.',
    projectType: 'AGENTIC_WORKFLOW',
    ceedCategory: 'DISRUPTION',
    ceedScore: 9.2,
    sectorTags: ['seafood'],
    creator: { name: 'Adithya Shenoy' },
    media: [{ url: 'https://images.unsplash.com/photo-1621274790572-7832bd33e1ba?q=80&w=800&auto=format&fit=crop' }],
    views: 1250,
    deployments: 12,
    activeUsers: 45,
  },
  {
    id: '2',
    title: 'Cashew Yield Predictor',
    shortDescription: 'Satellite imagery processing for Cashew Processing units to forecast harvest volume.',
    projectType: 'ML_MODEL',
    ceedCategory: 'EFFICIENCY',
    ceedScore: 8.5,
    sectorTags: ['cashew'],
    creator: { name: 'Priya D\'Souza' },
    media: [{ url: 'https://images.unsplash.com/photo-1598212175051-78921a8f90ad?q=80&w=800&auto=format&fit=crop' }],
    views: 890,
    deployments: 5,
    activeUsers: 18,
  },
  {
    id: '3',
    title: 'Hospitality Concierge Bot',
    shortDescription: 'Automated guest inquiry handling for boutique hotels with seamless WhatsApp integration.',
    projectType: 'CHATBOT',
    ceedCategory: 'EXPANSION',
    ceedScore: 7.8,
    sectorTags: ['hospitality'],
    creator: { name: 'Rohan Shetty' },
    media: [{ url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop' }],
    views: 2300,
    deployments: 42,
    activeUsers: 120,
  },
  {
    id: '4',
    title: 'Port Logistics Optimizer',
    shortDescription: 'Real-time truck routing for New Mangalore Port, reducing wait times at gates.',
    projectType: 'AUTOMATION',
    ceedCategory: 'CORE',
    ceedScore: 8.1,
    sectorTags: ['ports'],
    creator: { name: 'Vikram Prabhu' },
    media: [{ url: 'https://images.unsplash.com/photo-1577705998148-ebad193f0adc?q=80&w=800&auto=format&fit=crop' }],
    views: 1540,
    deployments: 8,
    activeUsers: 25,
  },
  {
    id: '5',
    title: 'Banking KYC Automate',
    shortDescription: 'OCR-powered KYC document processing for regional cooperative banks.',
    projectType: 'API',
    ceedCategory: 'EFFICIENCY',
    ceedScore: 7.4,
    sectorTags: ['banking'],
    creator: { name: 'Sahana K.' },
    media: [{ url: 'https://images.unsplash.com/photo-1550565118-3d1428df4a7f?q=80&w=800&auto=format&fit=crop' }],
    views: 3100,
    deployments: 64,
    activeUsers: 500,
  },
  {
    id: '6',
    title: 'Smart Agri-Irrigation',
    shortDescription: 'IoT-linked moisture sensors and automated valve control for rubber plantations.',
    projectType: 'IOT_SOLUTION',
    ceedCategory: 'CORE',
    ceedScore: 6.9,
    sectorTags: ['agriculture'],
    creator: { name: 'Varun Bhat' },
    media: [{ url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop' }],
    views: 920,
    deployments: 14,
    activeUsers: 32,
  },
];

export default function DiscoverPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sectorGaps, setSectorGaps] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const gaps = await msmeIntelClient.syncSectors();
        setSectorGaps(Array.isArray(gaps) ? gaps : []);
      } catch (err) {
        console.error('Failed to load discovery stats:', err);
      }
    }
    loadStats();
  }, []);

  const filteredProjects = selectedSector 
    ? MOCK_PROJECTS.filter(p => p.sectorTags.includes(selectedSector))
    : MOCK_PROJECTS;

  return (
    <div className="space-y-12">
      {/* Search & Stats Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-black text-text-primary tracking-tighter italic font-display">Marketplace Hub</h1>
           <p className="text-text-secondary font-medium max-w-lg">Discover high-fidelity student innovations for the local MSME ecosystem.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative w-full lg:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
              <input 
                 type="text" 
                 placeholder="Search workflows, tech, or sectors..."
                 className="w-full bg-bg-surface border-2 border-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/30 transition-all font-medium text-sm shadow-sm"
              />
           </div>
           <button className="p-3 bg-bg-surface border border-border rounded-2xl text-text-muted hover:text-text-primary hover:bg-bg-base transition-all shadow-sm">
              ⚙️
           </button>
        </div>
      </div>

      {/* Sector Filter Bar */}
      <div className="bg-bg-surface/60 backdrop-blur-md p-2 rounded-3xl border border-border flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar shadow-sm">
         <button
            onClick={() => setSelectedSector(null)}
            className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest whitespace-nowrap transition-all duration-300 font-display ${
              selectedSector === null 
               ? 'bg-accent text-accent-foreground font-black shadow-lg shadow-accent/20' 
               : 'text-text-muted hover:text-text-primary hover:bg-bg-base'
            }`}
         >
           All Hubs
         </button>
         {SECTORS.map((sector) => (
           <button
             key={sector.id}
             onClick={() => setSelectedSector(sector.id)}
             className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest whitespace-nowrap transition-all duration-300 flex items-center gap-3 font-display ${
               selectedSector === sector.id 
                ? 'bg-accent text-accent-foreground font-black shadow-lg shadow-accent/20' 
                : 'bg-bg-base border border-border text-text-secondary hover:text-text-primary hover:bg-bg-surface'
             }`}
           >
             <span className={selectedSector === sector.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 transition-opacity'}>{sector.icon}</span>
             {sector.name}
           </button>
         ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProjectCard project={project as any} />
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
         <div className="text-center py-32 bg-bg-base border-2 border-dashed border-border rounded-[3rem]">
            <div className="text-6xl mb-6 opacity-20">🔍</div>
            <h3 className="text-2xl font-black text-text-muted tracking-tighter uppercase tracking-[0.2em] font-display">Node Not Found</h3>
            <p className="text-text-muted mt-2 font-medium">No projects found for the selected sector hub yet. Be the first to build here!</p>
            <button className="mt-8 px-8 py-4 bg-accent/10 text-accent border border-accent/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all font-display">
               Start Innovation Cycle
            </button>
         </div>
      )}

      {/* Feature Gaps */}
      <div className="mt-20 p-12 bg-bg-surface border border-border rounded-[3rem] relative overflow-hidden group shadow-xl shadow-accent/5">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
               <div className="text-[10px] font-black text-accent uppercase tracking-widest block py-2 px-3 bg-accent/5 border border-accent/10 rounded-lg w-fit font-display">Regional Intelligence</div>
               <h3 className="text-3xl font-black text-text-primary tracking-tighter font-display">Active Problem Statements</h3>
               <p className="text-text-secondary font-medium max-w-lg leading-relaxed">
                 The {selectedSector ? SECTORS.find(s => s.id === selectedSector)?.name : 'MSME'} ecosystem has 
                 **{sectorGaps.length > 0 ? sectorGaps.length : '45+'}** operational gaps indexed from the **Buisness Intel** node.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <div className="px-6 py-4 bg-bg-base border border-border rounded-2xl text-center group-hover:border-accent/20 transition-all">
                  <div className="text-2xl font-black text-text-primary font-display">{sectorGaps.length > 0 ? sectorGaps.length : '124'}</div>
                  <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1 font-display">Open Needs</div>
               </div>
               <button className="px-10 py-5 bg-text-primary text-bg-surface rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-text-primary/10 font-display">
                 SOLVE ACTIVE GAPS <span>→</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
