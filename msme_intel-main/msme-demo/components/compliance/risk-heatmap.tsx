"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { AlertCircle, ArrowUpRight } from "lucide-react"

interface RiskHeatmapProps {
    data: {
        sector: string
        count: number
    }[]
}

const COLORS = ["#f43f5e", "#fb923c", "#facc15", "#3b82f6", "#8b5cf6"]

export function RiskHeatmap({ data }: RiskHeatmapProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <AlertCircle className="h-10 w-10 text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-500">No verified sector mismatches detected in this cohort.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 80, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="sector" 
                            type="category" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 700, fill: "#64748b" }}
                            width={75}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                            }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {data.map((item, index) => (
                    <div key={item.sector} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between group hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded text-slate-500 font-bold text-xs uppercase">
                                {item.sector.substring(0, 3)}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">{item.sector}</p>
                                <p className="text-[10px] text-slate-500">Verified Misalignments: {item.count}</p>
                            </div>
                        </div>
                        <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                ))}
            </div>
        </div>
    )
}
