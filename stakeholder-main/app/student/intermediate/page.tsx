// app/student/intermediate/page.tsx
"use client"

import { useStudentProfile, useMyStakeholders, useMyValuePropositions } from "@/hooks/use-student"
import { StatCard, StakeholderList, InteractionTimeline, ManagerCard, UpcomingTasksList } from "@/components/student/DashboardComponents"
import {
    Users, Target, MessageSquare, AlertCircle, Plus, ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"
import { RecommendationsList } from "@/components/student/Recommendations"

export default function IntermediatePage() {
    const { data: profile } = useStudentProfile()
    const { data: stakeholders } = useMyStakeholders()
    const { data: valueProps } = useMyValuePropositions()

    return (
        <div className="container py-8 space-y-8 max-w-[1200px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/student/dashboard">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Stakeholder Analysis</h1>
                        <p className="text-muted-foreground mt-1">
                            Detailed overview of your stakeholder relationships and value propositions
                        </p>
                    </div>
                </div>
                <AddStakeholderDialog
                    mode="student"
                    trigger={
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Stakeholder
                        </Button>
                    }
                />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Stakeholders"
                    value={stakeholders?.length || 0}
                    icon={Users}
                    trend="+2 this week"
                />
                <StatCard
                    title="Value Propositions"
                    value={valueProps?.length || 0}
                    icon={Target}
                    trend="3 validated"
                />
                <StatCard
                    title="Interactions"
                    value={profile?._count?.interactions || 0}
                    icon={MessageSquare}
                    trend="Last interaction 2 days ago"
                />
                <StatCard
                    title="Problem Statements"
                    value={5}
                    icon={AlertCircle}
                    trend="5 sectors covered"
                />
            </div>


            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                            <CardTitle className="text-lg">Stakeholder Registry</CardTitle>
                            <Button asChild size="sm" variant="outline">
                                <Link href="/stakeholders">Find Global Stakeholders</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <StakeholderList stakeholders={stakeholders || []} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="py-4">
                            <CardTitle className="text-lg">Recent Interactions Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <InteractionTimeline interactions={profile?.interactions || []} />
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-4 space-y-6">
                    <RecommendationsList profile={profile} />

                    {profile?.manager && (
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-lg">Your Manager</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ManagerCard manager={profile.manager} />
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader className="py-4">
                            <CardTitle className="text-lg">Upcoming Pipeline Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UpcomingTasksList />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
