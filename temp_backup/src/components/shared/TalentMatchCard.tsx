"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Star, 
  ArrowRight, 
  TrendingUp,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TalentMatch } from "@/data/intelligence";

export function TalentMatchCard({ match }: { match: TalentMatch }) {
  return (
    <Card className="bg-bg-surface border-border hover:border-success/40 transition-all group overflow-hidden">
      <CardContent className="p-0">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-success/10 flex items-center justify-center text-success font-black text-[10px]">
                {match.score}%
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-success/20 text-success bg-success/5 uppercase tracking-widest">
                Top Match
              </Badge>
            </div>
            <div className="p-1.5 rounded-lg bg-bg-raised text-text-muted group-hover:text-success transition-colors">
              <Star className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold tracking-tight group-hover:text-success transition-colors">{match.projectName}</h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <User className="w-3.5 h-3.5" />
              {match.innovator}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-bg-raised space-y-1">
              <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Sector</p>
              <p className="text-[10px] font-black">{match.sector}</p>
            </div>
            <div className="p-2 rounded-lg bg-bg-raised space-y-1">
              <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Readiness</p>
              <p className="text-[10px] font-black leading-none">{match.readinessLevel}</p>
            </div>
          </div>
        </div>

        <button className="w-full p-4 bg-bg-raised border-t border-border flex items-center justify-between group-hover:bg-success group-hover:text-bg-base transition-all">
          <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5" />
            Explore Solution
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </CardContent>
    </Card>
  );
}
