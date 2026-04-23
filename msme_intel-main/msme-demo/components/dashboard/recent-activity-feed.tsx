"use client"

import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import {
    ArrowRight,
    CheckCircle2,
    FileText,
    TrendingUp,
} from "lucide-react"

import { RecentActivity } from "@/lib/types/dashboard"

interface RecentActivityFeedProps {
    activities: RecentActivity[]
}

const ACTION_ICONS = {
    uploaded: FileText,
    scored: TrendingUp,
    classified: CheckCircle2,
    analyzed: TrendingUp,
    completed: CheckCircle2,
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
    if (!activities || activities.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No recent activity
            </div>
        )
    }

    return (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {activities.map((activity) => {
                const Icon =
                    ACTION_ICONS[activity.action as keyof typeof ACTION_ICONS] || FileText

                return (
                    <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                    >
                        {/* Icon */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium mb-1">
                                <span className="text-primary">{activity.company_name}</span>{" "}
                                {activity.action}
                            </p>

                            {/* Stage Progression */}
                            {activity.stage_from !== activity.stage_to && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <Badge variant="outline" className="text-xs">
                                        Stage {activity.stage_from}
                                    </Badge>
                                    <ArrowRight className="h-3 w-3" />
                                    <Badge variant="outline" className="text-xs">
                                        Stage {activity.stage_to}
                                    </Badge>
                                </div>
                            )}

                            {/* Details */}
                            {activity.details && (
                                <p className="text-xs text-muted-foreground mb-1">
                                    {activity.details}
                                </p>
                            )}

                            {/* Timestamp */}
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(activity.timestamp), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
