import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { toast } from "sonner";
import { 
  Award,
  Briefcase,
  Check, 
  ChevronDown, 
  Clock,
  ExternalLink,
  FileCode2,
  FileText, 
  Lock,
  MapPin,
  MessageSquare, 
  MoreHorizontal, 
  Presentation,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Target, 
  Trophy,
  Users as UsersIcon,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { InnovationChallengePRD } from "@/components/dashboard/InnovationChallengePRD";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MSME_CHALLENGE_TABS,
  challengeMatchesTab,
  initialMsmeChallengeList,
  type MsmeChallengeListItem,
  type MsmeChallengeTab,
} from "@/data/msme-challenges-list";
import {
  NAGPUR_NEXT_CHALLENGES,
  NAGPUR_NEXT_PROGRAM_META,
  NAGPUR_TOTAL_CHALLENGES,
  NAGPUR_TOTAL_APPLICANTS,
  NAGPUR_AVG_IMPACT,
  type NagpurNextChallenge,
} from "@/data/nagpur-next-data";
import {
  MsmeNewChallengeWizard,
  mapChallengeToWizardSeed,
  type NewChallengeWizardPayload,
} from "@/pages/msme/MsmeNewChallengeWizard";

// Fixing lucide-material to lucide-react (hallucination check)
import { 
  Check as LCheck, 
} from "lucide-react";

function nextId() {
  return `ch-${Date.now()}`;
}

const ALL_CHALLENGES: (MsmeChallengeListItem | NagpurNextChallenge)[] = [
  ...NAGPUR_NEXT_CHALLENGES,
  ...initialMsmeChallengeList.filter(c => !NAGPUR_NEXT_CHALLENGES.some(nc => nc.id === c.id))
];

export default function MsmeChallengesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<MsmeChallengeTab>("all");
  const [rows, setRows] = useState<(MsmeChallengeListItem | NagpurNextChallenge)[]>(() => [...ALL_CHALLENGES]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<(MsmeChallengeListItem | NagpurNextChallenge) | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardKey, setWizardKey] = useState(0);
  const [editChallengeId, setEditChallengeId] = useState<string | null>(null);

  const filtered = useMemo(() => rows.filter((r) => challengeMatchesTab(r, tab)), [rows, tab]);

  const openDrawer = (row: MsmeChallengeListItem | NagpurNextChallenge) => {
    setSelected(row);
    setDrawerOpen(true);
  };

  const patchRow = (id: string, patch: Partial<MsmeChallengeListItem>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch, lastUpdated: "Just now" } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, ...patch, lastUpdated: "Just now" } : s));
  };

  const openWizardNew = () => {
    setEditChallengeId(null);
    setWizardKey((k) => k + 1);
    setWizardOpen(true);
  };

  const openWizardEdit = (row: MsmeChallengeListItem) => {
    setEditChallengeId(row.id);
    setWizardKey((k) => k + 1);
    setWizardOpen(true);
  };

  const wizardSeed = editChallengeId ? mapChallengeToWizardSeed(rows.find((r) => r.id === editChallengeId)!) : null;

  const upsertFromWizard = (payload: NewChallengeWizardPayload, editId: string | null | undefined, asDraft: boolean) => {
    if (editId) {
      setRows((rs) =>
        rs.map((r) =>
          r.id === editId
            ? {
                ...r,
                ...payload,
                status: asDraft ? "Draft" : "Under Review",
                verificationStage: asDraft ? "none" : "pending_review",
                lastUpdated: "Just now",
              }
            : r,
        ),
      );
      setSelected((s) =>
        s?.id === editId
          ? {
              ...s,
              ...payload,
              status: asDraft ? "Draft" : "Under Review",
              verificationStage: asDraft ? "none" : "pending_review",
              lastUpdated: "Just now",
            }
          : s,
      );
      toast.success(asDraft ? "Draft updated" : "Submitted for verification", {
        description: payload.title,
      });
      return;
    }
    const id = nextId();
    const row: MsmeChallengeListItem = {
      id,
      ...payload,
      region: payload.region ?? "Pune",
      status: asDraft ? "Draft" : "Under Review",
      verificationStage: asDraft ? "none" : "pending_review",
      applicants: 0,
      progress: asDraft ? null : 0,
      publishedToInnovators: false,
      lastUpdated: "Just now",
    };
    setRows((rs) => [row, ...rs]);
    toast.success(asDraft ? "Draft saved" : "Submitted for verification", { description: row.title });
  };

  const runPublishAction = (row: MsmeChallengeListItem) => {
    if (row.status === "Under Review") {
      patchRow(row.id, {
        status: "Published",
        publishedToInnovators: true,
        verificationStage: "live",
        progress: row.progress ?? 0,
      });
      toast.success("Published to innovators", { description: row.title });
      return;
    }
    if (row.status === "Draft") {
      patchRow(row.id, { status: "Under Review", verificationStage: "pending_review", publishedToInnovators: false });
      toast.success("Submitted for verification", { description: row.title });
      return;
    }
    if (row.publishedToInnovators) {
      patchRow(row.id, { publishedToInnovators: false });
      toast.message("Unpublished from innovator pool", { description: row.title });
    } else {
      patchRow(row.id, { publishedToInnovators: true, verificationStage: "live" });
      toast.success("Visible to innovators", { description: row.title });
    }
  };

  const verificationSteps = (row: MsmeChallengeListItem) => {
    const pastDraft = row.status !== "Draft" && row.status !== "Paused";
    const approvedOrLive =
      row.verificationStage === "approved" ||
      row.verificationStage === "live" ||
      row.status === "Published" ||
      row.status === "In Progress" ||
      row.status === "Completed";
    return [
      { key: "review", label: "Under review", done: pastDraft },
      { key: "approved", label: "Approved for listing", done: approvedOrLive },
      { key: "live", label: "Visible to innovators", done: row.verificationStage === "live" && row.publishedToInnovators },
    ];
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-1000">
      {/* Premium Compact Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-8 shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 -m-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 left-0 -m-16 h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-[80px]" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-6 w-6 rounded-full border border-neutral-950 bg-neutral-800 flex items-center justify-center overflow-hidden">
                     <UsersIcon className="h-3 w-3 text-primary/70" />
                   </div>
                 ))}
              </div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">
                Join 420+ Global Innovators
              </p>
            </div>
            
            <div className="space-y-1">
              <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 py-0.5 px-3 rounded-full text-[9px] font-black tracking-widest uppercase mb-2 inline-block">
                {NAGPUR_NEXT_PROGRAM_META.program}
              </Badge>
              <h1 className="text-3xl font-black text-white tracking-tighter sm:text-4xl lg:text-5xl bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent leading-tight border-b-0">
                Innovation Hub
              </h1>
            </div>

            <p className="text-sm text-neutral-400 font-medium max-w-[480px]">
              The high-fidelity launchpad for MSME problem solvers. 
              Review PRDs and manage industrial breakthroughs.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={openWizardNew} className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                + Launch Challenge
              </Button>
              <Button variant="outline" className="h-10 px-6 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold text-sm backdrop-blur-sm transition-all">
                Partner Guidelines
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[320px] shrink-0">
            <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors group">
              <CardContent className="p-4 space-y-1.5 flex flex-col items-center justify-center text-center">
                <Rocket className="h-4 w-4 text-primary group-hover:-translate-y-1 transition-transform" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Active PRDs</p>
                <p className="text-2xl font-black text-white tracking-tight">{NAGPUR_TOTAL_CHALLENGES}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors group">
              <CardContent className="p-4 space-y-1.5 flex flex-col items-center justify-center text-center">
                <UsersIcon className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Team Solvers</p>
                <p className="text-2xl font-black text-white tracking-tight">{NAGPUR_TOTAL_APPLICANTS}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors group">
              <CardContent className="p-4 space-y-1.5 flex flex-col items-center justify-center text-center">
                <Zap className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Avg Impact</p>
                <div className="flex items-baseline gap-1 justify-center">
                  <p className="text-xl font-black text-white tracking-tight">{NAGPUR_AVG_IMPACT}</p>
                  <p className="text-[10px] font-bold text-white/40">/10</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors group">
              <CardContent className="p-4 space-y-1.5 flex flex-col items-center justify-center text-center">
                <Trophy className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Awards Pool</p>
                <p className="text-xl font-black text-white tracking-tight">₹50L+</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Active Challenges</h2>
            <p className="text-sm text-muted-foreground font-medium">Manage and monitor the innovation pipeline across {rows.length} domains.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Tabs value={tab} onValueChange={(v) => setTab(v as MsmeChallengeTab)} className="w-full md:w-auto">
              <TabsList className="bg-muted/50 p-1.5 rounded-2xl border border-border/50">
                <TabsTrigger value="all" className="rounded-xl text-xs font-bold px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all">
                  Full Hub Discovery
                </TabsTrigger>
                <TabsTrigger value="published" className="rounded-xl text-xs font-bold px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
                  Active Engagements
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                placeholder="Find in hub..." 
                className="w-full pl-12 pr-4 py-3 bg-muted/40 border-border/50 rounded-2xl text-sm focus:ring-4 focus:ring-primary/10 border outline-none transition-all placeholder:font-medium"
              />
            </div>
          </div>
        </div>

        {tab === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-1000">
            {filtered.map((row) => {
              const isNagpurNext = "challenge_number" in row;
              return (
                <Card 
                  key={row.id} 
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border-border/50 bg-card transition-all duration-500",
                    (row.id === "challenge-nag-011" || isNagpurNext)
                      ? "hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-pointer" 
                      : "opacity-60 grayscale cursor-not-allowed border-dashed"
                  )}
                  onClick={() => (row.id === "challenge-nag-011" || isNagpurNext) && openDrawer(row)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {row.id !== "challenge-nag-011" && (
                    <div className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
                      <Lock className="h-4 w-4 text-white/40" />
                    </div>
                  )}
                  <CardHeader className="space-y-6 pb-2">
                    <div className="flex justify-between items-start">
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500",
                        row.id === "challenge-nag-011" && "group-hover:scale-110",
                        isNagpurNext ? "bg-neutral-900 border border-primary/20" : "bg-muted/50 border border-border"
                      )}>
                        {isNagpurNext ? <Rocket className="h-6 w-6 text-primary" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={row.status} />
                        {isNagpurNext && <Badge className="bg-primary/10 text-primary border-none text-[8px] h-4.5 px-2 font-black uppercase tracking-widest">Nagpur NEXT</Badge>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className={cn(
                        "text-xl font-black text-foreground leading-tight transition-colors line-clamp-2",
                        row.id === "challenge-nag-011" && "group-hover:text-primary"
                      )}>
                        {row.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                        {row.summary}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Domain</p>
                        <p className="text-xs font-bold truncate">{(row as any).domain || row.sector}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Applicants</p>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-3.5 w-3.5 text-primary" />
                          <span className="text-sm font-black">{row.applicants}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="text-primary">{row.progress || 0}%</span>
                      </div>
                      <Progress value={row.progress || 0} className="h-1.5 bg-muted rounded-full" />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-6 flex justify-between gap-3">
                    <Button 
                      variant="ghost" 
                      disabled={row.id !== "challenge-nag-011"}
                      className="h-10 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary rounded-xl flex-1"
                    >
                       {row.id === "challenge-nag-011" ? "Quick View" : "Locked"}
                    </Button>
                    <Button 
                      variant="outline" 
                      disabled={row.id !== "challenge-nag-011"}
                      className="h-10 text-[10px] font-black uppercase tracking-widest border-border/50 rounded-xl flex-1 shadow-sm"
                    >
                       {row.id === "challenge-nag-011" ? "Access PRD" : "Restricted"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-border/60 shadow-xl shadow-black/5 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    <th className="text-left py-6 px-8">Blueprint & Identifier</th>
                    <th className="text-left py-6 px-6">Collaborator Entity</th>
                    <th className="text-left py-6 px-6">Status Hub</th>
                    <th className="text-center py-6 px-6">Evaluation</th>
                    <th className="text-left py-6 px-6">Execution Path</th>
                    <th className="text-right py-6 px-8">Command</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                {filtered.map((row) => {
                  const isNagpurNext = "challenge_number" in row;
                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        "transition-all group/row",
                        (row.id === "challenge-nag-011" || isNagpurNext)
                          ? "hover:bg-primary/[0.01] cursor-pointer" 
                          : "opacity-60 grayscale cursor-not-allowed border-dashed bg-muted/5"
                      )}
                      onClick={() => (row.id === "challenge-nag-011" || isNagpurNext) && openDrawer(row)}
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          {isNagpurNext ? (
                            <div className="h-14 w-14 shrink-0 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center border border-primary/20 shadow-inner group-hover/row:border-primary transition-colors">
                              <span className="text-[8px] font-black text-white/40 uppercase leading-none mb-1">CH-0{(row as any).challenge_number}</span>
                              <Rocket className="h-5 w-5 text-primary" />
                            </div>
                          ) : (
                            <div className="h-14 w-14 shrink-0 rounded-2xl bg-muted/60 flex items-center justify-center border border-border group-hover/row:border-primary/30 transition-colors">
                              <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0 space-y-1">
                            <p className="font-bold text-base text-foreground leading-tight truncate max-w-[320px] group-hover/row:text-primary transition-colors">{row.title}</p>
                            <div className="flex items-center gap-2">
                               <Badge variant="outline" className="text-[9px] h-4.5 px-2 font-bold uppercase tracking-wider bg-muted/30">{(row as any).domain || row.sector}</Badge>
                               {isNagpurNext && <Badge className="bg-primary/10 text-primary border-none text-[8px] h-4.5 px-2 font-black">NAGPUR NEXT</Badge>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-1">
                          <p className="font-bold text-sm tracking-tight">{row.company}</p>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="text-[11px] font-medium">{row.region}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex -space-x-2">
                            {[1, 2].map(i => (
                              <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                                <UsersIcon className="h-3 w-3 text-secondary-foreground" />
                              </div>
                            ))}
                            {row.applicants > 2 && (
                              <div className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-black">
                                +{row.applicants - 2}
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">{row.applicants} Applied</p>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        {row.progress === null ? (
                          <div className="flex items-center gap-2 text-muted-foreground italic">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Pending Initial Setup</span>
                          </div>
                        ) : (
                          <div className="space-y-2 min-w-[140px]">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span className="text-muted-foreground uppercase">Completion</span>
                              <span className="text-primary font-black">{row.progress}%</span>
                            </div>
                            <Progress value={row.progress} className="h-1.5 bg-muted rounded-full overflow-hidden" />
                          </div>
                        )}
                      </td>
                      <td className="py-6 px-8 text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-muted rounded-xl transition-all border border-transparent hover:border-border">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/50 shadow-2xl">
                            <DropdownMenuItem 
                              disabled={row.id !== "challenge-nag-011" && !isNagpurNext}
                              onSelect={() => (row.id === "challenge-nag-011" || isNagpurNext) && openDrawer(row)} 
                              className="gap-3 font-bold p-3 rounded-xl cursor-pointer"
                            >
                              <FileCode2 className="h-5 w-5 text-primary" /> Access Full Specifications
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              disabled={row.id !== "challenge-nag-011" && !isNagpurNext}
                              onSelect={() => (row.id === "challenge-nag-011" || isNagpurNext) && navigate("/msme/applicants")} 
                              className="gap-3 font-medium p-3 rounded-xl cursor-pointer"
                            >
                              <Target className="h-5 w-5 text-muted-foreground" /> Benchmark Solvers
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-2" />
                            <DropdownMenuItem 
                              disabled={row.id !== "challenge-nag-011" && !isNagpurNext}
                              onSelect={() => (row.id === "challenge-nag-011" || isNagpurNext) && openWizardEdit(row)} 
                              className="gap-3 p-3 rounded-xl cursor-pointer"
                            >
                              <Settings className="h-5 w-5 text-muted-foreground" /> Modify Framework
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              disabled={row.id !== "challenge-nag-011" && !isNagpurNext}
                              onSelect={() => (row.id === "challenge-nag-011" || isNagpurNext) && runPublishAction(row)} 
                              className="gap-3 p-3 rounded-xl cursor-pointer font-black text-primary"
                            >
                              <Rocket className="h-5 w-5" /> Change Pool Visibility
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-muted/10 border-t border-border/50">
            <div className="h-20 w-20 rounded-3xl bg-muted/20 flex items-center justify-center mb-6">
              <Rocket className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">Workspace Empty</h3>
            <p className="text-muted-foreground font-medium text-center max-w-sm">
              No active challenges found in the <span className="text-foreground font-bold">{tab}</span> filter. 
              Initialize a new PRD to begin.
            </p>
            <Button onClick={openWizardNew} className="mt-8 rounded-2xl h-12 px-8 font-black shadow-xl shadow-primary/10">
              Create First Challenge
            </Button>
          </div>
        )}
      </div>

      <DetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selected?.title ?? "Innovation Protocol"}
        subtitle={selected ? `${selected.company} · Strategic Roadmap` : undefined}
      >
        {selected && (
          <div className="space-y-8 pb-12">
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status={selected.status} />
              <Badge variant={selected.publishedToInnovators ? "default" : "secondary"} className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-neutral-100 border-none shadow-sm">
                {selected.publishedToInnovators ? "Active in Pool" : "Confidential"}
              </Badge>
              {"challenge_number" in selected && (
                <Badge className="bg-primary hover:bg-primary text-primary-foreground border-none h-9 px-4 rounded-xl text-[10px] font-black tracking-[0.1em] shadow-lg shadow-primary/20">
                  NAGPUR NEXT #{selected.challenge_number}
                </Badge>
              )}
            </div>

            <Tabs defaultValue={"challenge_number" in selected ? "prd" : "overview"} className="w-full">
              <TabsList className="bg-neutral-100/80 p-1.5 rounded-2xl w-full sm:w-fit border border-neutral-200 shadow-inner overflow-x-auto justify-start inline-flex">
                {"challenge_number" in selected && (
                  <TabsTrigger value="prd" className="rounded-xl text-[11px] font-black gap-2.5 px-5 py-3 data-[state=active]:bg-white data-[state=active]:shadow-xl transition-all uppercase tracking-widest">
                    <FileCode2 className="h-4 w-4" /> Full PRD
                  </TabsTrigger>
                )}
                <TabsTrigger value="overview" className="rounded-xl text-[11px] font-black gap-2.5 px-5 py-3 data-[state=active]:bg-white data-[state=active]:shadow-xl transition-all uppercase tracking-widest">
                  <Target className="h-4 w-4" /> Protocol
                </TabsTrigger>
                <TabsTrigger value="applicants" className="rounded-xl text-[11px] font-black gap-2.5 px-5 py-3 data-[state=active]:bg-white data-[state=active]:shadow-xl transition-all uppercase tracking-widest">
                  <UsersIcon className="h-4 w-4" /> Solvers ({selected.applicants})
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-xl text-[11px] font-black gap-2.5 px-5 py-3 data-[state=active]:bg-white data-[state=active]:shadow-xl transition-all uppercase tracking-widest">
                  <Zap className="h-4 w-4" /> Telemetry
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prd" className="mt-8">
                {"challenge_number" in selected ? (
                  <InnovationChallengePRD challenge={selected as NagpurNextChallenge} />
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-border rounded-[2rem] bg-muted/5">
                    <FileCode2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-black">PRD v1.0 Pending</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto mt-2">The high-fidelity specification for this challenge is currently under review by the engineering team.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="overview" className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <section className="space-y-3">
                       <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                         <Target className="h-3.5 w-3.5 text-primary" /> Challenge HMW
                       </h4>
                       <p className="text-2xl font-black tracking-tight text-foreground leading-tight italic">
                         "{(selected as any).hmw_statement || selected.summary}"
                       </p>
                    </section>
                    
                    <section className="space-y-2">
                       <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Regional Context</h4>
                       <Card className="bg-neutral-50 border-neutral-100 shadow-none rounded-2xl p-5">
                         <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                               <Briefcase className="h-5 w-5 text-primary" />
                             </div>
                             <div>
                               <p className="text-xs font-black uppercase text-foreground">Vidarbha Hub</p>
                               <p className="text-[11px] font-medium text-muted-foreground">{selected.region}, Maharashtra</p>
                             </div>
                           </div>
                           <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-500/20 text-[10px] font-black uppercase">Active SEZ</Badge>
                         </div>
                         <Separator className="bg-neutral-200" />
                         <div className="grid grid-cols-2 gap-4 mt-4">
                           <div>
                             <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">Impact Weight</p>
                             <p className="text-sm font-bold mt-0.5">High Efficiency</p>
                           </div>
                           <div>
                             <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">Industry Sync</p>
                             <div className="flex items-center gap-2 mt-0.5">
                               <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-primary w-[88%]" />
                               </div>
                               <span className="text-[10px] font-black">88%</span>
                             </div>
                           </div>
                         </div>
                       </Card>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <section className="space-y-3">
                       <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                         <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Governance Checkpoint
                       </h4>
                       <div className="space-y-3">
                          {verificationSteps(selected).map((s, i) => (
                            <div key={s.key} className={cn(
                              "flex items-center justify-between p-4 rounded-2xl border transition-all",
                              s.done ? "bg-green-500/[0.03] border-green-500/20" : "bg-neutral-50 border-neutral-100 opacity-60"
                            )}>
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "h-7 w-7 rounded-xl flex items-center justify-center font-black text-[10px] shadow-sm",
                                  s.done ? "bg-green-500 text-white" : "bg-white text-muted-foreground"
                                )}>
                                  {s.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                                </div>
                                <span className={cn("text-xs font-bold uppercase tracking-widest", s.done ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
                              </div>
                              {s.done && <Badge className="bg-green-500/10 text-green-600 border-none text-[9px] h-5 px-1.5 uppercase font-black">Verified</Badge>}
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>
                </div>

                <Card className="rounded-[2.5rem] border-neutral-200/60 bg-gradient-to-br from-neutral-50 to-neutral-100/30 overflow-hidden">
                  <CardContent className="p-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-foreground tracking-tight">Technical Architecture</h4>
                        <p className="text-xs text-muted-foreground font-medium">Core tech stack and infrastructure requirements for the solving team.</p>
                      </div>
                      <Button variant="outline" className="rounded-xl h-10 px-6 font-bold text-xs gap-2 shadow-sm">
                        Export Specifications <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       {"tech_stack" in selected && (selected as any).tech_stack.map((t: string) => (
                        <div key={t} className="space-y-2">
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Technology</p>
                          <div className="flex items-center gap-2">
                             <div className="h-2 w-2 rounded-full bg-primary" />
                             <span className="text-sm font-black text-foreground">{t}</span>
                          </div>
                        </div>
                      ))}
                      <div className="space-y-2">
                          <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">Collaboration</p>
                          <div className="flex items-center gap-2">
                             <div className="h-2 w-2 rounded-full bg-blue-500" />
                             <span className="text-sm font-black text-foreground">Multi-Disciplinary</span>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em]">Scale</p>
                          <div className="flex items-center gap-2">
                             <div className="h-2 w-2 rounded-full bg-orange-500" />
                             <span className="text-sm font-black text-foreground">Pilot Ready</span>
                          </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applicants" className="mt-8 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight">Innovator Pool</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Found {selected.applicants} qualified teams and individual solvers.</p>
                  </div>
                  <Button 
                    className="rounded-xl h-11 px-6 font-bold text-sm shadow-xl shadow-primary/10"
                    onClick={() => navigate(`/msme/challenges/${selected?.id || 'all'}/evaluate/all`)}
                  >
                    Review All Dossiers
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="rounded-2xl border-neutral-100 hover:border-primary/20 transition-all cursor-pointer group hover:bg-neutral-50 shadow-none">
                      <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 rounded-2xl bg-neutral-900 flex items-center justify-center font-black text-lg text-white group-hover:bg-primary transition-colors">
                            S{i}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <p className="text-base font-black text-foreground tracking-tight">
                                 {selected.title === "SAR Drone Lighting Systems" && i === 1 ? "KIRAN" : `Quantum Solvers #0${i}`}
                               </p>
                               <Badge className="bg-primary/10 text-primary border-none text-[8px] h-4.5 px-2">Top Tier</Badge>
                            </div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                              {selected.title === "SAR Drone Lighting Systems" && i === 1 ? "Nagpur NEXT · Lead Systems" : "VNIT Nagpur · Advanced Robotics Dept."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                           <div className="px-4 text-center border-r border-neutral-100">
                             <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">Match</p>
                             <p className="text-sm font-black text-foreground">{92 - i}%</p>
                           </div>
                           <Button 
                             variant="outline" 
                             className="rounded-xl h-10 px-5 font-bold text-xs flex-1 sm:flex-none"
                             onClick={() => navigate(`/msme/challenges/${selected?.id || 'all'}/evaluate/${i === 1 ? 'kiran' : 'team-' + i}`)}
                           >
                             Open Evaluator
                           </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {("proposed_solution_pdf" in selected) && (selected as any).proposed_solution_pdf && (
                  <div className="mt-12 space-y-4 animate-in slide-in-from-bottom-2 delay-150 relative z-10">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Presentation className="h-5 w-5 text-primary" /> Submitted Solution Pitch
                    </h3>
                    <div className="rounded-xl border border-border overflow-hidden bg-muted relative shadow-lg" style={{ height: "450px" }}>
                      <iframe 
                        src={`${(selected as any).proposed_solution_pdf}#toolbar=0`} 
                        className="w-full h-full border-0 bg-white" 
                        title="Proposed Solution PDF Viewer" 
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open((selected as any).proposed_solution_pdf, '_blank')}>
                        <ExternalLink className="h-3 w-3 mr-2" /> Open Full Screen
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="mt-8">
                 <div className="p-1 px-4">
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-neutral-200 before:via-neutral-100 before:to-transparent">
                      <div className="relative pl-12">
                        <div className="absolute left-0 top-1.5 h-8 w-8 rounded-2xl bg-primary flex items-center justify-center ring-8 ring-white shadow-lg">
                          <Rocket className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                           <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status Shift</p>
                           <p className="text-sm font-black text-foreground">Challenge Live & Published</p>
                           <p className="text-xs text-muted-foreground mt-1">The PRD was finalized and pushed to the global Innovation Marketplace.</p>
                           <p className="text-[10px] font-bold text-muted-foreground/50 mt-4 uppercase">2 days ago · MSINS Hub</p>
                        </div>
                      </div>
                      <div className="relative pl-12">
                        <div className="absolute left-0 top-1.5 h-8 w-8 rounded-2xl bg-neutral-900 flex items-center justify-center ring-8 ring-white shadow-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Governance</p>
                           <p className="text-sm font-black text-foreground">Specification Verified</p>
                           <p className="text-xs text-muted-foreground mt-1">Audit team confirmed all hardware and software dependencies are accurately defined.</p>
                           <p className="text-[10px] font-bold text-muted-foreground/50 mt-4 uppercase">4 days ago · Technical Audit Unit</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DetailDrawer>

      <MsmeNewChallengeWizard
        key={wizardKey}
        open={wizardOpen}
        onOpenChange={(o) => {
          setWizardOpen(o);
          if (!o) setEditChallengeId(null);
        }}
        initialSeed={wizardSeed}
        editChallengeId={editChallengeId}
        onSaveDraft={(payload, editId) => upsertFromWizard(payload, editId, true)}
        onSubmitVerification={(payload, editId) => upsertFromWizard(payload, editId, false)}
      />
      </div>
  );
}

// Support Icons
function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function MapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  )
}
