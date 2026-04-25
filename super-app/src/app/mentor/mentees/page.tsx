import React from 'react'
import { getAllMentees } from '@/app/actions/assessment'
import { 
  Users, Rocket, Search, Filter, 
  ChevronRight, ArrowUpRight, Activity, 
  ExternalLink, MoreHorizontal, Clock,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default async function MenteesPage() {
  const result = await getAllMentees()
  const mentees = (result.success && result.data ? result.data : []) as any[]

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mentee <span className="text-accent">Insights</span></h1>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Deep-dive into individual venture growth & diagnostic data</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
             <input 
               type="text" 
               placeholder="Search ventures..." 
               className="pl-9 pr-4 py-2 bg-bg-surface border border-border rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-accent/50 w-64"
             />
           </div>
           <button className="px-6 py-2 bg-bg-surface border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-border transition-colors flex items-center gap-2">
             <Filter size={12} />
             Filter
           </button>
        </div>
      </div>

      {/* Grid of Mentees */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mentees.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[32px]">
            <Users className="mx-auto text-text-muted mb-4" size={48} />
            <p className="text-sm font-black uppercase tracking-widest text-text-muted">No mentees found in the system yet.</p>
          </div>
        ) : (
          mentees.map((mentee: any) => {
            const readiness = mentee.latestReadiness
            const levels = readiness?.levels as any || {}
            
            return (
              <div key={mentee.id} className="bg-bg-surface border border-border rounded-[40px] p-8 flex flex-col md:flex-row gap-8 group hover:border-accent/30 transition-all relative overflow-hidden">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
                
                {/* Left: Founder Info */}
                <div className="w-full md:w-1/3 flex flex-col">
                  <div className="size-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-4 shadow-sm">
                    <Rocket className="text-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight leading-tight">
                    {mentee.startupProfile?.startupName || mentee.name || "Unnamed Venture"}
                  </h3>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1 mb-4">
                    Founder: {mentee.name}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/50">
                    <Link 
                      href={`/mentor/mentees/${mentee.id}`}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
                    >
                      Full Profile <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                {/* Right: Maturity & Activity */}
                <div className="flex-1 space-y-6">
                  {/* Readiness Levels */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'TRL', val: levels.trl || 1, color: 'text-blue-500' },
                      { label: 'CRL', val: levels.crl || 1, color: 'text-purple-500' },
                      { label: 'IRL', val: levels.irl || 1, color: 'text-green-500' },
                    ].map((m) => (
                      <div key={m.label} className="bg-bg-base border border-border rounded-2xl p-3 text-center">
                        <span className="text-[8px] font-black uppercase tracking-widest text-text-muted block mb-1">{m.label}</span>
                        <span className={`text-xl font-black italic ${m.color}`}>L{m.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Diagnostic Maturity</span>
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {readiness?.stage || 'Seed'}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-accent transition-all duration-1000" 
                         style={{ width: `${(Math.max(levels.trl || 0, levels.crl || 0, levels.irl || 0) / 9) * 100}%` }}
                       />
                    </div>
                  </div>

                  {/* Activity Log Preview */}
                  <div className="bg-black/[0.02] rounded-2xl p-4">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Latest Submissions</span>
                       <Activity size={12} className="text-text-muted" />
                     </div>
                     <div className="space-y-2">
                       {mentee.toolSubmissions?.length > 0 ? (
                         mentee.toolSubmissions.slice(0, 2).map((sub: any, i: number) => (
                           <div key={i} className="flex items-center justify-between text-[10px]">
                             <span className="font-bold uppercase tracking-tight">{sub.toolId}</span>
                             <span className="text-text-muted">{new Date(sub.updatedAt).toLocaleDateString()}</span>
                           </div>
                         ))
                       ) : (
                         <span className="text-[9px] text-text-muted uppercase italic">No activity recorded</span>
                       )}
                     </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white border border-border rounded-full hover:bg-bg-raised transition-colors">
                     <MessageSquare size={14} className="text-text-muted" />
                   </button>
                   <button className="p-2 bg-white border border-border rounded-full hover:bg-bg-raised transition-colors">
                     <MoreHorizontal size={14} className="text-text-muted" />
                   </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function MessageSquare({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
