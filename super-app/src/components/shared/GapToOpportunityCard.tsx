"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  ArrowRight, 
  Zap,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IndustryGap } from "@/data/intelligence";

export function GapToOpportunityCard({ gap }: { gap: IndustryGap }) {
  const severityColors = {
    Critical: "border-danger/20 text-danger bg-danger/5",
    High: "border-warning/20 text-warning bg-warning/5",
    Medium: "border-accent/20 text-accent bg-accent/5",
  };

  return (
    <Card className="bg-bg-surface border-border hover:border-accent/40 transition-all group overflow-hidden">
      <CardContent className="p-0">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-widest", severityColors[gap.severity])}>
              {gap.severity} GAP
            </Badge>
            <div className="p-1.5 rounded-lg bg-bg-raised text-text-muted group-hover:text-accent transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors">{gap.title}</h3>
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
              {gap.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {gap.sector}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {gap.location}
            </div>
          </div>
        </div>

        <button className="w-full p-4 bg-bg-raised border-t border-border flex items-center justify-between group-hover:bg-accent group-hover:text-bg-base transition-all">
          <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            Start Solving
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </CardContent>
    </Card>
  );
}
