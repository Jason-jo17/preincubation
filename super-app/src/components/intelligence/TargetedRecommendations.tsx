"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Calendar, ArrowRight, Lightbulb, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Recommendation {
    title: string;
    description: string;
    category: string;
    priority: string;
}

export function TargetedRecommendations({ recommendations = [] }: { recommendations?: Recommendation[] }) {
    const fallbackRecommends = [
        {
            title: "Dr. Alok Sharma",
            description: "Expert in Renewable Energy Systems. Great contact for validation.",
            category: "people",
            priority: "high"
        },
        {
            title: "Pitch Validation Session",
            description: "Upcoming this Friday at 4 PM. Present your idea.",
            category: "events",
            priority: "medium"
        }
    ]

    const displayRecs = recommendations.length > 0 ? recommendations.slice(0, 3) : fallbackRecommends;

    const getIcon = (category: string) => {
        if (category === 'people' || category === 'stakeholder' || category === 'industry') return Users;
        if (category === 'events' || category === 'event') return Calendar;
        if (category === 'compliance' || category === 'roadmap') return Target;
        return Lightbulb;
    }

    return (
        <Card className="bg-bg-surface border-border overflow-hidden">
            <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Targeted Intelligence
                </CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    AI-Driven connections and milestones
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                    {displayRecs.map((rec, i) => {
                        const Icon = getIcon(rec.category)
                        return (
                            <div key={i} className="p-5 hover:bg-bg-raised transition-all group">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-bg-base border border-border group-hover:border-accent/30 transition-colors">
                                            <Icon className="h-4 w-4 text-accent" />
                                        </div>
                                        <h4 className="font-black text-sm uppercase tracking-tight">{rec.title}</h4>
                                    </div>
                                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                                        {rec.priority}
                                    </Badge>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed mb-4 pl-11">
                                    {rec.description}
                                </p>
                                <div className="flex justify-end pl-11">
                                    <Button variant="outline" size="sm" className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-8" asChild>
                                        <Link href="/innovator/cofounder">
                                            Take Action <ArrowRight className="ml-2 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
