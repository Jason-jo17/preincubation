"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
    Building2,
    IndianRupee,
    RefreshCw,
    Target,
    TrendingUp,
    ChevronDown,
    ChevronUp,
    LayoutGrid,
    PieChart,
    Map as MapIcon,
    History
} from "lucide-react"
import { subDays } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { MarketShareGrowthChart } from "@/components/dashboard/market-share-growth-chart"
import { FunnelConversionChart } from "@/components/dashboard/funnel-conversion-chart"
import { GeographicHeatmap } from "@/components/dashboard/geographic-heatmap"
import { MetricCard } from "@/components/dashboard/metric-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { EnrolledEcosystemsChart } from "@/components/ecosystem/ecosystem-stats"
import { RecentActivityFeed } from "@/components/dashboard/recent-activity-feed"
import { SectorDistributionChart } from "@/components/dashboard/sector-distribution-chart"
import { TopPerformersList } from "@/components/dashboard/top-performers-list"
import { PageContainer } from "@/components/shared/page-container"
import { ContentCard } from "@/components/shared/content-card"

import {
    getDashboardMetrics,
    getMarketShareGrowthData,
    getFunnelConversionData,
    getGeographicDistribution,
    getRecentActivity,
    getSectorDistribution,
    getTopPerformers,
} from "@/lib/demo-data/dashboard-api"
import { DashboardFilters } from "@/lib/types/dashboard"

export default function DashboardPage() {
    const [showMore, setShowMore] = useState(false)
    const [filters, setFilters] = useState<DashboardFilters>({
        date_range: {
            from: subDays(new Date(), 90),
            to: new Date(),
        },
        sectors: [],
        stages: [],
        rag_status: [],
        search_query: "",
    })

    const { data: metrics, refetch: refetchMetrics } = useQuery({
        queryKey: ["dashboard-metrics", filters],
        queryFn: async () => getDashboardMetrics(),
    })

    const { data: funnelData } = useQuery({
        queryKey: ["funnel-conversion", filters],
        queryFn: () => getFunnelConversionData(),
    })

    const { data: marketData } = useQuery({
        queryKey: ["market-share-growth", filters],
        queryFn: () => getMarketShareGrowthData(),
    })

    const { data: sectorData } = useQuery({
        queryKey: ["sector-distribution", filters],
        queryFn: () => getSectorDistribution(),
    })

    const { data: topPerformers } = useQuery({
        queryKey: ["top-performers", filters],
        queryFn: () => getTopPerformers(),
    })

    const { data: recentActivity } = useQuery({
        queryKey: ["recent-activity"],
        queryFn: () => getRecentActivity(),
        refetchInterval: 10000,
    })

    const { data: geoData } = useQuery({
        queryKey: ["geographic-distribution", filters],
        queryFn: () => getGeographicDistribution(),
    })

    return (
        <PageContainer 
            title="Dashboard" 
            description="MSME Intelligence Platform Overview"
            actions={
                <div className="flex items-center gap-3">
                    <DateRangePicker
                        value={filters.date_range}
                        onChange={(range) => setFilters({ ...filters, date_range: range })}
                    />
                    <Button variant="outline" size="icon" onClick={() => refetchMetrics()}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            {/* Top Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Companies"
                    value={metrics?.total_companies || 0}
                    change={metrics?.total_companies_change || 0}
                    icon={<Building2 className="h-4 w-4 text-blue-600" />}
                    description="vs last month"
                    trend="up"
                    sparklineData={[40, 45, 42, 48, 50, 52, 55, 58, 60, 58, 62, 65]}
                />

                <MetricCard
                    title="Avg Growth Rate"
                    value={`${metrics?.avg_growth_rate?.toFixed(1) || 0}%`}
                    change={metrics?.avg_growth_rate_change || 0}
                    icon={<TrendingUp className="h-4 w-4 text-emerald-600" />}
                    description="vs last quarter"
                    trend="up"
                    sparklineData={[22, 24, 23, 25, 26, 27, 28, 28.5]}
                />

                <MetricCard
                    title="Portfolio Value"
                    value={`₹${metrics?.total_portfolio_value?.toFixed(1) || 0} Cr`}
                    change={metrics?.portfolio_value_change || 0}
                    icon={<IndianRupee className="h-4 w-4 text-amber-600" />}
                    description="year over year"
                    trend="up"
                    sparklineData={[70, 72, 75, 78, 80, 82, 85.4]}
                />

                <MetricCard
                    title="Gap Coverage"
                    value={`${metrics?.gap_analysis_coverage || 0}%`}
                    change={metrics?.gap_analysis_coverage_change || 0}
                    icon={<Target className="h-4 w-4 text-purple-600" />}
                    description="18 companies analyzed"
                    trend={(metrics?.gap_analysis_coverage_change || 0) >= 0 ? "up" : "down"}
                    sparklineData={[45, 48, 52, 55, 58, 60, 63, 65]}
                />
            </div>

            {/* Main Intelligence Tabs */}
            <Tabs defaultValue="lifecycle" className="w-full space-y-4">
                <TabsList className="bg-slate-100/50 p-1 rounded-xl h-11 border border-slate-200">
                    <TabsTrigger value="lifecycle" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                        <LayoutGrid className="h-3.5 w-3.5" /> Pipeline Lifecycle
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                        <PieChart className="h-3.5 w-3.5" /> Market Performance
                    </TabsTrigger>
                    <TabsTrigger value="geographic" className="rounded-lg gap-2 font-bold text-xs uppercase tracking-wider px-4">
                        <MapIcon className="h-3.5 w-3.5" /> Regional Distribution
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="lifecycle" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-6 lg:grid-cols-7">
                        <ContentCard 
                            title="Funnel Conversion" 
                            description="Company progression through 6 strategic stages"
                            className="lg:col-span-4"
                        >
                            {funnelData && <FunnelConversionChart data={funnelData} />}
                        </ContentCard>

                        <ContentCard 
                            title="Sector Distribution" 
                            description="Market composition by core sectors"
                            className="lg:col-span-3"
                        >
                            {sectorData && <SectorDistributionChart data={sectorData} />}
                        </ContentCard>
                    </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <ContentCard 
                            title="Growth vs Market Share" 
                            description="Strategic company performance matrix"
                        >
                            {marketData && <MarketShareGrowthChart data={marketData} />}
                        </ContentCard>

                        <div className="h-full">
                            <EnrolledEcosystemsChart />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="geographic" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ContentCard 
                        title="Geographic Hub Distribution" 
                        description="Company density across regional MSME corridors"
                    >
                        {geoData && <GeographicHeatmap data={geoData} />}
                    </ContentCard>
                </TabsContent>
            </Tabs>

            {/* Collapsible Secondary Insights */}
            <div className="pt-4 border-t border-slate-200">
                <button 
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center justify-between w-full group py-2"
                >
                    <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Forensic Insights & Performers</span>
                    </div>
                    {showMore ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>

                <AnimatePresence>
                    {showMore && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-6 pt-6"
                        >
                            <div className="grid gap-6 lg:grid-cols-2">
                                <ContentCard title="Top Performers" description="Leading companies by composite score">
                                    {topPerformers && <TopPerformersList companies={topPerformers} />}
                                </ContentCard>

                                <ContentCard title="Recent Intelligence" description="Latest synthesized discovery signals">
                                    {recentActivity && <RecentActivityFeed activities={recentActivity} />}
                                </ContentCard>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-6">
                <QuickActions />
            </div>
        </PageContainer>
    )
}
