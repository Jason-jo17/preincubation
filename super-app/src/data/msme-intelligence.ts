export interface FunnelConversionData {
    stage_1_uploaded: number;
    stage_2_scored: number;
    stage_3_financials: number;
    stage_4_rag_classified: number;
    stage_5_gap_analyzed: number;
    stage_6_roadmap_generated: number;
    conversion_rates: {
        stage_1_to_2: number;
        stage_2_to_3: number;
        stage_3_to_4: number;
        stage_4_to_5: number;
        stage_5_to_6: number;
    };
}

export interface SectorDistribution {
    sector: string;
    count: number;
    percentage: number;
    total_value: number;
    avg_score: number;
}

export interface GeographicDistribution {
    region: string;
    count: number;
    total_value: number;
    avg_score: number;
}

export interface MarketShareGrowthData {
    id: string;
    name: string;
    sector: string;
    growth: number;
    marketShare: number;
    revenue: number;
}

export const funnelDataMock: FunnelConversionData = {
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

export const sectorDistributionMock: SectorDistribution[] = [
    { sector: 'digital_services', count: 3, percentage: 23.0, total_value: 15.2, avg_score: 75 },
    { sector: 'financial_services', count: 4, percentage: 30.7, total_value: 42.5, avg_score: 82 },
    { sector: 'talent_acquisition', count: 2, percentage: 15.3, total_value: 8.7, avg_score: 68 },
    { sector: 'marketing', count: 2, percentage: 15.3, total_value: 5.4, avg_score: 71 },
    { sector: 'legal_ip', count: 2, percentage: 15.3, total_value: 12.1, avg_score: 88 },
];

export const geoDistributionMock: GeographicDistribution[] = [
    { region: 'Mumbai', count: 12, total_value: 45.5, avg_score: 85 },
    { region: 'Pune', count: 10, total_value: 32.1, avg_score: 82 },
    { region: 'Nagpur', count: 8, total_value: 20.4, avg_score: 75 },
    { region: 'Nashik', count: 5, total_value: 12.2, avg_score: 70 },
    { region: 'Aurangabad', count: 3, total_value: 8.5, avg_score: 65 },
    { region: 'Thane', count: 4, total_value: 9.1, avg_score: 72 },
];

export const marketShareMock: MarketShareGrowthData[] = [
    { id: '1', name: 'MahaTech Manufacturing', sector: 'digital_services', growth: 120, marketShare: 18, revenue: 15000000 },
    { id: '2', name: 'Pune Agri-Innovations', sector: 'agritech', growth: 65, marketShare: 8, revenue: 5000000 },
    { id: '3', name: 'Mumbai FinSecure', sector: 'financial_services', growth: 180, marketShare: 22, revenue: 25000000 },
    { id: '4', name: 'Nagpur Logistics Hub', sector: 'logistics', growth: 30, marketShare: 12, revenue: 12000000 },
    { id: '5', name: 'Nashik HealthPulse Labs', sector: 'healthtech', growth: 85, marketShare: 15, revenue: 18000000 },
    { id: '6', name: 'EduSmart AI Pune', sector: 'edtech', growth: 150, marketShare: 5, revenue: 3000000 },
    { id: '7', name: 'Aurangabad EcoEnergy', sector: 'cleantech', growth: 45, marketShare: 10, revenue: 9000000 },
    { id: '8', name: 'Vidarbha Retail Analytics', sector: 'digital_services', growth: 25, marketShare: 20, revenue: 22000000 },
];
