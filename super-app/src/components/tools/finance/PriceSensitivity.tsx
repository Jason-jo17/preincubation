"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  LineChart, 
  Info, 
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Tag,
  Target,
  BarChart4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

export default function PriceSensitivity({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [prices, setPrices] = useState({
    tooCheap: 50,
    bargain: 100,
    expensive: 250,
    tooExpensive: 400
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { prices });
      toast.success("Pricing analysis saved");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  const updatePrice = (field: string, value: string) => {
    const num = parseFloat(value) || 0;
    setPrices(prev => ({ ...prev, [field]: num }));
  };

  // Basic Van Westendorp logic (simplified for single user estimation)
  const range = {
    lower: prices.bargain,
    upper: prices.expensive,
    optimum: (prices.bargain + prices.expensive) / 2
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Price <span className="text-accent">Sensitivity</span></h2>
          <p className="text-text-muted font-medium">Van Westendorp methodology for finding your optimum price point.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-accent hover:bg-accent/90">
          {isSaving ? "Saving..." : <><BarChart4 className="w-4 h-4" /> Save Analysis</>}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Questions */}
        <div className="space-y-6">
          <Card className="bg-bg-surface border-border/50">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent" /> Pricing Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold">1. At what price is it too cheap? (Quality concern)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input 
                      type="number"
                      value={prices.tooCheap}
                      onChange={(e) => updatePrice('tooCheap', e.target.value)}
                      className="pl-12 h-14 bg-bg-base border-none text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">2. At what price is it a bargain?</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input 
                      type="number"
                      value={prices.bargain}
                      onChange={(e) => updatePrice('bargain', e.target.value)}
                      className="pl-12 h-14 bg-bg-base border-none text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">3. At what price is it starting to get expensive?</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input 
                      type="number"
                      value={prices.expensive}
                      onChange={(e) => updatePrice('expensive', e.target.value)}
                      className="pl-12 h-14 bg-bg-base border-none text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">4. At what price is it too expensive? (Unacceptable)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input 
                      type="number"
                      value={prices.tooExpensive}
                      onChange={(e) => updatePrice('tooExpensive', e.target.value)}
                      className="pl-12 h-14 bg-bg-base border-none text-lg font-bold"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualization & Result */}
        <div className="space-y-6">
          <Card className="bg-bg-raised border-border/50 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <Target className="w-4 h-4 text-success" /> Optimum Price Corridor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center p-8 space-y-12">
              <div className="relative h-24 bg-bg-base rounded-3xl border border-border/50 flex items-center px-8">
                {/* Visual Scale */}
                <div className="absolute inset-x-8 h-1 bg-text-muted/10 rounded-full" />
                
                {/* Range Indicators */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    left: `${(prices.bargain / prices.tooExpensive) * 100}%`,
                    width: `${((prices.expensive - prices.bargain) / prices.tooExpensive) * 100}%`
                  }}
                  className="absolute h-4 bg-success/20 rounded-full border-x-2 border-success/40"
                />

                {/* Price Points */}
                {Object.entries(prices).map(([key, val]) => (
                  <motion.div
                    key={key}
                    initial={false}
                    animate={{ left: `${(val / prices.tooExpensive) * 100}%` }}
                    className="absolute group"
                  >
                    <div className="size-3 rounded-full bg-accent border-2 border-bg-base -translate-x-1/2" />
                    <div className="absolute bottom-6 left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-bg-surface border border-border px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                      {key}: ${val}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-bg-surface border border-border/50 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Acceptable Range</p>
                  <p className="text-2xl font-black">${range.lower} - ${range.upper}</p>
                </div>
                <div className="p-6 rounded-2xl bg-accent text-bg-base shadow-xl shadow-accent/20 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Optimum Price</p>
                  <p className="text-2xl font-black">${range.optimum.toFixed(0)}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-base border border-border/50 space-y-4">
                <div className="flex items-center gap-2 text-warning">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Strategic Insight</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  Your "Indifference Price Point" is around <span className="text-text-primary font-bold">${((prices.bargain + prices.expensive) / 2).toFixed(0)}</span>. 
                  Pricing significantly above <span className="text-text-primary font-bold">${prices.tooExpensive}</span> will cause a sharp drop in conversion, regardless of perceived value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
