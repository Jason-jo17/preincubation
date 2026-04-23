import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunnelConversionChart } from "@/components/dashboard/msme/FunnelConversionChart";
import { SectorDistributionChart } from "@/components/dashboard/msme/SectorDistributionChart";
import { MarketShareGrowthChart } from "@/components/dashboard/msme/MarketShareGrowthChart";
import { GeographicHeatmap } from "@/components/dashboard/msme/GeographicHeatmap";
import { funnelDataMock, sectorDistributionMock, marketShareMock, geoDistributionMock } from "@/data/msme-intelligence";
import {
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Lightbulb,
  LayoutGrid,
  Map as MapIcon,
  PieChart,
  Rocket,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { platformKpis, platformPipeline } from "@/data/ceo-regional-intelligence";

const heroKpis = [
  { label: "Funds Deployed", value: `₹${platformKpis.fundsDeployedCr} Cr`, trend: "+6.2%", positive: true, icon: Banknote, to: "/funds" },
  { label: "Startups Registered", value: `${platformKpis.startupsRegistered}`, trend: "+11%", positive: true, icon: Rocket, to: "/startups" },
  { label: "Jobs Created", value: `${platformKpis.jobsCreated.toLocaleString()}`, trend: "+9.5%", positive: true, icon: BriefcaseBusiness, to: "/startups" },
  { label: "MSMEs Benefited", value: `${platformKpis.msmesBenefited.toLocaleString()}`, trend: "+7.3%", positive: true, icon: Building2, to: "/msme" },
  { label: "Students Mobilized", value: `${platformKpis.studentsMobilized.toLocaleString()}`, trend: "+14%", positive: true, icon: Users, to: "/cohorts" },
  { label: "Active Innovation Projects", value: `${platformKpis.activeInnovationProjects}`, trend: "+4.1%", positive: true, icon: Lightbulb, to: "/pipeline" },
  { label: "ROI Index", value: `${platformKpis.roiIndex}x`, trend: "+0.4x", positive: true, icon: TrendingUp, to: "/reports" },
] as const;

const systemHealth = [
  { label: "On Track Regions", value: 4, tone: "text-emerald-600", to: "/regional?status=on-track" },
  { label: "Needs Attention", value: 2, tone: "text-amber-600", to: "/regional?status=attention" },
  { label: "Critical Risks", value: 1, tone: "text-rose-600", to: "/regional?status=critical" },
  { label: "Emerging Bets", value: 3, tone: "text-sky-600", to: "/regional?status=emerging" },
] as const;

const funnelPreview = [
  { stage: "Applicants", value: `${platformPipeline.talentPool.toLocaleString()}` },
  { stage: "Teams", value: `${platformPipeline.teamsFormed.toLocaleString()}` },
  { stage: "Projects", value: `${platformPipeline.projectsInCohorts.toLocaleString()}` },
  { stage: "Pilots", value: `${platformPipeline.msmePilots.toLocaleString()}` },
  { stage: "Startups", value: `${platformKpis.startupsRegistered}` },
  { stage: "Scale Impact", value: `${platformKpis.jobsCreated.toLocaleString()} Jobs` },
] as const;

const interventions = [
  "Nagpur underperforming despite ₹8 Cr deployed",
  "Nashik mentor shortage slowing cohorts",
  "2 incubators low fund utilization",
  "Pune EV model ready to replicate",
] as const;

const opportunities = [
  "Aerospace supplier network rising",
  "Agri automation demand increasing",
  "EV component startups accelerating",
  "Defence manufacturing pipeline emerging",
] as const;

const recentActivity = [
  "₹1 Cr approved for Nashik lab",
  "Pune cohort completed 12 startups",
  "3 MSME partnerships added",
  "Monthly review scheduled Friday",
] as const;

const quickDecisions = [
  "Approve mentor budget request",
  "Launch Vidarbha manufacturing cohort",
  "Review low-performing incubator",
  "Export monthly ROI report",
] as const;

export default function CeoOverview() {
  const navigate = useNavigate();

  return (
    <DashboardLayout shellRole="ceo">
      <div className="mx-auto w-full max-w-[1520px] space-y-7">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Executive Control Tower</p>
          <h1 className="text-2xl font-bold text-foreground">CEO Dashboard</h1>
          <p className="text-sm text-muted-foreground">15-second view of ecosystem performance, risks, opportunities, and pending actions.</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {heroKpis.map((kpi) => (
            <Card
              key={kpi.label}
              className="cursor-pointer border-border shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              onClick={() => navigate(kpi.to)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <kpi.icon className="h-4 w-4 text-primary" />
                  <Badge variant="secondary" className={cn("text-[10px] font-medium", kpi.positive ? "text-emerald-600" : "text-rose-600")}>
                    {kpi.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-bold font-mono text-foreground">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">System Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((item) => (
              <Card
                key={item.label}
                className="cursor-pointer border-border shadow-sm hover:border-primary/35 transition-colors"
                onClick={() => navigate(item.to)}
              >
                <CardContent className="p-4">
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                  <p className={cn("mt-2 text-3xl font-bold font-mono", item.tone)}>{item.value}</p>
                  <p className="mt-1 text-xs text-primary inline-flex items-center gap-1">Open filtered hub <ArrowUpRight className="h-3.5 w-3.5" /></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 border-border shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold">Executive Funnel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {funnelPreview.map((f, idx) => (
                <div key={f.stage} className="flex items-center gap-3">
                  <p className="w-24 text-xs text-muted-foreground">{f.stage}</p>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.max(20, 100 - idx * 13)}%` }} />
                  </div>
                  <p className="w-28 text-right text-sm font-semibold font-mono text-foreground">{f.value}</p>
                </div>
              ))}
              <Button variant="outline" className="mt-2" onClick={() => navigate("/regional")}>
                View Full Intelligence Hub
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Priority Interventions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {interventions.map((item) => (
              <Card key={item} className="border-border shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-foreground">{item}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" onClick={() => navigate("/regional")}>Open</Button>
                    <Button size="sm" variant="secondary" onClick={() => navigate("/cohorts")}>Assign</Button>
                    <Button size="sm" variant="outline" onClick={() => navigate("/funds")}>Approve</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {opportunities.map((item) => (
                <div key={item} className="rounded-lg border border-border px-3 py-2 text-sm text-foreground bg-secondary/20">
                  {item}
                </div>
              ))}
              <Button variant="outline" onClick={() => navigate("/regional")}>Explore in Hub</Button>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-primary" />
                Quick Decisions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickDecisions.map((item, idx) => (
                <div key={item} className="rounded-lg border border-border p-3 space-y-2">
                  <p className="text-sm text-foreground">{item}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => navigate(idx === 0 ? "/mentor/dashboard" : "/reports")}>Approve</Button>
                    <Button size="sm" variant="secondary" onClick={() => navigate("/regional")}>Review</Button>
                    <Button size="sm" variant="outline" onClick={() => navigate("/alerts")}>Delay</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* MSME Intelligence Payload */}
        <section className="space-y-4 pt-4 border-t border-border mt-8">
          <header>
            <h2 className="text-lg font-bold text-foreground">MSME Portfolio Intelligence</h2>
            <p className="text-sm text-muted-foreground">Deep analytical dive into the statewide MSME ecosystem.</p>
          </header>
          <Tabs defaultValue="lifecycle" className="w-full space-y-4">
            <TabsList className="bg-muted p-1 rounded-xl h-11 border border-border">
              <TabsTrigger value="lifecycle" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                <LayoutGrid className="h-3.5 w-3.5" /> Pipeline Lifecycle
              </TabsTrigger>
              <TabsTrigger value="performance" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                <PieChart className="h-3.5 w-3.5" /> Market Performance
              </TabsTrigger>
              <TabsTrigger value="geographic" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                <MapIcon className="h-3.5 w-3.5" /> Regional Distribution
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lifecycle" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid gap-4 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-border shadow-sm">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-semibold">Funnel Conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FunnelConversionChart data={funnelDataMock} />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 border-border shadow-sm">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-semibold">Sector Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SectorDistributionChart data={sectorDistributionMock} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold">Growth vs Market Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarketShareGrowthChart data={marketShareMock} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold">Regional Concentration Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <GeographicHeatmap data={geoDistributionMock} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <footer className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-primary" />
          Deep diagnostics and comparative drilldowns moved to Discovery Intelligence Hub for focused analysis.
          <Button variant="link" className="h-auto p-0 text-xs" onClick={() => navigate("/ceo/regional-hub")}>Open Hub</Button>
        </footer>
      </div>
    </DashboardLayout>
  );
}
