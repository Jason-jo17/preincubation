'use client';

import { RoadmapMilestone } from '@/lib/types/roadmap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

interface RoadmapMilestoneCardProps {
    milestone: RoadmapMilestone;
}

export function RoadmapMilestoneCard({ milestone }: RoadmapMilestoneCardProps) {
    const priorityColors = {
        critical: 'text-red-600 bg-red-100 border-red-200',
        high: 'text-orange-600 bg-orange-100 border-orange-200',
        medium: 'text-blue-600 bg-blue-100 border-blue-200',
        low: 'text-gray-600 bg-gray-100 border-gray-200',
    };

    return (
        <Card className="relative overflow-hidden border-l-4 border-l-primary/50">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold">{milestone.title}</CardTitle>
                    <Badge variant="outline" className={cn("capitalize border-0", priorityColors[milestone.priority])}>
                        {milestone.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    {milestone.estimated_cost && (
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            <span>Est. Cost: {formatCurrency(milestone.estimated_cost)}</span>
                        </div>
                    )}
                    {milestone.dependencies && milestone.dependencies.length > 0 && (
                        <div className="flex items-center gap-1 text-amber-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>{milestone.dependencies.length} Dependencies</span>
                        </div>
                    )}
                </div>

                {milestone.success_metrics && milestone.success_metrics.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                        <h6 className="text-xs font-semibold mb-1">Success Metrics</h6>
                        <ul className="space-y-1">
                            {milestone.success_metrics.map((metric, i) => (
                                <li key={i} className="text-xs flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
