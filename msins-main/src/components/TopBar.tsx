import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import type { AppShellRole } from "@/lib/app-shell";
import { workspaceDefinition } from "@/lib/workspace-identity";

const pageTitles: Record<string, string> = {
  "/ceo/dashboard": "CEO Dashboard",
  "/ceo/regional-hub": "Discovery Intelligence Hub",
  "/ceo/region": "Discovery Intelligence",
  "/ceo/sector": "Sector Intelligence",
  "/ceo/startup": "Startup Intelligence",
  "/ceo/incubator": "Incubator Intelligence",
  "/ceo/cohort": "Cohort Intelligence",
  "/regional": "Discovery Intelligence",
  "/cohorts": "Cohorts",
  "/pipeline": "Innovation Pipeline",
  "/msme": "MSME Engagement",
  "/sectors": "Sector Intelligence",
  "/incubation": "Incubation Performance",
  "/funds": "Fund Governance",
  "/startups": "Startup Intelligence",
  "/performers": "Top Performers",
  "/alerts": "Alerts Center",
  "/reports": "Reports Center",
  "/search": "Global Search",
  "/admin": "Admin Controls",
  "/msme/dashboard": "MSME Dashboard",
  "/msme/challenges": "My Challenges",
  "/msme/applicants": "Applicants & Teams",
  "/msme/matchmaking": "Matchmaking Hub",
  "/msme/business-hub": "Business Hub",
  "/innovator/dashboard": "Innovator Dashboard",
  "/innovator/problems": "Browse Problems",
  "/innovator/sprint": "Active Sprint",
  "/innovator/marketplace": "Problem Marketplace",
  "/mentor/dashboard": "Mentor Dashboard",
  "/mentor/teams": "Mentor Teams",
  "/mentor/sessions": "Mentor Sessions",
  "/cohort/dashboard": "Cohort Manager",
};

interface TopBarProps {
  shellRole?: AppShellRole;
}

export function TopBar({ shellRole = "ceo" }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const workspace = workspaceDefinition(shellRole);
  const showDivisionFilters = shellRole === "ceo";
  const title = (() => {
    if (location.pathname.startsWith("/innovator/problems/") && location.pathname !== "/innovator/problems") {
      return "Problem Detail";
    }
    if (location.pathname.startsWith("/ceo/regional-intelligence/")) {
      const segment = location.pathname.replace("/ceo/regional-intelligence/", "").split("/")[0] ?? "";
      const regionalTitles: Record<string, string> = {
        "talent-pool": "Talent Pool",
        "teams-formed": "Teams Formed",
        projects: "Projects in Cohorts",
        prototypes: "Prototypes Built",
        pilots: "MSME Pilots Live",
        startups: "Startups Created",
        jobs: "Jobs Generated",
        msmes: "MSMEs Improved",
        roi: "Economic ROI",
      };
      return regionalTitles[segment] ?? "Discovery Intelligence";
    }
    const exact = pageTitles[location.pathname];
    if (exact) return exact;
    const sorted = Object.entries(pageTitles).sort((a, b) => b[0].length - a[0].length);
    const prefix = sorted.find(([path]) => location.pathname.startsWith(`${path}/`));
    return prefix?.[1] ?? "Command Center";
  })();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground shrink-0" />
        <div className="h-5 w-px bg-border shrink-0" />
        <div className="flex min-w-0 items-baseline gap-2 flex-wrap">
          <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
          <span className="hidden sm:inline text-[10px] text-muted-foreground shrink-0">Updated 2 hrs ago</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {showDivisionFilters && (
          <>
            <select className="bg-secondary text-xs text-foreground rounded-md px-3 py-1.5 border border-border focus:outline-none focus:ring-1 focus:ring-primary max-sm:hidden">
              <option>All Divisions</option>
              <option>Pune</option>
              <option>Konkan</option>
              <option>Nashik</option>
              <option>Aurangabad</option>
              <option>Amravati</option>
              <option>Nagpur</option>
            </select>
            <select className="bg-secondary text-xs text-foreground rounded-md px-3 py-1.5 border border-border focus:outline-none focus:ring-1 focus:ring-primary max-md:hidden">
              <option>All Districts</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Thane</option>
              <option>Nagpur</option>
              <option>Nashik</option>
              <option>Aurangabad</option>
            </select>
          </>
        )}
        <button
          onClick={() => navigate("/search")}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={() => navigate("/alerts")}
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex flex-col items-end gap-0.5 ml-1">
          <span className="hidden sm:block text-[10px] font-medium text-muted-foreground leading-none max-w-[8rem] truncate text-right">
            {workspace.roleTitle}
          </span>
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold leading-none tracking-tight"
            title={`${workspace.profileName} · ${workspace.profileSubtitle}`}
          >
            {workspace.avatarLabel}
          </div>
        </div>
      </div>
    </header>
  );
}
