import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, RefreshCw, Layers, Users as UsersIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function SeedControlsTab({ stats }: { stats: any }) {
    const [loading, setLoading] = useState<string | null>(null)

    const handleAction = async (action: string, endpoint: string) => {
        setLoading(action)
        try {
            const res = await fetch(endpoint, { method: action === 'Reset' ? 'POST' : 'GET' })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message || `${action} completed successfully`)
            } else {
                toast.error(data.error || `Failed to ${action}`)
            }
        } catch (error) {
            toast.error("Network error")
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-xl bg-card/50 backdrop-blur group hover:shadow-primary/20 transition-all duration-500">
                <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UsersIcon className="h-6 w-6 text-emerald-500" />
                    </div>
                    <CardTitle className="text-xl font-bold italic tracking-tight uppercase">Seed Stakeholders</CardTitle>
                    <CardDescription>Populate the database with verified industry expert profiles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Current Count</span>
                        <span className="text-emerald-500 text-lg font-black">{stats.totalStakeholders}</span>
                    </div>
                    <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold tracking-tight shadow-lg shadow-emerald-500/20"
                        onClick={() => handleAction('Seed', '/api/debug-seed')}
                        disabled={loading !== null}
                    >
                        {loading === 'Seed' ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                        Run Seed Script
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-card/50 backdrop-blur group hover:shadow-amber-500/20 transition-all duration-500">
                <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Layers className="h-6 w-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl font-bold italic tracking-tight uppercase">Seed Content</CardTitle>
                    <CardDescription>Add default sectors, problem statements, and solutions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Problems/Solutions</span>
                        <span className="text-amber-500 text-lg font-black">{stats.totalProblems}/{stats.totalSolutions}</span>
                    </div>
                    <Button 
                        className="w-full bg-amber-600 hover:bg-amber-700 font-bold tracking-tight shadow-lg shadow-amber-500/20"
                        onClick={() => handleAction('SeedContent', '/api/debug-seed')}
                        disabled={loading !== null}
                    >
                        {loading === 'SeedContent' ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                        Run Content Seed
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-card/50 backdrop-blur group hover:shadow-red-500/20 transition-all duration-500">
                <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <RefreshCw className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-xl font-bold italic tracking-tight uppercase">Reset Progress</CardTitle>
                    <CardDescription>Clear all student tool progress, tasks, and journey milestones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 rounded-xl border border-red-500/10 bg-red-500/5 text-xs text-red-600 font-bold leading-tight">
                        WARNING: This action is irreversible and will reset roadmaps for all users.
                    </div>
                    <Button 
                        variant="destructive"
                        className="w-full font-bold tracking-tight shadow-lg shadow-red-500/20"
                        onClick={() => {
                            if (confirm("DANGEROUS: Are you absolutely sure you want to reset all team progress?")) {
                                handleAction('Reset', '/api/admin/debug/reset-progress')
                            }
                        }}
                        disabled={loading !== null}
                    >
                        {loading === 'Reset' ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                        Reset Journey Meta
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
