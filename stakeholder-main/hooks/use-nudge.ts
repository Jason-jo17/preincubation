// hooks/use-nudge.ts
import { useState, useCallback } from 'react'

export type NudgeType = 'BLOCK' | 'WARN' | 'FILL_GUIDE' | 'CLEAR'

export interface FillHint {
  fieldName: string
  hint: string
  sourceToolId: string
  sourceToolName: string
}

export interface NudgeResult {
  nudgeType: NudgeType
  message: string
  blockedByToolId?: string
  blockedByToolName?: string
  fillHints?: FillHint[]
}

interface UseNudgeReturn {
  nudge: NudgeResult | null
  isChecking: boolean
  checkNudge: (toolId: string) => Promise<NudgeResult>
  clearNudge: () => void
}

export function useNudge(): UseNudgeReturn {
  const [nudge, setNudge] = useState<NudgeResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkNudge = useCallback(async (toolId: string): Promise<NudgeResult> => {
    setIsChecking(true)
    try {
      const res = await fetch('/api/student/nudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetToolId: toolId })
      })
      const result: NudgeResult = await res.json()
      setNudge(result)
      return result
    } catch {
      const fallback: NudgeResult = { nudgeType: 'CLEAR', message: '' }
      setNudge(fallback)
      return fallback
    } finally {
      setIsChecking(false)
    }
  }, [])

  const clearNudge = useCallback(() => setNudge(null), [])

  return { nudge, isChecking, checkNudge, clearNudge }
}
