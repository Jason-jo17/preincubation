"use client"
import { ErrorState } from "@/components/layout/StateFeedback"
export default function ManagerError({ error, reset }: { error: any, reset: () => void }) {
  return <ErrorState error={error} reset={reset} title="Management Node Error" />
}
