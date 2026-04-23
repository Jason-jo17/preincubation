import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  ChevronRight,
  Clock3,
  Lightbulb,
  Loader2,
  MapPin,
  Search,
  ShieldAlert,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  challengeProjects,
  cohortData,
  incubatorData,
  platformEconomicRoi,
  platformEconomicRoiOverallMultiple,
  platformEconomicRoiUnitCosts,
  platformKpis,
  platformPipeline,
  regionData,
  riskCards,
  sectorData,
  startupData,
} from "@/data/ceo-regional-intelligence";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

type TimeFilter = "this-month" | "last-quarter" | "ytd";
type ScopeView = "overall" | "region";
type SectionId =
  | "talent-pool"
  | "teams-formed"
  | "projects-in-cohorts"
  | "prototypes-built"
  | "msme-pilots-live"
  | "startups-created"
  | "jobs-generated"
  | "msmes-improved"
  | "economic-roi";

const sectionRouteById: Record<SectionId, string> = {
  "talent-pool": "/ceo/regional-intelligence/talent-pool",
  "teams-formed": "/ceo/regional-intelligence/teams-formed",
  "projects-in-cohorts": "/ceo/regional-intelligence/projects",
  "prototypes-built": "/ceo/regional-intelligence/prototypes",
  "msme-pilots-live": "/ceo/regional-intelligence/pilots",
  "startups-created": "/ceo/regional-intelligence/startups",
  "jobs-generated": "/ceo/regional-intelligence/jobs",
  "msmes-improved": "/ceo/regional-intelligence/msmes",
  "economic-roi": "/ceo/regional-intelligence/roi",
};

const funnelRows = [
  { id: "talent-pool" as SectionId, label: "Talent Pool", tone: "from-sky-100 to-indigo-100" },
  { id: "teams-formed" as SectionId, label: "Teams Formed", tone: "from-indigo-100 to-purple-100" },
  { id: "projects-in-cohorts" as SectionId, label: "Projects in Cohorts", tone: "from-violet-100 to-fuchsia-100" },
  { id: "prototypes-built" as SectionId, label: "Prototypes Built", tone: "from-cyan-100 to-sky-100" },
  { id: "msme-pilots-live" as SectionId, label: "MSME Pilots Live", tone: "from-emerald-100 to-teal-100" },
  { id: "startups-created" as SectionId, label: "Startups Created", tone: "from-lime-100 to-emerald-100" },
  { id: "jobs-generated" as SectionId, label: "Jobs Generated", tone: "from-amber-100 to-orange-100" },
  { id: "msmes-improved" as SectionId, label: "MSMEs Improved", tone: "from-green-100 to-emerald-100" },
  { id: "economic-roi" as SectionId, label: "Economic ROI", tone: "from-amber-100 to-yellow-100" },
] as const;

function growthForRegion(startups: number, jobs: number, msmes: number) {
  const base = (startups * 0.04 + jobs * 0.002 + msmes * 0.015) / 10;
  return Math.max(3, Math.min(26, Number(base.toFixed(1))));
}

function regionalDetailSubtitle(sectionId: SectionId, scopeView: ScopeView, regionLabel: string): string {
  const place = scopeView === "overall" ? "Maharashtra" : regionLabel;
  switch (sectionId) {
    case "talent-pool":
      return `Student innovators and institutional contribution across ${place}`;
    case "teams-formed":
      return "Innovation teams across incubators and programs";
    case "projects-in-cohorts":
      return "Active cohort programs and project health";
    case "prototypes-built":
      return "Technology readiness and prototype pipeline";
    case "msme-pilots-live":
      return "Active industry pilots and impact tracking";
    case "startups-created":
      return "Searchable startup directory across ecosystem";
    case "jobs-generated":
      return "Employment impact across ecosystem";
    case "msmes-improved":
      return "Industry transformation and impact metrics";
    case "economic-roi":
      return "Return on public investment analysis";
    default:
      return `${scopeView === "overall" ? "Maharashtra overall view" : `${regionLabel} focused view`} with shared platform data.`;
  }
}

function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading shared intelligence...
      </div>
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-8 text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">No records match the current region/sector filters.</p>
    </div>
  );
}

interface CeoRegionalHubPageV2Props {
  detailSection?: SectionId;
}

export default function CeoRegionalHubPageV2({ detailSection }: CeoRegionalHubPageV2Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scopeView, setScopeView] = useState<ScopeView>(searchParams.get("scope") === "region" ? "region" : "overall");
  const [regionKey, setRegionKey] = useState<string>(searchParams.get("region") ?? (regionData[0]?.key ?? "pune"));
  const [sectorKey, setSectorKey] = useState<string>(searchParams.get("sector") ?? "all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>((searchParams.get("time") as TimeFilter) ?? "this-month");
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const activeSection = detailSection;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 280);
    return () => clearTimeout(timer);
  }, [scopeView, regionKey, sectorKey, timeFilter]);

  useEffect(() => {
    const next = new URLSearchParams();
    next.set("scope", scopeView);
    next.set("region", regionKey);
    next.set("sector", sectorKey);
    next.set("time", timeFilter);
    if (searchValue.trim()) {
      next.set("q", searchValue.trim());
    }
    setSearchParams(next, { replace: true });
  }, [scopeView, regionKey, sectorKey, timeFilter, searchValue, setSearchParams]);

  const selectedRegion = useMemo(() => regionData.find((r) => r.key === regionKey) ?? regionData[0], [regionKey]);
  const selectedSector = useMemo(() => sectorData.find((s) => s.key === sectorKey), [sectorKey]);
  const timeScale = timeFilter === "this-month" ? 1 : timeFilter === "last-quarter" ? 3 : 12;

  const visibleRegions = useMemo(
    () => (scopeView === "overall" ? regionData : regionData.filter((r) => r.key === regionKey)),
    [scopeView, regionKey],
  );
  const visibleSectors = useMemo(
    () => (sectorKey === "all" ? sectorData : sectorData.filter((s) => s.key === sectorKey)),
    [sectorKey],
  );
  const visibleStartups = useMemo(
    () =>
      startupData.filter(
        (startup) =>
          (scopeView === "overall" || startup.region === regionKey) &&
          (sectorKey === "all" || startup.sector === sectorKey) &&
          (searchValue.length < 2 || startup.name.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    [scopeView, regionKey, sectorKey, searchValue],
  );
  const visibleCohorts = useMemo(
    () =>
      cohortData.filter(
        (cohort) =>
          (scopeView === "overall" || cohort.region === regionKey) &&
          (searchValue.length < 2 || cohort.name.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    [scopeView, regionKey, searchValue],
  );
  const visibleIncubators = useMemo(
    () =>
      incubatorData.filter(
        (incubator) =>
          (scopeView === "overall" || incubator.region === regionKey) &&
          (searchValue.length < 2 || incubator.name.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    [scopeView, regionKey, searchValue],
  );

  const totals = useMemo(() => {
    const fundsCr = visibleRegions.reduce((sum, r) => sum + r.fundsCr, 0);
    const startups = visibleRegions.reduce((sum, r) => sum + r.startups, 0);
    const jobs = visibleRegions.reduce((sum, r) => sum + r.jobs, 0);
    const msmes = visibleRegions.reduce((sum, r) => sum + r.msmes, 0);
    const weightedRoi = fundsCr ? visibleRegions.reduce((sum, r) => sum + r.roiX * r.fundsCr, 0) / fundsCr : 0;
    return { fundsCr, startups, jobs, msmes, weightedRoi };
  }, [visibleRegions]);

  const regionFactor = scopeView === "overall" ? 1 : Math.max(0.08, selectedRegion.startups / platformKpis.startupsRegistered);
  const funnelData = useMemo(
    () => [
      { id: "talent-pool" as SectionId, value: Math.round(platformPipeline.talentPool * regionFactor * timeScale), conversion: 100 },
      { id: "teams-formed" as SectionId, value: Math.round(platformPipeline.teamsFormed * regionFactor * timeScale), conversion: 18.5 },
      { id: "projects-in-cohorts" as SectionId, value: Math.round(platformPipeline.projectsInCohorts * regionFactor * timeScale), conversion: 7 },
      { id: "prototypes-built" as SectionId, value: Math.round(platformPipeline.prototypesBuilt * regionFactor * timeScale), conversion: 4.4 },
      { id: "msme-pilots-live" as SectionId, value: Math.round(platformPipeline.msmePilots * regionFactor * timeScale), conversion: 2.6 },
      { id: "startups-created" as SectionId, value: totals.startups, conversion: 1.4 },
      { id: "jobs-generated" as SectionId, value: totals.jobs, conversion: 16.2 },
      { id: "msmes-improved" as SectionId, value: totals.msmes, conversion: 24.4 },
      { id: "economic-roi" as SectionId, value: `${platformEconomicRoiOverallMultiple()}x`, conversion: 21.4 },
    ],
    [regionFactor, timeScale, totals],
  );

  const regionCards = useMemo(
    () =>
      regionData.map((region) => {
        const growth = growthForRegion(region.startups, region.jobs, region.msmes);
        const health = Math.round(Math.min(98, region.roiX * 22 + (region.risk === "Low" ? 12 : region.risk === "Medium" ? 5 : -4)));
        return { ...region, growth, health };
      }),
    [],
  );

  const filterQuery = useMemo(() => {
    const next = new URLSearchParams();
    next.set("scope", scopeView);
    next.set("region", regionKey);
    next.set("sector", sectorKey);
    next.set("time", timeFilter);
    if (searchValue.trim()) {
      next.set("q", searchValue.trim());
    }
    return next.toString();
  }, [scopeView, regionKey, sectorKey, timeFilter, searchValue]);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const basePath = sectionRouteById[sectionId];
    navigate(filterQuery ? `${basePath}?${filterQuery}` : basePath);
  }, [navigate, filterQuery]);

  const hasEmpty = !visibleRegions.length || !visibleStartups.length || !visibleCohorts.length || !visibleIncubators.length;
  const totalInnovators = Number(funnelData[0].value) || 0;
  const activeInnovators = Math.round(totalInnovators * 0.68);
  const institutionsCount = visibleIncubators.length + visibleCohorts.length + visibleSectors.length;
  const employabilityRate = Math.min(95, Math.max(52, Math.round((totals.jobs / Math.max(totalInnovators, 1)) * 100)));

  const talentByRegionData = useMemo(
    () =>
      visibleRegions.map((region) => ({
        name: region.label.split(" / ")[0],
        talent: Math.round(platformPipeline.talentPool * (region.startups / platformKpis.startupsRegistered)),
      })),
    [visibleRegions],
  );

  const skillClusterData = useMemo(() => {
    const engineering = Math.min(95, Math.round(58 + visibleSectors.reduce((sum, s) => sum + s.teams, 0) / 8));
    const dataScience = Math.min(95, Math.round(50 + visibleSectors.reduce((sum, s) => sum + s.growthPct, 0) / 6));
    const design = Math.min(95, Math.round(42 + visibleSectors.length * 4));
    const business = Math.min(95, Math.round(48 + totals.msmes / 30));
    const research = Math.min(95, Math.round(38 + visibleIncubators.length * 3));
    const operations = Math.min(95, Math.round(46 + totals.jobs / 120));
    return [
      { subject: "Engineering", value: engineering },
      { subject: "Data Science", value: dataScience },
      { subject: "Design", value: design },
      { subject: "Business", value: business },
      { subject: "Research", value: research },
      { subject: "Operations", value: operations },
    ];
  }, [visibleSectors, totals.msmes, visibleIncubators.length, totals.jobs]);

  const teamsByRegionData = useMemo(
    () =>
      visibleRegions.map((region) => {
        const teams = Math.round(platformPipeline.teamsFormed * (region.startups / platformKpis.startupsRegistered));
        return { name: region.label.split(" / ")[0], teams, women: Math.round(teams * 0.27) };
      }),
    [visibleRegions],
  );

  const prototypesBySectorData = useMemo(
    () =>
      visibleSectors.map((sector) => ({
        name: sector.label,
        prototypes: Math.max(6, Math.round((sector.teams / 30) * platformPipeline.prototypesBuilt * regionFactor)),
      })),
    [visibleSectors, regionFactor],
  );

  const msmePilotRows = useMemo(
    () =>
      visibleStartups.slice(0, 6).map((startup) => ({
        msme: `${startup.name.split(" ")[0]} Industries`,
        problem: startup.product,
        team: startup.name,
        district: regionData.find((r) => r.key === startup.region)?.label ?? startup.region,
        status: startup.stage === "Prototype" ? "Pilot" : "Active",
        savings: `₹${Math.max(8, Math.round(startup.revenueCr * 3))}L/yr`,
        impact: `${Math.max(12, Math.round((startup.msmeClients / 14) * 35))}%`,
        timeline: startup.stage === "Prototype" ? "Delayed" : "On Track",
      })),
    [visibleStartups],
  );

  const jobsBySectorData = useMemo(
    () =>
      visibleSectors.map((sector) => ({
        name: sector.label,
        value: Math.max(120, Math.round((sector.teams / 30) * totals.jobs)),
      })),
    [visibleSectors, totals.jobs],
  );

  const roiOverallMultiple = platformEconomicRoiOverallMultiple();
  const { costPerStartupLakh, costPerJobK } = platformEconomicRoiUnitCosts();

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1660px] space-y-5 pb-10">
        <section className="sticky top-0 z-30 rounded-2xl border border-border bg-background/95 px-3 py-2 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={scopeView} onValueChange={(v) => setScopeView(v as ScopeView)} className="shrink-0">
              <TabsList className="h-8">
                <TabsTrigger value="overall" className="text-xs">Maharashtra Overall</TabsTrigger>
                <TabsTrigger value="region" className="text-xs">Region View</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={regionKey} onValueChange={setRegionKey}>
              <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{regionData.map((r) => <SelectItem key={r.key} value={r.key}>{r.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={sectorKey} onValueChange={setSectorKey}>
              <SelectTrigger className="h-8 w-[120px] text-xs"><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {sectorData.map((sector) => <SelectItem key={sector.key} value={sector.key}>{sector.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-quarter">This Quarter</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-8 pl-8 text-xs"
                placeholder="Search region / startup / incubator..."
              />
            </div>
            <div className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              Updated 2 hrs ago
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Regions</h3>
            <p className="text-[11px] text-muted-foreground">Click a region card to update funnel, rail, and analytics</p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {regionCards.map((region) => {
              const active = scopeView === "region" && region.key === regionKey;
              return (
                <button
                  key={region.key}
                  type="button"
                  onClick={() => {
                    setRegionKey(region.key);
                    setScopeView("region");
                  }}
                  className={cn(
                    "min-w-[190px] rounded-xl border bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                    active ? "border-primary shadow-lg shadow-primary/20 ring-1 ring-primary/30" : "border-border",
                  )}
                >
                  <p className="text-sm font-semibold">{region.label}</p>
                  <div className="mt-2 grid grid-cols-2 gap-y-1 text-[11px] text-muted-foreground">
                    <span>Startups: <span className="font-mono text-foreground">{region.startups}</span></span>
                    <span>MSMEs: <span className="font-mono text-foreground">{region.msmes}</span></span>
                    <span>Funds: <span className="font-mono text-foreground">₹{region.fundsCr}Cr</span></span>
                    <span>Growth: <span className="font-mono text-emerald-600">+{region.growth}%</span></span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">Health score <span className="font-mono text-foreground">{region.health}</span></p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <Card className="rounded-2xl border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Innovation Value Pipeline</CardTitle>
              <p className="text-xs text-muted-foreground">
                Track how public investment converts into innovation and economic value
              </p>
            </CardHeader>
            <CardContent className="space-y-3 px-2 sm:px-4">
              {funnelRows.map((row, idx) => {
                const metric = funnelData[idx];
                const widthPercent = Math.max(62, 100 - idx * 4.2);
                const growth = scopeView === "overall" ? 8 + idx * 1.6 : growthForRegion(selectedRegion.startups, selectedRegion.jobs, selectedRegion.msmes);
                return (
                  <div key={`${row.label}-${idx}`} className="flex w-full justify-center">
                    <button
                      type="button"
                      onClick={() => scrollToSection(metric.id)}
                      className={cn(
                        "group flex w-full max-w-full cursor-pointer flex-col gap-2 rounded-2xl border border-border bg-gradient-to-r px-3 py-2.5 shadow-sm transition-all duration-200 sm:h-16 sm:grid sm:items-center sm:gap-x-3 sm:px-4 sm:py-0",
                        "min-h-14 sm:min-h-16",
                        "hover:-translate-y-0.5 hover:shadow-lg",
                        "sm:[grid-template-columns:minmax(0,1fr)_minmax(4.75rem,auto)_minmax(3.5rem,auto)_minmax(3.25rem,auto)_auto]",
                        row.tone,
                      )}
                      style={{ width: `min(100%, ${widthPercent}%)` }}
                    >
                      <span className="min-w-0 break-words text-left text-[11px] font-semibold leading-snug text-foreground sm:text-xs md:text-[13px]">
                        {row.label}
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:contents">
                        <span className="text-[10px] tabular-nums text-muted-foreground sm:justify-self-center sm:text-center sm:text-[11px]">
                          Conv: {metric.conversion}%
                        </span>
                        <span className="text-right text-xs font-semibold tabular-nums text-foreground sm:text-sm">
                          {typeof metric.value === "number" ? metric.value.toLocaleString() : metric.value}
                        </span>
                        <span className="text-right text-[10px] font-medium tabular-nums text-emerald-600 sm:text-[11px]">
                          +{growth.toFixed(1)}%
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:justify-self-end" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <aside className="space-y-3">
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Region Spotlight
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold">{scopeView === "overall" ? "Maharashtra Overall" : selectedRegion.label}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-md bg-secondary/60 p-2"><p className="text-muted-foreground">Active Teams</p><p className="font-mono font-semibold">{Math.round(platformPipeline.teamsFormed * regionFactor)}</p></div>
                  <div className="rounded-md bg-secondary/60 p-2"><p className="text-muted-foreground">Pilots Live</p><p className="font-mono font-semibold">{Math.round(platformPipeline.msmePilots * regionFactor)}</p></div>
                  <div className="rounded-md bg-secondary/60 p-2"><p className="text-muted-foreground">MSMEs</p><p className="font-mono font-semibold">{totals.msmes}</p></div>
                  <div className="rounded-md bg-secondary/60 p-2"><p className="text-muted-foreground">ROI</p><p className="font-mono font-semibold">{platformEconomicRoiOverallMultiple()}x</p></div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader className="pb-2"><CardTitle className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><Lightbulb className="h-3.5 w-3.5" />Recommended Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="secondary" size="sm" className="w-full justify-between"><Link to={`/ceo/region/${selectedRegion.slug}`}>Prioritize funding tranche<ArrowRight className="h-3.5 w-3.5" /></Link></Button>
                <Button asChild variant="secondary" size="sm" className="w-full justify-between"><Link to={selectedSector ? `/ceo/sector/${selectedSector.slug}` : "/sectors"}>Expand sector onboarding<ArrowRight className="h-3.5 w-3.5" /></Link></Button>
                <Button asChild variant="outline" size="sm" className="w-full justify-between"><Link to="/funds">Reallocate low utilization funds<ArrowRight className="h-3.5 w-3.5" /></Link></Button>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-blue-100 bg-blue-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-blue-600">
                  <MapPin className="h-3.5 w-3.5" />
                  Regional Intelligence Hubs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                   variant="outline" 
                   size="sm" 
                   className="w-full justify-between bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 font-bold text-[10px] uppercase tracking-wider"
                   onClick={() => navigate('/ceo/region/mumbai')}
                >
                   Mumbai Intelligence Hub <ArrowRight className="h-3.5 w-3.5" />
                </Button>
                <Button 
                   variant="outline" 
                   size="sm" 
                   className="w-full justify-between bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 font-bold text-[10px] uppercase tracking-wider"
                   onClick={() => navigate('/ceo/region/nagpur')}
                >
                   Nagpur Intelligence Hub <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader className="pb-2"><CardTitle className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><BellRing className="h-3.5 w-3.5" />System Alerts</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {riskCards.slice(0, 4).map((risk) => (
                  <div key={risk} className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-900">{risk}</div>
                ))}
                <Button asChild variant="ghost" size="sm" className="w-full justify-start text-xs"><Link to="/alerts">Open alerts center</Link></Button>
              </CardContent>
            </Card>
          </aside>
        </section>

        {detailSection && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                CEO / Regional Intelligence / {funnelRows.find((row) => row.id === detailSection)?.label}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to={filterQuery ? `/ceo/regional-hub?${filterQuery}` : "/ceo/regional-hub"}>Back to Hub</Link>
              </Button>
            </div>

            <section className="space-y-4">
              {funnelRows.filter((row) => row.id === detailSection).map((menuItem) => (
                <Card
                  key={menuItem.id}
                  className={cn(
                    "scroll-mt-24 rounded-2xl border-border transition-all",
                    activeSection === menuItem.id && "border-primary/45 shadow-md shadow-primary/10",
                  )}
                >
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-semibold tracking-tight text-foreground">{menuItem.label}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {regionalDetailSubtitle(menuItem.id, scopeView, selectedRegion.label)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <LoadingState />
                ) : hasEmpty ? (
                  <EmptyState title={`${menuItem.label} data unavailable`} />
                ) : menuItem.id === "talent-pool" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-blue-50/70 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Total Innovators", value: totalInnovators.toLocaleString(), growth: "+12.4%" },
                          { label: "Active Innovators", value: activeInnovators.toLocaleString(), growth: "+8.2%" },
                          { label: "Institutions", value: institutionsCount.toLocaleString(), growth: "+6.1%" },
                          { label: "Employability Rate", value: `${employabilityRate}%`, growth: "+4.2%" },
                        ].map((kpi) => (
                          <div key={kpi.label} className="rounded-2xl border border-border/70 bg-card p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className="text-sm font-medium text-emerald-600">{kpi.growth}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="rounded-2xl border border-border/80 bg-card p-4">
                          <p className="mb-2 text-xl font-semibold">Talent by Region</p>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={talentByRegionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="talent" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-border/80 bg-card p-4">
                          <p className="mb-2 text-xl font-semibold">Skill Clusters</p>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={skillClusterData}>
                                <PolarGrid stroke="hsl(var(--border))" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                <Radar
                                  dataKey="value"
                                  stroke="hsl(217, 91%, 60%)"
                                  fill="hsl(217, 91%, 60%)"
                                  fillOpacity={0.3}
                                />
                                <Tooltip />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "teams-formed" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Total Teams", value: Math.round(funnelData[1].value as number).toLocaleString(), growth: "+15.2%" },
                          { label: "Active", value: Math.round((funnelData[1].value as number) * 0.82).toLocaleString(), growth: "+12.8%" },
                          { label: "Women-Led", value: Math.round((funnelData[1].value as number) * 0.24).toLocaleString(), growth: "+18.4%" },
                          { label: "Mentor Assigned", value: `${Math.min(96, 70 + visibleCohorts.length * 3)}%`, growth: "+4.6%" },
                        ].map((kpi) => (
                          <div key={kpi.label} className="rounded-2xl border border-border/70 bg-card p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className="text-sm font-medium text-emerald-600">{kpi.growth}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-border/80 bg-card p-4">
                        <p className="mb-3 text-xl font-semibold">Teams by Region</p>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={teamsByRegionData} barGap={8}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Bar dataKey="teams" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
                              <Bar dataKey="women" fill="hsl(262, 60%, 55%)" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <Button className="justify-between" onClick={() => scrollToSection("projects-in-cohorts")}>
                          Open Cohort Projects
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" className="justify-between" onClick={() => scrollToSection("prototypes-built")}>
                          View Prototype Readiness
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="justify-between" onClick={() => scrollToSection("startups-created")}>
                          Startup Conversion Drilldown
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {visibleCohorts.slice(0, 3).map((cohort) => (
                          <button
                            key={cohort.slug}
                            type="button"
                            onClick={() => scrollToSection("projects-in-cohorts")}
                            className="rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-2xl font-semibold text-foreground">{cohort.name}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{cohort.teamsEnrolled} teams</p>
                            <div className="mt-2 h-2 rounded-full bg-secondary">
                              <div className="h-2 rounded-full bg-primary" style={{ width: `${cohort.completionPct}%` }} />
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{cohort.completionPct}% complete</p>
                          </button>
                        ))}
                      </div>

                      <Accordion type="single" collapsible className="mt-4 rounded-xl border px-3">
                        <AccordionItem value="teams-drilldown" className="border-b-0">
                          <AccordionTrigger className="text-sm">Team drilldowns and actions</AccordionTrigger>
                          <AccordionContent className="space-y-2 text-sm">
                            <p>Click a cohort card to jump to Projects in Cohorts and review delayed teams and mentor load.</p>
                            <p>Use Prototype Readiness action to inspect conversion bottlenecks in the next funnel stage.</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                ) : menuItem.id === "projects-in-cohorts" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Active Projects", value: Math.round(funnelData[2].value as number).toLocaleString(), growth: "+8.6%", tone: "text-emerald-600" },
                          {
                            label: "Completion Rate",
                            value: `${Math.round(visibleCohorts.reduce((sum, c) => sum + c.completionPct, 0) / Math.max(visibleCohorts.length, 1))}%`,
                            growth: "+3.2%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "Delayed",
                            value: `${visibleCohorts.reduce((sum, c) => sum + c.delayedTeams, 0)}`,
                            growth: "-2.4%",
                            tone: "text-rose-500",
                          },
                          {
                            label: "Budget Used",
                            value: `${Math.min(94, Math.round(visibleIncubators.reduce((sum, i) => sum + i.utilizationPct, 0) / Math.max(visibleIncubators.length, 1)))}%`,
                            growth: "+5.1%",
                            tone: "text-emerald-600",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("projects-in-cohorts")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className={cn("text-sm font-medium", kpi.tone)}>{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {visibleCohorts.slice(0, 3).map((cohort) => {
                          const risk = cohort.delayedTeams >= 4 || cohort.mentorLoadPct >= 92;
                          return (
                            <button
                              key={cohort.slug}
                              type="button"
                              onClick={() => scrollToSection(risk ? "msme-pilots-live" : "prototypes-built")}
                              className="rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                              <p className="text-3xl font-semibold text-foreground">{cohort.name}</p>
                              <div className="mt-2 flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">{cohort.teamsEnrolled} teams</p>
                                <span
                                  className={cn(
                                    "rounded-full px-2 py-0.5 text-xs font-medium",
                                    risk ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700",
                                  )}
                                >
                                  {risk ? "At Risk" : "On Track"}
                                </span>
                              </div>
                              <div className="mt-3 h-2 rounded-full bg-secondary">
                                <div className="h-2 rounded-full bg-primary" style={{ width: `${cohort.completionPct}%` }} />
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{cohort.completionPct}% complete</p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-4">
                        {[
                          { label: "Team Readiness Layer", to: "teams-formed" as SectionId },
                          { label: "Prototype Conversion Layer", to: "prototypes-built" as SectionId },
                          { label: "Pilot Activation Layer", to: "msme-pilots-live" as SectionId },
                          { label: "Startup Outcome Layer", to: "startups-created" as SectionId },
                        ].map((layer) => (
                          <button
                            key={layer.label}
                            type="button"
                            onClick={() => scrollToSection(layer.to)}
                            className="rounded-xl border border-border bg-secondary/30 px-3 py-2 text-left text-sm transition-all hover:bg-secondary hover:shadow-sm"
                          >
                            {layer.label}
                          </button>
                        ))}
                      </div>

                      <Accordion type="single" collapsible className="mt-4 rounded-xl border px-3">
                        <AccordionItem value="cohort-deep-drilldown" className="border-b-0">
                          <AccordionTrigger className="text-sm">Open deeper drilldowns</AccordionTrigger>
                          <AccordionContent className="space-y-2 text-sm">
                            <p>Click a cohort card to move into risk or conversion stage details based on live health status.</p>
                            <p>Use layer shortcuts to jump across pipeline dependencies without losing region context.</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                ) : menuItem.id === "prototypes-built" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          {
                            label: "Total Prototypes",
                            value: Math.round(funnelData[3].value as number).toLocaleString(),
                            growth: "+22.1%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "Lab Tested",
                            value: Math.round((funnelData[3].value as number) * 0.72).toLocaleString(),
                            growth: "+14.6%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "Pilot Ready",
                            value: Math.round((funnelData[3].value as number) * 0.48).toLocaleString(),
                            growth: "+18.2%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "Blocked",
                            value: Math.max(8, Math.round((funnelData[3].value as number) * 0.08)).toLocaleString(),
                            growth: "-12.4%",
                            tone: "text-rose-500",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("prototypes-built")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className={cn("text-sm font-medium", kpi.tone)}>{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-border/80 bg-card p-4">
                        <p className="mb-3 text-2xl font-semibold">Prototypes by Sector</p>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={prototypesBySectorData} layout="vertical" margin={{ left: 16, right: 16, top: 8, bottom: 8 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                              <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                width={90}
                              />
                              <Tooltip formatter={(value: number) => [`count : ${value}`, ""]} />
                              <Bar dataKey="prototypes" fill="hsl(262, 60%, 55%)" radius={[0, 8, 8, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "msme-pilots-live" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          {
                            label: "Active Pilots",
                            value: Math.round(funnelData[4].value as number).toLocaleString(),
                            growth: "+18.4%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "MSMEs Engaged",
                            value: visibleStartups.reduce((sum, startup) => sum + startup.msmeClients, 0).toLocaleString(),
                            growth: "+14.2%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "Avg Savings",
                            value: `₹${Math.max(8, Math.round(totals.fundsCr * 0.16))}L/yr`,
                            growth: "+22.6%",
                            tone: "text-emerald-600",
                          },
                          {
                            label: "On Track",
                            value: `${Math.round((msmePilotRows.filter((row) => row.timeline === "On Track").length / Math.max(msmePilotRows.length, 1)) * 100)}%`,
                            growth: "+4.8%",
                            tone: "text-emerald-600",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("msme-pilots-live")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className={cn("text-sm font-medium", kpi.tone)}>{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 overflow-hidden rounded-2xl border border-border/80 bg-card">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-background/95">
                              <tr className="border-b text-left text-[12px] uppercase tracking-wide text-muted-foreground">
                                <th className="px-3 py-3">MSME</th>
                                <th className="px-3 py-3">Problem</th>
                                <th className="px-3 py-3">Team</th>
                                <th className="px-3 py-3">District</th>
                                <th className="px-3 py-3">Status</th>
                                <th className="px-3 py-3">Savings</th>
                                <th className="px-3 py-3">Impact %</th>
                                <th className="px-3 py-3">Timeline</th>
                              </tr>
                            </thead>
                            <tbody>
                              {msmePilotRows.map((row, index) => (
                                <tr
                                  key={`${row.msme}-${index}`}
                                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                                  onClick={() => scrollToSection(row.timeline === "Delayed" ? "projects-in-cohorts" : "startups-created")}
                                >
                                  <td className="px-3 py-3 font-medium">{row.msme}</td>
                                  <td className="px-3 py-3 text-muted-foreground">{row.problem}</td>
                                  <td className="px-3 py-3 text-primary">{row.team}</td>
                                  <td className="px-3 py-3">{row.district}</td>
                                  <td className="px-3 py-3">
                                    <span
                                      className={cn(
                                        "rounded-full px-2 py-0.5 text-xs font-medium",
                                        row.status === "Pilot" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700",
                                      )}
                                    >
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 font-mono">{row.savings}</td>
                                  <td className="px-3 py-3 text-emerald-600">{row.impact}</td>
                                  <td
                                    className={cn(
                                      "px-3 py-3",
                                      row.timeline === "Delayed" ? "text-rose-500" : "text-emerald-600",
                                    )}
                                  >
                                    {row.timeline}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "startups-created" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          {
                            label: "Total Startups",
                            value: totals.startups.toLocaleString(),
                            growth: "+14.8%",
                          },
                          {
                            label: "Active",
                            value: visibleStartups.filter((startup) => startup.stage !== "Prototype").length.toLocaleString(),
                            growth: "+12.2%",
                          },
                          {
                            label: "Revenue Generated",
                            value: `₹${visibleStartups.reduce((sum, startup) => sum + startup.revenueCr, 0).toFixed(1)}Cr`,
                            growth: "+28.4%",
                          },
                          {
                            label: "Avg Growth",
                            value: `${Math.min(98, Math.round(60 + visibleStartups.reduce((sum, startup) => sum + startup.jobs, 0) / 30))}%`,
                            growth: "+8.6%",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("startups-created")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className="text-sm font-medium text-emerald-600">{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 overflow-hidden rounded-2xl border border-border/80 bg-card">
                        <div className="flex flex-wrap items-center gap-2 border-b px-3 py-3">
                          <div className="relative min-w-[240px] flex-1">
                            <Search className="pointer-events-none absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              value={searchValue}
                              onChange={(event) => setSearchValue(event.target.value)}
                              className="h-9 rounded-xl pl-8 text-sm"
                              placeholder="Search startups..."
                            />
                          </div>
                          <Button variant="secondary" size="sm">Export</Button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-background/95">
                              <tr className="border-b text-left text-[12px] uppercase tracking-wide text-muted-foreground">
                                <th className="px-3 py-3">Startup</th>
                                <th className="px-3 py-3">Founder</th>
                                <th className="px-3 py-3">Sector</th>
                                <th className="px-3 py-3">Region</th>
                                <th className="px-3 py-3">Revenue</th>
                                <th className="px-3 py-3">Jobs</th>
                                <th className="px-3 py-3">Grants</th>
                                <th className="px-3 py-3">Growth</th>
                              </tr>
                            </thead>
                            <tbody>
                              {visibleStartups.map((startup) => {
                                const regionLabel = regionData.find((region) => region.key === startup.region)?.label ?? startup.region;
                                const growth = Math.min(98, Math.max(54, Math.round((startup.jobs * 0.9 + startup.revenueCr * 8) * 1.2)));
                                return (
                                  <tr
                                    key={startup.slug}
                                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                                    onClick={() => scrollToSection(startup.stage === "Revenue" ? "jobs-generated" : "prototypes-built")}
                                  >
                                    <td className="px-3 py-3 font-medium">{startup.name}</td>
                                    <td className="px-3 py-3 text-muted-foreground">{startup.founders[0]}</td>
                                    <td className="px-3 py-3">
                                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                        {sectorData.find((sector) => sector.key === startup.sector)?.label ?? startup.sector}
                                      </span>
                                    </td>
                                    <td className="px-3 py-3">{regionLabel}</td>
                                    <td className="px-3 py-3 font-mono">₹{startup.revenueCr.toFixed(1)}Cr</td>
                                    <td className="px-3 py-3 font-mono">{startup.jobs}</td>
                                    <td className="px-3 py-3 font-mono">₹{startup.fundingLakh}L</td>
                                    <td className={cn("px-3 py-3 font-semibold", growth >= 80 ? "text-emerald-600" : growth >= 68 ? "text-amber-500" : "text-rose-500")}>
                                      {growth}%
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "jobs-generated" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Total Jobs", value: totals.jobs.toLocaleString(), growth: "+16.2%" },
                          {
                            label: "Startup Jobs",
                            value: visibleStartups.reduce((sum, startup) => sum + startup.jobs, 0).toLocaleString(),
                            growth: "+18.4%",
                          },
                          {
                            label: "Avg Salary",
                            value: `₹${Math.max(2.8, (totals.jobs / Math.max(totals.startups, 1)) * 0.09).toFixed(1)}L/yr`,
                            growth: "+8.2%",
                          },
                          {
                            label: "Placements",
                            value: Math.round(totals.jobs * 0.32).toLocaleString(),
                            growth: "+12.6%",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("jobs-generated")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className="text-sm font-medium text-emerald-600">{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="rounded-2xl border border-border/80 bg-card p-4">
                          <p className="mb-3 text-2xl font-semibold">Jobs by Region</p>
                          <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={visibleRegions}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="jobs" fill="hsl(152, 69%, 41%)" radius={[6, 6, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-border/80 bg-card p-4">
                          <p className="mb-3 text-2xl font-semibold">Jobs by Sector</p>
                          <div className="flex h-72 items-center justify-between gap-2">
                            <div className="h-full w-[58%]">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={jobsBySectorData} dataKey="value" nameKey="name" innerRadius={0} outerRadius={92}>
                                    {jobsBySectorData.map((entry, index) => {
                                      const palette = [
                                        "hsl(152, 69%, 41%)",
                                        "hsl(217, 91%, 60%)",
                                        "hsl(199, 89%, 48%)",
                                        "hsl(0, 84%, 60%)",
                                        "hsl(38, 92%, 50%)",
                                        "hsl(262, 60%, 55%)",
                                      ];
                                      return <Cell key={entry.name} fill={palette[index % palette.length]} />;
                                    })}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="w-[42%] space-y-2 pr-2">
                              {jobsBySectorData.map((sector, index) => {
                                const palette = [
                                  "hsl(152, 69%, 41%)",
                                  "hsl(217, 91%, 60%)",
                                  "hsl(199, 89%, 48%)",
                                  "hsl(0, 84%, 60%)",
                                  "hsl(38, 92%, 50%)",
                                  "hsl(262, 60%, 55%)",
                                ];
                                return (
                                  <div key={sector.name} className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                                    <span className="text-muted-foreground">{sector.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "economic-roi" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-sky-200/80 bg-sky-50/90 px-4 py-4">
                            <p className="text-xs font-medium text-muted-foreground">Total Public Investment</p>
                            <p className="mt-1 text-3xl font-bold font-mono tracking-tight text-foreground">
                              ₹{platformEconomicRoi.publicInvestmentCr}Cr
                            </p>
                          </div>
                          <div className="space-y-2">
                            {platformEconomicRoi.breakdown.map((row) => (
                              <div
                                key={row.label}
                                className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-3 py-2.5 text-sm"
                              >
                                <span className="text-muted-foreground">{row.label}</span>
                                <span className="text-right font-mono">
                                  <span className="font-semibold text-foreground">₹{row.valueCr}Cr</span>
                                  <span className="ml-1.5 text-muted-foreground">({row.pct}%)</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-start gap-4">
                          <div
                            className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-sky-100 bg-gradient-to-br from-sky-100/90 via-cyan-50/80 to-emerald-50/90 shadow-inner"
                            aria-hidden
                          >
                            <p className="text-4xl font-bold tracking-tight text-sky-700">{roiOverallMultiple}x</p>
                            <p className="mt-1 text-xs font-medium text-muted-foreground">Overall ROI</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">
                              ₹{platformEconomicRoi.totalValueGeneratedCr}Cr Total Value Generated
                            </p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              from ₹{platformEconomicRoi.publicInvestmentCr}Cr investment
                            </p>
                          </div>
                          <div className="grid w-full max-w-md grid-cols-2 gap-3">
                            <div className="rounded-xl bg-muted/50 px-3 py-3 text-left">
                              <p className="text-[11px] font-medium text-muted-foreground">Cost/Startup</p>
                              <p className="mt-1 text-lg font-bold font-mono text-foreground">₹{costPerStartupLakh}L</p>
                            </div>
                            <div className="rounded-xl bg-muted/50 px-3 py-3 text-left">
                              <p className="text-[11px] font-medium text-muted-foreground">Cost/Job</p>
                              <p className="mt-1 text-lg font-bold font-mono text-foreground">₹{costPerJobK}K</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : menuItem.id === "msmes-improved" ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-slate-50 to-white p-4">
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          {
                            label: "MSMEs Benefited",
                            value: totals.msmes.toLocaleString(),
                            growth: `+${Math.max(6.2, Math.min(26.4, totals.msmes / 45)).toFixed(1)}%`,
                          },
                          {
                            label: "Productivity Gain",
                            value: `+${Math.max(18, Math.min(42, Math.round(totals.msmes / 32)))}%`,
                            growth: "+8.4%",
                          },
                          {
                            label: "Cost Reduction",
                            value: `₹${Math.max(8, Math.round(totals.fundsCr * 0.28))}Cr`,
                            growth: "+18.2%",
                          },
                          {
                            label: "Satisfaction",
                            value: `${Math.max(3.6, Math.min(4.8, (3.8 + totals.weightedRoi / 5))).toFixed(1)}/5`,
                            growth: "+6.8%",
                          },
                        ].map((kpi) => (
                          <button
                            key={kpi.label}
                            type="button"
                            onClick={() => scrollToSection("msmes-improved")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                            <p className="mt-1 inline-flex items-end gap-2 text-3xl font-bold font-mono text-foreground">
                              {kpi.value}
                              <span className="text-sm font-medium text-emerald-600">{kpi.growth}</span>
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Productivity", before: 62, after: 84 },
                          { label: "Cost Efficiency", before: 48, after: 72 },
                          { label: "Automation", before: 22, after: 56 },
                          { label: "Export Ready", before: 18, after: 42 },
                        ].map((metric) => (
                          <button
                            key={metric.label}
                            type="button"
                            onClick={() => scrollToSection("msme-pilots-live")}
                            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-end gap-3 text-sm">
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Before</p>
                                <p className="mt-1 text-2xl font-bold font-mono text-foreground">{metric.before}%</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-emerald-700">After</p>
                                <p className="mt-1 text-2xl font-bold font-mono text-emerald-600">{metric.after}%</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                      <div className="rounded-xl border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">Funds Deployed</p><p className="text-lg font-bold font-mono">₹{totals.fundsCr}Cr</p></div>
                      <div className="rounded-xl border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">Startups</p><p className="text-lg font-bold font-mono">{totals.startups}</p></div>
                      <div className="rounded-xl border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">Jobs</p><p className="text-lg font-bold font-mono">{totals.jobs}</p></div>
                      <div className="rounded-xl border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">MSMEs</p><p className="text-lg font-bold font-mono">{totals.msmes}</p></div>
                      <div className="rounded-xl border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">ROI</p><p className="text-lg font-bold font-mono">{platformEconomicRoiOverallMultiple()}x</p></div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <div className="rounded-xl border p-3">
                        <p className="mb-2 text-xs font-semibold">Region Comparison Chart</p>
                        <div className="h-52">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={visibleRegions}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Bar
                                dataKey={
                                  menuItem.id === "msmes-improved"
                                    ? "msmes"
                                    : menuItem.id === "economic-roi"
                                      ? "roiX"
                                      : menuItem.id === "jobs-generated"
                                        ? "jobs"
                                        : "startups"
                                }
                                fill="hsl(var(--primary))"
                                radius={[6, 6, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="rounded-xl border p-3">
                        <p className="mb-2 text-xs font-semibold">Insights and Actions</p>
                        <ul className="space-y-2 text-sm">
                          <li className="rounded-md bg-secondary/40 p-2">Dashboard alignment: funds ₹{platformKpis.fundsDeployedCr}Cr, startups {platformKpis.startupsRegistered}, jobs {platformKpis.jobsCreated.toLocaleString()}.</li>
                          <li className="rounded-md bg-secondary/40 p-2">Visible startups: {visibleStartups.length} · cohorts: {visibleCohorts.length} · incubators: {visibleIncubators.length}.</li>
                          <li className="rounded-md bg-secondary/40 p-2">Sector focus: {selectedSector?.label ?? "All sectors"} with {visibleSectors.length} active data lanes.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border">
                      <div className="max-h-72 overflow-auto">
                        <table className="w-full text-sm">
                          <thead className="sticky top-0 bg-background">
                            <tr className="border-b text-left text-[11px] uppercase text-muted-foreground">
                              <th className="px-3 py-2">Region</th>
                              <th className="px-3 py-2">Funds</th>
                              <th className="px-3 py-2">Startups</th>
                              <th className="px-3 py-2">Jobs</th>
                              <th className="px-3 py-2">MSMEs</th>
                              <th className="px-3 py-2">ROI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleRegions.map((r) => (
                              <tr key={`${menuItem.id}-${r.key}`} className="border-b transition-colors hover:bg-primary/5">
                                <td className="px-3 py-2 font-medium">{r.label}</td>
                                <td className="px-3 py-2 font-mono">₹{r.fundsCr}Cr</td>
                                <td className="px-3 py-2 font-mono">{r.startups}</td>
                                <td className="px-3 py-2 font-mono">{r.jobs}</td>
                                <td className="px-3 py-2 font-mono">{r.msmes}</td>
                                <td className="px-3 py-2 font-mono">{r.roiX}x</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="rounded-xl border px-3">
                      <AccordionItem value={`${menuItem.id}-details`} className="border-b-0">
                        <AccordionTrigger className="text-sm">Expandable details</AccordionTrigger>
                        <AccordionContent className="space-y-2 text-sm">
                          <p>Focused data scope: {scopeView === "overall" ? "Maharashtra Overall" : selectedRegion.label} · {selectedSector?.label ?? "All sectors"} · {timeFilter}.</p>
                          <p>Priority projects tracked from shared datasets: {challengeProjects.join(", ")}.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                )}
              </CardContent>
                </Card>
              ))}
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
