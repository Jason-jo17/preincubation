import React from 'react'
import { Bot, Sparkles, Users, MessageSquare, Zap } from 'lucide-react'

export const metadata = {
  title: 'Co-Innovator Hub | InUnity',
  description: 'Collaborate with AI and peers on your venture logic.',
}

export default function CoInnovatorPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bot className="text-accent" size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Neural Core</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-text">Co-Innovator <span className="text-accent">Hub</span></h1>
          <p className="text-text-muted mt-2 text-lg">Your AI partner for stress-testing business logic and scaling impact.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-bg-surface border border-border rounded-2xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text">AI Online</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-border rounded-[40px] p-8 h-[600px] flex flex-col justify-center items-center text-center space-y-6 border-dashed opacity-50">
             <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles size={40} />
             </div>
             <div className="max-w-md">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Neural Link Pending</h3>
                <p className="text-sm text-text-muted mt-2">Connect your venture data to enable the Co-Innovator AI assistant. It will help you refine your value prop and identify market blindspots.</p>
             </div>
             <button className="px-8 py-4 bg-accent text-bg-base rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent/20">
                Initialize Link
             </button>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-bg-surface border border-border rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <Users size={16} className="text-accent" /> Peer Insights
              </h4>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="p-4 bg-bg-base rounded-2xl border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                         <div className="w-6 h-6 rounded-full bg-accent/20" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Founder_{i}29</span>
                      </div>
                      <p className="text-xs font-bold text-text-muted italic">&quot;How are you handling the new compliance updates in the fintech sector?&quot;</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2 text-accent">
                 <Zap size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Active Bounties</span>
              </div>
              <p className="text-sm font-black tracking-tight text-text">No active challenges in your cohort yet.</p>
           </div>
        </div>
      </div>
    </div>
  )
}
