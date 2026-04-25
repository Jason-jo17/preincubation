"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, Sword, Users, RefreshCcw, 
  ArrowRightLeft, UserPlus, Info 
} from "lucide-react"
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PortersToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function PortersFiveForcesTool({ tool, progress, onDataSaved, submissionId }: PortersToolProps) {
    const initialData = progress?.data || {
        forces: {
            newEntrants: { score: 3, justification: "" },
            buyers: { score: 3, justification: "" },
            substitutes: { score: 3, justification: "" },
            suppliers: { score: 3, justification: "" },
            rivalry: { score: 3, justification: "" }
        }
    }

    const [data, setData] = useState(initialData)
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data, {
                submissionId,
                iterationName
            })
            if (res.success) {
                toast.success("Porter's Five Forces saved!")
                if (onDataSaved) onDataSaved()
            } else {
                toast.error(res.error || "Failed to save")
            }
        } catch (e) {
            toast.error("An error occurred")
        } finally {
            setSaving(false)
        }
    }

    const updateForce = (key: string, field: 'score' | 'justification', value: any) => {
        setData((prev: any) => ({
            ...prev,
            forces: {
                ...prev.forces,
                [key]: { ...prev.forces[key], [field]: value }
            }
        }))
    }

    const forces = [
        { id: 'newEntrants', label: 'New Entrants', icon: UserPlus, color: '#3b82f6', hint: 'Barriers to entry, economies of scale, brand loyalty.' },
        { id: 'buyers', label: 'Buyer Power', icon: Users, color: '#10b981', hint: 'Number of customers, size of orders, price sensitivity.' },
        { id: 'substitutes', label: 'Substitutes', icon: RefreshCcw, color: '#f59e0b', hint: 'Switching costs, relative price performance.' },
        { id: 'suppliers', label: 'Supplier Power', icon: ArrowRightLeft, color: '#8b5cf6', hint: 'Uniqueness of service, cost of changing.' },
        { id: 'rivalry', label: 'Industry Rivalry', icon: Sword, color: '#ef4444', hint: 'Number of competitors, industry growth rate.' }
    ]

    const chartData = forces.map(f => ({
        subject: f.label,
        score: data.forces[f.id].score,
        fullMark: 5
    }))

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Porter&apos;s <span className="text-accent">Five Forces</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Industry Competition Analysis</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[200px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Analysis
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Radar Panel */}
                <div className="lg:col-span-5 bg-bg-surface border border-border rounded-[40px] p-8 flex flex-col items-center justify-center shadow-xl">
                    <div className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis 
                                    dataKey="subject" 
                                    tick={{ fill: '#888', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' }} 
                                />
                                <PolarRadiusAxis 
                                    angle={30} 
                                    domain={[0, 5]} 
                                    tick={false}
                                    axisLine={false}
                                />
                                <Radar
                                    name="Intensity"
                                    dataKey="score"
                                    stroke="var(--color-accent, #3fd0c9)"
                                    fill="var(--color-accent, #3fd0c9)"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-8 text-center space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Total Competition Intensity</div>
                        <div className="text-5xl font-black tracking-tighter text-text">
                            {(Object.values(data.forces).reduce((acc: number, f: any) => acc + f.score, 0) / 5).toFixed(1)}
                        </div>
                    </div>
                </div>

                {/* Controls Panel */}
                <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {forces.map((force) => (
                        <motion.div 
                            key={force.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-bg-surface border border-border p-6 rounded-3xl space-y-4 hover:border-accent/40 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-bg-base border border-border text-accent">
                                        <force.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest">{force.label}</h3>
                                        <p className="text-[10px] text-text-muted font-bold uppercase opacity-50">{force.hint}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" min="1" max="5" step="1"
                                        value={data.forces[force.id].score}
                                        onChange={(e) => updateForce(force.id, 'score', parseInt(e.target.value))}
                                        className="accent-accent w-32"
                                    />
                                    <span className="text-2xl font-black italic tracking-tighter w-8 text-center">{data.forces[force.id].score}</span>
                                </div>
                            </div>
                            <Textarea 
                                placeholder="Strategic justification..."
                                value={data.forces[force.id].justification}
                                onChange={(e) => updateForce(force.id, 'justification', e.target.value)}
                                className="bg-bg-base/50 border-none resize-none text-xs font-medium min-h-[80px]"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
