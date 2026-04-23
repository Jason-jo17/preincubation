'use client';

import { ProjectSubmitForm } from '@/components/projects/ProjectSubmitForm';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 border-b border-slate-50 bg-white/80 backdrop-blur-xl py-5 px-8 mb-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <a href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border-2 border-slate-50 flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:border-amber-500/20 group-hover:bg-white transition-all font-black shadow-inner">←</div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] pt-0.5">Return to Hub</span>
           </a>
           <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest pt-0.5">BuildForX Mainnet</span>
           </div>
        </div>
      </nav>

      <main className="relative z-10">
        <ProjectSubmitForm />
      </main>

      <footer className="relative z-10 py-16 border-t-2 border-slate-50 text-center bg-slate-50/30">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
           Secure Content Submission Engine • BuildForX Node v4.2.0
         </p>
      </footer>
    </div>
  );
}
