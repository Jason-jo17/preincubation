'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 p-8">
      <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">Something went wrong</div>
      <p className="text-sm text-text-secondary max-w-md text-center">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-accent text-bg-base rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
