"use client";

import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowRight, 
  FileText,
  MousePointer2,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DEMO_AUTOMATION_NEEDS } from '@/lib/demo-data/automation-needs';

interface SectorAutomationListProps {
  sectorId: string;
}

export function SectorAutomationList({ sectorId }: SectorAutomationListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Map sector_id from "port_and_logistics" / "manufacturing" to matching patterns in demo data
  // demo data uses "sector-mfg", "sector-logistics", etc.
  const mappedSectorId = sectorId.includes('manufacturing') ? 'sector-mfg' 
    : sectorId.includes('logistics') ? 'sector-logistics' 
    : sectorId.includes('bfsi') ? 'sector-bfsi' 
    : sectorId;

  const filtered = DEMO_AUTOMATION_NEEDS.filter(n => n.sector_id === mappedSectorId || sectorId === 'all');

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="space-y-1">
             <h3 className="text-xl font-black text-slate-900 italic tracking-tighter uppercase">Market <span className="text-amber-500">Automation</span> Needs</h3>
             <p className="text-slate-600 font-medium text-sm">Industrial gap repository for the {sectorId.replace('_', ' ')} sector.</p>
          </div>
          
          <div className="relative w-full md:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
                placeholder="Search gap repository..." 
                className="pl-9 bg-slate-50 border-slate-200 text-slate-900 text-xs font-bold" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? filtered.map((need: any, i) => {
             const isReady = need.status === 'published';
             return (
             <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
             >
                <Card className="bg-white border-slate-200 hover:border-amber-400/50 hover:shadow-md shadow-sm transition-all group overflow-hidden relative h-full flex flex-col">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Zap className="w-16 h-16 text-amber-500" />
                   </div>
                   <CardHeader className="pb-3 px-5 pt-5 relative z-10 flex-none">
                      <div className="flex justify-between items-start">
                         <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform shadow-sm flex-shrink-0">
                            <Layers className="w-5 h-5" />
                         </div>
                         <Badge variant="outline" className={`text-[8px] font-black uppercase shadow-none ml-2 text-right ${isReady ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                            {isReady ? 'MARKET READY' : 'IN RESEARCH'}
                         </Badge>
                      </div>
                      <div className="space-y-1 mt-4">
                         <CardTitle className="text-lg font-black text-slate-900 italic group-hover:text-amber-500 transition-colors uppercase tracking-tight line-clamp-2" title={need.title}>{need.title}</CardTitle>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{need.impact_level} Impact Priority</p>
                      </div>
                   </CardHeader>
                   <CardContent className="px-5 pb-5 relative z-10 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3" title={need.description}>
                         {need.description}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-6">
                         <div className="flex-1 space-y-1.5">
                            <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                               <span>ROI Potential</span>
                               <span>{need.estimated_roi_percentage}%</span>
                            </div>
                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                               <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(need.estimated_roi_percentage, 100)}%` }} />
                            </div>
                         </div>
                      </div>

                      <Button 
                         onClick={() => router.push(`/programs/challenges/create?need=${need.id}`)}
                         className="w-full mt-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-amber-600 font-black text-[10px] uppercase tracking-[0.2em] h-9 gap-2 shadow-sm group flex-shrink-0"
                      >
                         INITIATE BUILD CHALLENGE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </CardContent>
                </Card>
             </motion.div>
          )}) : (
             <div className="col-span-full py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                 <p className="text-slate-500 font-bold italic">No automation needs linked to this sector yet.</p>
             </div>
          )}
       </div>
    </div>
  );
}
