import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Download, Calendar, Filter } from "lucide-react";

const reports = [
  { name: "Monthly CEO Report", description: "Comprehensive overview of all KPIs, regional performance, and strategic recommendations.", frequency: "Monthly", lastGenerated: "Mar 2026", formats: ["PDF", "CSV"] },
  { name: "Regional Performance Report", description: "Division-wise analysis with MSME density, innovation activity, and opportunity scores.", frequency: "Monthly", lastGenerated: "Mar 2026", formats: ["PDF", "CSV"] },
  { name: "Fund Utilization Report", description: "Detailed financial tracking — allocation, utilization, outcomes, and risk flags per center.", frequency: "Quarterly", lastGenerated: "Q1 2026", formats: ["PDF", "CSV"] },
  { name: "Sector Intelligence Report", description: "Cross-sector analysis with demand-supply gaps, growth trends, and investment priorities.", frequency: "Quarterly", lastGenerated: "Q1 2026", formats: ["PDF"] },
  { name: "Incubator Benchmark Report", description: "Center-by-center comparison with scoring, ranking, and improvement recommendations.", frequency: "Quarterly", lastGenerated: "Q1 2026", formats: ["PDF", "CSV"] },
  { name: "Startup Impact Report", description: "Total ecosystem impact — jobs created, revenue generated, graduation rates, and success stories.", frequency: "Bi-Annual", lastGenerated: "H2 2025", formats: ["PDF"] },
];

const ReportsCenter = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reports Center</h1>
          <p className="text-xs text-muted-foreground mt-1">Generate, download, and schedule executive reports</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="bg-secondary text-xs text-foreground rounded-lg px-3 py-2 border border-border">
            <option>All Regions</option>
            <option>Pune</option><option>Konkan</option><option>Nashik</option>
          </select>
          <select className="bg-secondary text-xs text-foreground rounded-lg px-3 py-2 border border-border">
            <option>All Sectors</option>
            <option>Manufacturing</option><option>AgriTech</option><option>IT</option>
          </select>
          <input type="date" className="bg-secondary text-xs text-foreground rounded-lg px-3 py-2 border border-border" />
          <input type="date" className="bg-secondary text-xs text-foreground rounded-lg px-3 py-2 border border-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(report => (
            <div key={report.name} className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{report.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {report.frequency}</span>
                  <span>Last: {report.lastGenerated}</span>
                </div>
                <div className="flex gap-1.5">
                  {report.formats.map(f => (
                    <button key={f} className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1">
                      <Download className="h-2.5 w-2.5" /> {f}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full mt-3 text-xs text-muted-foreground bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-lg transition-colors border border-border flex items-center justify-center gap-1.5">
                <Calendar className="h-3 w-3" /> Schedule Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsCenter;
