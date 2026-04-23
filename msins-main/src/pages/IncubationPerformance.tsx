import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { useState } from "react";

const incubators = [
  { name: "COEP Bhau Institute of Innovation", district: "Pune", incubated: 142, active: 86, graduated: 48, jobs: 680, funds: "₹18.4Cr", score: 96, status: "Active" },
  { name: "IIT Bombay Society for Innovation", district: "Mumbai", incubated: 128, active: 72, graduated: 42, jobs: 620, funds: "₹16.2Cr", score: 94, status: "Active" },
  { name: "Venture Center Pune", district: "Pune", incubated: 118, active: 68, graduated: 38, jobs: 540, funds: "₹14.8Cr", score: 92, status: "Active" },
  { name: "VNIT Technology Business Incubator", district: "Nagpur", incubated: 86, active: 52, graduated: 28, jobs: 380, funds: "₹10.2Cr", score: 82, status: "Active" },
  { name: "Kolhapur Innovation Hub", district: "Kolhapur", incubated: 72, active: 44, graduated: 22, jobs: 320, funds: "₹8.6Cr", score: 78, status: "Active" },
  { name: "Nashik AgriTech Incubator", district: "Nashik", incubated: 68, active: 40, graduated: 20, jobs: 280, funds: "₹7.8Cr", score: 76, status: "Active" },
  { name: "Aurangabad MSME Innovation Center", district: "Aurangabad", incubated: 54, active: 28, graduated: 14, jobs: 180, funds: "₹6.2Cr", score: 62, status: "Active" },
  { name: "Thane Startup Incubation Center", district: "Thane", incubated: 48, active: 32, graduated: 12, jobs: 220, funds: "₹5.4Cr", score: 68, status: "Active" },
  { name: "Amravati Agri Incubator", district: "Amravati", incubated: 32, active: 18, graduated: 8, jobs: 120, funds: "₹3.8Cr", score: 48, status: "At Risk" },
  { name: "Gadchiroli Rural TBI", district: "Gadchiroli", incubated: 18, active: 8, graduated: 4, jobs: 60, funds: "₹2.1Cr", score: 34, status: "At Risk" },
];

const IncubationPerformance = () => {
  const [selected, setSelected] = useState<typeof incubators[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Incubation Performance</h1>
          <p className="text-xs text-muted-foreground mt-1">Measure and compare incubation center effectiveness across Maharashtra</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Total Centers" value="47" trend={{ value: "3", positive: true }} />
          <StatCard label="Total Startups" value="1,842" trend={{ value: "12%", positive: true }} />
          <StatCard label="Graduated" value="486" trend={{ value: "18%", positive: true }} />
          <StatCard label="Jobs Created" value="8,420" trend={{ value: "14%", positive: true }} />
          <StatCard label="Avg Center Score" value="72" subtitle="Out of 100" />
        </div>

        <FilterBar
          searchPlaceholder="Search incubators..."
          filters={[
            { label: "All Districts", options: ["Pune", "Mumbai", "Nagpur", "Nashik", "Kolhapur"] },
            { label: "All Status", options: ["Active", "At Risk"] },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Incubator Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Incubator", "District", "Incubated", "Active", "Graduated", "Jobs", "Funds", "Score", "Status"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {incubators.map(inc => (
                    <tr key={inc.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(inc)}>
                      <td className="py-2.5 px-3 font-medium text-foreground max-w-[200px] truncate">{inc.name}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{inc.district}</td>
                      <td className="py-2.5 px-3 font-mono">{inc.incubated}</td>
                      <td className="py-2.5 px-3 font-mono">{inc.active}</td>
                      <td className="py-2.5 px-3 font-mono">{inc.graduated}</td>
                      <td className="py-2.5 px-3 font-mono">{inc.jobs}</td>
                      <td className="py-2.5 px-3 font-mono">{inc.funds}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold">{inc.score}</td>
                      <td className="py-2.5 px-3"><StatusBadge status={inc.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold text-foreground mb-3">Best Centers</h3>
              {incubators.slice(0, 3).map((inc, i) => (
                <div key={inc.name} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-secondary rounded px-2 transition-colors" onClick={() => setSelected(inc)}>
                  <span className="text-[10px] font-mono text-muted-foreground">{i + 1}</span>
                  <span className="text-xs text-foreground flex-1 truncate">{inc.name.split(" ").slice(0, 3).join(" ")}</span>
                  <span className="text-xs font-mono text-success">{inc.score}</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold text-foreground mb-3">Weak Centers</h3>
              {incubators.slice(-3).reverse().map((inc, i) => (
                <div key={inc.name} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-secondary rounded px-2 transition-colors" onClick={() => setSelected(inc)}>
                  <span className="text-[10px] font-mono text-muted-foreground">{i + 1}</span>
                  <span className="text-xs text-foreground flex-1 truncate">{inc.name.split(" ").slice(0, 3).join(" ")}</span>
                  <span className="text-xs font-mono text-destructive">{inc.score}</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold text-foreground mb-3">Success Stories</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="bg-success/5 border border-success/20 rounded-lg p-2">COEP Bhau graduated 48 startups with ₹42Cr combined revenue</p>
                <p className="bg-success/5 border border-success/20 rounded-lg p-2">IIT Bombay incubator created 620 direct jobs in 2 years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle={`District: ${selected?.district}`}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Incubated", v: selected.incubated }, { l: "Active", v: selected.active },
                { l: "Graduated", v: selected.graduated }, { l: "Jobs Created", v: selected.jobs },
                { l: "Funds Used", v: selected.funds }, { l: "Score", v: selected.score },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold font-mono mt-1">{i.v}</p>
                </div>
              ))}
            </div>
            <div><p className="text-xs font-medium mb-2">Status</p><StatusBadge status={selected.status} /></div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default IncubationPerformance;
