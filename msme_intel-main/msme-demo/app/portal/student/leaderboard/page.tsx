"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Trophy, 
  Target, 
  Zap, 
  Sparkles, 
  ArrowUp, 
  Award,
  Search,
  Filter,
  Medal,
  ChevronRight,
  ShieldCheck,
  Binary
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

// Mock Leaderboard Data
const MOCK_LEADERBOARD = [
  { id: "s1", name: "Anita R.", points: 8450, builds: 12, precision: 96, category: "ML/CV", avatar: "anita" },
  { id: "s2", name: "Jason G.", points: 7920, builds: 9, precision: 92, category: "Industrial AI", avatar: "jason" },
  { id: "s3", name: "Vikram K.", points: 7100, builds: 14, precision: 88, category: "ERP Sync", avatar: "vikram" },
  { id: "s4", name: "Elena S.", points: 6500, builds: 7, precision: 99, category: "Process Automation", avatar: "elena" },
  { id: "s5", name: "Samir D.", points: 5800, builds: 6, precision: 85, category: "Data Eng", avatar: "samir" }
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div className="container mx-auto p-6 space-y-12 min-h-screen bg-slate-50 animate-in fade-in duration-500">
      <Breadcrumbs 
        items={[
            { label: "Dashboard", href: "/portal/student" },
            { label: "Elite Leaderboard" }
        ]} 
      />
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
         <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
               <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 font-black uppercase tracking-widest text-[10px]">
                  LIVE GUILD STATUS
               </Badge>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">The Precision <span className="text-emerald-600 underline decoration-emerald-500/30">Guild</span>.</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg">
               Quantifying the impact of elite industrial builders across the MSME ecosystem.
            </p>
         </div>

         <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            {["global", "sector", "local"].map(tab => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                     activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
         {MOCK_LEADERBOARD.slice(0, 3).map((student, i) => (
            <motion.div
               key={student.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="relative"
            >
               <Card className={`bg-white border-slate-200 relative overflow-hidden group shadow-xl transition-all hover:shadow-2xl ${i === 0 ? 'ring-2 ring-emerald-500/50 scale-105 z-10' : ''}`}>
                  {/* Decorative Elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full ${i === 0 ? 'bg-emerald-500/10' : i === 1 ? 'bg-blue-500/5' : 'bg-purple-500/5'}`} />
                  
                  <CardContent className="p-8 text-center space-y-6">
                     <div className="relative inline-block">
                        <div className={`w-28 h-28 rounded-full border-4 p-1 bg-white shadow-inner ${i === 0 ? 'border-emerald-500/30' : 'border-slate-100'}`}>
                           <Image 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}`} 
                              alt={student.name} 
                              width={112}
                              height={112}
                              className="w-full h-full rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                           />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl border-2 border-white ${
                           i === 0 ? 'bg-emerald-500 text-white' : i === 1 ? 'bg-slate-100 text-slate-900 border-slate-200' : 'bg-amber-600 text-white border-amber-500'
                        }`}>
                           <Trophy className="w-5 h-5" />
                        </div>
                     </div>

                     <div className="space-y-1">
                        <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter">{student.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{student.category}</p>
                     </div>

                     <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EMI Points</p>
                           <p className="text-xl font-black text-slate-900">{student.points.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precision</p>
                           <p className="text-xl font-black text-emerald-600 italic">{student.precision}%</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="space-y-4">
         <div className="flex justify-between items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md ml-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <Input 
                  placeholder="Filter guild members..." 
                  className="bg-transparent border-none text-slate-900 focus:ring-0 text-sm italic py-0" 
               />
            </div>
            <div className="flex gap-2">
               <Badge variant="outline" className="text-slate-400 border-slate-100 text-[10px] uppercase font-black px-4 cursor-pointer hover:bg-slate-50">Sorting: Highest Payout</Badge>
               <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900 tracking-widest text-[10px] font-black"><Filter className="w-4 h-4 mr-2" /> PARAMETERS</Button>
            </div>
         </div>

         <div className="space-y-2">
            {MOCK_LEADERBOARD.map((student, idx) => (
               <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="bg-white border border-slate-200 hover:border-emerald-500/30 transition-all rounded-2xl p-4 flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md"
               >
                  <div className="flex items-center gap-6">
                     <span className="text-xl font-black text-slate-300 w-8 italic group-hover:text-emerald-500 transition-colors">#{idx + 1}</span>
                     <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
                        <Image 
                           src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}`} 
                           alt="" 
                           width={40}
                           height={40}
                           className="w-full h-full grayscale group-hover:grayscale-0 transition-all shadow-sm" 
                        />
                     </div>
                     <div className="space-y-0.5">
                        <h4 className="text-sm font-black text-slate-900 italic">{student.name}</h4>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="border-none bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-tighter px-2">
                              {student.category}
                           </Badge>
                           <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                              <Binary className="w-3 h-3" /> {student.builds} BUILDS
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-12 pr-6">
                     <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth Velocity</p>
                        <div className="flex items-center justify-end gap-1.5 pt-0.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-xs font-black text-slate-900 italic">+14% / Mo</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EMI POINTS</p>
                        <p className="text-2xl font-black text-emerald-600 tracking-tighter italic">{student.points.toLocaleString()}</p>
                     </div>
                     <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-emerald-500 transition-all hover:bg-emerald-50 rounded-xl">
                        <ChevronRight className="w-5 h-5" />
                     </Button>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
