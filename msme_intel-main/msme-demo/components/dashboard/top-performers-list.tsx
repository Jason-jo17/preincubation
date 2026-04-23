"use client"

import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

import { TopPerformer } from "@/lib/types/dashboard"

interface TopPerformersListProps {
    companies: TopPerformer[]
}

const RAG_CONFIG = {
    green: { color: "bg-green-500", label: "Best Bet" },
    amber: { color: "bg-amber-500", label: "Best Fit" },
    red: { color: "bg-red-500", label: "Stretched" },
}

export function TopPerformersList({ companies }: TopPerformersListProps) {
    if (!companies || companies.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No data available
            </div>
        )
    }

    return (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {companies.map((company, index) => (
                <Link
                    key={company.id}
                    href={`/funnel/${company.id}/gap-analysis`} // Link to Gap Analysis for now as a landing
                    className="block"
                >
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group border border-transparent hover:border-border">
                        {/* Rank */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary shrink-0">
                            {index + 1}
                        </div>

                        {/* Company Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium truncate group-hover:text-primary transition-colors">
                                    {company.name}
                                </p>
                                <div
                                    className={`h-2 w-2 rounded-full ${RAG_CONFIG[company.rag_status].color}`}
                                    title={RAG_CONFIG[company.rag_status].label}
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="capitalize">
                                    {company.sector.replace(/_/g, " ")}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    {company.growth_rate.toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right shrink-0">
                            <div className="text-lg font-bold">{company.overall_score}</div>
                            <Progress value={company.overall_score} className="w-16 h-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
