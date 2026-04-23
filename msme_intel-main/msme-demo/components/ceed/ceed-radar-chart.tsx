"use client";

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface CEEDRadarChartProps {
  core: number;
  expansion: number;
  efficiency: number;
  disruption: number;
  companyName: string;
}

const CEEDRadarChart: React.FC<CEEDRadarChartProps> = ({
  core,
  expansion,
  efficiency,
  disruption,
  companyName
}) => {
  const data = [
    { subject: 'Core Strength', A: core, fullMark: 100 },
    { subject: 'Expansion', A: expansion, fullMark: 100 },
    { subject: 'Efficiency', A: efficiency, fullMark: 100 },
    { subject: 'Disruption', A: disruption, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl p-6 border border-slate-100 shadow-xl relative overflow-hidden group">
      {/* Aesthetic Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full group-hover:bg-purple-500/10 transition-colors" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">CEED Intelligence</h3>
                <p className="text-xl font-black text-slate-900 italic">Strategic <span className="text-blue-600 font-black">Archetype</span></p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 font-black italic">
                {( (core + expansion + efficiency + disruption) / 4 ).toFixed(0)}
            </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="55%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }}
            />
            <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false}
            />
            <Tooltip 
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        return (
                            <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].payload.subject}</p>
                                <p className="text-lg font-black text-blue-600 italic">{payload[0].value}%</p>
                            </div>
                        );
                    }
                    return null;
                }}
            />
            <Radar
                name={companyName}
                dataKey="A"
                stroke="#2563eb"
                strokeWidth={3}
                fill="#3b82f6"
                fillOpacity={0.3}
                animationBegin={300}
                animationDuration={1500}
            />
            </RadarChart>
        </ResponsiveContainer>

        <div className="mt-auto grid grid-cols-4 gap-2 pt-4">
            {[
                { label: 'C', val: core, color: 'bg-indigo-500' },
                { label: 'E', val: expansion, color: 'bg-purple-500' },
                { label: 'F', val: efficiency, color: 'bg-emerald-500' },
                { label: 'D', val: disruption, color: 'bg-blue-500' }
            ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${stat.color} mb-1`} />
                    <span className="text-[10px] font-black text-slate-900">{stat.val}%</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CEEDRadarChart;
