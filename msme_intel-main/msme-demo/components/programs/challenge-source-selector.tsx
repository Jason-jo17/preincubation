"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  Search, 
  ArrowRight,
  BrainCircuit,
  Binary,
  Rocket,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_COMPANIES_FOR_FILTERS as COMPANIES } from '@/lib/demo-data/companies';
import { MOSI_SESSIONS, MOSISession } from '@/lib/demo-data/mosi-sessions';
import { DEMO_AUTOMATION_NEEDS } from '@/lib/demo-data/automation-needs';

interface SourceSelectorProps {
  onSelect: (data: any) => void;
}

export default function ChallengeSourceSelector({ onSelect }: SourceSelectorProps) {
  const [sourceType, setSourceType] = useState<'company' | 'sector'>('company');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('');
  const [selectedNeedId, setSelectedNeedId] = useState<string>('');

  const filteredSessions = MOSI_SESSIONS.filter(s => s.companyId === selectedCompanyId);
  const filteredNeeds = DEMO_AUTOMATION_NEEDS.filter(n => n.sector_id === selectedSectorId);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setSelectedSessionId('');
  };

  const handleConfirm = () => {
    if (sourceType === 'company' && selectedSessionId) {
      const session = MOSI_SESSIONS.find(s => s.id === selectedSessionId);
      const company = COMPANIES.find(c => c.id === selectedCompanyId);
      if (session && company) {
         onSelect({
            title: session.title,
            company_name: company.name,
            sector: company.sector,
            problem_statement: session.problem_summary,
            discovery_context: session.summary,
            discovery_session: session, // Pass the full session object
            technical_requirements: session.tech_stack_recommended,
            budget: "₹10,00,000 - ₹15,00,000",
            source_id: session.id,
            source_type: 'mosi'
         });
      }
    } else if (sourceType === 'sector' && selectedNeedId) {
       const need = DEMO_AUTOMATION_NEEDS.find(n => n.id === selectedNeedId);
       if (need) {
          onSelect({
             title: need.title,
             sector: need.sector_id.replace('sector-', '').toUpperCase(),
             problem_statement: need.description,
             discovery_context: `Derived from ${need.sector_id} benchmark analysis.`,
             technical_requirements: need.tech_stack_suggested.primary,
             budget: need.estimated_roi_percentage > 40 ? "₹20,00,000+" : "₹10,00,000",
             source_id: need.id,
             source_type: 'sector_analysis'
          });
       }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Company-Led Option */}
         <Card 
            className={`cursor-pointer transition-all border-2 ${sourceType === 'company' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'}`}
            onClick={() => setSourceType('company')}
         >
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Building2 className={`w-6 h-6 ${sourceType === 'company' ? 'text-blue-600' : 'text-slate-400'}`} />
                  Company-Led Discovery
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-slate-600 text-sm">Create a challenge based on specific MOSI discovery evidence from a portfolio company.</p>
               {sourceType === 'company' && (
                  <div className="space-y-4 pt-4 animate-in fade-in duration-300">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Company</label>
                        <Select onValueChange={handleCompanySelect} value={selectedCompanyId}>
                           <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 shadow-sm">
                              <SelectValue placeholder="Choose Company..." />
                           </SelectTrigger>
                           <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-sm">
                              {COMPANIES.map((c: any) => (
                                 <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                     
                     {selectedCompanyId && (
                        <div className="space-y-2 pt-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Linked MOSI Evidence</label>
                           <Select onValueChange={setSelectedSessionId} value={selectedSessionId}>
                              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 shadow-sm">
                                 <SelectValue placeholder={filteredSessions.length > 0 ? "Choose Session..." : "No Sessions Found"} />
                              </SelectTrigger>
                               <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-sm">
                                 {filteredSessions.map(s => (
                                    <SelectItem key={s.id} value={s.id}>{s.title} ({s.date})</SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     )}
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Sector-Led Option */}
         <Card 
            className={`cursor-pointer transition-all border-2 ${sourceType === 'sector' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'}`}
            onClick={() => setSourceType('sector')}
         >
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-slate-900">
                  <BarChart3 className={`w-6 h-6 ${sourceType === 'sector' ? 'text-purple-600' : 'text-slate-400'}`} />
                  Sector-Led Intelligence
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-slate-600 text-sm">Scale industrial automation needs identified across entire sectors via IMF & MSME reports.</p>
               {sourceType === 'sector' && (
                  <div className="space-y-4 pt-4 animate-in fade-in duration-300">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Industrial Sector</label>
                        <Select onValueChange={setSelectedSectorId} value={selectedSectorId}>
                           <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 shadow-sm">
                              <SelectValue placeholder="Choose Sector..." />
                           </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-sm">
                              {['sector-mfg', 'sector-logistics', 'sector-healthcare', 'sector-bfsi'].map(id => (
                                 <SelectItem key={id} value={id}>{id.replace('sector-', '').toUpperCase()}</SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     {selectedSectorId && (
                        <div className="space-y-2 pt-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identified Automation Needs</label>
                           <Select onValueChange={setSelectedNeedId} value={selectedNeedId}>
                              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 shadow-sm">
                                 <SelectValue placeholder={filteredNeeds.length > 0 ? "Choose Target Need..." : "No Needs Found"} />
                              </SelectTrigger>
                               <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-sm">
                                 {filteredNeeds.map(n => (
                                    <SelectItem key={n.id} value={n.id}>{n.title}</SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     )}
                  </div>
               )}
            </CardContent>
         </Card>
      </div>

      <div className="flex justify-center pt-6">
         <Button 
            className={`h-14 px-12 text-lg font-black tracking-tighter italic transition-all ${
               (sourceType === 'company' && selectedSessionId) || (sourceType === 'sector' && selectedNeedId)
               ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
               : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            disabled={!((sourceType === 'company' && selectedSessionId) || (sourceType === 'sector' && selectedNeedId))}
            onClick={handleConfirm}
         >
            GENERATE CHALLENGE ARCHITECTURE <ArrowRight className="w-6 h-6 ml-3" />
         </Button>
      </div>
    </div>
  );
}
