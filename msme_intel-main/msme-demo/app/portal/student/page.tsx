"use client";

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Rocket, 
  Award, 
  MapPin, 
  Briefcase, 
  Search, 
  TrendingUp,
  BrainCircuit,
  Binary,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Layout,
  Code,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/students/talent-1'); // Default for demo
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-12 min-h-screen bg-slate-50 flex flex-col items-center justify-center">
         <div className="w-12 h-12 rounded-full border-t-2 border-blue-600 animate-spin" />
         <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synchronizing Talent ID...</p>
      </div>
    );
  }

  const studentData = student || {
    name: "Jason G",
    total_points: 1250,
    rank: "Elite Builder",
    level: 14,
    progress: 65,
    badges: ["Fast Responder", "Precision Model", "Industry First"],
    applications: [
       { id: "sub-1", title: "EdgeAI CV Inspector", prd: "AI Visual Defect Detection", status: "Evaluation", date: "2 hrs ago" }
    ]
  };

  return (
    <div className="container mx-auto p-6 space-y-12 min-h-screen bg-slate-50">
      {/* Hero Talent Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-xl p-10 md:p-14 lg:flex gap-16 items-center">
         {/* Glassmorphic Background */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-32 -mt-32" />
         
         <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-slate-50 p-2 bg-white overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer hover:border-blue-400 transition-all duration-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center overflow-hidden shadow-inner transform group-hover:scale-95 transition-transform duration-500">
                       <span className="text-white text-5xl md:text-7xl font-black italic tracking-tighter drop-shadow-lg">
                          {studentData.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                       </span>
                    </div>
                </div>
            
            <div className="space-y-4 text-center md:text-left">
               <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] tracking-widest px-3 uppercase italic">
                     {studentData.rank}
                  </Badge>
                  <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                     EMI-ID: 9872-XJ
                  </Badge>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic">
                  {studentData.name}.
               </h1>
               
               <div className="flex gap-4 items-center justify-center md:justify-start pt-2">
                  <div className="text-left">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Points</p>
                     <p className="text-3xl font-black text-blue-600 tracking-tighter">{studentData.total_points}</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200 mx-2" />
                  <div className="text-left">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Builds</p>
                     <p className="text-3xl font-black text-slate-900 tracking-tighter">03</p>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="flex-1 mt-10 lg:mt-0 relative z-10 space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Next Milestone: Master Builder</h3>
            <div className="w-full h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${studentData.progress}%` }}
                 className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
               />
            </div>
            <div className="flex flex-wrap gap-3">
               {studentData.badges.map((badge: string, i: number) => (
                  <div key={i} className="px-4 py-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2 shadow-sm">
                     <Zap className="w-3.5 h-3.5 text-amber-500" />
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{badge}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Applications Tracking */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-blue-600" /> Active Applications
               </h3>
               <Button variant="ghost" className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">History <ArrowRight className="w-3.5 h-3.5 ml-2" /></Button>
            </div>
            
            <div className="space-y-4">
                {studentData.applications.map((app: any) => (
                  <Card 
                    key={app.id} 
                    className="bg-white border-slate-200 hover:border-blue-400 transition-all overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl active:scale-[0.98] duration-300"
                    onClick={() => router.push(`/portal/student/projects/${app.id}`)}
                  >
                     <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                              <Code className="w-8 h-8" />
                           </div>
                           
                           <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                 <h4 className="text-xl font-black text-slate-900 tracking-tight italic group-hover:text-blue-600 transition-colors uppercase">{app.title}</h4>
                                 <Badge className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase tracking-widest">{app.status}</Badge>
                              </div>
                              <p className="text-[12px] font-medium text-slate-400">
                                Target PRD: <span className="text-blue-600 font-black italic underline decoration-blue-200 underline-offset-4 group-hover:decoration-blue-600 transition-all">{app.prd}</span>
                              </p>
                           </div>
                           
                           <div className="flex items-center gap-8 pr-4 text-right">
                              <div className="hidden md:block">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted</p>
                                 <p className="text-sm font-bold text-slate-900 italic">{app.date}</p>
                              </div>
                              <div className="bg-slate-50 border border-slate-100 h-12 w-12 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                           </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 relative overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '45%' }}
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 absolute top-0 left-0"
                           />
                        </div>
                     </CardContent>
                  </Card>
               ))}
               
               <Button 
                  className="w-full h-24 rounded-3xl bg-white border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600 text-lg font-black tracking-tight"
                  onClick={() => window.location.href = '/portal/student/challenges'}
               >
                  <Search className="w-6 h-6 mr-3" /> FIND NEW CHALLENGES
               </Button>
            </div>
         </div>

         {/* Side Stats / Community */}
         <div className="lg:col-span-4 space-y-8">
            <Card 
               className="bg-white border-slate-200 shadow-xl relative overflow-hidden group cursor-pointer hover:border-emerald-500 transition-all"
               onClick={() => router.push('/portal/student/leaderboard')}
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
               <CardHeader>
                  <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Award className="w-4 h-4 text-emerald-600" /> Professional Rank
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl font-black text-slate-900 italic">#14</span>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">In Manufacturing AI</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                     VIEW GLOBAL GUILD <ChevronRight className="w-3 h-3" />
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 border-l-4 border-l-purple-600 shadow-md">
               <CardHeader>
                  <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Intelligence Briefing</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                     "Regional sector thesis indicates a <span className="text-slate-900 font-bold underline decoration-blue-600">12% increase</span> in ROI for SME visual inspection tools. Companies like CEED-1 are actively scouting for TRL 4 solutions."
                  </p>
                  <Button variant="link" className="p-0 text-[10px] font-black text-purple-600 uppercase hover:text-purple-500">READ SECTOR THESIS →</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
