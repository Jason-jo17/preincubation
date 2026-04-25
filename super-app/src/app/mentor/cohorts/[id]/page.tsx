import { redirect } from "next/navigation";

/**
 * Legacy route: /mentor/cohorts/[id]
 * Permanently moved to /manager/cohorts/[id]
 */
export default async function MentorCohortDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/manager/cohorts/${id}`);
}
