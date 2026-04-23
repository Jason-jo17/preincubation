import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectorDistribution } from "@/data/msme-intelligence";

interface SectorDistributionChartProps {
    data: SectorDistribution[];
}

const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--success))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
];

export function SectorDistributionChart({ data }: SectorDistributionChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (!data) return null;

    const chartData = data.map((item, idx) => ({
        name: item.sector,
        value: item.count,
        percentage: item.percentage,
        total_value: item.total_value,
        avg_score: item.avg_score,
        color: COLORS[idx % COLORS.length]
    }));

    return (
        <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                                style={{ cursor: "pointer" }}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))"
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
                {chartData.map((item, index) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors cursor-pointer"
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium capitalize text-foreground">
                                {item.name.replace(/_/g, " ")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">{item.value}</Badge>
                            <span className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
