"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Flame, 
  TrendingUp, 
  Zap, 
  Search, 
  ExternalLink,
  Users,
  Eye,
  Rocket,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const LEADERBOARD_DATA = [
  {
    id: '1',
    rank: 1,
    title: 'Precision Seafood Classifier',
    shortDescription: 'AI-driven quality assessment for seafood export.',
    ceedScore: 9.2,
    deployments: 12,
    views: 1250,
    activeUsers: 45,
    creator: 'Adithya Shenoy',
    trend: 'up',
    tags: ['DISRUPTION', 'AI']
  },
  {
    id: '2',
    rank: 2,
    title: 'Hospitality Concierge Bot',
    shortDescription: 'Automated guest inquiry handling for boutique hotels.',
    ceedScore: 8.8,
    deployments: 42,
    views: 2300,
    activeUsers: 120,
    creator: 'Rohan Shetty',
    trend: 'up',
    tags: ['EFFICIENCY', 'CHATBOT']
  },
  {
    id: '3',
    rank: 3,
    title: 'Cashew Yield Predictor',
    shortDescription: 'Satellite imagery processing for forecast harvest volume.',
    ceedScore: 8.5,
    deployments: 5,
    views: 890,
    activeUsers: 18,
    creator: 'Priya D\'Souza',
    trend: 'down',
    tags: ['AGRITECH', 'ML']
  },
  {
    id: '4',
    rank: 4,
    title: 'Smart Logistics Node',
    shortDescription: 'Real-time supply chain monitoring for local SMEs.',
    ceedScore: 7.9,
    deployments: 8,
    views: 650,
    activeUsers: 32,
    creator: 'Karthik Prabhu',
    trend: 'neutral',
    tags: ['IOT', 'LOGISTICS']
  }
];

export default function ShowcaseLeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = LEADERBOARD_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Excellence Matrix</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Innovation <span className="text-accent">Leaderboard</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Discover the highest-performing industrial automations ranked by deployment impact and CEED score.
          </p>
        </div>
        <div className="flex gap-4 p-2 bg-bg-surface border border-border rounded-xl">
           <div className="flex flex-col items-center px-4 border-r border-border">
              <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">Total Score</span>
              <span className="text-lg font-black italic">420.5</span>
           </div>
           <div className="flex flex-col items-center px-4">
              <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">Global Rank</span>
              <span className="text-lg font-black italic text-accent">#12</span>
           </div>
        </div>
      </div>

      {/* Podium (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEADERBOARD_DATA.slice(0, 3).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "relative group p-8 rounded-3xl overflow-hidden border-2 transition-all",
              idx === 0 ? "bg-accent text-white border-accent scale-105 z-10 shadow-2xl shadow-accent/20" : "bg-bg-surface border-border hover:border-accent/30"
            )}
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Trophy className="w-24 h-24 -mr-12 -mt-12" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-inner",
                  idx === 0 ? "bg-white/20" : "bg-bg-base text-text-primary"
                )}>
                  {item.rank}
                </div>
                <div className="flex flex-col items-end">
                   <span className={cn("text-[8px] font-black uppercase tracking-widest", idx === 0 ? "text-white/70" : "text-text-muted")}>CEED Score</span>
                   <span className="text-3xl font-black italic tracking-tighter">{item.ceedScore}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black italic leading-none uppercase tracking-tighter">{item.title}</h3>
                <p className={cn("text-[10px] font-bold uppercase tracking-wide line-clamp-1", idx === 0 ? "text-white/80" : "text-text-muted")}>BY {item.creator}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                 <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest opacity-70"><Rocket className="w-3 h-3" /> Deploys</div>
                    <div className="text-sm font-black">{item.deployments}</div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest opacity-70"><Users className="w-3 h-3" /> Users</div>
                    <div className="text-sm font-black">{item.activeUsers}</div>
                 </div>
              </div>

              <Button className={cn(
                "w-full font-black uppercase italic text-[10px] tracking-widest rounded-none h-12 transition-all",
                idx === 0 ? "bg-white text-accent hover:bg-white/90" : "bg-bg-base text-text-primary hover:bg-accent hover:text-white"
              )}>
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full List */}
      <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
             <h3 className="text-sm font-black uppercase tracking-widest">Global Ranking</h3>
             <div className="px-2 py-1 bg-success/10 text-success text-[8px] font-black rounded uppercase tracking-widest border border-success/20">LIVE DATA</div>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search matrix..." 
              className="pl-10 bg-bg-base border-border h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((item) => (
            <div key={item.id} className="p-6 hover:bg-bg-base transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-10 h-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center font-black italic group-hover:border-accent/50 group-hover:text-accent transition-all shadow-sm">
                  {item.rank}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-black italic uppercase tracking-tight group-hover:text-accent transition-all">{item.title}</h4>
                    <div className="flex gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[7px] font-black px-1.5 py-0.5 bg-bg-surface border border-border text-text-muted rounded uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-black text-text-muted uppercase tracking-widest">
                    <span>{item.creator}</span>
                    <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" />{item.views} VIEWS</span>
                    <span className="flex items-center gap-1.5 text-accent"><Flame className="w-3 h-3" />{item.ceedScore} CEED</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right px-4 border-r border-border md:block hidden">
                   <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Deployments</div>
                   <div className="text-sm font-black italic">{item.deployments}</div>
                </div>
                <Button variant="outline" size="sm" className="font-black uppercase italic text-[9px] tracking-widest h-10 px-6 rounded-none group-hover:bg-accent group-hover:text-white transition-all">
                  Inspect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
