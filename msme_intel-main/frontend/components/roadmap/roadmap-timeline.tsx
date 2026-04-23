'use client';

import { Roadmap } from '@/lib/types/roadmap';
import { RoadmapMilestoneCard } from './roadmap-milestone-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoadmapTimelineProps {
    roadmap: Roadmap;
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
    // Group milestones by month
    const milestonesByMonth = roadmap.milestones.reduce((acc, milestone) => {
        const month = milestone.target_month;
        if (!acc[month]) acc[month] = [];
        acc[month].push(milestone);
        return acc;
    }, {} as Record<number, typeof roadmap.milestones>);

    return (
        <div className="space-y-8 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-border hidden md:block" />

            {[1, 2, 3, 4, 5, 6].map((month) => (
                <div key={month} className="relative flex flex-col md:flex-row gap-6">
                    {/* Month Indicator */}
                    <div className="flex md:flex-col items-center md:items-start gap-4 md:w-24 shrink-0 z-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background border-4 border-primary/20 shadow-sm text-primary font-bold text-xl">
                            M{month}
                        </div>
                    </div>

                    {/* Milestones for this month */}
                    <div className="flex-1 space-y-4 pb-8 border-b md:border-b-0">
                        <h4 className="text-lg font-semibold md:hidden">Month {month}</h4>
                        {milestonesByMonth[month]?.map((milestone) => (
                            <RoadmapMilestoneCard key={milestone.id} milestone={milestone} />
                        )) || (
                                <div className="p-4 border border-dashed rounded-lg text-sm text-muted-foreground bg-muted/30">
                                    No milestones scheduled for this month.
                                </div>
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
}
