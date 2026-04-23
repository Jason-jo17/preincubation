'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GapAnalysisProps {
    analysis: {
        hr_talent_score: number
        marketing_sales_score: number
        operations_score: number
        finance_score: number
        ip_innovation_score: number
        strategy_score: number
        key_strengths?: string[]
        critical_gaps?: string[]
        priority_actions?: string[]
    }
}

export function GapAnalysisView({ analysis }: GapAnalysisProps) {
    const data = [
        { vertical: 'HR & Talent', score: analysis.hr_talent_score },
        { vertical: 'Marketing', score: analysis.marketing_sales_score },
        { vertical: 'Operations', score: analysis.operations_score },
        { vertical: 'Finance', score: analysis.finance_score },
        { vertical: 'IP & Innovation', score: analysis.ip_innovation_score },
        { vertical: 'Strategy', score: analysis.strategy_score }
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>6-Vertical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="vertical" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {analysis.key_strengths && analysis.key_strengths.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Key Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {analysis.key_strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-sm">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {analysis.critical_gaps && analysis.critical_gaps.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Critical Gaps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {analysis.critical_gaps.map((gap, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">⚠</span>
                                        <span className="text-sm">{gap}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
