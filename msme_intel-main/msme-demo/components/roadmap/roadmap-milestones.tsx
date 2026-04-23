
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { RoadmapMilestone } from "@/lib/types/roadmap";

interface RoadmapMilestonesProps {
    milestones: RoadmapMilestone[];
}

export function RoadmapMilestones({ milestones }: RoadmapMilestonesProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {milestones.map((milestone) => (
                <Card key={milestone.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-semibold">
                            {milestone.title}
                        </CardTitle>
                        <Badge variant={milestone.priority === 'critical' ? 'destructive' : 'secondary'}>
                            {milestone.priority}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            {milestone.description}
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Month {milestone.target_month}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="font-medium mr-2">Est. Cost:</span>
                                <span>₹{(milestone.estimated_cost || 0).toLocaleString()}</span>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold mb-2 uppercase text-muted-foreground">Success Metrics</p>
                                <ul className="space-y-1">
                                    {milestone.success_metrics?.map((metric: string, idx: number) => (
                                        <li key={idx} className="text-sm flex items-start">
                                            <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-green-500 mt-0.5" />
                                            {metric}
                                        </li>
                                    ))}
                                </ul>
                                {milestone.recommended_program && (
                                    <div className="mt-4 pt-3 border-t">
                                        <p className="text-xs font-semibold uppercase text-indigo-600 mb-2 flex items-center">
                                            💡 Recommended Program
                                        </p>
                                        <div className="flex justify-between items-center bg-indigo-50/50 p-2 rounded border border-indigo-100">
                                            <span className="text-sm font-medium text-slate-800">{milestone.recommended_program}</span>
                                            {milestone.prd_link && (
                                                <a 
                                                    href={milestone.prd_link}
                                                    className="inline-flex items-center justify-center rounded-md text-xs font-semibold bg-indigo-600 text-white h-7 px-3 hover:bg-indigo-700 transition"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View PRD
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
