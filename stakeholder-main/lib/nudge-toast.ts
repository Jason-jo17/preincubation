// lib/nudge-toast.ts
import { toast } from 'sonner'

export function showNudgeToast(nudge: { nudgeType: string; message: string; blockedByToolName?: string }) {
  if (nudge.nudgeType === 'BLOCK') {
    toast.error(
      `🔒 Prerequisite: ${nudge.blockedByToolName || 'earlier tool'} needed first`,
      {
        description: nudge.message.split('\n')[0],
        duration: 6000,
        action: {
          label: 'Go There',
          onClick: () => window.location.href = '/student/cofounder/trl-tracker'
        }
      }
    )
  } else if (nudge.nudgeType === 'WARN') {
    toast.warning(
      `⚠ Partial prerequisites for this tool`,
      { description: nudge.message, duration: 4000 }
    )
  } else if (nudge.nudgeType === 'FILL_GUIDE') {
    toast.info(
      `✨ ${nudge.message}`,
      { duration: 3000 }
    )
  }
}
