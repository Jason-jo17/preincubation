"use client";

import React from "react";
import Link from "next/link";
import { 
  MoreVertical, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StakeholderProfile } from "@/types/stakeholder";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface StakeholderTableViewProps {
  stakeholders: StakeholderProfile[];
}

export function StakeholderTableView({ stakeholders }: StakeholderTableViewProps) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-bg-raised/30">
            <TableHead className="w-[300px]">Stakeholder</TableHead>
            <TableHead>Sector & Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Interactions</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stakeholders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-text-muted">
                No stakeholders found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            stakeholders.map((s) => (
              <TableRow key={s.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm border border-accent/20">
                      {s.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary group-hover:text-accent transition-colors">
                        {s.user.name}
                      </span>
                      <span className="text-xs text-text-muted truncate max-w-[180px]">
                        {s.designation} at {s.organization || "District Admin"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-1">
                      {s.sectors.map((sec) => (
                        <Badge key={sec.id} variant="outline" className="bg-accent/5 border-accent/20 text-accent/80">
                          {sec.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted font-mono">
                      <MapPin className="w-3 h-3" />
                      {s.district}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    s.verificationStatus === "verified" ? "bg-success/10 text-success" : 
                    s.verificationStatus === "pending" ? "bg-warning/10 text-warning" : 
                    "bg-danger/10 text-danger"
                  )}>
                    {s.verificationStatus === "verified" ? <CheckCircle2 className="w-3 h-3" /> : 
                     s.verificationStatus === "pending" ? <Clock className="w-3 h-3" /> : 
                     <XCircle className="w-3 h-3" />}
                    {s.verificationStatus}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono">{s._count.interactions}</span>
                    <div className="flex -space-x-1">
                      {[...Array(Math.min(s._count.interactions, 3))].map((_, i) => (
                        <div key={i} className="size-4 rounded-full bg-accent/20 border border-bg-surface" />
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                    <span className="text-text-primary">
                      {s.lastContacted ? format(new Date(s.lastContacted), 'MMM d, yyyy') : 'No contact'}
                    </span>
                    <span className="text-text-muted">
                      {s.lastContacted ? format(new Date(s.lastContacted), 'HH:mm') : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="size-8" asChild>
                      <Link href={`/stakeholders/${s.id}`}>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-text-muted">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
