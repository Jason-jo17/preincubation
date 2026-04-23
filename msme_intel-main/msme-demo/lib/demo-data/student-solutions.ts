
export interface StudentSolution {
    id: string;
    name: string;
    description: string;
    provider: string;
    tags: string[];
}

export const STUDENT_SOLUTIONS: StudentSolution[] = [
    {
        id: 'sol-001',
        name: 'AI-Powered Visual Inspection Kit',
        description: 'Low-cost edge AI camera system for automated defect detection in machining and casting.',
        provider: 'VNIT Nagpur - Team Vision',
        tags: ['Computer Vision', 'Quality Control', 'Manufacturing'],
    },
    {
        id: 'sol-002',
        name: 'Smart Energy Monitoring Node',
        description: 'Retrofit IoT nodes for real-time energy profiling and predictive downtime analysis of legacy CNC machines.',
        provider: 'IIM Nagpur - Industry 4.0 Lab',
        tags: ['IoT', 'Energy Efficiency', 'Predictive Maintenance'],
    },
    {
        id: 'sol-003',
        name: 'QR-Based Shopfloor MES',
        description: 'Lightweight job-card tracking system using mobile QR scanning and real-time dashboarding for SMEs.',
        provider: 'PCE Nagpur - Digital Manufacturing Group',
        tags: ['Digitalization', 'Operations', 'Traceability'],
    },
    {
        id: 'sol-004',
        name: 'Low-Cost Vibration Logger',
        description: 'Portable vibration monitoring kit for predictive maintenance of centrifugal pumps and motors.',
        provider: 'YCCE Nagpur - Mechanical Systems Research',
        tags: ['Maintenance', 'IoT', 'Hardware'],
    }
];
