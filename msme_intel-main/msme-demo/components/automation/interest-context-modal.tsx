"use client";

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Target, 
  Settings, 
  ArrowRight,
  Info,
  Sparkles,
  Mic
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { SectorAutomationNeed } from '@/lib/types/automation-needs';

interface InterestContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  need: SectorAutomationNeed | null;
  onSuccess?: (context: any) => void;
}

export default function InterestContextModal({ 
  isOpen, 
  onClose, 
  need,
  onSuccess 
}: InterestContextModalProps) {
  const [painPoints, setPainPoints] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!need) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call to /api/interests
    try {
      const response = await fetch('/api/interests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          automation_need_id: need.id,
          company_id: 'ceed-1', // Default for demo
          current_pain_points: [painPoints],
          desired_outcomes: [outcomes],
          status: 'context_added'
        })
      });

      if (response.ok) {
        setIsDone(true);
        onSuccess?.({ painPoints, outcomes });
      }
    } catch (err) {
      console.error('Failed to save context:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800 p-12 text-center overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="space-y-6"
           >
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle2 className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic">Context Received.</h2>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                "Our AI Blueprint Engine is mapping your operational context to the BuildForX PRD Drafting queue. You'll be notified of the competition brief status."
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black h-12"
                onClick={onClose}
              >
                CLOSE BLUEPRINT
              </Button>
           </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-white border-slate-200 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-slate-50 border-b border-slate-100 relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
           <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-blue-600/10 text-blue-600 border-none px-3 font-black uppercase tracking-widest text-[10px]">
                 ENGINE CONFIGURATION
              </Badge>
              {need.discovery_insight && (
                 <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" /> Discovery Backed
                 </Badge>
              )}
           </div>
           <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter italic">
              Blueprint Context: <span className="text-blue-600 underline decoration-blue-600/20 underline-offset-4">{need.title}</span>
           </DialogTitle>
           <DialogDescription className="text-slate-500 font-medium text-lg pt-2 italic">
              Tailor this sector-wide automation need to your specific operational reality.
           </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto scroller-hide">
           {/* Section 1: Pain Points */}
           <section className="space-y-4">
              <div className="flex justify-between items-center">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> Specific Operational Friction
                 </h4>
                 {need.discovery_insight && (
                    <span className="text-[10px] font-bold text-slate-400 italic">Pre-filled from Interviews</span>
                 )}
              </div>
              <Textarea 
                 placeholder="Describe exactly where the current process fails (e.g., '14% latency in QC queue' or 'Manual data entry errors in SAP')..."
                 className="bg-slate-50 border-slate-200 text-slate-900 min-h-[120px] focus:border-blue-600 transition-all font-medium italic shadow-none"
                 value={painPoints}
                 onChange={(e) => setPainPoints(e.target.value)}
              />
              {need.discovery_insight?.quote && (
                 <div className="p-4 rounded-xl bg-blue-50 border-l-2 border-l-blue-600 text-[11px] text-slate-600 italic leading-relaxed">
                    "STAKEHOLDER QUOTE: {need.discovery_insight.quote}"
                 </div>
              )}
           </section>

           {/* Section 2: Desired Outcomes */}
           <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Target className="w-4 h-4 text-emerald-500" /> Strategic Success Targets
              </h4>
              <Textarea 
                 placeholder="What does success look like? (e.g., 'Eliminate manual OCR cleanup entirely' or 'Predict equipment failure 48hrs in advance')..."
                 className="bg-slate-50 border-slate-200 text-slate-900 min-h-[100px] focus:border-blue-600 transition-all font-medium italic shadow-none"
                 value={outcomes}
                 onChange={(e) => setOutcomes(e.target.value)}
              />
           </section>

           {/* Section 3: Technical Boundary Conditions */}
           <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Settings className="w-4 h-4 text-blue-600" /> Technical Constraints
              </h4>
              <div className="grid grid-cols-2 gap-3">
                 {['SAP Integration', 'Offline Edge Operation', 'Tally Connector', 'Custom ERP', 'Zero Cloud Policy'].map((stack) => (
                    <div key={stack} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition-all cursor-pointer group">
                       <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-blue-600 transition-all" />
                       <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{stack}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100">
           <div className="w-full flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 border-slate-200 text-slate-500 font-black h-12 uppercase hover:bg-white"
                onClick={onClose}
              >
                CANCEL BLUEPRINT
              </Button>
              <Button 
                className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black h-12 group uppercase tracking-widest shadow-lg shadow-blue-600/20"
                disabled={isSubmitting || (!painPoints && !outcomes)}
                onClick={handleSubmit}
              >
                 {isSubmitting ? 'MAPPING ENGINE...' : (
                    <>FINALIZE CONTEXT <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                 )}
              </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
