import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AlertItem } from "@/components/dashboard/AlertItem";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { useState } from "react";

const alerts = [
  { id: 1, title: "Gadchiroli Rural TBI — Critical Underperformance", description: "Only 4 graduates from ₹2.1Cr funding. Score: 34/100. Immediate review required.", severity: "high" as const, type: "Low Activity Center", time: "1h ago", owner: "Unassigned", status: "Critical" },
  { id: 2, title: "12 Cohorts Below 10% Engagement", description: "Cohorts in Amravati, Washim, Hingoli, Beed show critically low student participation.", severity: "high" as const, type: "Low Activity", time: "2h ago", owner: "Regional Director", status: "Warning" },
  { id: 3, title: "847 Problems with Zero Applicants", description: "62% from underserved districts. Average age: 42 days. Re-matching recommended.", severity: "high" as const, type: "No Applicants", time: "3h ago", owner: "Unassigned", status: "Critical" },
  { id: 4, title: "34 Projects Past Completion Deadline", description: "8 in prototype stage, 12 in pilot. Primary blockers: funding gaps and regulatory delays.", severity: "high" as const, type: "Delayed Project", time: "5h ago", owner: "Project Manager", status: "Warning" },
  { id: 5, title: "Fund Anomaly — Amravati Center", description: "₹3.8Cr spent but only 8 graduates. Cost per success: ₹47.5L vs state average ₹15.4L.", severity: "high" as const, type: "Fund Anomaly", time: "6h ago", owner: "Finance Team", status: "Critical" },
  { id: 6, title: "1,240 MSMEs Inactive 60+ Days", description: "Concentrated in Vidarbha and Marathwada. Automated re-engagement recommended.", severity: "medium" as const, type: "MSME Inactive", time: "8h ago", owner: "Unassigned", status: "Warning" },
  { id: 7, title: "Mentor Inactivity — 8 Cohorts Unassigned", description: "No mentor activity in 4 weeks for cohorts in Nashik, Aurangabad, and Amravati.", severity: "medium" as const, type: "Mentor Inactivity", time: "1d ago", owner: "HR Team", status: "Warning" },
  { id: 8, title: "Q4 Financial Reports Missing", description: "3 centers have not submitted quarterly financial reports. Compliance deadline passed.", severity: "medium" as const, type: "Delayed Reporting", time: "2d ago", owner: "Finance Team", status: "Info" },
  { id: 9, title: "Prototype Stage Bottleneck", description: "62% drop-off rate at prototype stage. Mentorship and funding gaps identified.", severity: "medium" as const, type: "Delayed Project", time: "3d ago", owner: "Program Director", status: "Warning" },
  { id: 10, title: "Low Application Quality — 2 Regions", description: "Amravati and Aurangabad showing 40% rejection rate vs 18% state average.", severity: "low" as const, type: "Low Activity", time: "5d ago", owner: "Regional Director", status: "Info" },
];

const AlertsCenter = () => {
  const [selected, setSelected] = useState<typeof alerts[0] | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? alerts : alerts.filter(a => a.severity === filter.toLowerCase());

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Alerts Center</h1>
          <p className="text-xs text-muted-foreground mt-1">Monitor, triage, and resolve system-wide alerts</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {["All", "High", "Medium", "Low"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:border-primary/30"}`}
              >
                {f} {f !== "All" && `(${alerts.filter(a => a.severity === f.toLowerCase()).length})`}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <FilterBar searchPlaceholder="Search alerts..." showExport={false} />
        </div>

        <div className="space-y-2">
          {filtered.map(alert => (
            <div key={alert.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer" onClick={() => setSelected(alert)}>
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.severity === "high" ? "bg-destructive" : alert.severity === "medium" ? "bg-warning" : "bg-primary"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <StatusBadge status={alert.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-muted-foreground">Type: {alert.type}</span>
                    <span className="text-[10px] text-muted-foreground">Owner: {alert.owner}</span>
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
                <button className="text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title || ""} subtitle={`Severity: ${selected?.severity}`}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Type", v: selected.type }, { l: "Severity", v: selected.severity },
                { l: "Owner", v: selected.owner }, { l: "Time", v: selected.time },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold mt-1">{i.v}</p>
                </div>
              ))}
            </div>
            <div><p className="text-xs text-foreground">{selected.description}</p></div>
            <div className="flex gap-2">
              <button className="text-xs text-primary-foreground bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Resolve</button>
              <button className="text-xs text-foreground bg-secondary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors border border-border">Assign Owner</button>
            </div>
            <div>
              <p className="text-xs font-medium mb-2">Timeline</p>
              <div className="space-y-1">
                {["Alert created — " + selected.time, "Auto-classified as " + selected.severity, "Notification sent to dashboard"].map(t => (
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

export default AlertsCenter;
