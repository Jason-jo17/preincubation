import {
  Calendar,
  LineChart,
  MessageSquare,
  Target,
  User,
  AlertTriangle,
  CheckCircle2,
  FileStack,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NAGPUR_NEXT_INNOVATOR_TEAM_ID } from "@/data/nagpur-next-program-config";
import {
  getNagpurNextTeamDetail,
  nagpurNextSetTeamAtRisk,
} from "@/lib/nagpur-next-cohort-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function statusChip(status: string) {
  if (status === "completed" || status === "approved")
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100";
  if (status === "under_review" || status === "submitted")
    return "border-amber-500/35 bg-amber-500/10 text-amber-900 dark:text-amber-100";
  if (status === "rework_needed") return "border-rose-500/35 bg-rose-500/10 text-rose-900 dark:text-rose-100";
  if (status === "in_progress") return "border-violet-500/30 bg-violet-500/10 text-violet-900 dark:text-violet-100";
  if (status === "locked") return "border-border bg-muted text-muted-foreground";
  return "border-border bg-secondary/50 text-muted-foreground";
}

export interface NagpurNextTeamDrawerProps {
  teamId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function NagpurNextTeamDrawer({ teamId, open, onOpenChange }: NagpurNextTeamDrawerProps) {
  const detail = teamId ? getNagpurNextTeamDetail(teamId) : null;
  const isKiran = teamId === NAGPUR_NEXT_INNOVATOR_TEAM_ID;

  const done = detail?.tasksPreview.filter((t) => t.status === "completed" || t.status === "approved").length ?? 0;
  const total = detail?.tasksPreview.length ?? 0;
  const pending =
    detail?.tasksPreview.filter((t) =>
      ["not_started", "in_progress", "under_review", "submitted", "rework_needed"].includes(t.status),
    ).length ?? 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <SheetHeader className="space-y-1 border-b border-border px-6 py-4 text-left">
          <SheetTitle className="text-lg">Team workspace</SheetTitle>
          <SheetDescription className="text-xs">
            {isKiran
              ? "Kiran · Nagpur NEXT — synced with innovator sprint (single cohort store)."
              : "Cohort roster preview — expand tasks in Program builder."}
          </SheetDescription>
        </SheetHeader>
        {detail?.student ? (
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-6 pb-8">
              <section className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Student</p>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{detail.student.name}</p>
                    <p className="text-xs text-muted-foreground">{detail.student.college}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        Match {detail.student.matchScore}%
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Attendance {detail.student.attendancePct}%
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Trend {detail.student.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
                {detail.student.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {detail.student.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border/80 bg-secondary/40 px-2 py-0.5 text-[11px] text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>

              <Separator />

              <section className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Project</p>
                {detail.project ? (
                  <>
                    <p className="text-sm leading-relaxed text-foreground">{detail.project.problemStatement}</p>
                    <p className="text-xs text-muted-foreground">
                      MSME partner: <span className="font-medium text-foreground">{detail.project.msme}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        TRL {detail.project.trl}
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        CRL {detail.project.crl}
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        IRL {detail.project.irl}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {detail.project.phase} · {detail.project.sprint}
                    </p>
                  </>
                ) : null}
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Progress</p>
                  <span className="text-[11px] text-muted-foreground">
                    {done}/{total} tasks closed
                  </span>
                </div>
                <Progress value={total ? Math.round((done / total) * 100) : 0} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="rounded-lg border border-border bg-secondary/30 py-2">
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-mono font-bold text-foreground">{pending}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 py-2">
                    <p className="text-muted-foreground">Done</p>
                    <p className="font-mono font-bold text-foreground">{done}</p>
                  </div>
                </div>
              </section>

              {isKiran && detail.feedback && detail.feedback.length > 0 ? (
                <>
                  <Separator />
                  <section className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Feedback history
                    </p>
                    <ul className="space-y-2">
                      {detail.feedback.map((f, i) => (
                        <li key={i} className="rounded-lg border border-border/80 bg-card px-3 py-2 text-xs">
                          <span className="font-medium text-foreground">{f.author}: </span>
                          <span className="text-muted-foreground">{f.message}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              ) : null}

              {isKiran && detail.files && detail.files.length > 0 ? (
                <>
                  <Separator />
                  <section className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Files</p>
                    <ul className="space-y-1.5">
                      {detail.files.map((f) => (
                        <li
                          key={f.id}
                          className="flex items-center gap-2 rounded-lg border border-border/70 px-2.5 py-2 text-xs"
                        >
                          <FileStack className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate text-foreground">{f.fileName}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              ) : null}

              <Separator />

              <section className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1.5"
                  onClick={() => toast.message("Message team", { description: "Composer opened (demo)." })}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message team
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => toast.message("Review scheduled", { description: "Calendar invite staged (demo)." })}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Schedule review
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => toast.success("Sprint gate", { description: "Gate approval recorded (demo)." })}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve sprint gate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn("gap-1.5 text-amber-800 dark:text-amber-200")}
                  onClick={() => {
                    if (teamId) nagpurNextSetTeamAtRisk(teamId, true, "Flagged from mentor desk");
                    toast.message("Marked at risk", { description: "Innovator dashboard will reflect risk strip." });
                  }}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Mark at risk
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5"
                  onClick={() => toast.message("Performance", { description: "Trend mirrors cohort attendance feed." })}
                >
                  <LineChart className="h-3.5 w-3.5" />
                  Analytics
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5" asChild>
                  <a href="/innovator/sprint">
                    <Target className="h-3.5 w-3.5" />
                    Open innovator sprint
                  </a>
                </Button>
              </section>
            </div>
          </ScrollArea>
        ) : (
          <div className="p-6 text-sm text-muted-foreground">Select a team to view details.</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
