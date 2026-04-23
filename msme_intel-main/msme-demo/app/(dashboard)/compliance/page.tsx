"use client"

import { useQuery } from "@tanstack/react-query"
import { AlertCircle, RefreshCw, ShieldAlert, BadgeCheck, Scale, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/shared/page-container"
import { ContentCard } from "@/components/shared/content-card"
import { ComplianceOverview } from "@/components/compliance/compliance-overview"
import { RiskHeatmap } from "@/components/compliance/risk-heatmap"
import { Badge } from "@/components/ui/badge"

import {
    getComplianceMetrics,
    getRiskFactors
} from "@/lib/demo-data/dashboard-api"

export default function ComplianceDashboardPage() {
    const { data: metrics, isLoading: metricsLoading, refetch: refetchMetrics } = useQuery({
        queryKey: ["compliance-metrics"],
        queryFn: getComplianceMetrics
    })

    const { data: riskFactors, isLoading: risksLoading } = useQuery({
        queryKey: ["risk-factors"],
        queryFn: getRiskFactors
    })

    return (
        <PageContainer 
            title="Compliance & Governance" 
            description="Regional statutory health and industrial alignment analytics"
            actions={
                <Button variant="outline" size="sm" onClick={() => refetchMetrics()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Audit Audit
                </Button>
            }
        >
            {/* Legend/Status */}
            <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                    <Info className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-blue-900">Regional Compliance Directive</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Data is synthesized from verified RoC (Registrar of Companies) filings, GST return frequency, and BOPPL-verified field audits. 
                        Mismatches indicate industrial operations that deviate from registered primary business activities.
                    </p>
                </div>
            </div>

            {/* Top Metrics */}
            {metrics && <ComplianceOverview metrics={metrics} />}

            <div className="mt-8 grid gap-6 lg:grid-cols-5">
                {/* Visual Analytics */}
                <ContentCard 
                    title="Sector Realignment Heatmap" 
                    description="Concentration of verified sector identity vs. registered identity"
                    className="lg:col-span-3"
                >
                    {metrics && <RiskHeatmap data={metrics.sector_mismatches} />}
                </ContentCard>

                {/* Risk Factors List */}
                <ContentCard 
                    title="Critical Risk Inventory" 
                    description="Highest priority systemic governance issues"
                    className="lg:col-span-2"
                >
                    <div className="space-y-4">
                        {riskFactors?.map((risk) => (
                            <div key={risk.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        {risk.severity === 'critical' ? (
                                            <ShieldAlert className="h-4 w-4 text-rose-600" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                        )}
                                    </div>
                                    <Badge variant={risk.severity === 'critical' ? 'destructive' : 'secondary'} className="uppercase text-[10px]">
                                        {risk.severity}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900 tracking-tight">{risk.factor}</p>
                                    <p className="text-xs text-slate-500 leading-snug">{risk.description}</p>
                                </div>
                                <div className="pt-2 flex items-center justify-between border-t border-slate-100/50">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <Scale className="h-3 w-3" />
                                        <span>Affected Nodes</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{risk.affected_companies} Entities</span>
                                </div>
                            </div>
                        ))}
                        
                        <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600">
                            Download Full Risk Audit .PDF
                        </Button>
                    </div>
                </ContentCard>
            </div>

            {/* Data Provenance Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    <span>Real-time RoC Feed Active</span>
                </div>
                <span>Last Regional Audit: {new Date().toLocaleDateString()}</span>
            </div>
        </PageContainer>
    )
}
