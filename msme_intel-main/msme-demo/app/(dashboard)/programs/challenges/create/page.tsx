"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PRDBuilder from '@/components/programs/prd-builder';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Rocket, Sparkles } from 'lucide-react';
import ChallengeSourceSelector from '@/components/programs/challenge-source-selector';

function CreateChallengeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const insightId = searchParams.get('insight');
  
  const [initialData, setInitialData] = useState<any>(null);
  const [isSourceSelected, setIsSourceSelected] = useState(false);

  useEffect(() => {
    // Check for "need" parameter from Sector Hub
    const needId = searchParams.get('need');
    if (needId) {
       const { DEMO_AUTOMATION_NEEDS } = require('@/lib/demo-data/automation-needs');
       const need = DEMO_AUTOMATION_NEEDS.find((n: any) => n.id === needId);
       
       if (need) {
          setInitialData({
             title: need.title,
             sector: need.sector_id,
             problem_statement: need.description,
             discovery_context: need.discovery_insight ? 
                `MOSI SESSION: ${need.discovery_insight.session_id}\n\nRATIONALE: ${need.discovery_insight.rationale}${need.discovery_insight.quote ? `\n\nQUOTE: "${need.discovery_insight.quote}"` : ''}` : 
                `Derived from sector analysis for ${need.sector_id}.`,
             technical_requirements: need.tech_stack_suggested?.primary || [],
             budget: need.target_revenue_range || "TBD",
             source_type: need.discovery_insight ? 'mosi' : 'sector',
             source_id: need.discovery_insight?.session_id || need.sector_id
          });
          setIsSourceSelected(true);
          return;
       }
    }

    // If we have direct discovery context from URL (Legacy/Direct flow), simulate pre-filling
    if (sessionId || insightId) {
      setInitialData({
        title: "AI Visual Inspection for Die-Casting",
        sector: "Manufacturing",
        problem_statement: "High rejection rates in the finishing department due to manual QC bottlenecks. Hairstyle cracks are being missed after long shifts.",
        discovery_context: `Derived from Mosi Discovery Session ${sessionId || '001'}. Primary stakeholder emphasized the need for automated inspection to reduce return costs.`,
        technical_requirements: ['Python', 'PyTorch', 'Computer Vision', 'Industrial IoT'],
        budget: "₹12,00,000 - ₹15,00,000",
        source_type: 'mosi',
        source_id: sessionId || 'mosi-1'
      });
      setIsSourceSelected(true);
    }
  }, [sessionId, insightId, searchParams]);

  const handleSourceSelect = (data: any) => {
     setInitialData(data);
     setIsSourceSelected(true);
  };

  const handleSave = (data: any) => {
    console.log('Publishing challenge:', data);
    
    // Find associated company if possible
    let redirectPath = '/programs';
    if (initialData?.source_type === 'mosi' && initialData?.source_id) {
        const session = require('@/lib/demo-data/mosi-sessions').MOSI_SESSIONS.find((s: any) => s.id === initialData.source_id);
        if (session) {
            redirectPath = `/companies/${session.companyId}`;
        }
    }
    
    alert("Challenge Published! It's now visible to students in the Talent Pipeline.");
    setTimeout(() => {
      router.push(redirectPath);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen bg-slate-50">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
             <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" onClick={() => isSourceSelected && !sessionId ? setIsSourceSelected(false) : router.back()} className="p-0 h-6 text-slate-500 hover:text-slate-900">
                   <ArrowLeft className="w-4 h-4 mr-1" /> {isSourceSelected ? 'Change Source' : 'Back to Hub'}
                </Button>
                <div className="h-4 w-[1px] bg-slate-300 mx-2" />
                <div className="p-1 px-2 rounded bg-blue-600/10 border border-blue-600/20 flex items-center gap-1.5">
                   <Sparkles className="w-3 h-3 text-blue-400" />
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Bridge Mode</span>
                </div>
             </div>
             <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
                BuildForX <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8 decoration-2">Architect</span>
             </h1>
             <p className="text-slate-500 text-lg font-medium">Refining discovery-backed intelligence into a student-ready challenge.</p>
          </div>

          <div className="flex gap-3">
             {(isSourceSelected) && (
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">
                   <div className="p-1 rounded bg-purple-600/20 text-purple-400">
                      <Rocket className="w-4 h-4" />
                   </div>
                   <div className="text-xs">
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px]">Linked Evidence</p>
                      <p className="text-white font-medium">{initialData?.source_type === 'mosi' ? `Session: ${initialData.source_id}` : 'Sector Analysis'}</p>
                   </div>
                </div>
             )}
          </div>
       </div>

       <Separator className="bg-slate-200" />

       <div className="mt-8">
          {!isSourceSelected ? (
             <ChallengeSourceSelector onSelect={handleSourceSelect} />
          ) : (
             <PRDBuilder initialData={initialData} onSave={handleSave} />
          )}
       </div>
    </div>
  );
}

export default function CreateChallengePage() {
  return (
    <Suspense fallback={
       <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
       </div>
    }>
      <CreateChallengeContent />
    </Suspense>
  );
}
