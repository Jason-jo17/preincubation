import React from "react";
import { getMenteeById } from "@/app/actions/assessment";
import {
  ArrowLeft,
  Rocket,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  Clock,
  TrendingUp,
  Package,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Circle,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function MenteeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getMenteeById(id);
  const mentee = result.success && result.data ? (result.data as any) : null;

  if (!mentee) return notFound();

  const profile = mentee.menteeProfile;
  const readiness = mentee.latestReadiness;
  const levels = (readiness?.levels as any) || {};
  const startup = mentee.startupProfile;

  const readinessMetrics = [
    { key: "trl", label: "TRL", color: "text-blue-500", bg: "bg-blue-500/10" },
    { key: "crl", label: "CRL", color: "text-purple-500", bg: "bg-purple-500/10" },
    { key: "irl", label: "IRL", color: "text-green-500", bg: "bg-green-500/10" },
    { key: "mrl", label: "MRL", color: "text-orange-500", bg: "bg-orange-500/10" },
    { key: "brl", label: "BRL", color: "text-pink-500", bg: "bg-pink-500/10" },
    { key: "frl", label: "FRL", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const sprintNodes = profile?.sprintNodes || [];
  const completedSprints = sprintNodes.filter((s: any) => s.status === "COMPLETED").length;
  const activeSprint = sprintNodes.find((s: any) => s.status === "ACTIVE");

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      {/* Breadcrumb + Header */}
      <div className="space-y-6">
        <Link
          href="/manager/mentees"
          className="group flex items-center gap-2 text-text-muted hover:text-accent transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Back to Mentee Directory
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent text-3xl font-black shadow-xl shadow-accent/10">
              {mentee.name?.charAt(0) || "?"}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                  {startup?.startupName || mentee.name}
                </h1>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 uppercase font-black text-[9px] tracking-widest rounded-full px-3">
                  Active Node
                </Badge>
              </div>
              <p className="text-text-muted font-bold uppercase tracking-widest text-xs">
                Founder: {mentee.name} &bull; {mentee.email}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {profile?.cohort && (
                  <Badge variant="outline" className="font-black uppercase text-[9px] tracking-widest">
                    Cohort: {profile.cohort}
                  </Badge>
                )}
                {readiness?.stage && (
                  <Badge
                    variant="outline"
                    className="font-black uppercase text-[9px] tracking-widest border-accent/30 text-accent"
                  >
                    {readiness.stage}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/assessment/${id}/validation`}>
              <Button
                variant="outline"
                className="border-2 rounded-none font-black uppercase italic text-[10px] tracking-widest px-8"
              >
                Validate Assessment
              </Button>
            </Link>
            <Link href={`/assessment/${id}/notes`}>
              <Button className="bg-accent text-white rounded-none font-black uppercase italic text-[10px] tracking-widest px-8 shadow-xl shadow-accent/20">
                Add Mentor Notes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Tool Submissions",
            value: mentee.toolSubmissions?.length || 0,
            icon: Package,
            color: "text-purple-500",
          },
          {
            label: "Sprints Completed",
            value: completedSprints,
            icon: ShieldCheck,
            color: "text-green-500",
          },
          {
            label: "Active Sprint",
            value: activeSprint ? `#${activeSprint.sprintNumber}` : "None",
            icon: Zap,
            color: "text-accent",
          },
          {
            label: "Assessments Run",
            value: mentee.assessments?.length || 0,
            icon: BarChart3,
            color: "text-blue-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-bg-surface border border-border p-6 rounded-[28px] flex flex-col gap-3 relative overflow-hidden group hover:border-accent/30 transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.04] group-hover:scale-110 transition-transform">
              <stat.icon className="w-16 h-16" />
            </div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">
              {stat.label}
            </h4>
            <p className={cn("text-3xl font-black italic tracking-tighter", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Readiness Matrix */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-bg-surface border border-border p-8 rounded-[32px] space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-black italic uppercase tracking-tighter">
                Readiness <span className="text-accent">Matrix</span>
              </h2>
            </div>

            {readiness ? (
              <div className="space-y-4">
                {readinessMetrics.map((m) => {
                  const val = levels[m.key] || 0;
                  const pct = (val / 9) * 100;
                  return (
                    <div key={m.key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                          {m.label}
                        </span>
                        <span className={cn("text-sm font-black italic", m.color)}>
                          L{val}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-bg-base rounded-full border border-border overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000", m.color.replace("text-", "bg-"))}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="pt-4 border-t border-border space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Overall Stage</p>
                  <p className="text-xl font-black italic uppercase tracking-tighter text-accent">
                    {readiness.stage || "Seed"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Activity className="w-10 h-10 text-border mx-auto" />
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  No readiness assessment recorded yet
                </p>
                <Link href={`/assessment/new`}>
                  <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase tracking-widest mt-2">
                    Run Diagnostic
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Startup Info */}
          {startup && (
            <div className="bg-bg-surface border border-border p-8 rounded-[32px] space-y-5">
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-black italic uppercase tracking-tighter">
                  Startup <span className="text-accent">Profile</span>
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Startup Name", value: startup.startupName },
                  { label: "Industry", value: startup.industry },
                  { label: "Stage", value: startup.stage },
                  { label: "Location", value: startup.location },
                ].filter(f => f.value).map((field, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">
                      {field.label}
                    </span>
                    <span className="text-sm font-bold">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sprint Timeline + Tool Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sprint Journey */}
          <div className="bg-bg-surface border border-border p-8 rounded-[32px] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-black italic uppercase tracking-tighter">
                  Sprint <span className="text-accent">Journey</span>
                </h2>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                {completedSprints} / {sprintNodes.length} Complete
              </span>
            </div>

            {sprintNodes.length > 0 ? (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-border" />
                <div className="space-y-4">
                  {sprintNodes.map((sprint: any, i: number) => (
                    <div key={sprint.id} className="flex items-start gap-4 relative">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
                          sprint.status === "COMPLETED"
                            ? "bg-green-500 border-green-500 text-white"
                            : sprint.status === "ACTIVE"
                            ? "bg-accent border-accent text-white animate-pulse"
                            : "bg-bg-base border-border text-text-muted"
                        )}
                      >
                        {sprint.status === "COMPLETED" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : sprint.status === "ACTIVE" ? (
                          <Zap className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "flex-1 p-4 rounded-2xl border transition-all",
                          sprint.status === "ACTIVE"
                            ? "border-accent/30 bg-accent/5"
                            : "border-border bg-bg-base"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black uppercase tracking-tight">
                            Sprint {sprint.sprintNumber}
                            {sprint.status === "ACTIVE" && (
                              <span className="ml-2 text-[9px] text-accent font-black uppercase tracking-widest">
                                • In Progress
                              </span>
                            )}
                          </h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[8px] font-black uppercase tracking-widest py-0",
                              sprint.status === "COMPLETED" && "border-green-500/20 text-green-500 bg-green-500/5",
                              sprint.status === "ACTIVE" && "border-accent/30 text-accent bg-accent/5",
                              sprint.status === "PENDING" && "border-border text-text-muted"
                            )}
                          >
                            {sprint.status}
                          </Badge>
                        </div>
                        {sprint.goal && (
                          <p className="text-[10px] text-text-muted font-medium mt-1">{sprint.goal}</p>
                        )}
                        {sprint.completedAt && (
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(sprint.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Zap className="w-10 h-10 text-border mx-auto" />
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  No sprint nodes initialized yet
                </p>
              </div>
            )}
          </div>

          {/* Tool Submissions */}
          <div className="bg-bg-surface border border-border p-8 rounded-[32px] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-black italic uppercase tracking-tighter">
                  Tool <span className="text-accent">Activity</span>
                </h2>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                {mentee.toolSubmissions?.length || 0} Submissions
              </span>
            </div>

            {mentee.toolSubmissions?.length > 0 ? (
              <div className="divide-y divide-border">
                {mentee.toolSubmissions.slice(0, 8).map((sub: any, i: number) => (
                  <div
                    key={i}
                    className="py-4 flex items-center justify-between group hover:bg-bg-base/50 -mx-2 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Package className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-tight">
                          {sub.toolId}
                        </p>
                        <p className="text-[9px] font-bold text-text-muted uppercase">
                          {sub.status || "Completed"} &bull; {new Date(sub.updatedAt || sub.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Package className="w-10 h-10 text-border mx-auto" />
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  No tool submissions yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
