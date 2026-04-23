"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Trophy, 
  Rocket, 
  Award,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SubmissionForm from '@/components/buildforx/submission-form';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubmitSolutionPage() {
  const params = useParams();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log("Submitting values for PRD:", params.prd_id, values);
    
    try {
      const payload = {
        prd_id: params.prd_id,
        title: values.title || `Submission for ${params.prd_id}`,
        executive_summary: values.summary,
        solution_approach: { description: values.approach },
        technical_implementation: { stack: values.techStack },
        repository_links: { github: values.repoUrl },
        demo_links: { live: values.demoUrl },
        status: 'submitted'
      };

      const response = await fetch('/api/submissions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const err = await response.json();
        alert(`Submission failed: ${err.detail || 'Internal Error'}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to connect to the intelligence engine.");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white border border-slate-200 p-12 rounded-3xl text-center space-y-6 relative shadow-xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500" />
          
          <div className="w-20 h-20 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-4">
             <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Solution Submitted!</h2>
          <p className="text-slate-600 font-medium leading-relaxed italic">
            "Your design has been encrypted and sent to the company review panel. You'll be notified via the EMI dashboard once the evaluation begins."
          </p>
          
          <div className="pt-6 grid grid-cols-2 gap-4">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">EMI Points Earned</p>
                <p className="text-xl font-black text-blue-600">+50</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Review Start</p>
                <p className="text-xl font-black text-emerald-600">48 hrs</p>
             </div>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl"
            onClick={() => router.push('/portal/student/challenges')}
          >
            RETURN TO CATALOG
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
         <div className="container mx-auto flex justify-between items-center">
            <Button 
               variant="ghost" 
               className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
               onClick={() => router.back()}
            >
               <ChevronLeft className="w-5 h-5 mr-1" /> BACK TO PRD
            </Button>
            
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BuildForX Submission</p>
                  <p className="text-sm font-bold text-slate-900 tracking-tight italic">AI Visual Defect Detection</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-blue-600">
                  JS
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl p-6 md:p-12 space-y-12">
         {/* Headling Section */}
         <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                  CHALLENGE PORTAL
               </Badge>
               <span className="text-slate-400 font-bold text-xs tracking-tighter uppercase">• 24 days remaining</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
               Showcase Your <span className="text-blue-600 italic">Genius</span>. <br />
               Submit Your Solution.
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
               Ensure your submission addresses all <span className="text-slate-900 font-black underline decoration-blue-500 underline-offset-4 decoration-2">Must Have</span> functional requirements specified in the PRD for maximum evaluation scores.
            </p>
         </div>

         <div className="pt-8 border-t border-slate-200">
            <SubmissionForm 
              prdTitle="AI Visual Defect Detection" 
              prdId={params.prd_id as string} 
              onSubmit={handleSubmit} 
            />
         </div>
      </div>
    </div>
  );
}
