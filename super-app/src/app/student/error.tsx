'use client'

import React, { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function StudentError({
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
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="text-red-500" size={40} />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Workspace <span className="text-red-500">Anomaly</span></h2>
      <p className="text-text-muted max-w-md mb-8">
        We encountered a disruption while accessing your venture data. This is likely a temporary sync issue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-accent text-bg-base font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-transform"
        >
          <RefreshCw size={16} />
          Reset Workspace
        </button>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 px-8 py-3 border border-border text-text-base font-black uppercase text-xs tracking-widest rounded-full hover:bg-bg-surface transition-colors"
        >
          <Home size={16} />
          Back to Dashboard
        </Link>
      </div>
      <div className="mt-12 p-4 bg-bg-surface border border-border rounded-xl max-w-lg overflow-hidden">
         <code className="text-[10px] text-text-muted break-all opacity-50">
            {error.message || "An unknown error occurred."}
         </code>
      </div>
    </div>
  )
}
