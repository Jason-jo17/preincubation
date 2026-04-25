import React from 'react'
import { Activity, UserCircle } from 'lucide-react'

export default function MentorLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-center animate-pulse">
           <UserCircle className="text-accent animate-bounce" size={32} />
        </div>
        <div className="absolute -top-1 -right-1">
           <Activity className="text-accent/50 animate-pulse" size={20} />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-black uppercase tracking-widest">Accessing <span className="text-accent">Mentor HQ</span></h3>
        <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.4em] animate-pulse">Syncing Mentee Portfolios...</p>
      </div>
      
      <div className="w-full max-w-4xl space-y-4 mt-8 opacity-20">
         <div className="h-12 bg-bg-surface border border-border rounded-xl animate-pulse" />
         <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-bg-surface border border-border rounded-xl animate-pulse" />
            <div className="h-32 bg-bg-surface border border-border rounded-xl animate-pulse" />
         </div>
         <div className="h-48 bg-bg-surface border border-border rounded-xl animate-pulse" />
      </div>
    </div>
  )
}
