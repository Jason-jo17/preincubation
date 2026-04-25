"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Save, 
  DollarSign, 
  PieChart as PieChartIcon,
  TrendingUp,
  Briefcase,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Stakeholder {
  id: string;
  name: string;
  shares: number;
  type: 'founder' | 'investor' | 'employee' | 'option-pool';
}

export default function CapTable({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { id: "1", name: "Founder 1", shares: 4000000, type: 'founder' },
    { id: "2", name: "Founder 2", shares: 4000000, type: 'founder' },
    { id: "3", name: "Option Pool", shares: 1000000, type: 'option-pool' },
    { id: "4", name: "Angel Investor", shares: 1000000, type: 'investor' },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const totalShares = stakeholders.reduce((acc, s) => acc + s.shares, 0);

  const addStakeholder = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setStakeholders([...stakeholders, { id, name: "New Stakeholder", shares: 0, type: 'investor' }]);
  };

  const updateStakeholder = (id: string, updates: Partial<Stakeholder>) => {
    setStakeholders(stakeholders.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeStakeholder = (id: string) => {
    setStakeholders(stakeholders.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { stakeholders });
      toast.success("Cap table saved successfully");
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
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Cap Table <span className="text-accent">Builder</span></h2>
          <p className="text-text-muted font-medium">Model your equity distribution and ownership structure.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Cap Table</>}
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Stakeholder List */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="bg-bg-raised border-border/50 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-bg-base/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" /> Shareholder Registry
              </CardTitle>
              <Button size="sm" onClick={addStakeholder} className="h-8 gap-2 bg-accent hover:bg-accent/90 text-[10px] font-black uppercase">
                <UserPlus className="w-3.5 h-3.5" /> Add Shareholder
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Name</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Type</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Shares</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Ownership</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {stakeholders.map((s) => (
                    <tr key={s.id} className="group hover:bg-bg-base/30 transition-colors">
                      <td className="p-4">
                        <Input 
                          value={s.name} 
                          onChange={(e) => updateStakeholder(s.id, { name: e.target.value })}
                          className="h-8 border-none bg-transparent p-0 font-bold text-sm focus:ring-0"
                        />
                      </td>
                      <td className="p-4">
                        <select 
                          value={s.type}
                          onChange={(e) => updateStakeholder(s.id, { type: e.target.value as any })}
                          className="bg-bg-surface border border-border/50 rounded-md text-[10px] font-black uppercase tracking-widest px-2 py-1 outline-none"
                        >
                          <option value="founder">Founder</option>
                          <option value="investor">Investor</option>
                          <option value="employee">Employee</option>
                          <option value="option-pool">Option Pool</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <Input 
                          type="number"
                          value={s.shares}
                          onChange={(e) => updateStakeholder(s.id, { shares: parseInt(e.target.value) || 0 })}
                          className="h-8 border-none bg-bg-base/50 px-2 font-mono text-sm w-32"
                        />
                      </td>
                      <td className="p-4 text-right font-black text-accent text-sm">
                        {totalShares > 0 ? ((s.shares / totalShares) * 100).toFixed(2) : "0.00"}%
                      </td>
                      <td className="p-4">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeStakeholder(s.id)}
                          className="text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity size-8"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-bg-base/50 font-black">
                    <td className="p-4 text-sm" colSpan={2}>Total Outstanding</td>
                    <td className="p-4 text-sm font-mono">{totalShares.toLocaleString()}</td>
                    <td className="p-4 text-right text-sm">100.00%</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-bg-raised border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-accent" /> Allocation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <AllocationBar 
                  label="Founders" 
                  percent={calculateTypePercent(stakeholders, 'founder', totalShares)} 
                  color="bg-accent" 
                />
                <AllocationBar 
                  label="Investors" 
                  percent={calculateTypePercent(stakeholders, 'investor', totalShares)} 
                  color="bg-success" 
                />
                <AllocationBar 
                  label="Option Pool" 
                  percent={calculateTypePercent(stakeholders, 'option-pool', totalShares)} 
                  color="bg-warning" 
                />
                <AllocationBar 
                  label="Employees" 
                  percent={calculateTypePercent(stakeholders, 'employee', totalShares)} 
                  color="bg-info" 
                />
              </div>

              <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
                <div className="bg-bg-base p-4 rounded-2xl border border-border/30 text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Shareholders</p>
                  <p className="text-xl font-black text-text-primary">{stakeholders.length}</p>
                </div>
                <div className="bg-bg-base p-4 rounded-2xl border border-border/30 text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Post-Money</p>
                  <p className="text-xl font-black text-success">$ -</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function calculateTypePercent(list: Stakeholder[], type: string, total: number) {
  if (total === 0) return 0;
  const typeTotal = list.filter(s => s.type === type).reduce((acc, s) => acc + s.shares, 0);
  return (typeTotal / total) * 100;
}

function AllocationBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className={cn(color.replace('bg-', 'text-'))}>{percent.toFixed(1)}%</span>
      </div>
      <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden border border-border/30">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}
