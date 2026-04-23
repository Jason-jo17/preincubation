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
  AlertCircle,
  Lightbulb,
  ArrowUpRight,
  Mic
} from 'lucide-react';
import { CEEDQuadrantAssessment } from '@/lib/types/ceed';

interface CEEDScoreCardProps {
  quadrant: 'core' | 'expansion' | 'efficiency' | 'disruption';
  assessment: CEEDQuadrantAssessment;
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

const CEEDScoreCard: React.FC<CEEDScoreCardProps> = ({ quadrant, assessment }) => {
  const config = quadrantConfig[quadrant];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white border-slate-200 shadow-sm backdrop-blur-sm overflow-hidden">
        <div className={`h-1.5 w-full bg-${config.color}-500/30`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${assessment.score}%` }}
            className={`h-full bg-${config.color}-500 shadow-[0_0_10px_rgba(var(--${config.color}-500),0.5)]`}
          />
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${config.color}-500/10`}>
                <Icon className={`w-5 h-5 text-${config.color}-400`} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">{config.title}</CardTitle>
                <p className="text-xs text-slate-500 font-medium">{config.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black text-${config.color}-400`}>{assessment.score}</span>
              <span className="text-xs text-slate-600 block uppercase font-bold tracking-tighter">Score</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Sub Scores */}
          <div className="space-y-2 mt-2">
            {Object.entries(assessment.sub_scores).map(([name, score]) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 capitalize">{name.replace(/_/g, ' ')}</span>
                  <span className="text-slate-900">{score}</span>
                </div>
                <Progress value={score} className="h-1 bg-slate-200" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Strengths/Evidence */}
            <div className="space-y-2">
               <h4 className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                 <CheckCircle2 className="w-3 h-3" /> Proof Points
               </h4>
               <ul className="space-y-1.5">
                  {assessment.evidence.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 line-clamp-1 flex items-start gap-1">
                       <span className="text-emerald-500 mt-0.5 opacity-50">•</span> {item}
                    </li>
                  ))}
               </ul>
            </div>

            {/* Gaps/Opportunities */}
            <div className="space-y-2">
               <h4 className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                 <Lightbulb className="w-3 h-3" /> Opportunities
               </h4>
               <ul className="space-y-1.5">
                  {assessment.opportunities.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 line-clamp-1 flex items-start gap-1">
                       <span className="text-amber-500 mt-0.5 opacity-50">→</span> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Discovery Insights */}
          {assessment.evidence.some(e => e.toLowerCase().includes('interview') || e.toLowerCase().includes('rajesh')) && (
             <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                   <Mic className="w-3.5 h-3.5 text-purple-600" />
                   <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Discovery Evidence</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-2">
                   <p className="text-[10px] text-slate-600 italic">"Our finishing line is currently our biggest headache... human error in visual inspection is costing us 4% in rejections."</p>
                   <div className="flex justify-between items-center mt-1">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Stakeholder: Rajesh Kumar</span>
                      <Badge variant="outline" className="h-4 px-1.5 bg-purple-100 border-purple-200 text-purple-600 text-[8px] font-black uppercase shadow-none">Confirmed</Badge>
                   </div>
                </div>
             </div>
          )}

          {/* Special Opportunity Badge */}
          {quadrant === 'efficiency' && assessment.automation_opportunities && (
             <div className="pt-2 border-t border-slate-800/50 flex justify-between items-center">
                <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-400 text-[10px] font-bold">
                  {assessment.automation_opportunities.length} Automation Potentials Found
                </Badge>
                <motion.div 
                   animate={{ x: [0, 5, 0] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                   <ArrowUpRight className="w-4 h-4 text-amber-400/50" />
                </motion.div>
             </div>
          )}
          
          {quadrant === 'disruption' && assessment.disruptive_opportunities && (
             <div className="pt-2 border-t border-slate-800/50 flex justify-between items-center">
                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[10px] font-bold">
                  {assessment.disruptive_opportunities.length} Disruptive Ideas Generated
                </Badge>
                <motion.div 
                   animate={{ x: [0, 5, 0] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                   <ArrowUpRight className="w-4 h-4 text-blue-400/50" />
                </motion.div>
             </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CEEDScoreCard;
