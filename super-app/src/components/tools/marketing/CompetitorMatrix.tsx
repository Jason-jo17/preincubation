"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Save, 
  Users,
  Trophy,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Competitor {
  id: string;
  name: string;
  isMe?: boolean;
}

interface Feature {
  id: string;
  name: string;
  scores: Record<string, 'yes' | 'no' | 'partial'>;
}

export default function CompetitorMatrix({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: "me", name: "My Startup", isMe: true },
    { id: "c1", name: "Competitor A" },
    { id: "c2", name: "Competitor B" },
  ]);

  const [features, setFeatures] = useState<Feature[]>([
    { id: "f1", name: "Core Feature 1", scores: { me: 'yes', c1: 'yes', c2: 'no' } },
    { id: "f2", name: "Ease of Use", scores: { me: 'yes', c1: 'no', c2: 'partial' } },
    { id: "f3", name: "Price Point", scores: { me: 'partial', c1: 'no', c2: 'yes' } },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addCompetitor = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setCompetitors([...competitors, { id, name: "New Competitor" }]);
    setFeatures(features.map(f => ({ ...f, scores: { ...f.scores, [id]: 'no' } })));
  };

  const removeCompetitor = (id: string) => {
    if (id === 'me') return;
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const addFeature = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const scores: Record<string, 'no'> = {};
    competitors.forEach(c => scores[c.id] = 'no');
    setFeatures([...features, { id, name: "New Feature", scores }]);
  };

  const toggleScore = (featureId: string, competitorId: string) => {
    setFeatures(features.map(f => {
      if (f.id !== featureId) return f;
      const current = f.scores[competitorId];
      const next: 'yes' | 'no' | 'partial' = 
        current === 'yes' ? 'no' : current === 'no' ? 'partial' : 'yes';
      return { ...f, scores: { ...f.scores, [competitorId]: next } };
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { competitors, features });
      toast.success("Competitor matrix saved");
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
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Competitor <span className="text-accent">Matrix</span></h2>
          <p className="text-text-muted font-medium">Compare your solution against the market landscape.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={addCompetitor} className="gap-2 border-border/50">
            <Plus className="w-4 h-4" /> Add Competitor
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
            {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Matrix</>}
          </Button>
        </div>
      </div>

      <Card className="bg-bg-raised border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-base/50">
                <th className="p-6 border-b border-r border-border/50 min-w-[200px]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Features / Parameters</span>
                </th>
                {competitors.map((c) => (
                  <th key={c.id} className={cn(
                    "p-6 border-b border-border/50 min-w-[160px] relative group",
                    c.isMe && "bg-accent/5"
                  )}>
                    <div className="flex flex-col gap-1">
                      <Input 
                        value={c.name} 
                        onChange={(e) => setCompetitors(competitors.map(comp => comp.id === c.id ? { ...comp, name: e.target.value } : comp))}
                        className={cn(
                          "h-8 border-none bg-transparent p-0 font-black uppercase tracking-tight text-sm",
                          c.isMe ? "text-accent" : "text-text-primary"
                        )}
                        disabled={c.isMe}
                      />
                      {c.isMe && <span className="text-[10px] font-black text-accent/60 uppercase">Your Product</span>}
                    </div>
                    {!c.isMe && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeCompetitor(c.id)}
                        className="absolute -top-2 -right-2 text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border/50 rounded-full scale-75"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.id} className="group hover:bg-bg-base/30 transition-colors">
                  <td className="p-6 border-r border-b border-border/20 relative">
                    <Input 
                      value={f.name}
                      onChange={(e) => setFeatures(features.map(feat => feat.id === f.id ? { ...feat, name: e.target.value } : feat))}
                      className="h-8 border-none bg-transparent p-0 font-bold text-sm"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setFeatures(features.filter(feat => feat.id !== f.id))}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all scale-75"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                  {competitors.map((c) => (
                    <td 
                      key={c.id} 
                      className={cn(
                        "p-6 border-b border-border/20 text-center cursor-pointer hover:bg-bg-base/50 transition-colors",
                        c.isMe && "bg-accent/5"
                      )}
                      onClick={() => toggleScore(f.id, c.id)}
                    >
                      <ScoreIcon score={f.scores[c.id]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4" colSpan={competitors.length + 1}>
                  <Button variant="ghost" onClick={addFeature} className="text-accent hover:text-accent hover:bg-accent/5 gap-2 w-full justify-start font-black uppercase tracking-widest text-[10px]">
                    <Plus className="w-3.5 h-3.5" /> Add Feature Row
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Legend */}
      <div className="flex justify-center gap-12 py-4 bg-bg-raised border border-border/50 rounded-2xl">
        <div className="flex items-center gap-2">
          <ScoreIcon score="yes" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Full Support</span>
        </div>
        <div className="flex items-center gap-2">
          <ScoreIcon score="partial" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Partial / Limited</span>
        </div>
        <div className="flex items-center gap-2">
          <ScoreIcon score="no" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">No Support</span>
        </div>
      </div>
    </div>
  );
}

function ScoreIcon({ score }: { score: 'yes' | 'no' | 'partial' }) {
  if (score === 'yes') return <CheckCircle2 className="w-6 h-6 text-success mx-auto" />;
  if (score === 'no') return <XCircle className="w-6 h-6 text-error/30 mx-auto" />;
  return <div className="size-5 rounded-full border-4 border-warning/50 bg-warning/20 mx-auto" title="Partial" />;
}
