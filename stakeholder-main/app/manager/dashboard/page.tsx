"use client"

import { useManagerProfile, useMyMentees } from "@/hooks/use-manager"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/student/DashboardComponents"
import {
    GraduationCap, Users, MessageSquare, CheckCircle,
    Settings2, ClipboardCheck, LayoutDashboard
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Specialized Tools
import { MentorSprintBuilder } from "@/components/manager/MentorSprintBuilder"
import { ExpertReviewDashboard } from "@/components/manager/ExpertReviewDashboard"
import { AddMenteeDialog } from "@/components/manager/AddMenteeDialog"

export default function ManagerDashboard() {
    const { data: profile } = useManagerProfile()
    const { data: mentees } = useMyMentees()
    const [activeTab, setActiveTab] = useState("mentees")

    const getTotalStakeholderConnections = (list: any[]) => list?.reduce((acc, m) => acc + (m._count?.stakeholders || 0), 0) || 0
    const getMonthlyInteractions = (list: any[]) => list?.reduce((acc, m) => acc + (m._count?.interactions || 0), 0) || 0
    const getValidatedVPs = (list: any[]) => list?.reduce((acc, m) => acc + (m._count?.valuePropositions || 0), 0) || 0

    return (
        <div className="container py-8 space-y-8 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">Manager HQ</h1>
                    <p className="text-muted-foreground mt-1 font-medium italic">
                        Precision Monitoring & Portfolio Advancement Terminal
                    </p>
                </div>
                {profile?.user && (
                    <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-xl border">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src={profile.user.avatar || undefined} />
                            <AvatarFallback>{profile.user.name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="pr-4">
                            <div className="font-bold text-sm tracking-tight">{profile.user.name}</div>
                            <div className="text-[10px] uppercase font-black text-primary tracking-widest">{profile.role}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Mentees"
                    value={mentees?.length || 0}
                    icon={GraduationCap}
                />
                <StatCard
                    title="Total Connections"
                    value={getTotalStakeholderConnections(mentees || [])}
                    icon={Users}
                />
                <StatCard
                    title="Interactions (Month)"
                    value={getMonthlyInteractions(mentees || [])}
                    icon={MessageSquare}
                />
                <StatCard
                    title="Validated VPs"
                    value={getValidatedVPs(mentees || [])}
                    icon={CheckCircle}
                />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="bg-muted/50 p-1 h-12 gap-2">
                    <TabsTrigger value="mentees" className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                        <LayoutDashboard className="h-4 w-4" />
                        Mentees Portfolio
                    </TabsTrigger>
                    <TabsTrigger value="builder" className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                        <Settings2 className="h-4 w-4" />
                        Mentor Sprint Builder
                    </TabsTrigger>
                    <TabsTrigger value="review" className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                        <ClipboardCheck className="h-4 w-4" />
                        Expert Review Dashboard
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="mentees" className="m-0 focus-visible:outline-none">
                    <Card className="border-2 border-primary/5 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Active Innovator Pipeline</CardTitle>
                            <AddMenteeDialog />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mentees?.map((mentee: any) => (
                                    <Card key={mentee.id} className="group hover:border-primary/50 transition-all shadow-sm overflow-hidden flex flex-col">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 mb-6">
                                                <Avatar className="h-14 w-14 border-4 border-primary/5 shadow-sm">
                                                    <AvatarImage src={mentee.user?.avatar || undefined} />
                                                    <AvatarFallback className="text-xl font-black bg-primary/10 text-primary">{mentee.user?.name?.[0] || '?'}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="font-black text-lg tracking-tighter leading-tight italic uppercase">{mentee.user?.name || 'Unknown User'}</div>
                                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-70 tracking-tight">{mentee.institution || 'No Institution'}</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 text-center mb-6">
                                                <div className="bg-muted/50 p-3 rounded-xl border group-hover:bg-primary/5 transition-colors">
                                                    <div className="font-black text-xl italic">{mentee._count?.stakeholders || 0}</div>
                                                    <div className="text-[10px] font-black uppercase text-muted-foreground">Stk.</div>
                                                </div>
                                                <div className="bg-muted/50 p-3 rounded-xl border group-hover:bg-primary/5 transition-colors">
                                                    <div className="font-black text-xl italic">{mentee._count?.interactions || 0}</div>
                                                    <div className="text-[10px] font-black uppercase text-muted-foreground">Int.</div>
                                                </div>
                                                <div className="bg-muted/50 p-3 rounded-xl border group-hover:bg-primary/5 transition-colors">
                                                    <div className="font-black text-xl italic">{mentee._count?.valuePropositions || 0}</div>
                                                    <div className="text-[10px] font-black uppercase text-muted-foreground">VPs</div>
                                                </div>
                                            </div>

                                            <Button className="w-full font-black uppercase tracking-[0.1em] h-12 shadow-lg group-hover:scale-[1.02] transition-transform" asChild>
                                                <Link href={`/manager/mentees/${mentee.id}`}>
                                                    Advancement Path <ChevronRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="builder" className="m-0 focus-visible:outline-none">
                    <MentorSprintBuilder />
                </TabsContent>

                <TabsContent value="review" className="m-0 focus-visible:outline-none">
                    <ExpertReviewDashboard />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ChevronRight(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg> }
