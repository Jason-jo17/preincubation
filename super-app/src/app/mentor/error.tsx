'use client'

import React, { useEffect } from 'react'
import { ShieldAlert, RefreshCcw, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

export default function MentorError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6">
        <ShieldAlert className="text-accent" size={32} />
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Mentor Hub <span className="text-accent">Interrupted</span></h2>
      <p className="text-text-muted max-w-sm mb-8 text-sm leading-relaxed">
        An error occurred while accessing the mentor workspace. Mentee data synchronization may need to be re-initialized.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-bg-base font-black uppercase text-[10px] tracking-[0.2em] rounded-lg hover:brightness-110 transition-all"
        >
          <RefreshCcw size={14} />
          Retry Request
        </button>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 px-6 py-2.5 border border-border text-text-base font-black uppercase text-[10px] tracking-[0.2em] rounded-lg hover:bg-bg-surface transition-colors"
        >
          <LayoutDashboard size={14} />
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
