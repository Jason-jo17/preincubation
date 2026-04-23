import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Bookmark,
  ChevronRight,
  Filter,
  Flame,
  LayoutGrid,
  Sparkles,
  Target,
  TrendingUp,
  FileCode2,
  Users as UsersIcon,
  FileText,
  Check,
  MapPin,
  Presentation,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { InnovationChallengePRD } from "@/components/dashboard/InnovationChallengePRD";
import { NAGPUR_NEXT_CHALLENGES } from "@/data/nagpur-next-data";
import type { MsmeChallengeListItem } from "@/data/msme-challenges-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AI_GUIDANCE_BULLETS,
  FEATURED_MARKETPLACE_IDS,
  MARKETPLACE_HEADER_STATS,
  type MarketplaceProblem,
  fallbackMarketplaceDetail,
  getMarketplaceCatalog,
  getMarketplaceDetail,
} from "@/data/innovator-marketplace-catalog";
import {
  applyToMarketplaceProblem,
  isProblemSaved,
  toggleSavedProblem,
  type InnovatorSubmissionStatus,
} from "@/data/innovator-marketplace-hub";
import { useInnovatorMarketplaceBridge } from "@/hooks/use-innovator-marketplace-bridge";
import { innovatorProblemPool, innovatorRecommendedProblems } from "@/data/innovator-workspace";

const SORT_OPTIONS = [
  { value: "best", label: "Best Match" },
  { value: "value", label: "Highest Value" },
  { value: "latest", label: "Latest" },
  { value: "easy", label: "Easy Wins" },
  { value: "deadline", label: "Deadline" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function statusChipClass(s: InnovatorSubmissionStatus) {
  if (s === "Applied") return "bg-primary/10 text-primary border-primary/20";
  if (s === "In Review") return "bg-amber-500/10 text-amber-900 dark:text-amber-100 border-amber-500/25";
  if (s === "Shortlisted") return "bg-violet-500/10 text-violet-800 dark:text-violet-200 border-violet-500/25";
  if (s === "Accepted") return "bg-success/10 text-success border-success/25";
  return "bg-muted text-muted-foreground border-border";
}

export default function InnovatorMarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "marketplace";

  const handleTabChange = (val: string) => {
    setSearchParams({ tab: val });
  };

  const catalog = useMemo(() => getMarketplaceCatalog(), []);
  const bridge = useInnovatorMarketplaceBridge();

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<string>("all");
  const [skill, setSkill] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [reward, setReward] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [teamMode, setTeamMode] = useState<string>("all");
  const [workMode, setWorkMode] = useState<string>("all");
  const [matchMin, setMatchMin] = useState<string>("0");
  const [sort, setSort] = useState<SortValue>("best");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<MarketplaceProblem | null>(null);

  const sectors = useMemo(() => {
    const s = new Set(catalog.map((c) => c.challenge.sector));
    return ["all", ...[...s].sort()];
  }, [catalog]);

  const skills = useMemo(() => {
    const s = new Set<string>();
    catalog.forEach((c) => c.skills.forEach((k) => s.add(k)));
    return ["all", ...[...s].sort()];
  }, [catalog]);

  const cities = useMemo(() => {
    const s = new Set(catalog.map((c) => c.city));
    return ["all", ...[...s].sort()];
  }, [catalog]);

  const featured = useMemo(() => {
    return FEATURED_MARKETPLACE_IDS.map((id) => catalog.find((c) => c.challenge.id === id)).filter(Boolean) as MarketplaceProblem[];
  }, [catalog]);

  const filtered = useMemo(() => {
    let rows = [...catalog];
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          r.challenge.title.toLowerCase().includes(q) ||
          r.challenge.company.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.challenge.summary.toLowerCase().includes(q),
      );
    }
    if (sector !== "all") rows = rows.filter((r) => r.challenge.sector === sector);
    if (skill !== "all") rows = rows.filter((r) => r.skills.includes(skill));
    if (difficulty !== "all") rows = rows.filter((r) => r.difficulty === difficulty);
    if (reward !== "all") rows = rows.filter((r) => r.rewardType === reward);
    if (location !== "all") rows = rows.filter((r) => r.city === location);
    if (teamMode !== "all") {
      if (teamMode === "Solo") rows = rows.filter((r) => r.teamMode === "Solo" || r.teamMode === "Either");
      else if (teamMode === "Team") rows = rows.filter((r) => r.teamMode === "Team" || r.teamMode === "Either");
      else rows = rows.filter((r) => r.teamMode === teamMode);
    }
    if (workMode !== "all") rows = rows.filter((r) => r.workMode === workMode);
    const min = Number(matchMin);
    if (!Number.isNaN(min) && min > 0) rows = rows.filter((r) => r.matchPct >= min);

    if (sort === "best") rows.sort((a, b) => b.matchPct - a.matchPct);
    if (sort === "value") rows.sort((a, b) => b.valueLakh - a.valueLakh);
    if (sort === "latest") rows.sort((a, b) => (a.listedSort < b.listedSort ? 1 : -1));
    if (sort === "easy") {
      const order = { Beginner: 0, Medium: 1, Advanced: 2 };
      rows.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }
    if (sort === "deadline") rows.sort((a, b) => (a.deadlineSort > b.deadlineSort ? 1 : -1));

    return rows;
  }, [catalog, search, sector, skill, difficulty, reward, location, teamMode, workMode, matchMin, sort]);

  const savedProblems = useMemo(
    () => catalog.filter((c) => bridge.savedIds.has(c.challenge.id)),
    [catalog, bridge.savedIds],
  );

  const openDetail = (p: MarketplaceProblem) => {
    setSelected(p);
    setDrawerOpen(true);
  };

  const handleApply = (p: MarketplaceProblem) => {
    toast.success("Redirecting to application flow...", {
      description: `${p.challenge.title} — opening in recruit portal.`,
    });
    setTimeout(() => {
      window.open("https://inpulse-staging-recruitment.web.app", "_blank");
    }, 1000);
  };

  const handleSave = (p: MarketplaceProblem) => {
    const on = toggleSavedProblem(p.challenge.id);
    toast.message(on ? "Saved" : "Removed from saved", { description: p.challenge.title });
  };

  const detail = selected
    ? getMarketplaceDetail(selected.challenge.id) ?? fallbackMarketplaceDetail(selected.challenge)
    : null;

  const counts = bridge.counts;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full space-y-8">
        {/* Header */}
        <section className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <LayoutGrid className="h-3.5 w-3.5" />
              Maharashtra MSME network
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Innovation Hub</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Solve real MSME challenges and build career outcomes. Curated from published challenges on the MSME workspace.
            </p>
            <div className="mt-6">
              <TabsList className="bg-card border border-border gap-2">
                <TabsTrigger value="marketplace" className="text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary h-8 px-4 rounded-md">
                  Discovery Marketplace
                </TabsTrigger>
                <TabsTrigger value="tailored" className="text-xs data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800 h-8 px-4 rounded-md">
                  Tailored Fits
                  <Badge variant="secondary" className="ml-2 px-1 h-4 text-[9px] font-black uppercase bg-violet-200 text-violet-800 border-none">
                    AI Match
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto shrink-0">
          {[
            { label: "Live Problems", value: String(MARKETPLACE_HEADER_STATS.liveProblems) },
            { label: "High Match", value: String(MARKETPLACE_HEADER_STATS.highMatch) },
            { label: "Opportunity Value", value: MARKETPLACE_HEADER_STATS.opportunityValueLabel },
            { label: "New This Week", value: String(MARKETPLACE_HEADER_STATS.newThisWeek) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold font-mono text-foreground mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <TabsContent value="marketplace" className="space-y-8 m-0 mt-4">
      {/* Filters */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center gap-2 space-y-0">
          <Filter className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">Filters & sort</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            <div className="lg:col-span-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Search problems</label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title, company, tags…"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s === "all" ? "All sectors" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Skill</label>
              <Select value={skill} onValueChange={setSkill}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s === "all" ? "All skills" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "Beginner", "Medium", "Advanced"].map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s === "all" ? "Any difficulty" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reward type</label>
              <Select value={reward} onValueChange={setReward}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Reward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any reward</SelectItem>
                  <SelectItem value="Milestone payment">Milestone payment</SelectItem>
                  <SelectItem value="Impact grant">Impact grant</SelectItem>
                  <SelectItem value="Pilot budget">Pilot budget</SelectItem>
                  <SelectItem value="Revenue share (pilot)">Revenue share (pilot)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Location</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s === "all" ? "All cities" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Solo / Team</label>
              <Select value={teamMode} onValueChange={setTeamMode}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Solo">Solo-friendly</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                  <SelectItem value="Either">Either</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Remote / Onsite</label>
              <Select value={workMode} onValueChange={setWorkMode}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Remote-first">Remote-first</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Match %</label>
              <Select value={matchMin} onValueChange={setMatchMin}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any match</SelectItem>
                  <SelectItem value="60">60%+</SelectItem>
                  <SelectItem value="70">70%+</SelectItem>
                  <SelectItem value="80">80%+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sort by</label>
              <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-sm">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Showing <span className="font-mono font-semibold text-foreground">{filtered.length}</span> of{" "}
            <span className="font-mono font-semibold text-foreground">{catalog.length}</span> live challenges from MSME module
          </p>
        </CardContent>
      </Card>

      {/* Featured AI */}
      <section
        className={cn(
          "rounded-2xl border border-violet-500/20 p-5 md:p-6",
          "bg-gradient-to-br from-card via-card to-violet-500/[0.07] shadow-sm",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            Featured AI matches
          </h2>
          <Badge variant="secondary" className="font-normal text-[11px]">
            Powered by published MSME challenges
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((p) => (
            <Card key={p.challenge.id} className="border-violet-500/15 shadow-sm bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-snug">{p.challenge.title}</CardTitle>
                  <Badge className="shrink-0 font-mono text-[10px]">{p.matchPct}%</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1">{p.challenge.company}</p>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Why:</span> {p.whyMatch}
                </p>
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-200">{p.valueLabel} impact</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => openDetail(p)}>
                    View Analysis
                  </Button>
                  <Button size="sm" className="h-8 text-xs" onClick={() => handleApply(p)}>
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
        {/* Grid */}
        <div className="xl:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              Marketplace
            </h2>
            <Button variant="ghost" size="sm" className="text-xs h-8 gap-1" onClick={() => toast.message("Digest scheduled (demo)")}>
              Alert me
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((p) => (
              <Card
                key={p.challenge.id}
                className="border-border shadow-sm hover:border-primary/30 transition-colors flex flex-col"
              >
                <CardHeader className="pb-2 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {p.challenge.sector}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {p.matchPct}% match
                    </Badge>
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {p.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-snug">{p.challenge.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {p.challenge.company} · {p.city}
                  </p>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground line-clamp-3">{p.challenge.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground mt-auto">
                    <span>
                      Team: <span className="text-foreground font-medium">{p.teamSize}</span>
                    </span>
                    <span>
                      Mode: <span className="text-foreground font-medium">{p.workMode}</span>
                    </span>
                    <span>
                      Due: <span className="text-foreground font-mono">{p.deadlineLabel}</span>
                    </span>
                    <span>
                      Value: <span className="text-foreground font-semibold">{p.valueLabel}</span>
                    </span>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={() => openDetail(p)}>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => openDetail(p)}>
                      Analysis
                    </Button>
                    <Button size="sm" className="h-8 text-xs" onClick={() => handleApply(p)}>
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant={isProblemSaved(p.challenge.id) ? "default" : "ghost"}
                      className="h-8 text-xs gap-1"
                      onClick={() => handleSave(p)}
                    >
                      <Bookmark className={cn("h-3.5 w-3.5", isProblemSaved(p.challenge.id) && "fill-current")} />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                My applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                {[
                  { label: "Applied", value: counts.Applied },
                  { label: "In Review", value: counts["In Review"] },
                  { label: "Shortlisted", value: counts.Shortlisted },
                  { label: "Accepted", value: counts.Accepted },
                ].map((x) => (
                  <div key={x.label} className="rounded-lg border border-border bg-secondary/30 px-2 py-2">
                    <p className="text-[10px] text-muted-foreground font-medium">{x.label}</p>
                    <p className="text-lg font-bold font-mono">{x.value}</p>
                  </div>
                ))}
              </div>
              <ScrollArea className="h-[220px] pr-3">
                <ul className="space-y-2">
                  {bridge.submissions.map((s) => (
                    <li
                      key={s.id}
                      className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-primary/[0.03] cursor-pointer transition-colors"
                      onClick={() => {
                        const prob = catalog.find((c) => c.challenge.id === s.challengeId);
                        if (prob) openDetail(prob);
                      }}
                    >
                      <p className="font-medium text-foreground line-clamp-2">{s.title}</p>
                      <p className="text-[11px] text-muted-foreground">{s.company}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", statusChipClass(s.status))}>
                          {s.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">{s.updatedLabel}</span>
                        {s.status === "Accepted" && (
                          <Link
                            to={`/innovator/sprint?challengeId=${encodeURIComponent(s.challengeId)}`}
                            className="text-[10px] font-semibold text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open sprint →
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          <div
            className={cn(
              "rounded-xl border border-violet-500/20 p-4",
              "bg-gradient-to-br from-violet-500/[0.06] to-transparent",
            )}
          >
            <h3 className="text-xs font-semibold text-foreground inline-flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-violet-600" />
              AI guidance
            </h3>
            <ul className="mt-3 space-y-2">
              {AI_GUIDANCE_BULLETS.map((line) => (
                <li key={line} className="text-xs text-muted-foreground leading-snug flex gap-2">
                  <span className="text-violet-600 shrink-0">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-primary" />
                Saved problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedProblems.length === 0 ? (
                <p className="text-xs text-muted-foreground">No saved problems yet.</p>
              ) : (
                <ul className="space-y-2">
                  {savedProblems.map((p) => (
                    <li key={p.challenge.id}>
                      <button
                        type="button"
                        className="w-full text-left rounded-lg border border-border px-3 py-2 text-xs hover:bg-primary/[0.03] transition-colors"
                        onClick={() => openDetail(p)}
                      >
                        <span className="font-medium text-foreground line-clamp-2">{p.challenge.title}</span>
                        <span className="block text-[11px] text-muted-foreground mt-0.5">{p.challenge.company}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>

      <TabsContent value="tailored" className="space-y-8 m-0 mt-4">
        <div>
           <h2 className="text-xl font-bold tracking-tight text-foreground">AI Recommended Matches</h2>
           <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
             We analyzed your profile and discovered these high-compatibility MSME challenges.
           </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {innovatorProblemPool.map((p) => {
             const isRecommended = innovatorRecommendedProblems.some(r => r.id === p.id);
             return (
              <div
                key={p.id}
                role="link"
                tabIndex={0}
                onClick={() => {
                    const mapped: MarketplaceProblem = {
                      challenge: {
                        id: p.id.replace('prd-nag-', 'ch-').replace(/^0+/, ''),
                        title: p.title,
                        company: p.msme,
                        sector: p.sector,
                        summary: p.summary,
                        status: "Published",
                        businessImpact: p.businessImpact,
                        problemLocation: p.problemLocation,
                        desiredOutcome: p.desiredOutcome,
                        applicants: 12,
                      } as unknown as MsmeChallengeListItem,
                      city: p.region,
                     matchPct: p.matchPct,
                     difficulty: "Medium", 
                     teamSize: "2-4",
                     deadlineLabel: "Open",
                     valueLabel: p.valueLabel,
                     valueLakh: parseInt(p.valueLabel.replace(/\D/g, '')) || 0,
                     tags: [],
                     rewardType: "Pilot budget",
                     teamMode: "Either",
                     workMode: "Hybrid",
                     skills: p.why.split('+').map(s => s.trim()),
                     whyMatch: p.why,
                     deadlineSort: "",
                     listedSort: "",
                   };
                   setSelected(mapped);
                   setDrawerOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // Just auto-click for accessibility
                    e.currentTarget.click();
                  }
                }}
                className={cn(
                  "rounded-xl border border-border bg-card p-5 shadow-sm transition-all cursor-pointer flex flex-col h-full",
                  "hover:border-violet-500/30 hover:shadow-md hover:bg-gradient-to-br hover:from-card hover:to-violet-500/[0.05]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                )}
              >
                <div className="flex flex-wrap gap-2">
                  {isRecommended && (
                    <Badge className="text-[10px] gap-1 font-medium bg-violet-100 text-violet-800 hover:bg-violet-200 border-none">
                      <Sparkles className="h-3 w-3" />
                      AI recommended
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] font-bold tracking-widest text-primary border-primary/20">
                    {p.matchPct}% match
                  </Badge>
                </div>
                <h2 className="mt-4 text-base font-bold text-foreground leading-snug">{p.title}</h2>
                <div className="mt-1 flex gap-2 text-xs text-muted-foreground font-medium">
                  {p.msme} <span className="opacity-50">•</span> {p.region}
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">{p.summary}</p>
                
                <div className="mt-6 pt-4 border-t border-border/60 flex gap-2">
                  <Button size="sm" className="text-xs flex-1 rounded-lg" onClick={(e) => {
                     e.stopPropagation();
                     // Trigger parent click instead of full navigation to avoid duplicative logic
                     e.currentTarget.parentElement?.parentElement?.click();
                  }}>
                    View Detail Drawer
                  </Button>
                </div>
              </div>
             );
          })}
        </div>
      </TabsContent>

      <TabsContent value="dummy" className="hidden" /> {/* to satisfy radix tabs if mismatch */}
      </Tabs>

      {selected && detail && (() => {
        const matchingNagpurChallenge = NAGPUR_NEXT_CHALLENGES.find(c => 
          c.id === selected.challenge.id || c.challenge_number === Number(selected.challenge.id.replace('ch-', ''))
        );

        return (
          <DetailDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title={selected.challenge.title}
            subtitle={`${selected.challenge.company} · Strategic Roadmap`}
            className="sm:max-w-[800px] lg:max-w-[1000px] w-full"
          >
            <div className="flex flex-col h-full bg-white relative">
               <div className="flex-1 overflow-y-auto no-scrollbar">
                  <Tabs defaultValue="prd" className="w-full flex-1 flex flex-col min-h-0">
                    <div className="px-8 border-b border-border/50 sticky top-0 bg-white z-10 pt-2 shrink-0">
                      <TabsList className="bg-transparent gap-6 h-auto p-0 mb-[-1px]">
                        <TabsTrigger value="prd" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-3 text-xs font-semibold">
                          <FileCode2 className="h-3.5 w-3.5 mr-2" />
                          Full PRD
                        </TabsTrigger>
                        <TabsTrigger value="analysis" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-3 text-xs font-semibold">
                          <Sparkles className="h-3.5 w-3.5 mr-2" />
                          Analysis
                        </TabsTrigger>
                        <TabsTrigger value="protocol" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-3 text-xs font-semibold">
                          <Target className="h-3.5 w-3.5 mr-2" />
                          Protocol
                        </TabsTrigger>
                        <TabsTrigger value="solvers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-3 text-xs font-semibold">
                          <UsersIcon className="h-3.5 w-3.5 mr-2" />
                          Solvers ({selected.challenge.applicants})
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="prd" className="m-0 p-8 pt-6 min-h-[500px]">
                      {matchingNagpurChallenge ? (
                        <InnovationChallengePRD challenge={matchingNagpurChallenge} />
                      ) : (
                        <div className="space-y-6">
                           <section>
                             <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Problem Statement</h4>
                             <p className="text-sm text-foreground mt-2 leading-relaxed">{detail.problemStatement}</p>
                           </section>
                           <section>
                             <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deliverables</h4>
                             <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                               {detail.deliverables.map((d) => <li key={d}>{d}</li>)}
                             </ul>
                           </section>
                           <section>
                             <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timeline</h4>
                             <p className="text-sm text-foreground mt-2">{detail.timeline}</p>
                           </section>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="analysis" className="m-0 p-8 min-h-[500px] bg-neutral-50/50">
                      <div className="space-y-6 max-w-3xl animate-in slide-in-from-bottom-2 duration-500">
                         <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.05] to-transparent p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                               <Sparkles className="h-5 w-5 text-violet-600" />
                               <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100">Match Rationale</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm">{selected.whyMatch}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                               <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase bg-white/50">{selected.workMode}</Badge>
                               <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase bg-white/50">Team: {selected.teamSize}</Badge>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <Card className="shadow-none border-border">
                               <CardHeader className="p-4 pb-2">
                                  <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
                                    <span>Business Impact</span>
                                    <Target className="h-3.5 w-3.5" />
                                  </CardTitle>
                               </CardHeader>
                               <CardContent className="p-4 pt-0">
                                  <p className="text-sm font-semibold text-foreground/90 leading-tight">{selected.challenge.businessImpact || "TBD"}</p>
                               </CardContent>
                            </Card>

                            <Card className="shadow-none border-border">
                               <CardHeader className="p-4 pb-2">
                                  <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
                                    <span>Location</span>
                                    <FileText className="h-3.5 w-3.5" />
                                  </CardTitle>
                               </CardHeader>
                               <CardContent className="p-4 pt-0">
                                  <p className="text-sm font-semibold text-foreground/90 leading-tight">{selected.challenge.problemLocation || "TBD"}</p>
                               </CardContent>
                            </Card>
                         </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="protocol" className="m-0 p-8 bg-neutral-50/30 min-h-[500px]">
                      <div className="space-y-8 animate-in slide-in-from-bottom-2">
                        <div>
                          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" /> Evaluation Framework
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">Standardized milestone assessment protocol for this challenge.</p>
                        </div>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                          {[
                            { step: "Phase 1", title: "Technical Feasibility Screen", desc: "Initial review of proposed architecture and domain expertise.", status: "completed" },
                            { step: "Phase 2", title: "POC Validation", desc: "Testing of the core algorithm or prototype against sample data.", status: "current" },
                            { step: "Phase 3", title: "Security & Scale Audit", desc: "Assessment of deployment readiness and data privacy standards.", status: "upcoming" }
                          ].map((s, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                              <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm",
                                s.status === 'completed' ? 'bg-primary border-primary/20 text-white' : s.status === 'current' ? 'bg-background border-primary text-primary' : 'bg-background border-border text-muted-foreground'
                              )}>
                                {s.status === 'completed' ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                              </div>
                              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={cn("text-[10px] font-black uppercase tracking-widest", s.status === 'current' ? "text-primary" : "text-muted-foreground")}>{s.step}</span>
                                </div>
                                <h4 className="font-bold text-sm text-foreground">{s.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="solvers" className="m-0 p-8 min-h-[500px]">
                      <div className="space-y-6 animate-in slide-in-from-bottom-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                              <UsersIcon className="h-5 w-5 text-primary" /> Solver Analytics
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">Currently {selected.challenge.applicants} solvers have initiated applications.</p>
                          </div>
                          <Badge variant="secondary" className="font-mono">{selected.challenge.applicants} Tracked</Badge>
                        </div>
                        <div className="rounded-xl border border-border bg-card overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                              <tr>
                                <th className="text-left font-semibold py-3 px-4">Innovator Profile</th>
                                <th className="text-left font-semibold py-3 px-4">Match Score</th>
                                <th className="text-left font-semibold py-3 px-4">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                                        T{i}
                                      </div>
                                      <div>
                                        <div className="font-medium text-foreground">
                                          {selected.challenge.title === "SAR Drone Lighting Systems" && i === 1 
                                            ? "KIRAN" 
                                            : `Stealth Startup ${String.fromCharCode(64 + i)}`}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground flex gap-1 items-center">
                                          <MapPin className="h-3 w-3" /> 
                                          {selected.challenge.title === "SAR Drone Lighting Systems" && i === 1 
                                            ? "Nagpur NEXT · Lead Systems" 
                                            : "Pune, MH"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <Badge variant="outline" className="border-green-500/30 text-green-700 bg-green-500/10">
                                      {95 - (i * 3)}% Match
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                      Reviewing PRD
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan={3} className="py-4 text-center text-xs text-muted-foreground">
                                  +{selected.challenge.applicants - 3} more anonymous teams
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {matchingNagpurChallenge?.proposed_solution_pdf && (
                          <div className="mt-8 space-y-4 animate-in slide-in-from-bottom-2 delay-150">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                              <Presentation className="h-5 w-5 text-primary" /> Submitted Solution Pitch
                            </h3>
                            <div className="rounded-xl border border-border overflow-hidden bg-muted relative" style={{ height: "450px" }}>
                              <iframe 
                                src={`${matchingNagpurChallenge.proposed_solution_pdf}#toolbar=0`} 
                                className="w-full h-full border-0 bg-white" 
                                title="Proposed Solution PDF Viewer" 
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(matchingNagpurChallenge.proposed_solution_pdf, '_blank')}>
                                <ExternalLink className="h-3 w-3 mr-2" /> Open Full Screen
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
               </div>

               <div className="sticky bottom-0 w-full p-4 border-t border-border bg-white flex justify-between items-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                 <div className="flex items-center gap-3">
                   <Button variant="outline" size="sm" onClick={() => handleSave(selected)} className="font-bold text-xs h-10 px-4 rounded-xl shadow-sm">
                     <Bookmark className={cn("h-4 w-4 mr-2", isProblemSaved(selected.challenge.id) && "fill-primary text-primary")} />
                     {isProblemSaved(selected.challenge.id) ? "Saved to Pool" : "Save Challenge"}
                   </Button>
                 </div>
                 <Button onClick={() => handleApply(selected)} className="font-black tracking-widest uppercase text-xs h-10 px-8 rounded-xl shadow-sm">
                   Apply as Solver
                 </Button>
               </div>
            </div>
          </DetailDrawer>
        );
      })()}
    </div>
  );
}
