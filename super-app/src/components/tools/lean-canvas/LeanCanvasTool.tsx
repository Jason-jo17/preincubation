"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, HelpCircle, Target, Users, 
  Zap, TrendingUp, DollarSign, ListChecks, ShieldCheck 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeanCanvasToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function LeanCanvasTool({ tool, progress, onDataSaved, submissionId }: LeanCanvasToolProps) {
    const initialData = progress?.data || {
        problem: "",
        solution: "",
        keyMetrics: "",
        uniqueValueProp: "",
        unfairAdvantage: "",
        channels: "",
        customerSegments: "",
        costStructure: "",
        revenueStreams: ""
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
                toast.success("Lean Canvas saved!")
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
        { id: 'problem', label: 'Problem', icon: HelpCircle, color: 'text-red-500', col: 'col-span-2 row-span-2', hint: 'Top 3 problems' },
        { id: 'solution', label: 'Solution', icon: Zap, color: 'text-yellow-500', col: 'col-span-2', hint: 'Top 3 features' },
        { id: 'keyMetrics', label: 'Key Metrics', icon: TrendingUp, color: 'text-blue-500', col: 'col-span-2', hint: 'Key activities you measure' },
        { id: 'uniqueValueProp', label: 'Unique Value Prop', icon: Target, color: 'text-purple-500', col: 'col-span-2 row-span-2', hint: 'Single, clear, compelling message' },
        { id: 'unfairAdvantage', label: 'Unfair Advantage', icon: ShieldCheck, color: 'text-orange-500', col: 'col-span-2', hint: 'Can’t be easily copied' },
        { id: 'channels', label: 'Channels', icon: ListChecks, color: 'text-emerald-500', col: 'col-span-2', hint: 'Path to customers' },
        { id: 'customerSegments', label: 'Customer Segments', icon: Users, color: 'text-cyan-500', col: 'col-span-2 row-span-2', hint: 'Target customers' },
        { id: 'costStructure', label: 'Cost Structure', icon: DollarSign, color: 'text-pink-500', col: 'col-span-5', hint: 'Acquisition, hosting, people' },
        { id: 'revenueStreams', label: 'Revenue Streams', icon: DollarSign, color: 'text-green-500', col: 'col-span-5', hint: 'Revenue model, lifetime value' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Lean <span className="text-accent">Canvas</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Fast, Concise & Effective Business Modeling</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Canvas
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-10 grid-rows-3 gap-2 border border-border rounded-[40px] overflow-hidden bg-bg-base shadow-2xl p-2 h-[800px]">
                {sections.map((section) => (
                    <div 
                        key={section.id} 
                        className={cn(
                            "p-6 bg-white border border-border rounded-3xl flex flex-col group transition-all hover:border-accent/40 hover:shadow-lg",
                            section.col
                        )}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={cn("p-2 rounded-xl bg-bg-base border border-border", section.color)}>
                                <section.icon size={18} />
                            </div>
                            <Label className="text-xs font-black uppercase tracking-widest">{section.label}</Label>
                        </div>
                        <Textarea
                            placeholder={section.hint}
                            value={(data as any)[section.id]}
                            onChange={(e) => setData({ ...data, [section.id]: e.target.value })}
                            className="flex-1 bg-transparent border-none resize-none text-xs font-medium leading-relaxed custom-scrollbar placeholder:opacity-30 focus-visible:ring-0 p-0"
                        />
                        <div className="mt-2 pt-2 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                             <p className="text-[9px] text-text-muted font-bold uppercase tracking-tighter">
                                {section.hint}
                             </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
