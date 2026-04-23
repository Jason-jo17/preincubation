import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const sectors = [
  { name: "AgriTech", problems: 840, startups: 280, successRate: 42, funds: "₹48Cr", opportunity: 88, status: "High Innovation" },
  { name: "Manufacturing", problems: 1420, startups: 520, successRate: 56, funds: "₹92Cr", opportunity: 72, status: "High Innovation" },
  { name: "Healthcare", problems: 480, startups: 180, successRate: 38, funds: "₹32Cr", opportunity: 82, status: "Emerging" },
  { name: "EdTech", problems: 320, startups: 140, successRate: 35, funds: "₹24Cr", opportunity: 68, status: "Emerging" },
  { name: "CleanTech", problems: 260, startups: 120, successRate: 44, funds: "₹28Cr", opportunity: 76, status: "Emerging" },
  { name: "Logistics", problems: 380, startups: 160, successRate: 32, funds: "₹22Cr", opportunity: 64, status: "Emerging" },
  { name: "Rural Supply Chain", problems: 240, startups: 80, successRate: 28, funds: "₹16Cr", opportunity: 92, status: "Underserved Opportunity" },
];

const comparisonData = sectors.map(s => ({ name: s.name.substring(0, 6), problems: s.problems, startups: s.startups, success: s.successRate }));
const tooltipStyle = { contentStyle: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" } };

const SectorIntelligence = () => {
  const [selected, setSelected] = useState<typeof sectors[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Sector Intelligence</h1>
          <p className="text-xs text-muted-foreground mt-1">Strategic sector analysis for investment and intervention decisions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatCard label="Active Sectors" value="7" subtitle="Tracked across Maharashtra" />
          <StatCard label="Highest Growth" value="AgriTech" trend={{ value: "18%", positive: true }} subtitle="YoY growth" />
          <StatCard label="Lowest Innovation" value="Rural SC" trend={{ value: "4%", positive: false }} subtitle="Needs intervention" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Sector Comparison</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="problems" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} name="Problems" />
                  <Bar dataKey="startups" fill="hsl(152, 69%, 41%)" radius={[3, 3, 0, 0]} name="Startups" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Demand vs Solution Gap</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectors.map(s => ({ name: s.name.substring(0, 6), demand: s.problems, supply: s.startups }))} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="demand" fill="hsl(0, 84%, 60%)" radius={[3, 3, 0, 0]} name="Demand (Problems)" />
                  <Bar dataKey="supply" fill="hsl(152, 69%, 41%)" radius={[3, 3, 0, 0]} name="Supply (Startups)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Sector Directory</h2>
            <FilterBar searchPlaceholder="Search sectors..." showExport />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Sector", "Problems", "Startups", "Success Rate", "Funds", "Opportunity", "Status"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectors.map(s => (
                  <tr key={s.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(s)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{s.name}</td>
                    <td className="py-2.5 px-3 font-mono">{s.problems}</td>
                    <td className="py-2.5 px-3 font-mono">{s.startups}</td>
                    <td className="py-2.5 px-3 font-mono">{s.successRate}%</td>
                    <td className="py-2.5 px-3 font-mono">{s.funds}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold">{s.opportunity}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Sector Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard type="warning" message="Cotton processing in Vidarbha critically underserved. 4.2L MSMEs but only 12 active startups addressing supply chain problems." action="View Detail →" />
            <InsightCard type="success" message="Manufacturing sector in Pune saturated with 56% success rate. Best practices ready for replication in other regions." />
            <InsightCard type="info" message="Rural Supply Chain shows highest opportunity score (92) but lowest startup density. Prime target for focused incubation." action="Design Program →" />
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle="Sector Detail">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Problems", v: selected.problems }, { l: "Startups", v: selected.startups },
                { l: "Success Rate", v: `${selected.successRate}%` }, { l: "Funds", v: selected.funds },
                { l: "Opportunity Score", v: selected.opportunity }, { l: "Status", v: selected.status },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold font-mono mt-1">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default SectorIntelligence;
