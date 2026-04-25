'use client';

import { ProjectSubmitForm } from '@/components/projects/ProjectSubmitForm';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-bg-base font-body">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 border-b border-border bg-bg-surface/80 backdrop-blur-xl py-5 px-8 mb-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <a href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-2xl bg-bg-surface border-2 border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/20 group-hover:bg-bg-base transition-all font-black shadow-inner">←</div>
              <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] pt-0.5 font-display">Return to Hub</span>
           </a>
           <div className="flex items-center gap-3 px-4 py-2 bg-success/5 rounded-2xl border border-success/10">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(30,192,117,0.5)]" />
              <span className="text-[10px] font-black text-success uppercase tracking-widest pt-0.5 font-display">BuildForX Mainnet</span>
           </div>
        </div>
      </nav>

      <main className="relative z-10">
        <ProjectSubmitForm />
      </main>

      <footer className="relative z-10 py-16 border-t-2 border-border text-center bg-bg-surface/30">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] font-display">
           Secure Content Submission Engine • BuildForX Node v4.2.0
         </p>
      </footer>
    </div>
  );
}
