import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { incubatorData } from "@/data/ceo-regional-intelligence";

export default function CeoIncubatorDetailPage() {
  const { slug } = useParams();
  const incubator = incubatorData.find((x) => x.slug === slug);

  if (!incubator) {
    return (
      <DashboardLayout>
        <div className="space-y-3">
          <h1 className="text-xl font-bold">Incubator not found</h1>
          <Button asChild><Link to="/ceo/regional-hub">Back to Hub</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">{incubator.name}</h1>
        <p className="text-sm text-muted-foreground">Funds, utilization, mentor network, output conversion, and ROI standing.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            ["Funds Received", `₹${incubator.fundsCr} Cr`],
            ["Utilization", `${incubator.utilizationPct}%`],
            ["Teams Supported", `${incubator.teamsSupported}`],
            ["Startup Conversion", `${incubator.startupConversionPct}%`],
            ["Mentor Network", `${incubator.mentorNetwork}`],
            ["ROI / Rank", `${incubator.roiScore} (#${incubator.stateRank})`],
          ].map(([k, v]) => (
            <Card key={k} className="border-border shadow-sm"><CardContent className="pt-4"><p className="text-[11px] text-muted-foreground">{k}</p><p className="mt-1 text-sm font-semibold">{v}</p></CardContent></Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
