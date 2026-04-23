import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";
import type { AppShellRole } from "@/lib/app-shell";

export interface WorkspaceDefinition {
  id: AppShellRole;
  title: string;
  /** Short label in the top bar */
  roleTitle: string;
  description: string;
  dashboardPath: string;
  icon: LucideIcon;
  /** Top-right and profile avatar text */
  avatarLabel: string;
  /** Sidebar header mark (compact) */
  headerMark: string;
  profileName: string;
  profileSubtitle: string;
  /** HSL components only, same format as `index.css` variables */
  accentHsl: string;
}

export const WORKSPACES: WorkspaceDefinition[] = [
  {
    id: "ceo",
    title: "CEO Command Center",
    roleTitle: "CEO Command Center",
    description: "State-wide innovation KPIs, funds, and regional intelligence in one command view.",
    dashboardPath: "/ceo/dashboard",
    icon: LayoutDashboard,
    avatarLabel: "CEO",
    headerMark: "CEO",
    profileName: "Kiran CEO",
    profileSubtitle: "Maharashtra Innovation Office",
    accentHsl: "217 91% 60%",
  },
  {
    id: "msme",
    title: "MSME Portal",
    roleTitle: "MSME Portal",
    description: "Post challenges, review applicants, and run matchmaking with innovators.",
    dashboardPath: "/msme/dashboard",
    icon: Factory,
    avatarLabel: "MSME",
    headerMark: "MSME",
    profileName: "Kiran MSME",
    profileSubtitle: "Company innovation workspace",
    accentHsl: "152 55% 38%",
  },
  {
    id: "innovator",
    title: "Innovator Studio",
    roleTitle: "Innovator Studio",
    description: "Discover problems, join sprints, and ship solutions into the marketplace.",
    dashboardPath: "/innovator/dashboard",
    icon: Lightbulb,
    avatarLabel: "IN",
    headerMark: "IN",
    profileName: "Kiran Innovator",
    profileSubtitle: "Build & validate solutions",
    accentHsl: "262 58% 52%",
  },
  {
    id: "mentor",
    title: "Mentor Workspace",
    roleTitle: "Mentor Workspace",
    description: "Guide teams, run sessions, and track cohort momentum from one desk.",
    dashboardPath: "/mentor/dashboard",
    icon: GraduationCap,
    avatarLabel: "MT",
    headerMark: "MT",
    profileName: "Kiran Mentor",
    profileSubtitle: "Advisory & office hours",
    accentHsl: "199 82% 48%",
  },
  {
    id: "cohort",
    title: "Cohort Mentor",
    roleTitle: "Cohort Mentor",
    description: "Operate cohorts end-to-end: intake, pacing, and outcomes reporting.",
    dashboardPath: "/cohort/dashboard",
    icon: Building2,
    avatarLabel: "CM",
    headerMark: "CM",
    profileName: "Kiran Admin",
    profileSubtitle: "Program operations",
    accentHsl: "280 55% 50%",
  },
];

const byId = Object.fromEntries(WORKSPACES.map((w) => [w.id, w])) as Record<
  AppShellRole,
  WorkspaceDefinition
>;

export function workspaceDefinition(role: AppShellRole): WorkspaceDefinition {
  return byId[role];
}

export function isWorkspaceActive(role: AppShellRole, pathname: string): boolean {
  if (role === "ceo") {
    if (pathname === "/") return false;
    if (pathname.startsWith("/msme/")) return false;
    if (pathname.startsWith("/innovator/")) return false;
    if (pathname.startsWith("/mentor/")) return false;
    if (pathname.startsWith("/cohort/")) return false;
    return true;
  }
  const prefix =
    role === "msme"
      ? "/msme/"
      : role === "innovator"
        ? "/innovator/"
        : role === "mentor"
          ? "/mentor/"
          : "/cohort/";
  return pathname.startsWith(prefix);
}
