"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Calendar, ArrowRight, Lightbulb, Link as LinkIcon, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Recommendation {
    title: string;
    description: string;
    category: string;
    priority: string;
}

export function TargetedRecommendations({ recommendations = [] }: { recommendations?: Recommendation[] }) {

    // Fallback if no recommendations provided by AI 
    const fallbackRecommends = [
        {
            type: "stakeholder",
            title: "Dr. Alok Sharma",
            description: "Expert in Renewable Energy Systems. Great contact for validation.",
            category: "people",
            priority: "high"
        },
        {
            type: "event",
            title: "Pitch Validation Session",
            description: "Upcoming this Friday at 4 PM. Present your idea.",
            category: "events",
            priority: "medium"
        }
    ]

    const filteredRecs = recommendations.filter(r => !['trl', 'roadmap', 'compliance', 'experiments', 'resources', 'industry', 'api'].includes(r.category));
    const displayRecs = (filteredRecs.length > 0 && recommendations.length > 0) ? filteredRecs.slice(0, 3) : fallbackRecommends;

    const getIcon = (category: string) => {
        if (category === 'people' || category === 'stakeholder' || category === 'industry') return Users;
        if (category === 'events' || category === 'event') return Calendar;
        if (category === 'compliance' || category === 'roadmap') return Target;
        return Lightbulb;
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-3 mb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Recommended For You
                </CardTitle>
                <CardDescription className="text-xs">Based on your project's current needs</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayRecs.length > 0 ? displayRecs.map((rec, i) => {
                        const Icon = getIcon(rec.category)
                        return (
                            <div key={i} className="flex flex-col gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-start justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-md bg-background border shadow-sm shrink-0">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <span className="font-semibold text-sm line-clamp-1">{rec.title}</span>
                                    </div>
                                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-[10px] font-medium px-1.5 py-0 whitespace-nowrap ml-2 shrink-0 capitalize">
                                        {rec.priority || 'Medium'}
                                    </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground md:ml-9">
                                    <span className="font-medium text-foreground/80">Why: </span>
                                    {rec.description}
                                </div>
                                <div className="flex justify-end mt-1">
                                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary hover:no-underline" asChild>
                                        <Link href={"/student/cofounder"} className="flex items-center">
                                            View Strategist <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    }) : (
                        <p className="text-sm text-muted-foreground italic text-center py-4">Generating recommendations...</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
