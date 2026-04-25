"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TreePine, 
  Plus, 
  Trash2, 
  Save, 
  ArrowUp, 
  ArrowDown, 
  GitMerge, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TreeNode {
  id: string;
  text: string;
}

export default function ProblemTree({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [coreProblem, setCoreProblem] = useState("High youth unemployment in urban slums");
  const [causes, setCauses] = useState<TreeNode[]>([
    { id: "c1", text: "Lack of industry-relevant skills" },
    { id: "c2", text: "Limited access to job networks" },
  ]);
  const [effects, setEffects] = useState<TreeNode[]>([
    { id: "e1", text: "Increased crime rates" },
    { id: "e2", text: "Low household income & poverty" },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addItem = (type: 'cause' | 'effect') => {
    const newItem = { id: Math.random().toString(36).substr(2, 9), text: "" };
    if (type === 'cause') setCauses([...causes, newItem]);
    else setEffects([...effects, newItem]);
  };

  const removeItem = (type: 'cause' | 'effect', id: string) => {
    if (type === 'cause') setCauses(causes.filter(i => i.id !== id));
    else setEffects(effects.filter(i => i.id !== id));
  };

  const updateItem = (type: 'cause' | 'effect', id: string, text: string) => {
    if (type === 'cause') setCauses(causes.map(i => i.id === id ? { ...i, text } : i));
    else setEffects(effects.map(i => i.id === id ? { ...i, text } : i));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { coreProblem, causes, effects });
      toast.success("Problem tree saved successfully");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Problem <span className="text-accent">Tree Analysis</span></h2>
          <p className="text-text-muted font-medium">Map out the root causes and consequences of your core problem.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Analysis</>}
        </Button>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Effects Section (Branches) */}
        <div className="w-full space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-12 bg-border/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
              <ArrowUp className="w-3 h-3" /> Effects & Consequences
            </span>
            <span className="h-px w-12 bg-border/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
              {effects.map((effect) => (
                <TreeItem 
                  key={effect.id} 
                  node={effect} 
                  type="effect" 
                  onUpdate={(text) => updateItem('effect', effect.id, text)}
                  onDelete={() => removeItem('effect', effect.id)}
                />
              ))}
            </AnimatePresence>
            <Button variant="ghost" onClick={() => addItem('effect')} className="size-24 rounded-2xl border-2 border-dashed border-border/50 hover:border-accent/50 hover:bg-accent/5 flex flex-col gap-2">
              <Plus className="w-5 h-5 text-text-muted" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Add Effect</span>
            </Button>
          </div>
        </div>

        {/* Connecting Lines (Faded) */}
        <div className="absolute top-[20%] bottom-[20%] w-0.5 bg-gradient-to-b from-transparent via-border/50 to-transparent -z-10" />

        {/* Core Problem (Trunk) */}
        <div className="relative z-10 w-full max-w-lg mb-12">
          <Card className="bg-bg-raised border-2 border-accent shadow-2xl shadow-accent/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 border border-accent/20 mb-2">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Core Problem (The Trunk)</p>
                <textarea 
                  value={coreProblem}
                  onChange={(e) => setCoreProblem(e.target.value)}
                  className="w-full bg-transparent border-none text-xl font-black text-center resize-none focus:ring-0 leading-tight"
                  rows={2}
                  placeholder="Enter the central problem..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Causes Section (Roots) */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-12 bg-border/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
              <ArrowDown className="w-3 h-3" /> Root Causes
            </span>
            <span className="h-px w-12 bg-border/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
              {causes.map((cause) => (
                <TreeItem 
                  key={cause.id} 
                  node={cause} 
                  type="cause" 
                  onUpdate={(text) => updateItem('cause', cause.id, text)}
                  onDelete={() => removeItem('cause', cause.id)}
                />
              ))}
            </AnimatePresence>
            <Button variant="ghost" onClick={() => addItem('cause')} className="size-24 rounded-2xl border-2 border-dashed border-border/50 hover:border-success/50 hover:bg-success/5 flex flex-col gap-2">
              <Plus className="w-5 h-5 text-text-muted" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Add Cause</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeItem({ node, type, onUpdate, onDelete }: { node: TreeNode; type: 'cause' | 'effect'; onUpdate: (val: string) => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="group relative"
    >
      <Card className={cn(
        "size-32 flex flex-col items-center justify-center p-3 text-center transition-all hover:scale-105 border-border/50 overflow-hidden",
        type === 'cause' ? "bg-bg-raised/80 hover:border-success/50" : "bg-bg-raised/80 hover:border-warning/50"
      )}>
        <textarea
          value={node.text}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={type === 'cause' ? "Root cause..." : "Consequence..."}
          className="w-full bg-transparent border-none text-[10px] font-bold text-center resize-none focus:ring-0 leading-tight scrollbar-none"
          rows={3}
        />
        <div className={cn(
          "absolute bottom-0 inset-x-0 h-1",
          type === 'cause' ? "bg-success/50" : "bg-warning/50"
        )} />
      </Card>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onDelete}
        className="absolute -top-2 -right-2 size-6 rounded-full bg-bg-surface border border-border/50 text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-0"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </motion.div>
  );
}
