"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Users, 
  Target, 
  TrendingUp, 
  Info, 
  Save, 
  DollarSign, 
  PieChart,
  BarChart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

export default function MarketSizing({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [data, setData] = useState({
    tam: { value: 1000000000, description: "Total addressable market globally", unit: "dollars" },
    sam: { value: 100000000, description: "Serviceable market in target regions", unit: "dollars" },
    som: { value: 10000000, description: "Target market share in year 1-3", unit: "dollars" },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, data);
      toast.success("Market sizing saved successfully");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  const updateValue = (key: keyof typeof data, val: string) => {
    const num = parseFloat(val) || 0;
    setData(prev => ({
      ...prev,
      [key]: { ...prev[key], value: num }
    }));
  };

  const updateDesc = (key: keyof typeof data, val: string) => {
    setData(prev => ({
      ...prev,
      [key]: { ...prev[key], description: val }
    }));
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toString();
  };

  // Percentages for visualization
  const samPercent = (data.sam.value / data.tam.value) * 100;
  const somPercent = (data.som.value / data.sam.value) * 100;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Market <span className="text-accent">Sizing</span></h2>
          <p className="text-text-muted font-medium">Quantify your Total, Serviceable, and Obtainable market opportunity.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Analysis</>}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <MarketLevelInput 
            label="TAM (Total Addressable Market)"
            subtitle="The total market demand for your product or service."
            icon={<Globe className="w-5 h-5 text-accent" />}
            value={data.tam.value}
            description={data.tam.description}
            onChangeValue={(val) => updateValue('tam', val)}
            onChangeDesc={(val) => updateDesc('tam', val)}
          />
          <MarketLevelInput 
            label="SAM (Serviceable Addressable Market)"
            subtitle="The portion of TAM that is within your reach (region, segment)."
            icon={<Target className="w-5 h-5 text-success" />}
            value={data.sam.value}
            description={data.sam.description}
            onChangeValue={(val) => updateValue('sam', val)}
            onChangeDesc={(val) => updateDesc('sam', val)}
          />
          <MarketLevelInput 
            label="SOM (Serviceable Obtainable Market)"
            subtitle="The portion of SAM you can realistically capture in the short term."
            icon={<Users className="w-5 h-5 text-warning" />}
            value={data.som.value}
            description={data.som.description}
            onChangeValue={(val) => updateValue('som', val)}
            onChangeDesc={(val) => updateDesc('som', val)}
          />
        </div>

        {/* Visual Comparison */}
        <div className="space-y-6">
          <Card className="bg-bg-raised border-border/50 h-full">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <PieChart className="w-4 h-4 text-accent" /> Market Visualizer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center space-y-12 h-[500px]">
              <div className="relative size-80 flex items-center justify-center">
                {/* TAM Circle */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 rounded-full bg-accent/5 border-2 border-accent/20 flex items-start justify-center pt-8"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">TAM</span>
                </motion.div>

                {/* SAM Circle */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: Math.max(0.3, data.sam.value / data.tam.value), opacity: 1 }}
                  className="absolute rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center"
                  style={{ width: '70%', height: '70%' }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-success">SAM</span>
                </motion.div>

                {/* SOM Circle */}
                <motion.div 
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: Math.max(0.15, data.som.value / data.tam.value), opacity: 1 }}
                  className="absolute rounded-full bg-warning/20 border-2 border-warning/40 flex items-center justify-center"
                  style={{ width: '40%', height: '40%' }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-warning">SOM</span>
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full">
                <StatCard label="SAM / TAM" value={`${samPercent.toFixed(1)}%`} color="text-success" />
                <StatCard label="SOM / SAM" value={`${somPercent.toFixed(1)}%`} color="text-warning" />
                <StatCard label="Annual Opportunity" value={`$${formatCurrency(data.som.value)}`} color="text-text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface MarketLevelInputProps {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  value: number;
  description: string;
  onChangeValue: (val: string) => void;
  onChangeDesc: (val: string) => void;
}

function MarketLevelInput({ 
  label, 
  subtitle, 
  icon, 
  value, 
  description, 
  onChangeValue, 
  onChangeDesc 
}: MarketLevelInputProps) {
  return (
    <Card className="bg-bg-surface border-border/50 overflow-hidden group">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-bg-base border border-border/50 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider">{label}</h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-tight">{subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Value ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <Input 
                type="number"
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                className="pl-8 h-10 bg-bg-base border-none font-bold"
              />
            </div>
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Calculation / Logic</Label>
            <Input 
              value={description}
              onChange={(e) => onChangeDesc(e.target.value)}
              placeholder="e.g. 50M users x $20 ARPU..."
              className="h-10 bg-bg-base border-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="bg-bg-base p-4 rounded-2xl border border-border/30 text-center space-y-1">
      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{label}</p>
      <p className={cn("text-lg font-black", color)}>{value}</p>
    </div>
  );
}
