import { Activity, CalendarDays, Gauge, MessageSquare, ShieldAlert, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SprintProject } from "@/data/innovator-sprint-seed";
import { allMandatoryTasksDone } from "@/lib/innovator-sprint-store";

export function SprintMetricsAside({ project, mentorPending }: { project: SprintProject; mentorPending: number }) {
  const tasks = Object.values(project.tasks);
  const done = tasks.filter((t) => t.column === "done").length;
  const blockersOpen = project.blockers.filter((b) => !b.resolved).length;
  const velocity = Math.max(1, Math.round(done / Math.max(1, project.weekCurrent)));
  const daysLeft = Math.max(0, 18 - project.weekCurrent * 2);
  const readiness = allMandatoryTasksDone(project)
    ? 100
    : Math.min(99, Math.round((done / Math.max(1, tasks.filter((t) => t.mandatory).length)) * 100));

  const rows = [
    { label: "Tasks completed", value: `${done}/${tasks.length}`, icon: Target },
    { label: "Blockers", value: String(blockersOpen), icon: ShieldAlert },
    { label: "Velocity", value: `${velocity}/wk`, icon: Activity },
    { label: "Mentor comments pending", value: String(mentorPending), icon: MessageSquare },
    { label: "Days left (est.)", value: String(daysLeft), icon: CalendarDays },
    { label: "Readiness score", value: `${readiness}%`, icon: Gauge },
  ];

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Live metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 rounded-lg border border-border/80 bg-secondary/20 px-3 py-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <r.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{r.label}</p>
              <p className="text-sm font-bold font-mono text-foreground">{r.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
