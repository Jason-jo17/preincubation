"use client";

import React, { useEffect } from "react";
import { useAssessmentStore } from "@/lib/store/assessment";
import { AssessmentHub } from "@/components/assessment/AssessmentHub";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function NewAssessmentPage() {
  const resetScores = useAssessmentStore((state) => state.resetScores);

  useEffect(() => {
    resetScores();
  }, [resetScores]);

  return (
    <div className="min-h-screen bg-bg-base pb-24">
      <div className="p-6 border-b border-border bg-bg-surface/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <Zap className="w-6 h-6 text-bg-base" />
            </div>
            <div>
              <h1 className="text-[11px] font-black uppercase tracking-widest text-text-muted">Diagnostic Node</h1>
              <p className="text-lg font-black tracking-tighter">NEW VENTURE ASSESSMENT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Assessment Mode</p>
              <p className="text-xs font-bold text-accent">INITIAL SCAN V1.0</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AssessmentHub />
      </motion.div>
    </div>
  );
}
