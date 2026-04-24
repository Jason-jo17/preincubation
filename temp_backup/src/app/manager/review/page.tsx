"use client";

import React from "react";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const REVIEWS = [
  { id: "r1", title: "TRL 4 Evidence: Smart Grid Node", innovator: "Aravind Sharma", date: "2h Ago", status: "Pending", priority: "High" },
  { id: "r2", title: "Market Validation: Agri-Bot", innovator: "Priya Patel", date: "5h Ago", status: "Reviewing", priority: "Medium" },
  { id: "r3", title: "System Architecture: Fintech API", innovator: "Rahul Verma", date: "1d Ago", status: "Pending", priority: "Low" },
];

export default function ExpertReviewPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <ClipboardCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quality Assurance Lattice</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Expert <span className="text-accent">Review</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            High-fidelity evaluation matrix for innovator advancement and verification.
          </p>
        </div>
        <Button className="bg-accent text-white h-12 font-black uppercase italic text-[10px] tracking-widest px-8 rounded-none shadow-lg shadow-accent/20">
           <ShieldCheck className="w-4 h-4 mr-2" /> Consensus Engine
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Review Queue */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input placeholder="SEARCH REVIEW QUEUE..." className="pl-12 h-14 bg-bg-surface border-border rounded-2xl font-black uppercase tracking-widest text-[10px]" />
               </div>
               <Button variant="outline" className="h-14 px-6 rounded-2xl border-border bg-bg-surface font-black uppercase italic text-[10px] tracking-widest">
                  <Filter className="w-4 h-4 mr-2" /> Sort Matrix
               </Button>
            </div>

            <div className="space-y-4">
               {REVIEWS.map((review, idx) => (
                 <motion.div
                   key={review.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-bg-surface border border-border p-6 rounded-3xl hover:border-accent/30 transition-all group cursor-pointer shadow-sm relative overflow-hidden"
                 >
                    <div className="flex items-start justify-between mb-4">
                       <div className="space-y-1">
                          <h4 className="font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">{review.title}</h4>
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Innovator: {review.innovator}</p>
                       </div>
                       <Badge className={cn(
                         "text-[8px] font-black uppercase tracking-widest px-3 py-1 border-none",
                         review.priority === 'High' ? "bg-danger text-white shadow-lg shadow-danger/20" : "bg-bg-raised text-text-secondary"
                       )}>
                          {review.priority} Priority
                       </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase tracking-widest">
                             <Clock className="w-3.5 h-3.5" /> {review.date}
                          </div>
                          <div className={cn(
                            "flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest",
                            review.status === 'Reviewing' ? "text-accent" : "text-warning"
                          )}>
                             <Activity className="w-3.5 h-3.5" /> {review.status}
                          </div>
                       </div>
                       <Button variant="ghost" className="h-10 px-6 text-accent font-black uppercase italic text-[10px] tracking-widest group-hover:bg-accent/10 rounded-xl transition-all">
                          Initialize Review <ArrowUpRight className="w-4 h-4 ml-1" />
                       </Button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Right Column: Evaluation Matrix */}
         <div className="space-y-6">
            <div className="bg-bg-surface border border-border p-8 rounded-[2.5rem] space-y-8 shadow-sm">
               <h3 className="text-sm font-black uppercase tracking-widest border-b border-border pb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" /> Evaluation Matrix
               </h3>
               
               <div className="space-y-6">
                  {[
                    { l: "High-Fidelity Evidence", v: 85 },
                    { l: "Strategic Alignment", v: 92 },
                    { l: "Market Readiness", v: 64 },
                    { l: "Technical Feasibility", v: 78 },
                  ].map(item => (
                    <div key={item.l} className="space-y-2">
                       <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                          <span>{item.l}</span>
                          <span className="text-accent">{item.v}%</span>
                       </div>
                       <div className="h-1.5 bg-bg-base rounded-full overflow-hidden border border-border shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.v}%` }}
                            className="h-full bg-accent" 
                          />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                     <Zap className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">AI Audit Result</span>
                  </div>
                  <p className="text-[10px] font-bold text-text-muted italic uppercase leading-relaxed">
                     Probabilistic verification indicates 88% confidence in TRL 4 achievement. Recommended: Proceed to Consensus.
                  </p>
               </div>
            </div>

            <div className="bg-text-primary p-8 rounded-[2.5rem] text-bg-base space-y-6 shadow-xl shadow-bg-surface/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-32 h-32 -mr-12 -mt-12" />
               </div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase relative z-10">Consensus Engine</h3>
               <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest leading-relaxed relative z-10">
                  Synthesize multi-expert feedback into a singular advancement decision node.
               </p>
               <Button className="h-12 w-full bg-bg-base text-text-primary font-black uppercase italic text-[9px] tracking-widest rounded-xl relative z-10 hover:bg-bg-base/90">
                  Launch Terminal
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}