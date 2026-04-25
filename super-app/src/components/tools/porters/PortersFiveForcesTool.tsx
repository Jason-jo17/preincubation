"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, Sword, Truck, ShoppingCart, Repeat, DoorOpen } from "lucide-react"

interface PortersFiveForcesToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function PortersFiveForcesTool({ tool, progress, onDataSaved, submissionId }: PortersFiveForcesToolProps) {
    const initialData = progress?.data || {
        rivalry: "",
        supplierPower: "",
        buyerPower: "",
        substitution: "",
        newEntry: ""
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

    const forces = [
        { id: 'rivalry', label: 'Competitive Rivalry', icon: Sword, color: 'text-red-500', bg: 'bg-red-50/30', hint: 'Number and capability of competitors? Quality differences? Switching costs? Customer loyalty?' },
        { id: 'supplierPower', label: 'Supplier Power', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50/30', hint: 'Number and size of suppliers? Uniqueness of service? Your ability to substitute?' },
        { id: 'buyerPower', label: 'Buyer Power', icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-50/30', hint: 'Number of customers? Size of each order? Differences between competitors? Price sensitivity?' },
        { id: 'substitution', label: 'Threat of Substitution', icon: Repeat, color: 'text-purple-500', bg: 'bg-purple-50/30', hint: 'Substitute performance? Cost of change? Potential for buyers to switch?' },
        { id: 'newEntry', label: 'Threat of New Entry', icon: DoorOpen, color: 'text-orange-500', bg: 'bg-orange-50/30', hint: 'Time and cost of entry? Specialist knowledge? Economies of scale? Barriers to entry?' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Porter's <span className="text-accent">Five Forces</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Industry Competitiveness Analysis</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Industry Sector (e.g. Fintech SaaS)"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Forces
                    </Button>
                </div>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
                {/* Central Circle */}
                <div className="absolute z-10 w-48 h-48 rounded-full bg-white border-4 border-accent flex items-center justify-center text-center p-4 shadow-2xl">
                    <span className="text-sm font-black uppercase tracking-widest">Market Industry Rivalry</span>
                </div>

                {/* Satellite Sections */}
                {forces.map((force, idx) => {
                    if (force.id === 'rivalry') return null;
                    
                    const positions = [
                        "top-0 left-0",
                        "top-0 right-0",
                        "bottom-0 left-0",
                        "bottom-0 right-0"
                    ];
                    
                    return (
                        <div key={force.id} className={`absolute w-[45%] h-[45%] ${positions[idx-1]} p-6 rounded-[3rem] border border-text-muted/10 ${force.bg} group`}>
                            <div className="flex items-center gap-3 mb-3">
                                <force.icon className={`w-5 h-5 ${force.color}`} />
                                <Label className="text-xs font-black uppercase tracking-widest">{force.label}</Label>
                            </div>
                            <Textarea
                                placeholder={`Analyze ${force.label.toLowerCase()}...`}
                                value={(data as any)[force.id]}
                                onChange={(e) => setData({ ...data, [force.id]: e.target.value })}
                                className="h-[70%] bg-white/50 border-none resize-none text-xs font-medium custom-scrollbar"
                            />
                            <p className="mt-2 text-[8px] text-text-muted font-bold uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                                {force.hint}
                            </p>
                        </div>
                    )
                })}

                {/* Rivalry Box (Overlaying Central Circle or separate) */}
                <div className="absolute z-20 w-[300px] mt-64 p-4 rounded-2xl bg-white border-2 border-red-200 shadow-xl">
                     <div className="flex items-center gap-3 mb-2">
                        <Sword className="w-4 h-4 text-red-500" />
                        <Label className="text-[10px] font-black uppercase tracking-widest">Rivalry Intensity</Label>
                    </div>
                    <Textarea
                        placeholder="Analyze internal rivalry..."
                        value={data.rivalry}
                        onChange={(e) => setData({ ...data, rivalry: e.target.value })}
                        className="h-24 bg-red-50/50 border-none resize-none text-[11px] font-medium"
                    />
                </div>
            </div>
        </div>
    )
}
