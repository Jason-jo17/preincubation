import { DashboardLayout } from "@/components/DashboardLayout";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

type ResultType = "Incubator" | "Startup" | "MSME" | "Project" | "Region" | "Report";

interface SearchResult {
  type: ResultType;
  name: string;
  description: string;
  link: string;
}

const allResults: SearchResult[] = [
  { type: "Incubator", name: "COEP Bhau Institute of Innovation", description: "Pune — 142 startups, Score: 96", link: "/incubation" },
  { type: "Incubator", name: "IIT Bombay Society for Innovation", description: "Mumbai — 128 startups, Score: 94", link: "/incubation" },
  { type: "Startup", name: "AquaTech Solutions", description: "CleanTech — Pilot stage, 24 jobs", link: "/startups" },
  { type: "Startup", name: "FarmConnect Platform", description: "AgriTech — Deployed, ₹3.2Cr revenue", link: "/startups" },
  { type: "MSME", name: "Precision Auto Parts Ltd", description: "Manufacturing — Pune, 12 problems posted", link: "/msme" },
  { type: "MSME", name: "TechFab Solutions", description: "IT — Mumbai, 15 problems posted", link: "/msme" },
  { type: "Project", name: "Smart Water Monitoring System", description: "Pilot stage — 78% progress", link: "/pipeline" },
  { type: "Project", name: "AI-Powered Quality Inspector", description: "Prototype — At Risk", link: "/pipeline" },
  { type: "Region", name: "Pune Division", description: "8.2L MSMEs, High Innovation, Score: 92", link: "/regional" },
  { type: "Region", name: "Vidarbha (Amravati + Nagpur)", description: "9L MSMEs combined, Underserved", link: "/regional" },
  { type: "Report", name: "Monthly CEO Report", description: "Last generated: Mar 2026", link: "/reports" },
  { type: "Report", name: "Fund Utilization Report", description: "Q1 2026 — Quarterly", link: "/reports" },
];

const typeColors: Record<ResultType, string> = {
  Incubator: "bg-primary/10 text-primary",
  Startup: "bg-success/10 text-success",
  MSME: "bg-warning/10 text-warning",
  Project: "bg-chart-5/10 text-chart-5",
  Region: "bg-chart-4/10 text-chart-4",
  Report: "bg-muted text-muted-foreground",
};

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.length > 0
    ? allResults.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()))
    : allResults;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[900px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Global Search</h1>
          <p className="text-xs text-muted-foreground mt-1">Search across incubators, startups, MSMEs, projects, regions, and reports</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything... (e.g., COEP, AgriTech, Pune, Fund Report)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Incubator", "Startup", "MSME", "Project", "Region", "Report"].map(t => (
            <button key={t} className="text-xs px-3 py-1.5 rounded-lg border bg-secondary text-muted-foreground border-border hover:border-primary/30 transition-colors">{t}</button>
          ))}
        </div>

        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex items-center gap-4"
              onClick={() => navigate(r.link)}
            >
              <span className={`text-[10px] font-medium px-2 py-1 rounded-md ${typeColors[r.type]}`}>{r.type}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
              <span className="text-xs text-primary">View →</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GlobalSearch;
