"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  Beaker, 
  Target, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Plus,
  Trash2,
  Lightbulb,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

interface Experiment {
  id: string;
  customer: string;
  problem: string;
  solution: string;
  riskiestAssumption: string;
  method: string;
  successCriterion: string;
  result: "VALIDATED" | "INVALIDATED" | "PENDING";
  learning: string;
}

export default function JavelinBoard({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [experiments, setExperiments] = useState<Experiment[]>([
    {
      id: "1",
      customer: "",
      problem: "",
      solution: "",
      riskiestAssumption: "",
      method: "",
      successCriterion: "",
      result: "PENDING",
      learning: ""
    }
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const addExperiment = () => {
    setExperiments([
      ...experiments, 
      {
        id: Date.now().toString(),
        customer: "",
        problem: "",
        solution: "",
        riskiestAssumption: "",
        method: "",
        successCriterion: "",
        result: "PENDING",
        learning: ""
      }
    ]);
    setActiveTab(experiments.length);
  };

  const updateExperiment = (id: string, updates: Partial<Experiment>) => {
    setExperiments(experiments.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { experiments });
      toast.success("Experiment board saved");
    } catch (error) {
      toast.error("Failed to save experiments");
    } finally {
      setIsSaving(false);
    }
  };

  const current = experiments[activeTab];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Javelin <span className="text-accent">Experiment Board</span></h2>
          <p className="text-text-muted font-medium">Test assumptions systematically before building your solution.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={addExperiment} className="gap-2">
            <Plus className="w-4 h-4" /> New Experiment
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
            {isSaving ? "Saving..." : <><ClipboardCheck className="w-4 h-4" /> Save All</>}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {experiments.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border-2",
              activeTab === i 
                ? "bg-accent border-accent text-bg-base shadow-lg shadow-accent/20" 
                : "bg-bg-surface border-border/50 text-text-muted hover:border-accent/30"
            )}
          >
            Experiment {i + 1}
            {e.result !== "PENDING" && (
              <span className={cn(
                "ml-2 size-2 rounded-full inline-block",
                e.result === "VALIDATED" ? "bg-success" : "bg-danger"
              )} />
            )}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Board */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-bg-surface border-border/50 overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Hypothesis Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                    <Users className="w-3 h-3" /> Target Customer
                  </Label>
                  <Input 
                    value={current.customer}
                    onChange={(e) => updateExperiment(current.id, { customer: e.target.value })}
                    placeholder="Who has the problem?"
                    className="bg-bg-base border-none text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                    <Target className="w-3 h-3" /> Problem Hypothesis
                  </Label>
                  <Input 
                    value={current.problem}
                    onChange={(e) => updateExperiment(current.id, { problem: e.target.value })}
                    placeholder="What is the core struggle?"
                    className="bg-bg-base border-none text-lg font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                  <AlertTriangle className="w-3 h-3 text-warning" /> Riskiest Assumption
                </Label>
                <textarea 
                  value={current.riskiestAssumption}
                  onChange={(e) => updateExperiment(current.id, { riskiestAssumption: e.target.value })}
                  placeholder="If this is false, the whole idea fails..."
                  className="w-full bg-bg-base border-none rounded-xl p-4 text-lg font-bold focus:outline-none min-h-[100px]"
                />
              </div>

              <hr className="border-border/30" />

              {/* Method Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                    <Beaker className="w-3 h-3 text-accent" /> Method / Experiment
                  </Label>
                  <textarea 
                    value={current.method}
                    onChange={(e) => updateExperiment(current.id, { method: e.target.value })}
                    placeholder="Interview 10 people, landing page test, etc."
                    className="w-full bg-bg-base border-none rounded-xl p-4 text-sm font-medium focus:outline-none min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                    <CheckCircle2 className="w-3 h-3 text-success" /> Success Criterion
                  </Label>
                  <textarea 
                    value={current.successCriterion}
                    onChange={(e) => updateExperiment(current.id, { successCriterion: e.target.value })}
                    placeholder="e.g. 7/10 people say they would pay for this."
                    className="w-full bg-bg-base border-none rounded-xl p-4 text-sm font-medium focus:outline-none min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className={cn(
            "border-2 transition-all duration-500 overflow-hidden",
            current.result === "VALIDATED" ? "border-success/30 bg-success/5" : 
            current.result === "INVALIDATED" ? "border-danger/30 bg-danger/5" : "border-border/50 bg-bg-surface"
          )}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <Label className="text-xs font-black uppercase tracking-widest text-text-muted block">Outcome & Analysis</Label>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => updateExperiment(current.id, { result: "VALIDATED" })}
                      className={cn(
                        "flex-1 h-16 rounded-2xl gap-2 font-black uppercase tracking-tight transition-all",
                        current.result === "VALIDATED" ? "bg-success text-bg-base border-success scale-105" : "border-success/20 text-success"
                      )}
                    >
                      <CheckCircle2 className="w-5 h-5" /> Validated
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateExperiment(current.id, { result: "INVALIDATED" })}
                      className={cn(
                        "flex-1 h-16 rounded-2xl gap-2 font-black uppercase tracking-tight transition-all",
                        current.result === "INVALIDATED" ? "bg-danger text-bg-base border-danger scale-105" : "border-danger/20 text-danger"
                      )}
                    >
                      <XCircle className="w-5 h-5" /> Invalidated
                    </Button>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-text-muted">Key Learning</Label>
                  <textarea 
                    value={current.learning}
                    onChange={(e) => updateExperiment(current.id, { learning: e.target.value })}
                    placeholder="What did we learn from this experiment?"
                    className="w-full bg-bg-base border-none rounded-xl p-4 text-sm font-medium focus:outline-none min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Progress */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-bg-raised border-border/50">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold flex items-center gap-2">
                <History className="w-4 h-4 text-accent" /> Validation Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-muted">
                  <span>Success Rate</span>
                  <span>{Math.round((experiments.filter(e => e.result === "VALIDATED").length / experiments.length) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-success transition-all duration-500" 
                    style={{ width: `${(experiments.filter(e => e.result === "VALIDATED").length / experiments.length) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-danger transition-all duration-500" 
                    style={{ width: `${(experiments.filter(e => e.result === "INVALIDATED").length / experiments.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10 space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Pro Tip</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  If an experiment is invalidated, don't pivot the whole idea yet. Pivot the **Customer** or the **Problem** hypothesis first.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="ghost" 
            className="w-full text-danger hover:bg-danger/10 gap-2"
            onClick={() => {
              if (experiments.length > 1) {
                const newExperiments = experiments.filter((_, i) => i !== activeTab);
                setExperiments(newExperiments);
                setActiveTab(Math.max(0, activeTab - 1));
              }
            }}
          >
            <Trash2 className="w-4 h-4" /> Delete This Experiment
          </Button>
        </div>
      </div>
    </div>
  );
}
