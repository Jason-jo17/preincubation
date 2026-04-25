import { redirect } from "next/navigation";

/**
 * Legacy route: /mentor/cohorts
 * Permanently moved to /manager/cohorts
 */
export default function MentorCohortsRedirect() {
  redirect("/manager/cohorts");
}
