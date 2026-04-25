"use client"

import { useState, useCallback, useMemo } from "react"
import { 
  ReactFlow, 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Panel
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, Plus, Zap, Target, HelpCircle, Activity, Share2, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface TheoryOfChangeProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

const nodeTypes = {} // We can add custom nodes later

export function TheoryOfChangeTool({ tool, progress, onDataSaved, submissionId }: TheoryOfChangeProps) {
    const initialNodes: Node[] = progress?.data?.nodes || [
        { id: '1', type: 'input', data: { label: 'The Problem' }, position: { x: 50, y: 50 }, className: 'bg-red-500 text-white font-black uppercase rounded-xl border-none p-4 w-48 text-center' },
        { id: '2', data: { label: 'Key Activities' }, position: { x: 300, y: 50 }, className: 'bg-blue-500 text-white font-black uppercase rounded-xl border-none p-4 w-48 text-center' },
        { id: '3', type: 'output', data: { label: 'Social Impact' }, position: { x: 550, y: 50 }, className: 'bg-green-500 text-white font-black uppercase rounded-xl border-none p-4 w-48 text-center' },
    ]
    const initialEdges: Edge[] = progress?.data?.edges || [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
    ]

    const [nodes, setNodes] = useState<Node[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [saving, setSaving] = useState(false)
    const [nodeLabel, setNodeLabel] = useState("")

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    )
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        []
    )

    const addNode = (type: 'problem' | 'activity' | 'outcome' | 'impact') => {
        const id = `${nodes.length + 1}`
        const config = {
            problem: { color: 'bg-red-500', label: 'Problem' },
            activity: { color: 'bg-blue-500', label: 'Activity' },
            outcome: { color: 'bg-orange-500', label: 'Outcome' },
            impact: { color: 'bg-green-500', label: 'Impact' },
        }[type]

        const newNode: Node = {
            id,
            data: { label: nodeLabel || config.label },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            className: `${config.color} text-white font-black uppercase rounded-xl border-none p-4 w-48 text-center shadow-lg`,
        }
        setNodes((nds) => nds.concat(newNode))
        setNodeLabel("")
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, { nodes, edges }, {
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

    return (
        <div className="space-y-8 h-[800px] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Theory <span className="text-accent">of Change</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Map your social & economic impact logic</p>
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
                        Save Flow
                    </Button>
                </div>
            </div>

            <div className="flex-1 bg-bg-surface border border-border rounded-[40px] overflow-hidden relative shadow-2xl">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    colorMode="light"
                >
                    <Background color="#eee" gap={20} />
                    <Controls />
                    <Panel position="top-left" className="bg-white/80 backdrop-blur border border-border p-4 rounded-3xl space-y-4 shadow-xl m-4 w-64">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest">Quick Add Node</Label>
                            <Input 
                                placeholder="Label..." 
                                value={nodeLabel}
                                onChange={(e) => setNodeLabel(e.target.value)}
                                className="h-8 text-xs font-bold"
                            />
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Button size="sm" onClick={() => addNode('problem')} className="h-8 bg-red-500 text-[9px] font-black uppercase tracking-tighter">Problem</Button>
                                <Button size="sm" onClick={() => addNode('activity')} className="h-8 bg-blue-500 text-[9px] font-black uppercase tracking-tighter">Activity</Button>
                                <Button size="sm" onClick={() => addNode('outcome')} className="h-8 bg-orange-500 text-[9px] font-black uppercase tracking-tighter">Outcome</Button>
                                <Button size="sm" onClick={() => addNode('impact')} className="h-8 bg-green-500 text-[9px] font-black uppercase tracking-tighter">Impact</Button>
                            </div>
                         </div>
                         <div className="pt-4 border-t border-border/50">
                             <p className="text-[9px] text-text-muted font-bold leading-tight uppercase tracking-tighter opacity-50">
                                Drag nodes to reposition. Connect circles to map causality.
                             </p>
                         </div>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    )
}
