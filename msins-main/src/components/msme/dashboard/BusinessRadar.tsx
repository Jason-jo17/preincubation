import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessRadar({
  data,
  onExplore,
}: {
  data: { subject: string; value: number }[];
  onExplore: () => void;
}) {
  const overallScore = Math.round(data.reduce((sum, row) => sum + row.value, 0) / Math.max(1, data.length));
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Business Health Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="h-[280px] rounded-xl border border-border/80 bg-secondary/20 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Overall score</p>
          <p className="mt-1 text-4xl font-bold text-foreground">{overallScore} / 100</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Your weakest area is Automation. Best available solver teams can improve this in 6–8 weeks.
          </p>
          <Button className="mt-4 w-full" onClick={onExplore}>
            Explore Solutions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
