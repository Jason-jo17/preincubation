'use client';

import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Node,
  Edge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Custom Node Components ---

const BaseNode = ({ data, selected, children, color }: any) => (
  <div className={`px-4 py-3.5 rounded-2xl border-2 bg-white shadow-lg transition-all duration-300 ${
    selected ? `border-${color}-500 ring-4 ring-${color}-500/10 scale-105 shadow-2xl` : 'border-slate-100 shadow-sm'
  }`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center text-xl shadow-inner`}>
        {data.icon}
      </div>
      <div className="text-sm font-black text-slate-900 tracking-tight">{data.label}</div>
    </div>
    {children}
  </div>
);

const TriggerNode = (props: any) => (
  <BaseNode {...props} color="emerald">
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-emerald-600/60 mt-1 px-1">Start Event</div>
  </BaseNode>
);

const ActionNode = (props: any) => (
  <BaseNode {...props} color="blue">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-blue-500 border-2 border-white shadow-md" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-blue-500 border-2 border-white shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-blue-600/60 mt-1 px-1">Process Action</div>
  </BaseNode>
);

const ConditionNode = (props: any) => (
  <BaseNode {...props} color="amber">
    <Handle type="target" position={Position.Top} className="w-4 h-4 bg-amber-500 border-2 border-white rotate-45 rounded-sm shadow-md" />
    <Handle type="source" position={Position.Bottom} className="w-4 h-4 bg-amber-500 border-2 border-white rotate-45 rounded-sm shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-amber-600/60 mt-1 px-1">Logic Branch</div>
  </BaseNode>
);

const AINode = (props: any) => (
  <BaseNode {...props} color="pink">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-pink-500 border-2 border-white shadow-md" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-pink-500 border-2 border-white shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-pink-600/60 mt-1 px-1">AI Intelligence</div>
  </BaseNode>
);

const IntegrationNode = (props: any) => (
  <BaseNode {...props} color="teal">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-teal-500 border-2 border-white shadow-md" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-teal-500 border-2 border-white shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-teal-600/60 mt-1 px-1">External Service</div>
  </BaseNode>
);

const OutputNode = (props: any) => (
  <BaseNode {...props} color="purple">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-purple-500 border-2 border-white shadow-md" />
    <div className="text-[10px] uppercase font-black tracking-widest text-purple-600/60 mt-1 px-1">Result Output</div>
  </BaseNode>
);

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  ai: AINode,
  integration: IntegrationNode,
  output: OutputNode,
};

// --- Templates Data ---

export const NODE_TEMPLATES = [
  {
    category: 'Triggers',
    nodes: [
      { type: 'trigger', label: 'Manual Trigger', icon: '👆', data: { triggerType: 'manual' } },
      { type: 'trigger', label: 'Webhook', icon: '🔗', data: { triggerType: 'webhook' } },
      { type: 'trigger', label: 'Schedule', icon: '⏰', data: { triggerType: 'schedule' } },
      { type: 'trigger', label: 'File Upload', icon: '📁', data: { triggerType: 'file' } },
    ],
  },
  {
    category: 'Actions',
    nodes: [
      { type: 'action', label: 'Send Email', icon: '📧', data: { actionType: 'email' } },
      { type: 'action', label: 'Database Query', icon: '🗄️', data: { actionType: 'database' } },
      { type: 'action', label: 'API Call', icon: '🌐', data: { actionType: 'api' } },
      { type: 'action', label: 'Transform Data', icon: '🔄', data: { actionType: 'transform' } },
    ],
  },
  {
    category: 'Logic',
    nodes: [
      { type: 'condition', label: 'If / Else', icon: '🔀', data: { conditionType: 'if' } },
      { type: 'condition', label: 'Wait Delay', icon: '⏳', data: { conditionType: 'wait' } },
    ],
  },
  {
    category: 'AI Agents',
    nodes: [
      { type: 'ai', label: 'Claude Analysis', icon: '🤖', data: { aiType: 'claude' } },
      { type: 'ai', label: 'Summarization', icon: '📝', data: { aiType: 'summarize' } },
      { type: 'ai', label: 'Text Generation', icon: '✨', data: { aiType: 'generate' } },
    ],
  },
  {
    category: 'Integrations',
    nodes: [
      { type: 'integration', label: 'WhatsApp API', icon: '💬', data: { service: 'whatsapp' } },
      { type: 'integration', label: 'Google Sheets', icon: '📊', data: { service: 'gsheets' } },
      { type: 'integration', label: 'n8n Workflow', icon: '🔧', data: { service: 'n8n' } },
    ],
  },
];

// --- Main Component ---

interface FlowBuilderProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onChange?: (flow: string) => void;
  readOnly?: boolean;
}

export function FlowBuilder({ 
  initialNodes = [], 
  initialEdges = [],
  onChange,
  readOnly = false 
}: FlowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `e-${nodes.length}-${edges.length}`,
        animated: true,
        style: { stroke: '#f59e0b', strokeWidth: 3 },
        markerEnd: { 
          type: MarkerType.ArrowClosed,
          color: '#f59e0b',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds as any));
      if (onChange) onChange(JSON.stringify({ nodes, edges: addEdge(newEdge, edges as any) }));
    },
    [nodes, edges, setEdges, onChange]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow-type');
      const dataStr = event.dataTransfer.getData('application/reactflow-data');
      
      if (!type || !dataStr) return;

      const nodeTemplate = JSON.parse(dataStr);
      const position = {
        x: event.clientX - 400,
        y: event.clientY - 200,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { ...nodeTemplate.data, label: nodeTemplate.label, icon: nodeTemplate.icon },
      };

      const nextNodes = [...nodes, newNode];
      setNodes(nextNodes);
      if (onChange) onChange(JSON.stringify({ nodes: nextNodes, edges }));
    },
    [nodes, edges, setNodes, onChange]
  );

  return (
    <div className="h-[740px] border-2 border-slate-50 rounded-[2.5rem] overflow-hidden bg-slate-50 relative group shadow-2xl">
      <div className="flex h-full">
        {/* Node Palette */}
        {!readOnly && (
          <div className="w-80 bg-white border-r border-slate-100 p-8 overflow-y-auto scrollbar-hide relative z-20">
            <div className="mb-10">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] mb-4">Intelligence Blocks</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                Drag and drop components to visualize the automation logic for MSMEs.
              </p>
            </div>
            
            <div className="space-y-10">
              {NODE_TEMPLATES.map((category) => (
                <div key={category.category}>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    {category.category}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {category.nodes.map((node) => (
                      <div
                        key={node.label}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/reactflow-type', node.type);
                          e.dataTransfer.setData('application/reactflow-data', JSON.stringify(node));
                        }}
                        className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 border-2 border-slate-50 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-white hover:border-amber-500/20 hover:shadow-xl hover:translate-y-[-2px] transition-all group/node shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-inner grayscale group-hover/node:grayscale-0 transition-all duration-500">
                           {node.icon}
                        </div>
                        <span className="text-[11px] font-black text-slate-500 group-hover/node:text-slate-900 transition-colors uppercase tracking-tight">{node.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Flow Canvas */}
        <div className="flex-1 relative bg-white">
          <div className="absolute top-8 left-8 z-10 flex gap-3">
             <div className="px-4 py-2 bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-xl">
                <span className="text-amber-500 mr-2">●</span> Logic Canvas
             </div>
             {readOnly && (
               <div className="px-4 py-2 bg-emerald-50 backdrop-blur-md border border-emerald-100 rounded-2xl text-[10px] font-black text-emerald-600 uppercase tracking-widest shadow-xl">
                 Live Map
               </div>
             )}
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={readOnly ? undefined : onNodesChange}
            onEdgesChange={readOnly ? undefined : onEdgesChange}
            onConnect={readOnly ? undefined : onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={(_, node) => setSelectedNode(node)}
            nodeTypes={nodeTypes}
            fitView
            colorMode="light"
          >
            <Controls className="!bg-white !border-slate-100 !fill-slate-900 shadow-xl !rounded-xl !p-1" />
            <MiniMap 
              className="!bg-white/80 !border-slate-100 !rounded-[2rem] !shadow-2xl"
              maskColor="rgba(248, 250, 252, 0.6)"
              nodeColor={(n: any) => {
                const colors: any = {
                  trigger: '#10b981',
                  action: '#3b82f6',
                  condition: '#f59e0b',
                  output: '#a855f7',
                  ai: '#ec4899',
                  integration: '#14b8a6',
                };
                return colors[n.type] || '#cbd5e1';
              }}
            />
            <Background color="#cbd5e1" gap={30} size={1} />
          </ReactFlow>
        </div>
        
        {/* Node Properties Panel */}
        {selectedNode && !readOnly && (
          <div className="w-80 bg-white border-l border-slate-100 p-8 overflow-y-auto animate-in slide-in-from-right duration-500 relative z-20">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Properties</h3>
              <button 
                onClick={() => setSelectedNode(null)} 
                className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
              >✕</button>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-1">Display Name</label>
                <input 
                  type="text" 
                  value={selectedNode.data.label as string}
                  onChange={(e) => {
                    const nextNodes = nodes.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: e.target.value } } : n);
                    setNodes(nextNodes);
                    if (onChange) onChange(JSON.stringify({ nodes: nextNodes, edges }));
                  }}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 text-[11px] font-black text-slate-900 focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden group/tip">
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500/5 rounded-full blur-xl group-hover/tip:bg-amber-500/10 transition-all duration-700" />
                 <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center text-[10px]">💡</span>
                    Pro Tip
                 </h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                   Connect this block to another to define the logic flow. All triggers start the execution sequentially.
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
