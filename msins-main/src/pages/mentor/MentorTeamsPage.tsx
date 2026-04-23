import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Building2, ClipboardList, Layers, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  mentorCohortWatchlist,
  mentorMsmeWatchlist,
  mentorReviewQueue,
  mentorTeamRows,
  type MentorTeamRow,
} from "@/data/mentor-workspace";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";
import { getNagpurNextCohortState } from "@/lib/nagpur-next-cohort-store";
import { useInnovatorSprintStore } from "@/hooks/use-innovator-sprint-store";

const TAB_VALUES = ["teams", "reviews", "cohorts", "msme"] as const;
type MentorTeamTab = (typeof TAB_VALUES)[number];

function riskBadge(r: "Low" | "Medium" | "High") {
  if (r === "Low") return "border-success/40 text-success bg-success/5";
  if (r === "Medium") return "border-amber-500/40 text-amber-800 dark:text-amber-200 bg-amber-500/5";
  return "border-destructive/40 text-destructive bg-destructive/5";
}

function workspaceHref(row: MentorTeamRow) {
  return `/mentor/teams/${row.id}/workspace`;
}

export default function MentorTeamsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sprintStore = useInnovatorSprintStore();
  const [feedbackTeam, setFeedbackTeam] = useState<MentorTeamRow | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const tab = (TAB_VALUES as readonly string[]).includes(searchParams.get("tab") ?? "")
    ? (searchParams.get("tab") as MentorTeamTab)
    : "teams";

  const setTab = (v: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", v);
    setSearchParams(next, { replace: true });
  };

  const focusId = searchParams.get("focus");

  const cohortBatchV = useNagpurNextCohortStoreVersion();
  const cohortState = useMemo(() => getNagpurNextCohortState(), [cohortBatchV]);

  const teamRowsLive = useMemo(() => {
    return mentorTeamRows.map((row) => {
      // Mock enrichment for Kiran/Nagpur NEXT team
      if (row.id === "mt-kiran") {
        const teamTasks = Object.values(cohortState.taskState);
        const pending = teamTasks.filter(t => t.status === "under_review").length;
        return { 
          ...row, 
          progressPct: Math.round((teamTasks.filter(t => t.status === "approved" || t.status === "completed").length / teamTasks.length) * 100),
          pendingReviews: pending
        };
      }
      return row;
    });
  }, [cohortState]);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Teams & programs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Innovator sprint progress for assigned teams updates live from the sprint engine (VNIT EV row).
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="h-10 flex flex-wrap w-full sm:w-auto justify-start gap-1 bg-muted/50 p-1">
          <TabsTrigger value="teams" className="text-xs gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="cohorts" className="text-xs gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Cohorts
          </TabsTrigger>
          <TabsTrigger value="msme" className="text-xs gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            MSME Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="mt-0">
          <Card className="border-border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {["Team", "Type", "Members", "Domain", "Sprint", "Progress", "Risk", "Last active"].map((h) => (
                        <TableHead key={h} className="text-[11px] whitespace-nowrap">
                          {h}
                        </TableHead>
                      ))}
                      <TableHead className="text-[11px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamRowsLive.map((row) => (
                      <TableRow key={row.id} className={cn(focusId === row.id && "bg-primary/[0.05]")}>
                        <TableCell className="font-medium text-sm max-w-[200px]">
                          <div className="flex flex-col gap-1">
                            {row.teamName}
                             {(row as any).pendingReviews > 0 && (
                               <div className="flex items-center gap-1.5 mt-0.5 group">
                                 <Badge className="w-fit px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 hover:bg-amber-600 text-white border-none animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                                   {(row as any).pendingReviews} ACTION REQUIRED
                                 </Badge>
                                 <span className="text-[10px] text-amber-600 font-medium">Review pending</span>
                               </div>
                             )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "text-[10px] font-bold tracking-tight",
                              row.projectType === "Innovation" 
                                ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" 
                                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            )}
                          >
                            {row.projectType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{row.members}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{row.domain}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px]">{row.sprint}</TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <Progress value={row.progressPct} className="h-1.5 flex-1" />
                            <span className="text-xs font-mono w-8">{row.progressPct}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-[10px]", riskBadge(row.risk))}>
                            {row.risk}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">{row.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-wrap justify-end gap-1">
                             <Button size="sm" variant="secondary" className="h-8 text-[10px] px-2 shadow-sm border border-primary/10" asChild>
                              <Link to={workspaceHref(row)}>Open Workspace</Link>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-[10px] px-2" onClick={() => setFeedbackTeam(row)}>
                              Send Feedback
                            </Button>
                            <Button size="sm" className="h-8 text-[10px] px-2" asChild>
                              <Link to="/mentor/sessions">Schedule Call</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <p className="text-[11px] text-muted-foreground mt-2">
            Workspace opens innovator sprint or MSME applicants based on team linkage. Schedule call opens sessions planner.
          </p>
        </TabsContent>

        <TabsContent value="reviews" className="mt-0 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Review queue</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {mentorReviewQueue.map((q) => (
              <Card key={q.id} className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{q.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {q.owner} · due <span className="font-mono">{q.due}</span>
                  </p>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button size="sm" className="h-8 text-xs" onClick={() => toast.success("Approved", { description: q.title })}>
                    Approve
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={() => toast.message("Changes requested", { description: q.title })}>
                    Request Changes
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => toast.message("Comment added")}>
                    Comment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="mt-0 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Cohort watchlist</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {mentorCohortWatchlist.map((c) => (
              <Card key={c.id} className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between gap-2">
                    <CardTitle className="text-base font-semibold">{c.name}</CardTitle>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {c.window}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="rounded-lg border border-border bg-secondary/20 py-2">
                      <p className="text-muted-foreground">Health</p>
                      <p className="font-mono font-bold text-foreground">{c.healthPct}%</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/20 py-2">
                      <p className="text-muted-foreground">Attendance</p>
                      <p className="font-mono font-bold text-foreground">{c.attendancePct}%</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/20 py-2">
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-mono font-bold text-foreground">{c.progressPct}%</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full h-8 text-xs" asChild>
                    <Link to="/cohort/dashboard">Open cohort manager</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="msme" className="mt-0 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">MSME projects</h2>
          <div className="space-y-3">
            {mentorMsmeWatchlist.map((m) => (
              <Card key={m.id} className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{m.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{m.company}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium text-foreground">Assigned teams:</span> {m.teams}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.notes}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button size="sm" variant="secondary" className="h-8 text-xs" asChild>
                      <Link to="/msme/applicants">Applicants</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                      <Link to="/msme/challenges">Challenges</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={!!feedbackTeam} onOpenChange={(o) => !o && setFeedbackTeam(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          {feedbackTeam && (
            <>
              <DialogHeader>
                <DialogTitle>Send Feedback to {feedbackTeam.teamName}</DialogTitle>
                <DialogDescription>
                  Your feedback will be shared with the team leads and tracked in their sprint board.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Textarea 
                  placeholder="Type your feedback here..." 
                  className="min-h-[120px] rounded-xl border-border/50 focus:border-primary/50"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <DialogFooter className="gap-2 sm:justify-between">
                <Button variant="ghost" className="rounded-xl" onClick={() => setFeedbackTeam(null)}>
                  Cancel
                </Button>
                <Button
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  onClick={() => {
                    toast.success("Feedback shared", { description: `Message sent to ${feedbackTeam.teamName}` });
                    setFeedbackTeam(null);
                    setFeedbackText("");
                  }}
                >
                  Send Feedback
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
