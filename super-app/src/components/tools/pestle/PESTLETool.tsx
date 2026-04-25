"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, Globe, TrendingUp, Users, Cpu, Shield, Leaf } from "lucide-react"

interface PESTLEToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function PESTLETool({ tool, progress, onDataSaved, submissionId }: PESTLEToolProps) {
    const initialData = progress?.data || {
        political: "",
        economic: "",
        social: "",
        technological: "",
        legal: "",
        environmental: ""
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
                toast.success("PESTLE Analysis saved!")
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

    const sections = [
        { id: 'political', label: 'Political', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50/50', border: 'border-blue-100', hint: 'Tax policy, labor law, environmental law, trade restrictions, tariffs, and political stability.' },
        { id: 'economic', label: 'Economic', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50/50', border: 'border-green-100', hint: 'Economic growth, exchange rates, inflation rate, and interest rates.' },
        { id: 'social', label: 'Social', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50/50', border: 'border-purple-100', hint: 'Cultural aspects and health consciousness, population growth rate, age distribution.' },
        { id: 'technological', label: 'Technological', icon: Cpu, color: 'text-orange-500', bg: 'bg-orange-50/50', border: 'border-orange-100', hint: 'R&D activity, automation, technology incentives and the rate of technological change.' },
        { id: 'legal', label: 'Legal', icon: Shield, color: 'text-red-500', bg: 'bg-red-50/50', border: 'border-red-100', hint: 'Discrimination law, consumer law, antitrust law, employment law, and health and safety law.' },
        { id: 'environmental', label: 'Environmental', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50/50', border: 'border-emerald-100', hint: 'Ecological and environmental aspects such as weather, climate, and climate change.' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">PESTLE <span className="text-accent">Analysis</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Macro-Environmental Factor Mapping</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name (e.g. Q1 2024 Market Scan)"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Analysis
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <div key={section.id} className={`p-6 rounded-3xl border ${section.border} ${section.bg} space-y-4 group transition-all hover:shadow-xl hover:shadow-black/5`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl bg-white border ${section.border} ${section.color}`}>
                                <section.icon className="w-5 h-5" />
                            </div>
                            <Label className="text-sm font-black uppercase tracking-[0.2em]">{section.label}</Label>
                        </div>
                        <Textarea
                            placeholder={`Analyze ${section.label.toLowerCase()} factors...`}
                            value={(data as any)[section.id]}
                            onChange={(e) => setData({ ...data, [section.id]: e.target.value })}
                            className="min-h-[150px] bg-white/80 border-none resize-none placeholder:text-text-muted/50 text-xs font-medium leading-relaxed custom-scrollbar"
                        />
                        <p className="text-[9px] text-text-muted font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                            {section.hint}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
