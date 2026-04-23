export type AppShellRole = "ceo" | "msme" | "innovator" | "mentor" | "cohort";

const ROLE_DASHBOARD_PREFIXES: Record<Exclude<AppShellRole, "ceo">, string> = {
  msme: "/msme/dashboard",
  innovator: "/innovator/dashboard",
  mentor: "/mentor/dashboard",
  cohort: "/cohort/dashboard",
};

/** MSME company role workspace lives under `/msme/*` (not CEO engagement at `/msme`). */
export function isMsmeRoleWorkspacePath(pathname: string): boolean {
  return pathname.startsWith("/msme/");
}

export function isCeoModulePath(pathname: string): boolean {
  if (pathname === "/") return false;
  if (isMsmeRoleWorkspacePath(pathname)) return false;
  if (pathname.startsWith("/innovator/")) return false;
  if (pathname.startsWith("/mentor/")) return false;
  if (pathname.startsWith("/cohort/")) return false;
  return true;
}

export function roleDashboardPath(role: Exclude<AppShellRole, "ceo">): string {
  return ROLE_DASHBOARD_PREFIXES[role];
}
