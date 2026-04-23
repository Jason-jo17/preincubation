'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GapRadarChartProps {
    gapAnalysis: {
        market_saturation_score: number;
        founder_quality_score: number;
        business_maturity_score: number;
        market_opportunity_score: number;
        leadership_quality_score: number;
        innovation_differentiator_score: number;
        talent_pool_score: number;
        brand_identity_score: number;
    };
}

export function GapRadarChart({ gapAnalysis }: GapRadarChartProps) {
    const data = [
        { dimension: 'Market Sat.', score: 100 - gapAnalysis.market_saturation_score }, // Invert (lower is better for saturation?) Or implies saturation score is bad. Assuming 100 saturation = bad, 0 = good. If chart is "Goodness", then 100-sat.
        { dimension: 'Founder', score: gapAnalysis.founder_quality_score },
        { dimension: 'Maturity', score: gapAnalysis.business_maturity_score },
        { dimension: 'Opportunity', score: gapAnalysis.market_opportunity_score },
        { dimension: 'Leadership', score: gapAnalysis.leadership_quality_score },
        { dimension: 'Innovation', score: gapAnalysis.innovation_differentiator_score },
        { dimension: 'Talent', score: gapAnalysis.talent_pool_score },
        { dimension: 'Brand', score: gapAnalysis.brand_identity_score },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>8-Dimension Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {data.map((item) => (
                        <div key={item.dimension} className="text-center p-3 rounded-lg bg-muted/40 hover:bg-muted/80 transition-colors">
                            <div className="text-2xl font-bold">{item.score}</div>
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{item.dimension}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
