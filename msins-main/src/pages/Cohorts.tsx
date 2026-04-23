import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

const cohorts = [
  { name: "Pune Smart Manufacturing Cohort", region: "Pune", students: 340, teams: 68, projects: 52, completion: 78, score: 92, status: "On Track" },
  { name: "Mumbai FinTech Accelerator", region: "Konkan", students: 280, teams: 56, projects: 45, completion: 84, score: 91, status: "On Track" },
  { name: "Nashik AgriTech Program", region: "Nashik", students: 220, teams: 44, projects: 36, completion: 72, score: 87, status: "On Track" },
  { name: "Thane CleanTech Hub", region: "Konkan", students: 180, teams: 36, projects: 28, completion: 65, score: 82, status: "On Track" },
  { name: "Nagpur Innovation Lab", region: "Nagpur", students: 160, teams: 32, projects: 24, completion: 58, score: 74, status: "Emerging" },
  { name: "Aurangabad MSME Incubator", region: "Aurangabad", students: 140, teams: 28, projects: 18, completion: 45, score: 62, status: "At Risk" },
  { name: "Kolhapur Textiles Innovation", region: "Pune", students: 120, teams: 24, projects: 16, completion: 52, score: 68, status: "Emerging" },
  { name: "Amravati Agri Center", region: "Amravati", students: 90, teams: 18, projects: 10, completion: 38, score: 48, status: "At Risk" },
  { name: "Jalgaon Food Processing", region: "Nashik", students: 100, teams: 20, projects: 14, completion: 42, score: 56, status: "Emerging" },
  { name: "Gadchiroli Rural Innovation", region: "Nagpur", students: 60, teams: 12, projects: 6, completion: 28, score: 32, status: "Delayed" },
];

const comparisonData = cohorts.slice(0, 6).map(c => ({ name: c.name.split(" ")[0], score: c.score, completion: c.completion }));
const trendData = [
  { month: "Jul", active: 1200, completed: 180 },
  { month: "Aug", active: 1340, completed: 210 },
  { month: "Sep", active: 1480, completed: 250 },
  { month: "Oct", active: 1520, completed: 290 },
  { month: "Nov", active: 1600, completed: 340 },
  { month: "Dec", active: 1680, completed: 380 },
  { month: "Jan", active: 1740, completed: 420 },
  { month: "Feb", active: 1790, completed: 460 },
];

const tooltipStyle = { contentStyle: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" } };

const Cohorts = () => {
  const [selected, setSelected] = useState<typeof cohorts[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Cohorts</h1>
          <p className="text-xs text-muted-foreground mt-1">Monitor incubation programs, student activity, and cohort health</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Total Cohorts" value="148" trend={{ value: "12", positive: true }} />
          <StatCard label="Active Students" value="4,280" trend={{ value: "8%", positive: true }} />
          <StatCard label="Completion Rate" value="62%" trend={{ value: "4%", positive: true }} />
          <StatCard label="Avg Progress" value="58%" subtitle="Across all cohorts" />
          <StatCard label="Mentor Coverage" value="84%" trend={{ value: "6%", positive: true }} />
        </div>

        <FilterBar
          searchPlaceholder="Search cohorts..."
          filters={[
            { label: "All Regions", options: ["Pune", "Konkan", "Nashik", "Aurangabad", "Amravati", "Nagpur"] },
            { label: "All Status", options: ["On Track", "Emerging", "At Risk", "Delayed"] },
          ]}
        />

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Cohort Directory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Cohort Name", "Region", "Students", "Teams", "Projects", "Completion", "Score", "Status"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map(c => (
                  <tr key={c.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(c)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{c.region}</td>
                    <td className="py-2.5 px-3 font-mono">{c.students}</td>
                    <td className="py-2.5 px-3 font-mono">{c.teams}</td>
                    <td className="py-2.5 px-3 font-mono">{c.projects}</td>
                    <td className="py-2.5 px-3"><div className="flex items-center gap-2"><Progress value={c.completion} className="h-1.5 w-16" /><span className="font-mono text-xs">{c.completion}%</span></div></td>
                    <td className="py-2.5 px-3 font-mono font-semibold">{c.score}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Cohort Comparison</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="score" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} name="Score" />
                  <Bar dataKey="completion" fill="hsl(152, 69%, 41%)" radius={[4, 4, 0, 0]} name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Progress Trends</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="active" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} name="Active Students" />
                  <Line type="monotone" dataKey="completed" stroke="hsl(152, 69%, 41%)" strokeWidth={2} dot={false} name="Completed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle="Cohort Detail">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Region", v: selected.region }, { l: "Students", v: selected.students },
                { l: "Teams", v: selected.teams }, { l: "Projects", v: selected.projects },
                { l: "Completion", v: `${selected.completion}%` }, { l: "Score", v: selected.score },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold font-mono mt-1">{i.v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium mb-2">Status</p>
              <StatusBadge status={selected.status} />
            </div>
            <div>
              <p className="text-xs font-medium mb-2">Team Activity</p>
              <div className="space-y-1">
                {["Team Alpha — 3 active projects", "Team Beta — 2 prototypes in review", "Team Gamma — 1 pilot deployed"].map(t => (
                  <p key={t} className="text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-lg">{t}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2">Escalations</p>
              <p className="text-xs text-destructive bg-destructive/5 px-3 py-2 rounded-lg border border-destructive/20">Mentor assignment pending for 4 teams</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default Cohorts;
