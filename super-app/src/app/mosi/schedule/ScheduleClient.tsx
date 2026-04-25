'use client';

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
  History,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scheduleMosiSession, cancelMosiSession } from "@/app/actions/mosi";
import { toast } from "sonner";

interface MosiSession {
  id: string;
  date: Date;
  time: string;
  status: string;
  stakeholderName: string;
  company: string | null;
  location: string;
}

export default function ScheduleClient({ initialSessions }: { initialSessions: MosiSession[] }) {
  const [view, setView] = useState<"upcoming" | "history">("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    stakeholderName: '',
    company: '',
    location: 'VIDEO CALL',
    date: '',
    time: ''
  });

  const list = view === "upcoming" 
    ? initialSessions.filter(s => s.status === "Scheduled") 
    : initialSessions.filter(s => s.status === "Completed" || s.status === "Cancelled");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await scheduleMosiSession(formData);
      toast.success("Session synchronized successfully");
      setIsModalOpen(false);
      setFormData({
        stakeholderName: '',
        company: '',
        location: 'VIDEO CALL',
        date: '',
        time: ''
      });
    } catch (error) {
      toast.error("Failed to schedule session");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
        >
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
                const hasMeeting = initialSessions.some(s => new Date(s.date).getDate() === day && s.status === "Scheduled");
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
                Active load: {initialSessions.filter(s => s.status === 'Scheduled').length} interview sessions detected in the current lattice.
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
                        <span className="text-[9px] font-black uppercase text-text-muted group-hover:text-accent">
                          {new Date(meeting.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-3xl font-black italic tracking-tighter group-hover:text-accent">
                          {new Date(meeting.date).getDate()}
                        </span>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                            meeting.status === 'Scheduled' ? "bg-accent/10 text-accent" : 
                            meeting.status === 'Cancelled' ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
                          )}>
                            {meeting.status}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{meeting.time}</span>
                        </div>
                        <h4 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">
                          {meeting.stakeholderName}
                        </h4>
                        <div className="flex items-center gap-4 text-[9px] font-black text-text-muted uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3" />{meeting.company || 'Private Entity'}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{meeting.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full md:w-auto">
                        {meeting.status === 'Scheduled' && (
                          <Button 
                            variant="ghost"
                            onClick={() => cancelMosiSession(meeting.id)}
                            className="text-red-500 text-[10px] font-black uppercase italic hover:bg-red-500/10"
                          >
                            Abort
                          </Button>
                        )}
                        <Button variant="outline" className="flex-1 md:w-auto font-black uppercase italic text-[10px] tracking-widest px-8 rounded-xl group-hover:bg-accent group-hover:text-white transition-all">
                          {meeting.status === 'Scheduled' ? 'Initiate' : 'Review'}
                        </Button>
                      </div>
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-bg-surface border border-border p-8 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">New <span className="text-accent">Session</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Initialize Interview Parameters</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-bg-base rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Stakeholder Identity</label>
                    <input 
                      required
                      value={formData.stakeholderName}
                      onChange={e => setFormData({ ...formData, stakeholderName: e.target.value })}
                      placeholder="Full Name"
                      className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold placeholder:text-text-muted/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Corporate Affiliation</label>
                    <input 
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company (Optional)"
                      className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold placeholder:text-text-muted/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Date</label>
                      <input 
                        required
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Time</label>
                      <input 
                        required
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Protocol / Location</label>
                    <select 
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="VIDEO CALL">VIDEO CALL</option>
                      <option value="OFFICE NODE">OFFICE NODE</option>
                      <option value="FIELD OPS">FIELD OPS</option>
                    </select>
                  </div>
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full bg-text-primary text-bg-base font-black uppercase italic py-6 rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-bg-base border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Synchronize Session
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
