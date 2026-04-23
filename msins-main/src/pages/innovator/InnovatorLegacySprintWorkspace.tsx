import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarClock,
  ChevronRight,
  FileStack,
  MessageSquare,
  Send,
  Sparkles,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SprintProgressRail } from "@/components/innovator/sprint/SprintProgressRail";
import { SprintKanban } from "@/components/innovator/sprint/SprintKanban";
import { SprintTaskSheet } from "@/components/innovator/sprint/SprintTaskSheet";
import { SprintMetricsAside } from "@/components/innovator/sprint/SprintMetricsAside";
import { SPRINT_STAGE_LABELS } from "@/data/innovator-sprint-seed";
import type { SprintTask } from "@/data/innovator-sprint-seed";
import { innovatorSprint } from "@/data/innovator-workspace";
import { fallbackMarketplaceDetail, getMarketplaceDetail } from "@/data/innovator-marketplace-catalog";
import { initialMsmeChallengeList } from "@/data/msme-challenges-list";
import { useInnovatorSprintStore } from "@/hooks/use-innovator-sprint-store";
import {
  allMandatoryTasksDone,
  ensureDefaultProjects,
  ensureSprintForChallengeId,
  reconcileActiveSprintId,
  setActiveSprintProject,
  submitFinalCloseout,
  submitStageGate,
  toggleBlockerResolved,
} from "@/lib/innovator-sprint-store";

export function InnovatorLegacySprintWorkspace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const store = useInnovatorSprintStore();
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);

  const spKey = searchParams.toString();
  useEffect(() => {
    ensureDefaultProjects();
    reconcileActiveSprintId();
    const challengeId = searchParams.get("challengeId");
    const sprint = searchParams.get("sprint");
    const project = searchParams.get("project");
    const from = searchParams.get("from");
    if (challengeId) {
      ensureSprintForChallengeId(challengeId);
    } else if (project === "ev" || sprint === "spr-msme-ev-cooling") {
      setActiveSprintProject("spr-msme-ev-cooling");
    } else if (from === "dashboard") {
      setActiveSprintProject("spr-cohort-hostel");
    }
  }, [spKey, searchParams]);

  const project = store.projects[store.activeSprintId];
  const activeProjects = useMemo(
    () => Object.values(store.projects).filter((p) => !p.archived),
    [store.projects],
  );
  const archivedProjects = useMemo(
    () => Object.values(store.projects).filter((p) => p.archived),
    [store.projects],
  );

  const selectedTask: SprintTask | null =
    project && selectedTaskId ? (project.tasks[selectedTaskId] ?? null) : null;

  const mentorPending = project?.id === "spr-cohort-hostel" ? innovatorSprint.mentorFeedbackPending : 2;

  const briefDetail = useMemo(() => {
    if (!project?.linkedChallengeId) return null;
    const ch = initialMsmeChallengeList.find((c) => c.id === project.linkedChallengeId);
    if (!ch) return null;
    return getMarketplaceDetail(project.linkedChallengeId) ?? fallbackMarketplaceDetail(ch);
  }, [project?.linkedChallengeId]);

  const openTask = (t: SprintTask) => {
    setSelectedTaskId(t.id);
    setTaskSheetOpen(true);
  };

  const gateReady = project && allMandatoryTasksDone(project);
  const isCloseout = project && project.currentStageIndex >= 6;

  if (!project || project.archived) {
    return (
      <div className="max-w-lg space-y-4 py-8">
        <h1 className="text-xl font-bold text-foreground">Sprint engine</h1>
        <p className="text-sm text-muted-foreground">No active sprint. Open one from the dashboard or marketplace.</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/innovator/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/innovator/marketplace">Marketplace</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] pb-16">
      <div className="sticky top-0 z-40 -mx-4 mb-4 border-b border-border bg-background/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1 text-muted-foreground" asChild>
                <Link to="/innovator/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <span className="text-muted-foreground">/</span>
              <Button variant="ghost" size="sm" className="h-8 text-muted-foreground" asChild>
                <Link to="/innovator/marketplace">Marketplace</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">{project.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.sponsorType === "cohort" ? "Cohort" : "MSME"}: <span className="font-medium text-foreground">{project.sponsor}</span>
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9"
                  onClick={() => toast.success("Review submitted", { description: "Mentor and MSME notified (demo)." })}
                >
                  Submit Review
                </Button>
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <Link to="/innovator/dashboard#mentor-activity">Book Mentor</Link>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-1" onClick={() => setBriefOpen(true)} disabled={!project.linkedChallengeId}>
                  <BookOpen className="h-3.5 w-3.5" />
                  View Brief
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Badge variant="secondary" className="font-normal">
                {SPRINT_STAGE_LABELS[project.currentStageIndex] ?? "—"}
              </Badge>
              <span className="rounded-md border border-border bg-card px-2 py-1 font-mono text-muted-foreground">
                Week {project.weekCurrent}/{project.weekTotal}
              </span>
              <span className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-muted-foreground">
                <CalendarClock className="h-3.5 w-3.5" />
                {project.deadlineLabel}
              </span>
              <span className="rounded-md border border-violet-500/20 bg-violet-500/[0.06] px-2 py-1 text-violet-800 dark:text-violet-200">
                Mentor: {project.mentorName}
              </span>
            </div>
            <div className="max-w-xl">
              <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                <span>Overall progress</span>
                <span className="font-mono font-semibold text-foreground">{project.overallProgressPct}%</span>
              </div>
              <Progress value={project.overallProgressPct} className="h-2 bg-muted" />
            </div>
          </div>
          <div className="w-full shrink-0 lg:w-[220px]">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Active sprint</p>
            <Select
              value={project.id}
              onValueChange={(id) => {
                if (setActiveSprintProject(id)) toast.message("Switched sprint");
              }}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activeProjects.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="text-sm">
                    {p.name.length > 42 ? `${p.name.slice(0, 40)}…` : p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
          <SprintProgressRail currentStageIndex={project.currentStageIndex} />
        </div>
        {gateReady && (
          <div className="mt-3 flex flex-wrap gap-2">
            {!isCloseout ? (
              <Button size="sm" className="h-9 gap-1" onClick={() => setGateOpen(true)}>
                Submit Stage Gate
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" className="h-9 gap-1 bg-violet-600 hover:bg-violet-600/90" onClick={() => setFinalOpen(true)}>
                Complete sprint
                <Sparkles className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-4">
        <div className="space-y-5 xl:col-span-3">
          <SprintKanban project={project} onOpenTask={openTask} />

          <section>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <MessageSquare className="h-4 w-4 text-destructive" />
              Blockers & risks
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {project.blockers.map((b) => (
                <Card key={b.id} className={cn("border-border", b.resolved && "opacity-60")}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm leading-snug">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">{b.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={() => toggleBlockerResolved(b.id)}>
                        {b.resolved ? "Reopen" : "Resolve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => toast.message("Escalated", { description: b.title })}
                      >
                        Escalate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Video className="h-4 w-4 text-primary" />
                  Mentor layer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Upcoming</p>
                  <p className="mt-0.5 font-medium text-foreground">Rahul Sharma — Thu 4:00 PM</p>
                  <Button size="sm" variant="secondary" className="mt-2 h-8 text-xs">
                    Join session
                  </Button>
                </div>
                <Separator />
                <div>
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Request review</p>
                  <p className="mt-1 text-xs text-muted-foreground">Send research pack and mind map for async review.</p>
                  <Button size="sm" className="mt-2 h-8 gap-1 text-xs" onClick={() => toast.success("Review requested")}>
                    <Send className="h-3.5 w-3.5" />
                    Request review
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                  <FileStack className="h-4 w-4 text-primary" />
                  Deliverables vault
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.deliverables.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:bg-primary/[0.03]"
                    >
                      <span className="truncate font-medium text-foreground">{d.name}</span>
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {d.type}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-4">
          <SprintMetricsAside project={project} mentorPending={mentorPending} />
          {archivedProjects.length > 0 && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Completed projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {archivedProjects.map((p) => (
                  <p key={p.id} className="border-b border-border/60 pb-2 text-xs text-muted-foreground last:border-0">
                    <span className="font-medium text-foreground">{p.name}</span> — closed from sprint engine
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <SprintTaskSheet
        task={selectedTask}
        open={taskSheetOpen && !!selectedTask}
        onOpenChange={(v) => {
          setTaskSheetOpen(v);
          if (!v) setSelectedTaskId(null);
        }}
      />

      <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
        <DialogContent className="flex max-h-[85vh] max-w-lg flex-col">
          <DialogHeader>
            <DialogTitle>Problem brief</DialogTitle>
            <DialogDescription>Linked MSME challenge context</DialogDescription>
          </DialogHeader>
          {briefDetail && project?.linkedChallengeId ? (
            <ScrollArea className="max-h-[60vh] space-y-3 pr-3 text-sm">
              <p className="leading-relaxed text-muted-foreground">{briefDetail.problemStatement}</p>
              <Separator />
              <p className="text-xs font-semibold uppercase text-muted-foreground">Deliverables expectation</p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {briefDetail.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">No linked challenge brief for this sprint.</p>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={gateOpen} onOpenChange={setGateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advance stage gate?</AlertDialogTitle>
            <AlertDialogDescription>
              MSME mentor will receive your stage package. Mandatory tasks are complete for{" "}
              <span className="font-medium text-foreground">{SPRINT_STAGE_LABELS[project.currentStageIndex]}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const r = submitStageGate();
                if (r.ok) {
                  toast.success("Stage advanced", { description: `Now in ${SPRINT_STAGE_LABELS[r.stage]}.` });
                } else {
                  toast.error(r.reason === "final" ? "Use complete sprint on Closeout" : "Complete mandatory tasks first");
                }
                setGateOpen(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={finalOpen} onOpenChange={setFinalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete sprint?</AlertDialogTitle>
            <AlertDialogDescription>
              This moves the sprint to <span className="font-medium text-foreground">Completed projects</span> and returns you to an active sprint.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const r = submitFinalCloseout();
                if (r.ok) {
                  toast.success("Sprint completed", { description: project.name });
                  navigate("/innovator/dashboard");
                } else toast.error("Closeout requirements not met");
                setFinalOpen(false);
              }}
            >
              Complete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
