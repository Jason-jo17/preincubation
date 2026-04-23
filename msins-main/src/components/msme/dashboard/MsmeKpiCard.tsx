import {
  Activity,
  BadgeIndianRupee,
  BriefcaseBusiness,
  ClipboardCheck,
  Clock3,
  Gauge,
  LineChart,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { MsmeExecutiveKpi } from "@/data/msme-dashboard-command-center";

const iconMap: Record<MsmeExecutiveKpi["icon"], LucideIcon> = {
  briefcase: BriefcaseBusiness,
  activity: Activity,
  badgeIndianRupee: BadgeIndianRupee,
  clock: Clock3,
  gauge: Gauge,
  lineChart: LineChart,
  clipboardCheck: ClipboardCheck,
};

export function MsmeKpiCard({ kpi }: { kpi: MsmeExecutiveKpi }) {
  const Icon = iconMap[kpi.icon];
  return (
    <Card className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          {kpi.delta ? (
            <Badge
              variant="secondary"
              className={cn(
                "text-[10px] font-semibold",
                kpi.positive ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300",
              )}
            >
              {kpi.positive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
              {kpi.delta}
            </Badge>
          ) : kpi.urgent ? (
            <Badge className="bg-rose-500/90 text-[10px]">Urgent</Badge>
          ) : null}
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{kpi.value}</p>
      </CardContent>
    </Card>
  );
}
