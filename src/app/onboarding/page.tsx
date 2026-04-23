import React from "react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Command } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-success/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] pointer-events-none" />

      {/* Top Nav */}
      <nav className="absolute top-0 left-0 w-full p-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
            <Command className="w-5 h-5 text-bg-base" />
          </div>
          <span className="text-sm font-black text-text-primary uppercase tracking-tighter">SuperApp <span className="text-accent">Node</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Secure Session: v1.0.4</span>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        <OnboardingForm />
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 left-0 w-full px-12 flex justify-between items-center z-10 pointer-events-none opacity-40">
        <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Integrated Intelligence Environment</span>
        <div className="text-right">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Pre-Incubation Pipeline v4.0</span>
        </div>
      </footer>
    </div>
  );
}
