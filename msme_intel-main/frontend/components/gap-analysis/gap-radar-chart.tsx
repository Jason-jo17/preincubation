'use client';

import { GapAnalysis } from '@/lib/types/gap-analysis';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GapRadarChartProps {
    analysis: GapAnalysis;
}

export function GapRadarChart({ analysis }: GapRadarChartProps) {
    const data = analysis.dimension_scores.map((dim) => ({
        dimension: dim.dimension_name, // Should format this if needed (e.g. capitalize)
        score: dim.score,
        fullMark: 100,
    }));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Gap Analysis - 9 Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <Radar
                            name="Score"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.5}
                        />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
