
export interface FunnelStage {
    name: string;
    description: string;
    count: number;
    metrics: string;
}

export interface AARRRData {
    acquisition: FunnelStage;
    activation: FunnelStage;
    retention: FunnelStage;
    referral: FunnelStage;
    revenue: FunnelStage;
    currency: string;
    lastUpdated: string;
}
