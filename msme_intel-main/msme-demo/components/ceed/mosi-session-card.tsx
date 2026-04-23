"use client";

import React from 'react';
import { 
  Mic, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  Target,
  Zap,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MosiSession, MosiOpportunity } from '@/lib/types/mosi';
import { motion } from 'framer-motion';

interface MosiSessionCardProps {
  session: MosiSession & { opportunities: MosiOpportunity[] };
  onViewDetails?: (id: string) => void;
}

export default function MosiSessionCard({ session, onViewDetails }: MosiSessionCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getQuadrantColor = (tag: string) => {
    switch (tag) {
      case 'Core': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Efficiency': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Expansion': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Disrupt':
      case 'Disruption': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all overflow-hidden group">
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <Badge className="bg-blue-600 transition-none font-bold text-[10px] uppercase tracking-widest">
                  Intelligence Session
               </Badge>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {session.date}
               </span>
            </div>
            <CardTitle className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              {session.stakeholder_id.length > 20 ? 'Stakeholder Session' : `Session with ${session.stakeholder_id}`} 
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
            </CardTitle>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" /> {formatDuration(session.duration)}
             </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-slate-800 pl-3">
          "{session.summary || 'Strategic discovery session focused on operational bottlenecks and market expansion vectors.'}"
        </p>

        {session.opportunities && session.opportunities.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Opportunities Synthesized</h4>
            <div className="space-y-2">
              {session.opportunities.slice(0, 2).map((opp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${getQuadrantColor(opp.tag)}`}>
                       <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-white tracking-tight">{opp.title}</p>
                       <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{opp.tag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="text-right">
                        <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">Impact: HIGH</p>
                        <p className="text-[9px] font-black text-slate-700 uppercase tracking-tighter">Budget: {opp.budget_score}/4</p>
                     </div>
                  </div>
                </motion.div>
              ))}
              {session.opportunities.length > 2 && (
                <p className="text-[10px] text-slate-600 font-bold ml-1">+{session.opportunities.length - 2} more findings</p>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold h-9 text-xs"
            onClick={() => onViewDetails?.(session.id)}
          >
            REVIEW DISCOVERY
          </Button>
          <Button 
            variant="outline"
            className="border-slate-800 bg-slate-900 text-slate-400 hover:text-white h-9 px-3"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
