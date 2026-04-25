"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, ArrowRight, Database, Play, Box, CheckCircle2, Trophy } from "lucide-react"

interface TheoryOfChangeToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function TheoryOfChangeTool({ tool, progress, onDataSaved, submissionId }: TheoryOfChangeToolProps) {
    const initialData = progress?.data || {
        inputs: "",
        activities: "",
        outputs: "",
        outcomes: "",
        impact: ""
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
                toast.success("Theory of Change saved!")
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

    const steps = [
        { id: 'inputs', label: 'Inputs', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50/50', hint: 'Resources required: funding, staff, equipment, expertise.' },
        { id: 'activities', label: 'Activities', icon: Play, color: 'text-orange-500', bg: 'bg-orange-50/50', hint: 'Actions taken: training, research, service delivery.' },
        { id: 'outputs', label: 'Outputs', icon: Box, color: 'text-purple-500', bg: 'bg-purple-50/50', hint: 'Direct products: # of people trained, reports published.' },
        { id: 'outcomes', label: 'Outcomes', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50/50', hint: 'Short-term changes: increased knowledge, behavior change.' },
        { id: 'impact', label: 'Impact', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50/50', hint: 'Long-term mission success: poverty reduction, system change.' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Theory of <span className="text-accent">Change</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Impact & Logic Modeling</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Impact Thesis (e.g. Rural Literacy Initiative)"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save ToC
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-6 relative">
                {steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-6 items-stretch group">
                        {/* Connection Line */}
                        {idx < steps.length - 1 && (
                            <div className="absolute left-[39px] top-[80px] w-[2px] h-[calc(100%-120px)] bg-text-muted/10 -z-10" />
                        )}

                        <div className="flex flex-col items-center">
                            <div className={`p-4 rounded-3xl bg-white border-2 border-text-muted/10 shadow-lg ${step.color} group-hover:border-accent transition-colors`}>
                                <step.icon className="w-10 h-10" />
                            </div>
                            {idx < steps.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-text-muted/20 mt-4 rotate-90" />
                            )}
                        </div>

                        <div className={`flex-1 p-6 rounded-[2.5rem] border border-text-muted/10 ${step.bg} space-y-3 shadow-inner`}>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-black uppercase tracking-[0.2em]">{step.label}</Label>
                                <span className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">Step 0{idx + 1}</span>
                            </div>
                            <Textarea
                                placeholder={`Define ${step.label.toLowerCase()}...`}
                                value={(data as any)[step.id]}
                                onChange={(e) => setData({ ...data, [step.id]: e.target.value })}
                                className="min-h-[100px] bg-white/50 border-none resize-none text-sm font-medium custom-scrollbar focus-visible:ring-1 ring-accent/20"
                            />
                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-tighter opacity-60">
                                {step.hint}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
