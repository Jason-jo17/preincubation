import React from "react";
import { getProjectBySlug } from "@/app/actions/showcase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ExternalLink, 
  GitBranch, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Target,
  MessageSquare,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base relative">
      {/* Hero Header */}
      <div className="h-[40vh] relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-bg-base/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-accent-muted),transparent_70%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-end pb-12 space-y-6">
          <Link href="/showcase" className="w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-accent/30 text-accent bg-accent/5 font-black uppercase tracking-widest text-[9px]">
                  {project.sector}
                </Badge>
                <Badge variant="outline" className="border-success/30 text-success bg-success/5 font-black uppercase tracking-widest text-[9px]">
                  {project.status}
                </Badge>
              </div>
              <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
                {project.title}
              </h1>
              <p className="text-xl text-text-secondary font-medium tracking-tight">
                {project.shortDescription}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
               <Button className="h-14 px-8 bg-text-primary text-bg-base rounded-2xl font-black uppercase italic tracking-widest hover:bg-accent transition-all">
                 Invest in Node
               </Button>
               <Button size="icon" variant="outline" className="size-14 rounded-2xl border-border bg-bg-surface hover:border-accent transition-all">
                 <Share2 className="w-5 h-5" />
               </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Left Column: Content */}
        <div className="md:col-span-8 space-y-16">
          <section className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
              <Target className="w-6 h-6 text-accent" /> Innovation Thesis
              <div className="h-px flex-1 bg-border" />
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-text-secondary leading-relaxed font-medium">
                {project.shortDescription}
              </p>
              <p className="text-text-muted leading-relaxed">
                This project was developed within the InUnity Pre-Incubation ecosystem. 
                It leverages advanced architectural patterns to solve critical bottlenecks in the {project.sector} sector. 
                The solution has been audited for scalability, security, and industrial impact.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
              <Zap className="w-6 h-6 text-amber-500" /> Technical Architecture
              <div className="h-px flex-1 bg-border" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {["Next.js 15", "PostgreSQL", "Prisma", "TailwindCSS", "Framer Motion", "CEED AI"].map((tech) => (
                <div key={tech} className="p-6 bg-bg-surface border border-border rounded-3xl flex items-center justify-between group hover:border-accent/30 transition-all">
                  <span className="text-[11px] font-black uppercase tracking-widest">{tech}</span>
                  <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors" />
                </div>
              ))}
            </div>
          </section>

          <section className="p-10 bg-accent/5 border border-accent/10 rounded-[3rem] space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest italic">CEED Audit Passed</h3>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Score: {project.score.toFixed(1)} / 10.0</p>
              </div>
            </div>
            <p className="text-sm font-medium text-text-secondary leading-relaxed">
              This innovation has successfully cleared the CEED verification protocol. 
              The technical debt is minimal, and the disruption potential is rated high for current market conditions.
            </p>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="md:col-span-4 space-y-12">
          {/* Creator Profile */}
          <Card className="bg-bg-surface border-border p-8 rounded-[3rem] space-y-8 shadow-2xl">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Innovation Lead</h3>
              <div className="flex items-center gap-4">
                <Avatar className="size-16 border-2 border-accent rounded-2xl">
                  <AvatarImage src={project.creator.avatar || ""} />
                  <AvatarFallback className="bg-accent/10 text-accent font-black">{project.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight">{project.creator.name}</h4>
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">Verified Innovator</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-4">
              <Button className="w-full h-14 bg-bg-raised border border-border text-text-primary rounded-2xl font-black uppercase tracking-widest hover:border-accent transition-all flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Message Lead
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border hover:border-accent transition-all">
                  <GitBranch className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border hover:border-accent transition-all">
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Project Stats */}
          <div className="space-y-6 px-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Deployment Date</span>
              <span className="text-sm font-black uppercase tracking-tight">{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Current Stage</span>
              <span className="text-sm font-black uppercase tracking-tight text-accent">Pre-Seed</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Community Trust</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="size-1.5 rounded-full bg-success" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
