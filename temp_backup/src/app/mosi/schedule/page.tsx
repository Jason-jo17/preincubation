"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Video,
  MapPin,
  Building2,
  CheckCircle2,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_SESSIONS = [
  {
    id: "1",
    date: "MAR 16",
    time: "10:30 AM",
    status: "Scheduled",
    stakeholder: { name: "Dr. Vikram Seth", company: "Aequs SEZ" },
    location: "VIDEO CALL",
  },
  {
    id: "2",
    date: "MAR 14",
    time: "02:00 PM",
    status: "Completed",
    stakeholder: { name: "Sarah Jones", company: "TechForge" },
    location: "OFFICE NODE",
  }
];

export default function MosiSchedulePage() {
  const [view, setView] = useState<"upcoming" | "history">("upcoming");
  const list = view === "upcoming" ? MOCK_SESSIONS.filter(s => s.status === "Scheduled") : MOCK_SESSIONS.filter(s => s.status === "Completed");

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Temporal Node</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Interview <span className="text-accent">Chronology</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Plan and manage upcoming stakeholder sessions within the synchronized interview lattice.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5 mr-2" />
          Schedule New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Perspective */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-bg-surface border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black uppercase tracking-tight">March 2026</h3>
                <p className="text-[8px] text-text-muted font-bold uppercase tracking-widest">Standardized Time (UTC)</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-bg-base rounded-lg border border-border transition-all"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-bg-base rounded-lg border border-border transition-all"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[9px] font-black text-text-muted tracking-widest">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 12;
                const hasMeeting = day === 16;
                return (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center text-[11px] font-black rounded-lg cursor-pointer transition-all relative border border-transparent",
                      isToday ? "bg-accent text-white shadow-lg shadow-accent/20" : "hover:bg-accent/5 text-text-secondary hover:text-accent"
                    )}
                  >
                    {day}
                    {hasMeeting && !isToday && (
                      <div className="absolute bottom-1 w-1 h-1 bg-accent rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-text-primary p-6 rounded-2xl relative overflow-hidden text-bg-base shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <CalendarIcon className="w-24 h-24 -mr-8 -mt-8" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50">Daily Trajectory</h4>
              </div>
              <p className="text-xs font-bold leading-relaxed uppercase tracking-tight opacity-90">
                Active load: {MOCK_SESSIONS.length} interview sessions detected in the current lattice.
              </p>
              <button className="flex items-center gap-2 text-[9px] font-black hover:text-accent transition-all group uppercase tracking-widest border-b border-white/10 pb-1">
                Refresh Matrix
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Chronological Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex bg-bg-surface p-1 rounded-xl border border-border w-fit shadow-sm">
            <button 
              onClick={() => setView('upcoming')} 
              className={cn(
                 "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 view === 'upcoming' ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-text-muted hover:text-text-primary"
              )}
            >
               Upcoming
            </button>
            <button 
              onClick={() => setView('history')} 
              className={cn(
                 "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 view === 'history' ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-text-muted hover:text-text-primary"
              )}
            >
               History
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {list.length > 0 ? (
                <motion.div 
                  key={view}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {list.map((meeting) => (
                    <div key={meeting.id} className="bg-bg-surface border border-border p-4 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-accent/50 transition-all group shadow-sm">
                      <div className="w-full md:w-24 h-24 bg-bg-base flex flex-col items-center justify-center rounded-xl border border-border group-hover:bg-accent/5 group-hover:border-accent/20 transition-colors">
                        <span className="text-[9px] font-black uppercase text-text-muted group-hover:text-accent">{meeting.date.split(' ')[0]}</span>
                        <span className="text-3xl font-black italic tracking-tighter group-hover:text-accent">{meeting.date.split(' ')[1]}</span>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-accent/10 text-accent text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                            {meeting.status === 'Scheduled' ? 'Ready' : 'Archived'}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{meeting.time}</span>
                        </div>
                        <h4 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">
                          {meeting.stakeholder.name}
                        </h4>
                        <div className="flex items-center gap-4 text-[9px] font-black text-text-muted uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3" />{meeting.stakeholder.company}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{meeting.location}</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full md:w-auto font-black uppercase italic text-[10px] tracking-widest px-8 rounded-xl group-hover:bg-accent group-hover:text-white transition-all">
                        {meeting.status === 'Scheduled' ? 'Initiate' : 'Review'}
                      </Button>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="py-20 flex flex-col items-center text-center space-y-4 bg-bg-surface border border-dashed border-border rounded-3xl">
                  <div className="p-4 bg-bg-base rounded-2xl border border-border">
                    <History className="w-8 h-8 text-text-muted" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-tight">No sessions found</h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">The chronology for this view is empty.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
