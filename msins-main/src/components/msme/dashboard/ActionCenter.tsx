import { AlertTriangle, CalendarClock, ClipboardCheck, MessageCircleWarning, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MsmePriorityAction } from "@/data/msme-dashboard-command-center";

const iconMap: Record<MsmePriorityAction["type"], LucideIcon> = {
  Approval: ClipboardCheck,
  "Missing Input": MessageCircleWarning,
  Meeting: CalendarClock,
  Delay: AlertTriangle,
};

export function ActionCenter({
  items,
  onAction,
}: {
  items: MsmePriorityAction[];
  onAction: (item: MsmePriorityAction) => void;
}) {
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Needs Your Attention</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-secondary/20 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {item.type}
                    </Badge>
                    <Badge
                      className={cn(
                        "text-[10px]",
                        item.priority === "High" && "bg-rose-500/90",
                        item.priority === "Medium" && "bg-amber-500/90",
                        item.priority === "Scheduled" && "bg-blue-500/90",
                      )}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" className="sm:shrink-0" onClick={() => onAction(item)}>
                {item.actionLabel}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
