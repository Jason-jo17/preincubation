'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function InterviewRedirectPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    if (id) {
      router.replace(`/review?id=${id}`)
    } else {
      router.replace('/')
    }
  }, [id, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in">
      <div className="w-10 h-10 border-4 border-slate-700 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Redirecting to Analysis...</p>
    </div>
  )
}
