"use client";

import React from 'react';
import { 
  Cpu, 
  Landmark, 
  Users, 
  Megaphone, 
  Scale, 
  Code,
  Globe,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Search,
  Filter
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ContentCard } from '@/components/shared/ContentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'ERP, Cloud, and Process Automation experts.',
        icon: Cpu,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        count: 42
    },
    {
        id: 'financial-services',
        title: 'Financial Services',
        description: 'Banking, Lending, and VC partners.',
        icon: Landmark,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        count: 28
    },
    {
        id: 'talent-aqua',
        title: 'Talent & HR',
        description: 'Recruitment and corporate training.',
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        count: 15
    },
    {
        id: 'marketing',
        title: 'Marketing & PR',
        description: 'B2B lead generation and branding.',
        icon: Megaphone,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        count: 19
    },
    {
        id: 'legal-ip',
        title: 'Legal & IP',
        description: 'Patent filing and compliance strategy.',
        icon: Scale,
        color: 'text-slate-600',
        bg: 'bg-slate-50',
        count: 12
    },
    {
        id: 'software-ecosystem',
        title: 'Software & SaaS',
        description: 'Cloud infrastructure and business apps.',
        icon: Code,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        count: 36
    }
];

export default function EcosystemPage() {
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const isMsmeShell = pathname.startsWith('/msme');
    const routePrefix = isMsmeShell ? '/msme' : '/ceo';

    return (
        <DashboardLayout>
            <PageContainer
                title="Ecosystem Mapping"
                description="Connect Maharashtra MSMEs with trusted service providers and funding partners."
                actions={
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider h-9 px-4 gap-2">
                        <Plus className="w-3.5 h-3.5" /> ADD PARTNER
                    </Button>
                }
            >
                <div className="space-y-12">

         {/* Search & Stats */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search for providers, VCs, or experts..." 
                        className="pl-10 h-11 bg-white border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <Button variant="outline" className="h-11 px-6 gap-2 rounded-xl border-slate-200 font-bold text-xs uppercase tracking-wider shadow-sm">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
               </div>
            </div>
            <div className="lg:col-span-4">
               <div className="flex items-center justify-around p-4 bg-slate-900 rounded-2xl text-white">
                  <div className="text-center">
                     <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Providers</p>
                     <p className="text-2xl font-black">154</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                     <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Funding Pool</p>
                     <p className="text-2xl font-black">₹450Cr+</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Categories Grid */}
         <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">Browse by Strategic Category</h2>
                <Button variant="ghost" className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] h-auto p-0 hover:bg-transparent">
                    View Network Graph <Globe className="w-3.5 h-3.5 ml-2" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <ContentCard 
                            className="group hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer overflow-hidden p-0"
                            onClick={() => navigate(`${routePrefix}/ecosystem/${cat.id}`)}
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <cat.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="outline" className="border-slate-100 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                                        {cat.count} PARTNERS
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{cat.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {cat.description}
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    EXPLORE DIRECTORY <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </ContentCard>
                    </motion.div>
                ))}
            </div>
         </div>

         {/* Funding Spotlight */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
               <ContentCard title="Active Funding Opportunities" description="Growth indices and credit facilities for MSMEs">
                  <div className="space-y-4">
                     {[
                        { title: 'Maharashtra MSME Credit Line', partner: 'SIDBI', amount: 'Up to ₹2Cr', type: 'Working Capital' },
                        { title: 'Aerospace Excellence Fund', partner: 'MSINS / HDFC', amount: 'Equity: ₹50L-5Cr', type: 'Growth Equity' },
                        { title: 'Green Transformation Subsidy', partner: 'Maha Govt', amount: '25% Offset', type: 'Govt Grant' }
                     ].map((fund, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm font-black text-xs">
                                 {fund.partner.substring(0, 1)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{fund.title}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fund.partner} · {fund.type}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-black text-blue-600">{fund.amount}</p>
                              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Apply Now</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </ContentCard>
            </div>
            <div className="lg:col-span-4">
               <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl text-white space-y-6 shadow-xl relative overflow-hidden">
                  <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/10" />
                  <div className="relative z-10 space-y-4">
                     <div className="p-2 bg-white/20 rounded-lg w-fit">
                        <Award className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-black leading-tight italic">Partner Intelligence Synthesis</h3>
                     <p className="text-sm text-blue-100 leading-relaxed">
                        Our AI engine continuously audits provider quality scores based on real MSME feedback and delivery success rates.
                     </p>
                     <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-[10px] uppercase tracking-wider rounded-xl h-11">
                        VIEW AUDIT CRITERIA
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </PageContainer>
    </DashboardLayout>
  );
}
