"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Settings } from "lucide-react"
import Link from "next/link"
import { OverviewTab } from "@/components/admin/OverviewTab"
import { UserManagementTab } from "@/components/admin/UserManagementTab"
import { SeedControlsTab } from "@/components/admin/SeedControlsTab"
import { JourneyOverviewTab } from "@/components/admin/JourneyOverviewTab"
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"
import { RubricBuilder } from "@/components/admin/RubricBuilder"
import { IntelligenceTab } from "@/components/admin/IntelligenceTab"

export default function AdminConsoleClient({ initialStats }: { initialStats: any }) {
    return (
        <div className="container py-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter text-primary uppercase">Console_</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        System Override & Platform Oversight
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <AddStakeholderDialog mode="admin" />
                    <Button variant="outline" className="font-bold border-none shadow-lg bg-card/50 backdrop-blur">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                    <Link href="/dashboard/admin/roadmap">
                        <Button className="font-bold shadow-xl shadow-primary/20">
                            <Database className="mr-2 h-4 w-4" />
                            Tool Sandbox
                        </Button>
                    </Link>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-card/50 backdrop-blur p-1 rounded-2xl shadow-2xl inline-flex w-auto border border-primary/5">
                    <TabsTrigger value="overview" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Overview</TabsTrigger>
                    <TabsTrigger value="users" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Users</TabsTrigger>
                    <TabsTrigger value="seed" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Seed</TabsTrigger>
                    <TabsTrigger value="journeys" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Journeys</TabsTrigger>
                    <TabsTrigger value="rubrics" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Rubrics</TabsTrigger>
                    <TabsTrigger value="intelligence" className="rounded-xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Intelligence</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="outline-none">
                    <OverviewTab data={initialStats} />
                </TabsContent>

                <TabsContent value="users" className="outline-none">
                    <UserManagementTab />
                </TabsContent>

                <TabsContent value="seed" className="outline-none">
                    <SeedControlsTab stats={initialStats.stats} />
                </TabsContent>

                <TabsContent value="journeys" className="outline-none">
                    <JourneyOverviewTab />
                </TabsContent>

                <TabsContent value="rubrics" className="outline-none">
                    <RubricBuilder />
                </TabsContent>
                
                <TabsContent value="intelligence" className="outline-none">
                    <IntelligenceTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
