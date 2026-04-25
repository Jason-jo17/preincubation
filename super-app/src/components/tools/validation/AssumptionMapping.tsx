"use client";

import React, { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Save, 
  HelpCircle,
  LayoutGrid,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

interface Assumption {
  id: string;
  text: string;
  importance: number; // 0-100 (Y axis)
  certainty: number; // 0-100 (X axis)
}

export default function AssumptionMapping({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [assumptions, setAssumptions] = useState<Assumption[]>([
    { id: "1", text: "Customers are willing to pay $50/mo", importance: 80, certainty: 20 },
    { id: "2", text: "We can acquire users via LinkedIn ads for <$5", importance: 90, certainty: 10 },
    { id: "3", text: "Tech stack can support 10k concurrent users", importance: 40, certainty: 70 },
  ]);

  const [newText, setNewText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addAssumption = () => {
    if (!newText.trim()) return;
    const newA: Assumption = {
      id: Math.random().toString(36).substr(2, 9),
      text: newText,
      importance: 50,
      certainty: 50,
    };
    setAssumptions([...assumptions, newA]);
    setNewText("");
  };

  const removeAssumption = (id: string) => {
    setAssumptions(assumptions.filter(a => a.id !== id));
  };

  const updateAssumption = (id: string, updates: Partial<Assumption>) => {
    setAssumptions(assumptions.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { assumptions });
      toast.success("Assumption map saved");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Assumption <span className="text-accent">Mapping</span></h2>
          <p className="text-text-muted font-medium">Identify and prioritize high-risk assumptions that need validation.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Map</>}
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Interactive Grid */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-bg-raised border-border/50 relative overflow-hidden h-[600px]">
            <div className="absolute inset-0 flex flex-col p-8">
              {/* The Grid Visualization */}
              <div className="flex-1 relative border-2 border-border/30 rounded-xl bg-bg-base/50">
                {/* Axis Labels */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase tracking-widest text-text-muted">Importance →</div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-text-muted">Certainty (Evidence) →</div>

                {/* Quadrant Labels */}
                <div className="absolute top-4 left-4 text-[10px] font-black text-warning uppercase bg-warning/10 px-2 py-1 rounded border border-warning/20">Leap of Faith (Critical)</div>
                <div className="absolute top-4 right-4 text-[10px] font-black text-success uppercase bg-success/10 px-2 py-1 rounded border border-success/20">Safe Knowledge</div>
                <div className="absolute bottom-4 left-4 text-[10px] font-black text-text-muted uppercase bg-bg-surface px-2 py-1 rounded border border-border/50">Postpone</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-black text-text-muted uppercase bg-bg-surface px-2 py-1 rounded border border-border/50">Low Impact</div>

                {/* Center Lines */}
                <div className="absolute inset-x-0 top-1/2 border-t border-border/20 dashed" />
                <div className="absolute inset-y-0 left-1/2 border-l border-border/20 dashed" />

                {/* Assumptions Dots */}
                {assumptions.map((a) => (
                  <motion.div
                    key={a.id}
                    layoutId={a.id}
                    className={cn(
                      "absolute size-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center cursor-pointer shadow-xl transition-shadow hover:shadow-accent/20",
                      a.importance > 50 && a.certainty < 50 ? "bg-warning border-warning-dark text-white" : "bg-accent border-accent-dark text-white"
                    )}
                    style={{ 
                      left: `${a.certainty}%`, 
                      bottom: `${a.importance}%` 
                    }}
                    title={a.text}
                  >
                    <span className="text-[10px] font-black">{assumptions.indexOf(a) + 1}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: List & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-bg-raised border-border/50">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4 text-accent" /> Add Assumption
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={newText} 
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Type an assumption..."
                  onKeyDown={(e) => e.key === 'Enter' && addAssumption()}
                  className="bg-bg-base border-none font-medium h-12"
                />
                <Button onClick={addAssumption} className="h-12 aspect-square p-0 bg-accent hover:bg-accent/90 rounded-xl">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
            {assumptions.map((a, idx) => (
              <Card key={a.id} className="bg-bg-surface border-border/50 group">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-lg bg-bg-base border border-border/50 flex items-center justify-center text-[10px] font-black text-accent">{idx + 1}</span>
                      <p className="text-sm font-bold leading-tight">{a.text}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeAssumption(a.id)}
                      className="text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-2 border-t border-border/10">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Importance</span>
                        <span className="text-accent">{a.importance}%</span>
                      </div>
                      <Slider 
                        value={[a.importance]} 
                        onValueChange={([val]) => updateAssumption(a.id, { importance: val })} 
                        max={100} 
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Certainty</span>
                        <span className="text-success">{a.certainty}%</span>
                      </div>
                      <Slider 
                        value={[a.certainty]} 
                        onValueChange={([val]) => updateAssumption(a.id, { certainty: val })} 
                        max={100} 
                        step={1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
