"use client";

import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

interface CEEDQuadrantChartProps {
  core: number;
  expansion: number;
  efficiency: number;
  disruption: number;
  companyName: string;
}

export const CEEDQuadrantChart: React.FC<CEEDQuadrantChartProps> = ({
  core,
  expansion,
  efficiency,
  disruption,
  companyName
}) => {
  // Normalize scores to -100 to 100 for the grid
  // X-axis: Efficiency (-) to Expansion (+)
  // Y-axis: Core (-) to Disruption (+)
  const data = [
    {
      x: (expansion - efficiency),
      y: (disruption - core),
      name: companyName,
    },
  ];

  return (
    <div className="w-full h-[400px] relative bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest">CEED Quadrant Map</div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[-100, 100]} 
            hide 
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            domain={[-100, 100]} 
            hide 
          />
          <ZAxis type="number" range={[400]} />
          
          {/* Quadrant Backgrounds */}
          <ReferenceArea x1={0} x2={100} y1={0} y2={100} fill="#3b82f6" fillOpacity={0.05} /> {/* Disruption - Top Right */}
          <ReferenceArea x1={-100} x2={0} y1={0} y2={100} fill="#8b5cf6" fillOpacity={0.05} /> {/* Disruption/Efficiency - Top Left */}
          <ReferenceArea x1={-100} x2={0} y1={-100} y2={0} fill="#10b981" fillOpacity={0.05} /> {/* Core/Efficiency - Bottom Left */}
          <ReferenceArea x1={0} x2={100} y1={-100} y2={0} fill="#f59e0b" fillOpacity={0.05} /> {/* Core/Expansion - Bottom Right */}

          {/* Dividing Lines */}
          <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={2} />
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />

          {/* Labels */}
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xl">
                    <p className="text-slate-900 font-bold">{payload[0].payload.name}</p>
                    <div className="text-xs space-y-1 mt-2">
                       <p className="text-blue-500">Core: {core}</p>
                       <p className="text-purple-500">Expansion: {expansion}</p>
                       <p className="text-emerald-500">Efficiency: {efficiency}</p>
                       <p className="text-amber-500">Disruption: {disruption}</p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Scatter name="Company" data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#0f172a" stroke="#3b82f6" strokeWidth={3} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Axis Labels */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400 uppercase">Growth & Disruption</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-400 uppercase">Stability & Core</div>
      <div className="absolute left-2 top-1/2 -rotate-90 origin-left text-[10px] font-bold text-amber-400 uppercase">Efficiency</div>
      <div className="absolute right-2 top-1/2 rotate-90 origin-right text-[10px] font-bold text-purple-400 uppercase">Expansion</div>
      
      {/* Quadrant Names */}
      <div className="absolute top-10 right-10 text-[10px] font-bold text-slate-500 uppercase opacity-40">Disruption</div>
      <div className="absolute top-10 left-10 text-[10px] font-bold text-slate-500 uppercase opacity-40">Digital Maturity</div>
      <div className="absolute bottom-10 left-10 text-[10px] font-bold text-slate-500 uppercase opacity-40">Core Strength</div>
      <div className="absolute bottom-10 right-10 text-[10px] font-bold text-slate-500 uppercase opacity-40">Market Expansion</div>
    </div>
  );
};
