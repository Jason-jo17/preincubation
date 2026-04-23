
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Layers, 
  Lightbulb, 
  Cpu, 
  FileCode, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Code
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface InstructableStep {
  title: string;
  description: string;
  logic?: string;
  image_url?: string;
}

interface ProjectInstructableProps {
  project: {
    id: string;
    title: string;
    summary: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    time_estimate: string;
    materials: string[];
    tools: string[];
    steps: InstructableStep[];
    logic_breakdown: string;
    performance_metrics: { label: string; value: string }[];
    prd_link?: string;
  };
  onBack?: () => void;
}

export function ProjectInstructableView({ project, onBack }: ProjectInstructableProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="space-y-6">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="group text-slate-500 hover:text-blue-600 p-0 hover:bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO DASHBOARD
          </Button>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-50 text-blue-600 border-none px-3 font-black text-[10px] tracking-widest italic uppercase">
                {project.difficulty} BUILD
              </Badge>
              <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {project.time_estimate}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
              {project.title}
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
              {project.summary}
            </p>
          </div>
          
          <div className="w-full md:w-64 space-y-4">
            <Card className="bg-slate-900 border-slate-800 text-white shadow-2xl skew-x-[-2deg] hover:skew-x-0 transition-transform duration-500">
              <CardContent className="p-6 space-y-4">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Validated Metrics</p>
                {project.performance_metrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-slate-400">{m.label}</span>
                    <span className="text-lg font-black text-white italic">{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Materials & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-black italic tracking-tight flex items-center gap-3 uppercase">
            <Wrench className="w-6 h-6 text-blue-600" /> Materials <span className="text-slate-300">/ BOM</span>
          </h3>
          <ul className="grid grid-cols-1 gap-2">
            {project.materials.map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl font-bold text-slate-700 text-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-black italic tracking-tight flex items-center gap-3 uppercase">
            <Code className="w-6 h-6 text-blue-600" /> Tech <span className="text-slate-300">/ Toolset</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <Badge key={i} className="bg-slate-100 text-slate-700 border-none font-black text-[10px] px-4 py-2 uppercase tracking-wider">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Logic Breakdown */}
      <Card className="bg-blue-600 border-none text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Lightbulb className="w-32 h-32" />
        </div>
        <CardHeader>
           <CardTitle className="text-2xl font-black italic uppercase tracking-tight flex items-center gap-3">
             <Cpu className="w-6 h-6" /> The Core Logic
           </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-50 font-medium leading-relaxed italic bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
            {project.logic_breakdown}
          </div>
        </CardContent>
      </Card>

      {/* Step by Step */}
      <div className="space-y-12 pt-12">
        <h3 className="text-4xl font-black italic tracking-tighter uppercase">Building <span className="text-blue-600">The Solution</span></h3>
        
        <div className="space-y-16">
          {project.steps.map((step, i) => (
            <div key={i} className="group relative pl-12 md:pl-20">
              <div className="absolute left-0 top-0 text-6xl md:text-8xl font-black text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none -mt-4 italic">
                {i + 1}
              </div>
              
              <div className="relative z-10 space-y-4">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{step.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed max-w-3xl italic">
                  {step.description}
                </p>
                
                {step.logic && (
                  <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl font-mono text-xs text-slate-600 max-w-2xl">
                    <p className="font-bold text-blue-600 mb-2 uppercase tracking-widest text-[10px]">{"// Implementation Note"}</p>
                    {step.logic}
                  </div>
                )}
                
                <div className="h-[300px] md:h-[400px] bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center relative group-hover:border-blue-200 transition-all">
                   <div className="text-slate-300 font-black italic uppercase tracking-widest text-xs">Build Image Segment {i+1}</div>
                   <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-12 text-center space-y-6">
        <Separator className="bg-slate-200" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest h-14 px-10 rounded-2xl shadow-xl shadow-blue-600/20">
            VIEW REPO <FileCode className="w-5 h-5 ml-2" />
          </Button>
          {project.prd_link && (
            <Button size="lg" variant="outline" className="border-slate-200 bg-white text-slate-900 font-black uppercase tracking-widest h-14 px-10 rounded-2xl">
              TARGET PRD <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
