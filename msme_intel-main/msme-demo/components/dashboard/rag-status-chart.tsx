"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import { RAGDistribution } from "@/lib/types/dashboard"

interface RAGStatusChartProps {
    data: RAGDistribution
}

const RAG_COLORS = {
    green: "#10b981",
    amber: "#f59e0b",
    red: "#ef4444",
}

export function RAGStatusChart({ data }: RAGStatusChartProps) {
    if (!data) return null

    const chartData = [
        { name: "Green", value: data.green, color: RAG_COLORS.green },
        { name: "Amber", value: data.amber, color: RAG_COLORS.amber },
        { name: "Red", value: data.red, color: RAG_COLORS.red },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                <XAxis type="number" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12, fontWeight: 500 }}
                    className="text-foreground"
                    width={60}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                    }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
