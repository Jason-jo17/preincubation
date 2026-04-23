import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarClock, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  mentorAgendaToday,
  mentorDashboardKpis,
  mentorImpact,
  mentorPriorityTeams,
  mentorProfile,
  mentorRecentActions,
} from "@/data/mentor-workspace";
import { getMentorPlatformPulse } from "@/data/mentor-platform-sync";
import { useInnovatorSprintStore } from "@/hooks/use-innovator-sprint-store";

export default function MentorDashboard() {
  useInnovatorSprintStore();
  const pulse = getMentorPlatformPulse();

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Mentor Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back, <span className="font-semibold text-foreground">{mentorProfile.displayName}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {mentorProfile.badges.map((b) => (
              <Badge key={b} variant="secondary" className="font-normal text-xs border-primary/15 bg-primary/[0.06]">
                {b}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground max-w-xl">
            Innovator booking: <span className="text-foreground font-medium">{pulse.innovatorUpcomingLabel}</span>
            {pulse.activeSprintCount > 0 && (
              <span className="text-muted-foreground">
                {" "}
                · {pulse.activeSprintCount} active innovator sprint{pulse.activeSprintCount > 1 ? "s" : ""}
              </span>
            )}
            {pulse.unassignedMsmeTeams > 0 && (
              <span className="text-amber-700 dark:text-amber-300">
                {" "}
                · {pulse.unassignedMsmeTeams} MSME team{pulse.unassignedMsmeTeams > 1 ? "s" : ""} without mentor assignment
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button variant="outline" size="sm" className="h-9" asChild>
            <Link to="/mentor/sessions">Sessions</Link>
          </Button>
          <Button size="sm" className="h-9" asChild>
            <Link to="/mentor/teams">Teams</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">KPI overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {mentorDashboardKpis.map((k) => (
            <Link
              key={k.id}
              to={k.href}
              className={cn(
                "group rounded-xl border border-border bg-card p-4 shadow-sm transition-all",
                "hover:border-primary/35 hover:shadow-md hover:bg-gradient-to-br hover:from-card hover:to-primary/[0.03]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              )}
            >
              <div className="flex justify-between items-start gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight">{k.label}</p>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-40 group-hover:opacity-100 shrink-0" />
              </div>
              <p className="mt-2 text-xl font-bold font-mono text-foreground">{k.value}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              Today&apos;s agenda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mentorAgendaToday.map((a) => (
              <div key={a.id} className="rounded-lg border border-border/80 bg-secondary/20 px-3 py-2.5">
                <p className="text-[11px] font-mono text-primary font-semibold">{a.time}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.detail}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button size="sm" className="h-8 text-xs" onClick={() => toast.success("Joining Meet (demo)")}>
                    Join Meet
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => toast.message("Reschedule sent")}>
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Priority teams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentorPriorityTeams.map((t) => (
              <div key={t.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border px-3 py-2.5 hover:bg-primary/[0.02]">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.detail}</p>
                </div>
                <Button size="sm" variant="secondary" className="h-8 text-xs shrink-0" asChild>
                  <Link to={`/mentor/teams?tab=teams&focus=${encodeURIComponent(t.mentorTeamRowId)}`}>Open Team</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Recent actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentorRecentActions.map((r) => (
              <div key={r.id} className="text-sm">
                <p className="font-medium text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Mentor impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentorImpact.map((m) => (
              <div key={m.id} className="text-sm">
                <p className="font-medium text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.detail}</p>
              </div>
            ))}
            <Separator className="my-2" />
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Cohort mentor coverage signal: {pulse.cohortMentorCoveragePct}% active / total (cohort manager feed).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
