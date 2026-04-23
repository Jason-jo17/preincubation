import React from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Map as MapIcon, 
  Download,
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stakeholderDb } from "@/lib/db";
import { StakeholderTableView } from "@/components/stakeholders/StakeholderTableView";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

interface StakeholdersPageProps {
  searchParams: Promise<{
    q?: string;
    sector?: string;
    region?: string;
    view?: 'list' | 'grid' | 'map';
    sort?: string;
  }>
}

export default async function StakeholdersPage({ searchParams }: StakeholdersPageProps) {
  const params = await searchParams;
  const q = params.q;
  const sectorId = params.sector;
  const region = params.region;
  const view = params.view || 'list';
  const sort = params.sort || 'newest';

  let stakeholders: any[] = [];
  let sectors: any[] = [];
  let districts: any[] = [];

  try {
    sectors = await stakeholderDb.sector.findMany({
      orderBy: { name: 'asc' }
    });

    districts = await stakeholderDb.stakeholderProfile.findMany({
      select: { district: true },
      distinct: ['district'],
      orderBy: { district: 'asc' }
    });

    stakeholders = await stakeholderDb.stakeholderProfile.findMany({
      where: {
        AND: [
          q ? {
            OR: [
              { user: { name: { contains: q, mode: 'insensitive' } } },
              { organization: { contains: q, mode: 'insensitive' } },
              { designation: { contains: q, mode: 'insensitive' } },
            ]
          } : {},
          sectorId && sectorId !== 'all' ? {
            sectors: { some: { id: sectorId } }
          } : {},
          region && region !== 'all' ? {
            district: region
          } : {},
        ]
      },
      include: {
        user: true,
        sectors: true,
        problemStatements: true,
        _count: {
          select: {
            interactions: true,
            linkedStakeholders: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    });
  } catch (error) {
    console.error("Database error:", error);
    // Fallback to empty state in case of missing env vars
  }

  return (
    <div className="p-8 lg:p-12 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase tracking-widest">
        <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-text-primary">Stakeholders</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-accent/10 text-accent">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Stakeholder <span className="text-accent">Directory</span></h1>
          </div>
          <p className="text-text-secondary max-w-xl">
            Explore and manage the network of institutional partners, community leaders, and subject matter experts.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Stakeholder
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-bg-surface p-4 border border-border rounded-lg">
        <div className="flex flex-1 w-full max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, org, or role..."
            className="w-full bg-bg-base border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-bg-raised p-1 rounded-md border border-border">
            <Button variant={view === 'list' ? 'default' : 'ghost'} size="icon" className="size-8" asChild>
              <Link href={{ query: { ...params, view: 'list' } }}><List className="w-4 h-4" /></Link>
            </Button>
            <Button variant={view === 'grid' ? 'default' : 'ghost'} size="icon" className="size-8" asChild>
              <Link href={{ query: { ...params, view: 'grid' } }}><LayoutGrid className="w-4 h-4" /></Link>
            </Button>
            <Button variant={view === 'map' ? 'default' : 'ghost'} size="icon" className="size-8" asChild>
              <Link href={{ query: { ...params, view: 'map' } }}><MapIcon className="w-4 h-4" /></Link>
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StakeholderTableView stakeholders={stakeholders as any} />
      </section>
    </div>
  );
}
