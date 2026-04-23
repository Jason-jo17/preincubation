import { useState } from "react";
import {
  LayoutDashboard, Map, Users, Wallet, FileText, Bell, Settings,
  Search, ChevronLeft, ChevronDown, ListChecks, UserSquare2, Sparkles, Briefcase, Store, Calendar, Rocket,
  type LucideIcon, ArrowRightLeft, Filter, Building2, ShieldCheck, Mic, TrendingUp, Network, Zap, UserCircle, Layers, MapPin
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppShellRole } from "@/lib/app-shell";
import { WORKSPACES, isWorkspaceActive, workspaceDefinition } from "@/lib/workspace-identity";

const originalNav = [
  { title: "CEO Dashboard", url: "/ceo/dashboard", icon: LayoutDashboard },
  { title: "Regional Hub", url: "/ceo/regional-hub", icon: Map },
  { title: "Fund Governance", url: "/funds", icon: Wallet },
];

const intelligenceNav = [
  { title: "Growth Funnel", url: "/ceo/funnel", icon: Filter },
  { title: "MSME Registry", url: "/ceo/companies", icon: Building2 },
  { title: "Compliance Radar", url: "/ceo/compliance", icon: ShieldCheck },
  { title: "Discovery Intelligence", url: "/ceo/regional-hub", icon: MapPin },
  { title: "Sector Analysis", url: "/ceo/thesis", icon: TrendingUp },
];

const ecosystemNav = [
  { title: "Expert Hub", url: "/ceo/expert-hub", icon: ShieldCheck },
  { title: "CEED Engine", url: "/ceo/prd-builder", icon: FileText },
  { title: "Automation Repo", url: "/ceo/automation", icon: Zap },
  { title: "Ecosystem Intelligence", url: "/ceo/ecosystem", icon: Network },
  { title: "Incubation Programs", url: "/ceo/programs", icon: Layers },
  { title: "Student Portal", url: "/ceo/student-portal", icon: UserCircle },
];

const intelligenceReportsNav = [
  { title: "Navitas Due Diligence", url: "/ceo/intelligence/navitas-mismatch", icon: ShieldCheck },
];


const systemNav = [
  { title: "Alerts Center", url: "/alerts", icon: Bell },
  { title: "Reports Center", url: "/reports", icon: FileText },
  { title: "Global Search", url: "/search", icon: Search },
  { title: "Admin Controls", url: "/admin", icon: Settings },
];

const shellNavByRole: Record<Exclude<AppShellRole, "ceo">, { items: { title: string; url: string; icon: LucideIcon }[] }> = {
  msme: {
    items: [
      { title: "Dashboard", url: "/msme/dashboard", icon: LayoutDashboard },
      { title: "Innovation Hub", url: "/msme/challenges", icon: Rocket },
      { title: "Applicants & Teams", url: "/msme/applicants", icon: UserSquare2 },
      { title: "Talent Hub", url: "/msme/talent-hub", icon: Users },
      { title: "Matchmaking Hub", url: "/msme/matchmaking", icon: Sparkles },
      { title: "Business Hub", url: "/msme/business-hub", icon: Briefcase },
    ],
  },
  innovator: {
    items: [
      { title: "Innovator Dashboard", url: "/innovator/dashboard", icon: LayoutDashboard },
      { title: "Innovation Hub", url: "/innovator/marketplace", icon: Store },
      { title: "Active Sprint", url: "/innovator/sprint", icon: Rocket },
    ],
  },
  mentor: {
    items: [
      { title: "Mentor Dashboard", url: "/mentor/dashboard", icon: LayoutDashboard },
      { title: "Teams", url: "/mentor/teams", icon: Users },
      { title: "Sessions", url: "/mentor/sessions", icon: Calendar },
    ],
  },
  cohort: {
    items: [
      { title: "Program desk", url: "/cohort/dashboard", icon: LayoutDashboard },
      { title: "Program builder", url: "/cohort/program", icon: Layers },
      { title: "CEO Cohort Directory", url: "/cohorts", icon: Users },
    ],
  },
};

interface AppSidebarProps {
  shellRole?: AppShellRole;
}

export function AppSidebar({ shellRole = "ceo" }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [switchOpen, setSwitchOpen] = useState(false);

  const ws = workspaceDefinition(shellRole);
  const headerMark = ws.headerMark;
  const markClass =
    headerMark.length <= 2
      ? "text-sm font-bold"
      : headerMark.length <= 3
        ? "text-[11px] font-bold leading-none"
        : "text-[9px] font-bold leading-tight text-center px-0.5";

  const renderCeoItems = (items: typeof originalNav) =>
    items.map((item) => {
      const isActive = pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <NavLink
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  const renderShellItems = (items: { title: string; url: string; icon: LucideIcon }[]) =>
    items.map((item) => {
      const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <NavLink
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <span className={markClass}>{headerMark}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white tracking-wider truncate">MAHARASHTRA</p>
              <p className="text-[10px] text-sidebar-foreground truncate">{ws.roleTitle}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {shellRole === "ceo" ? (
          <>
            <SidebarGroup>
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest px-3 mb-1 flex items-center gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Core Command
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">{renderCeoItems(originalNav)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Collapsible className="group/collapsible" defaultOpen>
              <SidebarGroup>
                {!collapsed && (
                  <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                    <CollapsibleTrigger className="flex items-center w-full justify-between">
                      <div className="flex items-center gap-2">
                         <Filter className="w-3.5 h-3.5 text-primary" /> Intelligence Modules
                      </div>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5">{renderCeoItems(intelligenceNav)}</SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <Collapsible className="group/collapsible" defaultOpen>
              <SidebarGroup>
                {!collapsed && (
                  <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                    <CollapsibleTrigger className="flex items-center w-full justify-between">
                      <div className="flex items-center gap-2">
                         <Zap className="w-3.5 h-3.5 text-primary" /> Innovation Ecosystem
                      </div>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5">{renderCeoItems(ecosystemNav)}</SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <Collapsible className="group/collapsible" defaultOpen>
              <SidebarGroup>
                {!collapsed && (
                  <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                    <CollapsibleTrigger className="flex items-center w-full justify-between">
                      <div className="flex items-center gap-2">
                         <FileText className="w-3.5 h-3.5 text-primary" /> Intelligence Reports
                      </div>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5">{renderCeoItems(intelligenceReportsNav)}</SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <Collapsible className="group/collapsible">
              <SidebarGroup>
                {!collapsed && (
                  <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                    <CollapsibleTrigger className="flex items-center w-full justify-between">
                      <div className="flex items-center gap-2">
                         <Settings className="w-3.5 h-3.5 text-muted-foreground" /> Systems
                      </div>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5">{renderCeoItems(systemNav)}</SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          </>
        ) : (
          <>
            <SidebarGroup>
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest px-3 mb-1">
                  Navigation
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">{renderShellItems(shellNavByRole[shellRole as Exclude<AppShellRole, "ceo">].items)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {shellRole === "msme" && (
              <>
                <Collapsible className="group/collapsible" defaultOpen>
                  <SidebarGroup>
                    {!collapsed && (
                      <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                        <CollapsibleTrigger className="flex items-center w-full justify-between">
                          <div className="flex items-center gap-2">
                             <Filter className="w-3.5 h-3.5 text-primary" /> Intelligence Modules
                          </div>
                          <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                    )}
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-0.5">
                          { renderShellItems([
                            { title: "Discovery Intelligence", url: "/msme/discovery", icon: MapPin },
                            { title: "Sector Thesis", url: "/msme/thesis", icon: TrendingUp },
                          ])}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
                <Collapsible className="group/collapsible" defaultOpen>
                  <SidebarGroup>
                    {!collapsed && (
                      <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                        <CollapsibleTrigger className="flex items-center w-full justify-between">
                          <div className="flex items-center gap-2">
                             <Network className="w-3.5 h-3.5 text-primary" /> Discovery Ecosystem
                          </div>
                          <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                    )}
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-0.5">
                          { renderShellItems([
                            { title: "MSME Registry", url: "/msme/companies", icon: Building2 },
                            { title: "Ecosystem Navigator", url: "/msme/ecosystem", icon: Network },
                          ])}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
                <Collapsible className="group/collapsible" defaultOpen>
                  <SidebarGroup>
                    {!collapsed && (
                      <SidebarGroupLabel asChild className="text-[10px] text-sidebar-foreground/80 uppercase tracking-widest px-3 mb-1 flex items-center gap-2 hover:bg-sidebar-accent cursor-pointer rounded-md">
                        <CollapsibleTrigger className="flex items-center w-full justify-between">
                          <div className="flex items-center gap-2">
                             <FileText className="w-3.5 h-3.5 text-primary" /> Intelligence Reports
                          </div>
                          <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                    )}
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-0.5">
                          {renderShellItems([
                            { title: "Navitas Due Diligence", url: "/msme/intelligence/navitas-mismatch", icon: ShieldCheck },
                          ])}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </>
            )}
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="shrink-0 border-t border-sidebar-border p-2">
        <div
          className={cn(
            "rounded-xl border border-sidebar-border/90 bg-sidebar-accent/30 shadow-[0_1px_0_0_hsl(var(--sidebar-border)/0.5)] backdrop-blur-sm",
            collapsed ? "p-2" : "p-3",
          )}
        >
          <div
            className={cn(
              "flex gap-2",
              collapsed ? "flex-col items-center" : "items-start",
            )}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold tracking-tight text-sidebar-primary-foreground ring-2 ring-sidebar-primary/35"
              title={`${ws.profileName} · ${ws.profileSubtitle}`}
            >
              {ws.profileName.charAt(0)}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="truncate text-sm font-semibold tracking-tight text-white">{ws.profileName}</p>
                <p className="text-[10px] leading-snug text-sidebar-foreground/70">{ws.profileSubtitle}</p>
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSwitchOpen(true)}
            title="Switch Workspace"
            className={cn(
              "mt-2 h-9 w-full justify-center gap-2 rounded-lg border border-sidebar-border/60 bg-sidebar-accent/20 text-sidebar-foreground hover:bg-sidebar-accent hover:text-white",
              collapsed && "h-10 w-full px-0",
            )}
          >
            <ArrowRightLeft className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-xs font-semibold">Switch Workspace</span>}
          </Button>

          <Dialog open={switchOpen} onOpenChange={setSwitchOpen}>
            <DialogContent className="gap-0 border-border bg-card p-0 sm:max-w-md">
              <DialogHeader className="border-b border-border px-6 py-5 text-left">
                <DialogTitle>Switch Workspace</DialogTitle>
                <DialogDescription>
                  Jump to another role. Your dashboards and routes stay the same.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[min(60vh,24rem)] overflow-y-auto px-3 py-3">
                <div className="flex flex-col gap-1.5">
                  {WORKSPACES.map((entry) => {
                    const Icon = entry.icon;
                    const active = isWorkspaceActive(entry.id, pathname);
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => {
                          navigate(entry.dashboardPath);
                          setSwitchOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors",
                          "hover:border-primary/25 hover:bg-primary/5",
                          active && "border-primary/40 bg-primary/10",
                        )}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-foreground">{entry.title}</span>
                          <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{entry.description}</span>
                        </span>
                        <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-[10px] font-bold text-secondary-foreground">
                          {entry.avatarLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-border px-4 py-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    navigate("/");
                    setSwitchOpen(false);
                  }}
                >
                  Open workspace gallery
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
            className="mt-2 flex w-full items-center justify-center rounded-lg p-1.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-white"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
