"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Filter, 
  ArrowUpRight, 
  Activity, 
  Plus,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Mic,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from 'framer-motion';

import { CEEDQuadrantChart } from '@/components/ceed/CEEDQuadrantChart';
import { CEEDScoreCard } from '@/components/ceed/CEEDScoreCard';
import { ForensicInsightCard } from '@/components/ceed/ForensicInsightCard';
import { PageContainer } from '@/components/shared/PageContainer';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ContentCard } from '@/components/shared/ContentCard';
import { MOCK_CEED_ANALYSIS, INITIAL_MOSI_SESSIONS } from '@/data/ceed-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CEEDPage() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<'core' | 'expansion' | 'efficiency' | 'disruption'>('efficiency');
  const [feed, setFeed] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Transform data for ForensicInsightCard
    const transformed = INITIAL_MOSI_SESSIONS.map(s => ({
      ...s,
      type: s.type || 'discovery',
      title: s.summary ? (s.summary.length > 40 ? s.summary.substring(0, 40) + '...' : s.summary) : 'Discovery Session',
      description: s.summary,
      timestamp: s.date || 'Apr 07, 2026',
      intensity: s.intensity || 3,
      metadata: {
        company: s.metadata?.company || 'Aequs Ltd',
        sector: s.metadata?.sector || 'Aerospace',
      }
    }));
    setFeed(transformed);
  }, []);

  const startDiscoverySimulation = () => {
    setIsSimulating(true);
    setSimulationLog(["Initializing Discovery Session 882...", "Establishing secure link to MOSI Engine...", "Connecting to Aequs Limited SEZ Voice Hub..."]);
    setProgress(5);

    setTimeout(() => { setProgress(20); setSimulationLog(prev => [...prev, "Connected. Stakeholder: Vikram Singh (Operations)"]); }, 1500);
    setTimeout(() => { setProgress(45); setSimulationLog(prev => [...prev, "Transcription Stream Active...", "Vikram: 'The vertical integration isn't as smooth as it looks...'"]); }, 3000);
    setTimeout(() => { setProgress(70); setSimulationLog(prev => [...prev, "AI Synthesis: Pattern detected [Logistics Friction]", "Identifying Opportunity: [Automated RM Tracking]"]); }, 5000);
    setTimeout(() => { 
      setProgress(100); 
      setSimulationLog(prev => [...prev, "Session Captured Successfully.", "Updating CEED Matrix...", "MOSI Analysis Complete."]);
      setTimeout(() => setIsSimulating(false), 1500);
    }, 7000);
  };

  const quadrantTabs = [
    { id: 'core', label: 'Core Strength', icon: Shield, color: 'text-emerald-600' },
    { id: 'expansion', label: 'Expansion', icon: TrendingUp, color: 'text-purple-600' },
    { id: 'efficiency', label: 'Efficiency', icon: Zap, color: 'text-amber-600' },
    { id: 'disruption', label: 'Disruption', icon: Target, color: 'text-blue-600' }
  ] as const;

  return (
    <DashboardLayout>
    <PageContainer 
      title="CEED Intelligence Engine"
      description="Strategic performance analysis across four growth dimensions"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider border-slate-200">
            <Filter className="w-3.5 h-3.5 mr-2" /> Filter Sectors
          </Button>
          <Button 
            size="sm" 
            className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white"
            onClick={startDiscoverySimulation}
          >
            <Plus className="w-3.5 h-3.5 mr-2" /> New Analysis
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left Column: Visual Analysis */}
         <div className="lg:col-span-5 space-y-6">
            <CEEDQuadrantChart 
              core={MOCK_CEED_ANALYSIS.scores.core}
              expansion={MOCK_CEED_ANALYSIS.scores.expansion}
              efficiency={MOCK_CEED_ANALYSIS.scores.efficiency}
              disruption={MOCK_CEED_ANALYSIS.scores.disruption}
              companyName={MOCK_CEED_ANALYSIS.company_name}
            />

            <ContentCard 
                title="Automation Priority Result" 
                description="Synthesized competition readiness signal"
                className="border-l-4 border-l-emerald-500"
            >
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100"
                        >
                          <Activity className="w-2.5 h-2.5 text-emerald-600" />
                          <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-widest">Active Signal</span>
                        </motion.div>
                        <Badge className="bg-emerald-600 text-white font-bold px-3 py-0.5 text-[9px] uppercase tracking-wider">High Priority</Badge>
                      </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-tight">Ready for <span className="text-emerald-600">Process Transformation</span></h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Based on high <span className="font-bold text-slate-900 italic">Efficiency scores</span> and digital appetite, this company is a prime candidate for immediate BuildForX automation competitions.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated ROI</p>
                        <p className="text-sm font-bold text-emerald-600">35-45%</p>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Impact Level</p>
                        <p className="text-sm font-bold text-blue-600">TRANSFORMATIVE</p>
                     </div>
                  </div>

                  <Button className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider gap-2">
                     GENERATE ROADMAP <ArrowRight className="w-4 h-4" />
                  </Button>
               </div>
            </ContentCard>
         </div>

         {/* Right Column: Detailed Drilldowns */}
         <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-slate-100/50 border border-slate-200 rounded-xl">
               {quadrantTabs.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuadrant(q.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
                       selectedQuadrant === q.id 
                       ? `bg-white text-slate-900 shadow-sm border border-slate-200` 
                       : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <q.icon className={`h-3.5 w-3.5 ${selectedQuadrant === q.id ? q.color : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{q.label}</span>
                  </button>
               ))}
            </div>

            <AnimatePresence mode="wait">
               <motion.div
                 key={selectedQuadrant}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
               >
                 <CEEDScoreCard 
                   quadrant={selectedQuadrant}
                   assessment={MOCK_CEED_ANALYSIS.assessments[selectedQuadrant]}
                 />
               </motion.div>
            </AnimatePresence>
         </div>
      </div>

      {/* Discovery Insights Section */}
      <div className="space-y-6 pt-10 border-t border-slate-200 mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                  <div className="flex items-center gap-2">
                      <Mic className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intelligence Discovery Feed</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Forensic <span className="text-blue-600">Stakeholder Insights</span></h2>
                  <p className="text-slate-500 text-sm">Dialogue-synthesized opportunities mapped to CEED axes.</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feed.map(item => (
                <div key={item.id}>
                  <ForensicInsightCard insight={item} />
                </div>
              ))}
              
              <button 
                onClick={startDiscoverySimulation}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-500/50 transition-all group space-y-4 h-full min-h-[220px]"
              >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <Plus className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">Start Discovery Session</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Capture Intelligence</p>
                  </div>
              </button>
          </div>
      </div>

      {/* Modals */}
      <Dialog open={isSimulating} onOpenChange={setIsSimulating}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800 text-white rounded-2xl overflow-hidden p-0">
          <div className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-blue-400 text-lg font-bold">
                <div className="p-2 bg-blue-400/10 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                MOSI Intelligence Link
              </DialogTitle>
              <DialogDescription className="text-slate-400 font-medium">
                Capturing live stakeholder signals from SEZ Hub...
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Signal Processing</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-slate-800" />
              
              <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] space-y-1.5 h-[180px] overflow-y-auto border border-slate-800/50">
                {simulationLog.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-blue-500 font-bold">▶</span> 
                    <span className="leading-relaxed">{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
    </DashboardLayout>
  );
}
