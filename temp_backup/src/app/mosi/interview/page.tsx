"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Shield, 
  Cpu,
  BrainCircuit,
  Activity,
  Maximize2,
  Settings,
  MoreVertical,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function MosiLiveInterview() {
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => setElapsedTime(prev => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-screen bg-bg-base overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-border bg-bg-surface flex justify-between items-center z-20">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="size-10 bg-accent rounded-2xl flex items-center justify-center text-bg-base">
                 <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-sm font-black uppercase tracking-widest italic">MOSI AI Interviewer</h2>
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Candidate ID: #IS-9921-X</p>
              </div>
           </div>
           <div className="h-8 w-px bg-border" />
           <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Analysis Active</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-bg-raised border border-border rounded-xl flex items-center gap-3">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-xs font-black italic tracking-tighter font-mono">{formatTime(elapsedTime)}</span>
           </div>
           <Button variant="outline" size="icon" className="rounded-xl border-border hover:border-accent">
              <Settings className="w-4 h-4" />
           </Button>
        </div>
      </header>

      {/* Main Experience */}
      <main className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-hidden">
        {/* Visual Feed Section */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full overflow-hidden">
           {/* Primary Interviewee View */}
           <div className="flex-1 relative bg-bg-surface border border-border rounded-[3rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 flex items-center justify-center bg-bg-raised/50">
                 {isVideoOff ? (
                    <div className="flex flex-col items-center gap-4">
                       <div className="size-24 rounded-full bg-border flex items-center justify-center">
                          <Users className="w-10 h-10 text-text-muted" />
                       </div>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Camera Offline</p>
                    </div>
                 ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                       {/* Mock Video Feed */}
                       <div className="text-white/10 text-[20vw] font-black italic select-none">MOSI FEED</div>
                    </div>
                 )}
              </div>

              {/* HUD Overlays */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                 <Badge className="bg-bg-base/80 backdrop-blur-md border-border text-text-primary rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-widest">
                    Confidence Index: 92.4%
                 </Badge>
                 <Badge className="bg-bg-base/80 backdrop-blur-md border-border text-accent rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-widest">
                    Sentiment: Analytical
                 </Badge>
              </div>

              <div className="absolute bottom-8 right-8">
                 <div className="size-48 bg-bg-base/90 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl">
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                       <Cpu className="w-12 h-12 text-accent opacity-30" />
                       <div className="absolute inset-0 border-2 border-accent/20 rounded-3xl animate-pulse" />
                    </div>
                    <div className="absolute bottom-2 left-3">
                       <p className="text-[8px] font-black uppercase text-white tracking-widest">Interviewer (AI)</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Audio Waveform Control */}
           <div className="h-24 bg-bg-surface border border-border rounded-[2rem] px-8 flex items-center gap-8 shadow-xl">
              <Button 
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "size-12 rounded-2xl transition-all shadow-xl",
                  isRecording ? "bg-destructive text-white animate-pulse" : "bg-accent text-bg-base"
                )}
              >
                {isRecording ? <PhoneOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              
              <div className="flex-1 flex items-end justify-center gap-1 h-12">
                 {[...Array(32)].map((_, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 4 }}
                     animate={{ 
                       height: isRecording ? [4, Math.random() * 40 + 8, 4] : 4 
                     }}
                     transition={{ 
                       repeat: Infinity, 
                       duration: 0.5, 
                       delay: i * 0.05 
                     }}
                     className={cn("w-1.5 rounded-full bg-accent/20", i % 4 === 0 && "bg-accent/60")}
                   />
                 ))}
              </div>

              <div className="flex items-center gap-3">
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   onClick={() => setIsMuted(!isMuted)}
                   className={cn("size-10 rounded-xl transition-colors", isMuted ? "bg-destructive/10 text-destructive" : "hover:bg-bg-raised")}
                 >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                 </Button>
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   onClick={() => setIsVideoOff(!isVideoOff)}
                   className={cn("size-10 rounded-xl transition-colors", isVideoOff ? "bg-destructive/10 text-destructive" : "hover:bg-bg-raised")}
                 >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                 </Button>
              </div>
           </div>
        </div>

        {/* Real-time Insights Side */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8 h-full overflow-hidden">
           <div className="flex-1 bg-bg-surface border border-border rounded-[3rem] p-8 flex flex-col shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-black uppercase tracking-widest italic">Live Transcript</h3>
                 <Badge variant="outline" className="text-[8px] font-black uppercase border-border">Auto-Generating</Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                 {[
                   { role: "Interviewer", text: "Can you explain the delta between your solution and existing market ERPs?", time: "02:14" },
                   { role: "Candidate", text: "Our core differentiation is the agentic workflow integration that automates manual data entry...", time: "02:30" },
                   { role: "AI Analysis", text: "Candidate focused on scalability. CEED potential high in EFFICIENCY vector.", type: "insight" }
                 ].map((msg, i) => (
                   <div key={i} className={cn(
                     "space-y-2 p-4 rounded-2xl border",
                     msg.type === "insight" ? "bg-accent/5 border-accent/20" : "bg-bg-raised/50 border-border"
                   )}>
                      <div className="flex justify-between items-center">
                         <span className={cn("text-[9px] font-black uppercase tracking-widest", 
                           msg.role === "Interviewer" ? "text-accent" : 
                           msg.type === "insight" ? "text-success" : "text-text-muted"
                         )}>
                            {msg.role}
                         </span>
                         {msg.time && <span className="text-[8px] font-bold text-text-muted">{msg.time}</span>}
                      </div>
                      <p className={cn("text-[11px] font-bold leading-relaxed", 
                        msg.type === "insight" ? "text-text-primary italic" : "text-text-secondary"
                      )}>
                         {msg.text}
                      </p>
                   </div>
                 ))}
              </div>

              <div className="mt-8 p-6 bg-bg-raised border border-border rounded-3xl space-y-4">
                 <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-accent" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Compliance Monitor</h4>
                 </div>
                 <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Signal Quality</span>
                    <span className="text-success">Optimal</span>
                 </div>
                 <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
                    <div className="h-full w-full bg-success opacity-20" />
                 </div>
              </div>
           </div>

           <Button className="w-full h-16 bg-destructive text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-destructive/20 hover:bg-destructive/90">
              TERMINATE SESSION
           </Button>
        </div>
      </main>
    </div>
  )
}
