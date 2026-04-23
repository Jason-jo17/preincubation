"use client"

import React, { useState } from 'react'
import { ShieldAlert, Info, X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ConflictAlert {
  rank: number
  condition: string
  response: string
}

interface ConflictAlertBannerProps {
  alert: ConflictAlert
  className?: string
}

export const ConflictAlertBanner = ({ alert, className }: ConflictAlertBannerProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  // Severity based on rank
  const severity = alert.rank <= 2 ? "critical" : alert.rank <= 4 ? "high" : "medium"

  const styles = {
    critical: "bg-red-600 text-white border-red-700",
    high: "bg-red-100 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-900",
    medium: "bg-blue-50 text-blue-900 border-blue-100 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-900"
  }[severity]

  return (
    <div className={cn(
      "relative w-full rounded-lg border p-4 shadow-md transition-all animate-in zoom-in-95 duration-300",
      styles,
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {severity === "critical" ? (
            <ShieldAlert className="h-6 w-6" />
          ) : (
            <Info className="h-6 w-6" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/20">
              Priority Override: Rank {alert.rank}
            </span>
            <span className="font-bold text-sm">{alert.condition}</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            {alert.response}
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
