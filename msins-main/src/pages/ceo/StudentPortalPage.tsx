"use client";

import React from 'react';
import { 
  Trophy, 
  Target, 
  Users, 
  Zap,
  ArrowRight,
  Plus,
  Rocket,
  Search,
  BookOpen
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ContentCard } from '@/components/shared/ContentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';

export default function StudentPortalPage() {
  return (
    <DashboardLayout>
    <PageContainer
      title="Student Innovation Portal"
      description="Nurturing the next generation of Maharashtra's industrial innovators."
      actions={
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-wider h-9 px-4 gap-2">
            <Rocket className="w-3.5 h-3.5" /> LAUNCH CHALLENGE
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Challenges & Participation */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Active <span className="text-indigo-600">Grand Challenges</span></h2>
              <div className="flex gap-2">
                 <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 uppercase tracking-widest text-[9px] font-bold">12 Active</Badge>
                 <Badge className="bg-blue-50 text-blue-700 border-blue-100 uppercase tracking-widest text-[9px] font-bold">₹25L Prizes</Badge>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Maharashtra Fintech 2026', 
                  category: 'Fintech', 
                  participants: '1,200+', 
                  daysLeft: 14, 
                  progress: 65,
                  image: 'bg-blue-600'
                },
                { 
                  title: 'Green Nagpur Industrial Hack', 
                  category: 'Sustainability', 
                  participants: '850', 
                  daysLeft: 5, 
                  progress: 88,
                  image: 'bg-emerald-600'
                }
              ].map((challenge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ContentCard className="group hover:border-indigo-400 transition-all p-0 overflow-hidden">
                    <div className={`h-2 ${challenge.image}`} />
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[9px] uppercase tracking-widest">{challenge.category}</Badge>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                           <Users className="w-3 h-3" /> {challenge.participants}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{challenge.title}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <span>Application Progress</span>
                          <span>{challenge.daysLeft} days left</span>
                        </div>
                        <Progress value={challenge.progress} className="h-1.5" />
                      </div>
                      
                      <Button variant="ghost" className="w-full text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:bg-indigo-50 transition-all gap-2">
                         VIEW CHALLENGE <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </ContentCard>
                </motion.div>
              ))}
           </div>

           <ContentCard title="Innovation Curriculum" description="Micro-credentials for industrial founders">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {[
                   { title: 'Market Sizing 101', icon: Target, students: 4500 },
                   { title: 'Industrial IoT', icon: Zap, students: 2800 },
                   { title: 'Product-Led Growth', icon: Rocket, students: 3100 }
                 ].map((course, idx) => (
                   <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                      <course.icon className="w-5 h-5 text-indigo-500 mb-3" />
                      <p className="text-sm font-bold text-slate-900 mb-1">{course.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.students} Enrolled</p>
                   </div>
                 ))}
              </div>
           </ContentCard>
        </div>

        {/* Right Column: Talent Stats */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-6 relative overflow-hidden group">
              <Trophy className="absolute right-[-10px] bottom-[-10px] h-24 w-24 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xl font-bold tracking-tight relative z-10">Talent Dashboard</h3>
              <div className="space-y-4 relative z-10">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Total Innovators Registered</p>
                    <p className="text-3xl font-black tabular-nums">12,450</p>
                    <div className="mt-2 flex items-center gap-1.5">
                       <span className="text-emerald-400 text-[10px] font-bold">+15% vs LY</span>
                       <Progress value={75} className="h-1 bg-white/10 flex-1" />
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Companies Hiring</p>
                    <p className="text-3xl font-black tabular-nums">482</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Scholarships Disbursed</p>
                    <p className="text-3xl font-black tabular-nums">₹1.2Cr</p>
                 </div>
              </div>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-bold text-[10px] uppercase tracking-wider relative z-10">
                 DOWNLOAD TALENT REPORT
              </Button>
           </div>

           <ContentCard title="Top Performing Clusters" description="By student participation">
              <div className="space-y-4">
                 {[
                   { name: 'Pune Metros', score: 98 },
                   { name: 'Mumbai MMR', score: 95 },
                   { name: 'Nagpur Core', score: 88 },
                   { name: 'Aurangabad Industrial', score: 82 }
                 ].map((cluster, idx) => (
                   <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                         <span>{cluster.name}</span>
                         <span>{cluster.score}%</span>
                      </div>
                      <Progress value={cluster.score} className="h-1 bg-slate-100" />
                   </div>
                 ))}
              </div>
           </ContentCard>
        </div>
      </div>
    </PageContainer>
    </DashboardLayout>
  );
}
