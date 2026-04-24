import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FunnelConversionData } from "@/data/msme-intelligence";

interface FunnelConversionChartProps {
    data: FunnelConversionData;
}

export function FunnelConversionChart({ data }: FunnelConversionChartProps) {
    if (!data) return null;

    const chartData = [
        { name: "Stage 1\nUploaded", value: data.stage_1_uploaded, color: "var(--color-accent)" },
        { name: "Stage 2\nScored", value: data.stage_2_scored, color: "var(--color-accent)" },
        { name: "Stage 3\nFinancials", value: data.stage_3_financials, color: "var(--color-accent)" },
        { name: "Stage 4\nRAG", value: data.stage_4_rag_classified, color: "var(--color-accent)" },
        { name: "Stage 5\nGap", value: data.stage_5_gap_analyzed, color: "var(--color-accent)" },
        { name: "Stage 6\nRoadmap", value: data.stage_6_roadmap_generated, color: "var(--color-success)" },
    ];

    return (
        <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickFormatter={(value) => value.split('\n')[1]}
                    />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--color-bg-surface)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                            color: "var(--color-text-primary)"
                        }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-5 gap-2">
                {[
                    { label: "1→2", rate: data.conversion_rates.stage_1_to_2 },
                    { label: "2→3", rate: data.conversion_rates.stage_2_to_3 },
                    { label: "3→4", rate: data.conversion_rates.stage_3_to_4 },
                    { label: "4→5", rate: data.conversion_rates.stage_4_to_5 },
                    { label: "5→6", rate: data.conversion_rates.stage_5_to_6 },
                ].map((item) => (
                    <div key={item.label} className="text-center p-2 bg-muted rounded">
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                        <div className="text-sm font-bold text-foreground">{item.rate.toFixed(1)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
