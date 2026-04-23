"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Send,
  Zap,
  Layout,
  MessageSquare,
  ChevronLeft,
  Users,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PRDDetailView from '@/components/buildforx/prd-detail-view';
import { BuildForXPRD } from '@/lib/types/prd';
import { motion } from 'framer-motion';
import { NAGPUR_NEXT_PRDS } from '@/lib/demo-data/prds';

// For the demo, we'll use our high-fidelity Nagpur NEXT registry as a fallback
const MOCK_PRD_FALLBACK = NAGPUR_NEXT_PRDS[0];

export default function PRDDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [prd, setPrd] = useState<BuildForXPRD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPRD = async () => {
      const prdId = params.id as string;
      
      // Demo Mode Search
      if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !prdId) {
        console.log('Demo Mode: Using high-fidelity Nagpur registry for PRD', prdId);
        const localPrd = NAGPUR_NEXT_PRDS.find(p => p.id === prdId || p.slug === prdId);
        setPrd(localPrd || MOCK_PRD_FALLBACK);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/prd/${prdId}`);
        if (!response.ok) {
           // Secondary fallback for demo resilience
           const localPrd = NAGPUR_NEXT_PRDS.find(p => p.id === prdId || p.slug === prdId);
           if (localPrd) {
              setPrd(localPrd);
              setLoading(false);
              return;
           }
           throw new Error('Failed to load challenge');
        }
        const data = await response.json();
        setPrd(data);
      } catch (err: any) {
        setError(err.message);
        // Final safety net for demo consistency
        const localPrd = NAGPUR_NEXT_PRDS.find(p => p.id === prdId || p.slug === prdId);
        if (localPrd) {
           setPrd(localPrd);
           setError(null);
        }
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchPRD();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 space-y-4">
         <div className="w-12 h-12 rounded-full border-t-2 border-blue-600 animate-spin" />
         <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Parsing Design Specs...</p>
      </div>
    );
  }

  if (error || !prd) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 space-y-6 text-center p-6">
         <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center border border-red-200">
            <Zap className="w-10 h-10 text-red-500" />
         </div>
         <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-widest">Challenge Not Found</h2>
            <p className="text-slate-500 font-medium max-w-sm">
               {error || "The requested BuildForX challenge could not be retrieved from the intelligence engine."}
            </p>
         </div>
         <Button 
            className="bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-100"
            onClick={() => router.push('/portal/student/challenges')}
         >
            RETURN TO CATALOG
         </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
         <div className="container mx-auto flex justify-between items-center">
            <Button 
               variant="ghost" 
               className="text-slate-500 hover:text-slate-900 font-bold"
               onClick={() => router.back()}
            >
               <ChevronLeft className="w-5 h-5 mr-1" /> CHALLENGES
            </Button>

            <div className="flex gap-2">
               <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
               </button>
               <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Bookmark className="w-4 h-4" />
               </button>
               <Button 
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 px-6 ml-2 group"
                  onClick={() => router.push(`/portal/student/submit/${params.id}`)}
               >
                  SUBMIT SOLUTION <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
               </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl p-6 md:p-12 items-start gap-12">
         {/* PRD Main View */}
         <PRDDetailView prd={prd} />
         
         {/* Sidebar Actions / Discussion */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-200">
            <div className="md:col-span-1 space-y-6">
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <Users className="w-4 h-4 text-blue-500" /> Resources Provided
                  </h4>
                  <ul className="space-y-4">
                     <li className="flex gap-3 hover:bg-white p-3 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer shadow-sm group">
                        <div className="p-2.5 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform">
                           <Layout className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs font-black text-slate-900 uppercase">Sample Dataset</p>
                           <p className="text-[10px] text-slate-500 font-medium">5,000 Labelled parts (PNG)</p>
                        </div>
                     </li>
                     <li className="flex gap-3 hover:bg-white p-3 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer shadow-sm group">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500 group-hover:scale-110 transition-transform">
                           <FileText className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs font-black text-slate-900 uppercase">PLC API Docs</p>
                           <p className="text-[10px] text-slate-500 font-medium">Modbus/TCP register map</p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="md:col-span-2 space-y-6">
               <div className="bg-white p-8 rounded-3xl border border-slate-200 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-6 py-16 shadow-sm">
                  <div className="p-5 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                     <MessageSquare className="w-10 h-10 text-slate-300" />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-slate-900 font-black text-lg tracking-tight italic">Have questions for the company?</h4>
                     <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">Join the discussion board for this PRD to clarify requirements with technical mentors.</p>
                  </div>
                  <Button className="bg-slate-900 hover:bg-black text-white font-black text-[11px] uppercase tracking-widest h-11 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
                     JOIN DISCUSSION
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
