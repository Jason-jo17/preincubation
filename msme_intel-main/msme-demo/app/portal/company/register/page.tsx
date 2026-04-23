"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Zap, 
  Settings, 
  Users, 
  Rocket, 
  CheckCircle2,
  Database,
  Layout,
  Microscope,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'identity', title: 'Entity Identity', icon: Building2 },
  { id: 'operations', title: 'Operational Pain', icon: Zap },
  { id: 'capability', title: 'Resource Matrix', icon: Database },
  { id: 'intent', title: 'Strategic Intent', icon: Target }
];

export default function CompanyRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    painPoints: '',
    currentSOP: '',
    techStack: '',
    teamSkills: '',
    budgetClarity: 'Medium',
    problemDefinition: 'Low'
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call to ingest data
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitting(false);
    setComplete(true);
    setTimeout(() => router.push('/portal/login'), 3000);
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Registration Logged</h1>
            <p className="text-slate-500 font-medium">Your operational profile has been ingested into the MOSI discovery engine. An analyst will review your profile shortly.</p>
          </div>
          <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1 uppercase font-black text-[10px] tracking-widest animate-pulse">
            Redirecting to Secure Login...
          </Badge>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 py-20">
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-2">
              <Microscope className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Industry Onboarding Framework</span>
           </div>
           <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
              Scale Your <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Unit</span>.
           </h1>
           <p className="text-slate-500 max-w-lg mx-auto font-medium">
              Join the MSME Intelligence Platform. We don't just provide software; we engineer solutions for your specific operational friction.
           </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center relative px-10">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -translate-y-1/2" />
          {STEPS.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                  idx <= currentStep 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30' 
                  : 'bg-white border-slate-200 text-slate-300'
                }`}
              >
                <step.icon className={`w-6 h-6 ${idx === currentStep ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${idx <= currentStep ? 'text-blue-600' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Content */}
        <Card className="rounded-[2.5rem] border-slate-200/60 shadow-2xl overflow-hidden bg-white">
          <CardContent className="p-10 md:p-16">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div 
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">01. Identity Matrix</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">General Corporate Information</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Entity Name</label>
                        <Input 
                          placeholder="e.g. Precision Forge Ltd" 
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 shadow-inner px-6 text-lg font-bold"
                          value={formData.companyName}
                          onChange={(e) => updateForm('companyName', e.target.value)}
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Industrial Sector</label>
                        <Select value={formData.industry} onValueChange={(v) => updateForm('industry', v)}>
                          <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 shadow-inner px-6 text-lg font-bold">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl">
                             <SelectItem value="Aerospace">Aerospace & Defense</SelectItem>
                             <SelectItem value="Automotive">Automotive Ancillary</SelectItem>
                             <SelectItem value="Textiles">Textiles & Apparel</SelectItem>
                             <SelectItem value="Electronics">ESDM & Electronics</SelectItem>
                             <SelectItem value="General">General Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                     </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">02. Operational Heatmap</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Pain Points & Manual Bottlenecks</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Top 3 Production Friction Points</label>
                       <Textarea 
                         placeholder="e.g. Scrappage due to manual welding, lack of real-time inventory sync, manual rework overhead." 
                         className="min-h-[120px] rounded-2xl border-slate-100 bg-slate-50/50 shadow-inner p-6 text-base font-medium leading-relaxed italic"
                         value={formData.painPoints}
                         onChange={(e) => updateForm('painPoints', e.target.value)}
                       />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">03. Resource Matrix</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Technology & Talent Stack</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Digital Toolset</label>
                       <Input 
                         placeholder="ERPs, CRMs, IoT Platforms..." 
                         className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 shadow-inner px-6 text-sm font-bold"
                         value={formData.techStack}
                         onChange={(e) => updateForm('techStack', e.target.value)}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employee Count</label>
                       <Select value={formData.employeeCount} onValueChange={(v) => updateForm('employeeCount', v)}>
                          <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 shadow-inner px-6 text-lg font-bold">
                            <SelectValue placeholder="Select Range" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl">
                             <SelectItem value="1-20">Micro (1-20)</SelectItem>
                             <SelectItem value="21-100">Small (21-100)</SelectItem>
                             <SelectItem value="101-500">Medium (101-500)</SelectItem>
                             <SelectItem value="500+">Large (500+)</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-1 text-center">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">04. Strategic Commitment</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">Defining your readiness for transformation</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">Problem Clarity Score</label>
                        <div className="flex justify-between gap-2">
                           {['Low', 'Medium', 'High'].map(level => (
                             <Button 
                               key={level}
                               variant={formData.problemDefinition === level ? 'default' : 'outline'}
                               className={`flex-1 h-16 rounded-2xl font-black uppercase text-[10px] tracking-widest ${formData.problemDefinition === level ? 'bg-blue-600 shadow-xl shadow-blue-500/30' : 'border-slate-100 grayscale opacity-40 hover:opacity-100 transition-all'}`}
                               onClick={() => updateForm('problemDefinition', level)}
                             >
                               {level}
                             </Button>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-3xl space-y-3">
                     <div className="flex items-center gap-2 text-blue-600">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Data Privacy Protocol</span>
                     </div>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium italic">By submitting this profile, you agree to allow our Synthesis Engine to process your operational data for the purpose of matching your unit with elite engineering talent. Your data is encrypted and partitioned.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-slate-100">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                className={`font-black text-slate-400 uppercase tracking-widest text-[10px] hover:bg-transparent hover:text-slate-900 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
              >
                <ChevronLeft className="w-5 h-5 mr-4" /> Backtrack
              </Button>
              
              <Button 
                onClick={nextStep} 
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 h-16 rounded-3xl shadow-2xl shadow-blue-500/40 uppercase tracking-widest text-xs group active:scale-95 transition-all w-full md:w-auto"
              >
                {submitting ? 'Analyzing Profile...' : (
                  <>
                    {currentStep === STEPS.length - 1 ? 'Submit to Engine' : 'Continue Matrix'}
                    <ChevronRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">MSME INTELLIGENCE • SECURE ONBOARDING</p>
      </div>
    </div>
  );
}
