"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  value: number;
  onChange: (val: number) => void;
  readOnly?: boolean;
}

export default function ScoreDots({ value, onChange, readOnly = false }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => onChange(i)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-200 border",
            value >= i 
              ? "bg-accent border-accent shadow-[0_0_8px_rgba(74,255,145,0.4)]" 
              : "bg-bg-surface border-border hover:border-accent/50",
            readOnly && "cursor-default opacity-80"
          )}
        />
      ))}
    </div>
  )
}
