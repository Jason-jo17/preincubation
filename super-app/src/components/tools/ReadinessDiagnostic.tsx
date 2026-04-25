"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  LayoutDashboard,
  Target,
  Users,
  TrendingUp,
  ShieldCheck,
  Globe,
  Database,
  Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { READINESS_FRAMEWORKS, Question } from "@/data/readiness-frameworks";
import { saveToolData, saveAssessment } from "@/app/actions/roadmap";

interface ReadinessDiagnosticProps {
  tool: any;
  progress: any;
  onDataSaved?: () => void;
  isNewIteration?: boolean;
  submissionId?: string;
}

const PARAMETERS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"];

export function ReadinessDiagnostic({ 
  tool, 
  progress, 
  onDataSaved, 
  isNewIteration, 
  submissionId 
}: ReadinessDiagnosticProps) {
  const [currentParamIndex, setCurrentParamIndex] = useState(0);
  const [data, setData] = useState<any>(progress?.submittedData || progress?.data || {});
  const [saving, setSaving] = useState(false);

  const currentParamId = PARAMETERS[currentParamIndex];
  const framework = READINESS_FRAMEWORKS[currentParamId];

  const handleInputChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (asDraft = false) => {
    setSaving(true);
    try {
      let res;
      if (asDraft) {
        res = await saveToolData(tool.toolId, data, {
          submissionId,
          isDraft: true,
          createNewIteration: isNewIteration
        });
      } else {
        // Calculate scores for saveAssessment
        const pillarScores: Record<string, number> = {};
        PARAMETERS.forEach(p => {
          const framework = READINESS_FRAMEWORKS[p];
          let total = 0;
          let count = 0;
          [...framework.questions.core, ...framework.questions.deepDive].forEach(q => {
             if (data[q.scoreField] !== undefined) {
               total += Number(data[q.scoreField]);
               count++;
             }
          });
          pillarScores[p] = count > 0 ? total / count : 0;
        });

        const overallScore = Object.values(pillarScores).reduce((a, b) => a + b, 0) / PARAMETERS.length;

        res = await saveAssessment({
          responses: data,
          pillarScores,
          overallScore
        });
      }

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(asDraft ? "Draft saved!" : "Diagnostic submitted and scored!");
        if (onDataSaved) onDataSaved();
      }
    } catch (e) {
      toast.error("Failed to save diagnostic data");
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    if (currentParamIndex < PARAMETERS.length - 1) {
      setCurrentParamIndex(currentParamIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSave(false);
    }
  };

  const prevStep = () => {
    if (currentParamIndex > 0) {
      setCurrentParamIndex(currentParamIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressValue = ((currentParamIndex + 1) / PARAMETERS.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black">
              {framework.id}
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight">{framework.name}</h2>
              <p className="text-xs text-text-muted font-medium">{framework.subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Step {currentParamIndex + 1} of {PARAMETERS.length}</span>
            <div className="text-xs font-black text-accent italic">{Math.round(progressValue)}% COMPLETE</div>
          </div>
        </div>
        <Progress value={progressValue} className="h-1 bg-border" />
      </div>

      {/* Assessment Form */}
      <div className="bg-bg-base/50 border border-border rounded-3xl p-8 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Core Questions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-accent">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Core Parameters</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {framework.questions.core.map((q) => (
                <QuestionField 
                  key={q.id} 
                  question={q} 
                  value={data[q.id]} 
                  score={data[q.scoreField]}
                  onChange={(val) => handleInputChange(q.id, val)}
                  onScoreChange={(val) => handleInputChange(q.scoreField, val)}
                />
              ))}
            </div>
          </div>

          {/* Deep Dive Questions */}
          <div className="space-y-6 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2 text-text-muted">
              <Search className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Deep Dive (Qualitative Evidence)</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {framework.questions.deepDive.map((q) => (
                <QuestionField 
                  key={q.id} 
                  question={q} 
                  value={data[q.id]} 
                  score={data[q.scoreField]}
                  onChange={(val) => handleInputChange(q.id, val)}
                  onScoreChange={(val) => handleInputChange(q.scoreField, val)}
                />
              ))}
            </div>
          </div>

          {/* Observation Field */}
          <div className="space-y-4 pt-8 border-t border-border/50">
             <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Expert Observations / Notes</Label>
             <Textarea 
               placeholder="Add internal notes or context for this parameter..."
               value={data[framework.observationField] || ""}
               onChange={(e) => handleInputChange(framework.observationField, e.target.value)}
               className="bg-bg-base border-border min-h-[100px] text-xs"
             />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button 
          variant="ghost" 
          onClick={prevStep} 
          disabled={currentParamIndex === 0}
          className="gap-2 text-text-muted hover:text-text-primary uppercase text-[10px] font-black italic tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleSave(true)}
            disabled={saving}
            className="uppercase text-[10px] font-black italic tracking-widest border-border hover:bg-bg-base"
          >
            Save Progress
          </Button>
          <Button 
            onClick={nextStep}
            disabled={saving}
            className="gap-2 bg-accent text-white hover:bg-accent/90 uppercase text-[10px] font-black italic tracking-widest px-8"
          >
            {currentParamIndex === PARAMETERS.length - 1 ? "Finalize Diagnostic" : "Next Parameter"} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function QuestionField({ 
  question, 
  value, 
  score, 
  onChange, 
  onScoreChange 
}: { 
  question: Question; 
  value: any; 
  score: any;
  onChange: (val: any) => void; 
  onScoreChange: (val: number) => void;
}) {
  return (
    <div className="space-y-4 group">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
             <Label className="text-sm font-bold text-text-primary leading-tight">
               {question.label}
             </Label>
             {question.hint && (
               <div className="group/hint relative">
                 <HelpCircle className="w-3 h-3 text-text-muted cursor-help" />
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-bg-surface border border-border rounded-lg text-[10px] text-text-secondary opacity-0 group-hover/hint:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                   {question.hint}
                 </div>
               </div>
             )}
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed italic">{question.description}</p>
        </div>

        {/* Scoring Widget */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1">Score (0-5)</span>
          <div className="flex items-center gap-1 bg-bg-base p-1 rounded-lg border border-border">
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => onScoreChange(s)}
                className={`w-7 h-7 rounded-md text-[10px] font-black transition-all ${
                  score === s 
                    ? 'bg-accent text-white shadow-lg scale-110' 
                    : 'text-text-muted hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {question.type === 'textarea' ? (
        <Textarea 
          placeholder={question.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bg-base border-border min-h-[80px] text-xs focus:border-accent/30 transition-colors"
        />
      ) : question.type === 'select' ? (
        <Select value={value || ""} onValueChange={onChange}>
          <SelectTrigger className="bg-bg-base border-border text-xs h-10">
            <SelectValue placeholder="Select level..." />
          </SelectTrigger>
          <SelectContent className="bg-bg-surface border-border">
            {question.options?.map(opt => (
              <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : question.type === 'number' ? (
        <Input 
          type="number"
          placeholder={question.placeholder}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-bg-base border-border text-xs h-10"
        />
      ) : (
        <Input 
          placeholder={question.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bg-base border-border text-xs h-10"
        />
      )}
      
      {question.example && (
        <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-xl border border-accent/10">
          <AlertCircle className="w-3 h-3 text-accent mt-0.5" />
          <p className="text-[10px] text-accent/80 font-medium italic">
            <span className="font-black uppercase not-italic mr-1">Ex:</span> {question.example}
          </p>
        </div>
      )}
    </div>
  );
}
