"use client"

import { ErrorState } from "@/components/layout/StateFeedback"

export default function MentorError({ error, reset }: { error: any, reset: () => void }) {
  return <ErrorState error={error} reset={reset} title="Mentor Portal Failure" />
}
