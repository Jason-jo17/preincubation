import { ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SprintKanbanColumn, SprintProject, SprintTask } from "@/data/innovator-sprint-seed";
import { moveTask } from "@/lib/innovator-sprint-store";

const COLUMNS: { id: SprintKanbanColumn; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "in_progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

const COL_ORDER: SprintKanbanColumn[] = ["backlog", "in_progress", "review", "done"];

function nextColumn(col: SprintKanbanColumn): SprintKanbanColumn | null {
  const i = COL_ORDER.indexOf(col);
  if (i < 0 || i >= COL_ORDER.length - 1) return null;
  return COL_ORDER[i + 1]!;
}

function prevColumn(col: SprintKanbanColumn): SprintKanbanColumn | null {
  const i = COL_ORDER.indexOf(col);
  if (i <= 0) return null;
  return COL_ORDER[i - 1]!;
}

function TaskCard({ task, onOpen }: { task: SprintTask; onOpen: (t: SprintTask) => void }) {
  const n = nextColumn(task.column);
  const p = prevColumn(task.column);
  return (
    <Card className="border-border shadow-sm hover:border-primary/30 transition-colors cursor-pointer group">
      <CardContent className="p-3 space-y-2" onClick={() => onOpen(task)}>
        <div className="flex items-start gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground leading-snug">{task.title}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
                {task.priority}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-normal">
                {task.column.replace("_", " ")}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground space-y-0.5 pl-6">
          <p>
            Due <span className="font-mono text-foreground">{task.dueDate}</span> · {task.owner}
          </p>
          <p className="line-clamp-2">
            <span className="font-medium text-foreground/90">Deliverable:</span> {task.deliverable}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 pl-6 pt-1" onClick={(e) => e.stopPropagation()}>
          {p && (
            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2" onClick={() => moveTask(task.id, p)}>
              ← {p.replace("_", " ")}
            </Button>
          )}
          {n && (
            <Button variant="secondary" size="sm" className="h-7 text-[10px] px-2 gap-0.5" onClick={() => moveTask(task.id, n)}>
              {n.replace("_", " ")}
              <ChevronRight className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function SprintKanban({ project, onOpenTask }: { project: SprintProject; onOpenTask: (t: SprintTask) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 min-h-[320px]">
      {COLUMNS.map((col) => (
        <div key={col.id} className="rounded-xl border border-border bg-card/50 flex flex-col min-h-[280px]">
          <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">{col.title}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{project.columns[col.id].length}</span>
          </div>
          <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[560px]">
            {project.columns[col.id].map((tid) => {
              const t = project.tasks[tid];
              if (!t) return null;
              return <TaskCard key={tid} task={t} onOpen={onOpenTask} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
