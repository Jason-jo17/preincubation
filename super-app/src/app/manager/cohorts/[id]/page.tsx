import React from "react";
import { 
  Users, Target, Zap, ShieldCheck, 
  ArrowLeft, Search, Filter, 
  TrendingUp, Clock, Activity,
  ChevronRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCohortDetails } from "@/app/actions/cohorts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function CohortDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cohortName = decodeURIComponent(id);
  const cohort = await getCohortDetails(cohortName);

  if (!cohort) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-black uppercase italic">Cohort Not Found</h1>
        <Link href="/manager/cohorts">
          <Button variant="outline">Back to Ecosystem</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link href="/manager/cohorts" className="group flex items-center gap-2 text-text-muted hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Ecosystem</span>
          </Link>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                {cohort.name} <span className="text-accent">Node</span>
              </h1>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 uppercase font-black text-[9px] tracking-widest rounded-full px-3">
                Live Stream
              </Badge>
            </div>
            <p className="text-text-secondary font-medium uppercase tracking-widest text-xs">
              Operational Oversight & Mentee Performance Analytics
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-2 rounded-none font-black uppercase italic text-[10px] tracking-widest px-8">
            Batch Validation
          </Button>
          <Button className="bg-accent text-white rounded-none font-black uppercase italic text-[10px] tracking-widest px-8 shadow-xl shadow-accent/20">
            Announce Update
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Innovator Nodes", value: cohort.stats.totalMentees, icon: Users, color: "text-blue-500" },
          { label: "Aggregate TRL", value: `P${cohort.stats.avgTrl.toFixed(1)}`, icon: Target, color: "text-accent" },
          { label: "Active Sprints", value: cohort.stats.activeSprints, icon: Zap, color: "text-amber-500" },
          { label: "Milestones Cleared", value: cohort.stats.completedSprints, icon: ShieldCheck, color: "text-green-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-bg-surface border border-border p-8 rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:scale-110 transition-transform">
              <stat.icon className="w-20 h-20" />
            </div>
            <div className="relative z-10 space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{stat.label}</h4>
              <p className={cn("text-4xl font-black italic tracking-tighter", stat.color)}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mentee List & Advanced Filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Mentee <span className="text-accent">Directory</span></h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search mentees..." 
                className="pl-10 pr-4 py-2 bg-bg-surface border border-border rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-accent/50 w-64"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl border-border">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {cohort.mentees.map((mentee: any) => (
            <div key={mentee.id} className="bg-bg-surface border border-border p-6 rounded-[32px] hover:border-accent/30 transition-all group flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Profile Card */}
              <div className="lg:w-72 shrink-0 flex items-center gap-4">
                <div className="size-16 rounded-3xl bg-bg-base border border-border flex items-center justify-center font-black text-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-inner">
                  {mentee.user.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-black uppercase tracking-tight text-lg leading-tight group-hover:text-accent transition-colors">
                    {mentee.user.name}
                  </h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{mentee.user.email}</p>
                  <div className="flex gap-2 pt-1">
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest py-0">TRL P{mentee.trlLevel}</Badge>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest py-0 bg-blue-500/5 border-blue-500/20 text-blue-500">Node Active</Badge>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Sprints */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Journey Progress</span>
                    <p className="text-xs font-black italic uppercase">Sprint {mentee.sprintNodes.find((s: any) => s.status === 'ACTIVE')?.sprintNumber || 'None Active'}</p>
                  </div>
                  <span className="text-[10px] font-black text-accent">72% Completed</span>
                </div>
                <div className="h-2 w-full bg-bg-base rounded-full border border-border overflow-hidden">
                  <div className="h-full bg-accent w-[72%] shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]" />
                </div>
                <div className="flex gap-2">
                  {mentee.sprintNodes.map((s: any) => (
                    <div 
                      key={s.id} 
                      className={cn(
                        "size-3 rounded-full border",
                        s.status === 'COMPLETED' ? "bg-green-500 border-green-600" :
                        s.status === 'ACTIVE' ? "bg-accent border-accent animate-pulse" :
                        "bg-bg-base border-border"
                      )}
                      title={`Sprint ${s.sprintNumber}: ${s.status}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:w-80 flex items-center justify-end gap-3">
                <Link href={`/assessment/${mentee.id}/validation`}>
                  <Button variant="outline" className="rounded-2xl border-2 font-black uppercase italic text-[9px] tracking-widest px-6 hover:bg-accent hover:text-white transition-all">
                    Validate
                  </Button>
                </Link>
                <Link href={`/manager/mentees/${mentee.id}`}>
                  <Button className="rounded-2xl bg-text-primary text-bg-base font-black uppercase italic text-[9px] tracking-widest px-6 hover:bg-accent transition-all flex items-center gap-2">
                    Profile <ArrowLeft size={12} className="rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-bg-surface border border-border p-10 rounded-[40px] space-y-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Cohort <span className="text-accent">Velocity</span></h3>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-border">
             {[45, 62, 58, 85, 74, 92, 88].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                 <div 
                   className="w-full bg-accent/20 border-t-2 border-accent rounded-t-lg transition-all group-hover:bg-accent group-hover:h-[95%]" 
                   style={{ height: `${h}%` }}
                 />
                 <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-text-muted">Wk {i+1}</span>
               </div>
             ))}
          </div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">
            Innovation throughput increased by <span className="text-green-500">14.2%</span> compared to previous cycle.
          </p>
        </div>

        <div className="bg-bg-surface border border-border p-10 rounded-[40px] space-y-8">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Live <span className="text-accent">Telemetry</span></h3>
          </div>
          <div className="space-y-6">
             {[
               { user: "Sarah Chen", action: "Completed PESTLE Analysis", time: "2m ago" },
               { user: "Marcus Vane", action: "Reached TRL Level P4", time: "15m ago" },
               { user: "InnovateAI", action: "Submitted Project for CEED Review", time: "1h ago" },
               { user: "Alex Rivera", action: "Initialized BMC Iteration 2", time: "3h ago" },
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-bg-base border border-border flex items-center justify-center font-black text-[10px]">
                      {log.user.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-black uppercase tracking-tight">{log.user}</p>
                      <p className="text-[9px] font-bold text-text-muted uppercase">{log.action}</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">{log.time}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
