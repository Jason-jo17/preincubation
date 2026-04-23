import { getInnovatorSprintState } from "@/lib/innovator-sprint-store";

/** Live bridge: innovator sprint engine → cohort manager signals. */
export function getInnovatorSprintPulseForCohort() {
  const st = getInnovatorSprintState();
  const active = Object.values(st.projects).filter((p) => !p.archived);
  const avgProgress =
    active.length === 0 ? 0 : Math.round(active.reduce((a, p) => a + p.overallProgressPct, 0) / active.length);
  const openBlockers = active.reduce((a, p) => a + p.blockers.filter((b) => !b.resolved).length, 0);
  const names = active.map((p) => p.name);
  return {
    activeSprintProjects: active.length,
    avgSprintProgressPct: avgProgress,
    openBlockersAcrossSprints: openBlockers,
    activeTitles: names,
  };
}
