"use client"

import { useState } from "react"
import { saveToolData } from '@/app/actions/roadmap'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Info, CheckCircle2, Save } from "lucide-react"

interface GenericToolFormProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    isNewIteration?: boolean
    submissionId?: string
}

export function GenericToolForm({ tool, progress, onDataSaved, isNewIteration, submissionId }: GenericToolFormProps) {
    const [content, setContent] = useState(progress?.submittedData?.content || "")
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async (asDraft = false) => {
        setIsSaving(true)
        try {
            const res = await saveToolData(
                tool.toolId,
                { content },
                {
                    submissionId: submissionId,
                    iterationName: iterationName,
                    isDraft: asDraft,
                    createNewIteration: isNewIteration
                }
            )
            if (res?.error) {
                alert(`Error saving: ${res.error}`)
            } else {
                if (onDataSaved) onDataSaved()
            }
        } catch (error) {
            console.error("Failed to save", error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white border rounded-2xl shadow-sm">
            <div className="space-y-2 border-b pb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{tool.toolName}</h2>
                <div className="flex gap-4 pt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {tool.trlContribution}
                    </span>
                    {tool.isGateLevel && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                            ★ Gate Level Tool
                        </span>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {tool.dataNeededFrom && tool.dataNeededFrom !== "None — first tool, entry point" && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
                        <Info className="h-5 w-5 text-indigo-500 shrink-0" />
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900">Context Needed</h4>
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{tool.dataNeededFrom}</p>
                        </div>
                    </div>
                )}
                
                {tool.gateCheck && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                            <h4 className="text-sm font-semibold text-emerald-900">Success Criteria</h4>
                            <p className="text-sm text-emerald-700 mt-1 leading-relaxed">{tool.gateCheck}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4 pt-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 block">Entry Name / Iteration Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Interview with Customer X"
                        className="w-full p-3 rounded-xl border bg-slate-50 border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 block">Workspace</label>
                    <Textarea
                        placeholder={`Start working on your ${tool.toolName}...`}
                        className="min-h-[250px] resize-y p-4 text-base bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="flex justify-between items-center pt-2 border-t mt-6">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        STATUS: {progress?.status === 'gate_passed' ? 'COMPLETED' : progress?.status || 'PENDING'}
                    </p>
                    <div className="flex gap-3">
                        <Button 
                            variant="outline"
                            onClick={() => handleSave(true)} 
                            disabled={isSaving} 
                            className="rounded-xl shadow-sm gap-2"
                        >
                            Save Draft
                        </Button>
                        <Button 
                            onClick={() => handleSave(false)} 
                            disabled={isSaving || !content.trim()} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {isSaving ? "Saving..." : "Submit Entry"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
