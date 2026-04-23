import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

/** Wraps all `/innovator/*` role workspace routes. */
export function InnovatorRoleLayout() {
  return (
    <DashboardLayout shellRole="innovator">
      <Outlet />
    </DashboardLayout>
  );
}
