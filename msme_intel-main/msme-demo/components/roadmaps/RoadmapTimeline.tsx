'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RoadmapTimelineProps {
    roadmap: {
        title: string
        executive_summary: string
        phases: Array<{
            phase_number: number
            phase_name: string
            objectives: string[]
            milestones: string[]
        }>
    }
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{roadmap.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{roadmap.executive_summary}</p>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {roadmap.phases?.map((phase) => (
                    <Card key={phase.phase_number}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Phase {phase.phase_number}: {phase.phase_name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Objectives</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {phase.objectives?.map((obj, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground">{obj}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Milestones</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {phase.milestones?.map((milestone, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground">{milestone}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
