'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils/cn';
import { 
  CheckCircle2, AlertCircle, XCircle, Plus, Trash2, 
  ChevronLeft, Loader2, Save, Send, Eye, ShieldCheck, 
  Target, Zap, Flag, Info, LayoutDashboard, Rocket, Edit3,
  Globe, Users, Building2, Award, Laptop2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PENDING_REVIEWS_MOCK } from '@/lib/demo-data/experts';
import { NEW_COMPANIES as COMPANIES_DATA } from '@/lib/demo-data/new-companies';
import { getPhasedRoadmap } from '@/lib/demo-data/roadmaps';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RoadmapReviewPage({ params }: { params: { roadmap_id: string } }) {
  const { roadmap_id } = params;
  const searchParams = useSearchParams();
  const expert_id = searchParams.get('expert_id');
  const { user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Review State
  const [viewMode, setViewMode] = useState<'roadmap' | 'gaps'>('roadmap');
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [phaseValidations, setPhaseValidations] = useState<any[]>([]);
  const [expertAdditions, setExpertAdditions] = useState<any[]>([]);
  const [overallVerdict, setOverallVerdict] = useState('approved');
  const [overallComment, setOverallComment] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(8);

  // Modal State for Additions
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [newAddition, setNewAddition] = useState({ type: 'milestone', phase_number: 1, content: { title: '', description: '' }, rationale: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch pending reviews for the selector
        const expertId = user?.id || expert_id;
        try {
            const queueRes = await fetch(`${API}/api/experts/${expertId}/pending`);
            const queueData = await queueRes.json();
            setPendingReviews(queueData && queueData.length > 0 ? queueData : PENDING_REVIEWS_MOCK);
        } catch (e) {
            setPendingReviews(PENDING_REVIEWS_MOCK);
        }

        // Fetch roadmap details
        try {
            const res = await fetch(`${API}/api/companies/roadmaps/${roadmap_id}`);
            if (res.ok) {
                const data = await res.json();
                setRoadmap(data);
                if (data.phases) {
                    setPhaseValidations(data.phases.map((_: any, i: number) => ({
                        phase_number: i + 1,
                        is_validated: true,
                        comment: '',
                        suggested_changes: []
                    })));
                }
            } else {
                throw new Error("API Roadmap not found");
            }
        } catch (err) {
            // Fallback to mock for Aequus/Hical or any rd- prefixed ID
            const companyId = roadmap_id.startsWith('rd-') ? roadmap_id.substring(3) : roadmap_id;
            const dynamicRoadmap = getPhasedRoadmap(companyId);
            
            if (dynamicRoadmap && dynamicRoadmap.phases.length > 0) {
                setRoadmap(dynamicRoadmap);
                setPhaseValidations(dynamicRoadmap.phases.map((_: any, i: number) => ({
                    phase_number: i + 1,
                    is_validated: true,
                    comment: '',
                    suggested_changes: []
                })));
            } else {
                const mockReview = PENDING_REVIEWS_MOCK.find(r => r.roadmap_id === roadmap_id);
                if (mockReview) {
                    setRoadmap(mockReview.company_roadmaps);
                    setPhaseValidations(mockReview.company_roadmaps.phases.map((_: any, i: number) => ({
                        phase_number: i + 1,
                        is_validated: true,
                        comment: '',
                        suggested_changes: []
                    })));
                }
            }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [roadmap_id, user, expert_id]);

  const handleValidationChange = (index: number, val: boolean) => {
    setPhaseValidations(v => v.map((pv, i) => i === index ? { ...pv, is_validated: val } : pv));
  };

  const addExpertAddition = () => {
    setExpertAdditions([...expertAdditions, { ...newAddition, id: Date.now() }]);
    setShowAddModal(null);
    setNewAddition({ type: 'milestone', phase_number: 1, content: { title: '', description: '' }, rationale: '' });
  };

  const removeAddition = (id: number) => {
    setExpertAdditions(expertAdditions.filter(ea => ea.id !== id));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/roadmaps/${roadmap_id}/review?expert_id=${expert_id || user?.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phase_validations: phaseValidations,
          expert_additions: expertAdditions.map(({id, ...rest}) => rest),
          overall_verdict: overallVerdict,
          overall_comment: overallComment,
          confidence_score: confidenceScore,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      
      toast({ title: 'Review Submitted', description: 'Thank you for your expertise!' });
      router.push('/experts');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b bg-white px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-6">
           <Button variant="ghost" size="icon" onClick={() => router.push('/experts')} className="h-9 w-9">
              <ChevronLeft className="h-5 w-5" />
           </Button>
           <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Expert Review Protocol</span>
              <div className="flex items-center gap-2">
                 <Select 
                    value={roadmap_id} 
                    onValueChange={(val) => {
                       const review = pendingReviews.find(r => r.roadmap_id === val);
                       router.push(`/experts/review/${val}?expert_id=${review?.expert_id || user?.id}`);
                    }}
                 >
                    <SelectTrigger className="h-8 border-none bg-slate-50 font-bold uppercase tracking-tight w-[280px] p-0 shadow-none hover:bg-slate-100 px-2">
                       <SelectValue placeholder="Select target company" />
                    </SelectTrigger>
                    <SelectContent>
                       {pendingReviews.map(r => (
                          <SelectItem key={r.roadmap_id} value={r.roadmap_id}>
                             {r.companies?.name} Acceleration
                          </SelectItem>
                       ))}
                    </SelectContent>
                 </Select>
                 <Badge variant="outline" className="h-5 text-[8px] bg-blue-50 text-blue-700 border-blue-100 uppercase">ACTIVE REVIEW</Badge>
              </div>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" className="h-9 text-xs text-slate-500 hover:text-blue-600" onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="h-4 w-4 mr-2" /> Exit to Dashboard
           </Button>
           <Button className="h-9 bg-blue-600 hover:bg-blue-700 font-bold" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              SUBMIT VALIDATION
           </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
            <ScrollArea className="flex-1 bg-white border-r">
               <div className="p-8 max-w-5xl mx-auto grid grid-cols-12 gap-8 pb-24">
                  {/* Left Column: Reference Context (Gap Analysis) */}
                  <div className="col-span-4 space-y-6">
                     <div className="sticky top-0 space-y-6">
                        <section className="bg-slate-50 border rounded-2xl p-5 shadow-sm">
                           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 border-b pb-2">
                              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Strategic Scorecard
                           </h3>
                           {(() => {
                              const companyData = Object.values(COMPANIES_DATA).find(c => c.name.toLowerCase().includes(roadmap?.companies?.name?.toLowerCase() || "")) || COMPANIES_DATA[0];
                              const gaps = companyData?.gap_analysis as any;
                              if (!gaps) return <p className="text-[10px] text-slate-400 font-mono italic">DATA UNAVAILABLE</p>;
                              
                              const dimensions = [
                                 { label: 'Market Saturation', score: gaps.market_saturation_score || 0, icon: Globe },
                                 { label: 'Founder Quality', score: gaps.founder_quality_score || 0, icon: Users },
                                 { label: 'Business Maturity', score: gaps.business_maturity_score || 0, icon: Building2 },
                                 { label: 'Market Opportunity', score: gaps.market_opportunity_score || 0, icon: Target },
                                 { label: 'Leadership Quality', score: gaps.leadership_quality_score || 0, icon: Award },
                                 { label: 'Innovation', score: gaps.innovation_differentiator_score || 0, icon: Zap },
                                 { label: 'Talent Pool', score: gaps.talent_pool_score || 45, icon: Laptop2 },
                                 { label: 'Brand Identity', score: gaps.brand_identity_score || 55, icon: Flag },
                              ];

                              return (
                                 <div className="space-y-5">
                                    <div className="grid gap-4">
                                       {dimensions.map((item, i) => (
                                          <div key={i} className="space-y-1.5 group">
                                             <div className="flex justify-between items-center text-[10px]">
                                                <div className="flex items-center gap-1.5">
                                                   <item.icon className="h-3 w-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                   <span className="font-bold text-slate-600 uppercase tracking-tighter">{item.label}</span>
                                                </div>
                                                <span className={cn(
                                                   "font-black tracking-tighter",
                                                   item.score > 75 ? "text-emerald-600" : item.score > 50 ? "text-amber-600" : "text-rose-600"
                                                )}>
                                                   {item.score}/100
                                                </span>
                                             </div>
                                             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                   className={cn(
                                                      "h-full rounded-full transition-all duration-1000 ease-out",
                                                      item.score > 75 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : 
                                                      item.score > 50 ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" : 
                                                      "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                                                   )}
                                                   style={{ width: `${item.score}%` }}
                                                />
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                    
                                    <div className="pt-4 border-t space-y-3">
                                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                          <AlertCircle className="h-3 w-3 text-rose-500" /> High-Priority Gaps
                                       </p>
                                       <div className="grid gap-2">
                                          {gaps.critical_gaps?.slice(0, 3).map((g: string, i: number) => (
                                             <div key={i} className="flex items-start gap-2 p-2.5 bg-rose-50/50 rounded-xl text-[10px] text-rose-700 border border-rose-100/50 hover:bg-rose-50 transition-colors leading-relaxed font-medium">
                                                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5 shadow-sm" />
                                                <span className="flex-1">{g}</span>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              );
                           })()}
                        </section>
                     </div>
                  </div>

                  {/* Right Column: Roadmap Review */}
                  <div className="col-span-8 space-y-8">
                     <section className="p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Rocket className="h-24 w-24" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2 font-mono">Execution Thesis</h3>
                        <p className="text-base font-medium leading-relaxed italic pr-12">
                           "{roadmap?.executive_summary}"
                        </p>
                     </section>

                     <section className="space-y-10">
                        {roadmap?.phases?.map((phase: any, i: number) => (
                           <div key={i} className="space-y-4">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-200">
                                    {i + 1}
                                 </div>
                                 <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{phase.title}</h3>
                                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                                 </div>
                              </div>
                              
                              <div className="grid gap-3 ml-14">
                                 {phase.initiatives?.map((init: any, j: number) => (
                                    <div key={j} className="group flex items-start justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                                       <div className="flex items-start gap-3">
                                          <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                             <Zap className="h-2.5 w-2.5 text-blue-600" />
                                          </div>
                                          <div>
                                             <p className="text-xs font-bold text-slate-900">{init.name || init}</p>
                                             {init.description && <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{init.description}</p>}
                                          </div>
                                       </div>
                                       <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:bg-blue-50"
                                          onClick={() => {
                                             const newPV = [...phaseValidations];
                                             newPV[i].is_validated = false;
                                             newPV[i].comment = (newPV[i].comment ? newPV[i].comment + '\n' : '') + `Regarding "${init.name || init}": `;
                                             setPhaseValidations(newPV);
                                          }}
                                       >
                                          Suggest Edit <Edit3 className="h-2.5 w-2.5 ml-1" />
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </section>
                  </div>
               </div>
            </ScrollArea>

            {/* RIGHT PANEL: Review & Enhancement */}
            <aside className="w-[450px] bg-white border-l shadow-2xl z-[5] overflow-hidden flex flex-col">
               <div className="p-6 border-b flex items-center justify-between bg-slate-900 text-white">
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-70">Improvement engine</h3>
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
               </div>
               
               <ScrollArea className="flex-1">
                  <div className="p-6 space-y-10 pb-20">
                     {/* Section 1: Phase Validations */}
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4" /> Phase Validation
                        </h4>
                        {phaseValidations.map((pv, i) => (
                           <div key={i} className="p-4 rounded-xl border border-slate-100 space-y-4">
                              <div className="flex items-center justify-between">
                                 <p className="text-xs font-bold uppercase tracking-tight">Phase {pv.phase_number}</p>
                                 <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border">
                                    <Button 
                                       variant={pv.is_validated ? 'secondary' : 'ghost'} 
                                       size="sm" 
                                       className={`h-7 px-3 text-[10px] ${pv.is_validated ? 'bg-green-100 text-green-700' : ''}`}
                                       onClick={() => handleValidationChange(i, true)}
                                    >
                                       VALID ✓
                                    </Button>
                                    <Button 
                                       variant={!pv.is_validated ? 'secondary' : 'ghost'} 
                                       size="sm" 
                                       className={`h-7 px-3 text-[10px] ${!pv.is_validated ? 'bg-red-100 text-red-700' : ''}`}
                                       onClick={() => handleValidationChange(i, false)}
                                    >
                                       ISSUE ✗
                                    </Button>
                                 </div>
                              </div>
                              {!pv.is_validated && (
                                 <Textarea 
                                    placeholder="Explain the issue or suggest global changes..." 
                                    value={pv.comment}
                                    onChange={e => {
                                       const newV = [...phaseValidations];
                                       newV[i].comment = e.target.value;
                                       setPhaseValidations(newV);
                                    }}
                                    className="text-xs min-h-[60px] bg-slate-50 border-red-100"
                                 />
                              )}
                           </div>
                        ))}
                     </div>

                     {/* Section 2: Expert Additions */}
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                              <Plus className="h-4 w-4" /> Expert Enhancements
                           </h4>
                           <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-blue-600" onClick={() => setShowAddModal('milestone')}>
                              ADD ITEM +
                           </Button>
                        </div>

                        {expertAdditions.length === 0 && (
                           <div className="p-6 border border-dashed rounded-xl text-center space-y-2">
                              <Info className="h-6 w-6 text-slate-200 mx-auto" />
                              <p className="text-[10px] text-muted-foreground">No additions yet. Add milestones or risks to improve quality.</p>
                           </div>
                        )}

                        <div className="space-y-3">
                           {expertAdditions.map((ea, i) => (
                              <div key={ea.id} className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg relative group">
                                 <div className="flex justify-between mb-1">
                                    <Badge variant="outline" className="text-[8px] bg-white px-1.5 py-0 uppercase font-black text-blue-700">{ea.type} | Phase {ea.phase_number}</Badge>
                                    <Button variant="ghost" size="icon" className="h-5 w-5 text-red-400 group-hover:opacity-100 opacity-0 transition-opacity" onClick={() => removeAddition(ea.id)}>
                                       <Trash2 className="h-3 w-3" />
                                    </Button>
                                 </div>
                                 <p className="text-xs font-bold">{ea.content.title}</p>
                                 <p className="text-[10px] text-muted-foreground mt-1 italic leading-relaxed">{ea.rationale}</p>
                              </div>
                           ))}
                        </div>

                        {showAddModal && (
                           <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4 shadow-xl">
                              <div className="flex justify-between items-center">
                                 <p className="text-[10px] font-black uppercase tracking-widest">New Enhancement</p>
                                 <XCircle className="h-4 w-4 text-slate-500 cursor-pointer" onClick={() => setShowAddModal(null)} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <Label className="text-[8px] font-bold opacity-50 uppercase">Type</Label>
                                    <select 
                                       className="w-full h-8 bg-slate-800 text-xs border border-slate-700 rounded px-2"
                                       value={newAddition.type}
                                       onChange={e => setNewAddition({...newAddition, type: e.target.value})}
                                    >
                                       <option value="milestone">Milestone</option>
                                       <option value="initiative">Initiative</option>
                                       <option value="risk">High Risk</option>
                                       <option value="resource">Resource</option>
                                    </select>
                                 </div>
                                 <div className="space-y-1">
                                    <Label className="text-[8px] font-bold opacity-50 uppercase">Phase</Label>
                                    <select 
                                       className="w-full h-8 bg-slate-800 text-xs border border-slate-700 rounded px-2"
                                       value={newAddition.phase_number}
                                       onChange={e => setNewAddition({...newAddition, phase_number: parseInt(e.target.value)})}
                                    >
                                       {roadmap?.phases?.map((_: any, i: number) => (
                                          <option key={i} value={i + 1}>Phase {i + 1}</option>
                                       ))}
                                    </select>
                                 </div>
                              </div>
                              <div className="space-y-1">
                                 <Label className="text-[8px] font-bold opacity-50 uppercase">Title</Label>
                                 <Input 
                                    className="h-8 bg-slate-800 border-slate-700 text-xs text-white" 
                                    value={newAddition.content.title}
                                    onChange={e => setNewAddition({...newAddition, content: {...newAddition.content, title: e.target.value}})}
                                 />
                              </div>
                              <div className="space-y-1">
                                 <Label className="text-[8px] font-bold opacity-50 uppercase">Rationale / Why is this needed?</Label>
                                 <Textarea 
                                    className="bg-slate-800 border-slate-700 text-xs min-h-[60px] text-slate-300"
                                    value={newAddition.rationale}
                                    onChange={e => setNewAddition({...newAddition, rationale: e.target.value})}
                                 />
                              </div>
                              <Button className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-xs font-bold" onClick={addExpertAddition}>
                                 Confirm Addition
                              </Button>
                           </div>
                        )}
                     </div>

                     {/* Section 3: Overall Verdict */}
                     <div className="space-y-8 pt-6 border-t">
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                              <Flag className="h-4 w-4" /> Final Verdict
                           </h4>
                           <div className="grid grid-cols-3 gap-2">
                              {['approved', 'approved_with_changes', 'needs_revision'].map(v => (
                                 <Button 
                                    key={v}
                                    variant={overallVerdict === v ? 'secondary' : 'outline'}
                                    size="sm"
                                    className={`h-12 px-2 text-[8px] uppercase font-black leading-tight border transition-all ${
                                       overallVerdict === v ? (
                                          v === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                          v === 'approved_with_changes' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                          'bg-red-100 text-red-700 border-red-200'
                                       ) : 'opacity-50'
                                    }`}
                                    onClick={() => setOverallVerdict(v)}
                                 >
                                    {v.replace(/_/g, ' ')}
                                 </Button>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence Score</Label>
                              <Badge variant="outline" className="h-5 text-blue-600 font-black">{confidenceScore}/10</Badge>
                           </div>
                           <Slider 
                              defaultValue={[8]} 
                              max={10} 
                              step={1} 
                              onValueChange={(vals) => setConfidenceScore(vals[0])}
                           />
                        </div>

                        <div className="space-y-4 pt-6 border-t bg-blue-50/20 p-4 rounded-2xl border border-blue-100/50">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-900/60 flex items-center gap-2">
                              <Send className="h-4 w-4" /> Expert Perspective & Feedback
                           </h4>
                           <Textarea 
                              placeholder="Provide a final strategic perspective for the MSME entrepreneur..." 
                              className="min-h-[120px] text-xs bg-white border-blue-100 focus:ring-blue-500 transition-all shadow-sm font-medium"
                              value={overallComment}
                              onChange={e => setOverallComment(e.target.value)}
                           />
                           <p className="text-[10px] text-muted-foreground italic">This summary will be prominently displayed in the Company Owner's Growth Dashboard.</p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                               <LayoutDashboard className="h-4 w-4" /> Collaborative Specialist Thread
                            </h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] font-bold text-blue-600">DR. ARVIND RAO (YOU)</span>
                                        <span className="text-[8px] text-muted-foreground">JUST NOW</span>
                                    </div>
                                    <p className="text-[11px] text-slate-700">Initial assessment of the Composite Bonding phase suggests higher TRL readiness than reported.</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-100 opacity-60">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] font-bold text-slate-900">SYSTEM ANALYST</span>
                                        <span className="text-[8px] text-muted-foreground">2H AGO</span>
                                    </div>
                                    <p className="text-[11px] text-slate-700 italic">Analyzed similar roadmaps in the region; working capital is the primary growth barrier.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <Input placeholder="Add a collaborative point..." className="h-9 text-[11px] pr-10" />
                                <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-7 w-7 text-blue-600">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                     </div>
                  </div>
               </ScrollArea>
            </aside>
      </div>
    </div>
  );
}
