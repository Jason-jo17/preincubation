'use client';

import { OnboardingForm } from '@/components/onboarding/OnboardingForm';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center relative overflow-hidden font-body">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/2 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-accent/5 bg-[size:40px_40px] pointer-events-none" />

      <nav className="absolute top-0 left-0 w-full p-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-bg-surface border border-border flex items-center justify-center font-black text-accent shadow-lg font-display">V</div>
          <span className="text-sm font-black text-text-primary uppercase tracking-tighter font-display">InnoVault</span>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
           <span className="text-[10px] font-black text-text-muted uppercase tracking-widest pt-0.5">Dakshina Kannada Node v4.2.0</span>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        <OnboardingForm />
      </main>

      <footer className="absolute bottom-4 left-0 w-full text-center py-6 px-12 flex justify-between items-center pointer-events-none z-0">
         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">© 2026 InUnity • Project BuildForX</span>
         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none text-right">Encrypted Terminal Session<br/>Secure Uplink Established</span>
      </footer>

    </div>
  );
}
