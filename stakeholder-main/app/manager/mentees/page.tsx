"use client"

import { useMyMentees } from "@/hooks/use-manager"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/student/DashboardComponents"
import {
    GraduationCap, Users, MessageSquare, CheckCircle,
    ChevronRight, ArrowLeft, Search, Filter, Plus
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { AddMenteeDialog } from "@/components/manager/AddMenteeDialog"

export default function MenteesPage() {
    const { data: mentees, isLoading } = useMyMentees()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredMentees = mentees?.filter((m: any) => 
        (m.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (m.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (m.institution?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
    )

    return (
        <div className="container py-8 space-y-8 max-w-[1400px]">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                        <ArrowLeft className="h-4 w-4" />
                        <Link href="/manager/dashboard" className="text-[10px] font-black uppercase tracking-widest hover:underline">Back to HQ</Link>
                    </div>
                    <h1 className="text-5xl font-black italic tracking-tighter text-primary uppercase leading-none">Mentees Portfolio_</h1>
                    <p className="text-muted-foreground font-medium italic opacity-70">
                        Operational Oversight of Individual Innovator Advancement
                    </p>
                </div>
                <AddMenteeDialog />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-card/50 backdrop-blur p-4 rounded-2xl border border-primary/5 shadow-xl">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                        placeholder="Search by name, project, or institution..." 
                        className="pl-10 h-12 bg-background/50 border-none shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 font-bold gap-2">
                        <Filter className="h-4 w-4" />
                        Sort by Progress
                    </Button>
                </div>
            </div>

            {/* Mentees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-[300px] rounded-2xl bg-muted/50 animate-pulse" />
                    ))
                ) : filteredMentees?.length === 0 ? (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
                            <Users className="h-10 w-10 text-primary/20" />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">No Innovators Found</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">Either your portfolio is empty or your filters are too restrictive.</p>
                    </div>
                ) : filteredMentees?.map((mentee: any) => (
                    <Card key={mentee.id} className="group hover:border-primary/50 transition-all shadow-xl overflow-hidden flex flex-col bg-card/30 backdrop-blur border-2 border-primary/5">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <Avatar className="h-16 w-16 border-4 border-background shadow-2xl">
                                        <AvatarImage src={mentee.user.avatar || undefined} />
                                        <AvatarFallback className="text-2xl font-black bg-primary/10 text-primary uppercase italic">{mentee.user.name?.[0] || '?'}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-4 border-background flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="font-black text-xl tracking-tighter leading-tight italic uppercase truncate">{mentee.user.name || "Unknown Innovator"}</div>
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] truncate">{mentee.projectName}</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-70 tracking-tight mt-1 truncate">{mentee.institution}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-background/40 p-3 rounded-xl border border-primary/5 group-hover:bg-primary/5 transition-colors">
                                    <div className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">TRL Stage</div>
                                    <div className="font-black text-lg italic uppercase text-primary">Ideation</div>
                                </div>
                                <div className="bg-background/40 p-3 rounded-xl border border-primary/5 group-hover:bg-primary/5 transition-colors">
                                    <div className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">Interactions</div>
                                    <div className="font-black text-lg italic uppercase text-primary">0</div>
                                </div>
                            </div>

                            <Button className="w-full font-black uppercase tracking-[0.2em] h-12 shadow-2xl group-hover:bg-primary/90 transition-all" asChild>
                                <Link href={`/manager/mentees/${mentee.id}`}>
                                    View Deployment <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
