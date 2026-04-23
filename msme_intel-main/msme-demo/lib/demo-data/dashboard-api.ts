import {
    DashboardMetrics,
    FunnelConversionData,
    FinancialTrendData,
    SectorDistribution,
    RAGDistribution,
    TopPerformer,
    RecentActivity,
    GeographicDistribution,
    MarketShareGrowthData,
    ComplianceMetrics,
    RiskFactor
} from '@/lib/types/dashboard';
import { DEMO_COMPANIES } from './companies';
import { NEW_COMPANIES } from './new-companies';

// Mock Data Generators

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        total_companies: 30,
        total_companies_change: 7.1,
        avg_growth_rate: 28.5,
        avg_growth_rate_change: 4.0,
        total_portfolio_value: 85.4,
        portfolio_value_change: 12.0,
        gap_analysis_coverage: 65,
        gap_analysis_coverage_change: 8.3
    };
}

export async function getFunnelConversionData(): Promise<FunnelConversionData> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        stage_1_uploaded: 100,
        stage_2_scored: 75,
        stage_3_financials: 75,
        stage_4_rag_classified: 45,
        stage_5_gap_analyzed: 45,
        stage_6_roadmap_generated: 45,
        conversion_rates: {
            stage_1_to_2: 75.0,
            stage_2_to_3: 100.0,
            stage_3_to_4: 60.0,
            stage_4_to_5: 100.0,
            stage_5_to_6: 100.0
        }
    };
}

export async function getFinancialTrends(): Promise<FinancialTrendData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { date: '2023-01', revenue: 4000, profit: 2400, investment: 1000 },
        { date: '2023-02', revenue: 3000, profit: 1398, investment: 2000 },
        { date: '2023-03', revenue: 2000, profit: 9800, investment: 2290 },
        { date: '2023-04', revenue: 2780, profit: 3908, investment: 2000 },
        { date: '2023-05', revenue: 1890, profit: 4800, investment: 2181 },
        { date: '2023-06', revenue: 2390, profit: 3800, investment: 2500 },
        { date: '2023-07', revenue: 3490, profit: 4300, investment: 2100 },
    ];
}

export async function getSectorDistribution(): Promise<SectorDistribution[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { sector: 'digital_services', count: 3, percentage: 23.0, total_value: 15.2, avg_score: 75 },
        { sector: 'financial_services', count: 4, percentage: 30.7, total_value: 42.5, avg_score: 82 },
        { sector: 'talent_acquisition', count: 2, percentage: 15.3, total_value: 8.7, avg_score: 68 },
        { sector: 'marketing', count: 2, percentage: 15.3, total_value: 5.4, avg_score: 71 },
        { sector: 'legal_ip', count: 2, percentage: 15.3, total_value: 12.1, avg_score: 88 },
    ];
}

export async function getRAGDistribution(): Promise<RAGDistribution> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        green: 12,
        amber: 10,
        red: 8
    };
}

export async function getTopPerformers(): Promise<TopPerformer[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return DEMO_COMPANIES
        .slice(0, 10)
        .map(c => ({
            id: c.id,
            name: c.name,
            sector: c.sector,
            overall_score: Math.floor(Math.random() * (95 - 60) + 60), // Mock score if missing
            rag_status: ['green', 'amber', 'red'][Math.floor(Math.random() * 3)] as 'green' | 'amber' | 'red',
            revenue: c.revenue_current || 0,
            growth_rate: c.revenue_growth_rate || 0,
            stage: c.current_stage || 1
        }))
        .sort((a, b) => b.overall_score - a.overall_score);
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        {
            id: 'act-1',
            company_id: 'comp-001',
            company_name: 'TechForge Manufacturing',
            action: 'completed',
            stage_from: 5,
            stage_to: 6,
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            details: 'Roadmap generated successfully'
        },
        {
            id: 'act-2',
            company_id: 'comp-011',
            company_name: 'PayEase Solutions',
            action: 'analyzed',
            stage_from: 4,
            stage_to: 5,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            details: 'Gap analysis completed'
        },
        {
            id: 'act-3',
            company_id: 'comp-021',
            company_name: 'FarmTech Solutions',
            action: 'uploaded',
            stage_from: 0,
            stage_to: 1,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            details: 'Initial data uploaded'
        },
        {
            id: 'act-4',
            company_id: 'comp-005',
            company_name: 'GreenMetal Works',
            action: 'classified',
            stage_from: 3,
            stage_to: 4,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            details: 'Classified as GREEN'
        },
        {
            id: 'act-5',
            company_id: 'comp-015',
            company_name: 'CryptoGate India',
            action: 'scored',
            stage_from: 1,
            stage_to: 2,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
            details: 'Thesis score: 85/100'
        }
    ];
}

export async function getGeographicDistribution(): Promise<GeographicDistribution[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { state: 'Maharashtra', count: 8, total_value: 25.5, avg_score: 78 },
        { state: 'Karnataka', count: 10, total_value: 32.1, avg_score: 82 },
        { state: 'Tamil Nadu', count: 4, total_value: 12.4, avg_score: 75 },
        { state: 'Telangana', count: 3, total_value: 8.2, avg_score: 70 },
        { state: 'Gujarat', count: 2, total_value: 4.5, avg_score: 65 },
        { state: 'Delhi', count: 1, total_value: 2.1, avg_score: 88 },
    ];
}

export async function getMarketShareGrowthData(): Promise<MarketShareGrowthData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate total revenue per sector
    const sectorRevenues: Record<string, number> = {};
    DEMO_COMPANIES.forEach(company => {
        const rev = company.revenue_current || 0;
        if (!sectorRevenues[company.sector]) {
            sectorRevenues[company.sector] = 0;
        }
        sectorRevenues[company.sector] += rev;
    });

    return DEMO_COMPANIES.map(company => {
        const sectorTotal = sectorRevenues[company.sector] || 1; // avoid div by 0
        const revenue = company.revenue_current || 0;
        const marketShare = (revenue / sectorTotal) * 100;

        return {
            id: company.id,
            name: company.name,
            sector: company.sector,
            growth: company.revenue_growth_rate || 0,
            marketShare: parseFloat(marketShare.toFixed(2)),
            revenue: revenue
        };
    });
}

export async function getComplianceMetrics(): Promise<ComplianceMetrics> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Analyze NEW_COMPANIES for risks
    const total = NEW_COMPANIES.length;
    const withMismatches = NEW_COMPANIES.filter(c => c.warning?.toLowerCase().includes('mismatch') || c.warning?.toLowerCase().includes('sector')).length;
    const withFilingIssues = NEW_COMPANIES.filter(c => c.notes?.toLowerCase().includes('mca') || c.notes?.toLowerCase().includes('filing')).length;
    
    // Sector mismatch mapping
    const mismatchMap: Record<string, number> = {};
    NEW_COMPANIES.forEach(c => {
        if (c.warning?.toLowerCase().includes('sector')) {
            mismatchMap[c.sector] = (mismatchMap[c.sector] || 0) + 1;
        }
    });

    return {
        overall_health_score: 68,
        statutory_filing_coverage: 72,
        verified_sector_alignment: Math.round(((total - withMismatches) / total) * 100),
        last_audit_completion: 45,
        red_flag_count: withMismatches + withFilingIssues,
        risk_distribution: {
            high: withMismatches,
            medium: withFilingIssues,
            low: total - withMismatches - withFilingIssues
        },
        sector_mismatches: Object.entries(mismatchMap).map(([sector, count]) => ({ sector, count }))
    };
}

export async function getRiskFactors(): Promise<RiskFactor[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    return [
        {
            id: 'risk-1',
            factor: 'Sector Classification Mismatch',
            description: 'Disparity between registered RoC activity and actual industrial operations.',
            severity: 'critical',
            affected_companies: NEW_COMPANIES.filter(c => c.warning?.toLowerCase().includes('sector')).length
        },
        {
            id: 'risk-2',
            factor: 'Stale MCA Filings',
            description: 'Companies with >24 months lag in financial statement submission.',
            severity: 'high',
            affected_companies: 4
        },
        {
            id: 'risk-3',
            factor: 'Audit Committee Vacancy',
            description: 'Missing mandatory independent directors for specific thresholds.',
            severity: 'medium',
            affected_companies: 3
        }
    ];
}
