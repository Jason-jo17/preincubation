import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

/** Wraps all `/msme/*` role workspace routes (excludes CEO `/msme` engagement). */
export function MsmeRoleLayout() {
  return (
    <DashboardLayout shellRole="msme">
      <Outlet />
    </DashboardLayout>
  );
}
