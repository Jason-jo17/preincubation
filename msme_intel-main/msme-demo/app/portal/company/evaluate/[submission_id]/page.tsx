"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  ArrowLeft, 
  Send,
  Flag,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Layout,
  Code,
  Sparkles,
  Link as LinkIcon,
  Target,
  Mic,
  Fingerprint
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

// Mock submission data for evaluation
const MOCK_SUBMISSION = {
  id: "sub-1",
  student_name: "Jason G",
  project_title: "EdgeAI CV: Aluminum Die Casting Inspector",
  prd_title: "AI Visual Defect Detection for Die Casting",
  summary: "A lightweight PyTorch-based vision model optimized for NVIDIA Jetson Nano. Achieves 99.2% precision on the provided dataset with an inference latency of 145ms.",
  repo_url: "https://github.com/jason/edge-cv-inspector",
  demo_url: "https://demo.industry.ai/vision-inspector",
  approach: "We used a YOLOv8-nano architecture with custom head for 4-class classification. Data augmentation included high-speed motion blur simulation to ensure robustness on moving conveyors.",
  evaluation_criteria: {
    technical: [
      { criterion: "Model Robustness", weight: 30, score: 0, description: "Performance across different lighting and part shapes." },
      { criterion: "Inference Latency", weight: 20, score: 0, description: "Speed of detection on edge hardware." }
    ],
    functional: [
       { criterion: "Requirement Coverage", weight: 25, score: 0, description: "How many functional requirements were met." }
    ],
    innovation: [
       { criterion: "Novel Architecture", weight: 15, score: 0, description: "Creative implementation of and originality." }
    ],
    presentation: [
       { criterion: "Demo Quality", weight: 10, score: 0, description: "Clarity of the walkthrough and results visualization." }
    ]
  }
};

const MOCK_MOSI_INTELLIGENCE = {
  summary: "Interview with CEO Aravind Melligeri of Aequs Limited focusing on operational bottlenecks and strategic roadmap. The primary concern is scaling the aerospace segment to $500M while addressing the profitability drag from the consumer segment. Critical gaps identified include high engineering attrition, the vacant CTO position, and lack of a documented succession plan.",
  sentiment: "Urgent, Frustrated but Optimistic",
  nextSteps: [
    "Hire CTO or Interim Engineering Lead immediately",
    "Separate consumer segment P&L to stop profitability drain",
    "Implement Automated RFQ pipeline for aerospace components",
    "Document formal succession plan for leadership stability"
  ],
  opportunities: [
    {
      id: "opp-aeq-001",
      timestamp: 240,
      title: "Spin-off Consumer Segment",
      description: "Strategically separate the consumer manufacturing segment to focus entirely on core aerospace profitability and reduce overall group debt.",
      tag: "Core",
      problem_clarity: 4,
      budget_score: 3,
      origin: "Customer",
      activelySeeking: true,
      assessment_matrix: { clarity: 4, awareness: 4, attempts: 1, intensity: 4 }
    },
    {
      id: "opp-aeq-002",
      timestamp: 310,
      title: "Automated RFQ Processing for Aerospace",
      description: "Build an NLP-driven NLP quoting pipeline to reduce the manual delay in quoting and capture more market share in the aerospace components sector.",
      tag: "Efficiency",
      problem_clarity: 3,
      budget_score: 4,
      origin: "Interviewer",
      activelySeeking: true,
      assessment_matrix: { clarity: 3, awareness: 4, attempts: 2, intensity: 3 }
    }
  ]
};

const MOCK_TRANSCRIPT_LINES = [
  { time: "00:00", speaker: "Interviewer", text: "Aravind, thank you for making the time. Aequs has built the only integrated aerospace ecosystem in India, and you're currently bringing in nearly ₹960 Crores in revenue. However, looking at your financials, there’s a persistent net loss margin of around -10%. Let's dive into what's driving that and where the actual bottlenecks are." },
  { time: "00:30", speaker: "Aravind Melligeri", text: "Happy to be here. Yes, the top-line aerospace growth is phenomenal. We have a 10-year contract with Airbus, and we're heavily integrated into the A320 and A350 programs. But you're right to point out the profitability issue. The drag is entirely coming from our consumer segment. Aerospace is highly profitable, but the consumer side is bleeding resources." },
  { time: "01:25", speaker: "Interviewer", text: "So is the strategic mandate right now to spin that consumer segment off, or are you trying to restructure its P&L natively to reduce the €630 Crore group debt?" },
  { time: "02:00", speaker: "Aravind Melligeri", text: "We've reached a breaking point where restructuring internally isn't enough. I am actively looking to separate the consumer segment P&L. If we can spin it off, we can focus 100% of our capital and executive bandwidth strictly on aerospace components, which is our core strength. We need to do this rapidly to secure better financing rates." },
  { time: "02:55", speaker: "Interviewer", text: "That makes total sense from a capital allocation standpoint. Looking purely at your aerospace operation, you're targeting a massive $500M revenue goal. But from an operational capability perspective, are the internal processes ready to handle that kind of volume?" },
  { time: "03:25", speaker: "Aravind Melligeri", text: "Candidly, no. Our biggest operational nightmare right now is the RFQ process. Every time Boeing or Airbus sends us a new blueprint or request for quotation, our engineering team manually processes the PDFs and CAD files to generate a quote. It ties up our best engineers for weeks." },
  { time: "04:10", speaker: "Interviewer", text: "If you are losing weeks on manual quoting, that's a direct cap on your growth runway. Have you explored employing an automated NLP or computer vision pipeline to instantly ingest these RFQs and output baseline quotes?" },
  { time: "04:45", speaker: "Aravind Melligeri", text: "I've thought about it, but this brings me to my secondary, darker problem: Talent. Our CTO position is currently vacant, and our attrition in senior engineering roles is hovering around 18%. We don't have the internal technical leadership right now to build or deploy an automated RFQ engine, let alone maintain it." },
  { time: "05:30", speaker: "Interviewer", text: "That's a critical gap. It sounds like before you can deploy an NLP solution to fix the RFQ bottleneck, you desperately need to secure either an interim engineering lead or fundamentally rethink your succession planning to stabilize the technical teams." },
  { time: "06:05", speaker: "Aravind Melligeri", text: "Exactly. The market opportunity in India right now is massive with the China+1 shift and the PLI schemes. We have the 10,000-ton forging press and the manufacturing infrastructure. I just need the digital layer and the leadership stability to back it up." }
];

export default function CompanyEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<any>(MOCK_SUBMISSION);
  const [prd, setPrd] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'submission' | 'prd' | 'mosi'>('submission');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Submission
        const subRes = await fetch(`/api/submissions/${params.submission_id}`);
        if (!subRes.ok) throw new Error('Submission not found');
        const subData = await subRes.json();
        
        // 2. Fetch Associated PRD
        if (subData.prd_id) {
           const prdRes = await fetch(`/api/prd/${subData.prd_id}`);
           if (prdRes.ok) {
              const prdData = await prdRes.json();
              setPrd(prdData);
           }
        }
        
        setSubmission({
          ...MOCK_SUBMISSION,
          ...subData,
          student_name: subData.student_id || 'Student X',
          project_title: subData.title || MOCK_SUBMISSION.project_title
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.submission_id]);

  const calculateTotal = () => {
    let total = 0;
    const criteria = submission.evaluation_criteria || MOCK_SUBMISSION.evaluation_criteria;
    Object.entries(criteria).forEach(([cat, items]: [string, any]) => {
      items.forEach((item: any, idx: number) => {
        const score = scores[`${cat}-${idx}`] || 0;
        total += (score * item.weight) / 100;
      });
    });
    return total.toFixed(1);
  };

  const handleScoreChange = (cat: string, idx: number, val: number[]) => {
    setScores(prev => ({ ...prev, [`${cat}-${idx}`]: val[0] }));
  };

  const handleSubmitEvaluation = async () => {
    console.log("Submitting Evaluation for:", params.submission_id, { scores, comments, total: calculateTotal() });
    
    try {
      const payload = {
        submission_id: params.submission_id,
        company_id: 'a2e10480-1000-41d4-a7ae-446655440001', // Aequs UUID
        score_breakdown: scores,
        overall_score: parseFloat(calculateTotal()),
        comments: comments,
        interest_in_pilot: true
      };

      const response = await fetch('/api/evaluations/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsDone(true);
      } else {
        alert("Failed to submit evaluation to the engine.");
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      alert("Critical: Intelligence Bridge unreachable.");
    }
  };

  if (isDone) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="max-w-md w-full bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center space-y-6"
            >
               <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-blue-500" />
               </div>
               <h2 className="text-3xl font-black text-white tracking-tighter">Evaluation Finalized</h2>
               <p className="text-slate-400 font-medium leading-relaxed italic">"Thank you for reviewing this talent. Your scores have been weighted and added to the leaderboard."</p>
               <p className="text-4xl font-black text-emerald-400">SCORE: {calculateTotal()}</p>
               <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12" onClick={() => router.push('/portal/company/submissions')}>
                  BACK TO SUBMISSIONS
               </Button>
            </motion.div>
         </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900 px-6 py-4">
         <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
               <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => router.back()}>
                  <ChevronLeft className="w-5 h-5 mr-1" /> BACK
               </Button>
               <div className="h-6 w-px bg-slate-800" />
               <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button 
                     onClick={() => setActiveTab('submission')}
                     className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'submission' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                     Submission
                  </button>
                  <button 
                     onClick={() => setActiveTab('prd')}
                     className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prd' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                     PRD Specs
                  </button>
                  <button 
                     onClick={() => setActiveTab('mosi')}
                     className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'mosi' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'text-slate-500 hover:text-white'}`}
                  >
                     <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Discovery Intel</span>
                  </button>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Weighted Total Score</p>
                  <p className="text-3xl font-black text-blue-500 tracking-tighter">{calculateTotal()}<span className="text-xs text-slate-700 ml-1">/100</span></p>
               </div>
               <Button className="bg-emerald-600 hover:bg-emerald-500 font-black h-12 px-8 group" onClick={handleSubmitEvaluation}>
                  FINALIZE REVIEW <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6 md:p-12 lg:grid lg:grid-cols-12 gap-12 items-start">
         {/* Left Side: Submission Content OR PRD Specs */}
         <div className="lg:col-span-7 space-y-10">
            <AnimatePresence mode="wait">
               {activeTab === 'submission' && (
                  <motion.div 
                     key="submission"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     className="space-y-10"
                  >
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                           <Badge className="bg-blue-600 hover:bg-blue-600 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                              {submission.student_name}
                           </Badge>
                           <Badge variant="outline" className="border-slate-800 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                              SUB-ID: {submission.id}
                           </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9]">{submission.project_title}</h1>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                           <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 font-bold hover:bg-slate-800 gap-2">
                              <LinkIcon className="w-4 h-4" /> REPOSITORY
                           </Button>
                           <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 font-bold hover:bg-slate-800 gap-2">
                              <Sparkles className="w-4 h-4" /> LIVE DEMO
                           </Button>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <section className="space-y-4">
                           <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Layout className="w-4 h-4 text-blue-500" /> Executive Summary
                           </h3>
                           <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 border-l-4 border-l-blue-500 leading-loose text-slate-400 italic">
                              "{submission.summary || MOCK_SUBMISSION.summary}"
                           </div>
                        </section>

                        <section className="space-y-4">
                           <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Code className="w-4 h-4 text-purple-500" /> Solution Deep Dive
                           </h3>
                           <div className="p-8 rounded-2xl bg-slate-950 border border-slate-900 font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                              {submission.approach || MOCK_SUBMISSION.approach}
                           </div>
                        </section>
                     </div>
                  </motion.div>
               )}
               
               {activeTab === 'prd' && (
                  <motion.div 
                     key="prd"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-10"
                  >
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                           <Badge className="bg-emerald-600/20 text-emerald-400 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                              ORIGINAL PRD SPECS
                           </Badge>
                           <Badge variant="outline" className="border-slate-800 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                              CODE: {prd?.prd_code || '---'}
                           </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9]">{prd?.title || 'PRD Requirements'}</h1>
                     </div>

                     <div className="space-y-8">
                        <section className="space-y-4">
                           <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Target className="w-4 h-4 text-emerald-500" /> Functional Requirements Checklist
                           </h3>
                           <div className="space-y-3">
                              {(prd?.functional_requirements || []).map((fr: any, i: number) => (
                                 <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 rounded border-2 border-slate-700 flex items-center justify-center text-emerald-500">
                                       <CheckCircle2 className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100" />
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-xs font-black text-white uppercase tracking-tight">{fr.id}: {fr.requirement}</p>
                                       <p className="text-[10px] text-slate-500 italic">Acceptance: {fr.acceptance_criteria[0]}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </section>

                        <section className="space-y-4">
                           <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-blue-500" /> Success Metrics
                           </h3>
                           <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 border-l-4 border-l-emerald-500">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Goal</p>
                              <p className="text-sm text-white italic">{prd?.success_metrics?.primary?.[0] || 'Efficiency improvement across high-intensity sectors.'}</p>
                           </div>
                        </section>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'mosi' && (
                  <motion.div 
                     key="mosi"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-10"
                  >
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                           <Badge className="bg-purple-600/20 text-purple-400 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                              MOSI SYNTHESIS
                           </Badge>
                           <Badge variant="outline" className="border-slate-800 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                              ORIGINAL DISCOVERY INTEL
                           </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9]">Aequs Executive Evidence</h1>
                     </div>

                     {/* Synopsis & Sentiment */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Fingerprint className="w-4 h-4 text-purple-500"/> Core Synopsis</h3>
                           <p className="text-sm text-slate-300 leading-relaxed italic">"{MOCK_MOSI_INTELLIGENCE.summary}"</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/20 space-y-6 flex flex-col justify-center text-center">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-purple-400/50 uppercase tracking-widest">Detected Sentiment</p>
                              <p className="text-sm font-bold text-purple-300">{MOCK_MOSI_INTELLIGENCE.sentiment}</p>
                           </div>
                        </div>
                     </div>

                     {/* Extracted Next Steps & Opportunities */}
                     <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                           <Target className="w-4 h-4 text-emerald-500" /> Extracted Strategic Priorities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {MOCK_MOSI_INTELLIGENCE.opportunities.map((opp, i) => (
                              <div key={i} className="p-5 rounded-xl bg-slate-950 border border-slate-800 border-t-2 border-t-emerald-500 space-y-3">
                                 <div className="flex justify-between items-start">
                                    <Badge className="bg-emerald-500/10 text-emerald-400 font-black tracking-widest text-[8px] uppercase">{opp.tag} Quadrant</Badge>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase">{opp.origin} Originated</span>
                                 </div>
                                 <h4 className="text-sm font-black text-white">{opp.title}</h4>
                                 <p className="text-xs text-slate-400 leading-relaxed">{opp.description}</p>
                                 
                                 <div className="flex gap-4 pt-3 mt-3 border-t border-slate-800">
                                    <div className="space-y-1">
                                       <p className="text-[8px] text-slate-500 font-black tracking-widest uppercase">Clarity Matrix</p>
                                       <div className="flex gap-1">
                                          {[1,2,3,4].map(n => <div key={n} className={`w-2 h-2 rounded-full ${n <= opp.assessment_matrix.clarity ? 'bg-blue-500' : 'bg-slate-800'}`}/>)}
                                       </div>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[8px] text-slate-500 font-black tracking-widest uppercase">Intensity</p>
                                       <div className="flex gap-1">
                                          {[1,2,3,4].map(n => <div key={n} className={`w-2 h-2 rounded-full ${n <= opp.assessment_matrix.intensity ? 'bg-red-500' : 'bg-slate-800'}`}/>)}
                                       </div>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[8px] text-slate-500 font-black tracking-widest uppercase">Budgeted</p>
                                       <div className="flex gap-1">
                                          {[1,2,3,4].map(n => <div key={n} className={`w-2 h-2 rounded-full ${n <= opp.budget_score ? 'bg-emerald-500' : 'bg-slate-800'}`}/>)}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* The Rubric Reference Guide */}
                     <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-baseline justify-between mb-4">
                           <span className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> CEED Strategist Rubric Criteria</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                           <div className="p-3 bg-slate-950 rounded border border-slate-800">
                              <p className="text-[10px] font-black text-blue-400 mb-1">CORE Evaluates:</p>
                              <p className="text-[9px] text-slate-400 leading-snug">Stabilizing current revs. "Do what we do, but better."</p>
                           </div>
                           <div className="p-3 bg-slate-950 rounded border border-slate-800">
                              <p className="text-[10px] font-black text-emerald-400 mb-1">EFFICIENCY Evaluates:</p>
                              <p className="text-[9px] text-slate-400 leading-snug">Operational automation. "Reduce waste and friction."</p>
                           </div>
                           <div className="p-3 bg-slate-950 rounded border border-slate-800">
                              <p className="text-[10px] font-black text-amber-400 mb-1">EXPANSION Evaluates:</p>
                              <p className="text-[9px] text-slate-400 leading-snug">Diversification into new segments. "Take what we have to new places."</p>
                           </div>
                           <div className="p-3 bg-slate-950 rounded border border-slate-800">
                              <p className="text-[10px] font-black text-red-400 mb-1">DISRUPTION Evaluates:</p>
                              <p className="text-[9px] text-slate-400 leading-snug">Radical innovation & tech. "Rewrite the rules entirely."</p>
                           </div>
                        </div>
                        <div className="text-[10px] text-slate-500 leading-relaxed font-mono">
                           <strong className="text-slate-300">CLARITY:</strong> (1) Vague Pain -{">"} (4) Technical Spec Readiness<br/>
                           <strong className="text-slate-300">BUDGET:</strong> (1) Venting -{">"} (4) High-Priority Funded Project<br/>
                           <strong className="text-slate-300">INTENSITY:</strong> (1) Low/Nice-to-have -{">"} (4) Critical/Capitalization at stake
                        </div>
                     </div>

                     {/* Raw Audio Transcript Feed */}
                     <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                           <Mic className="w-4 h-4 text-blue-500" /> Raw Synchronized Transcript
                        </h3>
                        <div className="space-y-4">
                           {MOCK_TRANSCRIPT_LINES.map((line, i) => (
                              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-800 group">
                                 <div className="w-12 text-right shrink-0">
                                    <span className="text-xs font-mono text-slate-600 group-hover:text-blue-500 transition-colors">{line.time}</span>
                                 </div>
                                 <div className="w-px bg-slate-800" />
                                 <div className="space-y-1">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${line.speaker === 'Interviewer' ? 'text-slate-500' : 'text-blue-400'}`}>
                                       {line.speaker}
                                    </span>
                                    <p className="text-sm text-slate-300 leading-relaxed">"{line.text}"</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Right Side: Evaluation Controls */}
         <div className="lg:col-span-5 space-y-6">
            <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
               <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600" />
               <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                     <Activity className="w-5 h-5 text-blue-400" /> Performance Matrix
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-8">
                  {(Object.entries(submission.evaluation_criteria || MOCK_SUBMISSION.evaluation_criteria)).map(([cat, items], catIdx) => (
                     <div key={catIdx} className="space-y-6 pt-4 border-t border-slate-800/50 first:border-0 first:pt-0">
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{cat} Scorecard</h4>
                        <div className="space-y-8">
                           {(items as any[]).map((item, idx) => (
                              <div key={idx} className="space-y-3">
                                 <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                       <span className="text-sm font-bold text-white uppercase">{item.criterion}</span>
                                       <p className="text-[10px] text-slate-500 italic max-w-xs">{item.description}</p>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-xl font-black text-blue-500">{scores[`${cat}-${idx}`] || 0}</span>
                                       <span className="text-[10px] text-slate-700 font-black ml-1 uppercase">/ 100</span>
                                       <p className="text-[9px] text-slate-700 font-bold uppercase tracking-tighter">Weight: {item.weight}%</p>
                                    </div>
                                 </div>
                                 <Slider 
                                    defaultValue={[0]} 
                                    max={100} 
                                    step={1} 
                                    className="pt-2 cursor-pointer"
                                    onValueChange={(v) => handleScoreChange(cat, idx, v)}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </CardContent>
            </Card>

            <Card className="bg-slate-950 border-slate-900">
               <CardHeader>
                  <CardTitle className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <MessageSquare className="w-4 h-4" /> Internal Review Comments
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Textarea 
                     placeholder="Add qualitative feedback for the internal panel and the student..."
                     className="bg-slate-900 border-slate-800 text-white min-h-[120px] focus:border-blue-500 transition-all font-medium italic"
                     value={comments}
                     onChange={(e) => setComments(e.target.value)}
                  />
               </CardContent>
               <CardFooter className="bg-red-500/5 border-t border-slate-900/50 px-6 py-4">
                  <button className="flex items-center gap-2 text-red-500 hover:text-red-400 text-xs font-bold uppercase transition-all">
                     <Flag className="w-3.5 h-3.5" /> Flag for plagiarism or policy violation
                  </button>
               </CardFooter>
            </Card>
         </div>
      </div>
    </div>
  );
}

const Activity = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)
