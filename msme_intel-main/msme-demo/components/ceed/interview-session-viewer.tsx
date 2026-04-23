"use client";

import React from 'react';
import { 
  X, Mic, Play, Pause, SkipBack, SkipForward, Clock, MessageSquare, TrendingUp, Zap, Target, Shield, Download, Share2, MoreVertical, Activity, ArrowRight, UserCircle, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewSessionViewerProps {
  isOpen: boolean;
  onClose: () => void;
  session: any; // Mosi-integrated session
}

export default function InterviewSessionViewer({ isOpen, onClose, session }: InterviewSessionViewerProps) {
  const router = useRouter();
  if (!session) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-white border-slate-200 p-0 overflow-hidden flex flex-col shadow-2xl">
        <DialogHeader className="p-6 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <div className="p-1 px-2 rounded bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5">
                      <Mic className="w-3 h-3 text-purple-400" />
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Discovery Forensic</span>
                   </div>
                   <Badge variant="outline" className="bg-white border-slate-200 text-[10px] text-slate-500 shadow-sm">ID: {session.id}</Badge>
                </div>
                <DialogTitle className="text-2xl font-black text-slate-900 italic tracking-tighter">
                   Session with <span className="text-blue-500">{session.stakeholder_id || 'Principal Stakeholder'}</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 flex items-center gap-4 text-xs font-medium">
                   <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.date || 'Apr 01, 2026'}</span>
                   <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {(session.duration / 60).toFixed(1)} mins</span>
                   <span className="flex items-center gap-1 text-emerald-400 font-bold tracking-widest uppercase">● {session.status}</span>
                </DialogDescription>
             </div>
             
             <div className="flex gap-2">
                <Button 
                   onClick={() => router.push(`/portal/student/prd-builder?session_id=${session.id}&company_id=${session.companyId}`)}
                   className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-black text-[10px] uppercase tracking-widest px-4 h-9 shadow-lg shadow-blue-500/20"
                >
                   <Sparkles className="w-4 h-4" /> Synthesize PRD
                </Button>
                <Button variant="outline" size="sm" className="bg-slate-900 border-slate-800 text-white gap-2 h-9">
                   <Download className="w-4 h-4" /> Export Raw
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-500 hover:text-white">
                   <X className="w-5 h-5" />
                </Button>
             </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
           {/* Sidebar: Metadata & Insights */}
           <div className="w-full lg:w-80 border-r border-slate-200 p-6 space-y-8 overflow-y-auto bg-slate-50">
              <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Stakeholder Profile</h3>
                 <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                          <UserCircle className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">{session.stakeholder_id}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Decision Maker</p>
                       </div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Domain</span>
                          <span className="text-slate-900 font-medium">Manufacturing</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">CEED Mapping</h3>
                 <div className="grid grid-cols-2 gap-2">
                    {[
                      { l: 'Core', v: 82, c: 'bg-emerald-500' },
                      { l: 'Expansion', v: 45, c: 'bg-purple-500' },
                      { l: 'Efficiency', v: 88, v2: 'HIGH', c: 'bg-amber-500' },
                      { l: 'Disruption', v: 32, c: 'bg-blue-500' }
                    ].map(q => (
                       <div key={q.l} className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm group hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-center mb-1.5">
                             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{q.l}</span>
                             {q.v2 && <span className="text-[8px] font-black text-amber-500 underline underline-offset-2">{q.v2}</span>}
                          </div>
                          <div className="flex items-end gap-1.5">
                             <span className="text-sm font-black text-slate-900">{q.v}%</span>
                             <div className="flex-1 h-1 bg-slate-100 rounded-full mb-1 overflow-hidden">
                                <div className={`h-full ${q.c}`} style={{ width: `${q.v}%` }} />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Contextual Summary</h3>
                 <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {session.summary || "No summary available."}
                 </p>
                 <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Intelligence Alert</p>
                    <p className="text-[11px] text-slate-400 leading-normal">High appetite for Computer Vision solutions mentioned at 04:50.</p>
                 </div>
              </div>
           </div>

           {/* Main Content: Transcript & Audio */}
           <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Audio Controls Simulation */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col gap-4">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                       <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900"><SkipBack className="w-5 h-5" /></Button>
                       <Button size="icon" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg"><Play className="w-5 h-5 fill-current" /></Button>
                       <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900"><SkipForward className="w-5 h-5" /></Button>
                    </div>
                    
                    <div className="flex-1 space-y-1.5">
                       <div className="flex justify-between text-[10px] font-bold text-slate-500 tracking-widest">
                          <span>04:12 / 24:10</span>
                          <span>STAKEHOLDER SPEAKING</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-900 rounded-full cursor-pointer group relative">
                          <div className="absolute top-0 left-0 h-full w-[25%] bg-blue-600 rounded-full" />
                          <div className="absolute top-[-4px] left-[25%] w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </div>

                    <div className="flex items-center gap-2">
                       <Badge className="bg-purple-600 text-white border-none font-bold italic">AI ANALYZING</Badge>
                    </div>
                 </div>
              </div>

               {/* Transcript Scroll Area */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8 scroller-hide bg-[linear-gradient(to_bottom,rgba(248,250,252,0.5),transparent)]">
                  <div className="space-y-10">
                     {session.transcript && session.transcript.length > 0 ? (
                        session.transcript.map((t: any, idx: number) => (
                           <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex gap-6 group relative"
                           >
                              {t.opportunity && (
                                 <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                              )}
                              <div className="w-12 text-[10px] font-black text-slate-400 pt-1 tracking-tighter tabular-nums">{t.time}</div>
                              <div className="flex-1 space-y-3">
                                 <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic ${t.speaker === 'Interviewer' ? 'text-purple-500' : 'text-blue-500'}`}>
                                       {t.speaker}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-slate-100" />
                                 </div>
                                 <div className="space-y-4">
                                    <p className={`text-sm leading-relaxed max-w-2xl font-medium tracking-tight ${t.speaker === 'Interviewer' ? 'text-slate-500' : 'text-slate-900'}`}>
                                       {t.text}
                                    </p>

                                    {t.opportunity && (
                                       <motion.div 
                                          initial={{ scale: 0.95, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          className="p-5 rounded-2xl bg-white border border-amber-200 shadow-[0_8px_30px_rgb(245,158,11,0.08)] mt-4 max-w-xl group-hover:border-amber-400 transition-all border-l-4 border-l-amber-500"
                                       >
                                          <div className="flex items-center justify-between mb-4">
                                             <div className="flex items-center gap-2.5">
                                                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                                                   <Zap className="w-4 h-4 fill-current" />
                                                </div>
                                                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest">Opportunity Synthesized</span>
                                             </div>
                                             <Badge className="bg-amber-50 text-amber-600 border-amber-200 text-[9px] font-black px-3 py-0.5 rounded-full">EFFICIENCY</Badge>
                                          </div>
                                          
                                          <div className="flex items-center gap-4 mb-4">
                                             <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500 w-[90%]" />
                                             </div>
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Clarity: 4/4</span>
                                          </div>

                                          <Button 
                                             size="sm" 
                                             onClick={() => router.push(`/programs/challenges/create?session=${session.id}&insight=${t.time}`)}
                                             className="w-full h-10 bg-slate-900 hover:bg-black text-white text-[11px] font-black tracking-widest px-6 gap-2 rounded-xl group/btn"
                                          >
                                             MAP TO AUTOMATION HUB <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                          </Button>
                                       </motion.div>
                                    )}
                                 </div>
                              </div>
                           </motion.div>
                        ))
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                              <MessageSquare className="w-8 h-8 text-slate-300" />
                           </div>
                           <p className="text-slate-400 font-bold italic">Waiting for forensic transcript synchronization...</p>
                        </div>
                     )}
                  </div>
               </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
