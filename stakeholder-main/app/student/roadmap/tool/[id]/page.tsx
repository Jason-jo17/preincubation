"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getRoadmapData } from "@/app/actions/roadmap"
import { ToolRunner } from "@/components/student/roadmap/ToolRunner"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ToolPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [tool, setTool] = useState<any>(null)
    const [progress, setProgress] = useState<any>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await getRoadmapData()
            if ('error' in res && res.error) {
                toast.error(res.error)
                return
            }

            if (!res.stages) {
                toast.error("Roadmap structure not found")
                router.push('/student/dashboard')
                return
            }

            // Find the tool in the roadmap data
            let foundTool = null
            for (const stage of res.stages) {
                const t = stage.tools.find((t: any) => t.toolId === params.id)
                if (t) {
                    foundTool = t
                    break
                }
            }

            if (foundTool) {
                setTool(foundTool)
                // Get progress for this specific tool
                const p = res.progress?.toolProgress?.find((tp: any) => tp.toolId === params.id)
                setProgress(p)
            } else {
                toast.error("Tool not found")
                router.push('/student/dashboard')
            }
        } catch (e) {
            toast.error("Failed to load tool data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading tool session...</p>
            </div>
        )
    }

    if (!tool) return null

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
            <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href="/student/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-bold text-lg">{tool.name}</h1>
                            <p className="text-xs text-muted-foreground">Interactive Roadmap Tool • {tool.week ? `Week ${tool.week}` : 'Strategic Asset'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => fetchData()}>
                            Sync Progress
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <div className="bg-background border rounded-2xl shadow-sm overflow-hidden min-h-[calc(100vh-10rem)]">
                    <ToolRunner
                        tool={tool}
                        progress={progress}
                        onDataSaved={() => {
                            toast.success("Progress saved automatically")
                            fetchData()
                        }}
                    />
                </div>
            </main>
        </div>
    )
}
