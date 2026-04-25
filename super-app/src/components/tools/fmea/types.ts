
export interface FMEAItem {
    id: string;
    process: string;
    failureMode: string;
    effect: string;
    severity: number; // 1-10
    cause: string;
    occurrence: number; // 1-10
    controls: string;
    detection: number; // 1-10
    rpn: number; // severity * occurrence * detection
}

export interface FMEAData {
    items: FMEAItem[];
    lastUpdated: string;
}
