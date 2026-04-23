import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cohortData } from "@/data/ceo-regional-intelligence";

export default function CeoCohortDetailPage() {
  const { slug } = useParams();
  const cohort = cohortData.find((x) => x.slug === slug);

  if (!cohort) {
    return (
      <DashboardLayout>
        <div className="space-y-3">
          <h1 className="text-xl font-bold">Cohort not found</h1>
          <Button asChild><Link to="/ceo/regional-hub">Back to Hub</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">{cohort.name}</h1>
        <p className="text-sm text-muted-foreground">Progress, teams, review velocity, mentor load, and outcome signals.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            ["Teams Enrolled", `${cohort.teamsEnrolled}`],
            ["Completion %", `${cohort.completionPct}%`],
            ["Delayed Teams", `${cohort.delayedTeams}`],
            ["Mentor Load", `${cohort.mentorLoadPct}%`],
            ["Outcomes", cohort.outcomes],
          ].map(([k, v]) => (
            <Card key={k} className="border-border shadow-sm"><CardContent className="pt-4"><p className="text-[11px] text-muted-foreground">{k}</p><p className="mt-1 text-sm font-semibold">{v}</p></CardContent></Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
