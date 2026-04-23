import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import type { MsmeImpactCard as MsmeImpactCardData } from "@/data/msme-dashboard-command-center";

export function ImpactCard({ impact }: { impact: MsmeImpactCardData }) {
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-3 p-4">
        <p className="text-sm font-semibold text-foreground">{impact.title}</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground">{impact.metricLabel}</p>
            <p className="text-lg font-bold text-foreground">{impact.metricValue}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{impact.savingsLabel}</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{impact.savingsValue}</p>
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Execution completion</span>
            <span className="font-mono">{impact.progressPct}%</span>
          </div>
          <Progress value={impact.progressPct} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
