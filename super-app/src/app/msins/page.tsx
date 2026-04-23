import React from "react";
import Link from "next/link";
import { 
  Banknote, 
  Rocket, 
  BriefcaseBusiness, 
  Building2, 
  Users, 
  Lightbulb, 
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { platformKpis, platformPipeline } from "@/data/msins";
import { cn } from "@/lib/utils";

export default function MsinsDashboardPage() {
  const heroKpis = [
    { label: "Funds Deployed", value: `₹${platformKpis.fundsDeployedCr} Cr`, trend: "+6.2%", icon: Banknote },
    { label: "Startups Registered", value: `${platformKpis.startupsRegistered}`, trend: "+11%", icon: Rocket },
    { label: "Jobs Created", value: `${platformKpis.jobsCreated.toLocaleString()}`, trend: "+9.5%", icon: BriefcaseBusiness },
    { label: "MSMEs Benefited", value: `${platformKpis.msmesBenefited.toLocaleString()}`, trend: "+7.3%", icon: Building2 },
    { label: "Students Mobilized", value: `${platformKpis.studentsMobilized.toLocaleString()}`, trend: "+14%", icon: Users },
    { label: "Innovation Projects", value: `${platformKpis.activeInnovationProjects}`, trend: "+4.1%", icon: Lightbulb },
    { label: "ROI Index", value: `${platformKpis.roiIndex}x`, trend: "+0.4x", icon: TrendingUp },
  ];

  const funnelPreview = [
    { stage: "Talent Pool", value: platformPipeline.talentPool.toLocaleString(), color: "bg-accent" },
    { stage: "Teams Formed", value: platformPipeline.teamsFormed.toLocaleString(), color: "bg-accent/80" },
    { stage: "Active Projects", value: platformPipeline.projectsInCohorts.toLocaleString(), color: "bg-accent/60" },
    { stage: "MSME Pilots", value: platformPipeline.msmePilots.toLocaleString(), color: "bg-accent/40" },
    { stage: "Startups", value: platformKpis.startupsRegistered.toLocaleString(), color: "bg-accent/20" },
  ];

  return (
    <div className="p-8 lg:p-12 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase tracking-widest">
        <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-text-primary">MSINS Platform</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
          <Target className="w-3 h-3" />
          State Governance Node
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">MSINS <span className="text-accent">DASHBOARD</span></h1>
            <p className="text-text-secondary max-w-xl font-medium leading-relaxed">
              Consolidated executive view of the Maharashtra State Innovation Society ecosystem performance and regional impact.
            </p>
          </div>
          <Button size="lg" className="h-14 px-8 rounded-2xl gap-2 font-black shadow-2xl shadow-accent/20">
            Export Report
            <ArrowUpRight className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {heroKpis.map((kpi, i) => (
          <Link key={i} href={kpi.label === "Innovation Projects" ? "/showcase" : "#"}>
            <Card className="bg-bg-surface border-border hover:border-accent/40 transition-all group h-full">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-bg-raised text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <kpi.icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-success/20 text-success bg-success/5">
                    {kpi.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">{kpi.label}</p>
                  <p className="text-2xl font-black mt-2 tracking-tight">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Main Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funnel */}
        <Card className="lg:col-span-2 bg-bg-surface border-border">
          <CardHeader className="p-8 border-b border-border">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Ecosystem Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {funnelPreview.map((f, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{f.stage}</span>
                  <span className="text-sm font-mono font-black">{f.value}</span>
                </div>
                <div className="h-3 rounded-full bg-bg-raised overflow-hidden border border-border/50 p-0.5">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", f.color)}
                    style={{ width: `${100 - (i * 15)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Priority Actions */}
        <div className="space-y-6">
          <Card className="bg-bg-surface border-border">
            <CardHeader className="p-6 border-b border-border">
              <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-warning" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { label: 'On Track Regions', value: '4', color: 'text-success' },
                { label: 'Needs Attention', value: '2', color: 'text-warning' },
                { label: 'Critical Risks', value: '1', color: 'text-danger' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-bg-raised border border-border">
                  <span className="text-xs font-bold text-text-secondary">{item.label}</span>
                  <span className={cn("text-xl font-black", item.color)}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-bg-surface border-accent/20 border-2">
            <CardHeader className="p-6 border-b border-accent/10">
              <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5" />
                Growth Opps
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {[
                "Aerospace supplier network rising",
                "Agri automation demand increasing",
                "EV component startups accelerating",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
                  <p className="text-xs font-bold text-text-secondary leading-tight">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="flex items-center gap-4 p-4 rounded-2xl bg-bg-raised border border-border text-xs text-text-muted">
        <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <TrendingUp className="w-4 h-4" />
        </div>
        <p className="font-medium">
          Deep diagnostics and comparative drilldowns are synced from the <span className="text-text-primary font-bold">Regional Intelligence Hub</span>.
        </p>
        <Button variant="link" className="text-accent p-0 h-auto font-black ml-auto">OPEN HUB</Button>
      </footer>
    </div>
  );
}
