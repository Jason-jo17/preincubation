"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Save, 
    TrendingUp, 
    Users, 
    Zap, 
    Repeat, 
    Share2, 
    DollarSign,
    ArrowDownRight,
    Activity,
    Info,
    ChevronRight,
    BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"
import { AARRRData, FunnelStage } from "./types"
import { cn } from "@/lib/utils"

const INITIAL_DATA: AARRRData = {
    acquisition: { name: "Acquisition", description: "How do users find you?", count: 0, metrics: "" },
    activation: { name: "Activation", description: "Do users have a great first experience?", count: 0, metrics: "" },
    retention: { name: "Retention", description: "Do users come back?", count: 0, metrics: "" },
    referral: { name: "Referral", description: "Do users tell others?", count: 0, metrics: "" },
    revenue: { name: "Revenue", description: "How do you make money?", count: 0, metrics: "" },
    currency: "USD",
    lastUpdated: new Date().toISOString()
}

interface AARRRFunnelProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function AARRRFunnel({ tool, progress, onDataSaved, readOnly = false }: AARRRFunnelProps) {
    const [data, setData] = useState<AARRRData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)

    const updateStage = (stage: keyof Omit<AARRRData, "currency" | "lastUpdated">, updates: Partial<FunnelStage>) => {
        setData(prev => ({
            ...prev,
            [stage]: { ...prev[stage], ...updates }
        }))
    }

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Pirate Metrics saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save metrics")
        } finally {
            setSaving(false)
        }
    }

    const funnelStages = [
        { id: "acquisition" as const, icon: Users, color: "bg-blue-500", text: "text-blue-500" },
        { id: "activation" as const, icon: Zap, color: "bg-emerald-500", text: "text-emerald-500" },
        { id: "retention" as const, icon: Repeat, color: "bg-amber-500", text: "text-amber-500" },
        { id: "referral" as const, icon: Share2, color: "bg-purple-500", text: "text-purple-500" },
        { id: "revenue" as const, icon: DollarSign, color: "bg-rose-500", text: "text-rose-500" }
    ]

    const conversions = useMemo(() => {
        const results: number[] = []
        for (let i = 0; i < funnelStages.length - 1; i++) {
            const current = data[funnelStages[i].id].count
            const next = data[funnelStages[i+1].id].count
            results.push(current > 0 ? (next / current) * 100 : 0)
        }
        return results
    }, [data])

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                        Pirate <span className="text-accent">Metrics</span> <span className="text-slate-400 opacity-50">(AARRR)</span>
                    </h2>
                    <p className="text-slate-500 font-medium">Map your growth engine and identify funnel bottlenecks.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={handleSave} 
                        disabled={saving || readOnly}
                        className="h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-black uppercase italic tracking-widest shadow-lg shadow-accent/20 transition-all"
                    >
                        {saving ? <Activity className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                        Save Funnel
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Funnel Column */}
                <div className="lg:col-span-5 space-y-4">
                    <Card className="border-none bg-slate-50 p-8 rounded-[40px] flex flex-col items-center">
                        <div className="w-full space-y-2 relative">
                            {funnelStages.map((stage, idx) => {
                                const width = 100 - (idx * 15)
                                return (
                                    <React.Fragment key={stage.id}>
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${width}%` }}
                                            className="mx-auto relative group"
                                        >
                                            <div className={cn(
                                                "h-20 rounded-2xl flex items-center justify-between px-6 shadow-sm border-2 border-white transition-all group-hover:scale-[1.02]",
                                                stage.color
                                            )}>
                                                <div className="flex items-center gap-3 text-white">
                                                    <stage.icon className="w-6 h-6" />
                                                    <span className="font-black uppercase italic tracking-wider text-sm">{data[stage.id].name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-black text-white">{data[stage.id].count.toLocaleString()}</div>
                                                    <div className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Users</div>
                                                </div>
                                            </div>

                                            {/* Dropoff Indicator */}
                                            {idx < funnelStages.length - 1 && (
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                                                    <div className="bg-white px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5">
                                                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                                                        <span className="text-[10px] font-black text-slate-600">{conversions[idx].toFixed(1)}% Conversion</span>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                        {idx < funnelStages.length - 1 && <div className="h-4" />}
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </Card>

                    {/* Funnel Insights Card */}
                    <Card className="rounded-[32px] border-none bg-gradient-to-br from-indigo-900 to-indigo-800 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg font-black uppercase italic tracking-tight">Funnel <span className="text-accent">Efficiency</span></CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Total Efficiency</span>
                                    <div className="text-4xl font-black italic">
                                        {(data.acquisition.count > 0 ? (data.revenue.count / data.acquisition.count) * 100 : 0).toFixed(2)}%
                                    </div>
                                </div>
                                <BarChart3 className="w-8 h-8 text-accent" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-1">Top Bottleneck</div>
                                    <div className="font-black uppercase italic text-sm text-accent">
                                        {funnelStages[conversions.indexOf(Math.min(...conversions.filter(c => c > 0)))]?.id || "N/A"}
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-1">Revenue/User</div>
                                    <div className="font-black uppercase italic text-sm text-emerald-400">
                                        {data.revenue.count > 0 ? `$${(data.revenue.count / 10).toFixed(2)}` : "$0.00"}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Input Controls Column */}
                <div className="lg:col-span-7 space-y-6">
                    {funnelStages.map((stage) => (
                        <Card key={stage.id} className="rounded-[24px] border-2 border-slate-100 hover:border-accent/20 transition-all overflow-hidden group">
                            <div className={cn("h-1 w-full", stage.color)}></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <stage.icon className={cn("w-5 h-5", stage.text)} />
                                        <CardTitle className="text-xl font-black uppercase italic tracking-tight">{data[stage.id].name}</CardTitle>
                                    </div>
                                    <CardDescription className="text-[10px] font-medium leading-relaxed">{data[stage.id].description}</CardDescription>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <Input 
                                        type="number"
                                        value={data[stage.id].count}
                                        onChange={(e) => updateStage(stage.id, { count: parseInt(e.target.value) || 0 })}
                                        className="w-32 h-12 text-right font-black text-lg rounded-xl border-2 group-hover:border-accent/30 transition-colors"
                                    />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Monthly Volume</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Core Metrics / Channels</label>
                                        <div className="flex items-center gap-1 text-[8px] font-bold text-accent uppercase tracking-tighter">
                                            <Activity className="w-3 h-3" /> Realtime tracking
                                        </div>
                                    </div>
                                    <Input 
                                        value={data[stage.id].metrics}
                                        onChange={(e) => updateStage(stage.id, { metrics: e.target.value })}
                                        placeholder={`e.g. ${stage.id === 'acquisition' ? 'SEO, LinkedIn, Referrals' : 'Email Opens, Signups, etc'}`}
                                        className="rounded-xl border-2 h-10 text-sm font-medium"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="p-6 bg-slate-50 rounded-[24px] border-2 border-dashed border-slate-200 flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                            <Info className="w-5 h-5 text-accent" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-black uppercase italic tracking-tight text-sm">Strategic Tip</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Pirate Metrics are designed to highlight the **weakest link**. If your Activation is low, pouring more money into Acquisition is "leaky bucket" marketing. Focus on the stage with the sharpest drop-off first.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
