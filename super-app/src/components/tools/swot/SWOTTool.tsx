"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, Zap, AlertCircle, Target, ShieldAlert } from "lucide-react"

interface SWOTToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function SWOTTool({ tool, progress, onDataSaved, submissionId }: SWOTToolProps) {
    const initialData = progress?.data || {
        strengths: "",
        weaknesses: "",
        opportunities: "",
        threats: ""
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
                toast.success("SWOT Analysis saved!")
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
        { id: 'strengths', label: 'Strengths', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50/50', border: 'border-yellow-100', hint: 'What do you do well? What unique resources can you draw on? What do others see as your strengths?' },
        { id: 'weaknesses', label: 'Weaknesses', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50/50', border: 'border-red-100', hint: 'What could you improve? Where do you have fewer resources than others? What are others likely to see as weaknesses?' },
        { id: 'opportunities', label: 'Opportunities', icon: Target, color: 'text-green-500', bg: 'bg-green-50/50', border: 'border-green-100', hint: 'What good opportunities are open to you? What trends can you take advantage of? How can you turn strengths into opportunities?' },
        { id: 'threats', label: 'Threats', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50/50', border: 'border-orange-100', hint: 'What threats could harm you? What is your competition doing? What threats do your weaknesses expose you to?' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">SWOT <span className="text-accent">Matrix</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Internal & External Strategic Audit</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name (e.g. Launch Strategy v1)"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save SWOT
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-text-muted/10 rounded-[40px] overflow-hidden bg-bg-base shadow-2xl">
                {sections.map((section, idx) => (
                    <div key={section.id} className={`p-8 ${section.bg} border-b md:border-b-0 ${idx % 2 === 0 ? 'md:border-r' : ''} ${idx < 2 ? 'md:border-b' : ''} border-text-muted/10 space-y-4 group transition-all`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-white shadow-sm border ${section.border} ${section.color}`}>
                                <section.icon className="w-6 h-6" />
                            </div>
                            <Label className="text-lg font-black uppercase tracking-[0.3em]">{section.label}</Label>
                        </div>
                        <Textarea
                            placeholder={`Identify ${section.label.toLowerCase()}...`}
                            value={(data as any)[section.id]}
                            onChange={(e) => setData({ ...data, [section.id]: e.target.value })}
                            className="min-h-[200px] bg-white/50 border-none resize-none placeholder:text-text-muted/50 text-sm font-medium leading-relaxed custom-scrollbar shadow-inner"
                        />
                        <div className="pt-2">
                             <p className="text-[10px] text-text-muted font-bold leading-tight opacity-50 uppercase tracking-widest">
                                {section.hint}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
