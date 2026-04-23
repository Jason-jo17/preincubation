import { Navigate } from "react-router-dom";

export default function InnovatorProblemsBrowsePage() {
  // Consolidate browse view into the main Innovator Hub tailored tab
  return <Navigate to="/innovator/marketplace?tab=tailored" replace />;
}
