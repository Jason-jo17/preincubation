import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

/** Wraps all `/mentor/*` role workspace routes. */
export function MentorRoleLayout() {
  return (
    <DashboardLayout shellRole="mentor">
      <Outlet />
    </DashboardLayout>
  );
}
