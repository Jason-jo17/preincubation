"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb,
  ArrowUpRight,
  Mic
} from 'lucide-react';

interface CEEDScoreCardProps {
  quadrant: 'core' | 'expansion' | 'efficiency' | 'disruption';
  assessment: any;
}

const quadrantConfig = {
  core: {
    title: 'Core Strength',
    icon: Shield,
    color: 'emerald',
    description: 'Existing business stability and market position.'
  },
  expansion: {
    title: 'Expansion Potential',
    icon: TrendingUp,
    color: 'purple',
    description: 'Growth readiness and market diversification.'
  },
  efficiency: {
    title: 'Efficiency Opportunity',
    icon: Zap,
    color: 'amber',
    description: 'Operational automation and cost optimization.'
  },
  disruption: {
    title: 'Disruption Capability',
    icon: Target,
    color: 'blue',
    description: 'Innovation maturity and differentiation scope.'
  }
};

export const CEEDScoreCard: React.FC<CEEDScoreCardProps> = ({ quadrant, assessment }) => {
  const config = quadrantConfig[quadrant];
  const Icon = config.icon;

  if (!assessment) return null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white border-slate-200 shadow-sm backdrop-blur-sm overflow-hidden">
        <div className={`h-1.5 w-full bg-slate-100`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${assessment.score}%` }}
            className={`h-full bg-blue-600 shadow-sm`}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-blue-50`}>
                <Icon className={`w-5 h-5 text-blue-600`} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">{config.title}</CardTitle>
                <p className="text-xs text-slate-500 font-medium">{config.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black text-slate-900`}>{assessment.score}</span>
              <span className="text-xs text-slate-600 block uppercase font-bold tracking-tighter">Score</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2 mt-2">
            {Object.entries(assessment.sub_scores || {}).map(([name, score]: [string, any]) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-600 capitalize">{name.replace(/_/g, ' ')}</span>
                  <span className="text-slate-900">{score}</span>
                </div>
                <Progress value={score} className="h-1 bg-slate-100" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
               <h4 className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                 <CheckCircle2 className="w-3 h-3" /> Proof Points
               </h4>
               <ul className="space-y-1.5">
                  {(assessment.evidence || []).slice(0, 3).map((item: string, i: number) => (
                    <li key={i} className="text-[11px] text-slate-600 line-clamp-2 px-2 border-l border-emerald-200">
                       {item}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="space-y-2">
               <h4 className="flex items-center gap-1.5 text-[9px] font-bold text-amber-600 uppercase tracking-widest">
                 <Lightbulb className="w-3 h-3" /> Opportunities
               </h4>
               <ul className="space-y-1.5">
                  {(assessment.opportunities || []).slice(0, 3).map((item: string, i: number) => (
                    <li key={i} className="text-[11px] text-slate-600 line-clamp-2 px-2 border-l border-amber-200">
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {quadrant === 'efficiency' && assessment.automation_opportunities && (
             <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <Badge variant="outline" className="bg-amber-50 border-amber-100 text-amber-700 text-[10px] font-bold">
                  {assessment.automation_opportunities.length} Automation Potentials Found
                </Badge>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
             </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
