"use client";

import React from "react";
import { 
  Rocket, 
  Target, 
  Zap, 
  Activity, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  Mail,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function MenteePortalPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <Link href="/manager/mentees" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Advancement Node
             </div>
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ID: {id}</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Innovator <span className="text-accent">Portal</span>
          </h1>
          <div className="flex items-center gap-4">
             <div className="size-16 rounded-2xl bg-bg-surface border border-border flex items-center justify-center font-black text-2xl text-accent shadow-xl">
                A
             </div>
             <div className="space-y-1">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Aravind Sharma</h3>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">IIT Bombay • AI/ML Specialist</p>
             </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="h-14 px-8 border-2 font-black uppercase italic text-[11px] tracking-widest rounded-2xl">
             <Mail className="w-4 h-4 mr-2" /> Message
          </Button>
          <Button className="bg-accent text-white h-14 px-8 font-black uppercase italic text-[11px] tracking-widest rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] transition-transform">
             Audit Readiness <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Critical Status Matrix */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { l: "System Health", v: "92%", s: "Optimized", c: "text-success" },
           { l: "Advancement Velocity", v: "1.4x", s: "Above Avg", c: "text-accent" },
           { l: "Interaction Pulse", v: "High", s: "45 Records", c: "text-blue-500" },
           { l: "Validation Status", v: "TRL 4", s: "Pending Audit", c: "text-warning" },
         ].map((item, i) => (
           <Card key={i} className="bg-bg-surface border-border shadow-sm rounded-3xl overflow-hidden p-6 hover:border-accent/30 transition-all">
              <p className="text-[9px] font-black uppercase text-text-muted tracking-widest mb-1">{item.l}</p>
              <div className="flex items-baseline gap-2">
                 <h4 className="text-3xl font-black italic tracking-tighter">{item.v}</h4>
                 <span className={cn("text-[8px] font-black uppercase", item.c)}>{item.s}</span>
              </div>
           </Card>
         ))}
      </section>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="progress" className="w-full space-y-8">
         <TabsList className="bg-bg-raised border border-border p-1 h-16 rounded-2xl gap-2">
            <TabsTrigger value="progress" className="h-full px-8 flex items-center gap-2 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-text-primary data-[state=active]:text-bg-base rounded-xl transition-all">
               <Activity className="w-4 h-4" /> Readiness Analysis
            </TabsTrigger>
            <TabsTrigger value="interactions" className="h-full px-8 flex items-center gap-2 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-text-primary data-[state=active]:text-bg-base rounded-xl transition-all">
               <MessageSquare className="w-4 h-4" /> Engagement Logs
            </TabsTrigger>
            <TabsTrigger value="evidence" className="h-full px-8 flex items-center gap-2 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-text-primary data-[state=active]:text-bg-base rounded-xl transition-all">
               <ShieldCheck className="w-4 h-4" /> Evidence Vault
            </TabsTrigger>
         </TabsList>

         <TabsContent value="progress" className="mt-0 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] p-10 space-y-8">
                  <div className="flex items-center justify-between border-b border-border pb-6">
                     <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" /> Growth Trajectory
                     </h3>
                     <Badge className="bg-accent text-white font-black text-[9px] uppercase tracking-widest">TRL Advancement</Badge>
                  </div>
                  
                  <div className="space-y-8">
                     {[
                       { l: "Technology Readiness (TRL)", v: 4, max: 9, c: "bg-orange-500" },
                       { l: "Commercial Readiness (CRL)", v: 3, max: 9, c: "bg-emerald-500" },
                       { l: "Investment Readiness (IRL)", v: 2, max: 9, c: "bg-blue-500" },
                     ].map(r => (
                       <div key={r.l} className="space-y-3">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-tight">{r.l}</p>
                                <p className="text-xs font-bold text-text-muted italic">Stage {r.v} reached</p>
                             </div>
                             <p className="text-xl font-black italic">{r.v}/{r.max}</p>
                          </div>
                          <div className="h-2 bg-bg-base rounded-full overflow-hidden border border-border shadow-inner">
                             <div className={cn("h-full transition-all duration-1000", r.c)} style={{ width: `${(r.v / r.max) * 100}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </Card>

               <div className="space-y-8">
                  <Card className="bg-text-primary text-bg-base rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Zap className="w-32 h-32 -mr-12 -mt-12" />
                     </div>
                     <div className="space-y-6 relative z-10">
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-accent">Mentor Recommendations</h3>
                           <p className="text-[9px] font-black opacity-60 uppercase tracking-widest">AI Assisted Analysis</p>
                        </div>
                        <ul className="space-y-4">
                           {[
                             "Validate prototype in a simulated industrial environment.",
                             "Increase engagement frequency with MSINS regional nodes.",
                             "Document regulatory barriers for TRL 5 compliance."
                           ].map((rec, i) => (
                             <li key={i} className="flex gap-3 text-xs font-medium leading-relaxed italic border-l-2 border-accent pl-4">
                                "{rec}"
                             </li>
                           ))}
                        </ul>
                        <Button className="w-full h-12 bg-bg-base text-text-primary font-black uppercase italic text-[10px] tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all">
                           Update Strategy Node
                        </Button>
                     </div>
                  </Card>

                  <Card className="bg-bg-surface border-border rounded-[2.5rem] p-8 space-y-4 shadow-sm border-2 border-warning/20">
                     <div className="flex items-center gap-3 text-warning">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Risk Warning</span>
                     </div>
                     <p className="text-xs font-bold text-text-muted italic uppercase leading-relaxed">
                        Interaction pulse dropped by 25% in the last 48 hours. Recommend proactive intervention.
                     </p>
                  </Card>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="interactions" className="mt-0 outline-none">
            <Card className="bg-bg-surface border-border shadow-sm rounded-[2.5rem] overflow-hidden">
               <CardHeader className="p-8 border-b border-border bg-bg-raised/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Interaction Lattice</CardTitle>
                  <Button variant="outline" className="h-10 px-6 rounded-xl font-black uppercase italic text-[9px] tracking-widest">Export Log</Button>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-border bg-bg-base/30">
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Date</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Stakeholder</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Type</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Outcome</th>
                              <th className="px-8 py-5"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {[
                             { d: "2h Ago", s: "Dr. Sameer K.", t: "Interview", o: "Core validation success" },
                             { d: "1d Ago", s: "TechCorp Ltd", t: "Meeting", o: "Pilot Q3 interest" },
                             { d: "3d Ago", s: "MSINS Hub", t: "Audit", o: "TRL 4 verified" },
                           ].map((item, i) => (
                             <tr key={i} className="hover:bg-bg-base/50 transition-colors group">
                                <td className="px-8 py-5 text-[10px] font-bold text-text-muted">{item.d}</td>
                                <td className="px-8 py-5 font-black uppercase text-[11px] tracking-tight group-hover:text-accent transition-colors">{item.s}</td>
                                <td className="px-8 py-5">
                                   <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-border bg-bg-raised">{item.t}</Badge>
                                </td>
                                <td className="px-8 py-5 text-[10px] font-medium italic text-text-secondary">{item.o}</td>
                                <td className="px-8 py-5 text-right">
                                   <Button variant="ghost" size="icon" className="size-8 rounded-lg group-hover:bg-accent/10 group-hover:text-accent">
                                      <ArrowUpRight className="w-4 h-4" />
                                   </Button>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
         </TabsContent>

         <TabsContent value="evidence" className="mt-0 outline-none text-center p-20 bg-bg-surface border-2 border-dashed border-border rounded-[3rem]">
            <Layers className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-20" />
            <h4 className="text-xl font-black italic tracking-tighter uppercase text-text-muted">Evidence Vault Locked</h4>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">Requires TRL 5 verification to unlock high-fidelity artifact access.</p>
         </TabsContent>
      </Tabs>
    </div>
  );
}
