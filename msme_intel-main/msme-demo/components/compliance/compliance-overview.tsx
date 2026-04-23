"use client"

import { ShieldCheck, AlertTriangle, FileText, Search } from "lucide-react"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ComplianceMetrics } from "@/lib/types/dashboard"

interface ComplianceOverviewProps {
    metrics: ComplianceMetrics
}

export function ComplianceOverview({ metrics }: ComplianceOverviewProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
                title="Governance Health"
                value={`${metrics.overall_health_score}%`}
                icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                description="Consolidated cohort score"
                trend="down"
                change={-2.4}
            />

            <MetricCard
                title="Verified Alignment"
                value={`${metrics.verified_sector_alignment}%`}
                icon={<Search className="h-4 w-4 text-blue-600" />}
                description="Reality vs. RoC registration"
                trend="up"
                change={1.2}
            />

            <MetricCard
                title="Filing Coverage"
                value={`${metrics.statutory_filing_coverage}%`}
                icon={<FileText className="h-4 w-4 text-amber-600" />}
                description="MCA/GST submission health"
                trend="down"
                change={-5.1}
            />

            <MetricCard
                title="Critical Red Flags"
                value={metrics.red_flag_count}
                icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
                description="Urgent intervention nodes"
                trend="up"
                change={14.0}
            />
        </div>
    )
}
