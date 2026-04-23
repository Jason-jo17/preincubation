"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  ArrowUpRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

// Mock PRDs for the current company
const PRD_CHALLENGES = [
  { id: "prd-1", title: "AI Visual Defect Detection", status: "Published", submissions: 12 },
  { id: "prd-2", title: "Credit Scoring Engine", status: "In-Review", submissions: 5 }
];

const MOCK_SUBMISSIONS = [
  {
    id: "sub-1",
    student_name: "Jason G",
    project_title: "EdgeAI CV: Part Inspector",
    status: "submitted",
    score: null,
    submitted_at: "2 hours ago",
    prd_title: "AI Visual Defect Detection"
  },
  {
    id: "sub-2",
    student_name: "Anita R",
    project_title: "Vision-PRO: High Speed ROI",
    status: "under_review",
    score: 88,
    submitted_at: "1 day ago",
    prd_title: "AI Visual Defect Detection"
  },
  {
    id: "sub-3",
    student_name: "Vikram K",
    project_title: "GST-Credit ML Engine",
    status: "evaluated",
    score: 92,
    submitted_at: "3 days ago",
    prd_title: "Credit Scoring Engine"
  }
];

export default function CompanySubmissionsPage() {
  const [activePrdId, setActivePrdId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const companyId = 'ceed-1'; // Default for demo
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Company Challenges
        const prdRes = await fetch(`/api/prd/?company_id=${companyId}`);
        const prdData = await prdRes.json();
        setChallenges(prdData);

        // 2. Fetch All Submissions for Company
        const subRes = await fetch(`/api/submissions/company/${companyId}`);
        const subData = await subRes.json();
        setSubmissions(subData);
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter submissions by active PRD selection
  const filteredSubmissions = activePrdId 
    ? submissions.filter(s => s.prd_id === activePrdId)
    : submissions;

  return (
    <div className="container mx-auto p-6 space-y-10 min-h-screen bg-slate-950">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter">Candidate <span className="text-blue-500 italic">Command</span> Center</h1>
            <p className="text-slate-500 font-medium">Review and evaluate talent responding to your BuildForX challenges.</p>
         </div>
         
         <div className="flex gap-3">
            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-2xl flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Challenges</p>
                  <p className="text-xl font-black text-white">02</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FileText className="w-5 h-5" />
               </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-2xl flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Total Talent</p>
                  <p className="text-xl font-black text-white">17</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Users className="w-5 h-5" />
               </div>
            </div>
         </div>
      </div>

      {/* Campaign Selector / Sidebar & Submissions Grid */}
      <div className="lg:grid lg:grid-cols-12 gap-10">
         
         {/* Challenges Filter */}
         <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Active Campaigns</h3>
            <div className="space-y-2">
               {PRD_CHALLENGES.map(prd => (
                  <button
                    key={prd.id}
                    onClick={() => setActivePrdId(prd.id === activePrdId ? null : prd.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                       activePrdId === prd.id 
                       ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                       : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-black uppercase tracking-tighter opacity-70 italic">{prd.id}</span>
                       <Badge className={`${activePrdId === prd.id ? 'bg-white/20' : 'bg-blue-500/10'} text-xs`}>{prd.submissions}</Badge>
                    </div>
                    <p className="font-bold text-sm leading-tight">{prd.title}</p>
                  </button>
               ))}
            </div>
         </div>

         {/* Submissions Feed */}
         <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded-2xl border border-slate-900">
               <div className="relative flex-1 max-w-sm ml-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <Input 
                    placeholder="Search candidate name or title..." 
                    className="bg-transparent border-none text-white focus:bg-slate-900 transition-all h-9" 
                  />
               </div>
               <div className="flex gap-2">
                  <Badge variant="outline" className="border-slate-800 text-slate-500 uppercase tracking-widest text-[9px] px-3 font-black cursor-pointer hover:bg-slate-800">Latest First</Badge>
                  <Button variant="ghost" size="sm" className="text-slate-500"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <AnimatePresence>
                  {submissions.filter(s => !activePrdId || s.prd_title.includes(activePrdId)).map((sub, idx) => (
                    <motion.div
                       key={sub.id}
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: idx * 0.05 }}
                    >
                       <Card className="bg-slate-900/60 border-slate-800 hover:border-blue-500/30 transition-all overflow-hidden group cursor-pointer" onClick={() => window.location.href = `/portal/company/evaluate/${sub.id}`}>
                          <CardHeader className="pb-2">
                             <div className="flex justify-between items-start">
                                <Badge className={`uppercase tracking-[0.1em] text-[9px] font-black ${
                                   sub.status === 'evaluated' ? 'bg-emerald-500/10 text-emerald-400' : 
                                   sub.status === 'under_review' ? 'bg-amber-500/10 text-amber-500' : 
                                   'bg-blue-500/10 text-blue-400'
                                }`}>
                                   {sub.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-[10px] text-slate-700 font-bold">{sub.submitted_at}</span>
                             </div>
                             <CardTitle className="text-lg font-black text-white group-hover:text-blue-400 transition-colors mt-2">{sub.project_title}</CardTitle>
                             <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Candidate: {sub.student_name}</p>
                          </CardHeader>
                          <CardContent>
                             <div className="flex items-center gap-2 p-2 bg-slate-950/50 rounded-lg border border-slate-800">
                                <FileText className="w-3.5 h-3.5 text-slate-600" />
                                <span className="text-[10px] font-bold text-slate-500 line-clamp-1">{sub.prd_title}</span>
                             </div>
                          </CardContent>
                          <CardFooter className="bg-slate-950/30 border-t border-slate-800 flex justify-between items-center py-4">
                             {sub.score ? (
                                <div className="flex items-center gap-1.5">
                                   <div className="p-1 rounded-full bg-emerald-500/20">
                                      <Trophy className="w-3 h-3 text-emerald-500" />
                                   </div>
                                   <span className="text-sm font-black text-white">{sub.score}<span className="text-[10px] text-slate-700">/100</span></span>
                                </div>
                             ) : (
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic flex items-center gap-1.5">
                                   <Clock className="w-3 h-3" /> PENDING EVALUATION
                                </span>
                             )}
                             
                             <Button variant="ghost" size="sm" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:bg-blue-500/10 p-0 h-auto">
                                REVIEW <ChevronRight className="w-3 h-3 ml-1" />
                             </Button>
                          </CardFooter>
                       </Card>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </div>
    </div>
  );
}
