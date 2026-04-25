'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SECTORS } from '@/constants/sectors';

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
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse-soft" />
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] rounded-full bg-accent/5 blur-[100px] animate-pulse-soft" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-bg-surface border border-border/50 rounded-full text-[10px] font-black text-accent uppercase tracking-widest mb-10 shadow-xl shadow-accent/5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(120,107,249,0.5)]" />
            BUILD FOR X • DAKSHINA KANNADA HUB
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-text-primary tracking-tighter leading-[0.85] mb-10">
            <span className="text-gradient">Innovate.</span><br />
            <span className="italic opacity-80" style={{ color: 'var(--color-accent)' }}>Commercialize.</span>
          </h1>
          
          <p className="text-xl text-text-secondary font-bold max-w-2xl mx-auto leading-relaxed mb-16">
            The bridge between student brilliance and industrial efficiency. Discover, deploy, and scale agentic solutions for the local MSME ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link href="/onboarding" className="px-12 py-5 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-accent/90 active:scale-95 transition-all shadow-2xl flex items-center gap-3">
               EXPLORE MARKETPLACE <span>→</span>
             </Link>
             <Link href="/submit" className="px-12 py-5 bg-bg-surface border-2 border-border/50 text-text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-bg-raised transition-all shadow-lg">
               SUBMIT INNOVATION
             </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-40 max-w-5xl mx-auto">
           {[
             { label: 'Sectors', val: '18+' },
             { label: 'Innovations', val: '450+' },
             { label: 'MSMEs Linked', val: '2.4k' },
             { label: 'Economic Impact', val: '₹1.2Cr' },
           ].map((stat, i) => (
             <div key={i} className="text-center group p-8 rounded-[2rem] bg-bg-surface border border-border/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative">
               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-all duration-500" />
               <div className="text-4xl font-black text-text-primary group-hover:text-accent transition-colors animate-float relative z-10" style={{ animationDelay: `${i * 0.5}s` }}>{stat.val}</div>
               <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-3 relative z-10">{stat.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Sector Discovery */}
      <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="bg-bg-surface/80 backdrop-blur-3xl rounded-[4rem] border-2 border-border/30 shadow-2xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5 grayscale pointer-events-none">
            <span className="text-[20rem] font-black text-text-primary tracking-tighter">SDK</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20 relative z-10">
             <div className="space-y-4">
                <h2 className="text-5xl font-black text-text-primary tracking-tighter">Discover by Sector</h2>
                <p className="text-text-secondary font-bold max-w-lg leading-relaxed">Tailored automations addressing the unique operational gaps of the coastal industry hub.</p>
             </div>
             <button className="px-8 py-4 bg-bg-raised border-2 border-border/30 rounded-2xl text-[10px] font-black text-text-primary hover:bg-bg-surface hover:border-accent/20 transition-all uppercase tracking-widest shadow-sm">
               See all Sectors
             </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-24 relative z-10">
             {SECTORS.slice(0, 12).map((sector) => (
               <motion.button 
                 whileHover={{ y: -8, scale: 1.05 }}
                 key={sector.id} 
                 className="p-8 rounded-[2.5rem] bg-bg-raised/50 border-2 border-transparent hover:border-accent/20 hover:bg-bg-surface flex flex-col items-center gap-4 group transition-all shadow-sm hover:shadow-2xl"
               >
                  <div className="w-16 h-16 rounded-2xl bg-bg-surface flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner group-hover:shadow-accent/10">
                    {sector.icon}
                  </div>
                  <span className="text-[11px] font-black text-text-primary group-hover:text-accent uppercase tracking-tight text-center">{sector.name}</span>
               </motion.button>
             ))}
          </div>

          {/* Featured Projects */}
          <div className="relative z-10">
             <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-2xl shadow-inner animate-float">🔥</div>
                <h3 className="text-3xl font-black text-text-primary tracking-tight">High Impact Deployments</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {MOCK_PROJECTS.map((project) => (
                 <ProjectCard key={project.id} project={project as any} />
               ))}
             </div>

             <div className="mt-20 text-center">
                <button className="px-10 py-5 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent/90 transition-all shadow-xl hover:translate-y-[-2px]">
                   LOAD MORE INNOVATIONS
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* MSME Intel CTA */}
      <section className="relative z-10 py-40 px-6 max-w-5xl mx-auto text-center">
         <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
           <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
           BuildForX Integration Active
         </div>
         <h2 className="text-6xl md:text-7xl font-black text-text-primary tracking-tighter mb-10 leading-[0.9]">
           Unlocking India's Industrial Intelligence<br /> 
           <span className="text-accent opacity-80">Node by Node.</span>
         </h2>
         <p className="text-text-secondary font-bold text-xl leading-relaxed mb-16 max-w-3xl mx-auto">
           Are you an MSME looking for a customized solution? Or a student with a disruptive idea? InnoVault connects the dots through a data-driven ecosystem.
         </p>
         
         <div className="flex flex-col md:flex-row items-center justify-center gap-10 border-t-2 border-border/30 pt-16">
            <div className="flex -space-x-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-2xl border-4 border-bg-base bg-bg-raised flex items-center justify-center font-black text-xs shadow-xl text-text-muted">
                    {String.fromCharCode(64 + i)}
                 </div>
               ))}
               <div className="w-14 h-14 rounded-2xl border-4 border-bg-base bg-accent flex items-center justify-center font-black text-xs text-white z-10 shadow-2xl">
                 +2K
               </div>
            </div>
            <div className="text-left">
               <div className="text-sm font-black text-text-primary uppercase tracking-widest">Active Community</div>
               <p className="text-[11px] text-text-muted font-black uppercase mt-1 tracking-tighter">Join the student-led MSME transformation</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-32 px-6 border-t-2 border-border/30 bg-bg-surface">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center font-black shadow-lg">V</div>
                  <span className="text-3xl font-black text-text-primary tracking-tighter">InnoVault</span>
               </div>
               <p className="text-xs text-text-muted max-w-xs font-bold leading-relaxed uppercase tracking-tighter">
                 A specialized marketplace for student-built automations and agentic workflows, built on the BuildForX ecosystem.
               </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
               {[
                 { title: 'Platform', links: ['Discover', 'Submit', 'Analytics', 'Compliance'] },
                 { title: 'Community', links: ['Students', 'MSMEs', 'Sectors', 'Gaps'] },
                 { title: 'Company', links: ['About', 'Blog', 'Support', 'Contact'] },
                 { title: 'Legal', links: ['Privacy', 'Terms', 'Licensing', 'Cookie Policy'] },
               ].map((group) => (
                 <div key={group.title} className="space-y-6">
                    <h4 className="text-[11px] font-black text-text-primary uppercase tracking-[0.3em]">{group.title}</h4>
                    <ul className="space-y-3">
                       {group.links.map(link => (
                         <li key={link}><button className="text-[10px] font-black text-text-muted hover:text-accent transition-colors uppercase tracking-[0.1em]">{link}</button></li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-32 pt-10 border-t-2 border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">© 2026 InUnity Innovation Hub • All Rights Reserved</p>
            <div className="flex items-center gap-8">
               {['TW', 'LI', 'GH', 'IG'].map(s => (
                 <button key={s} className="text-[10px] font-black text-text-muted hover:text-text-primary transition-colors tracking-widest">{s}</button>
               ))}
            </div>
         </div>
      </footer>
 </footer>
    </div>
  );
}
