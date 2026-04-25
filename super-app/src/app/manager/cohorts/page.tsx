import React from "react";
import { Users, LayoutGrid, ArrowUpRight, Target, Zap, ShieldCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCohorts } from "@/app/actions/cohorts";
import { cn } from "@/lib/utils";

export default async function MentorCohortsPage() {
  const cohorts = await getCohorts();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Oversight</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Cohort <span className="text-accent">Ecosystem</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Manage and monitor grouped innovator progress across various incubation streams.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="font-black uppercase italic text-[10px] tracking-widest px-8 rounded-none border-2">
            Export Analytics
          </Button>
          <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20">
            Create Cohort
          </Button>
        </div>
      </div>

      {/* Cohort Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cohorts.map((cohort: any) => (
          <div key={cohort.name} className="bg-bg-surface border border-border p-8 rounded-3xl relative overflow-hidden group hover:border-accent/50 transition-all shadow-sm">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
              <LayoutGrid className="w-32 h-32 -mr-12 -mt-12" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">
                    {cohort.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Active Stream</span>
                  </div>
                </div>
                <div className="bg-bg-base border border-border rounded-xl p-3">
                  <Target className="w-5 h-5 text-accent" />
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 p-4 bg-bg-base rounded-2xl border border-border/50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Mentees</p>
                  <p className="text-2xl font-black italic">{cohort.mentees.length}</p>
                </div>
                <div className="space-y-1 p-4 bg-bg-base rounded-2xl border border-border/50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Avg TRL</p>
                  <p className="text-2xl font-black italic">P{cohort.avgTrl.toFixed(1)}</p>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Active Sprints</span>
                    <span className="text-accent">{cohort.activeSprints}</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-base rounded-full overflow-hidden border border-border">
                    <div 
                      className="h-full bg-accent transition-all duration-1000" 
                      style={{ width: `${(cohort.activeSprints / cohort.mentees.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mentee Avatars (Quick Look) */}
              <div className="flex -space-x-3">
                {cohort.mentees.slice(0, 5).map((m: any) => (
                  <div key={m.id} className="w-10 h-10 rounded-full border-4 border-bg-surface bg-bg-base flex items-center justify-center overflow-hidden">
                    {m.user.avatar ? (
                      <img src={m.user.avatar} alt={m.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-black uppercase">{m.user.name.charAt(0)}</span>
                    )}
                  </div>
                ))}
                {cohort.mentees.length > 5 && (
                  <div className="w-10 h-10 rounded-full border-4 border-bg-surface bg-text-primary flex items-center justify-center text-bg-base text-[10px] font-black">
                    +{cohort.mentees.length - 5}
                  </div>
                )}
              </div>

              <Link href={`/manager/cohorts/${encodeURIComponent(cohort.name)}`}>
                <Button className="w-full bg-text-primary text-bg-base font-black uppercase italic py-6 rounded-2xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 group">
                  Enter Cohort Node
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {/* Empty State / Call to Action */}
        <div className="border-4 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 hover:border-accent/30 transition-colors cursor-pointer group">
          <div className="p-6 bg-bg-surface rounded-full border border-border group-hover:bg-accent/5 transition-colors">
            <Plus className="w-12 h-12 text-text-muted group-hover:text-accent transition-colors" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Initialize Stream</h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest max-w-[200px]">Create a new operational cohort for mentorship</p>
          </div>
        </div>
      </div>
    </div>
  );
}
