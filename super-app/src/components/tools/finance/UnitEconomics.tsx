"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Layers,
  Activity,
  Zap,
  BarChart4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { saveToolData } from "@/app/actions/roadmap";
import { toast } from "sonner";

export default function UnitEconomics({ toolId, projectId }: { toolId: string; projectId: string }) {
  const [data, setData] = useState({
    marketingSpend: 5000,
    salesCost: 3000,
    toolsCost: 1000,
    newCustomers: 100,
    arpu: 150,
    grossMargin: 70, // percentage
    churnRate: 5, // percentage
  });

  const [isSaving, setIsSaving] = useState(false);

  const stats = useMemo(() => {
    const totalSalesMarketing = data.marketingSpend + data.salesCost + data.toolsCost;
    const cac = data.newCustomers > 0 ? totalSalesMarketing / data.newCustomers : 0;
    
    const churnDecimal = data.churnRate / 100;
    const marginDecimal = data.grossMargin / 100;
    
    const ltv = churnDecimal > 0 ? (data.arpu * marginDecimal) / churnDecimal : 0;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    const paybackMonths = (data.arpu * marginDecimal) > 0 ? cac / (data.arpu * marginDecimal) : 0;

    return { cac, ltv, ltvCacRatio, paybackMonths, totalSalesMarketing };
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToolData(projectId, toolId, { 
        inputs: data,
        results: stats 
      });
      toast.success("Unit Economics data saved");
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight">Unit <span className="text-accent">Economics</span></h2>
          <p className="text-text-muted font-medium">Analyze customer profitability and venture scalability.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="gap-2 bg-accent hover:bg-accent/90"
        >
          {isSaving ? "Saving..." : <><BarChart4 className="w-4 h-4" /> Save Snapshot</>}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inputs Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-bg-surface border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" /> Acquisition (CAC)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-text-muted">Marketing Spend</Label>
                  <span className="text-xs font-bold">${data.marketingSpend.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[data.marketingSpend]} 
                  max={50000} 
                  step={500}
                  onValueChange={([v]) => updateField('marketingSpend', v)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-text-muted">Sales Salaries</Label>
                  <span className="text-xs font-bold">${data.salesCost.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[data.salesCost]} 
                  max={50000} 
                  step={500}
                  onValueChange={([v]) => updateField('salesCost', v)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-text-muted">New Customers</Label>
                <Input 
                  type="number" 
                  value={data.newCustomers} 
                  onChange={(e) => updateField('newCustomers', parseInt(e.target.value) || 0)}
                  className="bg-bg-base"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-surface border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-success" /> Retention (LTV)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs text-text-muted">ARPU (Avg Revenue/User)</Label>
                <Input 
                  type="number" 
                  value={data.arpu} 
                  onChange={(e) => updateField('arpu', parseInt(e.target.value) || 0)}
                  className="bg-bg-base"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-text-muted">Gross Margin %</Label>
                  <span className="text-xs font-bold">{data.grossMargin}%</span>
                </div>
                <Slider 
                  value={[data.grossMargin]} 
                  max={100} 
                  onValueChange={([v]) => updateField('grossMargin', v)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-text-muted">Monthly Churn %</Label>
                  <span className="text-xs font-bold">{data.churnRate}%</span>
                </div>
                <Slider 
                  value={[data.churnRate]} 
                  max={50} 
                  onValueChange={([v]) => updateField('churnRate', v)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* CAC Card */}
            <Card className="bg-bg-surface border-border shadow-xl">
              <CardContent className="p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Customer Acquisition Cost</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-5xl font-black text-accent">${stats.cac.toFixed(0)}</h3>
                  <span className="text-text-muted font-bold">/ user</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm">
                  <div className="h-2 flex-1 bg-bg-base rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '40%' }}
                      className="h-full bg-accent"
                    />
                  </div>
                  <span className="text-text-muted">Efficiency</span>
                </div>
              </CardContent>
            </Card>

            {/* LTV Card */}
            <Card className="bg-bg-surface border-border shadow-xl">
              <CardContent className="p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Lifetime Value</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-5xl font-black text-success">${stats.ltv.toFixed(0)}</h3>
                  <span className="text-text-muted font-bold">/ user</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm">
                  <div className="h-2 flex-1 bg-bg-base rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-success"
                    />
                  </div>
                  <span className="text-text-muted">Profitability</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Ratios */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className={cn(
              "border-2 transition-all duration-500",
              stats.ltvCacRatio >= 3 ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
            )}>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">LTV / CAC Ratio</p>
                    <h4 className="text-4xl font-black">{stats.ltvCacRatio.toFixed(1)}x</h4>
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl",
                    stats.ltvCacRatio >= 3 ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                  )}>
                    {stats.ltvCacRatio >= 3 ? <ArrowUpRight className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                  </div>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {stats.ltvCacRatio >= 3 
                    ? "Healthy. Your business model is scalable and generates high ROI."
                    : "Caution. Ratio below 3x suggests high acquisition costs relative to value."
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-bg-surface">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">Payback Period</p>
                    <h4 className="text-4xl font-black">{stats.paybackMonths.toFixed(1)} <span className="text-lg font-bold text-text-muted">months</span></h4>
                  </div>
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Time taken to recover acquisition costs from a customer's gross margin.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Advice */}
          <div className="p-8 rounded-3xl bg-bg-raised border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32 text-accent" />
            </div>
            <div className="relative z-10 flex gap-6 items-start">
              <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                <Info className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Venture Scalability Check</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-muted">CAC Sensitivity</h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      If your CAC increases by 20%, your payback period extends to <span className="text-text-primary font-bold">{(stats.paybackMonths * 1.2).toFixed(1)} months</span>. 
                      Focus on organic growth loops to lower dependencies on paid ads.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-muted">Churn Impact</h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Reducing churn by 1% would increase LTV to <span className="text-success font-bold">${((data.arpu * (data.grossMargin/100)) / ((data.churnRate - 1)/100)).toFixed(0)}</span>.
                      Product-market fit is the strongest lever for retention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
