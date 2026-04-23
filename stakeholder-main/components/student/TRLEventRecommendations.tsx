'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ExternalLink, Zap } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function TRLEventRecommendations() {
  const [statuses, setStatuses] = useState<Record<string, string>>({})

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trl-events'],
    queryFn: () => fetch('/api/student/events/recommended').then(r => r.json())
  })

  useEffect(() => {
    if (data?.events) {
      const initial: Record<string, string> = {}
      data.events.forEach((e: any) => {
        if (e.attendanceStatus) initial[e.id] = e.attendanceStatus
      })
      setStatuses(initial)
    }
  }, [data])

  const updateStatus = async (eventId: string, status: string) => {
    try {
      const res = await fetch(`/api/student/events/${eventId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setStatuses(prev => ({ ...prev, [eventId]: status }))
        if (status === 'won') {
          toast.success('🏆 Win recorded! Added as TRL evidence for review.')
        } else {
          toast.success(`Marked as ${status}`)
        }
        refetch()
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Update status error:', error)
      toast.error('An error occurred')
    }
  }

  if (isLoading) return <div className="text-sm text-muted-foreground animate-pulse">Loading events...</div>
  
  if (!data?.events?.length) return (
    <p className="text-sm text-muted-foreground">
      No events found for TRL {data?.trl} right now.
      Check <a href="https://unstop.com" target="_blank" className="underline hover:text-primary">Unstop</a> or{' '}
      <a href="https://devfolio.co" target="_blank" className="underline hover:text-primary">Devfolio</a> for upcoming contests.
    </p>
  )

  return (
    <div className="space-y-4">
      {data.trlContext && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-[11px] text-amber-800 font-medium flex items-start gap-1.5 leading-tight">
            <Zap className="h-3.5 w-3.5 mt-0 text-amber-500 shrink-0" />
            {data.trlContext.why}
          </p>
        </div>
      )}
      <div className="space-y-3">
        {data.events.map((event: any) => (
          <Card key={event.id} className="hover:border-primary/30 transition-all shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight text-slate-800">{event.title}</p>
                  {event.description && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 italic leading-relaxed">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 test-xs text-slate-400">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(event.eventDate), 'dd MMM yyyy')}
                    </span>
                    {event.prizePool && (
                      <Badge variant="secondary" className="text-[9px] py-0 px-1.5 border-primary/10 bg-primary/5 text-primary font-black uppercase">
                        {event.prizePool}
                      </Badge>
                    )}
                  </div>
                </div>
                {event.registrationUrl && (
                  <Button size="sm" variant="outline" asChild className="shrink-0 h-8 text-[11px] font-bold border-primary/20 text-primary hover:bg-primary/5">
                    <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1.5" /> Register
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50">
                {(['registered', 'attended', 'won'] as const).map(s => (
                  <Button
                    key={s}
                    size="sm"
                    variant={statuses[event.id] === s ? 'default' : 'ghost'}
                    className={cn(
                      'h-6 text-[9px] px-2 font-black uppercase tracking-widest',
                      s === 'won' && statuses[event.id] === 'won' 
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                        : statuses[event.id] === s 
                          ? 'bg-slate-800 text-white' 
                          : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                    )}
                    onClick={() => updateStatus(event.id, s)}
                  >
                    {s === 'won' ? '🏆 Won' : s === 'attended' ? 'Attended' : 'Registered'}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
