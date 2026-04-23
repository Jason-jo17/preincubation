import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ReferenceLine, ReferenceArea } from "recharts";
import { MarketShareGrowthData } from "@/data/msme-intelligence";

interface MarketShareGrowthChartProps {
    data: MarketShareGrowthData[];
}

export function MarketShareGrowthChart({ data }: MarketShareGrowthChartProps) {
    if (!data) return null;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
                
                <ReferenceArea x1={0} x2={12} y1={50} y2={200} fill="hsl(var(--primary) / 0.08)" label={{ value: 'DISRUPTION', position: 'insideTopLeft', fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={12} x2={24} y1={50} y2={200} fill="hsl(var(--success) / 0.08)" label={{ value: 'EXPANSION', position: 'insideTopRight', fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={0} x2={12} y1={0} y2={50} fill="hsl(var(--warning) / 0.08)" label={{ value: 'EFFICIENCY', position: 'insideBottomLeft', fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: '800', offset: 10 }} />
                <ReferenceArea x1={12} x2={24} y1={0} y2={50} fill="hsl(var(--primary) / 0.15)" label={{ value: 'CORE', position: 'insideBottomRight', fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: '800', offset: 10 }} />

                <ReferenceLine x={12} stroke="hsl(var(--border))" strokeOpacity={0.5} strokeDasharray="5 5" />
                <ReferenceLine y={50} stroke="hsl(var(--border))" strokeOpacity={0.5} strokeDasharray="5 5" />

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
                                <div className="rounded-xl border bg-background/95 backdrop-blur-sm p-3 shadow-xl">
                                    <div className="mb-2 border-b pb-2">
                                        <h4 className="font-bold text-foreground text-sm">{d.name}</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{d.sector.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground font-semibold uppercase">Market Share</span>
                                            <span className="font-black text-foreground">{d.marketShare}%</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground font-semibold uppercase">Growth</span>
                                            <span className="font-black text-foreground">{d.growth}%</span>
                                        </div>
                                        <div className="col-span-2 pt-1 border-t flex justify-between">
                                            <span className="text-muted-foreground font-semibold uppercase">Revenue</span>
                                            <span className="font-black text-primary tracking-tight">₹{(d.revenue / 10000000).toFixed(1)} Cr</span>
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
                        fill: 'hsl(var(--muted-foreground))', 
                        fontWeight: 'bold',
                        offset: 8 
                    }}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
