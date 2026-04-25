"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Waves, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  AlertTriangle,
  Lightbulb,
  Database,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface IcebergLevel {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string[];
  color: string;
}

export default function IcebergModel({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [levels, setLevels] = useState<IcebergLevel[]>([
    { 
      id: "events", 
      title: "Events", 
      subtitle: "What is happening?", 
      icon: <Waves className="w-4 h-4" />,
      content: ["High student dropout in math classes"],
      color: "bg-accent"
    },
    { 
      id: "patterns", 
      title: "Patterns", 
      subtitle: "What has been happening?", 
      icon: <Search className="w-4 h-4" />,
      content: ["Dropouts increase during harvest season"],
      color: "bg-info"
    },
    { 
      id: "structures", 
      title: "Structures", 
      subtitle: "What is causing this?", 
      icon: <Database className="w-4 h-4" />,
      content: ["Rigid school calendar", "Lack of remote learning tools"],
      color: "bg-warning"
    },
    { 
      id: "mental_models", 
      title: "Mental Models", 
      subtitle: "What beliefs keep this in place?", 
      icon: <Users className="w-4 h-4" />,
      content: ["'Education is secondary to labor'", "'Math is not for everyone'"],
      color: "bg-error"
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addContent = (levelId: string) => {
    setLevels(levels.map(l => l.id === levelId ? { ...l, content: [...l.content, ""] } : l));
  };

  const updateContent = (levelId: string, index: number, text: string) => {
    setLevels(levels.map(l => {
      if (l.id !== levelId) return l;
      const newContent = [...l.content];
      newContent[index] = text;
      return { ...l, content: newContent };
    }));
  };

  const removeContent = (levelId: string, index: number) => {
    setLevels(levels.map(l => l.id === levelId ? { ...l, content: l.content.filter((_, i) => i !== index) } : l));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { levels });
      toast.success("Iceberg model saved successfully");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Iceberg <span className="text-accent">Model</span></h2>
          <p className="text-text-muted font-medium">Uncover the systemic structures and mental models behind social issues.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Analysis</>}
        </Button>
      </div>

      <div className="relative pt-12">
        {/* The Water Line */}
        <div className="absolute top-[25%] inset-x-0 h-0.5 bg-accent/30 border-t border-accent/20 dashed" />
        <div className="absolute top-[25%] -right-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-black uppercase tracking-widest text-accent z-20">Visible Line</div>

        <div className="space-y-6 relative z-10">
          {levels.map((level, idx) => (
            <motion.div
              key={level.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-bg-raised/80 border-border/50 overflow-hidden group">
                <div className="flex gap-1 h-full">
                  {/* Left Side: Label */}
                  <div className={cn("w-48 p-6 flex flex-col items-center justify-center text-center space-y-2 border-r border-border/10", level.color.replace('bg-', 'bg-opacity-10 '))}>
                    <div className={cn("p-3 rounded-2xl bg-bg-base border border-border/50 group-hover:scale-110 transition-transform shadow-lg", level.color.replace('bg-', 'text-'))}>
                      {level.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest">{level.title}</h3>
                      <p className="text-[10px] font-bold text-text-muted uppercase leading-tight">{level.subtitle}</p>
                    </div>
                  </div>

                  {/* Right Side: Content Tags */}
                  <div className="flex-1 p-6 flex flex-wrap gap-2 items-start content-start min-h-[120px]">
                    {level.content.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-bg-base px-3 py-2 rounded-xl border border-border/50 group/tag">
                        <Input 
                          value={item} 
                          onChange={(e) => updateContent(level.id, i, e.target.value)}
                          placeholder="Type point..."
                          className="h-6 border-none bg-transparent p-0 text-sm font-medium focus:ring-0 min-w-[120px]"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeContent(level.id, i)}
                          className="size-5 text-text-muted hover:text-error opacity-0 group-hover/tag:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addContent(level.id)}
                      className="h-9 px-4 rounded-xl border border-dashed border-border/50 text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-accent hover:text-accent hover:bg-accent/5"
                    >
                      <Plus className="w-3 h-3 mr-2" /> Add Point
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
