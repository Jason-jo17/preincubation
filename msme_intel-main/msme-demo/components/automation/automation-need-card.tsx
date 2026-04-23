"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  BarChart, 
  Code, 
  FileText,
  ArrowRight,
  Sparkles,
  Mic,
  Info,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SectorAutomationNeed } from '@/lib/types/automation-needs';
import { cn } from '@/lib/utils';

interface AutomationNeedCardProps {
  need: SectorAutomationNeed;
  onExplore?: (id: string) => void;
  onInterest?: (id: string) => void;
  showAction?: boolean;
}

const typeConfig = {
  process_automation: { color: 'blue', icon: Zap },
  predictive_analytics: { color: 'purple', icon: BarChart },
  computer_vision: { color: 'emerald', icon: Sparkles },
  nlp_automation: { color: 'amber', icon: FileText },
  iot_integration: { color: 'cyan', icon: Code },
  supply_chain_automation: { color: 'orange', icon: TrendingUp },
  customer_automation: { color: 'pink', icon: Sparkles },
  financial_automation: { color: 'indigo', icon: BarChart },
};

const AutomationNeedCard: React.FC<AutomationNeedCardProps> = ({ 
  need, 
  onExplore, 
  onInterest,
  showAction = true 
}) => {
  const config = typeConfig[need.automation_type as keyof typeof typeConfig] || typeConfig.process_automation;
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full bg-white border-slate-200/60 hover:border-blue-300 hover:shadow-md transition-all flex flex-col relative overflow-hidden group",
        need.discovery_insight && "ring-1 ring-blue-500/20 bg-blue-50/5 border-blue-200"
      )}>
        {need.discovery_insight && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-none text-[8px] font-bold tracking-widest flex items-center gap-1.5 px-2 py-0.5 shadow-sm uppercase">
              <Mic className="w-2.5 h-2.5" /> Discovery Match
            </Badge>
          </div>
        )}
        <CardHeader className="pb-3 pt-5">
           <div className="flex justify-between items-start mb-3">
              <div className={cn(
                "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                `bg-${config.color}-50/50 border-${config.color}-100 text-${config.color}-700`
              )}>
                 {need.automation_type.replace(/_/g, ' ')}
              </div>
              {!need.discovery_insight && (
                <div className="bg-slate-100/50 text-slate-500 border border-slate-200/50 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                   {need.ceed_quadrant}
                </div>
              )}
           </div>
           <CardTitle className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors pr-12 tracking-tight">
              {need.title}
           </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-2 flex-grow space-y-5">
           <p className="text-slate-500 text-[13px] line-clamp-3 leading-relaxed font-medium">
              {need.description}
           </p>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-blue-500" /> Est. ROI
                  </div>
                  <p className="text-sm font-semibold text-slate-900 tracking-tight">{need.estimated_roi_percentage}%</p>
              </div>
              <div className="space-y-1.5">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-500" /> TTV
                  </div>
                  <p className="text-sm font-semibold text-slate-900 tracking-tight">{need.time_to_value_weeks} Wks</p>
              </div>
              <div className="space-y-1.5">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-amber-500" /> Complexity
                  </div>
                  <p className="text-sm font-semibold text-slate-900 tracking-tight capitalize">{need.implementation_complexity}</p>
              </div>
              <div className="space-y-1.5">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-500" /> Impact
                  </div>
                  <p className="text-sm font-semibold text-slate-900 tracking-tight capitalize">{need.impact_level}</p>
              </div>
           </div>

           {need.discovery_insight && (
              <div className="mt-2 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50 space-y-2 group-hover:bg-blue-100/40 transition-colors">
                  <div className="flex items-start gap-2">
                    <Info className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-700/70 font-medium leading-relaxed italic">
                       {need.discovery_insight.quote ? `"${need.discovery_insight.quote}"` : need.discovery_insight.rationale}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-100/30">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                       <Mic className="w-2.5 h-2.5" /> Forensic Context
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{Math.round(need.discovery_insight.confidence * 100)}% Match</span>
                  </div>
              </div>
           )}
        </CardContent>

        {showAction && (
          <CardFooter className="pt-4 pb-5 px-5 gap-3 border-t border-slate-50 mt-auto bg-slate-50/30">
             <Button 
                variant="outline" 
                size="sm"
                className="flex-1 h-8 border-slate-200 hover:bg-white text-slate-600 font-bold text-[10px] uppercase tracking-wider gap-2 rounded-lg"
                onClick={() => onExplore?.(need.id)}
             >
                Research
             </Button>
             <Button 
                size="sm"
                className="flex-1 h-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider gap-2 rounded-lg"
                onClick={() => onInterest?.(need.id)}
             >
                Interested <ArrowRight className="w-3.5 h-3.5" />
             </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default AutomationNeedCard;
