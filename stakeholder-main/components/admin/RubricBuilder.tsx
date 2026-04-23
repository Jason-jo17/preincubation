'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2, Save, RotateCcw, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { SPRINT_REGISTRY, type SprintTool } from '@/lib/sprint-registry'
import { cn } from '@/lib/utils'

interface Criterion {
  id: string
  label: string
  description: string
  maxPoints: number
}

interface Rubric {
  id?: string
  toolId: string
  name: string
  criteria: Criterion[]
}

export function RubricBuilder() {
  const [rubrics, setRubrics] = useState<Rubric[]>([])
  const [selectedToolId, setSelectedToolId] = useState<string>('')
  const [name, setName] = useState('')
  const [criteria, setCriteria] = useState<Criterion[]>([])
  const [loading, setLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Get all unique tools from registry
  const allTools = SPRINT_REGISTRY.flatMap((s: any) => s.tools).sort((a: SprintTool, b: SprintTool) => a.toolName.localeCompare(b.toolName))
  
  // Dedup tools by toolId
  const uniqueTools = Array.from(new Map(allTools.map(t => [t.toolId, t])).values())

  useEffect(() => {
    fetchRubrics()
  }, [])

  const fetchRubrics = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rubrics')
      if (res.ok) {
        setRubrics(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleToolSelect = (toolId: string) => {
    setSelectedToolId(toolId)
    const existing = rubrics.find(r => r.toolId === toolId)
    if (existing) {
      setName(existing.name)
      setCriteria(existing.criteria as Criterion[])
    } else {
      const tool = uniqueTools.find(t => t.toolId === toolId)
      setName(tool?.toolName || '')
      setCriteria([
        { id: 'quality', label: 'Quality of Content', description: 'Is the content substantive and relevant?', maxPoints: 40 },
        { id: 'completeness', label: 'Completeness', description: 'Are all required sections addressed?', maxPoints: 40 },
        { id: 'specificity', label: 'Specificity', description: 'Are details concrete and evidence-based?', maxPoints: 20 },
      ])
    }
  }

  const addCriterion = () => {
    setCriteria([...criteria, { id: `c-${Date.now()}`, label: 'New Criterion', description: '', maxPoints: 10 }])
  }

  const removeCriterion = (idx: number) => {
    setCriteria(criteria.filter((_, i) => i !== idx))
  }

  const updateCriterion = (idx: number, field: keyof Criterion, value: any) => {
    const next = [...criteria]
    next[idx] = { ...next[idx], [field]: value }
    setCriteria(next)
  }

  const totalPoints = criteria.reduce((sum, c) => sum + (Number(c.maxPoints) || 0), 0)

  const handleSave = async () => {
    if (!selectedToolId || !name) {
      toast.error('Tool and Name are required')
      return
    }

    if (totalPoints !== 100) {
      if (!window.confirm(`Total points are ${totalPoints}, not 100. Save anyway?`)) return
    }

    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/rubrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: selectedToolId, name, criteria })
      })

      if (res.ok) {
        toast.success('Rubric saved successfully')
        fetchRubrics()
      } else {
        toast.error('Failed to save rubric')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Card className="lg:col-span-4 h-fit">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest">Active Rubrics</CardTitle>
          <CardDescription>Dynamic overrides in database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {loading ? (
              <p className="text-xs text-muted-foreground animate-pulse text-center py-4">Loading rubrics...</p>
            ) : rubrics.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No custom rubrics defined.</p>
            ) : (
              rubrics.map(r => (
                <div 
                  key={r.id} 
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-colors group",
                    selectedToolId === r.toolId ? "bg-primary/5 border-primary" : "hover:bg-muted"
                  )}
                  onClick={() => handleToolSelect(r.toolId)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">{r.name}</span>
                    <Badge variant="outline" className="text-[10px]">{r.toolId}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{r.criteria.length} criteria • Total {r.criteria.reduce((s, c) => s + (c as any).maxPoints, 0)} pts</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold italic tracking-tight">Rubric Designer</CardTitle>
              <CardDescription>Define points and criteria for specific tools</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setSelectedToolId(''); setName(''); setCriteria([]) }}>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving || !selectedToolId}>
                <Save className="h-4 w-4 mr-1" /> {isSaving ? 'Saving...' : 'Save Rubric'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Select Tool</Label>
              <Select onValueChange={handleToolSelect} value={selectedToolId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tool..." />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {uniqueTools.map(t => (
                    <SelectItem key={t.toolId} value={t.toolId}>{t.toolName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Display Name</Label>
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. ERRC Canvas Rubric" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Criteria Configuration</Label>
              <div className={cn(
                "flex items-center gap-2 px-2 py-1 rounded text-[10px] font-bold",
                totalPoints === 100 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                {totalPoints !== 100 && <AlertTriangle className="h-3 w-3" />}
                Total Points: {totalPoints}/100
              </div>
            </div>

            {criteria.map((c, idx) => (
              <div key={c.id} className="p-4 border-l-4 border-l-primary bg-muted/20 rounded-r-lg space-y-3 relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  onClick={() => removeCriterion(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-8">
                    <Input 
                      value={c.label} 
                      onChange={e => updateCriterion(idx, 'label', e.target.value)} 
                      className="font-bold border-none bg-transparent p-0 h-7 text-sm focus-visible:ring-0" 
                      placeholder="Criterion Label"
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground shrink-0">Max Pts</Label>
                    <Input 
                      type="number" 
                      value={c.maxPoints} 
                      onChange={e => updateCriterion(idx, 'maxPoints', parseInt(e.target.value))} 
                      className="h-8 text-right font-black italic" 
                    />
                  </div>
                </div>

                <Textarea 
                  value={c.description} 
                  onChange={e => updateCriterion(idx, 'description', e.target.value)} 
                  className="text-xs min-h-[60px] bg-background" 
                  placeholder="Describe what the manager should look for..."
                />
              </div>
            ))}

            <Button variant="outline" className="w-full border-dashed py-6 gap-2" onClick={addCriterion}>
              <Plus className="h-4 w-4" /> Add Criterion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
