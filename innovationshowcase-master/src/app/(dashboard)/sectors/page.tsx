'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SECTORS } from '@/constants/sectors';
import { msmeIntelClient } from '@/lib/msme-intel';

export default function SectorsPage() {
  const [sectorData, setSectorData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSectors() {
      try {
        const data = await msmeIntelClient.syncSectors();
        
        // Map bridged data to UI format
        const mappedData = Array.isArray(data) ? data.map((item: any, idx: number) => {
          // Absolute guarantee of uniqueness using prefixed index
          const uniqueId = `sec-analysis-node-${idx}`;
          return {
            id: uniqueId,
            sectorId: item.sector_id || item.id,
            name: SECTORS.find(s => s.id === (item.sector_id || item.id))?.name || item.title || "Industry Hub",
            gap: item.title || item.gap,
            impact: item.impact_level === 'transformative' ? '₹12.5Cr+' : item.impact_level === 'high' ? '₹8.4Cr' : '₹2.1Cr',
            activeInnovations: item.priority_rank ? (10 + item.priority_rank) : 5
          };
        }) : [];

        if (mappedData.length > 0) {
          console.log("REACT_KEY_FIX: Mapped Sector IDs:", mappedData.map(d => d.id));
        }







        const mockData = [
          { id: 'seafood', name: 'Seafood Export', gap: 'Quality Inspection Bottleneck', impact: '₹4.2Cr', activeInnovations: 12 },
          { id: 'cashew', name: 'Cashew Processing', gap: 'Harvest Yield Prediction', impact: '₹2.8Cr', activeInnovations: 8 },
        ];

        setSectorData(mappedData.length > 0 ? mappedData : mockData);
      } catch (err) {

        console.error('Failed to sync MSME Intel sectors:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSectors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">
             Regional Intelligence v2.0
           </div>
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter italic">Sector Analysis Hub</h1>
           <p className="text-slate-500 font-medium max-w-lg">Real-time quantification of industrial operational gaps and innovation economic impact.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-slate-900">18+</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Sectors Tracked</div>
           </div>
           <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-emerald-600">₹24.5Cr</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Gap Impact</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sector Heatmap / List */}
         <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-2">High-Potential Nodes</h3>
            {sectorData.map((item: any, i: number) => (
              <motion.div 
                key={item.id}





                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                       {SECTORS.find(s => s.id === item.sectorId)?.icon || '🏭'}
                    </div>

                   <div>
                      <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Active Gap:</span>
                        <span className="text-xs text-slate-500 font-medium">{item.gap}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-12 text-right">
                   <div>
                      <div className="text-sm font-black text-slate-900">{item.impact}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Economic Loss</div>
                   </div>
                   <div className="hidden md:block">
                      <div className="text-sm font-black text-emerald-600">{item.activeInnovations}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Innovations</div>
                   </div>
                   <div className="text-slate-300 font-black group-hover:text-amber-500 transition-colors px-2">→</div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* Sidebar: Regional Insights */}
         <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] relative overflow-hidden group shadow-sm">
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
               <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4 relative z-10 italic">Hub Insight</h3>
               <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10 mb-8">
                 Cashew processing units in **Vitla** node are reporting a 30% drop in efficiency due to legacy sorting protocols. AI-vision agents can bridge this gap by Q3.
               </p>
               <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-xl shadow-slate-900/10">
                 Read Full Analysis Report
               </button>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] space-y-6 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Constraints</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Data Latency', val: 'High' },
                    { label: 'API Connectivity', val: 'Intermittent' },
                    { label: 'Compute Availability', val: 'Low' },
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${stat.val === 'High' ? 'text-red-500' : stat.val === 'Low' ? 'text-amber-500' : 'text-emerald-500'}`}>{stat.val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
