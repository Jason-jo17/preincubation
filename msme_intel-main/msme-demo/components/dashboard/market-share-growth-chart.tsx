"use client"

import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis,
    ReferenceLine,
    ReferenceArea,
    Label
} from "recharts"

import { MarketShareGrowthData } from "@/lib/types/dashboard"

interface MarketShareGrowthChartProps {
    data: MarketShareGrowthData[]
}

export function MarketShareGrowthChart({ data }: MarketShareGrowthChartProps) {
    if (!data) return null

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
                
                {/* Visual Quadrants with Explicit Labels */}
                <ReferenceArea x1={0} x2={12} y1={50} y2={200} fill="rgba(59, 130, 246, 0.08)" label={{ value: 'DISRUPTION', position: 'insideTopLeft', fontSize: 10, fill: '#64748b', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={12} x2={24} y1={50} y2={200} fill="rgba(16, 185, 129, 0.08)" label={{ value: 'EXPANSION', position: 'insideTopRight', fontSize: 10, fill: '#64748b', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={0} x2={12} y1={0} y2={50} fill="rgba(245, 158, 11, 0.08)" label={{ value: 'EFFICIENCY', position: 'insideBottomLeft', fontSize: 10, fill: '#64748b', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={12} x2={24} y1={0} y2={50} fill="rgba(99, 102, 241, 0.08)" label={{ value: 'CORE', position: 'insideBottomRight', fontSize: 10, fill: '#64748b', fontWeight: '800', offset: 10 }} />

                <ReferenceLine x={12} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} strokeDasharray="5 5" />
                <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} strokeDasharray="5 5" />

                <XAxis 
                    type="number" 
                    dataKey="marketShare" 
                    name="Market Share" 
                    domain={[0, 24]}
                    unit="%" 
                    className="text-[10px] text-muted-foreground font-medium"
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis 
                    type="number" 
                    dataKey="growth" 
                    name="Growth Rate" 
                    domain={[0, 200]}
                    unit="%" 
                    className="text-[10px] text-muted-foreground font-medium"
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const d = payload[0].payload as MarketShareGrowthData;
                            return (
                                <div className="rounded-xl border bg-white/95 backdrop-blur-sm p-3 shadow-xl border-slate-100">
                                    <div className="mb-2 border-b pb-2">
                                        <h4 className="font-bold text-slate-900 text-sm">{d.name}</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{d.sector.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 font-semibold uppercase">Market Share</span>
                                            <span className="font-black text-slate-900">{d.marketShare}%</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 font-semibold uppercase">Growth</span>
                                            <span className="font-black text-slate-900">{d.growth}%</span>
                                        </div>
                                        <div className="col-span-2 pt-1 border-t flex justify-between">
                                            <span className="text-slate-400 font-semibold uppercase">Revenue</span>
                                            <span className="font-black text-blue-600 tracking-tight">₹{(d.revenue / 10000000).toFixed(1)} Cr</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Scatter 
                    name="Companies" 
                    data={data} 
                    fill="hsl(var(--primary))" 
                    line={false}
                    shape="circle"
                    label={{ 
                        dataKey: 'name', 
                        position: 'top', 
                        fontSize: 8, 
                        fill: '#64748b', 
                        fontWeight: 'bold',
                        offset: 8 
                    }}
                />
            </ScatterChart>
        </ResponsiveContainer>
    )
}
