import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function JourneyOverviewTab() {
    const { data: journeys, isLoading } = useQuery({
        queryKey: ['admin-journeys'],
        queryFn: async () => {
            const res = await fetch('/api/admin/journeys')
            return res.json()
        }
    })

    if (isLoading) return <div>Loading journeys...</div>

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-indigo-600 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-black italic mb-2 tracking-tighter">Cohort Momentum</h3>
                    <p className="opacity-90 max-w-lg mb-6 text-sm font-medium">Tracking the innovation journey of all active student founders across sectors and technology readiness levels.</p>
                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
                            <TrendingUp className="h-5 w-5 mb-1" />
                            <div className="text-2xl font-black">{journeys?.length || 0}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Active Journeys</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
                            <ShieldCheck className="h-5 w-5 mb-1" />
                            <div className="text-2xl font-black">{journeys?.filter((j: any) => j.trlLevel > 3).length || 0}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">TRL 4+ Projects</div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </div>

            <div className="rounded-xl border-none shadow-2xl bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="border-none">
                            <TableHead className="font-bold text-primary py-4">Founder</TableHead>
                            <TableHead className="font-bold text-primary">Sector</TableHead>
                            <TableHead className="font-bold text-primary">Stage</TableHead>
                            <TableHead className="font-bold text-primary">TRL</TableHead>
                            <TableHead className="font-bold text-primary">Score (C/P)</TableHead>
                            <TableHead className="font-bold text-primary">Sprints</TableHead>
                            <TableHead className="font-bold text-primary text-right">Review</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {journeys?.map((j: any) => (
                            <TableRow key={j.id} className="hover:bg-primary/5 transition-colors border-primary/5 group">
                                <TableCell className="font-bold py-4">{j.userName}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-600 border-indigo-500/20">
                                        {j.sector}
                                    </Badge>
                                </TableCell>
                                <TableCell className="capitalize text-sm font-medium text-muted-foreground">{j.stage}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="font-black">L{j.trlLevel}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs font-bold">
                                    <span className="text-emerald-600">{j.complianceScore}%</span> / <span className="text-blue-600">{j.pilotReadiness}%</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-black text-[10px]">{j.sprintsCompleted} Complete</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/manager/review/${j.userId}`}>
                                        <Button size="sm" variant="ghost" className="h-8 group-hover:bg-primary group-hover:text-white transition-all">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
