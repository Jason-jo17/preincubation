import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sectorData, startupData } from "@/data/ceo-regional-intelligence";

export default function CeoStartupDetailPage() {
  const { slug } = useParams();
  const startup = startupData.find((x) => x.slug === slug);

  if (!startup) {
    return (
      <DashboardLayout>
        <div className="space-y-3">
          <h1 className="text-xl font-bold">Startup not found</h1>
          <Button asChild><Link to="/ceo/regional-hub">Back to Hub</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  const sector = sectorData.find((x) => x.key === startup.sector);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">{startup.name}</h1>
        <p className="text-sm text-muted-foreground">{startup.product} · founder profile, traction, jobs, MSME clients, and milestones.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            ["Sector", sector?.label ?? "-"],
            ["Stage", startup.stage],
            ["Revenue", `₹${startup.revenueCr} Cr`],
            ["Jobs", `${startup.jobs}`],
            ["MSME Clients", `${startup.msmeClients}`],
            ["Funding", `₹${startup.fundingLakh} Lakh`],
          ].map(([k, v]) => (
            <Card key={k} className="border-border shadow-sm"><CardContent className="pt-4"><p className="text-[11px] text-muted-foreground">{k}</p><p className="mt-1 text-sm font-semibold">{v}</p></CardContent></Card>
          ))}
        </div>
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="text-sm">Founders and milestones</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-foreground">Founders: {startup.founders.join(", ")}</p>
            {startup.milestones.map((m) => <p key={m} className="text-xs text-muted-foreground">- {m}</p>)}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
