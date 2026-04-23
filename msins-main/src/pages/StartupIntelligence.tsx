import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const startups = [
  { name: "AquaTech Solutions", incubator: "COEP Bhau Institute", sector: "CleanTech", stage: "Pilot", jobs: 24, revenue: "₹1.8Cr", funding: "₹4.2Cr", status: "Active" },
  { name: "VisionAI Labs", incubator: "IIT Bombay", sector: "Manufacturing", stage: "Prototype", jobs: 18, revenue: "₹0.8Cr", funding: "₹2.4Cr", status: "Active" },
  { name: "FarmConnect Platform", incubator: "Nashik AgriTech", sector: "AgriTech", stage: "Deployed", jobs: 32, revenue: "₹3.2Cr", funding: "₹5.6Cr", status: "Graduated" },
  { name: "SunPower Tech", incubator: "VNIT Nagpur", sector: "CleanTech", stage: "Selected", jobs: 8, revenue: "₹0.2Cr", funding: "₹1.2Cr", status: "Active" },
  { name: "EcoFiber Industries", incubator: "Kolhapur Hub", sector: "Manufacturing", stage: "Prototype", jobs: 14, revenue: "₹0.6Cr", funding: "₹1.8Cr", status: "Active" },
  { name: "MarketBridge Digital", incubator: "Venture Center", sector: "IT", stage: "Applied", jobs: 6, revenue: "₹0.1Cr", funding: "₹0.8Cr", status: "Active" },
  { name: "CoolTrack Systems", incubator: "Nashik AgriTech", sector: "Logistics", stage: "Deployed", jobs: 28, revenue: "₹2.4Cr", funding: "₹4.8Cr", status: "Graduated" },
  { name: "MaintainAI", incubator: "COEP Bhau Institute", sector: "Manufacturing", stage: "Pilot", jobs: 16, revenue: "₹1.2Cr", funding: "₹3.2Cr", status: "Active" },
  { name: "HealthReach Diagnostics", incubator: "Aurangabad MSME", sector: "Healthcare", stage: "Prototype", jobs: 12, revenue: "₹0.4Cr", funding: "₹2.0Cr", status: "Active" },
  { name: "CottonTech Grading", incubator: "Amravati Agri", sector: "AgriTech", stage: "Selected", jobs: 4, revenue: "₹0.1Cr", funding: "₹0.6Cr", status: "Active" },
];

const growthData = [
  { month: "Jul", startups: 1420 }, { month: "Aug", startups: 1480 }, { month: "Sep", startups: 1540 },
  { month: "Oct", startups: 1580 }, { month: "Nov", startups: 1640 }, { month: "Dec", startups: 1700 },
  { month: "Jan", startups: 1760 }, { month: "Feb", startups: 1800 }, { month: "Mar", startups: 1842 },
];

const stageData = [
  { name: "Applied", value: 320, color: "hsl(220, 13%, 71%)" },
  { name: "Selected", value: 280, color: "hsl(38, 92%, 50%)" },
  { name: "Prototype", value: 420, color: "hsl(262, 60%, 55%)" },
  { name: "Pilot", value: 240, color: "hsl(217, 91%, 60%)" },
  { name: "Deployed", value: 486, color: "hsl(152, 69%, 41%)" },
];

const tooltipStyle = { contentStyle: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" } };

const StartupIntelligence = () => {
  const [selected, setSelected] = useState<typeof startups[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Startup Intelligence</h1>
          <p className="text-xs text-muted-foreground mt-1">Track startups across the innovation ecosystem</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Total Startups" value="1,842" trend={{ value: "12%", positive: true }} />
          <StatCard label="Active" value="1,124" subtitle="61% active rate" />
          <StatCard label="Graduated" value="486" trend={{ value: "18%", positive: true }} />
          <StatCard label="Jobs Created" value="8,420" trend={{ value: "14%", positive: true }} />
          <StatCard label="Revenue Reported" value="₹142Cr" trend={{ value: "22%", positive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Startup Growth Over Time</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="startups" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} name="Total Startups" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Stage Distribution</h2>
            <div className="h-48 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stageData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                    {stageData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-1 justify-center">
              {stageData.map(s => (
                <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name} ({s.value})
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <FilterBar searchPlaceholder="Search startups..." filters={[{ label: "All Sectors", options: ["CleanTech", "Manufacturing", "AgriTech", "IT", "Healthcare", "Logistics"] }, { label: "All Stages", options: ["Applied", "Selected", "Prototype", "Pilot", "Deployed"] }]} />
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Startup", "Incubator", "Sector", "Stage", "Jobs", "Revenue", "Funding", "Status"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {startups.map(s => (
                  <tr key={s.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(s)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{s.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{s.incubator}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{s.sector}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={s.stage} /></td>
                    <td className="py-2.5 px-3 font-mono">{s.jobs}</td>
                    <td className="py-2.5 px-3 font-mono">{s.revenue}</td>
                    <td className="py-2.5 px-3 font-mono">{s.funding}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle={selected?.sector}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Incubator", v: selected.incubator }, { l: "Sector", v: selected.sector },
                { l: "Stage", v: selected.stage }, { l: "Jobs", v: selected.jobs },
                { l: "Revenue", v: selected.revenue }, { l: "Funding", v: selected.funding },
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

export default StartupIntelligence;
