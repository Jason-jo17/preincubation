import React from 'react'
import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Calendar | InUnity',
  description: 'Manage your sessions and milestones.',
}

export default function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="text-accent" size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Time Management</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-text">Launch <span className="text-accent">Calendar</span></h1>
          <p className="text-text-muted mt-2 text-lg">Workshops, mentor sessions, and critical sprint deadlines.</p>
        </div>
        <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-2xl p-1">
            <button className="p-2 hover:bg-bg-base rounded-xl transition-colors"><ChevronLeft size={20} /></button>
            <span className="px-4 text-xs font-black uppercase tracking-widest">April 2026</span>
            <button className="p-2 hover:bg-bg-base rounded-xl transition-colors"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-bg-surface border border-border rounded-[40px] p-8 shadow-xl">
           <div className="grid grid-cols-7 gap-4 mb-8">
              {days.map(day => (
                <div key={day} className="text-[10px] font-black uppercase tracking-widest text-center text-text-muted opacity-40">{day}</div>
              ))}
           </div>
           <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className={cn(
                  "aspect-square rounded-2xl border border-border/30 p-3 relative group hover:border-accent/40 transition-all cursor-pointer",
                  i === 24 ? "bg-accent/5 border-accent/40 shadow-inner" : "bg-bg-base/30"
                )}>
                   <span className={cn("text-xs font-black", i === 24 ? "text-accent" : "text-text-muted")}>{i + 1}</span>
                   {i === 24 && <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(63,208,201,0.8)]" />}
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-bg-surface border border-border rounded-3xl p-6 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center justify-between">
                 Upcoming Today <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[8px]">1 Event</span>
              </h4>
              <div className="p-6 bg-accent text-bg-base rounded-[32px] shadow-xl shadow-accent/20 space-y-4">
                 <div className="flex items-center gap-2">
                    <Video size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mentor Session</span>
                 </div>
                 <h5 className="text-xl font-black leading-tight">Venture Logic Optimization with Dr. Sarah Chen</h5>
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-70">
                    <div className="flex items-center gap-1"><Clock size={12} /> 14:00 - 15:30</div>
                 </div>
                 <button className="w-full py-3 rounded-xl bg-bg-base/20 backdrop-blur border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-bg-base/30 transition-all">
                    Join Neural Link
                 </button>
              </div>
           </div>

           <div className="bg-bg-surface border border-border rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">Deadlines</h4>
              <div className="space-y-4">
                 {[1,2].map(i => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-bg-base rounded-2xl border border-border/50">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                         <Clock size={20} />
                      </div>
                      <div className="flex-1">
                         <div className="text-[10px] font-black uppercase text-red-500">2 Days Left</div>
                         <div className="text-sm font-bold truncate">Submit PESTLE Analysis</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
