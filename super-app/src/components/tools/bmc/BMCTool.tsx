"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, Users, Target, Zap, 
  Truck, Heart, Briefcase, Factory, DollarSign, Wallet 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BMCToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function BMCTool({ tool, progress, onDataSaved, submissionId }: BMCToolProps) {
    const initialData = progress?.data || {
        keyPartners: "",
        keyActivities: "",
        keyResources: "",
        valueProps: "",
        customerRelationships: "",
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
                toast.success("BMC saved!")
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
        { id: 'keyPartners', label: 'Key Partners', icon: Briefcase, color: 'text-blue-500', col: 'col-span-2 row-span-2', hint: 'Who are our key partners?' },
        { id: 'keyActivities', label: 'Key Activities', icon: Factory, color: 'text-yellow-500', col: 'col-span-2', hint: 'What key activities do we require?' },
        { id: 'keyResources', label: 'Key Resources', icon: Zap, color: 'text-orange-500', col: 'col-span-2', hint: 'What key resources do we require?' },
        { id: 'valueProps', label: 'Value Propositions', icon: Target, color: 'text-red-500', col: 'col-span-2 row-span-2', hint: 'What value do we deliver?' },
        { id: 'customerRelationships', label: 'Customer Relations', icon: Heart, color: 'text-pink-500', col: 'col-span-2', hint: 'How do we interact?' },
        { id: 'channels', label: 'Channels', icon: Truck, color: 'text-emerald-500', col: 'col-span-2', hint: 'How do we reach them?' },
        { id: 'customerSegments', label: 'Customer Segments', icon: Users, color: 'text-cyan-500', col: 'col-span-2 row-span-2', hint: 'Who are we creating value for?' },
        { id: 'costStructure', label: 'Cost Structure', icon: Wallet, color: 'text-indigo-500', col: 'col-span-5', hint: 'What are the most important costs?' },
        { id: 'revenueStreams', label: 'Revenue Streams', icon: DollarSign, color: 'text-green-500', col: 'col-span-5', hint: 'For what value are they willing to pay?' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Business <span className="text-accent">Model Canvas</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Global standard for describing & visualizing business models</p>
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
                        Save BMC
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
