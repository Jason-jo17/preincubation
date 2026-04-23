import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GeographicDistribution } from "@/data/msme-intelligence";

interface GeographicHeatmapProps {
    data: GeographicDistribution[];
}

export function GeographicHeatmap({ data }: GeographicHeatmapProps) {
    if (!data) return null;

    const sortedData = [...data].sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted/30" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="region"
                        type="category"
                        tick={{ fontSize: 11, fontWeight: 500 }}
                        className="text-foreground fill-foreground"
                        width={80}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))"
                        }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20} fill="hsl(var(--primary))">
                        {sortedData.map((_, index) => (
                            <Cell key={`cell-${index}`} fillOpacity={0.6 + (0.4 * (index / sortedData.length))} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
