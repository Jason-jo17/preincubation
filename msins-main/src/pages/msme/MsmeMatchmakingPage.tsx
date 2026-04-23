import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Filter,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Target,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  MATCHMAKING_HUB_TABS,
  aiBestMatches,
  individualProfiles,
  invitePipelineSeed,
  matchExplainability,
  msmeMatchmakingKpis,
  startupDirectory,
  teamDirectory,
  type IndividualProfile,
  type InvitePipelineRow,
  type MatchmakingHubTab,
  type StartupDirectoryRow,
  type TeamDirectoryRow,
} from "@/data/msme-matchmaking";

const kpiIcons: Record<(typeof msmeMatchmakingKpis)[number]["icon"], LucideIcon> = {
  spark: Sparkles,
  send: Send,
  check: CheckCircle2,
  message: MessageSquare,
  target: Target,
  userPlus: UserPlus,
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

export default function MsmeMatchmakingPage() {
  const [tab, setTab] = useState<MatchmakingHubTab>("ai_matches");
  const [query, setQuery] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState<string>(aiBestMatches[0]?.id ?? "ai-coep");
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [invites, setInvites] = useState<InvitePipelineRow[]>(() => [...invitePipelineSeed]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileTitle, setProfileTitle] = useState("");
  const [profileBody, setProfileBody] = useState("");
  const [profileKind, setProfileKind] = useState<InvitePipelineRow["kind"]>("team");

  const openProfile = (title: string, body: string, kind: InvitePipelineRow["kind"] = "team") => {
    setProfileTitle(title);
    setProfileBody(body);
    setProfileKind(kind);
    setProfileOpen(true);
  };

  const toggleSave = (id: string, label: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.message("Removed from saved", { description: label });
      } else {
        next.add(id);
        toast.success("Saved", { description: label });
      }
      return next;
    });
  };

  const sendInvite = (name: string, kind: InvitePipelineRow["kind"]) => {
    const id = `inv-${Date.now()}`;
    setInvites((rows) => [{ id, name, kind, status: "Sent" }, ...rows]);
    toast.success("Invite sent", {
      description: `${name} — accepting unlocks challenge details for the innovator.`,
    });
  };

  const pipelineRows = useMemo(() => {
    let base = invites;
    if (tab === "invited") base = invites.filter((r) => r.status === "Sent" || r.status === "Viewed");
    else if (tab === "accepted") base = invites.filter((r) => r.status === "Accepted");
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter((r) => r.name.toLowerCase().includes(q));
  }, [invites, tab, query]);

  const textMatches = (s: string) => !query.trim() || s.toLowerCase().includes(query.toLowerCase());

  const savedItems = useMemo(() => {
    const items: { id: string; label: string; sub: string; kind: InvitePipelineRow["kind"] }[] = [];
    savedIds.forEach((id) => {
      const ai = aiBestMatches.find((m) => m.id === id);
      if (ai) items.push({ id, label: ai.teamName, sub: `${ai.source} · ${ai.matchScore}% fit`, kind: "team" });
      const t = teamDirectory.find((x) => x.id === id);
      if (t) items.push({ id, label: t.teamName, sub: `${t.region} · ${t.domain}`, kind: "team" });
      const i = individualProfiles.find((x) => x.id === id);
      if (i) items.push({ id, label: i.name, sub: `${i.role} · ${i.city}`, kind: "individual" });
      const s = startupDirectory.find((x) => x.id === id);
      if (s) items.push({ id, label: s.name, sub: s.tagline, kind: "startup" });
    });
    return items;
  }, [savedIds]);

  const explain = matchExplainability[selectedMatchId] ?? matchExplainability["ai-coep"];

  const renderAiSection = (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-foreground">AI best matches</h2>
          <Badge variant="secondary" className="text-[10px]">
            Ranked for your published challenges
          </Badge>
        </div>
        {aiBestMatches.map((m) => (
          <Card
            key={m.id}
            className={cn(
              "border-border shadow-sm transition-all cursor-pointer hover:border-primary/30",
              selectedMatchId === m.id && "ring-2 ring-primary/25 border-primary/40",
            )}
            onClick={() => setSelectedMatchId(m.id)}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {m.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-lg text-foreground">{m.teamName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Source: {m.source}</p>
                    <p className="text-sm font-mono font-semibold text-primary mt-2">{m.matchScore}% match</p>
                  </div>
                </div>
                <Badge className="shrink-0 w-fit">AI ranked</Badge>
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Why match</p>
                <ul className="mt-2 space-y-1 text-sm text-foreground list-disc pl-4">
                  {m.whyMatch.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Mindset</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {m.mindset.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProfile(
                      m.teamName,
                      `${m.source}\n\n${m.whyMatch.join("\n")}\n\nMindset: ${m.mindset.join(", ")}\n\nPast builds and references available under NDA for shortlisted MSMEs.`,
                      "team",
                    );
                  }}
                >
                  View full profile
                </Button>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    sendInvite(m.teamName, "team");
                  }}
                >
                  Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(m.id, m.teamName);
                  }}
                >
                  {savedIds.has(m.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border shadow-sm xl:sticky xl:top-4 h-fit">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Match explainability</CardTitle>
          <p className="text-xs text-muted-foreground">Why this fit score</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-3xl font-bold font-mono text-primary">{explain.score}%</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fit because</p>
          <ul className="space-y-2 text-sm text-foreground list-disc pl-4">
            {explain.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground leading-relaxed pt-2">
            Accepting an invite unlocks challenge documents and milestone templates for this innovator.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeamsTable = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Teams directory</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Solver teams from Maharashtra incubators &amp; TBI network</p>
      </CardHeader>
      <CardContent className="pt-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-border text-left bg-muted/40">
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Team</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Members</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Region</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Domain</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Past projects</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Match</th>
              <th className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Availability</th>
              <th className="py-2.5 px-3 text-right text-[11px] font-medium text-muted-foreground uppercase tracking-wider"> </th>
            </tr>
          </thead>
          <tbody>
            {teamDirectory.filter((r) => textMatches(`${r.teamName} ${r.region} ${r.domain}`)).map((row: TeamDirectoryRow) => (
              <tr key={row.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-3 font-medium">{row.teamName}</td>
                <td className="py-2.5 px-3 text-xs text-muted-foreground">{row.members}</td>
                <td className="py-2.5 px-3 text-xs">{row.region}</td>
                <td className="py-2.5 px-3 text-xs max-w-[180px]">{row.domain}</td>
                <td className="py-2.5 px-3 text-xs text-muted-foreground max-w-[200px]">{row.pastProjects}</td>
                <td className="py-2.5 px-3 font-mono text-primary font-semibold">{row.matchScore}%</td>
                <td className="py-2.5 px-3 text-xs">{row.availability}</td>
                <td className="py-2.5 px-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => {
                        setSelectedMatchId(row.id === "td-coep" ? "ai-coep" : "ai-agribot");
                        openProfile(row.teamName, `${row.domain}\n${row.pastProjects}`, "team");
                      }}
                    >
                      Profile
                    </Button>
                    <Button size="sm" className="h-8 text-xs" onClick={() => sendInvite(row.teamName, "team")}>
                      Invite
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toggleSave(row.id, row.teamName)}>
                      {savedIds.has(row.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  const renderIndividuals = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {individualProfiles.filter((p) => textMatches(`${p.name} ${p.city} ${p.skills}`)).map((p: IndividualProfile) => (
        <Card key={p.id} className="border-border hover:border-primary/25 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{p.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{p.role}</p>
            <Badge variant="secondary" className="w-fit text-[10px]">
              {p.city}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Skills:</span> {p.skills}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="text-xs h-8" onClick={() => sendInvite(p.name, "individual")}>
                Invite
              </Button>
              <Button variant="secondary" size="sm" className="text-xs h-8" onClick={() => toast.message("Message", { description: p.name })}>
                Message
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => openProfile(p.name, `${p.role}\n${p.city}\n${p.skills}`, "individual")}>
                View profile
              </Button>
              <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => toggleSave(p.id, p.name)}>
                {savedIds.has(p.id) ? "Saved" : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStartups = (
    <div className="grid gap-4 md:grid-cols-3">
      {startupDirectory.filter((s) => textMatches(`${s.name} ${s.tagline}`)).map((s: StartupDirectoryRow) => (
        <Card key={s.id} className="border-border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">{s.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{s.tagline}</p>
            {s.region && <p className="text-xs text-muted-foreground mt-1">{s.region}</p>}
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button size="sm" className="text-xs" onClick={() => sendInvite(s.name, "startup")}>
              Invite
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => openProfile(s.name, s.tagline, "startup")}>
              View profile
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => toggleSave(s.id, s.name)}>
              {savedIds.has(s.id) ? "Saved" : "Save"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderInvitePipeline = (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Invite pipeline</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Track sent invites and responses</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {(tab === "invited" || tab === "accepted" ? pipelineRows : invites)
          .filter((r) => (tab === "invited" || tab === "accepted" ? true : textMatches(r.name)))
          .map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{row.name}</p>
                <p className="text-[11px] text-muted-foreground capitalize">{row.kind}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={row.status} />
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toast.message("Status detail", { description: row.name })}>
                  View
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );

  const renderSaved = (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Saved profiles</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Revisit teams, people, and startups you bookmarked</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {savedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">Nothing saved yet — use Save on any card or row.</p>
        ) : (
          savedItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full text-left rounded-lg border border-border px-3 py-2.5 hover:bg-muted/50 transition-colors"
              onClick={() => openProfile(item.label, item.sub, item.kind)}
            >
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </button>
          ))
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Matchmaking Hub</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Find the best teams, innovators, and solvers for your business challenges
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9 h-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Filter className="h-4 w-4" />
                Advanced filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onSelect={() => toast.message("Filter: Pune region")}>Region: Pune</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast.message("Filter: Match ≥ 90%")}>High fit only (≥90%)</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast.message("Filter: Available now")}>Available now</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-9 gap-1.5" onClick={() => toast.success("Export", { description: "Match list CSV (prototype)" })}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Matchmaking"
        className="inline-flex h-auto min-h-10 w-full flex-wrap gap-1 rounded-md bg-muted/80 p-1 text-muted-foreground"
      >
        {MATCHMAKING_HUB_TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              tab === t.value ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {msmeMatchmakingKpis.map((k) => (
          <KpiTile key={k.id} label={k.label} value={k.value} trend={k.trend} Icon={kpiIcons[k.icon]} />
        ))}
      </div>

      {tab === "ai_matches" && (
        <>
          {renderAiSection}
          <Separator />
          {renderInvitePipeline}
        </>
      )}
      {tab === "teams" && renderTeamsTable}
      {tab === "individuals" && renderIndividuals}
      {tab === "startups" && renderStartups}
      {(tab === "invited" || tab === "accepted") && renderInvitePipeline}
      {tab === "saved" && renderSaved}

      {tab !== "ai_matches" && tab !== "saved" && tab !== "invited" && tab !== "accepted" && (
        <Card className="border-dashed border-border bg-muted/20">
          <CardContent className="py-4 text-sm text-muted-foreground">
            Tip: Open <strong className="text-foreground">AI Matches</strong> for ranked recommendations and fit explainability, or use{" "}
            <strong className="text-foreground">Invited</strong> / <strong className="text-foreground">Accepted</strong> to track your outreach.
          </CardContent>
        </Card>
      )}

      {(tab === "teams" || tab === "individuals" || tab === "startups") && (
        <>
          <Separator />
          {renderInvitePipeline}
        </>
      )}

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{profileTitle}</DialogTitle>
            <DialogDescription className="text-left whitespace-pre-line text-sm text-foreground pt-2">{profileBody}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setProfileOpen(false)}>
              Close
            </Button>
            <Button size="sm" onClick={() => sendInvite(profileTitle, profileKind)}>
              Send invite
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
