"use client"
import { ErrorState } from "@/components/layout/StateFeedback"
export default function IntelError({ error, reset }: { error: any, reset: () => void }) {
  return <ErrorState error={error} reset={reset} title="Intelligence Failure" />
}
