"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";
import { READINESS_FRAMEWORKS } from "@/data/readiness-frameworks";

interface DiagnosticScorecardProps {
  data: any; // The raw diagnostic data
}

export function DiagnosticScorecard({ data }: DiagnosticScorecardProps) {
  // Calculate parameter scores (average of question scores in that parameter)
  const paramResults = Object.keys(READINESS_FRAMEWORKS).map(pId => {
    const framework = READINESS_FRAMEWORKS[pId];
    const coreQs = framework.questions.core;
    const deepDiveQs = framework.questions.deepDive;
    
    const allQs = [...coreQs, ...deepDiveQs];
    const scores = allQs.map(q => data[q.scoreField] || 0);
    const avgScore = scores.reduce((a, b) => a + b, 0) / (allQs.length || 1);
    const percentage = (avgScore / 5) * 100;

    return {
      id: pId,
      name: framework.name,
      score: avgScore,
      percentage,
      weight: framework.weight,
      weightedScore: (avgScore / 5) * framework.weight
    };
  });

  // Calculate Overall Score
  const totalWeightedScore = paramResults.reduce((acc, curr) => acc + curr.weightedScore, 0);
  const finalPercentage = totalWeightedScore * 100;

  // P9 Bonus Logic (Simple mock logic for demonstration)
  const hasBonus = finalPercentage > 60; // Just an example trigger
  const displayScore = hasBonus ? Math.min(100, finalPercentage + 3) : finalPercentage;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-surface border border-border p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Trophy className="w-48 h-48 -mr-12 -mt-12 text-accent" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-accent">
              <Zap className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Venture Readiness Score</span>
            </div>
            
            <div className="flex items-end gap-4">
               <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none">
                 {displayScore.toFixed(1)}<span className="text-accent">%</span>
               </h1>
               {hasBonus && (
                 <div className="mb-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full flex items-center gap-1">
                   <ArrowUpRight className="w-3 h-3 text-success" />
                   <span className="text-[10px] font-black text-success uppercase">+3% BONUS</span>
                 </div>
               )}
            </div>
            
            <p className="text-text-secondary max-w-md font-medium text-sm leading-relaxed">
              Based on the 8-framework diagnostic engine, your venture shows <span className="text-text-primary font-bold">{getScoreLabel(displayScore)}</span> readiness for the next growth stage.
            </p>
          </div>
        </div>

        <div className="bg-bg-base border border-border p-8 rounded-[2.5rem] flex flex-col justify-between">
           <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Top Growth Area</span>
              <div className="space-y-1">
                 <h3 className="text-2xl font-black italic uppercase tracking-tight text-accent">
                   {paramResults.sort((a, b) => a.score - b.score)[0].name}
                 </h3>
                 <p className="text-xs text-text-muted font-medium">Critical bottleneck identified in this pillar.</p>
              </div>
           </div>
           
           <div className="pt-6 border-t border-border mt-6">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                 <span>Strategic Alignment</span>
                 <span className="text-accent">High</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "85%" }}
                   className="h-full bg-accent"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Parameter Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paramResults.map((param, idx) => (
          <motion.div
            key={param.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-bg-surface border border-border p-6 rounded-3xl hover:border-accent/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-bg-base border border-border flex items-center justify-center text-[10px] font-black text-text-muted group-hover:text-accent transition-colors">
                {param.id}
              </div>
              <div className="text-right">
                <span className="text-sm font-black italic">{param.percentage.toFixed(0)}%</span>
              </div>
            </div>
            
            <h4 className="text-xs font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">{param.name}</h4>
            
            <div className="space-y-3">
               <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${param.percentage}%` }}
                    className={`h-full ${param.percentage > 70 ? 'bg-success' : param.percentage > 40 ? 'bg-accent' : 'bg-destructive'}`}
                  />
               </div>
               <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em] text-text-muted">
                  <span>Weight: {(param.weight * 100).toFixed(0)}%</span>
                  <span>Contribution: {(param.weightedScore * 100).toFixed(1)}%</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getScoreLabel(score: number) {
  if (score >= 85) return "Exceptional";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Emerging";
  if (score >= 30) return "Nascent";
  return "High Risk";
}
