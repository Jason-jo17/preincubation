"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Map, 
  Plus, 
  Trash2, 
  Save, 
  User, 
  Server, 
  Settings, 
  Eye, 
  EyeOff,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BlueprintStep {
  id: string;
  name: string;
  evidence: string;
  customerAction: string;
  frontstage: string;
  backstage: string;
  support: string;
}

export default function ServiceBlueprint({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [steps, setSteps] = useState<BlueprintStep[]>([
    { 
      id: "1", 
      name: "Onboarding", 
      evidence: "Welcome Email", 
      customerAction: "Clicks link in email", 
      frontstage: "Profile setup page", 
      backstage: "Create user record", 
      support: "Auth0 / Database" 
    },
    { 
      id: "2", 
      name: "Service Delivery", 
      evidence: "Digital Dashboard", 
      customerAction: "Inputs data", 
      frontstage: "Data visualizer", 
      backstage: "Process data via AI", 
      support: "OpenAI API / Worker" 
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addStep = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setSteps([...steps, { id, name: "New Step", evidence: "", customerAction: "", frontstage: "", backstage: "", support: "" }]);
  };

  const updateStep = (id: string, updates: Partial<BlueprintStep>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { steps });
      toast.success("Service blueprint saved successfully");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[95vw] mx-auto pb-20 overflow-hidden">
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Service <span className="text-accent">Blueprint</span></h2>
          <p className="text-text-muted font-medium">Map the front-to-back operational flow of your service.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={addStep} className="gap-2 border-border/50">
            <Plus className="w-4 h-4" /> Add Step
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
            {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Blueprint</>}
          </Button>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-10 px-4 scrollbar-thin">
        <div className="flex gap-1 min-w-max">
          {/* Row Headers */}
          <div className="flex flex-col gap-1 w-48 sticky left-0 z-20 bg-bg-base pr-4">
            <RowHeader icon={<Package className="w-4 h-4" />} title="Physical Evidence" color="text-text-muted" />
            <RowHeader icon={<User className="w-4 h-4" />} title="Customer Action" color="text-accent" />
            <div className="h-4 flex items-center justify-center">
              <div className="w-full border-t border-accent/30 border-dashed relative">
                <span className="absolute left-0 -top-2 text-[8px] font-black uppercase text-accent/60 bg-bg-base px-1">Line of Interaction</span>
              </div>
            </div>
            <RowHeader icon={<Eye className="w-4 h-4" />} title="Frontstage" color="text-success" />
            <div className="h-4 flex items-center justify-center">
              <div className="w-full border-t border-border/30 border-dashed relative">
                <span className="absolute left-0 -top-2 text-[8px] font-black uppercase text-text-muted bg-bg-base px-1">Line of Visibility</span>
              </div>
            </div>
            <RowHeader icon={<EyeOff className="w-4 h-4" />} title="Backstage" color="text-warning" />
            <div className="h-4 flex items-center justify-center">
              <div className="w-full border-t border-border/30 border-dashed relative">
                <span className="absolute left-0 -top-2 text-[8px] font-black uppercase text-text-muted bg-bg-base px-1">Line of Internal Interaction</span>
              </div>
            </div>
            <RowHeader icon={<Server className="w-4 h-4" />} title="Support Processes" color="text-info" />
          </div>

          {/* Steps */}
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col gap-1 w-72 group">
              <div className="h-10 flex items-center justify-between px-4 bg-bg-raised border border-border/50 rounded-t-xl mb-1">
                <Input 
                  value={step.name} 
                  onChange={(e) => updateStep(step.id, { name: e.target.value })}
                  className="h-6 border-none bg-transparent p-0 text-[10px] font-black uppercase tracking-widest text-text-primary"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeStep(step.id)}
                  className="size-5 text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <BlueprintCell value={step.evidence} onChange={(val) => updateStep(step.id, { evidence: val })} placeholder="e.g. Website, Email..." />
              <BlueprintCell value={step.customerAction} onChange={(val) => updateStep(step.id, { customerAction: val })} placeholder="What user does..." border="border-accent/20" />
              <div className="h-4" />
              <BlueprintCell value={step.frontstage} onChange={(val) => updateStep(step.id, { frontstage: val })} placeholder="Employee actions..." border="border-success/20" />
              <div className="h-4" />
              <BlueprintCell value={step.backstage} onChange={(val) => updateStep(step.id, { backstage: val })} placeholder="Internal actions..." border="border-warning/20" />
              <div className="h-4" />
              <BlueprintCell value={step.support} onChange={(val) => updateStep(step.id, { support: val })} placeholder="Systems, APIs..." border="border-info/20" />
            </div>
          ))}

          {/* Add Step Button Column */}
          <Button 
            variant="ghost" 
            onClick={addStep} 
            className="w-20 h-[500px] border-2 border-dashed border-border/30 hover:border-accent/50 hover:bg-accent/5 rounded-2xl flex flex-col gap-4"
          >
            <Plus className="w-6 h-6 text-text-muted" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted [writing-mode:vertical-lr]">Add Next Step</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function RowHeader({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <div className="h-20 flex items-center gap-3 px-4 bg-bg-raised border border-border/50 rounded-xl shadow-sm">
      <div className={cn("p-2 rounded-lg bg-bg-base border border-border/50", color)}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{title}</span>
    </div>
  );
}

function BlueprintCell({ value, onChange, placeholder, border }: { value: string; onChange: (val: string) => void; placeholder: string; border?: string }) {
  return (
    <div className={cn(
      "h-20 p-3 bg-bg-surface border rounded-xl transition-all hover:bg-bg-base group/cell relative",
      border || "border-border/30"
    )}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-transparent border-none text-[11px] font-medium resize-none focus:ring-0 p-0 leading-snug scrollbar-none"
      />
    </div>
  );
}
