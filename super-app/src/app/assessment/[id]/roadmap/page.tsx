import React from "react";
import { getReadinessAssessment } from "@/app/actions/assessment";
import { RoadmapRadar } from "@/components/assessment/RoadmapRadar";
import { AssessmentHydrator } from "@/components/assessment/AssessmentHydrator";
import { FRAMEWORKS, DETAILS } from "@/data/venture-readiness-data";
import { 
  Compass, 
  ArrowRight, 
  Zap, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getReadinessAssessment(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const assessment = result.data;
  const scores = assessment.scores as any;
  const levels = assessment.levels as any;

  // Calculate gaps and next moves
  const frameworkIds = Object.keys(FRAMEWORKS);
  const nextMoves = frameworkIds.map(fid => {
    const currentLevel = levels[fid] || 1;
    const nextLevel = Math.min(currentLevel + 1, 9);
    const detail = DETAILS[fid]?.[nextLevel.toString()];
    
    return {
      id: fid,
      name: FRAMEWORKS[fid].name,
      color: FRAMEWORKS[fid].color,
      currentLevel,
      nextLevel,
      tasks: detail?.tasks || [],
      tools: detail?.tools || []
    };
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-12">
      <AssessmentHydrator scores={scores} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Growth Pathway</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none">
            VENTURE <br />
            <span className="text-accent italic">ROADMAP.</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <Link href={`/assessment/${id}`}>
            <button className="h-12 px-6 rounded-xl bg-bg-surface border border-border font-black uppercase tracking-widest text-[10px] hover:bg-bg-raised transition-colors flex items-center gap-2">
              Review Diagnostic
            </button>
          </Link>
          <button className="h-12 px-6 rounded-xl bg-accent text-bg-base font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg shadow-accent/20 flex items-center gap-2">
            Export PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-bg-surface border border-border rounded-3xl p-8 sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-[11px] font-black uppercase tracking-widest text-text-muted">Balance Analysis</h2>
                <h3 className="text-xl font-black tracking-tight uppercase">Maturity Radar</h3>
              </div>
              <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
            
            <div className="aspect-square w-full">
              <RoadmapRadar />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-bg-base border border-border">
                <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Detected Stage</p>
                <p className="text-2xl font-black text-accent italic">{assessment.stage || "Idea"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-bg-base border border-border">
                <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Avg. Maturity</p>
                <p className="text-2xl font-black italic">
                  {(Object.values(levels).reduce((a: any, b: any) => a + b, 0) as number / 8).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Moves */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-text-muted">The Next Milestone</h2>
            <h3 className="text-3xl font-black tracking-tighter uppercase">EXECUTION <span className="text-accent">PRIORITIES</span></h3>
          </div>

          <div className="space-y-6">
            {nextMoves.map((move, idx) => (
              <div 
                key={move.id}
                className="bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-accent/30 transition-colors"
              >
                <div className="p-6 border-b border-border flex items-center justify-between bg-bg-surface/50">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px]"
                      style={{ backgroundColor: `${move.color}20`, color: move.color, border: `1px solid ${move.color}40` }}
                    >
                      {move.id}
                    </div>
                    <div>
                      <h4 className="font-black tracking-tight text-sm uppercase">{move.name}</h4>
                      <p className="text-[10px] font-bold text-text-muted uppercase">Level {move.currentLevel} → {move.nextLevel}</p>
                    </div>
                  </div>
                  {move.currentLevel === 9 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-[10px] font-black text-text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  {move.currentLevel < 9 ? (
                    <>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                          <Zap className="w-3 h-3 text-accent" /> Immediate Tasks
                        </p>
                        <ul className="space-y-3">
                          {move.tasks.map((task: string, i: number) => (
                            <li key={i} className="flex gap-3 text-sm text-text-secondary leading-tight">
                              <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {move.tools.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {move.tools.map((tool: string, i: number) => (
                            <div 
                              key={i}
                              className="px-3 py-1.5 rounded-lg bg-bg-base border border-border text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:border-accent transition-colors cursor-pointer"
                            >
                              {tool}
                              <ExternalLink className="w-3 h-3 text-text-muted" />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-green-500">
                      <CheckCircle2 className="w-5 h-5" />
                      <p className="text-xs font-bold uppercase tracking-wide">Framework Fully Matured (Level 9 achieved)</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
