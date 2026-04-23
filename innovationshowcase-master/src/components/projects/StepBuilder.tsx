'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  codeSnippet?: string;
  tips: string[];
}

interface StepBuilderProps {
  value?: Step[];
  onChange: (value: Step[]) => void;
}

export function StepBuilder({ value = [], onChange }: StepBuilderProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const addStep = () => {
    const newStep: Step = {
      id: `step-${Date.now()}`,
      stepNumber: value.length + 1,
      title: '',
      description: '',
      tips: [],
    };
    onChange([...value, newStep]);
    setExpandedStep(newStep.id);
  };

  const updateStep = (id: string, updates: Partial<Step>) => {
    onChange(value.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeStep = (id: string) => {
    const remaining = value.filter(s => s.id !== id);
    onChange(remaining.map((s, i) => ({ ...s, stepNumber: i + 1 })));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(value);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    
    onChange(items.map((s, i) => ({ ...s, stepNumber: i + 1 })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Setup & Usage Steps
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Provide clear, step-by-step instructions for MSMEs to adopt your solution.
          </p>
        </div>
        <button 
          type="button"
          onClick={addStep} 
          className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/20 rounded-lg text-sm font-black transition-all shadow-sm flex items-center gap-2"
        >
          <span>➕</span> Add Step
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {value.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                        snapshot.isDragging 
                          ? 'border-amber-500 shadow-2xl scale-[1.02] z-50 bg-white' 
                          : 'border-slate-200 bg-white shadow-sm'
                      }`}
                    >
                      {/* Step Header */}
                      <div
                        className="flex items-center gap-4 p-4 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="text-slate-300 hover:text-slate-900 transition-colors px-1"
                        >
                          <span className="text-xl">⋮⋮</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1">
                          <input
                            value={step.title}
                            onChange={(e) => updateStep(step.id, { title: e.target.value })}
                            placeholder="Give this step a clear title..."
                            className="w-full bg-transparent text-slate-900 font-black placeholder-slate-300 focus:outline-none text-lg"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                           <button
                             type="button"
                             onClick={(e) => {
                               e.stopPropagation();
                               removeStep(step.id);
                             }}
                             className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                           >
                             <span className="text-lg">🗑️</span>
                           </button>
                           <span className={`text-slate-400 transition-transform duration-300 ${expandedStep === step.id ? 'rotate-180' : ''}`}>
                             <span className="text-lg">▼</span>
                           </span>
                        </div>
                      </div>

                      {/* Step Content */}
                      {expandedStep === step.id && (
                        <div className="p-6 space-y-6 bg-white border-t border-slate-100">
                          {/* Description */}
                          <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                              Detailed Description
                            </label>
                            <textarea
                              value={step.description}
                              onChange={(e) => updateStep(step.id, { description: e.target.value })}
                              rows={4}
                              className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl p-4 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-amber-500/20 transition-all resize-none shadow-inner"
                              placeholder="Explain what needs to be done in this step. Be specific about inputs, outputs, and any prerequisites..."
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div>
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                                Visual Reference (URL)
                              </label>
                              <div className="space-y-3">
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500/20 shadow-inner"
                                  value={step.imageUrl || ''}
                                  onChange={(e) => updateStep(step.id, { imageUrl: e.target.value })}
                                />
                                {step.imageUrl && (
                                  <div className="relative group rounded-xl overflow-hidden border border-slate-100 aspect-video shadow-sm">
                                    <img
                                      src={step.imageUrl}
                                      alt={step.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => updateStep(step.id, { imageUrl: undefined })}
                                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-black shadow-lg"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Video URL */}
                            <div>
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                                Video Walkthrough (Optional)
                              </label>
                              <input
                                type="url"
                                value={step.videoUrl || ''}
                                onChange={(e) => updateStep(step.id, { videoUrl: e.target.value })}
                                placeholder="YouTube, Loom, or raw video link..."
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500/20 shadow-inner"
                              />
                            </div>
                          </div>

                          {/* Code Snippet */}
                          <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                              Execution Commands / Code Snippet
                            </label>
                            <div className="relative group">
                              <textarea
                                value={step.codeSnippet || ''}
                                onChange={(e) => updateStep(step.id, { codeSnippet: e.target.value })}
                                rows={5}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-sm placeholder-slate-700 focus:outline-none focus:border-emerald-500/30 transition-all resize-none shadow-2xl"
                                placeholder="// example: npx run automation-script --key=ABC"
                              />
                              <div className="absolute top-3 right-3 text-[10px] font-black text-slate-700 uppercase tracking-widest">Console Shell</div>
                            </div>
                          </div>

                          {/* Tips */}
                          <div className="border-t border-slate-100 pt-6">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">
                              Pro Tips & Optimization Advice
                            </label>
                            <div className="space-y-3">
                              {step.tips.map((tip, i) => (
                                <div key={i} className="flex gap-3 group">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                                    <span className="text-sm">💡</span>
                                  </div>
                                  <input
                                    value={tip}
                                    onChange={(e) => {
                                      const newTips = [...step.tips];
                                      newTips[i] = e.target.value;
                                      updateStep(step.id, { tips: newTips });
                                    }}
                                    className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500/20 transition-all shadow-inner"
                                    placeholder="Add a pointer for efficiency..."
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      updateStep(step.id, {
                                        tips: step.tips.filter((_, j) => j !== i)
                                      });
                                    }}
                                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => updateStep(step.id, { tips: [...step.tips, ''] })}
                                className="text-xs font-black text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-xl w-fit shadow-sm"
                              >
                                <span className="text-sm">＋</span> Add a New Pro Tip
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {value.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-700 pointer-events-none" />
          <div className="relative z-10">
             <div className="text-5xl mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner">📋</div>
             </div>
             <h4 className="text-xl font-black text-slate-900 tracking-tight">Step List is Empty</h4>
             <p className="text-sm text-slate-400 mt-2 mb-8 max-w-xs mx-auto font-medium">
               Documentation is the bridge between a great project and a successful MSME implementation.
             </p>
             <button 
               type="button"
               onClick={addStep} 
               className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:translate-y-[-2px] active:translate-y-0"
             >
               Add your First Setup Step
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
