"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Calendar, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Zap, 
  Activity, 
  CheckCircle2,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  id: string;
  stakeholder: string;
  company: string;
  sector: string;
  date: string;
  status: 'Scheduled' | 'Recording' | 'Review' | 'Published' | 'Completed';
  opportunityCount?: number;
}

const statusConfig = {
  Scheduled: { 
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    icon: Calendar,
    label: 'Scheduled'
  },
  Recording: { 
    color: 'bg-danger/10 text-danger border-danger/20 animate-pulse',
    icon: Activity,
    label: 'Live'
  },
  Review: { 
    color: 'bg-warning/10 text-warning border-warning/20',
    icon: FileText,
    label: 'Review'
  },
  Published: { 
    color: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
    label: 'Published'
  },
  Completed: { 
    color: 'bg-accent/10 text-accent border-accent/20',
    icon: CheckCircle2,
    label: 'Completed'
  }
};

export function InterviewCard({ 
  id, 
  stakeholder, 
  company, 
  sector, 
  date, 
  status,
  opportunityCount = 0 
}: InterviewCardProps) {
  const config = statusConfig[status] || statusConfig.Scheduled;
  const StatusIcon = config.icon;

  const href = (status === 'Review' || status?.toString().toUpperCase() === 'COMPLETED') 
    ? `/mosi/review?id=${id}` 
    : status === 'Published' 
      ? `/mosi/preview?id=${id}` 
      : `/mosi/interview/live?id=${id}`;

  return (
    <Link href={href} className="block h-full">
      <div className="group relative bg-bg-surface border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest",
            config.color
          )}>
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </div>
          {opportunityCount > 0 && (
            <div className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1 rounded-full border border-accent/20">
               <Zap className="w-3 h-3 text-accent fill-current" />
               <span className="text-[10px] font-black text-accent uppercase tracking-widest">{opportunityCount} Insights</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Participant</p>
            <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
              {stakeholder}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Organization</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary truncate">
                <Building2 className="w-3.5 h-3.5 text-accent/50" />
                {company}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Sector</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary truncate">
                <Briefcase className="w-3.5 h-3.5 text-accent/50" />
                {sector}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Calendar className="w-3.5 h-3.5 text-text-muted" />
             <span className="text-xs font-mono text-text-muted">{date}</span>
          </div>
          <div className="size-8 rounded-full bg-bg-raised border border-border flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
             <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
