import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { 
  regionData as SHARED_REGIONS, 
  sectorData as SHARED_SECTORS, 
  platformKpis 
} from "@/data/ceo-regional-intelligence";

const trendData = [
  { month: "Jul", posted: 320, solved: 210 }, { month: "Aug", posted: 380, solved: 245 },
  { month: "Sep", posted: 410, solved: 290 }, { month: "Oct", posted: 360, solved: 310 },
  { month: "Nov", posted: 450, solved: 340 }, { month: "Dec", posted: 420, solved: 360 },
  { month: "Jan", posted: 480, solved: 380 }, { month: "Feb", posted: 510, solved: 395 },
  { month: "Mar", posted: 470, solved: 410 },
];

/** Mapped for Recharts compatibility with existing UI */
const sectorData = SHARED_SECTORS.map(s => ({ sector: s.label, count: s.teams + s.startups }));
const regionData = SHARED_REGIONS.map(r => ({ region: r.label, count: r.msmes }));

const msmeList = [
  { name: "Precision Auto Parts Ltd", sector: "Manufacturing", region: "Pune", posted: 12, active: 3, solved: 8, satisfaction: 4.2, status: "Active" },
  { name: "Green Harvest Agro", sector: "Agriculture", region: "Nashik", posted: 8, active: 2, solved: 5, satisfaction: 3.8, status: "Active" },
  { name: "TechFab Solutions", sector: "IT", region: "Mumbai", posted: 15, active: 4, solved: 10, satisfaction: 4.5, status: "Active" },
  { name: "Rural Craft Collective", sector: "Handicraft", region: "Aurangabad", posted: 6, active: 0, solved: 3, satisfaction: 3.2, status: "Inactive" },
  { name: "MahaSteel Industries", sector: "Manufacturing", region: "Nagpur", posted: 9, active: 2, solved: 6, satisfaction: 4.0, status: "Active" },
  { name: "Sahyadri Foods Pvt Ltd", sector: "Food Processing", region: "Kolhapur", posted: 4, active: 0, solved: 2, satisfaction: 3.5, status: "Inactive" },
  { name: "Deccan Polymers", sector: "Manufacturing", region: "Solapur", posted: 11, active: 3, solved: 7, satisfaction: 4.1, status: "Active" },
  { name: "Vidarbha Textiles Co", sector: "Textile", region: "Amravati", posted: 3, active: 0, solved: 1, satisfaction: 2.8, status: "Inactive" },
  { name: "Smart Irrigation Systems", sector: "AgriTech", region: "Jalgaon", posted: 7, active: 2, solved: 4, satisfaction: 3.9, status: "Active" },
  { name: "Marathwada Electronics", sector: "Electronics", region: "Latur", posted: 5, active: 1, solved: 2, satisfaction: 3.4, status: "Pending" },
];

const tooltipStyle = { contentStyle: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" } };

const MsmeEngagement = () => {
  const [selected, setSelected] = useState<typeof msmeList[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">MSME Engagement</h1>
          <p className="text-xs text-muted-foreground mt-1">Industry participation health and problem resolution tracking</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Active MSME Partners" value={platformKpis.msmesBenefited.toLocaleString()} trend={{ value: "6.4%", positive: true }} subtitle="Across 8 regions" />
          <StatCard label="Problems Solved" value={platformKpis.msmesBenefited.toLocaleString()} trend={{ value: "8.2%", positive: true }} subtitle="66.4% resolution" />
          <StatCard label="Active Innovation" value={platformKpis.activeInnovationProjects.toLocaleString()} trend={{ value: "3.1%", positive: true }} />
          <StatCard label="Avg Response Time" value="4.2d" trend={{ value: "0.8d", positive: true }} subtitle="Improved from 5.0d" />
          <StatCard label="Satisfaction Score" value="3.9/5" trend={{ value: "0.2", positive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Problem Trends (Last 9 Months)</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="posted" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} name="Posted" />
                  <Line type="monotone" dataKey="solved" stroke="hsl(152, 69%, 41%)" strokeWidth={2} dot={false} name="Solved" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-3">
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><span className="w-3 h-0.5 bg-primary inline-block rounded" /> Posted</span>
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><span className="w-3 h-0.5 bg-success inline-block rounded" /> Solved</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">Sector Participation</h2>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorData} barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal vertical={false} />
                    <XAxis dataKey="sector" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} name="MSMEs" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">Region Participation</h2>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} barSize={20} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="region" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" fill="hsl(152, 69%, 41%)" radius={[0, 4, 4, 0]} name="MSMEs" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">MSME Directory</h2>
            <FilterBar searchPlaceholder="Search MSMEs..." filters={[{ label: "All Sectors", options: ["Manufacturing", "Agriculture", "IT", "Textile"] }, { label: "All Status", options: ["Active", "Inactive", "Pending"] }]} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["MSME Name", "Sector", "Region", "Posted", "Active", "Solved", "Rating", "Status"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {msmeList.map(m => (
                  <tr key={m.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(m)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{m.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.sector}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.region}</td>
                    <td className="py-2.5 px-3 font-mono">{m.posted}</td>
                    <td className="py-2.5 px-3 font-mono">{m.active}</td>
                    <td className="py-2.5 px-3 font-mono">{m.solved}</td>
                    <td className="py-2.5 px-3 font-mono">{m.satisfaction}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Engagement Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard type="warning" message="1,240 MSMEs inactive for 60+ days. Automated re-engagement campaigns recommended for Vidarbha and Marathwada." action="Launch Campaign →" />
            <InsightCard type="warning" message="847 problems pending >30 days with no applicants. 62% from underserved districts." action="View Problem Queue →" />
            <InsightCard type="success" message="Resolution rate improved to 66.4%, up from 58.1% last quarter. Services sector leading at 74%." />
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle={selected?.sector}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Sector", v: selected.sector }, { l: "Region", v: selected.region },
                { l: "Problems Posted", v: selected.posted }, { l: "Active Solutions", v: selected.active },
                { l: "Solved", v: selected.solved }, { l: "Satisfaction", v: `${selected.satisfaction}/5` },
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

export default MsmeEngagement;
