'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { msmeIntelClient } from '@/lib/msme-intel';

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        // Fetch bridged companies from the Buisness Intel asset
        const companies = await msmeIntelClient.getCompanies();
        const gaps = await msmeIntelClient.syncSectors();
        
        const mappedMatches = Array.isArray(companies) ? companies.slice(0, 8).map((c: any, i: number) => ({
          id: c.id,
          company: c.name,
          location: c.location || 'Maharashtra Node',
          sector: c.category,
          matchScore: 95 - (i * 2), // Mock score sorting
          gap: gaps[i % gaps.length]?.description || `Seeking ${c.subcategory || 'digital'} optimization for ${c.sector} workflows.`,
          innovation: i % 2 === 0 ? 'Precision Quality Classifier' : 'Predictive Maintenance Node',
          status: i === 0 ? 'URGENT' : i < 3 ? 'MATCHED' : 'IN_REVIEW',
        })) : [];

        const mockMatches = [
          {
            id: 'm1',
            company: 'Coastal Seafoods Pvt Ltd',
            location: 'Mangalore Port Node',
            sector: 'Seafood Export',
            matchScore: 94,
            gap: 'Exporter needs automated quality sorting for shrimp exports to the EU.',
            innovation: 'Precision Seafood Classifier',
            status: 'URGENT',
          },
        ];
        setMatches(mappedMatches.length > 0 ? mappedMatches : mockMatches);
      } catch (err) {

        console.error('Failed to load matches:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/10 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">
             AI Matchmaker Active
           </div>
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter italic">Company Fits</h1>
           <p className="text-slate-500 font-medium max-w-lg">We've scanned 2,400 regional MSMEs to link your breakthroughs with active industrial gaps.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-emerald-600">12</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">High-Signal Fits</div>
           </div>
           <button className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-slate-900/10">
             REFRESH SCAN ⚡
           </button>
        </div>
      </div>

      <div className="space-y-6">
        {matches.map((match: any, i: number) => (
          <motion.div 
            key={match.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, ease: 'backOut' }}
            className="p-10 bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[3rem] group hover:border-amber-500/20 transition-all cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                <div className="flex-1 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">🏭</div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{match.company}</h3>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.location} • {match.sector}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="p-6 bg-slate-50/80 rounded-2.5xl border border-slate-100">
                         <h4 className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em] mb-3">MSME OPERATIONAL GAP</h4>
                         <p className="text-xs text-slate-600 font-medium leading-relaxed">{match.gap}</p>
                      </div>
                      <div className="p-6 bg-amber-500/5 rounded-2.5xl border border-amber-500/10">
                         <h4 className="text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] mb-3">INNOVATION FIT</h4>
                         <p className="text-xs text-slate-900 font-bold">{match.innovation}</p>
                      </div>
                   </div>
                </div>

                <div className="lg:w-48 flex flex-col items-center justify-center gap-6 border-l border-slate-100 lg:pl-12">
                   <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                         <circle className="text-slate-100" strokeWidth="6" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                         <circle className="text-emerald-500 transition-all duration-1000" strokeWidth="6" strokeDasharray={`${match.matchScore * 2.51}, 251.2`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-xl font-black text-slate-900 leading-none">{match.matchScore}%</span>
                         <span className="text-[8px] font-black text-slate-400 uppercase mt-1">FIT</span>
                      </div>
                   </div>

                   <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10">
                      INITIATE OUTREACH
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
