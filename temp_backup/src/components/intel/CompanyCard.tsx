"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    sector: string;
    sub_sector?: string;
    stage: string;
    headquarters_city?: string;
    headquarters_state?: string;
    employee_count?: number;
    revenue_growth_rate?: number;
    revenue_current?: number;
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="group relative bg-bg-surface border border-border rounded-2xl overflow-hidden flex flex-col h-full hover:border-accent/40 transition-all duration-500 shadow-sm">
      <div className="h-1.5 w-full bg-accent/20 group-hover:bg-accent transition-colors" />
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-bg-raised border border-border flex items-center justify-center text-accent shadow-inner group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight">{company.name}</CardTitle>
              <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">{company.sub_sector || company.sector}</p>
            </div>
          </div>
          <Badge variant="outline" className="rounded-md border-accent/20 text-accent bg-accent/5">
            {company.stage}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-6 flex-1">
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="flex items-center gap-2 text-text-secondary">
            <div className="size-8 rounded-lg bg-bg-raised flex items-center justify-center border border-border">
              <MapPin className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Location</span>
              <span className="text-xs font-bold truncate max-w-[100px]">
                {company.headquarters_city || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <div className="size-8 rounded-lg bg-bg-raised flex items-center justify-center border border-border">
              <Users className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Team</span>
              <span className="text-xs font-bold">
                {company.employee_count || 0} Members
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <div className="size-8 rounded-lg bg-bg-raised flex items-center justify-center border border-border">
              <TrendingUp className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Growth</span>
              <span className="text-xs font-bold text-success">
                +{company.revenue_growth_rate || 0}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-bg-raised/50 border-t border-border mt-auto">
        <Link href={`/intel/company/${company.id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between group/btn hover:bg-accent hover:text-accent-foreground">
            Analysis Dashboard
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
