"use client";

import React from "react";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  Zap,
  Plus,
  ArrowUpRight,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const INTERACTIONS = [
  {
    id: "i1",
    stakeholder: "Dr. Sameer K.",
    role: "Regional Advisor",
    type: "Interview",
    date: "2h Ago",
    summary: "Validated the core efficiency gap in regional supply chain nodes. Evidence captured via MOSI.",
    sentiment: "Positive",
    insights: 4
  },
  {
    id: "i2",
    stakeholder: "TechCorp Ltd",
    role: "Industry Partner",
    type: "Meeting",
    date: "1d Ago",
    summary: "Discussed pilot integration for Q3. High interest in AI-driven predictive maintenance.",
    sentiment: "Neutral",
    insights: 2
  },
  {
    id: "i3",
    stakeholder: "MSINS Hub",
    role: "Incubation Node",
    type: "Audit",
    date: "3d Ago",
    summary: "TRL 4 evidence verification completed. Recommended for advancement.",
    sentiment: "Positive",
    insights: 1
  }
];

export default function InteractionsPage() {
  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Stakeholder Lattice
             </div>
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total: 124 Interactions</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Interaction <span className="text-accent">Log</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Centralized repository for all stakeholder engagements and strategic intelligence.
          </p>
        </div>
        
        <Button className="bg-accent text-white h-14 px-8 font-black uppercase italic text-[11px] tracking-widest rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] transition-transform group">
           Record Engagement <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform" />
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
           <Input 
             placeholder="SEARCH INTERACTION LATTICE..." 
             className="pl-14 h-16 bg-bg-surface border-border rounded-3xl font-black uppercase tracking-widest text-[11px] focus:ring-accent shadow-sm"
           />
        </div>
        <Button variant="outline" className="h-16 px-8 rounded-3xl border-border bg-bg-surface font-black uppercase italic text-[10px] tracking-widest hover:border-accent transition-all">
           <Filter className="w-4 h-4 mr-2" /> Sort Matrix
        </Button>
      </div>

      {/* Interactions Feed */}
      <div className="space-y-6">
        {INTERACTIONS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-bg-surface border-border rounded-[2.5rem] overflow-hidden hover:border-accent/30 transition-all group shadow-sm">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                     {/* Left: Participant Info */}
                     <div className="p-8 md:w-64 bg-bg-raised/50 border-r border-border space-y-4">
                        <div className="size-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform font-black text-xl">
                           {item.stakeholder[0]}
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-black italic uppercase text-lg tracking-tighter leading-none">{item.stakeholder}</h4>
                           <p className="text-[10px] font-black uppercase text-text-muted tracking-tight">{item.role}</p>
                        </div>
                        <Badge variant="outline" className={cn(
                          "rounded-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5",
                          item.sentiment === 'Positive' ? "bg-success/10 text-success border-success/20" : "bg-bg-base text-text-muted border-border"
                        )}>
                           {item.sentiment} Sentiment
                        </Badge>
                     </div>

                     {/* Right: Interaction Details */}
                     <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                        <div className="flex items-start justify-between">
                           <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                 <Badge className="bg-bg-base text-text-primary border-border font-black text-[9px] uppercase tracking-widest px-3 py-1">
                                    {item.type}
                                 </Badge>
                                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                                 </span>
                              </div>
                              <p className="text-sm font-medium text-text-secondary leading-relaxed max-w-2xl italic">
                                "{item.summary}"
                              </p>
                           </div>
                           
                           {item.insights > 0 && (
                             <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/20">
                                <Zap className="w-3.5 h-3.5 text-accent fill-current" />
                                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{item.insights} Insights</span>
                             </div>
                           )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                           <div className="flex gap-4">
                              <Button variant="ghost" className="h-10 px-4 text-accent font-black uppercase italic text-[10px] tracking-widest hover:bg-accent/10 rounded-xl">
                                 <FileText className="w-4 h-4 mr-2" /> Full Transcript
                              </Button>
                              <Button variant="ghost" className="h-10 px-4 text-text-muted font-black uppercase italic text-[10px] tracking-widest hover:bg-bg-base rounded-xl">
                                 <Activity className="w-4 h-4 mr-2" /> Analysis Node
                              </Button>
                           </div>
                           <Button className="size-10 rounded-xl bg-bg-raised border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-all group/btn">
                              <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex justify-center">
         <Button variant="outline" className="h-14 px-12 rounded-3xl border-2 font-black uppercase italic text-[11px] tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all shadow-lg shadow-bg-surface/10">
            Expand Intelligence Feed
         </Button>
      </div>
    </div>
  );
}
