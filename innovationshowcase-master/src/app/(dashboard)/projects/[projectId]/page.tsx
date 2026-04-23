'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { SECTORS } from '@/constants/sectors';
import { FlowBuilder } from '@/components/flow/FlowBuilder';

// --- Static Data (Mock for Demo) ---

const MOCK_PROJECT = {
  id: '1',
  title: 'Precision Seafood Classifier',
  slug: 'precision-seafood-classifier',
  shortDescription: 'AI-driven quality assessment for seafood export, reducing inspection time by 80%.',
  fullDescription: `The Precision Seafood Classifier is a state-of-the-art agentic workflow designed specifically for the Seafood & Marine industry in Dakshina Kannada. Traditional seafood quality assessment relies heavily on manual ocular inspection, which is prone to human error, inconsistency, and significant delays.

Our solution leverages deep learning Computer Vision models trained on high-resolution datasets of coastal marine species. It automates the classification process, grading products based on freshness, texture, and size with 98.4% accuracy.

By integrating with local ERP systems and cold storage monitors, it creates a seamless flow from arrival to export packaging, ensuring that only premium quality products reach international markets.`,
  projectType: 'AGENTIC_WORKFLOW',
  ceedCategory: 'DISRUPTION',
  ceedScore: 9.2,
  sectorTags: ['seafood'],
  operationTags: ['data-processing', 'ai-capabilities', 'quality-control'],
  functionalityTags: ['quality-control', 'inventory-tracking'],
  techStackTags: [
    { name: 'Python', category: 'LANGUAGE' },
    { name: 'TensorFlow', category: 'AI_ML' },
    { name: 'Next.js', category: 'FRAMEWORK' },
    { name: 'FastAPI', category: 'FRAMEWORK' },
  ],
  media: [
    { id: 'm1', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1621274790572-7832bd33e1ba?q=80&w=1200&auto=format&fit=crop', caption: 'Automated inspection line in action' },
    { id: 'm2', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1553659971-f01207815844?q=80&w=1200&auto=format&fit=crop', caption: 'Real-time grading dashboard' },
  ],
  steps: [
    { id: 's1', stepNumber: 1, title: 'Hardware Setup', description: 'Mount the industrial-grade cameras over the conveyor belts, ensuring uniform lighting conditions (5000K recommended).' },
    { id: 's2', stepNumber: 2, title: 'API Integration', description: 'Connect the local edge device to the InnoVault Cloud API using the provided secure token.' },
    { id: 's3', stepNumber: 3, title: 'Model Calibration', description: 'Run the calibration script with five standard product samples to align the color spectrum with current species.' },
    { id: 's4', stepNumber: 4, title: 'Workflow Activation', description: 'Enable the automated routing logic to start grading products into bins A, B, and C.' },
  ],
  pricing: {
    model: 'ONE_TIME',
    basePrice: 45000,
    implementationFee: 15000,
    estimatedHours: 40,
    currency: 'INR',
  },
  metrics: {
    deployments: 12,
    activeUsers: 45,
    views: 1250,
  },
  creator: {
    name: 'Adithya Shenoy',
    institution: 'NITK Surathkal',
    avatar: 'https://i.pravatar.cc/150?u=adithya',
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const [activeMedia, setActiveMedia] = useState(0);
  
  // Use mock project for demo
  const project = MOCK_PROJECT;

  const primarySector = SECTORS.find(s => s.id === project.sectorTags[0]);

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                            project.ceedCategory === 'DISRUPTION' ? 'bg-red-50 text-red-600 border-red-100' : 
                            'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                            {project.ceedCategory} Category • CEED SCORE {project.ceedScore}
                        </div>
                        {primarySector && (
                          <div className="px-4 py-1.5 rounded-full text-[10px] bg-slate-900 text-white font-black tracking-widest uppercase">
                            {primarySector.icon} {primarySector.name}
                          </div>
                        )}
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] italic lowercase">{project.title}</h1>
                    <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">{project.shortDescription}</p>
                </div>

                <div className="flex items-center gap-4">
                   <button className="px-10 py-5 bg-amber-500 text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20">
                     INQUIRE NOW
                   </button>
                   <button className="p-5 bg-white border border-slate-100 text-slate-300 rounded-2xl font-black text-xs hover:text-red-500 transition-all shadow-sm">
                     ♡
                   </button>
                </div>
            </div>
        </div>

        {/* Left Column: Visuals & Narrative */}
        <div className="lg:col-span-8 space-y-12">
            {/* Gallery */}
            <div className="space-y-4">
                <div className="aspect-[16/9] rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-2xl relative group">
                    <img 
                      src={project.media[activeMedia].url} 
                      alt={project.title} 
                      className="w-full h-full object-cover animate-in fade-in duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10 p-6 glass rounded-2xl max-w-sm">
                        <p className="text-xs font-bold text-white mb-1 uppercase tracking-widest opacity-60">Visual Blueprint</p>
                        <p className="text-sm font-medium text-white italic">"{project.media[activeMedia].caption}"</p>
                    </div>
                </div>
                <div className="flex gap-4 scrollbar-hide overflow-x-auto pb-4">
                  {project.media.map((m, i) => (
                    <button 
                      key={m.id} 
                      onClick={() => setActiveMedia(i)}
                      className={`w-40 aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                        activeMedia === i ? 'border-amber-500 scale-105 shadow-xl' : 'border-slate-100 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
                      }`}
                    >
                      <img src={m.url} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
            </div>

            {/* Narrative */}
            <div className="space-y-8 p-12 bg-white/80 backdrop-blur-3xl rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/50">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-amber-500 rounded-full" />
                  <h3 className="text-xs font-black text-amber-600 uppercase tracking-[0.3em]">Project Narrative</h3>
               </div>
               <div className="prose prose-slate prose-lg max-w-none">
                  {project.fullDescription.split('\n\n').map((p, i) => (
                    <p key={i} className="text-slate-600 leading-loose font-medium mb-6">{p}</p>
                  ))}
               </div>
            </div>

            {/* Logic Map (Flow Builder) */}
            <div className="space-y-4">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                     <div className="w-1.5 h-6 bg-blue-500/20 rounded-full" />
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mt-1">Intelligence Flow Map</h3>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Read-Only Blueprint</div>
               </div>
               <FlowBuilder readOnly />
            </div>
            
            {/* Steps & Implementation */}
            <div className="space-y-12 py-12">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Implementation Sequence</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.steps.map((step, i) => (
                    <div key={step.id} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-emerald-500/20 transition-all group shadow-sm hover:shadow-xl">
                       <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                          {i + 1}
                       </div>
                       <h4 className="text-xl font-black text-slate-900 tracking-tight mb-3">
                          {step.title}
                       </h4>
                       <p className="text-sm font-medium text-slate-500 leading-relaxed">
                          {step.description}
                       </p>
                    </div>
                  ))}
               </div>
            </div>
        </div>

        {/* Right Column: Sidebar Stats & Tech */}
        <div className="lg:col-span-4 space-y-8 sticky top-12">
            
            {/* Creator Card */}
            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-4xl">🎓</div>
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-slate-100 p-1 mb-6 relative">
                     <img src={project.creator.avatar} className="w-full h-full object-cover rounded-2xl" />
                     <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-xs text-white">✓</div>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">{project.creator.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 mb-6">{project.creator.institution}</p>
                  
                  <div className="grid grid-cols-2 gap-2 w-full">
                     <button className="px-4 py-3 bg-slate-900 border border-slate-900 rounded-xl text-[10px] font-black text-white hover:bg-slate-800 transition-all uppercase tracking-widest shadow-lg shadow-slate-900/10">Connect</button>
                     <button className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">Portfolio</button>
                  </div>
               </div>
            </div>

            {/* Performance Node */}
            <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-inner">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Deployment Metrics</h4>
               <div className="grid grid-cols-2 gap-8">
                  <div className="text-center group">
                     <div className="text-3xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">{project.metrics.deployments}</div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Industrial Nodes</p>
                  </div>
                  <div className="text-center group">
                     <div className="text-3xl font-black text-slate-900 group-hover:text-amber-500 transition-colors uppercase tracking-widest mt-1">₹{project.pricing.basePrice/1000}k</div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">License Fee</p>
                  </div>
                  <div className="text-center group">
                     <div className="text-3xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">{project.metrics.activeUsers}</div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Active End-Users</p>
                  </div>
                  <div className="text-center group">
                     <div className="text-3xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">72h</div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Mean Setup Time</p>
                  </div>
               </div>
            </div>

            {/* Technology Stack */}
            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Engine Specifications</h4>
               <div className="flex flex-wrap gap-2">
                  {project.techStackTags.map((tech) => (
                    <div key={tech.name} className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 group hover:border-slate-300 transition-all">
                       <span className="text-slate-300 group-hover:text-amber-500 transition-colors text-[10px]">⚡</span>
                       <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{tech.name}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            {/* Call to Action Sticky (Overlay style for sidebar bottom) */}
            <div className="p-6 bg-slate-900 rounded-[2.5rem] shadow-2xl text-white">
               <h4 className="font-black text-lg tracking-tight mb-1">Adopt this Innovation</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Customization & Deployment Support Included</p>
               <button className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20">
                  START DEPLOYMENT CYCLE
               </button>
            </div>
        </div>
      </section>
    </div>
  );
}
