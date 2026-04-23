import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DivisionStatus = "High Innovation" | "Emerging" | "Underserved Opportunity";

interface Division {
  name: string;
  msmeCount: string;
  districts: string[];
  status: DivisionStatus;
  employment: string;
  incubators: number;
  startups: number;
  problemsSolved: number;
  fundsAllocated: string;
  opportunityScore: number;
  dominantSectors: string[];
}

const divisions: Division[] = [
  { name: "Pune", msmeCount: "8.2L", districts: ["Pune", "Satara", "Solapur", "Kolhapur", "Sangli"], status: "High Innovation", employment: "14.2L", incubators: 14, startups: 542, problemsSolved: 840, fundsAllocated: "₹82Cr", opportunityScore: 92, dominantSectors: ["Manufacturing", "IT"] },
  { name: "Konkan", msmeCount: "7.8L", districts: ["Mumbai", "Thane", "Raigad", "Ratnagiri", "Sindhudurg"], status: "High Innovation", employment: "12.8L", incubators: 12, startups: 480, problemsSolved: 720, fundsAllocated: "₹76Cr", opportunityScore: 88, dominantSectors: ["Services", "FinTech"] },
  { name: "Nashik", msmeCount: "6.1L", districts: ["Nashik", "Dhule", "Jalgaon", "Nandurbar", "Ahmednagar"], status: "Emerging", employment: "10.4L", incubators: 8, startups: 280, problemsSolved: 420, fundsAllocated: "₹48Cr", opportunityScore: 72, dominantSectors: ["AgriTech", "Manufacturing"] },
  { name: "Aurangabad", msmeCount: "5.4L", districts: ["Aurangabad", "Jalna", "Beed", "Osmanabad", "Latur", "Nanded", "Parbhani", "Hingoli"], status: "Underserved Opportunity", employment: "8.6L", incubators: 6, startups: 180, problemsSolved: 240, fundsAllocated: "₹34Cr", opportunityScore: 54, dominantSectors: ["Agriculture", "Textile"] },
  { name: "Amravati", msmeCount: "4.2L", districts: ["Amravati", "Akola", "Washim", "Buldhana", "Yavatmal"], status: "Underserved Opportunity", employment: "6.8L", incubators: 4, startups: 120, problemsSolved: 160, fundsAllocated: "₹22Cr", opportunityScore: 42, dominantSectors: ["Cotton", "Agriculture"] },
  { name: "Nagpur", msmeCount: "4.8L", districts: ["Nagpur", "Wardha", "Chandrapur", "Bhandara", "Gondia", "Gadchiroli"], status: "Emerging", employment: "6.4L", incubators: 5, startups: 220, problemsSolved: 280, fundsAllocated: "₹38Cr", opportunityScore: 64, dominantSectors: ["Mining", "Manufacturing"] },
];

const regions = [
  { id: "konkan", label: "Konkan", x: 80, y: 180, w: 60, h: 120, color: "hsl(152, 69%, 41%)", opacity: 0.8 },
  { id: "pune", label: "Pune", x: 140, y: 200, w: 90, h: 100, color: "hsl(152, 69%, 41%)", opacity: 0.9 },
  { id: "nashik", label: "Nashik", x: 130, y: 100, w: 100, h: 90, color: "hsl(38, 92%, 50%)", opacity: 0.6 },
  { id: "aurangabad", label: "Aurangabad", x: 230, y: 130, w: 110, h: 110, color: "hsl(0, 84%, 60%)", opacity: 0.5 },
  { id: "amravati", label: "Amravati", x: 300, y: 60, w: 100, h: 90, color: "hsl(0, 84%, 60%)", opacity: 0.6 },
  { id: "nagpur", label: "Nagpur", x: 380, y: 80, w: 110, h: 120, color: "hsl(38, 92%, 50%)", opacity: 0.55 },
];

const districtData = [
  { name: "Mumbai", division: "Konkan", msmes: "2.4L", incubators: 6, startups: 280, solved: 420, score: 94 },
  { name: "Pune", division: "Pune", msmes: "3.1L", incubators: 8, startups: 320, solved: 510, score: 96 },
  { name: "Thane", division: "Konkan", msmes: "1.8L", incubators: 3, startups: 120, solved: 180, score: 82 },
  { name: "Nagpur", division: "Nagpur", msmes: "1.6L", incubators: 3, startups: 140, solved: 160, score: 68 },
  { name: "Nashik", division: "Nashik", msmes: "1.4L", incubators: 4, startups: 110, solved: 140, score: 72 },
  { name: "Aurangabad", division: "Aurangabad", msmes: "1.2L", incubators: 3, startups: 80, solved: 90, score: 52 },
  { name: "Kolhapur", division: "Pune", msmes: "0.9L", incubators: 2, startups: 60, solved: 80, score: 74 },
  { name: "Solapur", division: "Pune", msmes: "0.8L", incubators: 1, startups: 40, solved: 50, score: 58 },
];

const RegionalIntelligence = () => {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Discovery Intelligence</h1>
          <p className="text-xs text-muted-foreground mt-1">Where to invest, intervene, and expand across Maharashtra</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Regions" value="6" subtitle="Divisions" />
          <StatCard label="Total Districts" value="36" subtitle="Across Maharashtra" />
          <StatCard label="Opportunity Zones" value="14" trend={{ value: "3", positive: true }} subtitle="High potential districts" />
          <StatCard label="High Performing" value="12" subtitle="Green-status districts" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Maharashtra MSME Density Heatmap</h2>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-success inline-block" /> Strong</span>
                <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-warning inline-block" /> Emerging</span>
                <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-destructive inline-block" /> Underserved</span>
              </div>
            </div>
            <svg viewBox="0 0 520 360" className="w-full h-auto" style={{ maxHeight: 340 }}>
              {regions.map((r) => (
                <g key={r.id} className="cursor-pointer" onClick={() => setSelectedDivision(divisions.find(d => d.name.toLowerCase() === r.id || r.label === d.name) || null)}>
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="8" ry="8" fill={r.color} opacity={r.opacity} stroke="hsl(220, 13%, 91%)" strokeWidth="1.5" className="hover:opacity-100 transition-opacity" />
                  <text x={r.x + r.w / 2} y={r.y + r.h / 2} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="600" fontFamily="Inter" className="pointer-events-none">{r.label}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <h2 className="text-sm font-semibold text-foreground sticky top-0 bg-background pb-2 z-10">Division Rankings</h2>
            {divisions.map((div) => (
              <div key={div.name} className="bg-card rounded-xl border border-border p-4 space-y-2.5 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all" onClick={() => setSelectedDivision(div)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{div.name}</h3>
                  <StatusBadge status={div.status} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-muted-foreground">MSMEs: <span className="font-mono text-foreground">{div.msmeCount}</span></span>
                  <span className="text-muted-foreground">Startups: <span className="font-mono text-foreground">{div.startups}</span></span>
                  <span className="text-muted-foreground">Score: <span className="font-mono text-foreground">{div.opportunityScore}</span></span>
                </div>
                <p className="text-[11px] text-muted-foreground">{div.districts.slice(0, 4).join(", ")}{div.districts.length > 4 ? ` +${div.districts.length - 4}` : ""}</p>
              </div>
            ))}
          </div>
        </div>

        {/* District Breakdown */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">District Breakdown</h2>
            <FilterBar searchPlaceholder="Search districts..." filters={[{ label: "All Divisions", options: divisions.map(d => d.name) }]} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["District", "Division", "MSMEs", "Incubators", "Startups", "Solved", "Score"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {districtData.map((d) => (
                  <tr key={d.name} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors">
                    <td className="py-2.5 px-3 font-medium text-foreground">{d.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{d.division}</td>
                    <td className="py-2.5 px-3 font-mono">{d.msmes}</td>
                    <td className="py-2.5 px-3 font-mono">{d.incubators}</td>
                    <td className="py-2.5 px-3 font-mono">{d.startups}</td>
                    <td className="py-2.5 px-3 font-mono">{d.solved}</td>
                    <td className="py-2.5 px-3"><span className={cn("font-mono font-semibold", d.score >= 80 ? "text-success" : d.score >= 60 ? "text-warning" : "text-destructive")}>{d.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Opportunity Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard type="warning" message="Marathwada has highest intervention potential — 5.4L MSMEs but only 8% innovation participation. Targeted programs could unlock massive growth." action="Design Intervention →" />
            <InsightCard type="warning" message="Vidarbha (Amravati + Nagpur) has a combined 9L MSMEs but innovation activity 3x below average. Strong agri opportunity for cotton value chain." action="View Division Detail →" />
            <InsightCard type="success" message="Pune is a saturated ecosystem with 94% of programs at capacity. Focus on scaling successful models to underserved regions." action="Export Best Practices →" />
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selectedDivision} onClose={() => setSelectedDivision(null)} title={selectedDivision?.name || ""} subtitle="Division Performance Detail">
        {selectedDivision && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "MSMEs", value: selectedDivision.msmeCount },
                { label: "Employment", value: selectedDivision.employment },
                { label: "Incubators", value: selectedDivision.incubators },
                { label: "Startups", value: selectedDivision.startups },
                { label: "Problems Solved", value: selectedDivision.problemsSolved },
                { label: "Funds Allocated", value: selectedDivision.fundsAllocated },
                { label: "Opportunity Score", value: selectedDivision.opportunityScore },
                { label: "Status", value: selectedDivision.status },
              ].map(item => (
                <div key={item.label} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold font-mono mt-1">{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground mb-2">Districts</p>
              <div className="flex flex-wrap gap-1.5">{selectedDivision.districts.map(d => <span key={d} className="text-[11px] bg-secondary px-2 py-1 rounded-md">{d}</span>)}</div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground mb-2">Dominant Sectors</p>
              <div className="flex flex-wrap gap-1.5">{selectedDivision.dominantSectors.map(s => <StatusBadge key={s} status={s} />)}</div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default RegionalIntelligence;
