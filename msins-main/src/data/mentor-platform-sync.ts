import { cohortMentorUtilization } from "@/data/cohort-manager-workspace";
import { innovatorMentor } from "@/data/innovator-workspace";
import { getInnovatorSprintState } from "@/lib/innovator-sprint-store";
import { activeTeamsDetailed } from "@/data/msme-applicants-workspace";

/** Signals shared with cohort CEO views and innovator booking UX. */
export function getMentorPlatformPulse() {
  const st = getInnovatorSprintState();
  const activeSprints = Object.values(st.projects).filter((p) => !p.archived);

  let tasksWithMentorThread = 0;
  let openMentorThreads = 0;
  for (const p of activeSprints) {
    for (const t of Object.values(p.tasks)) {
      if (t.mentorFeedback.length > 0) {
        tasksWithMentorThread += 1;
        openMentorThreads += 1;
      }
    }
  }

  const unassignedMsmeTeams = activeTeamsDetailed.filter((r) => r.mentor === "Unassigned").length;

  return {
    innovatorUpcomingLabel: `${innovatorMentor.upcomingName} — ${innovatorMentor.upcomingTime}`,
    activeSprintCount: activeSprints.length,
    tasksWithMentorFeedback: tasksWithMentorThread,
    cohortMentorCoveragePct: cohortMentorUtilization.active > 0
      ? Math.round((cohortMentorUtilization.active / cohortMentorUtilization.total) * 100)
      : 0,
    unassignedMsmeTeams,
  };
}
