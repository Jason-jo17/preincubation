import { useState } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  ChevronRight,
  Code2,
  Cpu,
  Eye,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  enrichedInnovators,
  talentHubStats,
  type EnrichedInnovator,
} from "@/data/msme-talent-hub-data";

export default function MsmeTalentHubPage() {
  const [query, setQuery] = useState("");

  const filteredInnovators = enrichedInnovators.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.role.toLowerCase().includes(query.toLowerCase()) ||
    i.skillset.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sidebar-primary to-indigo-900 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
              <span>AI-Driven Candidate Matching</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Company Talent Hub
            </h1>
            <p className="text-lg text-indigo-100/80 leading-relaxed">
              Discover innovators specifically matched to your business needs. 
              We've analyzed their past projects, technical toolsets, and mindsets 
              to find the perfect fit for your active challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-96">
            {talentHubStats.map((stat, idx) => (
              <div key={idx} className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-[10px] uppercase font-semibold text-indigo-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abstract shapes for premium feel */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, or skillset..."
            className="pl-10 h-11 rounded-xl shadow-sm border-border bg-card"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1.5 rounded-lg border-primary/20 bg-primary/5 text-primary">
            Active Needs: 4 Matching
          </Badge>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Sort by: Best Match
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredInnovators.map((innovator) => (
          <CandidateCard key={innovator.id} innovator={innovator} />
        ))}
      </div>
    </div>
  );
}

function CandidateCard({ innovator }: { innovator: EnrichedInnovator }) {
  return (
    <Card className="group border-border overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel: Profile & Overlap */}
          <div className="w-full md:w-5/12 p-6 bg-muted/30 border-r border-border flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-sidebar-primary flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-sidebar-primary/10">
                  {innovator.avatarLabel}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{innovator.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{innovator.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sidebar-primary to-indigo-500 transition-all duration-1000"
                    style={{ width: `${innovator.matchScore}%` }}
                  />
                </div>
                <span className="text-xs font-bold font-mono text-primary">{innovator.matchScore}% Fit</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> Toolset
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {innovator.toolset.map(t => (
                    <Badge key={t} variant="secondary" className="px-2 py-0 h-5 text-[10px] font-medium bg-white border border-border shadow-sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" /> Mindset
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {innovator.mindset.map(m => (
                    <Badge key={m} variant="outline" className="px-2 py-0 h-5 text-[10px] font-medium border-indigo-200 text-indigo-700 bg-indigo-50/50">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[11px] font-bold text-foreground">Matching Company Needs</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2 group/need">
                  <Target className="h-3.5 w-3.5 text-primary mt-0.5" />
                  <p className="text-xs text-muted-foreground group-hover/need:text-foreground transition-colors leading-relaxed">
                    Overlaps with <span className="text-foreground font-semibold">Industrial Fire Detection</span> and <span className="text-foreground font-semibold">Drone Lab</span> needs.
                  </p>
                </li>
              </ul>
              <Button size="sm" className="w-full mt-4 h-9 gap-2 rounded-xl" onClick={() => toast.success("Outreach initiated", { description: `Message sent to ${innovator.name}` })}>
                Reach out to them
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Panel: Skillset & Project Highlight */}
          <div className="flex-1 p-6 space-y-6 bg-card">
            <div className="space-y-3">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5" /> Core Skillset
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {innovator.skillset.map(s => (
                  <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50">
                    <Zap className="h-3 w-3 text-yellow-600" />
                    <span className="text-xs font-medium text-foreground/80">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5" /> Project Overlap Highlight
              </p>
              
              <div className="space-y-4">
                {innovator.primaryProjects.map((proj, idx) => (
                  <div key={idx} className="relative pl-4 space-y-2 border-l-2 border-sidebar-primary/20 hover:border-sidebar-primary transition-colors">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      {proj.title}
                      <Badge className="text-[9px] h-4 px-1.5 bg-success/10 text-success border-success/20 font-bold">MATCH</Badge>
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-[11px] italic text-primary leading-tight">
                        &quot;{proj.relevance}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
