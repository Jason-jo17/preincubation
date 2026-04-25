import React from "react";
import { getReadinessAssessment } from "@/app/actions/assessment";
import { AssessmentHydrator } from "@/components/assessment/AssessmentHydrator";
import { AssessmentHub } from "@/components/assessment/AssessmentHub";
import { Zap, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewAssessmentPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getReadinessAssessment(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const assessment = result.data;

  return (
    <div className="min-h-screen bg-bg-base pb-24">
      {/* Client-side Hydrator */}
      <AssessmentHydrator scores={assessment.scores as any} />

      <div className="p-6 border-b border-border bg-bg-surface/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <Zap className="w-6 h-6 text-bg-base" />
            </div>
            <div>
              <h1 className="text-[11px] font-black uppercase tracking-widest text-text-muted">Diagnostic Record</h1>
              <p className="text-lg font-black tracking-tighter uppercase">Assessment ID: {id.slice(-8)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" /> Created At
              </p>
              <p className="text-xs font-bold">{format(new Date(assessment.createdAt), "PPP")}</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center justify-end gap-1">
                <User className="w-3 h-3" /> Stage Detect
              </p>
              <p className="text-xs font-black text-accent uppercase italic">{assessment.stage || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      <AssessmentHub />
    </div>
  );
}
