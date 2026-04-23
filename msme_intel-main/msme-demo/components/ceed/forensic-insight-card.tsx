"use client";

import React from 'react';
import { 
  Mic, 
  Target, 
  Rocket, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  Layout,
  User,
  Activity
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ForensicInsightProps {
  insight: {
    id: string;
    type: 'discovery' | 'context' | 'build';
    title: string;
    description: string;
    timestamp: string;
    intensity: number;
    metadata: any;
  };
}

export default function ForensicInsightCard({ insight }: ForensicInsightProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'discovery': return {
        icon: <Mic className="w-3.5 h-3.5" />,
        label: "Discovery",
        color: "text-purple-600 bg-purple-50 border-purple-100",
        accent: "bg-purple-600"
      };
      case 'context': return {
        icon: <Target className="w-3.5 h-3.5" />,
        label: "Strategy",
        color: "text-blue-600 bg-blue-50 border-blue-100",
        accent: "bg-blue-600"
      };
      case 'build': return {
        icon: <Rocket className="w-3.5 h-3.5" />,
        label: "BuildForX",
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        accent: "bg-emerald-600"
      };
      default: return {
        icon: <Sparkles className="w-3.5 h-3.5" />,
        label: "Intelligence",
        color: "text-slate-600 bg-slate-50 border-slate-100",
        accent: "bg-slate-600"
      };
    }
  };

  const style = getTypeStyles(insight.type || 'discovery');
  
  const company = insight.metadata?.company || 'MSME Unit';
  const sector = insight.metadata?.sector || 'Industrial Core';
  const stakeholder = insight.metadata?.stakeholder || 'Main Stakeholder';

  let displayDate = insight.timestamp || (insight as any).date || 'Just now';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="bg-white border-slate-200/60 hover:border-blue-400 hover:shadow-md transition-all duration-300 overflow-hidden group h-full flex flex-col">
        <CardHeader className="pb-4 px-5 pt-5 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={cn("px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider", style.color)}>
              <span className="flex items-center gap-1">
                {style.icon}
                {style.label}
              </span>
            </Badge>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-tight bg-slate-50 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3" /> {displayDate}
            </div>
          </div>
          
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
              {insight.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                <Layout className="w-2.5 h-2.5 text-blue-500" /> {company}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                <Activity className="w-2.5 h-2.5 text-purple-500" /> {sector}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 flex-1 flex flex-col justify-between">
          <div className="relative pl-4 border-l-2 border-slate-100 group-hover:border-blue-200 transition-colors">
            <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
              {insight.description || 'Forensic signal captured. Pending deep synthesis.'}
            </p>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex justify-between items-center">
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                   <div 
                      key={i} 
                      className={cn(
                        "w-1.5 h-3.5 rounded-full transition-all",
                        i < insight.intensity ? style.accent : 'bg-slate-100'
                      )} 
                   />
                ))}
             </div>
             <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 hover:bg-blue-50 gap-1.5">
                Detailed Analysis <ArrowUpRight className="w-3.5 h-3.5" />
             </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
