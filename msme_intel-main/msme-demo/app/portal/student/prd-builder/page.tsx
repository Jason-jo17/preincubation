"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Building2, 
  Mic, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Target,
  Search,
  Loader2,
  Rocket,
  Globe,
  Database,
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PROGRAMS } from '@/lib/demo-data/programs';

const STEPS = [
  { id: 'company', title: 'Target Entry', icon: Target },
  { id: 'interview', title: 'Discovery Intel', icon: Mic },
  { id: 'need', title: 'Automation Need', icon: Zap },
  { id: 'alignment', title: 'Program Alignment', icon: Rocket },
  { id: 'synthesis', title: 'Synthesis', icon: Sparkles }
];

const SECTORS = [
  { id: 'aerospace', name: 'Aerospace & Defense', icon: Rocket, description: 'Precision machining, composite bonding, and avionics.' },
  { id: 'manufacturing', name: 'Industrial Mfg', icon: Building2, description: 'Die-casting, textile automation, and heavy machinery.' },
  { id: 'electronics', name: 'Electronics (ESDM)', icon: Database, description: 'PCB assembly, cleanroom robotics, and SMT lines.' },
  { id: 'agritech', name: 'Smart Agriculture', icon: Globe, description: 'Edge IoT, soil analysis, and supply chain sync.' }
];

export default function PRDBuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <PRDBuilderContent />
    </Suspense>
  );
}

function PRDBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionIdParam = searchParams.get('session_id');
  const companyIdParam = searchParams.get('company_id');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // Data State
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectionMode, setSelectionMode] = useState<'company' | 'sector'>('company');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [needs, setNeeds] = useState<any[]>([]);
  const [selectedNeed, setSelectedNeed] = useState<any>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Need State
  const [isCustomNeedOpen, setIsCustomNeedOpen] = useState(false);
  const [customNeedEntry, setCustomNeedEntry] = useState({ title: '', description: '', automation_type: 'Software Automation' });
  
  // Custom Interview State
  const [isCustomInterviewOpen, setIsCustomInterviewOpen] = useState(false);
  const [customInterviewEntry, setCustomInterviewEntry] = useState({ title: '', summary: '', participants: '' });

  // Fetch initial companies
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/companies/');
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Handle URL Pre-selection
  useEffect(() => {
    if (companies.length > 0 && sessionIdParam && !selectedCompany) {
      const company = companies.find((c: any) => c.id === companyIdParam);
      if (company) {
         setSelectedCompany(company);
         setSelectionMode('company');
         setCurrentStep(1); // Step 1: Industry/Company selected
      }
    }
  }, [companies, sessionIdParam, companyIdParam, selectedCompany]);

  // Update selection when mode changes
  useEffect(() => {
    if (selectionMode === 'company') {
      setSelectedSector(null);
    } else {
      setSelectedCompany(null);
    }
    // Only reset if we don't have a param pushing us
    if (!sessionIdParam) {
      setSelectedInterview(null);
      setSelectedNeed(null);
    }
  }, [selectionMode, sessionIdParam]);

  // Fetch interviews when selection changes OR when entering Step 1
  useEffect(() => {
    const fetchInterviews = async () => {
      // Use the appropriate ID based on selection mode
      const id = selectionMode === 'company' ? selectedCompany?.id : selectedSector?.id;
      
      // If we have an ID, we MUST fetch
      if (id) {
        setInterviewsLoading(true);
        console.log(`[PRDBuilder] Syncing discovery logs for ${selectionMode}: ${id}`);
        
        try {
          const url = (selectionMode === 'company')
            ? `/api/mosi/feed/${id}` 
            : `/api/mosi/feed/sector/${id}`;
            
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          // Log results for debugging
          console.log(`[PRDBuilder] API returned ${Array.isArray(data) ? data.length : 0} sessions`);
          
          const filtered = Array.isArray(data) ? data.filter((f: any) => f.type === 'discovery') : [];
          setInterviews(filtered);
          
          // If we have a sessionIdParam, and it's in the filtered list, pre-select it
          if (sessionIdParam && !selectedInterview) {
            const session = filtered.find((s: any) => s.id === sessionIdParam);
            if (session) {
              setSelectedInterview(session);
              // Only auto-advance if we just landed here from a push-to-build
              if (currentStep === 1) {
                 setTimeout(() => setCurrentStep(2), 500);
              }
            }
          }
        } catch (err) {
          console.error("Failed to fetch interviews:", err);
          setInterviews([]);
        } finally {
          setInterviewsLoading(false);
        }
      }
    };
    fetchInterviews();
  }, [selectedCompany, selectedSector, selectionMode, sessionIdParam, currentStep, selectedInterview]);

  // Fetch needs when interview selection changes
  useEffect(() => {
    if (selectedInterview) {
      const fetchNeeds = async () => {
        try {
          const sector_id = selectedCompany ? (selectedCompany.primary_sector_id || selectedCompany.sector) : selectedSector.id;
          if (!sector_id) return;
          
          console.log(`[PRDBuilder] Fetching needs for sector: ${sector_id}`);
          const response = await fetch(`/api/automation/sectors/${sector_id}/needs`);
          const data = await response.json();
          setNeeds(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to fetch needs:", err);
          setNeeds([]);
        }
      };
      fetchNeeds();
    }
  }, [selectedInterview, selectedCompany, selectedSector]);

  const handleGenerate = async () => {
    if ((selectionMode === 'company' && !selectedCompany) || (selectionMode === 'sector' && !selectedSector) || !selectedNeed) return;
    
    setGenerating(true);
    try {
      const companyId = selectedCompany?.id || `sector-${selectedSector.id}`;
      // 1. Express interest to get interest_id
      const interestResponse = await fetch(`/api/automation/needs/${selectedNeed.id}/interest?company_id=${companyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          program_id: selectedProgram?.id,
          selection_mode: selectionMode
        })
      });
      const interest = await interestResponse.json();
      
      // 2. Generate PRD
      const sessionParam = selectedInterview ? `&mosi_session_id=${selectedInterview.id}` : '';
      const customParams = selectedNeed?.is_custom ? `&custom_title=${encodeURIComponent(selectedNeed.title)}&custom_desc=${encodeURIComponent(selectedNeed.description)}` : '';
      const prdResponse = await fetch(`/api/prd/generate/${selectedNeed?.is_custom ? 'custom' : interest.id}?selection_mode=${selectionMode}${sessionParam}${customParams}`, {
        method: 'POST'
      });
      const prd = await prdResponse.json();
      
      // 3. Success! Redirect to the challenge page
      router.push(`/portal/student/challenges/${prd.slug}`);
    } catch (err) {
      console.error("Generation failed:", err);
      // In demo mode, we might want to simulate a redirect even if the API fails
      if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
         setTimeout(() => router.push('/portal/student/challenges'), 1500);
      } else {
         alert("Intelligence synthesis failed. Please check the engine connection.");
         setGenerating(false);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen bg-slate-50/50">
      <Breadcrumbs items={[{ label: "Programs & Challenges", href: "/portal/student/challenges" }, { label: "PRD Builder" }]} />
      
      {/* Header */}
      <div className="flex justify-between items-end gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <Badge className="bg-blue-600 font-black text-[10px] px-3 uppercase tracking-widest text-white shadow-md shadow-blue-500/20">
                Intelligence Synthesis
             </Badge>
             <span className="text-slate-400 font-bold text-xs italic">• MSME Discovery to Challenge</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
             Build For <span className="text-blue-600 italic underline decoration-blue-500/30 underline-offset-8">Industry</span> Challenges.
          </h1>
          <div className="flex items-center gap-4 pt-2">
            <p className="text-slate-500 max-w-xl text-lg font-medium">
               Transform specialized industry discovery into actionable engineering challenges.
            </p>
            <Button variant="link" onClick={() => router.push('/portal/student/challenges')} className="text-blue-600 font-black uppercase text-xs tracking-widest p-0 h-auto">
               Explore Open Challenges <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Wizard */}
      <div className="max-w-4xl mx-auto w-full mb-12">
        <div className="flex justify-between items-center relative px-2">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10" />
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                  idx <= currentStep 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/40 ring-4 ring-blue-50' 
                  : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <step.icon className={`w-5 h-5 ${idx <= currentStep ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-blue-600' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Builder Content */}
      <div className="max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3 lowercase">
                   01. Define Entry Point <Target className="w-6 h-6 text-blue-600" />
                </h2>
                
                <Tabs value={selectionMode} onValueChange={(v: any) => setSelectionMode(v)} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 h-12 rounded-2xl">
                    <TabsTrigger value="company" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Specific MSME</TabsTrigger>
                    <TabsTrigger value="sector" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Sector Thesis</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Tabs value={selectionMode} className="w-full">
                <TabsContent value="company" className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input placeholder="Search Companies..." className="pl-9 h-12 rounded-xl text-sm border-slate-200" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <Select onValueChange={(val) => setSelectedCompany(companies.find(c => c.id === val))}>
                      <SelectTrigger className="w-full md:w-[250px] h-12 rounded-xl border-slate-200 font-bold text-slate-900">
                        <SelectValue placeholder="Quick Selection Dropdown" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {companies.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((company) => (
                      <Card 
                        key={company.id}
                        className={`cursor-pointer transition-all border-2 group hover:shadow-md rounded-3xl ${
                          selectedCompany?.id === company.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'
                        }`}
                        onClick={() => setSelectedCompany(company)}
                      >
                        <CardContent className="p-5 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl ${selectedCompany?.id === company.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                                 <Building2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-lg tracking-tight">{company.name}</p>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{company.sectors?.name || 'Industrial Core'}</p>
                              </div>
                           </div>
                           {selectedCompany?.id === company.id && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sector" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SECTORS.map((sector) => (
                      <Card 
                        key={sector.id}
                        className={`cursor-pointer transition-all border-2 group hover:shadow-md rounded-3xl p-2 ${
                          selectedSector?.id === sector.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'
                        }`}
                        onClick={() => setSelectedSector(sector)}
                      >
                        <CardHeader className="pb-2">
                           <div className="flex items-center justify-between">
                              <div className={`p-3 rounded-2xl ${selectedSector?.id === sector.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                                 <sector.icon className="w-5 h-5" />
                              </div>
                              {selectedSector?.id === sector.id && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                           </div>
                        </CardHeader>
                        <CardContent>
                           <p className="font-extrabold text-slate-900 text-lg tracking-tight mb-1">{sector.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">{sector.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end pt-8">
                 <Button disabled={!selectedCompany && !selectedSector} onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 font-bold px-10 h-14 rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[11px]">
                    Discovery Logs <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3 lowercase">
                      02. Select Discovery Interview <Mic className="w-6 h-6 text-blue-600" />
                   </h2>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Syncing human intelligence from MOSI sessions</p>
                </div>
                <Button 
                   variant="outline" 
                   onClick={() => setIsCustomInterviewOpen(true)}
                   className="border-blue-200 text-blue-600 font-black text-[10px] tracking-widest uppercase hover:bg-blue-50 h-10 rounded-xl"
                >
                   <Plus className="w-3 h-3 mr-2" /> Record Manual Log
                </Button>
              </div>
              
              <div className="space-y-3">
                {interviewsLoading ? (
                   <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Discovery Logs...</p>
                   </div>
                ) : (interviews.length > 0 || selectedInterview?.is_custom) ? (
                  <>
                    {interviews.map((session: any) => (
                      <Card 
                        key={session.id}
                        className={`cursor-pointer transition-all border-2 group hover:shadow-md ${
                          selectedInterview?.id === session.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'
                        }`}
                        onClick={() => setSelectedInterview(session)}
                      >
                        <CardContent className="p-5 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${selectedInterview?.id === session.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                                 <Mic className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-lg tracking-tight">{session.title}</p>
                                 <p className="text-xs font-bold text-slate-400 leading-relaxed italic">{session.description || session.summary}</p>
                              </div>
                           </div>
                           {selectedInterview?.id === session.id && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                        </CardContent>
                      </Card>
                    ))}
                    {selectedInterview?.is_custom && (
                       <Card 
                        className="border-blue-600 bg-blue-50/30 cursor-pointer shadow-md"
                        onClick={() => setSelectedInterview(selectedInterview)}
                      >
                        <CardContent className="p-5 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-blue-600 text-white">
                                 <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <p className="font-extrabold text-slate-900 text-lg tracking-tight">{selectedInterview.title}</p>
                                    <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest">MANUAL LOG</Badge>
                                 </div>
                                 <p className="text-xs font-bold text-slate-400 leading-relaxed italic">{selectedInterview.summary}</p>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50 rounded-[2rem]">
                     <Mic className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                     <h3 className="text-xl font-black text-slate-900 tracking-tight italic uppercase mb-2">No Active Logs Found</h3>
                     <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto mb-8 italic">
                        No official MOSI discovery logs found for this unit. Record a manual log or sync with external sources.
                     </p>
                     <Button 
                        size="lg"
                        onClick={() => setIsCustomInterviewOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[11px]"
                     >
                        <Plus className="w-4 h-4 mr-2" /> Create Manual Log
                     </Button>
                  </Card>
                )}
              </div>
              
              <div className="flex justify-between pt-8">
                 <Button variant="ghost" onClick={prevStep} className="font-black text-slate-400 uppercase tracking-widest text-xs h-12 hover:bg-transparent hover:text-slate-900">
                    <ChevronLeft className="w-5 h-5 mr-2" /> Company Registry
                 </Button>
                 <Button onClick={nextStep} disabled={!selectedInterview} className="bg-blue-600 hover:bg-blue-700 font-bold px-8 h-12 shadow-lg shadow-blue-500/20 uppercase tracking-widest text-xs">
                    Automation Need <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3 lowercase">
                      03. Map Automation Need <Zap className="w-6 h-6 text-blue-600" />
                   </h2>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Pick from catalog or propose a custom one</p>
                </div>
                <Button 
                   variant="outline" 
                   onClick={() => setIsCustomNeedOpen(true)}
                   className="border-blue-200 text-blue-600 font-black text-[10px] tracking-widest uppercase hover:bg-blue-50 h-10 rounded-xl"
                >
                   <Plus className="w-3 h-3 mr-2" /> Manual Entry
                </Button>
              </div>
              
              {needs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {needs.map((need) => (
                    <Card 
                      key={need.id}
                      className={`cursor-pointer transition-all border-2 group hover:shadow-md h-full ${
                        selectedNeed?.id === need.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'
                      }`}
                      onClick={() => setSelectedNeed(need)}
                    >
                      <CardContent className="p-5 space-y-3">
                         <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-lg ${selectedNeed?.id === need.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                               <Target className="w-4 h-4" />
                            </div>
                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{need.automation_type}</Badge>
                         </div>
                         <div>
                            <p className="font-extrabold text-slate-900 text-base leading-tight mb-1">{need.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic line-clamp-2">{need.description}</p>
                         </div>
                      </CardContent>
                    </Card>
                  ))}
                  {/* Selected Custom Need Card if exists */}
                  {selectedNeed?.is_custom && (
                    <Card 
                      className="border-blue-600 bg-blue-50/30 cursor-pointer shadow-md"
                      onClick={() => setSelectedNeed(selectedNeed)}
                    >
                       <CardContent className="p-5 space-y-3">
                         <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-blue-600 text-white">
                               <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest">CUSTOM ENTRY</Badge>
                         </div>
                         <div>
                            <p className="font-extrabold text-slate-900 text-base leading-tight mb-1">{selectedNeed.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic line-clamp-2">{selectedNeed.description}</p>
                         </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50 rounded-[2rem]">
                   <Zap className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                   <h3 className="text-xl font-black text-slate-900 tracking-tight italic uppercase mb-2">No Preset Needs Found</h3>
                   <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto mb-8 italic">
                      We couldn't find matching automation needs for this sector in the catalog. Propose a custom one to continue.
                   </p>
                   <Button 
                      size="lg"
                      onClick={() => setIsCustomNeedOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[11px]"
                   >
                      <Plus className="w-4 h-4 mr-2" /> Define New Need
                   </Button>
                </Card>
              )}
              
              <div className="flex justify-between pt-8">
                 <Button variant="ghost" onClick={prevStep} className="font-black text-slate-400 uppercase tracking-widest text-xs h-12 hover:bg-transparent hover:text-slate-900">
                    <ChevronLeft className="w-5 h-5 mr-2" /> Intel Logs
                 </Button>
                 <Button onClick={nextStep} disabled={!selectedNeed} className="bg-blue-600 hover:bg-blue-700 font-bold px-8 h-12 shadow-lg shadow-blue-500/20 uppercase tracking-widest text-xs">
                    Synthesis Preview <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
                 04. Target Alignment <Rocket className="w-6 h-6 text-blue-600" />
              </h2>
              
              <p className="text-slate-500 font-medium italic mb-6">
                Link this challenge to an active program for funding, mentorship, or pre-incubation support.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {PROGRAMS.map((prog) => (
                  <Card 
                    key={prog.id}
                    className={`cursor-pointer transition-all border-2 group hover:shadow-md ${
                      selectedProgram?.id === prog.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'
                    }`}
                    onClick={() => setSelectedProgram(prog)}
                  >
                    <CardContent className="p-5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${selectedProgram?.id === prog.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                             <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <p className="font-extrabold text-slate-900 text-lg tracking-tight">{prog.name}</p>
                                <Badge className="text-[9px] font-black uppercase tracking-widest">{prog.type}</Badge>
                             </div>
                             <p className="text-xs font-bold text-slate-400 leading-relaxed italic">{prog.description}</p>
                          </div>
                       </div>
                       {selectedProgram?.id === prog.id && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-between pt-8">
                 <Button variant="ghost" onClick={prevStep} className="font-black text-slate-400 uppercase tracking-widest text-xs h-12 hover:bg-transparent hover:text-slate-900">
                    <ChevronLeft className="w-5 h-5 mr-2" /> Automation Need
                 </Button>
                 <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 font-bold px-8 h-12 shadow-lg shadow-blue-500/20 uppercase tracking-widest text-xs">
                    Synthesis Preview <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div 
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                 <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-600">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                 </div>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Ready for Synthesis</h2>
                 <p className="text-slate-500 font-medium italic uppercase text-xs tracking-widest">
                    Engineering intelligence mapping complete
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-white border-2 p-6 rounded-[2rem] shadow-sm text-center space-y-3 relative overflow-hidden group border-slate-100">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       {selectionMode === 'company' ? <Building2 className="w-12 h-12 text-blue-600" /> : <Target className="w-12 h-12 text-blue-600" />}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectionMode === 'company' ? 'MSME Unit' : 'Sector'}</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{selectedCompany?.name || selectedSector?.name}</p>
                 </div>
                 <div className="bg-white border-2 p-6 rounded-[2rem] shadow-sm text-center space-y-3 relative overflow-hidden group border-slate-100">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Mic className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Discovery</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{selectedInterview?.title || 'Operational Log'}</p>
                 </div>
                 <div className="bg-white border-2 p-6 rounded-[2rem] shadow-sm text-center space-y-3 relative overflow-hidden group border-slate-100">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Zap className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Automation Need</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{selectedNeed?.title}</p>
                 </div>
                 <div className="bg-white border-2 p-6 rounded-[2rem] shadow-sm text-center space-y-3 relative overflow-hidden group border-slate-100">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Rocket className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aligned Program</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{selectedProgram?.name || 'General Build'}</p>
                 </div>
              </div>

              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                 <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black h-16 text-lg shadow-xl shadow-blue-500/30 group uppercase tracking-widest rounded-3xl"
                    onClick={handleGenerate}
                    disabled={generating}
                 >
                    {generating ? (
                      <div className="flex items-center gap-3">
                         <Loader2 className="w-6 h-6 animate-spin" /> SYNTHESIZING...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                         GENERATE CHALLENGE <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                 </Button>
                 <Button variant="ghost" className="font-bold text-slate-400" onClick={prevStep} disabled={generating}>
                    REVISE MAPPINGS
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search/Filter Helpers (Optional Sidebar if needed) */}
      {/* Custom Need Dialog */}
      <Dialog open={isCustomNeedOpen} onOpenChange={setIsCustomNeedOpen}>
          <DialogContent className="sm:max-w-[550px] bg-slate-950 text-white border-slate-800 rounded-3xl p-8">
              <DialogHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                     <Zap className="w-10 h-10" />
                  </div>
                  <div>
                     <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase italic">Define <span className="text-blue-600">Automation Need</span></DialogTitle>
                     <DialogDescription className="text-slate-400 font-medium italic mt-1">
                        Manually define an industry gap that requires an engineering solution.
                     </DialogDescription>
                  </div>
              </DialogHeader>
              <div className="grid gap-6 py-8">
                  <div className="space-y-2">
                      <Label htmlFor="need-title" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Problem Title</Label>
                      <Input 
                        id="need-title" 
                        placeholder="e.g. Automated Surface Defect Recognition" 
                        className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-bold h-12 rounded-xl"
                        value={customNeedEntry.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomNeedEntry({...customNeedEntry, title: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="need-desc" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Technical Description</Label>
                      <Textarea 
                         id="need-desc" 
                         placeholder="Describe the operational inefficiency or engineering requirement..." 
                         className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-medium min-h-[120px] rounded-xl leading-relaxed italic" 
                         value={customNeedEntry.description}
                         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomNeedEntry({...customNeedEntry, description: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Automation Category</Label>
                      <Select 
                        value={customNeedEntry.automation_type} 
                        onValueChange={v => setCustomNeedEntry({...customNeedEntry, automation_type: v})}
                      >
                         <SelectTrigger className="bg-slate-900 border-slate-800 text-white rounded-xl h-12">
                            <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="bg-slate-900 border-slate-800 text-white">
                            <SelectItem value="Software Automation">Software Automation</SelectItem>
                            <SelectItem value="Hardware/Robotics">Hardware/Robotics</SelectItem>
                            <SelectItem value="Process Optimization">Process Optimization</SelectItem>
                            <SelectItem value="Cyber-Physical Systems">Cyber-Physical Systems</SelectItem>
                         </SelectContent>
                      </Select>
                  </div>
              </div>
              <DialogFooter className="pt-4">
                  <Button 
                      variant="ghost" 
                      onClick={() => setIsCustomNeedOpen(false)}
                      className="text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-white"
                  >
                      Cancel
                  </Button>
                  <Button 
                     onClick={() => {
                        setSelectedNeed({ 
                          ...customNeedEntry, 
                          id: `custom-${Date.now()}`, 
                          is_custom: true 
                        });
                        setIsCustomNeedOpen(false);
                     }}
                     disabled={!customNeedEntry.title || !customNeedEntry.description}
                     className="bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-xl h-12 px-8 shadow-lg shadow-blue-600/20"
                  >
                      Confirm Need <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
      {/* Custom Discovery Dialog */}
      <Dialog open={isCustomInterviewOpen} onOpenChange={setIsCustomInterviewOpen}>
          <DialogContent className="sm:max-w-[550px] bg-slate-950 text-white border-slate-800 rounded-3xl p-8">
              <DialogHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                     <Mic className="w-10 h-10" />
                  </div>
                  <div>
                     <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase italic">Record <span className="text-blue-600">Manual Discovery</span></DialogTitle>
                     <DialogDescription className="text-slate-400 font-medium italic mt-1">
                        Synthesize primary discovery data when official MOSI logs are unavailable.
                     </DialogDescription>
                  </div>
              </DialogHeader>
              <div className="grid gap-6 py-8">
                  <div className="space-y-2">
                      <Label htmlFor="log-title" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Interview/Log Title</Label>
                      <Input 
                        id="log-title" 
                        placeholder="e.g. Shop Floor Walkthrough with Lead Engineer" 
                        className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-bold h-12 rounded-xl"
                        value={customInterviewEntry.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomInterviewEntry({...customInterviewEntry, title: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="log-summary" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Core Findings Summary</Label>
                      <Textarea 
                         id="log-summary" 
                         placeholder="Synthesize the key discovery insights or operational gaps identified..." 
                         className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-medium min-h-[120px] rounded-xl leading-relaxed italic" 
                         value={customInterviewEntry.summary}
                         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomInterviewEntry({...customInterviewEntry, summary: e.target.value})}
                      />
                  </div>
              </div>
              <DialogFooter className="pt-4">
                  <Button 
                      variant="ghost" 
                      onClick={() => setIsCustomInterviewOpen(false)}
                      className="text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-white"
                  >
                      Cancel
                  </Button>
                  <Button 
                     onClick={() => {
                        setSelectedInterview({ 
                          ...customInterviewEntry, 
                          id: `custom-log-${Date.now()}`, 
                          type: 'discovery',
                          is_custom: true 
                        });
                        setIsCustomInterviewOpen(false);
                     }}
                     disabled={!customInterviewEntry.title || !customInterviewEntry.summary}
                     className="bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-xl h-12 px-8 shadow-lg shadow-blue-600/20"
                  >
                      Log Entry <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}

