import { DashboardLayout } from "@/components/DashboardLayout";
import type { AppShellRole } from "@/lib/app-shell";

interface RoleDashboardPlaceholderProps {
  shellRole: Exclude<AppShellRole, "ceo">;
  title: string;
}

export function RoleDashboardPlaceholder({ shellRole, title }: RoleDashboardPlaceholderProps) {
  return (
    <DashboardLayout shellRole={shellRole}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">
          This role workspace is a placeholder. Navigation and layout use the {shellRole} shell.
        </p>
      </div>
    </DashboardLayout>
  );
}
