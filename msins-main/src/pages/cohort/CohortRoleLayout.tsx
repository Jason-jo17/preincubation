import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

/** Wraps all `/cohort/*` role workspace routes. */
export function CohortRoleLayout() {
  return (
    <DashboardLayout shellRole="cohort">
      <Outlet />
    </DashboardLayout>
  );
}
