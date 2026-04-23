"use client"

import React, { useState } from 'react'
import {
  Settings2,
  Plus,
  Trash2,
  Save,
  Wand2,
  ChevronDown,
  LayoutGrid,
  Download
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { SPRINT_REGISTRY } from "@/lib/sprint-registry"

export const MentorSprintBuilder = () => {
  const [sprintConfig, setSprintConfig] = useState<any>({
    sprintNumber: 1,
    name: 'Custom Discovery Sprint',
    weekRange: 'Week 1-2',
    tools: []
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const availableTools = Array.from(new Set(
    SPRINT_REGISTRY.flatMap(s => s.tools.map(t => ({ id: t.toolId, name: t.toolName })))
  )).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

  const addTool = (tool: any) => {
    if (sprintConfig.tools.find((t: any) => t.toolId === tool.id)) return
    setSprintConfig({
      ...sprintConfig,
      tools: [...sprintConfig.tools, {
        toolId: tool.id,
        toolName: tool.name,
        isGateLevel: false,
        trlContribution: 'TRL +1',
        resources: [] // Initialize resources array
      }]
    })
  }

  const removeTool = (toolId: string) => {
    setSprintConfig((prev: any) => ({
      ...prev,
      tools: prev.tools.filter((t: any) => t.toolId !== toolId)
    }))
  }

  const addResource = (toolId: string) => {
    setSprintConfig((prev: any) => ({
      ...prev,
      tools: prev.tools.map((t: any) =>
        t.toolId === toolId
          ? { ...t, resources: [...(t.resources || []), { title: "", url: "", type: "document" }] }
          : t
      )
    }))
  }

  const updateResource = (toolId: string, index: number, field: string, value: string) => {
    setSprintConfig((prev: any) => ({
      ...prev,
      tools: prev.tools.map((t: any) =>
        t.toolId === toolId
          ? { ...t, resources: t.resources.map((r: any, i: number) => (i === index ? { ...r, [field]: value } : r)) }
          : t
      )
    }))
  }

  const removeResource = (toolId: string, index: number) => {
    setSprintConfig((prev: any) => ({
      ...prev,
      tools: prev.tools.map((t: any) =>
        t.toolId === toolId
          ? { ...t, resources: t.resources.filter((_: any, i: number) => i !== index) }
          : t
      )
    }))
  }

  const toggleGate = (toolId: string) => {
    setSprintConfig({
      ...sprintConfig,
      tools: sprintConfig.tools.map((t: any) =>
        t.toolId === toolId ? { ...t, isGateLevel: !t.isGateLevel } : t
      )
    })
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/manager/sprint-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sprintConfig)
      })
      if (res.ok) {
        alert("Sprint Pattern Saved Successfully!")
      } else {
        alert("Failed to save sprint pattern.")
      }
    } catch (err) {
      console.error("Save error:", err)
    }
  }

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sprintConfig, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href",     dataStr)
    downloadAnchorNode.setAttribute("download", `sprint_${sprintConfig.sprintNumber}_${sprintConfig.name.replace(/\s+/g, '_').toLowerCase()}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleAISuggestion = async () => {
    try {
      setIsGenerating(true)
      const res = await fetch('/api/manager/sprint-suggester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focusArea: "General Startup Discovery", targetTRL: "1-3" })
      })
      const data = await res.json()
      if (data.success && data.sprintConfig) {
        setSprintConfig({
            ...sprintConfig,
            name: data.sprintConfig.name || 'AI Generated Sprint',
            weekRange: data.sprintConfig.weekRange || 'Week 1-2',
            tools: data.sprintConfig.tools || []
        })
      } else {
        alert("AI Generation failed: " + (data.error || "Unknown error"))
      }
    } catch (err: any) {
      console.error(err)
      alert("AI Generation failed: " + err?.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="shadow-xl border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-white shadow-lg">
              <Settings2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">Mentor Sprint Builder</CardTitle>
              <CardDescription>Assemble precision roadmap combinations for specific cohorts.</CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 font-bold uppercase tracking-widest text-xs h-10"
            onClick={handleAISuggestion}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <><Wand2 className="h-4 w-4" /> AI Suggestion</>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-muted-foreground">Sprint Name</Label>
            <Input
              value={sprintConfig.name}
              onChange={(e) => setSprintConfig({ ...sprintConfig, name: e.target.value })}
              className="font-bold text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-muted-foreground">Sequence Number</Label>
            <Select
              value={String(sprintConfig.sprintNumber)}
              onValueChange={(v) => setSprintConfig({ ...sprintConfig, sprintNumber: parseInt(v) })}
            >
              <SelectTrigger className="font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <SelectItem key={n} value={String(n)}>Sprint {n}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-muted-foreground">Duration Label</Label>
            <Input
              value={sprintConfig.weekRange}
              onChange={(e) => setSprintConfig({ ...sprintConfig, weekRange: e.target.value })}
              className="font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Tool Selector */}
          <div className="md:col-span-4 bg-muted/40 rounded-xl border p-4 space-y-4 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="h-4 w-4 text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tool Registry</h4>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {availableTools.map((tool: any) => (
                <button
                  key={tool.id}
                  onClick={() => addTool(tool)}
                  className="p-3 text-left rounded-lg bg-background border hover:border-primary transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-bold truncate pr-4">{tool.name}</span>
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Assembly Line */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sprint Assembly Line</h4>
              <Badge variant="secondary">{sprintConfig.tools.length} Tools Selected</Badge>
            </div>

            <div className="space-y-3 min-h-[300px] border-2 border-dashed border-muted rounded-xl p-4 flex flex-col items-center">
              {sprintConfig.tools.length === 0 ? (
                <div className="m-auto text-center opacity-40">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center m-auto mb-4">
                    <Plus className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-black uppercase italic">Drop Tools Here to Build Pipeline</p>
                </div>
              ) : (
                <div className="w-full space-y-2">
                  {sprintConfig.tools.map((tool: any, idx: number) => (
                    <div
                      key={tool.toolId}
                      className="p-4 rounded-xl bg-card border-2 shadow-sm flex items-center gap-4 group animate-in slide-in-from-left duration-200"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">
                        {idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h6 className="font-bold text-sm tracking-tight">{tool.toolName}</h6>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 opacity-70">
                            <Checkbox
                              id={`gate-${tool.toolId}`}
                              checked={tool.isGateLevel}
                              onCheckedChange={() => toggleGate(tool.toolId)}
                              className="h-3 w-3"
                            />
                            <label htmlFor={`gate-${tool.toolId}`} className="text-[10px] font-black uppercase cursor-pointer">
                              Mark as Gate Priority
                            </label>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground italic">
                            {tool.trlContribution}
                          </span>
                        </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => removeTool(tool.toolId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Resources Section Added */}
                      <div className="w-full mt-4 pt-4 border-t col-span-full">
                        <div className="flex justify-between items-center mb-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground">Learning Resources</Label>
                            <Button variant="outline" size="sm" onClick={() => addResource(tool.toolId)} className="h-6 text-[10px]">
                                <Plus className="h-3 w-3 mr-1" /> Add Resource
                            </Button>
                        </div>
                        {tool.resources?.map((res: any, rIdx: number) => (
                            <div key={rIdx} className="flex flex-col md:flex-row gap-2 mb-2 items-center bg-muted/20 p-2 rounded-md border w-full">
                                <Select value={res.type} onValueChange={(v) => updateResource(tool.toolId, rIdx, 'type', v)}>
                                    <SelectTrigger className="w-[120px] h-8 text-xs font-bold"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="video">YouTube Video</SelectItem>
                                        <SelectItem value="webview">Web View</SelectItem>
                                        <SelectItem value="document">Readable Doc</SelectItem>
                                        <SelectItem value="link">External Link</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input className="h-8 text-xs flex-1 bg-background" placeholder="Resource Title" value={res.title} onChange={(e) => updateResource(tool.toolId, rIdx, 'title', e.target.value)} />
                                <Input className="h-8 text-xs flex-1 bg-background" placeholder="URL or Video ID" value={res.url} onChange={(e) => updateResource(tool.toolId, rIdx, 'url', e.target.value)} />
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeResource(tool.toolId, rIdx)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

              <p className="text-[10px] font-medium text-muted-foreground w-1/2 italic">
                Sprints built here will override default journey roadmaps for assigned students once deployed.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleExportJSON}
                  variant="outline"
                  className="font-bold uppercase tracking-widest italic h-12 gap-2 shadow-sm"
                >
                  <Download className="h-4 w-4" /> Export JSON
                </Button>
                <Button
                  onClick={handleSave}
                  className="font-black uppercase tracking-widest italic pr-6 h-12 gap-2 shadow-lg"
                >
                  <Save className="h-4 w-4" /> Save Sprint Pattern
                </Button>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "secondary" | "outline" }) {
  const styles = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground"
  }[variant]
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider", styles)}>
      {children}
    </span>
  )
}
