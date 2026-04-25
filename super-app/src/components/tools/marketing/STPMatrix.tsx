"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Target, 
  Compass, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Map,
  BadgeCheck,
  Zap,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

export default function STPMatrix({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    segments: [{ id: "1", name: "", demographics: "", behavior: "", needs: "" }],
    targeting: { selectedSegmentId: "1", rationale: "", attractiveness: 3 },
    positioning: { valueProp: "", differentiation: "", brandMantra: "" }
  });
  const [isSaving, setIsSaving] = useState(false);

  const addSegment = () => {
    setData(prev => ({
      ...prev,
      segments: [...prev.segments, { id: Date.now().toString(), name: "", demographics: "", behavior: "", needs: "" }]
    }));
  };

  const updateSegment = (id: string, updates: any) => {
    setData(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, data);
      toast.success("STP Strategy saved");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">STP <span className="text-accent">Framework</span></h2>
          <p className="text-text-muted font-medium">Segment, Target, and Position your product for market success.</p>
        </div>
        <div className="flex gap-2">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={() => setStep(s => s + 1)} className="gap-2 bg-accent hover:bg-accent/90">
              Next Step <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-success hover:bg-success/90 text-bg-base">
              {isSaving ? "Saving..." : <><CheckCircle2 className="w-4 h-4" /> Complete Strategy</>}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="flex gap-4 p-2 bg-bg-surface rounded-2xl border border-border/50">
        {[
          { id: 1, label: "Segmentation", icon: LayoutGrid },
          { id: 2, label: "Targeting", icon: Target },
          { id: 3, label: "Positioning", icon: Compass },
        ].map((s) => (
          <div
            key={s.id}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest",
              step === s.id ? "bg-accent text-bg-base shadow-lg shadow-accent/20" : "text-text-muted"
            )}
          >
            <s.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="segmentation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid gap-6">
              {data.segments.map((segment, idx) => (
                <Card key={segment.id} className="bg-bg-surface border-border/50">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-black text-xs">
                          {idx + 1}
                        </div>
                        <Input 
                          value={segment.name}
                          onChange={(e) => updateSegment(segment.id, { name: e.target.value })}
                          placeholder="Segment Name (e.g. Early Adopters)"
                          className="bg-transparent border-none text-xl font-bold p-0 h-auto focus-visible:ring-0 w-[300px]"
                        />
                      </div>
                      {data.segments.length > 1 && (
                        <button onClick={() => setData(prev => ({ ...prev, segments: prev.segments.filter(s => s.id !== segment.id) }))} className="text-danger hover:text-danger/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Demographics</Label>
                        <textarea 
                          value={segment.demographics}
                          onChange={(e) => updateSegment(segment.id, { demographics: e.target.value })}
                          placeholder="Age, Location, Income..."
                          className="w-full bg-bg-base border-none rounded-xl p-4 text-sm focus:outline-none min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Psychographics / Behavior</Label>
                        <textarea 
                          value={segment.behavior}
                          onChange={(e) => updateSegment(segment.id, { behavior: e.target.value })}
                          placeholder="Lifestyle, Tech usage, Interests..."
                          className="w-full bg-bg-base border-none rounded-xl p-4 text-sm focus:outline-none min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Core Needs</Label>
                        <textarea 
                          value={segment.needs}
                          onChange={(e) => updateSegment(segment.id, { needs: e.target.value })}
                          placeholder="What specific problem are they trying to solve?"
                          className="w-full bg-bg-base border-none rounded-xl p-4 text-sm focus:outline-none min-h-[100px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addSegment} className="h-16 border-dashed border-2 rounded-2xl gap-2">
                <Plus className="w-5 h-5" /> Add Segment
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="targeting"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-sm font-bold">Which segment will you target first?</Label>
                <div className="grid gap-3">
                  {data.segments.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setData(prev => ({ ...prev, targeting: { ...prev.targeting, selectedSegmentId: s.id } }))}
                      className={cn(
                        "p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between",
                        data.targeting.selectedSegmentId === s.id 
                          ? "border-accent bg-accent/5" 
                          : "border-border/50 bg-bg-surface hover:border-accent/30"
                      )}
                    >
                      <span className="font-bold">{s.name || "Unnamed Segment"}</span>
                      {data.targeting.selectedSegmentId === s.id && <BadgeCheck className="w-5 h-5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Why this segment? (Targeting Rationale)</Label>
                  <textarea 
                    value={data.targeting.rationale}
                    onChange={(e) => setData(prev => ({ ...prev, targeting: { ...prev.targeting, rationale: e.target.value } }))}
                    placeholder="Profitability, Market size, Ease of entry..."
                    className="w-full bg-bg-surface border border-border/50 rounded-xl p-4 text-sm focus:outline-none min-h-[150px]"
                  />
                </div>
                <div className="p-6 rounded-2xl bg-bg-raised border border-border/50 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> Market Attractiveness
                  </h4>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        onClick={() => setData(prev => ({ ...prev, targeting: { ...prev.targeting, attractiveness: val } }))}
                        className={cn(
                          "flex-1 h-10 rounded-lg font-bold text-sm transition-all",
                          data.targeting.attractiveness === val ? "bg-accent text-bg-base" : "bg-bg-base text-text-muted"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="positioning"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-warning" /> Core Value Proposition
                  </Label>
                  <textarea 
                    value={data.positioning.valueProp}
                    onChange={(e) => setData(prev => ({ ...prev, positioning: { ...prev.positioning, valueProp: e.target.value } }))}
                    placeholder="For [Target Segment], our product is a [Category] that [Primary Benefit]."
                    className="w-full bg-bg-surface border border-border/50 rounded-xl p-6 text-lg font-medium focus:outline-none min-h-[180px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <Map className="w-4 h-4 text-accent" /> Differentiation (PODs)
                  </Label>
                  <textarea 
                    value={data.positioning.differentiation}
                    onChange={(e) => setData(prev => ({ ...prev, positioning: { ...prev.positioning, differentiation: e.target.value } }))}
                    placeholder="What makes you unique compared to competitors?"
                    className="w-full bg-bg-surface border border-border/50 rounded-xl p-4 text-sm focus:outline-none min-h-[120px]"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-accent text-bg-base shadow-2xl shadow-accent/30 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Brand Mantra</h4>
                  <Input 
                    value={data.positioning.brandMantra}
                    onChange={(e) => setData(prev => ({ ...prev, positioning: { ...prev.positioning, brandMantra: e.target.value } }))}
                    placeholder="3-5 word core brand promise..."
                    className="bg-transparent border-none text-3xl font-black p-0 h-auto focus-visible:ring-0 placeholder:text-bg-base/30 italic"
                  />
                  <p className="text-xs font-medium opacity-70">
                    Examples: Nike (Authentic Athletic Performance), Disney (Fun Family Entertainment).
                  </p>
                </div>
                
                <Card className="bg-bg-raised border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-muted">Strategy Summary</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-text-muted">Target:</span> <span className="font-bold">{data.segments.find(s => s.id === data.targeting.selectedSegmentId)?.name || "N/A"}</span></p>
                      <p><span className="text-text-muted">Position:</span> <span className="font-bold underline decoration-accent/30">{data.positioning.brandMantra || "TBD"}</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
