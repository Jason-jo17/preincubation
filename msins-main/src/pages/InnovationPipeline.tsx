import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const pipelineStages = [
  { stage: "Ideas", count: 12450, icon: "💡" },
  { stage: "Applied", count: 8320, icon: "📝" },
  { stage: "Selected", count: 4150, icon: "✅" },
  { stage: "Prototype", count: 3140, icon: "🔧" },
  { stage: "Pilot", count: 1280, icon: "🚀" },
  { stage: "Deployed", count: 486, icon: "🏭" },
];

const activeProjects = [
  { name: "Smart Water Monitoring System", team: "AquaTech Solutions", region: "Pune", stage: "Pilot", progress: 78, risk: "On Track" },
  { name: "AI-Powered Quality Inspector", team: "VisionAI Labs", region: "Mumbai", stage: "Prototype", progress: 52, risk: "At Risk" },
  { name: "Agri Supply Chain Platform", team: "FarmConnect", region: "Nashik", stage: "Pilot", progress: 65, risk: "On Track" },
  { name: "Solar Micro-Grid Controller", team: "SunPower Tech", region: "Nagpur", stage: "Selected", progress: 30, risk: "On Track" },
  { name: "Textile Waste Recycler", team: "EcoFiber", region: "Kolhapur", stage: "Prototype", progress: 44, risk: "Delayed" },
  { name: "Digital Marketplace for MSMEs", team: "MarketBridge", region: "Aurangabad", stage: "Applied", progress: 18, risk: "On Track" },
  { name: "Cold Chain Tracker", team: "CoolTrack Systems", region: "Nashik", stage: "Pilot", progress: 82, risk: "On Track" },
  { name: "Predictive Maintenance IoT", team: "MaintainAI", region: "Pune", stage: "Prototype", progress: 61, risk: "At Risk" },
  { name: "Rural Health Diagnostics", team: "HealthReach", region: "Amravati", stage: "Prototype", progress: 35, risk: "Delayed" },
  { name: "Automated Cotton Grading", team: "CottonTech", region: "Amravati", stage: "Selected", progress: 22, risk: "On Track" },
];

const InnovationPipeline = () => {
  const [selected, setSelected] = useState<typeof activeProjects[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Innovation Pipeline</h1>
          <p className="text-xs text-muted-foreground mt-1">Track projects through the full innovation lifecycle</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((s) => (
            <StatCard key={s.stage} label={s.stage} value={s.count.toLocaleString()} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Pipeline Metrics</h2>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>Conversion: <span className="font-mono text-success">3.9%</span></span>
                  <span>Avg Deploy: <span className="font-mono text-foreground">142 days</span></span>
                  <span>Drop-off: <span className="font-mono text-destructive">62%</span></span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 mt-4">
              <h2 className="text-sm font-semibold text-foreground mb-4">Pipeline Flow</h2>
              <div className="flex items-center gap-0">
                {pipelineStages.map((s, i) => {
                  const convRate = i > 0 ? ((s.count / pipelineStages[i - 1].count) * 100).toFixed(1) : "—";
                  const dropOff = i > 0 ? (100 - (s.count / pipelineStages[i - 1].count) * 100).toFixed(1) : "—";
                  return (
                    <div key={s.stage} className="flex-1 flex flex-col items-center relative">
                      {i > 0 && <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10"><span className="text-muted-foreground text-lg">›</span></div>}
                      <div className="w-full rounded-lg flex flex-col items-center justify-center py-5 px-2 border border-border bg-secondary/50 hover:border-primary/30 transition-colors">
                        <span className="text-lg mb-1">{s.icon}</span>
                        <span className="text-base font-bold font-mono text-foreground">{s.count.toLocaleString()}</span>
                        <span className="text-[10px] text-muted-foreground mt-1">{s.stage}</span>
                      </div>
                      {i > 0 && (
                        <div className="mt-2 text-center">
                          <p className="text-[10px] font-mono text-success">{convRate}% conv.</p>
                          <p className="text-[10px] font-mono text-destructive">{dropOff}% drop</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Bottleneck Insights</h2>
            <InsightCard type="warning" message="High drop-off at prototype stage — 62% of selected teams fail to deliver. Mentorship gaps identified in Tier-2 districts." action="View Failure Analysis →" />
            <InsightCard type="warning" message="Low application quality in Amravati and Aurangabad. Selection criteria may be too restrictive for emerging regions." action="Review Criteria →" />
            <InsightCard type="info" message="Pilot-to-deployment conversion is strong at 38%. Manufacturing (42%) and AgriTech (36%) leading." />
            <InsightCard type="warning" message="8 pilot projects stalled >45 days due to pending regulatory approvals or funding gaps." action="Escalate →" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Active Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Project", "Team", "Region", "Stage", "Progress", "Risk"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeProjects.map(p => (
                  <tr key={p.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(p)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{p.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{p.team}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{p.region}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={p.stage} /></td>
                    <td className="py-2.5 px-3"><div className="flex items-center gap-2"><Progress value={p.progress} className="h-1.5 w-16" /><span className="font-mono text-xs">{p.progress}%</span></div></td>
                    <td className="py-2.5 px-3"><StatusBadge status={p.risk} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle={selected?.team}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Team", v: selected.team }, { l: "Region", v: selected.region },
                { l: "Stage", v: selected.stage }, { l: "Progress", v: `${selected.progress}%` },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold font-mono mt-1">{i.v}</p>
                </div>
              ))}
            </div>
            <div><p className="text-xs font-medium mb-2">Risk Status</p><StatusBadge status={selected.risk} /></div>
            <div><p className="text-xs font-medium mb-2">Progress</p><Progress value={selected.progress} className="h-2" /></div>
            <div>
              <p className="text-xs font-medium mb-2">Activity Log</p>
              <div className="space-y-1">
                {["Prototype review completed — Mar 8", "Mentor feedback submitted — Mar 5", "Milestone 2 approved — Feb 28"].map(t => (
                  <p key={t} className="text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-lg">{t}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default InnovationPipeline;
