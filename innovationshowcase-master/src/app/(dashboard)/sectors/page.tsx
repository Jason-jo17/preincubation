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
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent border border-accent/10 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 font-display">
             Regional Intelligence v2.0
           </div>
           <h1 className="text-4xl font-black text-text-primary tracking-tighter italic font-display">Sector Analysis Hub</h1>
           <p className="text-text-secondary font-medium max-w-lg leading-relaxed">Real-time quantification of industrial operational gaps and innovation economic impact.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-6 py-4 bg-bg-surface border border-border rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-text-primary font-display">18+</div>
              <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1 font-display">Sectors Tracked</div>
           </div>
           <div className="px-6 py-4 bg-bg-surface border border-border rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-success font-display">₹24.5Cr</div>
              <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1 font-display">Total Gap Impact</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sector Heatmap / List */}
         <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-6 px-2 font-display">High-Potential Nodes</h3>
            {sectorData.map((item: any, i: number) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-bg-surface/80 backdrop-blur-xl border border-border rounded-3xl flex items-center justify-between hover:bg-bg-surface hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-bg-base border border-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                       {SECTORS.find(s => s.id === item.sectorId)?.icon || '🏭'}
                    </div>

                   <div>
                      <h4 className="text-lg font-black text-text-primary tracking-tight leading-none mb-2 font-display">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest font-display">Active Gap:</span>
                        <span className="text-xs text-text-secondary font-medium">{item.gap}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-12 text-right">
                   <div>
                      <div className="text-sm font-black text-text-primary font-display">{item.impact}</div>
                      <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1 font-display">Economic Loss</div>
                   </div>
                   <div className="hidden md:block">
                      <div className="text-sm font-black text-success font-display">{item.activeInnovations}</div>
                      <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1 font-display">Innovations</div>
                   </div>
                   <div className="text-text-muted font-black group-hover:text-accent transition-colors px-2">→</div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* Sidebar: Regional Insights */}
         <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-accent/5 border border-accent/10 rounded-[2.5rem] relative overflow-hidden group shadow-sm">
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse" />
               <h3 className="text-xl font-black text-text-primary tracking-tighter mb-4 relative z-10 italic font-display">Hub Insight</h3>
               <p className="text-text-secondary text-sm font-medium leading-relaxed relative z-10 mb-8">
                 Cashew processing units in **Vitla** node are reporting a 30% drop in efficiency due to legacy sorting protocols. AI-vision agents can bridge this gap by Q3.
               </p>
               <button className="w-full py-4 bg-text-primary text-bg-surface rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-xl shadow-text-primary/10 font-display">
                 Read Full Analysis Report
               </button>
            </div>

            <div className="p-8 bg-bg-surface border border-border rounded-[2.5rem] space-y-6 shadow-sm">
               <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] font-display">Operational Constraints</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Data Latency', val: 'High' },
                    { label: 'API Connectivity', val: 'Intermittent' },
                    { label: 'Compute Availability', val: 'Low' },
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center bg-bg-base p-3 rounded-xl border border-border">
                       <span className="text-[9px] font-black text-text-muted uppercase tracking-widest font-display">{stat.label}</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest font-display ${stat.val === 'High' ? 'text-danger' : stat.val === 'Low' ? 'text-warning' : 'text-success'}`}>{stat.val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
