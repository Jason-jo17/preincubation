"use client";

import React from 'react';
import { 
  Briefcase, 
  Plus, 
  ChevronRight, 
  Users, 
  MapPin, 
  Calendar,
  Layers,
  BarChart3,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ContentCard } from '@/components/shared/ContentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ProgramsPage() {
  return (
    <DashboardLayout>
    <PageContainer
      title="Incubation & Programs"
      description="Manage large-scale central and regional initiatives across the Maharashtra ecosystem."
      actions={
        <div className="flex gap-3">
            <Button variant="outline" className="h-9 px-4 text-[10px] font-bold uppercase tracking-wider border-slate-200">
               ARCHIVE
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider h-9 px-4 gap-2">
                <Plus className="w-3.5 h-3.5" /> NEW PROGRAM
            </Button>
        </div>
      }
    >
      <div className="space-y-10">
         {/* Top Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Programs', value: '24', icon: Layers, color: 'text-blue-600' },
              { label: 'Total Enrolled', value: '1,450+', icon: Users, color: 'text-purple-600' },
              { label: 'Incubators Joined', value: '42', icon: Building2, color: 'text-emerald-600' },
              { label: 'Completion Rate', value: '68%', icon: BarChart3, color: 'text-amber-600' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                 <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-slate-900">{stat.value}</p>
                 </div>
              </div>
            ))}
         </div>

         {/* Program Groups */}
         <div className="space-y-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Priority Initiatives</h2>
            <div className="grid grid-cols-1 gap-6">
               {[
                 { 
                   name: 'MSME Acceleration 2026', 
                   type: 'State-wide', 
                   status: 'Active', 
                   cohorts: 12, 
                   startups: 145, 
                   tags: ['Industrial 4.0', 'High ROI'],
                   color: 'border-l-blue-500' 
                 },
                 { 
                   name: 'Nagpur Aerospace Cluster', 
                   type: 'Regional Focus', 
                   status: 'Recruiting', 
                   cohorts: 3, 
                   startups: 24, 
                   tags: ['Nagpur', 'Defense'],
                   color: 'border-l-amber-500' 
                 },
                 { 
                   name: 'Women Entrepreneurs (MahaWe)', 
                   type: 'Social Impact', 
                   status: 'Active', 
                   cohorts: 5, 
                   startups: 82, 
                   tags: ['Diversity', 'Grants'],
                   color: 'border-l-emerald-500' 
                 }
               ].map((p, idx) => (
                 <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                 >
                    <ContentCard className={`hover:border-slate-300 transition-all cursor-pointer border-l-4 ${p.color}`}>
                       <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                          <div className="space-y-3">
                             <div className="flex items-center gap-2">
                                <Badge className="bg-slate-100 text-slate-600 font-bold uppercase tracking-widest text-[9px] border-none">
                                   {p.type}
                                </Badge>
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {p.status}
                                </span>
                             </div>
                             <div>
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{p.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                   {p.tags.map(tag => (
                                     <span key={tag} className="text-[9px] font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">#{tag}</span>
                                   ))}
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-8 lg:text-right">
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Cohorts</p>
                                <p className="text-lg font-black">{p.cohorts}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Startups</p>
                                <p className="text-lg font-black">{p.startups}</p>
                             </div>
                             <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                             </Button>
                          </div>
                       </div>
                    </ContentCard>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </PageContainer>
    </DashboardLayout>
  );
}
