import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  Filter,
  Layers,
  Search,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NagpurNextTeamDrawer } from "@/components/cohort/NagpurNextTeamDrawer";
import { NAGPUR_NEXT_CYCLE_LABEL, NAGPUR_NEXT_INNOVATOR_TEAM_ID } from "@/data/nagpur-next-program-config";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import {
  getInnovatorSprintPulseForCohort,
} from "@/data/cohort-platform-sync";
import {
  getNagpurNextCohortKpis,
  getNagpurNextCohortState,
  getNagpurNextLaneProgress,
  getNagpurNextTeamsAttention,
} from "@/lib/nagpur-next-cohort-store";
import { useInnovatorSprintStore } from "@/hooks/use-innovator-sprint-store";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";

export default function CohortManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  useInnovatorSprintStore();
  const cohortV = useNagpurNextCohortStoreVersion();
  const pulse = getInnovatorSprintPulseForCohort();
  const kpis = useMemo(() => getNagpurNextCohortKpis(), [cohortV]);
  const lanes = useMemo(() => getNagpurNextLaneProgress(), [cohortV]);
  const teams = useMemo(() => getNagpurNextTeamsAttention(), [cohortV]);
  const cohortState = useMemo(() => getNagpurNextCohortState(), [cohortV]);

  const [search, setSearch] = useState("");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [sprintFilter, setSprintFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [mentorFilter, setMentorFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [drawerTeamId, setDrawerTeamId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  const filteredAttention = teams.filter((t) => {
    if (search && !`${t.teamName} ${t.studentLead}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (teamFilter !== "all" && t.id !== teamFilter) return false;
    if (phaseFilter !== "all" && !t.currentPhaseTitle.toLowerCase().includes(phaseFilter.toLowerCase())) return false;
    if (sprintFilter !== "all" && !t.currentSprintLabel.toLowerCase().includes(sprintFilter.toLowerCase())) return false;
    if (statusFilter === "at_risk" && !t.atRisk) return false;
    if (statusFilter === "on_track" && t.atRisk) return false;
    return true;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Cohort Mentor · {innovatorActiveChallenge.cohort.name}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Program desk</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Single active program — Nagpur NEXT. Execution data is shared with the innovator studio; mentor actions on tasks
            propagate instantly to Kiran&apos;s sprint and dashboard.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Current cycle:</span> {NAGPUR_NEXT_CYCLE_LABEL}
            {pulse.activeSprintProjects > 0 && (
              <>
                {" "}
                · <span className="font-semibold text-foreground">Legacy Kanban sprints:</span> {pulse.activeSprintProjects}{" "}
                active (marketplace / EV demos)
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2 shadow-sm" asChild>
            <Link to="/cohort/program">
              <Layers className="h-4 w-4" />
              Program builder
            </Link>
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => toast.message("Filters saved", { description: "Desk preferences (demo)." })}>
            <Sparkles className="h-4 w-4" />
            Save view
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/innovator/sprint">Open innovator sprint</Link>
          </Button>
        </div>
      </section>

      {/* Search + filters */}
      <Card className="border-border shadow-sm">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:flex-wrap md:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 pl-9"
              placeholder="Search teams or leads…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="h-9 w-[150px] text-xs">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All phases</SelectItem>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
                <SelectItem value="pilot">Pilot</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sprintFilter} onValueChange={setSprintFilter}>
              <SelectTrigger className="h-9 w-[150px] text-xs">
                <SelectValue placeholder="Sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sprints</SelectItem>
                <SelectItem value="mvp">MVP Build</SelectItem>
                <SelectItem value="planning">Prototype Planning</SelectItem>
                <SelectItem value="ideation">Ideation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-[130px] text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="at_risk">At risk</SelectItem>
                <SelectItem value="on_track">On track</SelectItem>
              </SelectContent>
            </Select>
            <Select value={mentorFilter} onValueChange={setMentorFilter}>
              <SelectTrigger className="h-9 w-[160px] text-xs">
                <SelectValue placeholder="Mentor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All mentors</SelectItem>
                <SelectItem value="msme">{innovatorActiveChallenge.mentor.primaryName}</SelectItem>
                <SelectItem value="cohort">Dr. Rao</SelectItem>
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="h-9 w-[160px] text-xs">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teams</SelectItem>
                {teams.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.teamName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">Nagpur NEXT pulse</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          {kpis.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => {
                if (k.id === "pr") navigate("/cohort/program");
                else toast.message(k.label, { description: "Metric drill-down (demo)." });
              }}
              className={cn(
                "group text-left rounded-xl border border-border bg-card p-4 shadow-sm transition-all",
                "hover:border-primary/35 hover:shadow-md hover:bg-gradient-to-br hover:from-card hover:to-primary/[0.03]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              )}
            >
              <div className="flex justify-between items-start gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight">{k.label}</p>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-40 group-hover:opacity-100 shrink-0 transition-opacity" />
              </div>
              <p className="mt-2 text-xl font-bold font-mono text-foreground">{k.value}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Phase progress */}
      <section id="cohort-progress" className="scroll-mt-28 space-y-3">
        <h2 className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          Cohort progress overview
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {lanes.map((lane) => (
            <Card key={lane.id} className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{lane.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Completion</span>
                  <span className="font-mono font-semibold text-foreground">{lane.completionPct}%</span>
                </div>
                <Progress value={lane.completionPct} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Teams attention */}
        <section id="teams-attention" className="scroll-mt-28 space-y-3">
          <h2 className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Teams requiring attention
          </h2>
          <div className="space-y-3">
            {filteredAttention.map((t) => (
              <Card
                key={t.id}
                className={cn(
                  "border-border shadow-sm transition-colors",
                  t.atRisk && "border-amber-500/35 bg-amber-500/[0.03]",
                )}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{t.teamName}</p>
                      <p className="text-xs text-muted-foreground">
                        Lead: {t.studentLead} · {t.college}
                      </p>
                    </div>
                    {t.atRisk ? (
                      <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-900 dark:text-amber-100">
                        At risk
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] border-emerald-500/35 text-emerald-800 dark:text-emerald-100">
                        On track
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.currentPhaseTitle}</span> · {t.currentSprintLabel}
                  </div>
                  {t.riskReason ? <p className="text-[11px] text-amber-800 dark:text-amber-200">{t.riskReason}</p> : null}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="h-8"
                      onClick={() => {
                        setDrawerTeamId(t.id);
                        setDrawerOpen(true);
                      }}
                    >
                      Open team
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" asChild>
                      <Link to="/cohort/program">Review tasks</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Activity + reviews */}
        <div className="space-y-4">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Recent activity
            </h2>
            <Card className="border-border shadow-sm">
              <CardContent className="max-h-[280px] space-y-2 overflow-y-auto p-4">
                {cohortState.activity.map((a) => (
                  <div key={a.id} className="rounded-lg border border-border/80 bg-secondary/20 px-3 py-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{a.label}</span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{a.atLabel}</span>
                    </div>
                    <p className="mt-0.5 text-muted-foreground">{a.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Upcoming reviews
            </h2>
            <Card className="border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[11px]">Date</TableHead>
                    <TableHead className="text-[11px]">Team</TableHead>
                    <TableHead className="text-[11px]">Sprint</TableHead>
                    <TableHead className="text-[11px]">Mentor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cohortState.upcomingReviews.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.dateLabel}</TableCell>
                      <TableCell className="text-xs max-w-[140px]">{r.teamName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.sprintLabel}</TableCell>
                      <TableCell className="text-xs">{r.mentor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
        </div>
      </div>

      <Card className="border-dashed border-primary/25 bg-primary/[0.02]">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>
              Primary innovator team <span className="font-medium text-foreground">{NAGPUR_NEXT_INNOVATOR_TEAM_ID}</span> is
              wired to the same JSON store as this desk.
            </span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate("/ceo/regional-hub")}>
            CEO regional hub
          </Button>
        </CardContent>
      </Card>

      <NagpurNextTeamDrawer teamId={drawerTeamId} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
