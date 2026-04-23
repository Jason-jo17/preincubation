"use client";

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  ArrowRight, 
  Plus,
  Target,
  LayoutGrid,
  List,
  Activity,
  History,
  Layers,
  SearchX
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AutomationNeedCard from '@/components/automation/automation-need-card';
import { DEMO_AUTOMATION_NEEDS } from '@/lib/demo-data/automation-needs';
import { motion, AnimatePresence } from 'framer-motion';
import { DiscoveryMatchModal } from '@/components/ceed/discovery-match-modal';
import InterestContextModal from '@/components/automation/interest-context-modal';
import { SectorAutomationNeed } from '@/lib/types/automation-needs';
import { PageContainer } from '@/components/shared/page-container';
import { ContentCard } from '@/components/shared/content-card';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';
import { getSectorThesis } from '@/lib/demo-data/sector-thesis';
import { SectorThesis } from '@/lib/types/sector-thesis';

export default function AutomationNeedsPage() {
  const router = useRouter();
  const [activeSector, setActiveSector] = useState('manufacturing-engineering-nagpur');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeed, setSelectedNeed] = useState<SectorAutomationNeed | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [needs, setNeeds] = useState<SectorAutomationNeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeThesis, setActiveThesis] = useState<SectorThesis | null>(null);

  const sectors = [
    { id: 'manufacturing-engineering-nagpur', name: 'Manufacturing (Nagpur)', count: 3 },
    { id: 'sector-mfg', name: 'General Mfg', count: 12 },
    { id: 'sector-bfsi', name: 'BFSI', count: 8 },
    { id: 'sector-health', name: 'Healthcare', count: 5 },
    { id: 'sector-agri', name: 'Agriculture', count: 9 },
    { id: 'sector-log', name: 'Logistics', count: 7 }
  ];

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await fetch('/api/automation-needs');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setNeeds(data.length > 0 ? data : DEMO_AUTOMATION_NEEDS);
      } catch (err) {
        setNeeds(DEMO_AUTOMATION_NEEDS);
      } finally {
        setLoading(false);
      }
    };
    fetchNeeds();
  }, []);

  useEffect(() => {
    setActiveThesis(getSectorThesis(activeSector));
  }, [activeSector]);

  const filteredNeeds = needs.filter(need => 
    (activeSector ? need.sector_id === activeSector : true) &&
    (searchQuery ? need.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <PageContainer
      title="Sector Automation Repository"
      description="Library of validated industry-specific automation opportunities identified through strategic research."
      actions={
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
             <Input 
                placeholder="Search repository..." 
                className="pl-9 h-9 text-xs bg-white border-slate-200 text-slate-900 shadow-sm rounded-lg" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 text-[11px] uppercase tracking-wider rounded-lg">
            <Plus className="w-3.5 h-3.5 mr-2" /> Add Research
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar Navigation */}
         <div className="space-y-6">
             <div className="space-y-3">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
                 <Layers className="h-3 w-3" /> Industry Sectors
               </h3>
               <nav className="space-y-1">
                  {sectors.map((s) => (
                     <button
                        key={s.id}
                        onClick={() => setActiveSector(s.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-xs border",
                          activeSector === s.id 
                            ? 'bg-blue-50/50 border-blue-200 text-blue-700 shadow-sm' 
                            : 'text-slate-500 hover:bg-slate-100/50 border-transparent'
                        )}
                     >
                        <span className="flex items-center gap-2">
                           {activeSector === s.id && <div className="w-1 h-1 rounded-full bg-blue-600" />}
                           {s.name}
                        </span>
                        <Badge variant="outline" className={cn(
                          "border-none px-2 h-5 rounded-md font-bold text-[9px] min-w-[20px] justify-center tracking-tight",
                          activeSector === s.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                        )}>
                           {s.count}
                        </Badge>
                     </button>
                  ))}
               </nav>
            </div>

            <ContentCard 
              title={activeThesis ? `${activeThesis.display_name} Thesis` : "Sector Intelligence"} 
              description={activeThesis ? "Investment Strategy Alignment" : "Alignment with market drivers"}
              className="mt-6 border-none shadow-sm bg-slate-50/50"
            >
              <div className="space-y-4">
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                  {activeThesis 
                    ? (activeThesis.investment_thesis.length > 180 ? activeThesis.investment_thesis.substring(0, 180) + '...' : activeThesis.investment_thesis)
                    : "These opportunities are synthesized from our strategic sector maps, prioritizing items that solve documented industrial friction."
                  }
                </p>
                <Button 
                  variant="link" 
                  className="text-blue-600 p-0 h-auto text-[10px] font-bold uppercase tracking-widest hover:no-underline hover:text-blue-800 flex items-center gap-2 group/btn"
                  onClick={() => router.push(`/portal/student/thesis${activeThesis ? `?id=${activeThesis.id}` : ''}`)}
                >
                   View Strategic Thesis <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1.5 transition-all" />
                </Button>
              </div>
            </ContentCard>

            <div className="p-5 bg-slate-900 rounded-2xl space-y-3 relative overflow-hidden group">
               <Activity className="absolute right-[-10px] bottom-[-10px] h-20 w-20 text-white/5 group-hover:scale-110 transition-transform duration-700" />
               <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] relative z-10">Real-time Pulse</h4>
               <div className="flex items-center gap-2 relative z-10">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[13px] font-bold text-white tracking-tight">1.4k Units Scanning</span>
               </div>
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed relative z-10">
                 Industrial corridor sensors are active. New opportunities are synthesized every 24 hours.
               </p>
            </div>
         </div>

         {/* Main Grid */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center bg-white p-3 px-5 rounded-xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-3">
                   <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{sectors.find(s => s.id === activeSector)?.name} Repository</h2>
                   <Separator orientation="vertical" className="h-4 bg-slate-200" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredNeeds.length} items</span>
                </div>
                <div className="flex items-center gap-3 border-l pl-3 border-slate-100">
                   <LayoutGrid className="w-4 h-4 text-blue-600 cursor-pointer" />
                   <List className="w-4 h-4 text-slate-300 hover:text-slate-400 cursor-pointer" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {loading ? (
                 <div className="col-span-full py-20 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                   Synthesizing Repository...
                 </div>
               ) : filteredNeeds.length > 0 ? (
                  filteredNeeds.map((need, idx) => (
                    <motion.div
                      key={need.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <AutomationNeedCard 
                         need={need} 
                         onInterest={(id) => {
                            setSelectedNeed(need);
                            setShowInterestModal(true);
                         }}
                      />
                    </motion.div>
                  ))
               ) : (
                  <div className="col-span-full">
                    <EmptyState 
                      icon={SearchX}
                      title="No needs identified yet"
                      description={`Our researchers are currently mapping the digital transformation landscape for the ${sectors.find(s => s.id === activeSector)?.name} sector.`}
                    />
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Discovery Match Modal */}
      {selectedNeed && selectedNeed.discovery_insight && (
        <DiscoveryMatchModal 
          isOpen={showMatchModal}
          onClose={() => setShowMatchModal(false)}
          onGenerate={() => {
            setShowMatchModal(false);
            window.location.href = `/portal/student/challenges/prd-${selectedNeed.id}`;
          }}
          sessionTitle="Discovery Session 001"
          opportunityTitle={selectedNeed.title}
          rationale={selectedNeed.discovery_insight.rationale}
          evidence={selectedNeed.discovery_insight.quote || selectedNeed.discovery_insight.rationale}
        />
      )}

      {/* Interest Context Modal */}
      <InterestContextModal 
         isOpen={showInterestModal}
         onClose={() => setShowInterestModal(false)}
         need={selectedNeed}
         onSuccess={() => setShowInterestModal(false)}
      />
    </PageContainer>
  );
}
