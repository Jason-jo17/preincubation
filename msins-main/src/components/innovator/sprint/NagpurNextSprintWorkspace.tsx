import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  Home,
  Layers,
  LayoutList,
  Link as LinkIcon,
  Lock,
  MessageSquare,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  User,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  getNagpurNextActiveProject,
  getNagpurNextExecutionPhasesForInnovator,
  getNagpurNextSprintHeaderSnapshot,
  nagpurNextMentorReviewAction,
  nagpurNextRecordInnovatorSubmission,
  nagpurNextSetPhaseUnlock,
  nagpurNextSetActiveProject,
  getNagpurNextTeamAssets,
} from "@/lib/nagpur-next-cohort-store";
import {
  innovatorActiveChallenge,
  nagpurNextCohortRank,
  nagpurNextDeliverableVault,
  nagpurNextIdeaSubmission,
  nagpurNextIndustryChallenge,
  nagpurNextIndustryVisit,
  nagpurNextMentorFeedbackBullets,
  nagpurNextMilestones,
  nagpurNextSpecification,
  nagpurNextSprintChallengeBrief,
  nagpurNextSprintInnovatorProblemId,
  type NagpurSprintTask,
  type NagpurTaskStatus,
} from "@/data/innovator-nagpur-next-sprint";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

/** Same drone + Navitas copy everywhere these dialogs open (single `innovatorActiveChallenge`). */
function SharedChallengeIdentityBlock() {
  const ac = innovatorActiveChallenge;
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-2 text-[11px] leading-snug text-emerald-900 dark:text-emerald-100">
        Assignment verified — problem statement and company are synced from one shared source:{" "}
        <span className="font-semibold">{ac.msme.company}</span> ·{" "}
        <span className="font-semibold">{ac.project.name}</span>.
      </p>
      <p className="text-base font-semibold leading-relaxed text-foreground">{ac.problemStatement}</p>
      <p className="text-xs text-muted-foreground">
        {ac.msme.company} · {ac.msme.sector} · {ac.msme.domain} · {ac.msme.region} · POC {ac.msme.poc}
      </p>
    </div>
  );
}

function statusBadgeClass(status: NagpurTaskStatus) {
  if (status === "completed" || status === "approved")
    return "bg-emerald-500/12 text-emerald-800 border-emerald-500/25 dark:text-emerald-200";
  if (status === "under_review" || status === "submitted")
    return "bg-amber-500/12 text-amber-900 border-amber-500/30 dark:text-amber-100";
  if (status === "rework_needed") return "bg-rose-500/15 text-rose-700 border-rose-500/40 font-bold dark:text-rose-200";
  if (status === "in_progress") return "bg-violet-500/12 text-violet-900 border-violet-500/28 dark:text-violet-100";
  if (status === "not_started") return "bg-muted text-muted-foreground border-border";
  return "bg-muted/70 text-muted-foreground border-border";
}

function statusLabel(task: NagpurSprintTask) {
  if (task.status === "completed") return "Completed";
  if (task.status === "approved") return "Approved";
  if (task.status === "under_review") return "Under review";
  if (task.status === "submitted") return "Submitted";
  if (task.status === "rework_needed") return "Rework needed";
  if (task.status === "in_progress") return "In progress";
  if (task.status === "not_started") return "Not started";
  return "Locked";
}

export default function NagpurNextSprintWorkspace({ isMentorView = false }: { isMentorView?: boolean }) {
  const cohortV = useNagpurNextCohortStoreVersion();
  const nagpurNextExecutionPhases = useMemo(() => getNagpurNextExecutionPhasesForInnovator(), [cohortV]);
  const nagpurNextSprintHeader = useMemo(() => getNagpurNextSprintHeaderSnapshot(), [cohortV]);
  const phaseDefaultOpen = useMemo(
    () => nagpurNextExecutionPhases.filter((p) => p.defaultOpen).map((p) => p.id),
    [nagpurNextExecutionPhases],
  );

  const navigate = useNavigate();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const panelUploadRef = useRef<HTMLInputElement>(null);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<NagpurSprintTask | null>(null);
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({
    fidelity: 8,
    alignment: 7,
    docs: 9,
    innovation: 8
  });
  const [manualPhaseUnlock, setManualPhaseUnlock] = useState(false);

  const teamId = "mt-kiran";
  const teamAssets = useMemo(() => getNagpurNextTeamAssets(teamId), [teamId, cohortV]);

  const avgTeamScore = useMemo(() => {
    const scores = nagpurNextExecutionPhases.flatMap(p => p.sprints).flatMap(s => s.tasks)
      .map(t => t.rubricScores ? Object.values(t.rubricScores) : [])
      .flat();
    if (scores.length === 0) return null;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  }, [nagpurNextExecutionPhases]);

  const openTask = (task: NagpurSprintTask) => {
    setActiveTask(task);
    setTaskSheetOpen(true);
  };

  const activeProject = useMemo(() => getNagpurNextActiveProject(), [cohortV]);
  const portfolio = innovatorActiveChallenge.projects;

  const taskPreviewPdfUrl =
    activeTask?.evidence?.find((e) => e.kind === "pdf")?.url ?? nagpurNextIdeaSubmission.pdfUrl;

  const onUploadPick = (e: React.ChangeEvent<HTMLInputElement>, source: "header" | "panel") => {
    const f = e.target.files?.[0];
    if (f) {
      const taskId = activeTask?.id ?? "nn-t-s6-1";
      nagpurNextRecordInnovatorSubmission(taskId, f.name);
      toast.success("File staged", { description: `${f.name} — synced to Nagpur NEXT cohort (demo).` });
    }
    e.target.value = "";
    if (source === "header") uploadInputRef.current?.blur();
    else panelUploadRef.current?.blur();
  };

  const h = nagpurNextSprintHeader;
  const ch = nagpurNextIndustryChallenge;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50/80 to-background dark:from-background dark:to-background">
        {/* Slim icon rail */}
        <aside className="sticky top-0 hidden h-[calc(100vh-4rem)] w-14 shrink-0 flex-col items-center gap-1 border-r border-border/80 bg-card/90 py-4 shadow-sm sm:flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground" asChild>
                <Link to="/innovator/dashboard">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="h-10 w-10 rounded-xl bg-primary/15 text-primary shadow-none" disabled>
                <LayoutList className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Active sprint</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-muted-foreground"
                onClick={() => {
                  document.getElementById("nagpur-feedback-panel")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Mentor feedback</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground" onClick={() => uploadInputRef.current?.click()}>
                <Upload className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Upload</TooltipContent>
          </Tooltip>
          <input ref={uploadInputRef} type="file" className="hidden" onChange={(e) => onUploadPick(e, "header")} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 md:px-6 lg:px-8">
            {/* Premium header */}
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm",
                "bg-gradient-to-br from-card via-card to-violet-500/[0.06]",
              )}
            >
              <div className="space-y-5 p-5 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1.5 text-muted-foreground" onClick={() => navigate(-1)}>
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Active sprint context</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4 text-muted-foreground hover:text-primary">
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {portfolio.map((p) => (
                              <DropdownMenuItem 
                                key={p.id} 
                                className={cn("flex items-center justify-between", activeProject.id === p.id && "bg-muted font-medium")}
                                onClick={() => nagpurNextSetActiveProject(p.id)}
                              >
                                {p.title}
                                {activeProject.id === p.id && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-baseline gap-3">
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                          {activeProject.projectName || h.projectName}
                        </h1>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-bold uppercase tracking-wider border-violet-500/30 bg-violet-500/10 text-violet-700 shadow-[0_0_8px_rgba(139,92,246,0.1)]">
                          {activeProject.linkedAcademicContext}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {activeProject.college} · {activeProject.branch} · {activeProject.courseName}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{h.studentName}</span>
                          <span className="text-border">·</span>
                          <span>{h.programName}</span>
                        </div>
                        
                        <span className="hidden sm:inline text-border">|</span>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center gap-2 transition-colors hover:text-primary group">
                              <User className="h-3.5 w-3.5 text-primary/70 group-hover:text-primary" />
                              <span>Mentor: <span className="font-medium text-foreground border-b border-dotted border-border group-hover:border-primary">{activeProject.mentor?.name || h.assignedMsme}</span></span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 p-0" align="start">
                            <div className="bg-muted/30 p-4 border-b border-border">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                  <AvatarImage src={activeProject.mentor?.avatar} />
                                  <AvatarFallback>{activeProject.mentor?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="text-sm font-bold text-foreground">{activeProject.mentor?.name}</h4>
                                  <p className="text-[10px] text-muted-foreground">{activeProject.mentor?.role}</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 space-y-3">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Expertise</p>
                                <p className="text-xs text-foreground leading-relaxed">{activeProject.mentor?.expertise}</p>
                              </div>
                              <div className="flex items-center justify-between text-xs pt-2">
                                <span className="text-muted-foreground">{activeProject.mentor?.contact}</span>
                                <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary">Message</Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <div className="flex flex-wrap items-center gap-2 ml-auto max-w-[400px] justify-end">
                          {activeProject.cos?.map((co) => (
                            <Tooltip key={co}>
                              <TooltipTrigger asChild>
                                <Badge variant="secondary" className="h-5 px-2 text-[9px] font-medium bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors cursor-help">
                                  {co.split(":")[0]}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[280px] p-2 text-[11px] leading-snug">
                                <p className="font-bold text-primary mb-1">{co.split(":")[0]}</p>
                                {co.split(":")[1]?.trim()}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="border border-primary/15 bg-primary/[0.06] font-mono text-xs">
                        TRL {h.trl}
                      </Badge>
                      <Badge variant="secondary" className="border border-primary/15 bg-primary/[0.06] font-mono text-xs">
                        IRL {h.irl}
                      </Badge>
                      <Badge variant="secondary" className="border border-primary/15 bg-primary/[0.06] font-mono text-xs">
                        CRL {h.crl}
                      </Badge>
                      <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200">
                        {h.challengeStatus}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-lg border border-border bg-background/80 px-2.5 py-1 font-medium text-foreground">
                        Stage: {h.stage}
                      </span>
                      <span className="rounded-lg border border-violet-500/25 bg-violet-500/[0.08] px-2.5 py-1 font-medium text-violet-900 dark:text-violet-100">
                        {h.currentPhase}
                      </span>
                      <span className="rounded-lg border border-blue-500/20 bg-blue-500/[0.06] px-2.5 py-1 font-medium text-blue-900 dark:text-blue-100">
                        {h.currentSprint}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/80 px-2.5 py-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        Next mentor review: <span className="font-medium text-foreground">{h.nextMentorReview}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:min-w-[280px]">
                    <div className="rounded-xl border border-border/80 bg-background/60 p-3 shadow-inner">
                      <div className="mb-1.5 flex justify-between text-[11px] text-muted-foreground">
                        <span>Overall progress</span>
                        <span className="font-mono font-semibold text-foreground">{h.progressPct}%</span>
                      </div>
                      <Progress value={h.progressPct} className="h-2 bg-muted" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-9 flex-1 border-violet-500/25 sm:flex-none" onClick={() => setChallengeOpen(true)}>
                        <Target className="mr-1.5 h-3.5 w-3.5" />
                        View challenge
                      </Button>
                      {!isMentorView && (
                        <Button size="sm" className="h-9 flex-1 bg-gradient-to-r from-violet-600 to-blue-600 shadow-sm sm:flex-none" onClick={() => uploadInputRef.current?.click()}>
                          <Upload className="mr-1.5 h-3.5 w-3.5" />
                          Upload submission
                        </Button>
                      )}
                      {isMentorView && (
                         <Button size="sm" variant="secondary" className="h-9 flex-1 border-primary/20 sm:flex-none" onClick={() => setChallengeOpen(true)}>
                          <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                          Evaluation Mode
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge brief — all copy from `innovatorActiveChallenge` */}
            <Card className="rounded-2xl border-border/80 bg-card shadow-sm">
              <CardHeader className="border-b border-border/60 pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-semibold">Challenge brief</CardTitle>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {ch.company} · {ch.sector} · {ch.domain} · {ch.location} · POC {ch.industrySpoc}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-violet-500/25 bg-violet-500/[0.06]">
                    {h.challengeStatus} · {h.progressPct}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-5">
                <p className="text-base font-semibold leading-relaxed text-foreground">{ch.problemStatement}</p>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border/80 bg-secondary/20 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">MSME overview</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.msmeOverview}</p>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-secondary/20 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Why this problem matters</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.whyItMatters}</p>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-secondary/20 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Expected impact</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.expectedImpact}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4">
                  <Button variant="outline" size="sm" className="h-9" onClick={() => setChallengeOpen(true)}>
                    <Target className="mr-1.5 h-3.5 w-3.5" />
                    Full specification
                  </Button>
                  <Button variant="secondary" size="sm" className="h-9" onClick={() => setCompanyDialogOpen(true)}>
                    <Building2 className="mr-1.5 h-3.5 w-3.5" />
                    Company profile
                  </Button>
                  <Button variant="outline" size="sm" className="h-9" onClick={() => setVisitDialogOpen(true)}>
                    Book industry visit
                  </Button>
                  <Button variant="outline" size="sm" className="h-9" asChild>
                    <Link to="/innovator/dashboard#mentor-activity">
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                      Message mentor
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main grid 70/30 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-10 lg:items-start">
              <div className="space-y-4 lg:col-span-7">
                <Tabs defaultValue="flow" className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <TabsList className="bg-muted/50 p-1">
                      <TabsTrigger value="flow" className="text-xs data-[state=active]:bg-background">Execution Flow</TabsTrigger>
                      {isMentorView && (
                        <TabsTrigger value="assets" className="text-xs data-[state=active]:bg-background">Project Assets ({teamAssets.length})</TabsTrigger>
                      )}
                    </TabsList>
                    
                    {isMentorView && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground mr-1">Phase Unlock</span>
                        <Switch 
                          checked={manualPhaseUnlock} 
                          onCheckedChange={setManualPhaseUnlock}
                          className="scale-75"
                        />
                      </div>
                    )}
                  </div>

                  <TabsContent value="flow" className="mt-0 outline-none">
                    <Accordion type="multiple" defaultValue={phaseDefaultOpen} className="space-y-3">
                      {nagpurNextExecutionPhases.map((phase) => (
                        <AccordionItem
                          key={phase.id}
                          value={phase.id}
                          className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all data-[state=open]:shadow-md"
                        >
                          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline md:px-5 [&[data-state=open]>svg]:rotate-180">
                            <div className="flex flex-1 flex-col gap-1 pr-2 text-left sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-sm font-semibold">
                                Phase {phase.index}: {phase.title}
                              </span>
                              {phase.sprints.length === 0 ? (
                                <span className="text-xs text-muted-foreground">{phase.collapsedSprintLabels.length} sprints</span>
                              ) : null}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t border-border/60 bg-secondary/10 px-3 pb-4 pt-2 md:px-4">
                            {phase.sprints.length === 0 ? (
                              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                                {phase.collapsedSprintLabels.map((label) => (
                                  <li key={label} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2">
                                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                                    {label}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="space-y-2">
                                {phase.sprints.map((sprint) => (
                                  <Collapsible key={sprint.id} defaultOpen={sprint.defaultOpen && !sprint.locked}>
                                    <div
                                      className={cn(
                                        "rounded-xl border border-border/80 bg-card shadow-sm",
                                        sprint.locked && "opacity-70",
                                      )}
                                    >
                                      <CollapsibleTrigger
                                        disabled={sprint.locked && !isMentorView}
                                        className={cn(
                                          "group flex w-full items-center justify-between gap-2 px-3 py-3 text-left transition-colors hover:bg-muted/40 md:px-4",
                                          sprint.locked && !isMentorView && "cursor-not-allowed hover:bg-transparent",
                                        )}
                                      >
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sprint</p>
                                          <p className="truncate text-sm font-semibold text-foreground">{sprint.name}</p>
                                          {sprint.locked ? (
                                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                              <Lock className="h-3 w-3" />
                                              {sprint.lockHint}
                                            </p>
                                          ) : null}
                                        </div>
                                        
                                        {isMentorView && (
                                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-slate-50/50 mr-2" onClick={(e) => e.stopPropagation()}>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground mr-1">Sprint Unlock</span>
                                            <Switch 
                                              checked={!sprint.locked} 
                                              onCheckedChange={(v) => nagpurNextSetPhaseUnlock(sprint.id, v)}
                                              className="scale-75 data-[state=checked]:bg-emerald-500"
                                            />
                                          </div>
                                        )}

                                        {!sprint.locked ? (
                                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                        ) : (
                                          <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        )}
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        {sprint.evidenceNote ? (
                                          <p className="border-t border-border/60 bg-muted/30 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground md:px-4">
                                            {sprint.evidenceNote}
                                          </p>
                                        ) : null}
                                        {sprint.tasks.length > 0 ? (
                                          <div className="space-y-2 border-t border-border/60 p-3 md:p-4">
                                            {sprint.tasks.map((task) => (
                                              <button
                                                key={task.id}
                                                type="button"
                                                onClick={() => openTask(task)}
                                                className={cn(
                                                  "w-full rounded-xl border border-border/80 bg-background/80 p-3 text-left shadow-sm transition-all hover:border-violet-500/35 hover:shadow-md md:p-4",
                                                  task.status === "rework_needed" && "border-rose-500/30 bg-rose-500/[0.03] ring-1 ring-rose-500/10",
                                                  task.status === "locked" && "pointer-events-auto opacity-55 hover:border-border/80 hover:shadow-sm",
                                                )}
                                              >
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                  <div className="min-w-0 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                      <p className="font-semibold text-foreground">{task.name}</p>
                                                      {task.status === "rework_needed" && (
                                                        <span className="animate-pulse flex h-2 w-2 rounded-full bg-rose-600" title="Action required" />
                                                      )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{task.subtitle}</p>
                                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                                      <div className="flex items-center gap-2">
                                                        {task.rubricScores && (
                                                          <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-emerald-500/5 text-emerald-700 border-emerald-500/20 gap-1">
                                                            <Sparkles className="h-2.5 w-2.5" />
                                                            {Object.values(task.rubricScores).reduce((a,b) => a+b, 0) / Object.values(task.rubricScores).length}
                                                          </Badge>
                                                        )}
                                                        <Badge variant="outline" className={cn("h-5 px-1.5 text-[10px]", statusBadgeClass(task.status))}>
                                                          {statusLabel(task)}
                                                        </Badge>
                                                      </div>
                                                      {task.sprintGate ? (
                                                        <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-[10px] text-violet-800 dark:text-violet-200">
                                                          Sprint gate
                                                        </Badge>
                                                      ) : null}
                                                      {typeof task.progressPct === "number" ? (
                                                        <span className="text-[11px] text-muted-foreground">Progress {task.progressPct}%</span>
                                                      ) : null}
                                                      {task.submitted ? (
                                                        <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-700 dark:text-emerald-300">
                                                          <CheckCircle2 className="h-3 w-3" />
                                                          Submitted
                                                        </span>
                                                      ) : null}
                                                      {task.mentorReview ? (
                                                        <span className="text-[11px] text-muted-foreground">
                                                          Mentor: <span className="font-medium text-foreground">{task.mentorReview}</span>
                                                        </span>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                  <div className="flex shrink-0 flex-col items-end gap-2 sm:items-end">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                      <Calendar className="h-3.5 w-3.5" />
                                                      {task.dueDate}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                      <User className="h-3.5 w-3.5" />
                                                      {task.mentor}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                      {task.status !== "locked" ? (
                                                        <Paperclip className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                      ) : (
                                                        <FileText className="h-4 w-4 text-muted-foreground/50" aria-hidden />
                                                      )}
                                                      <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="secondary"
                                                        className="h-8 text-xs"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          openTask(task);
                                                        }}
                                                      >
                                                        Open task
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </button>
                                            ))}

                                            {/* Sprint Resources & SMEs */}
                                            {((sprint.resources || []).length > 0 || (sprint.smeData || []).length > 0) && (
                                              <div className="mt-4 grid gap-4 border-t border-border/40 pt-4 sm:grid-cols-2">
                                                {/* Resources */}
                                                {(sprint.resources || []).length > 0 && (
                                                  <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                                      <Layers className="h-3.5 w-3.5" />
                                                      Sprint Resources
                                                    </div>
                                                    <div className="space-y-2">
                                                      {(sprint.resources || []).map((res) => (
                                                        <a
                                                          key={res.id}
                                                          href={res.url}
                                                          target="_blank"
                                                          rel="noreferrer"
                                                          className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 p-2.5 transition-all hover:border-primary/30 hover:bg-primary/[0.02] group"
                                                        >
                                                          {res.kind === "video" ? (
                                                            <Video className="h-4 w-4 text-rose-500" />
                                                          ) : (
                                                            <LinkIcon className="h-4 w-4 text-blue-500" />
                                                          )}
                                                          <span className="flex-1 truncate text-xs font-semibold text-foreground group-hover:text-primary">
                                                            {res.title}
                                                          </span>
                                                          <ExternalLink className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary/40" />
                                                        </a>
                                                      ))}
                                                    </div>
                                                  </div>
                                                )}

                                                {/* SMEs */}
                                                {(sprint.smeData || []).length > 0 && (
                                                  <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                                      <ShieldCheck className="h-3.5 w-3.5" />
                                                      Assigned SMEs
                                                    </div>
                                                    <div className="space-y-2">
                                                      {(sprint.smeData || []).map((sme) => (
                                                        <div
                                                          key={sme.id}
                                                          className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/50 p-2.5"
                                                        >
                                                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                            {sme.name.charAt(0)}
                                                          </div>
                                                          <div className="min-w-0">
                                                            <p className="truncate text-xs font-bold text-foreground">{sme.name}</p>
                                                            <p className="truncate text-[10px] text-muted-foreground">{sme.role}</p>
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ) : null}
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                ))}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="assets" className="mt-0 outline-none">
                    <Card className="rounded-2xl border-border/80 shadow-sm overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold">Team Deliverables Library</CardTitle>
                          <Badge variant="secondary" className="text-[10px] font-mono">{teamAssets.length} Files</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/60">
                          {teamAssets.length > 0 ? (
                            teamAssets.map((asset) => (
                              <div key={asset.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600">
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-foreground truncate">{asset.title}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">{asset.kind} · Shared with {innovatorActiveChallenge.mentor.name}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                    <a href={asset.url} target="_blank" rel="noreferrer">
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                  </Button>
                                  <Button size="sm" variant="secondary" className="h-8 text-[10px] px-3 font-semibold" asChild>
                                    <a href={asset.url} target="_blank" rel="noreferrer">View File</a>
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-12 text-center">
                              <Layers className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                              <p className="text-xs text-muted-foreground">No assets uploaded yet by the team.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div id="nagpur-feedback-panel" className="space-y-4 lg:col-span-3">
                <Card className="overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-card to-violet-500/[0.05] shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Idea PDF / final submission</CardTitle>
                    <p className="text-xs text-muted-foreground">Single source file · same object as dashboard & MSME views</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-foreground">{nagpurNextIdeaSubmission.fileName}</p>
                      <Badge className="bg-emerald-600/90 text-primary-foreground">{nagpurNextIdeaSubmission.status}</Badge>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Pages preview</p>
                      <div className="grid grid-cols-4 gap-2">
                        {nagpurNextIdeaSubmission.previewThumbUrls.map((src, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => window.open(nagpurNextIdeaSubmission.pdfUrl, "_blank", "noopener,noreferrer")}
                            className="overflow-hidden rounded-lg border border-border/80 bg-muted/40 shadow-sm transition-transform hover:scale-[1.02]"
                          >
                            <img src={src} alt="" className="h-16 w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="h-8 flex-1 text-xs" variant="secondary" asChild>
                        <a href={nagpurNextIdeaSubmission.pdfUrl} target="_blank" rel="noreferrer">
                          View PDF
                        </a>
                      </Button>
                      <Button size="sm" className="h-8 flex-1 text-xs" variant="outline" asChild>
                        <a href={nagpurNextIdeaSubmission.pdfUrl} download>
                          Download
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 flex-1 text-xs"
                        variant="outline"
                        onClick={() => {
                          void navigator.clipboard.writeText(nagpurNextIdeaSubmission.pdfUrl);
                          toast.success("Link copied", { description: "Share via email or Teams (demo)." });
                        }}
                      >
                        Share
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 flex-1 text-xs"
                        variant="outline"
                        onClick={() => toast.message("Revision queued", { description: "Mentor will be notified (demo)." })}
                      >
                        Submit revision
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{isMentorView ? "Mentoring guidance" : "Mentor feedback"}</p>
                    <p className="text-xs text-muted-foreground">{innovatorActiveChallenge.mentor.name}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ol className="list-decimal space-y-2.5 pl-4 text-sm text-muted-foreground">
                      {nagpurNextMentorFeedbackBullets.map((b, i) => (
                        <li key={`${i}-${b.slice(0, 12)}`} className="pl-1 leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ol>
                    {!isMentorView && (
                      <Button
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 shadow-sm"
                        size="sm"
                        onClick={() =>
                          toast.success("Call scheduled", {
                            description: `${innovatorActiveChallenge.mentor.name} · ${innovatorActiveChallenge.project.nextReview} (demo).`,
                          })
                        }
                      >
                        Book review call
                      </Button>
                    )}
                    {isMentorView && (
                      <Button
                        variant="outline"
                        className="w-full border-primary/20 text-primary"
                        size="sm"
                        onClick={() => toast.success("Draft shared", { description: "Instruction draft saved." })}
                      >
                        Update cohort guidance
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">Uploaded files</p>
                    <ul className="space-y-2">
                      {nagpurNextDeliverableVault.map((d) => (
                        <li key={d.id}>
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between rounded-lg border border-border/80 bg-background/80 px-3 py-2 text-sm font-medium transition-colors hover:border-violet-500/30 hover:bg-violet-500/[0.04]"
                          >
                            <span className="truncate">{d.fileName}</span>
                            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <input ref={panelUploadRef} type="file" className="hidden" onChange={(e) => onUploadPick(e, "panel")} />
                    <Button variant="outline" size="sm" className="w-full" onClick={() => panelUploadRef.current?.click()}>
                      <Upload className="mr-2 h-3.5 w-3.5" />
                      Upload new file
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {nagpurNextMilestones.map((line) => (
                        <li key={line} className="flex items-start gap-2 rounded-lg border border-border/60 bg-secondary/20 px-3 py-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-card to-violet-500/[0.06] shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Cohort rank</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      <span className="text-muted-foreground">Nagpur NEXT rank:</span>{" "}
                      <span className="text-lg font-bold text-foreground">
                        #{nagpurNextCohortRank.rank} / {nagpurNextCohortRank.totalTeams} teams
                      </span>
                    </p>
                    <Separator />
                    <div className="flex items-center gap-2">
                      <LayoutList className="h-4 w-4 text-primary" />
                      <span className="font-bold tracking-tight">{innovatorActiveChallenge.project.projectName}</span>
                      {isMentorView && avgTeamScore && (
                        <Badge variant="secondary" className="ml-2 bg-indigo-500/10 text-indigo-700 border-indigo-500/20">
                          Avg Score: {avgTeamScore}/10
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">Submission consistency</span>
                      <Badge className="bg-emerald-600/90">{nagpurNextCohortRank.submissionConsistency}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full specification / View challenge — only `innovatorActiveChallenge` + specification */}
      <Dialog open={challengeOpen} onOpenChange={setChallengeOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Full specification</DialogTitle>
            <DialogDescription>
              {innovatorActiveChallenge.msme.company} · {innovatorActiveChallenge.project.name} · {innovatorActiveChallenge.cohort.name}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[65vh] pr-3">
            <div className="space-y-4 text-sm">
              <SharedChallengeIdentityBlock />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">MSME overview</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.msmeOverview}</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Why it matters</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.whyItMatters}</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-secondary/30 p-3 sm:col-span-1">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Expected impact</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{nagpurNextSprintChallengeBrief.expectedImpact}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Root cause</p>
                <p className="mt-1 text-muted-foreground">{nagpurNextSpecification.rootCause}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Program deliverables</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                  {nagpurNextSpecification.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Timeline</p>
                <p className="mt-1 text-muted-foreground">{nagpurNextSpecification.timeline}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Constraints</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                  {nagpurNextSpecification.constraints.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">{nagpurNextSpecification.msmeProfileLine}</p>
            </div>
          </ScrollArea>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" asChild>
              <Link to={`/innovator/problems/${nagpurNextSprintInnovatorProblemId}`}>Open full brief</Link>
            </Button>
            <Button onClick={() => setChallengeOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={companyDialogOpen} onOpenChange={setCompanyDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Company profile</DialogTitle>
            <DialogDescription>{innovatorActiveChallenge.msme.company}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-3">
            <div className="space-y-4 text-sm">
              <SharedChallengeIdentityBlock />
              <p className="leading-relaxed text-muted-foreground">{innovatorActiveChallenge.msme.about}</p>
              <div className="grid gap-2 text-xs text-muted-foreground">
                <p>
                  POC: <span className="font-medium text-foreground">{innovatorActiveChallenge.msme.poc}</span>
                </p>
                <p>
                  Website:{" "}
                  <a href={innovatorActiveChallenge.msme.website} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                    {innovatorActiveChallenge.msme.website}
                  </a>
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompanyDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book industry visit</DialogTitle>
            <DialogDescription>Nagpur · {innovatorActiveChallenge.msme.company}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <SharedChallengeIdentityBlock />
            <p className="leading-relaxed text-muted-foreground">{nagpurNextIndustryVisit.blurb}</p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setVisitDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-violet-600 to-blue-600"
              onClick={() => {
                toast.success("Visit requested", {
                  description: `Ops will schedule with ${innovatorActiveChallenge.msme.company} for the drone lighting challenge.`,
                });
                setVisitDialogOpen(false);
              }}
            >
              Confirm request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task workspace — right sheet */}
      <Sheet open={taskSheetOpen} onOpenChange={setTaskSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
          <SheetHeader className="space-y-1 text-left">
            <SheetTitle className="pr-8">{activeTask?.name ?? "Task"}</SheetTitle>
            <SheetDescription>{activeTask?.subtitle}</SheetDescription>
          </SheetHeader>
          {activeTask ? (
            <div className="mt-4 flex flex-1 flex-col gap-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={cn("text-[10px]", statusBadgeClass(activeTask.status))}>
                  {statusLabel(activeTask)}
                </Badge>
                {activeTask.sprintGate ? (
                  <Badge variant="outline" className="border-violet-500/30 text-[10px]">
                    Sprint gate
                  </Badge>
                ) : null}
                {activeTask.score ? (
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    Score: {activeTask.score}
                  </Badge>
                ) : null}
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-border/80 bg-secondary/20 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Objective</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">{activeTask.objective}</p>
                </div>

                {/* Task Resources */}
                {(activeTask.resources || []).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                      <LinkIcon className="h-3 w-3" /> Tool Resources
                    </p>
                    <div className="grid gap-2">
                      {activeTask.resources?.map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 transition-all hover:bg-muted/30"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                            {res.kind === "video" ? <Video className="h-3.5 w-3.5" /> : <LinkIcon className="h-3.5 w-3.5" />}
                          </div>
                          <span className="flex-1 truncate text-xs font-medium">{res.title}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Task SMEs */}
                {(activeTask.smeData || []).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" /> Task Specialists
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {activeTask.smeData?.map((sme) => (
                        <div
                          key={sme.id}
                          className="flex items-center gap-3 rounded-lg border border-border/60 bg-violet-500/[0.03] p-2.5"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-[11px] font-bold text-violet-700">
                            {sme.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-foreground">{sme.name}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{sme.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>
                  Due: <span className="font-medium text-foreground">{activeTask.dueDate}</span>
                </span>
                <span>
                  Mentor: <span className="font-medium text-foreground">{activeTask.mentor}</span>
                </span>
              </div>
              {typeof activeTask.progressPct === "number" ? (
                <div>
                  <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>Progress</span>
                    <span>{activeTask.progressPct}%</span>
                  </div>
                  <Progress value={activeTask.progressPct} className="h-2" />
                </div>
              ) : null}

              {activeTask.mentorComments && activeTask.mentorComments.length > 0 ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Previous feedback</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {activeTask.mentorComments.map((c) => (
                      <li key={c} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Submission Preview</p>
                <div className="mt-2 overflow-hidden rounded-lg border border-border bg-muted/40">
                  <iframe title="PDF preview" src={taskPreviewPdfUrl} className="h-[200px] w-full" />
                </div>
              </div>

              {activeTask.evidence && activeTask.evidence.length > 0 ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Submitted files</p>
                  <div className="mt-2 grid gap-2">
                    {activeTask.evidence.map((ev) => (
                      <a
                        key={ev.id}
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:border-violet-500/35"
                      >
                        <span className="min-w-0 truncate">{ev.title}</span>
                        <Badge variant="secondary" className="ml-2 shrink-0 text-[10px] capitalize">
                          {ev.kind}
                        </Badge>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {isMentorView && (
                <div className="mt-6 space-y-6 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-2 px-3 py-2 bg-indigo-500/[0.08] rounded-lg border border-indigo-500/20">
                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-tight text-indigo-700">Review & Evaluate</span>
                  </div>

                  <div className="space-y-5 px-1">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-bold uppercase text-muted-foreground mr-1">Prototype Fidelity</Label>
                        <span className="text-xs font-mono font-bold text-primary">{rubricScores.fidelity}/10</span>
                      </div>
                      <Slider 
                        value={[rubricScores.fidelity]} 
                        max={10} 
                        step={1} 
                        onValueChange={([v]) => setRubricScores(prev => ({ ...prev, fidelity: v }))} 
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-bold uppercase text-muted-foreground mr-1">Industry Alignment</Label>
                        <span className="text-xs font-mono font-bold text-primary">{rubricScores.alignment}/10</span>
                      </div>
                      <Slider 
                        value={[rubricScores.alignment]} 
                        max={10} 
                        step={1} 
                        onValueChange={([v]) => setRubricScores(prev => ({ ...prev, alignment: v }))} 
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-bold uppercase text-muted-foreground mr-1">Documentation Quality</Label>
                        <span className="text-xs font-mono font-bold text-primary">{rubricScores.docs}/10</span>
                      </div>
                      <Slider 
                        value={[rubricScores.docs]} 
                        max={10} 
                        step={1} 
                        onValueChange={([v]) => setRubricScores(prev => ({ ...prev, docs: v }))} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground">Internal Review Note</Label>
                    <textarea 
                      className="w-full min-h-[80px] rounded-lg border border-border bg-background p-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Add specific guidance for the team..."
                    />
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <SheetFooter className="mt-6 flex-col gap-2 sm:flex-col">
            {!isMentorView ? (
              <>
                <Button
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
                  onClick={() => toast.success("Revision submitted", { description: "Mentor notified (demo flow)." })}
                >
                  Resubmit
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const first = activeTask?.evidence?.[0];
                    if (first) window.open(first.url, "_blank", "noopener,noreferrer");
                    else window.open(taskPreviewPdfUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  Open in new tab
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                    onClick={() => {
                      if (activeTask) {
                        nagpurNextMentorReviewAction(activeTask.id, "approve", "Approved based on rubric evaluation.", rubricScores);
                        toast.success("Task Approved", { description: `${activeTask.name} has been signed off.` });
                        setTaskSheetOpen(false);
                      }
                    }}
                  >
                    Approve Task
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full shadow-sm"
                    onClick={() => {
                      if (activeTask) {
                        nagpurNextMentorReviewAction(activeTask.id, "request_changes", "Please address rubric gaps and resubmit.");
                        toast.warning("Changes Requested", { description: "Team has been notified of rework needed." });
                        setTaskSheetOpen(false);
                      }
                    }}
                  >
                    Request Rework
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => setTaskSheetOpen(false)}
                >
                  Close Review
                </Button>
              </>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
