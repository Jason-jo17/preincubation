import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import type { AppShellRole } from "@/lib/app-shell";
import { workspaceDefinition } from "@/lib/workspace-identity";

import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** CEO = full command-center sidebar; other values = minimal role shell. */
  shellRole?: AppShellRole;
}

export function DashboardLayout({ children, shellRole }: DashboardLayoutProps) {
  const { pathname } = useLocation();
  const detectedRole = shellRole || (pathname.startsWith('/msme') ? 'msme' : 'ceo');
  const ws = workspaceDefinition(detectedRole);
  return (
    <SidebarProvider>
      <div
        className="min-h-screen flex w-full bg-background"
        data-workspace={detectedRole}
        style={
          {
            "--sidebar-primary": ws.accentHsl,
            "--sidebar-ring": ws.accentHsl,
            "--primary": ws.accentHsl,
            "--ring": ws.accentHsl,
          } as React.CSSProperties
        }
      >
        <AppSidebar shellRole={detectedRole} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar shellRole={detectedRole} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
