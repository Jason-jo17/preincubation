'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { SectorTagger } from '../tagging/SectorTagger';
import { OperationsTagger } from '../tagging/OperationsTagger';
import { FunctionalityTagger } from '../tagging/FunctionalityTagger';
import { MediaUploader } from './MediaUploader';
import { StepBuilder } from './StepBuilder';
import { FlowBuilder } from '../flow/FlowBuilder';
import { PricingConfigurator } from './PricingConfigurator';
import { runComplianceCheck } from '@/constants/compliance-rules';

// --- Form Validation Schema ---

const projectSchema = z.object({
  title: z.string().min(10).max(100),
  shortDescription: z.string().min(20).max(280),
  fullDescription: z.string().min(200),
  projectType: z.enum(['AUTOMATION', 'AGENTIC_WORKFLOW', 'DASHBOARD', 'INTEGRATION', 'CHATBOT', 'ML_MODEL', 'MOBILE_APP', 'WEB_APP', 'API', 'IOT_SOLUTION']),
  ceedCategory: z.enum(['CORE', 'EXPANSION', 'EFFICIENCY', 'DISRUPTION']),
  sectorTags: z.array(z.string()).min(1),
  operationTags: z.array(z.string()).min(1),
  functionalityTags: z.array(z.string()).min(1),
  techStackTags: z.array(z.object({ name: z.string(), category: z.string() })).min(2),
  media: z.array(z.any()).min(1),
  steps: z.array(z.any()).min(3),
  flowData: z.string().optional(),
  pricing: z.any(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// --- Main Component ---

export function ProjectSubmitForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [complianceResult, setComplianceResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      sectorTags: [],
      operationTags: [],
      functionalityTags: [],
      techStackTags: [{ name: 'Next.js', category: 'FRAMEWORK' }, { name: 'TypeScript', category: 'LANGUAGE' }],
      media: [],
      steps: [],
      pricing: { model: 'CONTACT' },
    },
    mode: 'onChange',
  });

  const { watch, handleSubmit, setValue, trigger, formState: { errors, isValid } } = methods;
  const formData = watch();

  // Real-time compliance check
  useEffect(() => {
    const check = async () => {
      const result = await runComplianceCheck(formData);
      setComplianceResult(result);
    };
    const timer = setTimeout(check, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const steps = [
    { id: 'basic', title: 'Identity', icon: '📝' },
    { id: 'classification', title: 'Taxonomy', icon: '🏷️' },
    { id: 'media', title: 'Gallery', icon: '🖼️' },
    { id: 'logic', title: 'Intelligence', icon: '⚡' },
    { id: 'documentation', title: 'Blueprints', icon: '📋' },
    { id: 'pricing', title: 'Value', icon: '💰' },
  ];

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fields as any);
    if (isStepValid) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const getFieldsForStep = (step: number) => {
    switch(step) {
      case 0: return ['title', 'shortDescription', 'fullDescription'];
      case 1: return ['projectType', 'ceedCategory', 'sectorTags', 'operationTags', 'functionalityTags', 'techStackTags'];
      case 2: return ['media'];
      case 3: return ['flowData'];
      case 4: return ['steps'];
      case 5: return ['pricing'];
      default: return [];
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Finalizing Innovation:', data);
      // Simulate backend latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/projects');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    alert('Progress saved to local node. Protocol in stasis.');
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          {/* Header & Progress */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-[0_10px_20px_rgba(245,158,11,0.2)]">V</div>
                  <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Mint New Innovation</h1>
               </div>
               <p className="text-slate-500 font-medium max-w-md">Distill your automation into a high-fidelity commercial asset for the MSME ecosystem.</p>
            </div>

            <div className="flex items-center gap-1 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => i < currentStep && setCurrentStep(i)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      i === currentStep 
                        ? 'bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/20' 
                        : i < currentStep 
                          ? 'bg-emerald-500/10 text-emerald-600' 
                          : 'bg-slate-100 text-slate-400 grayscale'
                    }`}
                  >
                    <span className="text-sm font-bold">{i === currentStep ? step.icon : i < currentStep ? '✓' : i + 1}</span>
                  </button>
                  {i < steps.length - 1 && <div className={`w-6 h-0.5 mx-1 rounded-full ${i < currentStep ? 'bg-emerald-500/30' : 'bg-slate-100'}`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             
             {/* Left Column: Form Content */}
             <div className="lg:col-span-8">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentStep}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="space-y-10"
                 >
                   {/* Step 0: Basic Info */}
                   {currentStep === 0 && (
                     <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Project Title</label>
                           <input 
                             {...methods.register('title')}
                             className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500/30 focus:bg-slate-50 transition-all shadow-sm" 
                             placeholder="Ex: Automated Seafood Quality Classifier"
                           />
                           {errors.title && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-widest">⚠️ {errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Manifesto (Short Description)</label>
                           <textarea 
                             {...methods.register('shortDescription')}
                             rows={3}
                             className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-amber-500/30 focus:bg-slate-50 transition-all resize-none shadow-sm" 
                             placeholder="A punchy 280-character pitch for MSME owners..."
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Technical Dossier (Full Description)</label>
                           <textarea 
                             {...methods.register('fullDescription')}
                             rows={10}
                             className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-sm font-medium text-slate-600 placeholder-slate-300 focus:outline-none focus:border-amber-500/30 focus:bg-slate-50 transition-all shadow-sm" 
                             placeholder="Deep dive into features, architecture, and value proposition..."
                           />
                        </div>
                     </div>
                   )}

                   {/* Step 1: Classification */}
                   {currentStep === 1 && (
                     <div className="space-y-12">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Engine Architecture</label>
                              <select 
                                {...methods.register('projectType')}
                                className="w-full bg-white border-2 border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-900 appearance-none focus:outline-none focus:border-amber-500/30 shadow-sm"
                              >
                                {['AUTOMATION', 'AGENTIC_WORKFLOW', 'DASHBOARD', 'INTEGRATION', 'CHATBOT'].map(t => (
                                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                                ))}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">CEED Impact Category</label>
                              <select 
                                {...methods.register('ceedCategory')}
                                className="w-full bg-white border-2 border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-900 appearance-none focus:outline-none focus:border-emerald-500/30 shadow-sm"
                              >
                                {['CORE', 'EXPANSION', 'EFFICIENCY', 'DISRUPTION'].map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] block text-center mb-6">Target Industry Sectors</label>
                           <SectorTagger 
                             value={formData.sectorTags}
                             onChange={(val) => setValue('sectorTags', val, { shouldValidate: true })}
                           />
                           {errors.sectorTags && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">⚠️ Select at least one sector</p>}
                        </div>

                        <div className="space-y-4">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] block text-center mb-6">Operational Domain</label>
                           <OperationsTagger 
                             value={formData.operationTags}
                             onChange={(val) => setValue('operationTags', val, { shouldValidate: true })}
                           />
                           {errors.operationTags && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">⚠️ Select at least one operational domain</p>}
                        </div>

                        <div className="space-y-4">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] block text-center mb-6">Functional Capability</label>
                           <FunctionalityTagger 
                             value={formData.functionalityTags}
                             onChange={(val) => setValue('functionalityTags', val, { shouldValidate: true })}
                           />
                           {errors.functionalityTags && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">⚠️ Select at least one capability</p>}
                        </div>

                        <div className="space-y-4 pt-6">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] block mb-4">Tech Stack Synergy</label>
                           <div className="flex flex-wrap gap-2">
                             {formData.techStackTags?.map((tag, i) => (
                               <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-600 flex items-center gap-2">
                                 {tag.name}
                                 <button type="button" onClick={() => setValue('techStackTags', formData.techStackTags.filter((_, j) => j !== i), { shouldValidate: true })} className="text-slate-400 hover:text-red-500">✕</button>
                               </div>
                             ))}
                             <button 
                               type="button" 
                               onClick={() => setValue('techStackTags', [...(formData.techStackTags || []), { name: 'New Lib', category: 'LIBRARY' }], { shouldValidate: true })}
                               className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                             >
                               + Add Tool
                             </button>
                           </div>
                           {errors.techStackTags && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">⚠️ Add at least 2 technologies</p>}
                        </div>
                     </div>
                   )}

                   {/* Step 2: Media */}
                   {currentStep === 2 && (
                     <div className="space-y-4">
                        <MediaUploader 
                          value={formData.media}
                          onChange={(val) => setValue('media', val, { shouldValidate: true })}
                        />
                        {errors.media && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">⚠️ Upload at least one media asset</p>}
                     </div>
                   )}

                   {/* Step 3: Flow */}
                   {currentStep === 3 && (
                     <div className="space-y-4">
                        <FlowBuilder 
                          initialNodes={(() => {
                            try { return formData.flowData ? JSON.parse(formData.flowData).nodes : []; }
                            catch (e) { return []; }
                          })()}
                          initialEdges={(() => {
                            try { return formData.flowData ? JSON.parse(formData.flowData).edges : []; }
                            catch (e) { return []; }
                          })()}
                          onChange={(val) => setValue('flowData', val, { shouldValidate: true })}
                        />
                        {errors.flowData && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">⚠️ Define your logic flow</p>}
                     </div>
                   )}

                   {/* Step 4: Steps */}
                   {currentStep === 4 && (
                     <div className="space-y-4">
                        <StepBuilder 
                          value={formData.steps}
                          onChange={(val) => setValue('steps', val, { shouldValidate: true })}
                        />
                        {errors.steps && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">⚠️ Add at least 3 implementation steps</p>}
                     </div>
                   )}

                   {/* Step 5: Pricing */}
                   {currentStep === 5 && (
                     <div className="space-y-4">
                        <PricingConfigurator 
                          value={formData.pricing}
                          onChange={(val) => setValue('pricing', val, { shouldValidate: true })}
                        />
                        {errors.pricing && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">⚠️ Configure pricing model</p>}
                     </div>
                   )}

                 </motion.div>
               </AnimatePresence>

               {/* Navigation Controls */}
               <div className="flex items-center justify-between pt-12 border-t border-slate-100 mt-12">
                 <button
                   type="button"
                   onClick={prevStep}
                   disabled={currentStep === 0}
                   className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                     currentStep === 0 ? 'opacity-0 pointer-events-none' : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                   }`}
                 >
                   ← Back
                 </button>
                 
                 {currentStep < steps.length - 1 ? (
                   <button
                     type="button"
                     onClick={nextStep}
                     className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-slate-900/20 flex items-center gap-3"
                   >
                     CONTINUE EVOLUTION 
                     <span className="opacity-40">→</span>
                   </button>
                 ) : (
                   <button
                     type="submit"
                     disabled={!isValid || isSubmitting || (complianceResult && !complianceResult.isCompliant)}
                     className={`px-12 py-5 rounded-2xl font-black text-sm tracking-[0.2em] transition-all shadow-2xl flex items-center gap-4 ${
                       isValid && complianceResult?.isCompliant && !isSubmitting
                        ? 'bg-amber-500 text-white hover:scale-105 shadow-amber-500/20'
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                     }`}
                   >
                     {isSubmitting ? 'MINTING...' : 'FINALIZE & DEPLOY'}
                     <span className="text-xl">🚀</span>
                   </button>
                 )}
               </div>
             </div>

             {/* Right Column: Sidebar (Compliance & Stats) */}
             <div className="lg:col-span-4 space-y-8">
                
                {/* AI Compliance Panel */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sticky top-8 shadow-xl overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-700" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Compliance Check</h3>
                      <div className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${
                        complianceResult?.isCompliant ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {complianceResult?.isCompliant ? 'SECURE' : 'ACTION REQ'}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-8">
                       <div className="relative w-20 h-20">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className={`transition-all duration-1000 ${complianceResult?.score >= 80 ? 'text-emerald-500' : complianceResult?.score >= 50 ? 'text-amber-500' : 'text-red-500'}`} 
                              strokeDasharray={`${complianceResult?.score || 0}, 100`} strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-black text-slate-900">{complianceResult?.score || 0}%</span>
                          </div>
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-800 mb-1">Quality Signal</div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
                            Real-time validation against BuildForX global standards.
                          </p>
                       </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                      {complianceResult?.flags.map((flag: any, i: number) => (
                        <div key={i} className={`p-4 rounded-2xl border ${
                          flag.severity === 'ERROR' || flag.severity === 'CRITICAL' 
                            ? 'bg-red-500/5 border-red-500/10' 
                            : 'bg-slate-50 border-slate-100'
                        }`}>
                          <div className="flex items-start gap-3">
                            <span className="text-sm mt-0.5">
                              {flag.severity === 'ERROR' ? '❌' : flag.severity === 'WARNING' ? '⚠️' : 'ℹ️'}
                            </span>
                            <div>
                               <div className="text-[11px] font-bold text-slate-800 leading-tight mb-1">{flag.message}</div>
                               <div className="text-[10px] text-slate-500 font-medium">{flag.suggestion}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {complianceResult?.flags.length === 0 && (
                        <div className="py-8 text-center bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                           <span className="text-3xl block mb-2">✨</span>
                           <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Crystal Clear Compliance</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CEED Rubric Info */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Market Potential</h3>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">💡</div>
                     <div>
                        <div className="text-sm font-bold text-slate-800">CEED Framework</div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Core • Expansion • Efficiency • Disruption</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
