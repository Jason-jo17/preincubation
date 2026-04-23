import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertCircle, CheckCircle2, Server, Database, Activity } from "lucide-react"
import { format } from "date-fns"

export function OverviewTab({ data }: { data: any }) {
    if (!data) return <div>Loading...</div>

    const { stats, usersByRole, recentSignups, system } = data

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.totalUsers}</div>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-[10px]">{usersByRole.STUDENT} Students</Badge>
                            <Badge variant="outline" className="text-[10px]">{usersByRole.MANAGER} Managers</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-amber-500/5 border-amber-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Problems</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.totalProblems}</div>
                        <p className="text-xs text-muted-foreground mt-1">Sourced from fieldwork</p>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-500/5 border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Stakeholders</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.totalStakeholders}</div>
                        <p className="text-xs text-muted-foreground mt-1">Verified industry experts</p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Interactions</CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.totalInteractions}</div>
                        <p className="text-xs text-muted-foreground mt-1">Logged engagements</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold tracking-tight">Recent Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentSignups.map((user: any) => (
                                <div key={user.id} className="flex items-center justify-between p-3 rounded-xl border border-primary/5 bg-primary/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary uppercase">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest">{user.role}</Badge>
                                        <div className="text-[10px] text-muted-foreground">{format(new Date(user.createdAt), 'MMM d, p')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-none shadow-xl bg-card/50 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold tracking-tight">System Health</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Database className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-medium">Database Connection</span>
                                </div>
                                <Badge className={system.dbStatus === 'Operational' ? 'bg-emerald-500' : 'bg-red-500'}>
                                    {system.dbStatus}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Server className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-medium">Prisma ORM</span>
                                </div>
                                <code className="text-xs bg-muted px-2 py-1 rounded">v{system.prismaVersion}</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-medium">Next.js Framework</span>
                                </div>
                                <code className="text-xs bg-muted px-2 py-1 rounded">v{system.nextVersion}</code>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-primary to-primary-foreground border-none text-primary-foreground shadow-2xl">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-black mb-2 italic">Admin Pro-Tip</h3>
                            <p className="text-primary-foreground/80 leading-relaxed">
                                Use the Seed Controls tab to quickly populate the platform with realistic mock data for testing your journey map nudges and RAG chat.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
