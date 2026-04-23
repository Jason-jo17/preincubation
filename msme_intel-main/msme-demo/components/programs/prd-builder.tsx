"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Zap, 
  Target, 
  Users, 
  ShieldCheck, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Save,
  Rocket
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

interface PRDBuilderProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export default function PRDBuilder({ initialData, onSave }: PRDBuilderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    sector: initialData?.sector || '',
    problem_statement: initialData?.problem_statement || '',
    discovery_context: initialData?.discovery_context || '',
    technical_requirements: initialData?.technical_requirements || ['Python', 'Computer Vision'],
    business_impact: initialData?.business_impact || '',
    budget: initialData?.budget || '₹5,00,000 - ₹10,00,000',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
       {/* Stepper Header */}
       <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {[
            { n: 1, l: 'Definitions', icon: FileText },
            { n: 2, l: 'Discovery Evidence', icon: Mic },
            { n: 3, l: 'Business & Build', icon: Rocket }
          ].map((s) => (
             <div key={s.n} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                  step === s.n ? 'bg-blue-600 text-white shadow-xl scale-110' : 
                  step > s.n ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                   {step > s.n ? <ShieldCheck className="w-5 h-5" /> : s.n}
                </div>
                <div className="hidden md:block">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.l}</p>
                </div>
                {s.n < 3 && <div className="hidden md:block w-12 h-[1px] bg-slate-200 mx-4" />}
             </div>
          ))}
       </div>

       <AnimatePresence mode="wait">
          {step === 1 && (
             <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
             >
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Initial <span className="text-blue-500">Definitions</span></h2>
                   <p className="text-slate-600 font-medium">Draft the core purpose and scope of this BuildForX challenge.</p>
                </div>

                <Card className="bg-white border-slate-200 shadow-sm">
                   <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Challenge Title</label>
                            <Input 
                               placeholder="e.g. AI-Vision Inspection for Die-Casters" 
                               className="bg-slate-50 border-slate-200 text-slate-900 font-bold h-12 shadow-none focus-visible:ring-slate-300"
                               value={formData.title}
                               onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Sector</label>
                            <Input 
                               placeholder="e.g. Precision Manufacturing" 
                               className="bg-slate-50 border-slate-200 text-slate-900 font-bold h-12 shadow-none focus-visible:ring-slate-300"
                               value={formData.sector}
                               onChange={e => setFormData({...formData, sector: e.target.value})}
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Problem Statement</label>
                         <Textarea 
                            placeholder="Describe the industrial pain point in detail..." 
                            className="bg-slate-50 border-slate-200 text-slate-900 font-medium min-h-[120px] shadow-none focus-visible:ring-slate-300"
                            value={formData.problem_statement}
                            onChange={e => setFormData({...formData, problem_statement: e.target.value})}
                         />
                      </div>
                   </CardContent>
                </Card>
             </motion.div>
          )}

          {step === 2 && (
             <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
             >
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Discovery <span className="text-purple-500">Evidence</span></h2>
                   <p className="text-slate-600 font-medium">Verify the interview data and insights that justify this build.</p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-1 italic">Intelligent Mapping Active</p>
                      <p className="text-sm text-slate-600 leading-normal italic">
                         System has linked this PRD to <span className="text-slate-900 font-bold cursor-pointer underline underline-offset-4 decoration-purple-500">
                            {initialData?.discovery_session?.title || `Mosi Session ${initialData?.source_id || '001'}`}
                         </span> ({initialData?.discovery_session?.date || 'Apr 01, 2026'}).
                      </p>
                   </div>
                </div>

                <Card className="bg-white border-slate-200 shadow-sm overflow-hidden group">
                   <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                   <CardHeader className="pb-4">
                      <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                         <Mic className="w-4 h-4 text-purple-400" /> Ground-Truth Evidence
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="p-8 pt-0 space-y-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 border-l-4 border-l-blue-500 relative">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Sparkles className="w-12 h-12 text-blue-500" />
                         </div>
                         <p className="text-slate-600 font-bold text-lg leading-relaxed italic">
                            "{initialData?.discovery_session?.context_quotes?.[0] || initialData?.problem_statement || "No direct quote available for this challenge."}"
                         </p>
                         <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                                  <Users className="w-4 h-4" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                     {initialData?.discovery_session?.stakeholder_id || 'Principal Stakeholder'}
                                  </p>
                                  <p className="text-[8px] text-slate-400 uppercase font-black tracking-[0.2em] mt-0.5">Verified Intelligence</p>
                               </div>
                            </div>
                            <Badge variant="outline" className="text-[9px] bg-white border-slate-200 text-slate-400 font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                               <ShieldCheck className="w-3 h-3 text-emerald-500" /> CEED AUDITED
                            </Badge>
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PRD Rationale (Discovery Driven)</label>
                         <Textarea 
                            placeholder="Explain why this challenge was created based on discovery data..." 
                            className="bg-slate-50 border-slate-200 text-slate-900 font-medium min-h-[100px] shadow-none focus-visible:ring-slate-300"
                            value={formData.discovery_context}
                            onChange={e => setFormData({...formData, discovery_context: e.target.value})}
                         />
                      </div>
                   </CardContent>
                </Card>
             </motion.div>
          )}

          {step === 3 && (
             <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
             >
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Build & <span className="text-emerald-500">Submission</span></h2>
                   <p className="text-slate-600 font-medium">Define technical requirements and finalize the challenge for students.</p>
                </div>

                <Card className="bg-white border-slate-200 shadow-sm">
                   <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Technical Stack</h3>
                            <div className="flex flex-wrap gap-2">
                               {formData.technical_requirements.map((req: string, i: number) => (
                                  <Badge key={i} className="h-8 bg-slate-50 border border-slate-200 text-slate-600 font-bold px-3 gap-2">
                                     {req} <Trash2 className="w-3 h-3 cursor-pointer hover:text-red-500" />
                                  </Badge>
                               ))}
                               <Button variant="ghost" size="sm" className="h-8 rounded-full border border-dashed border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                                  <Plus className="w-3 h-3 mr-2" /> Add Skill
                               </Button>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Budget & Incentives</h3>
                            <Input 
                               className="bg-slate-50 border-slate-200 text-slate-900 font-bold h-12 shadow-none focus-visible:ring-slate-300"
                               value={formData.budget}
                               onChange={e => setFormData({...formData, budget: e.target.value})}
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Impact Estimate</label>
                         <Textarea 
                            placeholder="e.g. 15% reduction in production waste..." 
                            className="bg-slate-50 border-slate-200 text-slate-900 font-medium h-24 shadow-none focus-visible:ring-slate-300"
                            value={formData.business_impact}
                            onChange={e => setFormData({...formData, business_impact: e.target.value})}
                         />
                      </div>
                   </CardContent>
                </Card>
             </motion.div>
          )}
       </AnimatePresence>

       {/* Navigation Buttons */}
       <div className="flex justify-between items-center py-6 border-t border-slate-200">
          <Button 
             variant="ghost" 
             onClick={prevStep} 
             disabled={step === 1}
             className="text-slate-500 hover:text-slate-900 font-black uppercase tracking-widest gap-2"
          >
             <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="flex gap-4">
             <Button variant="outline" className="bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm font-black uppercase tracking-widest gap-2">
                <Save className="w-4 h-4" /> Save Draft
             </Button>
             
             {step < 3 ? (
                <Button 
                   onClick={nextStep}
                   className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg font-black uppercase tracking-widest gap-2 min-w-[120px]"
                >
                   Next Phase <ArrowRight className="w-4 h-4" />
                </Button>
             ) : (
                <Button 
                   onClick={() => onSave(formData)}
                   className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg font-black uppercase tracking-widest gap-2 min-w-[150px]"
                >
                   Publish Challenge <ShieldCheck className="w-4 h-4" />
                </Button>
             )}
          </div>
       </div>
    </div>
  );
}
