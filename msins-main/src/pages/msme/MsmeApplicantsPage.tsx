import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  ListChecks,
  MoreHorizontal,
  Search,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  APPLICANTS_WORKSPACE_TABS,
  activeTeamsDetailed,
  blockerEscalations,
  completedTeamsScoreboard,
  kanbanColumns,
  kanbanTeamCards,
  msmeApplicantsKpis,
  packagingChallengeApplicants,
  type ApplicantsWorkspaceTab,
  type MsmeActiveTeamRow,
  type MsmeApplicantRow,
} from "@/data/msme-applicants-workspace";
import { useInnovatorMarketplaceBridge } from "@/hooks/use-innovator-marketplace-bridge";

const kpiIcons: Record<(typeof msmeApplicantsKpis)[number]["icon"], LucideIcon> = {
  users: Users,
  list: ListChecks,
  zap: Zap,
  check: CheckCircle2,
  clock: Clock,
  alert: AlertTriangle,
};

function KpiTile({
  label,
  value,
  trend,
  Icon,
}: {
  label: string;
  value: string;
  trend?: { value: string; positive: boolean };
  Icon: LucideIcon;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5 space-y-2 transition-all hover:border-primary/25 hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive",
            )}
          >
            {trend.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-xl sm:text-2xl font-bold font-mono text-foreground">{value}</p>
    </div>
  );
}

function filterApplicants(rows: MsmeApplicantRow[], tab: ApplicantsWorkspaceTab): MsmeApplicantRow[] {
  if (tab === "shortlisted") return rows.filter((r) => r.status === "Shortlisted");
  if (tab === "active_teams" || tab === "completed") return [];
  if (tab === "blocked") return rows;
  return rows;
}

function filterActiveTeams(rows: MsmeActiveTeamRow[], tab: ApplicantsWorkspaceTab): MsmeActiveTeamRow[] {
  if (tab === "blocked") return rows.filter((r) => r.blocker);
  if (tab === "completed") return [];
  return rows;
}

export default function MsmeApplicantsPage() {
  const [tab, setTab] = useState<ApplicantsWorkspaceTab>("all_applicants");
  const [query, setQuery] = useState("");
  const { marketplaceApplicants } = useInnovatorMarketplaceBridge();

  const mergedApplicants = useMemo(
    () => [...packagingChallengeApplicants, ...marketplaceApplicants],
    [marketplaceApplicants],
  );

  const applicants = useMemo(() => {
    const base = filterApplicants(mergedApplicants, tab);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (r) =>
        r.teamName.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.skills.toLowerCase().includes(q),
    );
  }, [tab, query, mergedApplicants]);

  const activeTeams = useMemo(() => {
    const base = filterActiveTeams(activeTeamsDetailed, tab);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (r) =>
        r.teamName.toLowerCase().includes(q) ||
        r.challenge.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q),
    );
  }, [tab, query]);

  const kanbanFiltered = useMemo(() => {
    if (!query.trim()) return kanbanTeamCards;
    const q = query.toLowerCase();
    return kanbanTeamCards.filter(
      (c) =>
        c.teamName.toLowerCase().includes(q) ||
        c.challengeTitle.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q),
    );
  }, [query]);

  const showApplicantPipeline = tab !== "active_teams" && tab !== "completed";
  const scoreboardFirst = tab === "completed";

  const applicantActions = (row: MsmeApplicantRow) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          Actions
          <MoreHorizontal className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onSelect={() => toast.message("View", { description: row.teamName })}>View</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.success("Shortlisted", { description: row.teamName })}>Shortlist</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.error("Rejected", { description: row.teamName })}>Reject</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast.success("Team selected", { description: row.teamName })}>Select</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const teamRowActions = (row: MsmeActiveTeamRow) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onSelect={() => toast.message("Progress detail", { description: row.teamName })}>
          View Progress
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.message("Open messages", { description: row.teamName })}>Message</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.success("Milestone approved", { description: row.teamName })}>
          Approve Milestone
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.message("Submission review", { description: row.teamName })}>
          Review Submission
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const scoreboardSection = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold">Performance scoreboard</CardTitle>
        <Badge variant="secondary" className="text-[10px]">
          Completed teams
        </Badge>
      </CardHeader>
      <CardContent className="pt-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Team</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Challenge</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Delivery</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Impact</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {completedTeamsScoreboard.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => toast.message(r.team)}>
                <td className="py-2.5 px-3 font-medium">{r.team}</td>
                <td className="py-2.5 px-3 text-muted-foreground">{r.challenge}</td>
                <td className="py-2.5 px-3 text-xs">{r.delivery}</td>
                <td className="py-2.5 px-3 text-xs">{r.impact}</td>
                <td className="py-2.5 px-3 text-right font-mono text-primary font-semibold">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  const pipelineSection = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-sm font-semibold">Applicants pipeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Challenge: <span className="text-foreground font-medium">Reduce Packaging Waste</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {applicants.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            {tab === "active_teams" || tab === "completed"
              ? "Applicant queue is hidden in this view — switch to All or Shortlisted to review submissions."
              : "No applicants match filters."}
          </p>
        ) : (
          <div className="space-y-3">
            {applicants.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-border bg-card/50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between hover:border-primary/25 transition-colors"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-semibold text-foreground">{row.teamName}</p>
                  <p className="text-xs text-muted-foreground">Source: {row.source}</p>
                  <p className="text-xs">
                    <span className="text-muted-foreground">Match</span>{" "}
                    <span className="font-mono font-semibold text-primary">{row.matchScore}%</span>
                    <span className="text-muted-foreground mx-2">·</span>
                    <span className="text-muted-foreground">Skills:</span> {row.skills}
                  </p>
                  <StatusBadge status={row.status} />
                </div>
                <div className="flex shrink-0 gap-2">{applicantActions(row)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const activeTeamsSection = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Active teams & execution</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Progress, stage, and mentor status in one place</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {activeTeams.length === 0 && tab === "completed" ? (
          <p className="text-sm text-muted-foreground py-4">No in-flight teams — see completed scoreboard.</p>
        ) : activeTeams.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No teams match this filter.</p>
        ) : (
          activeTeams.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-border p-4 space-y-3 hover:border-primary/25 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => toast.message(row.teamName, { description: `${row.progress}% · ${row.stage}` })}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{row.teamName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {row.challenge} · {row.company}
                  </p>
                </div>
                {teamRowActions(row)}
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <Badge variant="outline" className="font-normal">
                  Stage: {row.stage}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Mentor: {row.mentor}
                </Badge>
                {row.blocker ? (
                  <Badge variant="destructive" className="font-normal bg-destructive/10 text-destructive border-destructive/30">
                    Blocker: {row.blocker}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="font-normal border-success/30 text-success bg-success/5">
                    Blocker: None
                  </Badge>
                )}
                <span className="text-muted-foreground self-center">Last update: {row.lastUpdate}</span>
              </div>
              <div className="flex items-center gap-3 max-w-md">
                <Progress value={row.progress} className="h-2 flex-1" />
                <span className="text-xs font-mono text-muted-foreground w-10">{row.progress}%</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );

  const kanbanSection = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Execution board</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Research → Approved workflow</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {kanbanColumns.map((col) => (
            <div key={col.id} className="rounded-xl border border-border bg-muted/20 p-2 min-h-[200px] flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-2 border-b border-border/60">
                {col.label}
              </p>
              <div className="flex flex-col gap-2 p-2 flex-1">
                {kanbanFiltered
                  .filter((c) => c.column === col.id)
                  .map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toast.message(c.teamName, { description: c.challengeTitle })}
                      className="rounded-lg border border-border bg-card p-3 text-left text-xs hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <p className="font-semibold text-foreground">{c.teamName}</p>
                      <p className="text-muted-foreground mt-1 line-clamp-2">{c.challengeTitle}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 truncate">{c.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={c.progress} className="h-1.5 flex-1" />
                        <span className="font-mono text-[10px] text-muted-foreground">{c.progress}%</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const blockersSection = (
    <Card className={cn("border-border shadow-sm", tab === "blocked" && "ring-2 ring-primary/20")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Blockers & escalations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {blockerEscalations.map((b) => (
          <div key={b.id} className="rounded-lg border border-border p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{b.detail}</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button size="sm" variant="secondary" className="text-xs h-8" onClick={() => toast.success("Resolved", { description: b.title })}>
                Resolve
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => toast.message("Message sent", { description: b.title })}>
                Message
              </Button>
              <Button size="sm" variant="destructive" className="text-xs h-8 bg-destructive/90" onClick={() => toast.error("Escalated", { description: b.title })}>
                Escalate
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Applicants & Teams</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review applicants, manage selected teams, track execution progress
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams, sources…"
              className="pl-9 h-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onSelect={() => toast.message("Filter: Maharashtra only")}>Region: Maharashtra</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast.message("Filter: Pune cluster")}>Cluster: Pune</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast.message("Filter: High match")}>Match score ≥ 85%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-9 gap-1.5" onClick={() => toast.success("Export started", { description: "CSV download (prototype)" })}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Applicants workspace"
        className="inline-flex h-auto min-h-10 w-full flex-wrap gap-1 rounded-md bg-muted/80 p-1 text-muted-foreground"
      >
        {APPLICANTS_WORKSPACE_TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              tab === t.value ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {msmeApplicantsKpis.map((k) => (
          <KpiTile key={k.id} label={k.label} value={k.value} trend={k.trend} Icon={kpiIcons[k.icon]} />
        ))}
      </div>

      {scoreboardFirst && (
        <>
          {scoreboardSection}
          <Separator className="my-2" />
        </>
      )}

      {showApplicantPipeline && pipelineSection}

      {activeTeamsSection}
      {kanbanSection}
      {blockersSection}

      {!scoreboardFirst && scoreboardSection}
    </div>
  );
}
