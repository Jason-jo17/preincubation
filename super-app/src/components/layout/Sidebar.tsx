"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Lightbulb, 
  BarChart3, 
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  Command,
  Target,
  Trophy,
  Calendar,
  Zap,
  Map,
  FileText,
  Activity,
  UserCircle,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UserRole } from "@/context/AuthContext";

interface SubNavItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: LayoutDashboard,
    roles: ["STUDENT", "MSME", "ADMIN", "GUEST"]
  },
  { 
    name: "Ecosystem Hub", 
    href: "/ecosystem", 
    icon: Users,
    roles: ["ADMIN", "MSME"],
    subItems: [
      { name: "Overview", href: "/ecosystem" },
      { name: "Institutions", href: "/ecosystem/institutions" },
      { name: "Strategic Map", href: "/ecosystem/strategy-map" },
      { name: "Analytics", href: "/ecosystem/analytics" },
    ]
  },
  { 
    name: "Innovator Workspace", 
    href: "/innovator", 
    icon: LayoutDashboard,
    roles: ["STUDENT", "ADMIN"],
    subItems: [
      { name: "My Dashboard", href: "/innovator" },
      { name: "Journey Roadmap", href: "/innovator/roadmap" },
      { name: "Interactions Log", href: "/innovator/interactions" },
      { name: "Progress Tracker", href: "/innovator/tracker" },
      { name: "Co-Innovator", href: "/innovator/co-innovator" },
      { name: "Settings", href: "/innovator/settings" },
    ]
  },
  { 
    name: "Readiness Diagnostic", 
    href: "/assessment", 
    icon: Activity,
    roles: ["STUDENT", "ADMIN", "MENTOR"],
    subItems: [
      { name: "Diagnostic Hub", href: "/assessment" },
      { name: "New Assessment", href: "/assessment/new" },
      { name: "Growth Playbook", href: "/assessment/playbook" },
    ]
  },
  { 
    name: "Innovation Lab", 
    href: "/ecosystem/problems", 
    icon: Target,
    roles: ["STUDENT", "ADMIN"],
    subItems: [
      { name: "Active Gaps", href: "/ecosystem/problems" },
      { name: "Strategic Map", href: "/ecosystem/strategy-map" },
      { name: "Propose Solution", href: "/ecosystem/solutions" },
      { name: "Value Prop", href: "/ecosystem/value-propositions" },
      { name: "Sprint Engine", href: "/ecosystem/sprint" },
      { name: "Coinovator", href: "/ecosystem/coinovator" },
      { name: "Recommendation Tools", href: "/ecosystem/tools" },
    ]
  },
  { 
    name: "Talent Showcase", 
    href: "/showcase", 
    icon: Lightbulb,
    roles: ["STUDENT", "MSME", "ADMIN"],
    subItems: [
      { name: "Explore Projects", href: "/showcase" },
      { name: "Submit Innovation", href: "/showcase/submit" },
      { name: "Leaderboard", href: "/showcase/leaderboard" },
    ]
  },
  { 
    name: "AI Interviewer", 
    href: "/mosi", 
    icon: MessageSquare,
    roles: ["STUDENT", "ADMIN"],
    subItems: [
      { name: "Overview", href: "/mosi" },
      { name: "Schedule Session", href: "/mosi/schedule" },
      { name: "Interview Hub", href: "/mosi/interview" },
      { name: "Review Feedback", href: "/mosi/review" },
    ]
  },
  { 
    name: "MSME Intel", 
    href: "/intel", 
    icon: BarChart3,
    roles: ["STUDENT", "MSME", "ADMIN"],
    subItems: [
      { name: "Regional Intelligence", href: "/intel" },
      { name: "Sector Trends", href: "/intel/sectors" },
      { name: "Company Nodes", href: "/intel/companies" },
      { name: "Ecosystem Mapping", href: "/intel/ecosystem" },
    ]
  },
  { 
    name: "MSINS Command", 
    href: "/msins", 
    icon: Layers,
    roles: ["ADMIN"],
    subItems: [
      { name: "Pipeline", href: "/msins/pipeline" },
      { name: "Incubation Stats", href: "/msins/performance" },
      { name: "CEO Overview", href: "/msins/ceo" },
    ]
  },
  { 
    name: "Cohort Manager", 
    href: "/manager", 
    icon: Users,
    roles: ["MENTOR", "ADMIN"],
    subItems: [
      { name: "Portfolio Overview", href: "/manager" },
      { name: "Cohort Tracking", href: "/manager/cohorts" },
      { name: "Mentee Insights", href: "/manager/mentees" },
      { name: "Review Hub", href: "/manager/review" },
    ]
  },
  { 
    name: "System Oracle", 
    href: "/oracle", 
    icon: Shield,
    roles: ["ADMIN"],
    subItems: [
      { name: "Command Center", href: "/oracle" },
      { name: "User Identities", href: "/oracle/users" },
      { name: "System Settings", href: "/oracle/settings" },
      { name: "Audit Logs", href: "/oracle/logs" },
    ]
  },
];


export function Sidebar() {
  const pathname = usePathname();
  const { user, setRole } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  // Auto-expand the active nav group based on pathname
  React.useEffect(() => {
    const active = navItems.find((item) => {
      if (!item.subItems) return false;
      const subHrefs = item.subItems.map(s => s.href);
      return (
        pathname === item.href ||
        subHrefs.some(h => pathname === h || (h !== "/" && pathname?.startsWith(h + "/")))
      );
    });
    if (active) {
      setExpandedItem(active.name);
    }
  }, [pathname]);

  const filteredItems = navItems.filter(item => 
    user && (item.roles.includes(user.role) || user.role === "ADMIN")
  );

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen bg-bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "items-center" : "items-stretch"
      )}
    >
      {/* Brand Header */}
      <div className={cn("p-6 flex items-center gap-3", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <Command className="w-5 h-5 text-bg-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm leading-none tracking-tight">SUPERAPP</span>
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none mt-1">Intelligence Node</span>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
            <Command className="w-6 h-6 text-bg-base" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {filteredItems.map((item) => {
          // isActive: true if exact match, OR if one of our subitems matches the current path,
          // but avoid /ecosystem matching /ecosystem/problems (which belongs to Innovation Lab)
          const subHrefs = item.subItems?.map(s => s.href) ?? [];
          const isActive =
            pathname === item.href ||
            subHrefs.some(h => pathname === h || (h !== "/" && pathname?.startsWith(h + "/"))) ||
            (!item.subItems && item.href !== "/" && pathname?.startsWith(item.href + "/"));
          const isExpanded = expandedItem === item.name;
 
          return (
            <div key={item.name} className="space-y-1">
              {item.subItems ? (
                <div className="block no-underline">
                  <button
                    onClick={() => {
                      if (isCollapsed) return;
                      setExpandedItem(isExpanded ? null : item.name);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative text-left",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-raised",
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    {!isCollapsed && isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-6 bg-accent rounded-r-full"
                      />
                    )}
                    <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-accent" : "group-hover:text-text-primary")} />
                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-black text-[11px] uppercase tracking-wider">{item.name}</span>
                        <ChevronRight className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-90")} />
                      </div>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-14 bg-bg-overlay border border-border px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
                        {item.name}
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <Link href={item.href} className="block no-underline">
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative text-left",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-raised",
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    {!isCollapsed && isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-6 bg-accent rounded-r-full"
                      />
                    )}
                    <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-accent" : "group-hover:text-text-primary")} />
                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-black text-[11px] uppercase tracking-wider">{item.name}</span>
                      </div>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-14 bg-bg-overlay border border-border px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
                        {item.name}
                      </div>
                    )}
                  </button>
                </Link>
              )}

              <AnimatePresence>
                {isExpanded && !isCollapsed && item.subItems && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-9 space-y-1 overflow-hidden"
                  >
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={cn(
                          "block py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                          pathname === sub.href ? "text-accent" : "text-text-muted hover:text-text-primary"
                        )}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* User / Profile Section */}
      <div className="p-4 border-t border-border bg-bg-surface/50">
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-3")}>
          <div className="size-8 rounded-full bg-accent/20 border border-accent/20 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-accent" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-tighter truncate leading-none">
                {user?.name || "Anonymous User"}
              </p>
              <p className="text-[8px] font-bold text-accent uppercase tracking-[0.2em] mt-1">
                {user?.role || "GUEST"}
              </p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="mt-4 flex flex-wrap gap-1 p-1 bg-bg-base rounded-lg">
             {(["STUDENT", "MSME", "MENTOR", "ADMIN"] as UserRole[]).map((r) => (
               <button
                 key={r}
                 onClick={() => setRole(r)}
                 className={cn(
                   "flex-1 min-w-[40px] py-1.5 rounded text-[7px] font-black uppercase tracking-tighter transition-all",
                   user?.role === r ? "bg-accent text-bg-base" : "text-text-muted hover:text-text-primary"
                 )}
               >
                 {r.slice(0, 4)}
               </button>
             ))}
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "w-full mt-4 flex items-center gap-3 px-3 py-2 text-text-muted hover:text-text-primary hover:bg-bg-raised rounded-xl transition-all",
            isCollapsed && "justify-center px-0"
          )}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Collapse Node</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
