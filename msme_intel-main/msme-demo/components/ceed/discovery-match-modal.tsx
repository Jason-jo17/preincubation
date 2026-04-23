"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Zap, 
  Target, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Lock,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DiscoveryMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  sessionTitle: string;
  opportunityTitle: string;
  rationale: string;
  evidence: string;
}

export const DiscoveryMatchModal: React.FC<DiscoveryMatchModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  sessionTitle,
  opportunityTitle,
  rationale,
  evidence
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-slate-200 p-0 overflow-hidden shadow-2xl">
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600" />
        
        <div className="p-8 space-y-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-600/10 text-blue-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Intelligence Bridge</span>
            </div>
            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter">
              Discovery-to-<span className="text-blue-600">PRD</span> Bridge
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-lg font-medium">
              We've matched a high-intensity interview insight to an automation need.
            </DialogDescription>
          </DialogHeader>
 
          <div className="space-y-4">
            {/* Match Card */}
            <div className="rounded-2xl border bg-slate-50/50 border-slate-100 p-6 space-y-4 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Mic className="w-20 h-20 text-blue-600" />
               </div>
               
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">MOSI DISCOVERY</Badge>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight italic">Pre-filled from: {sessionTitle}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 italic">"{opportunityTitle}"</h4>
               </div>
 
               <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm relative">
                  <div className="absolute -top-2 -right-2">
                     <Badge className="bg-emerald-100 text-emerald-700 border-none text-[8px] font-black uppercase px-2 shadow-sm">Interview Evidence</Badge>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                     {evidence}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-emerald-600">
                     <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Verified Multi-Source Context</span>
                  </div>
               </div>
 
               <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-[1px] bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Maps To Platform Need</span>
                  <div className="flex-1 h-[1px] bg-slate-100" />
               </div>
 
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                     <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Drafting Strategy</p>
                     <p className="text-lg font-bold text-slate-900 tracking-tight">AI-Powered Visual Quality Inspection</p>
                  </div>
               </div>
            </div>
          </div>
 
          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-500 font-bold hover:bg-slate-50" onClick={onClose}>
              Cancel Review
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black group px-8 py-6 h-auto shadow-lg shadow-blue-500/20" onClick={onGenerate}>
              <div className="flex flex-col items-center">
                 <span className="flex items-center gap-2">GENERATE SMART PRD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                 <span className="text-[8px] opacity-80 font-bold uppercase tracking-widest mt-1">Context Injection Enabled</span>
              </div>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
