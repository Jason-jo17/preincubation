"use client";

import React, { useState } from "react";
import { 
  Users, MessageSquare, Calendar, Search, 
  Filter, ChevronRight, Activity, Zap, 
  Plus, ArrowUpRight, FileText, CheckCircle2,
  AlertCircle, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { saveInteraction } from "@/app/actions/interactions";
import { useRouter } from "next/navigation";

interface Interaction {
  id: string;
  stakeholder: string;
  role: string | null;
  type: string;
  summary: string;
  sentiment: string | null;
  insights: number;
  date: Date;
}

export function InteractionsClient({ initialData }: { initialData: Interaction[] }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    stakeholder: "",
    role: "",
    type: "Meeting",
    summary: "",
    sentiment: "Neutral",
    insights: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await saveInteraction({
      ...formData,
      insights: Number(formData.insights),
      date: new Date()
    });
    setIsSubmitting(false);
    
    if (result.success) {
      setIsDialogOpen(false);
      setFormData({
        stakeholder: "",
        role: "",
        type: "Meeting",
        summary: "",
        sentiment: "Neutral",
        insights: 0
      });
      router.refresh();
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Stakeholder Lattice
             </div>
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total: {initialData.length} Interactions</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Interaction <span className="text-accent">Log</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Centralized repository for all stakeholder engagements and strategic intelligence.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-white h-14 px-8 font-black uppercase italic text-[11px] tracking-widest rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] transition-transform group">
               Record Engagement <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-bg-surface border-border rounded-[2.5rem] p-8 sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">Record <span className="text-accent">Engagement</span></DialogTitle>
              <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Capture strategic intelligence from your network</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted px-1">Stakeholder Name</label>
                  <Input 
                    required
                    value={formData.stakeholder}
                    onChange={e => setFormData({...formData, stakeholder: e.target.value})}
                    placeholder="E.G. DR. SAMEER K."
                    className="bg-bg-base border-border rounded-xl font-bold uppercase text-[10px] tracking-widest h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted px-1">Organization / Role</label>
                  <Input 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    placeholder="E.G. REGIONAL ADVISOR"
                    className="bg-bg-base border-border rounded-xl font-bold uppercase text-[10px] tracking-widest h-12" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted px-1">Engagement Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-bg-base border border-border rounded-xl font-bold uppercase text-[10px] tracking-widest h-12 px-3 outline-none focus:border-accent"
                  >
                    <option>Meeting</option>
                    <option>Interview</option>
                    <option>Workshop</option>
                    <option>Audit</option>
                    <option>Informal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted px-1">Vibe / Sentiment</label>
                  <select 
                    value={formData.sentiment}
                    onChange={e => setFormData({...formData, sentiment: e.target.value})}
                    className="w-full bg-bg-base border border-border rounded-xl font-bold uppercase text-[10px] tracking-widest h-12 px-3 outline-none focus:border-accent"
                  >
                    <option>Positive</option>
                    <option>Neutral</option>
                    <option>Negative</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-text-muted px-1">Engagement Summary</label>
                <textarea 
                  required
                  value={formData.summary}
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  placeholder="WHAT WERE THE KEY TAKEAWAYS?"
                  className="w-full bg-bg-base border border-border rounded-xl font-medium text-sm p-4 h-32 outline-none focus:border-accent resize-none"
                />
              </div>

              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white h-14 font-black uppercase italic text-[11px] tracking-widest rounded-2xl"
                >
                  {isSubmitting ? "Processing Node..." : "Commit to Lattice"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
        {initialData.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-[40px] bg-bg-surface/30">
            <Users className="mx-auto text-text-muted mb-4 opacity-20" size={64} />
            <h3 className="text-xl font-black uppercase tracking-tight text-text-muted">No engagements recorded</h3>
            <p className="text-[10px] font-bold text-text-muted/60 uppercase tracking-widest mt-2">Start capturing stakeholder intelligence to populate the lattice.</p>
          </div>
        ) : (
          initialData.map((item, idx) => (
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
                             <p className="text-[10px] font-black uppercase text-text-muted tracking-tight">{item.role || "STAKEHOLDER"}</p>
                          </div>
                          <Badge variant="outline" className={cn(
                            "rounded-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5",
                            item.sentiment === 'Positive' ? "bg-success/10 text-success border-success/20" : "bg-bg-base text-text-muted border-border"
                          )}>
                             {item.sentiment || "NEUTRAL"} Sentiment
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
                                      <Calendar className="w-3.5 h-3.5" /> {new Date(item.date).toLocaleDateString()}
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
          ))
        )}
      </div>
    </div>
  );
}
