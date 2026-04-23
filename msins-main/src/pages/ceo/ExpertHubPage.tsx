"use client";

import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, Clock, MapPin, Building2, ChevronRight, 
  Search, Filter, CheckCircle2, AlertCircle, Bookmark,
  TrendingUp, Award, DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageContainer } from '@/components/shared/PageContainer';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ContentCard } from '@/components/shared/ContentCard';
import { PENDING_REVIEWS_MOCK, MOCK_EXPERT_PROFILE } from '@/data/experts';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ExpertHubPage() {
  const navigate = useNavigate();
  const [pendingReviews, setPendingReviews] = useState<any[]>(PENDING_REVIEWS_MOCK);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = pendingReviews.filter(r => 
    r.company_roadmaps?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.companies?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
    <PageContainer
      title="Expert Review Center"
      description="Validate and enhance AI-generated growth roadmaps for MSMEs"
      actions={
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
            Expert Status: Verified
          </Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
           <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-6 relative overflow-hidden group">
              <Award className="absolute right-[-10px] bottom-[-10px] h-24 w-24 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">{MOCK_EXPERT_PROFILE.name}</p>
                <h3 className="text-xl font-bold tracking-tight">Performance Summary</h3>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-medium text-slate-300">Pending</span>
                    </div>
                    <span className="text-sm font-bold">{MOCK_EXPERT_PROFILE.stats.pending}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-medium text-slate-300">Validated</span>
                    </div>
                    <span className="text-sm font-bold">{MOCK_EXPERT_PROFILE.stats.validated}</span>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-slate-100">Total Earnings</span>
                    </div>
                    <span className="text-lg font-black text-blue-400 tracking-tighter">₹84,000</span>
                 </div>
              </div>
           </div>

           <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-2">My Domains</Label>
              <div className="flex flex-wrap gap-2">
                 {MOCK_EXPERT_PROFILE.expert_domains.map(d => (
                   <Badge key={d} variant="outline" className="px-3 py-1.5 bg-white border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-wider rounded-lg">{d}</Badge>
                 ))}
              </div>
           </div>

           <ContentCard title="Expert Network" description="Peer collaboration Hub" className="bg-slate-50/50 border-none">
              <div className="flex -space-x-2 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shadow-sm">
                    +12
                  </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                Connect with 45+ other experts in the MSME Intelligence network to discuss horizontal scaling patterns.
              </p>
           </ContentCard>
        </aside>

        {/* Main Review List */}
        <div className="lg:col-span-3 space-y-6">
           <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                    placeholder="Search by company or roadmap title..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-white shadow-sm border-slate-200 rounded-xl text-sm"
                 />
              </div>
              <Button variant="outline" className="h-11 px-6 gap-2 rounded-xl border-slate-200 font-bold text-xs uppercase tracking-wider shadow-sm">
                 <Filter className="h-4 w-4" /> Filter
              </Button>
           </div>

           <AnimatePresence mode="wait">
              {loading ? (
                <div className="space-y-4">
                   {[1, 2].map(i => <Card key={i} className="h-40 animate-pulse bg-slate-50/50 border-slate-100" />)}
                </div>
              ) : filteredReviews.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="py-20 text-center border-dashed border-2 border-slate-200 bg-slate-50/10">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <ClipboardCheck className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Queue is clear!</h3>
                    <p className="text-sm text-slate-500 font-medium">Great job! There are no pending reviews for your expertise area.</p>
                  </Card>
                </motion.div>
              ) : (
                <div className="space-y-4">
                   {filteredReviews.map((review, idx) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                         <Card className="group border-slate-200/60 hover:border-blue-300 transition-all shadow-sm hover:shadow-md rounded-2xl overflow-hidden">
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                               <div className="flex-1 p-6 space-y-4">
                                  <div className="flex items-center gap-3">
                                     <Badge className="text-[9px] bg-blue-50 text-blue-700 border-blue-100 font-bold uppercase tracking-wider">Pending Review</Badge>
                                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Clock className="h-3 w-3 text-amber-500" /> Due in 2 days
                                     </span>
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors tracking-tight text-slate-900">
                                       {review.companies?.name} Acceleration
                                    </h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                       <MapPin className="h-3 w-3 text-blue-400" /> {review.companies?.district}, {review.companies?.state}
                                    </p>
                                  </div>
                                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2 group-hover:bg-blue-50/30 transition-colors">
                                     <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Strategic Intent</p>
                                     <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-2">
                                        {review.company_roadmaps?.executive_summary || "Strategic roadmap focusing on digital transformation and market expansion."}
                                     </p>
                                  </div>
                               </div>
                               <div className="md:w-56 bg-white/50 flex flex-col items-center justify-center p-6 space-y-3">
                                  <Button 
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md group-hover:scale-[1.02] transition-transform rounded-xl"
                                    onClick={() => navigate(`/ceo/expert-hub/review/${review.id}`)}
                                  >
                                     Start Review
                                  </Button>
                                  <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 hover:bg-slate-100">Skip / Reassign</Button>
                               </div>
                            </div>
                         </Card>
                      </motion.div>
                   ))}
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </PageContainer>
    </DashboardLayout>
  );
}
