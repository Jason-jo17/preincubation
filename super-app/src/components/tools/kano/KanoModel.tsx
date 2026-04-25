"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  BarChart3, 
  Lightbulb,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

type KanoResponse = "LIKE" | "EXPECT" | "NEUTRAL" | "TOLERATE" | "DISLIKE";

interface Feature {
  id: string;
  name: string;
  functional: KanoResponse | null;
  dysfunctional: KanoResponse | null;
}

const RESPONSE_OPTIONS: { value: KanoResponse; label: string }[] = [
  { value: "LIKE", label: "I like it" },
  { value: "EXPECT", label: "I expect it" },
  { value: "NEUTRAL", label: "I am neutral" },
  { value: "TOLERATE", label: "I can tolerate it" },
  { value: "DISLIKE", label: "I dislike it" },
];

const KANO_MATRIX: Record<KanoResponse, Record<KanoResponse, string>> = {
  LIKE: {
    LIKE: "Q",
    EXPECT: "A",
    NEUTRAL: "A",
    TOLERATE: "A",
    DISLIKE: "O",
  },
  EXPECT: {
    LIKE: "R",
    EXPECT: "I",
    NEUTRAL: "I",
    TOLERATE: "I",
    DISLIKE: "M",
  },
  NEUTRAL: {
    LIKE: "R",
    EXPECT: "I",
    NEUTRAL: "I",
    TOLERATE: "I",
    DISLIKE: "M",
  },
  TOLERATE: {
    LIKE: "R",
    EXPECT: "I",
    NEUTRAL: "I",
    TOLERATE: "I",
    DISLIKE: "M",
  },
  DISLIKE: {
    LIKE: "R",
    EXPECT: "R",
    NEUTRAL: "R",
    TOLERATE: "R",
    DISLIKE: "Q",
  },
};

const CATEGORY_MAP: Record<string, { label: string; color: string; desc: string; icon: any }> = {
  M: { label: "Must-be", color: "text-danger", desc: "Basic requirements. Customers take them for granted.", icon: ShieldCheck },
  O: { label: "Performance", color: "text-accent", desc: "One-dimensional. The more, the better.", icon: TrendingUp },
  A: { label: "Attractive", color: "text-success", desc: "Delighters. High satisfaction if present, no dissatisfaction if absent.", icon: Zap },
  I: { label: "Indifferent", color: "text-text-muted", desc: "Features that don't really matter to the user.", icon: HelpCircle },
  R: { label: "Reverse", color: "text-warning", desc: "Users actually dislike this feature.", icon: AlertCircle },
  Q: { label: "Questionable", color: "text-text-muted", desc: "Conflicting responses. Data may be invalid.", icon: HelpCircle },
};

export default function KanoModel({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [features, setFeatures] = useState<Feature[]>([
    { id: "1", name: "Core Product Value", functional: null, dysfunctional: null }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const addFeature = () => {
    setFeatures([...features, { id: Date.now().toString(), name: "", functional: null, dysfunctional: null }]);
  };

  const removeFeature = (id: string) => {
    if (features.length > 1) {
      setFeatures(features.filter(f => f.id !== id));
    }
  };

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    setFeatures(features.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const getCategory = (f: Feature) => {
    if (!f.functional || !f.dysfunctional) return null;
    return KANO_MATRIX[f.functional][f.dysfunctional];
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const results = features.map(f => ({
        feature: f.name,
        category: getCategory(f),
        functional: f.functional,
        dysfunctional: f.dysfunctional
      }));

      await saveToolData(projectId, toolId, { features: results });
      toast.success("Kano analysis saved to roadmap");
    } catch (error) {
      toast.error("Failed to save analysis");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Kano <span className="text-accent">Model</span></h2>
          <p className="text-text-muted font-medium">Prioritize features based on customer satisfaction vs implementation.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || features.some(f => !f.functional || !f.dysfunctional)}
          className="gap-2 bg-accent hover:bg-accent/90"
        >
          {isSaving ? "Saving..." : <><BarChart3 className="w-4 h-4" /> Save Analysis</>}
        </Button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative"
            >
              <Card className="bg-bg-surface border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-12">
                    {/* Feature Name */}
                    <div className="md:col-span-4 p-6 bg-bg-raised/30 border-r border-border/50">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Feature {idx + 1}</Label>
                          {features.length > 1 && (
                            <button onClick={() => removeFeature(feature.id)} className="text-danger hover:text-danger/80 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <Input 
                          value={feature.name}
                          onChange={(e) => updateFeature(feature.id, { name: e.target.value })}
                          placeholder="Describe the feature..."
                          className="bg-transparent border-none p-0 text-xl font-bold focus-visible:ring-0 placeholder:text-text-muted/30"
                        />
                        
                        {getCategory(feature) && (
                          <div className={cn(
                            "flex items-center gap-2 p-3 rounded-xl bg-bg-base border border-border/50",
                            CATEGORY_MAP[getCategory(feature)!].color
                          )}>
                            {React.createElement(CATEGORY_MAP[getCategory(feature)!].icon, { className: "w-4 h-4" })}
                            <span className="font-bold uppercase tracking-wider text-xs">
                              Result: {CATEGORY_MAP[getCategory(feature)!].label}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="md:col-span-8 p-6 grid md:grid-cols-2 gap-8">
                      {/* Functional */}
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Functional Question</Label>
                        <p className="text-sm font-medium mb-3">How do you feel if this feature is present?</p>
                        <div className="flex flex-wrap gap-2">
                          {RESPONSE_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => updateFeature(feature.id, { functional: opt.value })}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                feature.functional === opt.value 
                                  ? "bg-accent border-accent text-bg-base scale-105 shadow-lg shadow-accent/20"
                                  : "bg-bg-base border-border text-text-muted hover:border-accent/50"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dysfunctional */}
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Dysfunctional Question</Label>
                        <p className="text-sm font-medium mb-3">How do you feel if this feature is absent?</p>
                        <div className="flex flex-wrap gap-2">
                          {RESPONSE_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => updateFeature(feature.id, { dysfunctional: opt.value })}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                feature.dysfunctional === opt.value 
                                  ? "bg-danger border-danger text-bg-base scale-105 shadow-lg shadow-danger/20"
                                  : "bg-bg-base border-border text-text-muted hover:border-danger/50"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button 
          variant="outline" 
          onClick={addFeature}
          className="w-full h-16 border-dashed border-2 hover:border-accent hover:bg-accent/5 rounded-2xl gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold">Add Another Feature</span>
        </Button>
      </div>

      {/* Analysis Insight Card */}
      {features.some(f => getCategory(f)) && (
        <Card className="bg-bg-raised border-accent/20 shadow-2xl shadow-accent/10">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-bold">Strategic Insights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-text-muted font-medium">
                      <span className="text-danger font-bold uppercase tracking-tighter mr-2">Critical Path:</span>
                      Focus on <span className="text-text-primary underline decoration-danger/30 decoration-2">Must-be</span> features first. They don't increase satisfaction but their absence causes total rejection.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-text-muted font-medium">
                      <span className="text-success font-bold uppercase tracking-tighter mr-2">Competitive Edge:</span>
                      Invest in <span className="text-text-primary underline decoration-success/30 decoration-2">Attractive</span> features once basics are covered to differentiate and wow your users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
