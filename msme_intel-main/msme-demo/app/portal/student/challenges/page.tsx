"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Sparkles,
  Rocket,
  Award,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Binary,
  Users
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PRDCard from '@/components/buildforx/prd-card';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { NAGPUR_NEXT_PRDS } from '@/lib/demo-data/prds';

export default function StudentChallengesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [prds, setPrds] = useState(NAGPUR_NEXT_PRDS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPRDs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/buildforx-prd/published');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPrds(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch PRDs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPRDs();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen bg-slate-50 animate-in fade-in duration-500">
      <Breadcrumbs 
        items={[
            { label: "Dashboard", href: "/portal/student" },
            { label: "Challenge Catalog" }
        ]} 
      />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl p-8 md:p-12">
         {/* Background elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full -ml-20 -mb-20" />
         
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 mb-4">
               <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] tracking-widest px-3 uppercase">
                  ACTIVE CHALLENGES
               </Badge>
               <span className="text-slate-400 font-bold text-xs italic">• BuildForX 2026 Season</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter max-w-3xl leading-[0.9]">
               Solve Real <span className="text-blue-600 italic">Industry</span> Problems. <br />
               Earn <span className="text-emerald-600">EMI</span> Points.
            </h1>
            
            <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed px-2">
               Access high-fidelity PRDs generated directly from MSME automation needs. Build solutions, win prizes, and get noticed by top regional companies.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
               <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 text-lg group shadow-lg">
                  EXPLORE PRDs <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
               <Button variant="outline" className="h-12 px-8 border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 shadow-sm transition-all">
                  MY SUBMISSIONS
               </Button>
            </div>
         </div>
         
         {/* Floating Stats */}
         <div className="absolute top-12 right-12 hidden lg:flex flex-col gap-4">
            <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-4 rounded-2xl w-48 shadow-2xl">
               <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                     <Award className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prize Pool</span>
               </div>
               <p className="text-2xl font-black text-slate-900 italic">₹2.5M+</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-4 rounded-2xl w-48 translate-x-8 shadow-2xl">
               <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                     <Users className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Teams</span>
               </div>
               <p className="text-2xl font-black text-slate-900 italic">142</p>
            </div>
         </div>
      </div>

      {/* Explore Strategy Group (The "Explore" Button/Banner requested) */}
      <div className="bg-blue-600 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
               <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
               <h3 className="text-xl font-black text-white tracking-tight">Master the Industry Strategy.</h3>
               <p className="text-blue-100 text-sm font-medium">Deep dive into our <span className="font-bold text-white underline decoration-white/30 underline-offset-4">Global Sector Thesis</span> to understand the "Why" behind these challenges.</p>
            </div>
         </div>
         <Button 
            variant="outline" 
            className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-xl backdrop-blur-sm transition-all"
            onClick={() => router.push('/sectors')}
         >
            EXPLORE STRATEGY <ArrowRight className="w-4 h-4 ml-2" />
         </Button>
      </div>

      {/* Main Catalog Section */}
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto scroller-hide w-full md:w-auto shadow-sm">
               {['all', 'makeathon', 'ideation', 'gig'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-6 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
                       activeTab === t 
                       ? 'bg-blue-600 text-white shadow-lg' 
                       : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
               ))}
            </div>
            
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <Input 
                  placeholder="Filter by tech or sector..." 
                  className="pl-9 bg-white border-slate-200 text-slate-900 h-11 shadow-sm" 
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prds.filter(p => activeTab === 'all' || p.competition_type === activeTab).map((prd: any, idx) => (
              <motion.div
                key={prd.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <PRDCard 
                   prd={prd} 
                   onView={(id) => window.location.href = `/portal/student/challenges/${id}`}
                />
              </motion.div>
            ))}
         </div>
      </div>

      {/* Featured Sectors / Skill Tags */}
      <div className="pt-8 border-t border-slate-200">
         <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Trending Skills In Demand</h3>
         <div className="flex flex-wrap gap-4">
            {[
               { icon: BrainCircuit, label: 'Computer Vision', color: 'blue' },
               { icon: TrendingUp, label: 'Predictive Analytics', color: 'emerald' },
               { icon: Sparkles, label: 'Generative AI', color: 'purple' },
               { icon: Binary, label: 'Data Engineering', color: 'amber' },
               { icon: Rocket, label: 'IoT Edge', color: 'pink' }
            ].map((skill, i) => (
               <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group shadow-sm">
                  <skill.icon className={`w-5 h-5 text-${skill.color}-600 group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-bold text-slate-600">{skill.label}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
