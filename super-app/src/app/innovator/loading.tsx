import React from 'react'
import { Loader2, Zap } from 'lucide-react'

export default function StudentLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-accent/10 border-t-accent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
           <Zap className="text-accent animate-pulse" size={32} />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black uppercase tracking-tighter italic">Initializing <span className="text-accent">Workspace</span></h3>
        <p className="text-xs text-text-muted font-bold uppercase tracking-[0.3em] animate-pulse">Syncing venture logic...</p>
      </div>
      
      {/* Skeleton placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12 opacity-20">
         {[1,2,3].map(i => (
           <div key={i} className="h-48 bg-bg-surface border border-border rounded-[32px] animate-pulse" />
         ))}
      </div>
    </div>
  )
}
