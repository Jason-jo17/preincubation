// msme-demo/lib/types/mosi.ts

export type CEEDTag = 'Core' | 'Efficiency' | 'Expansion' | 'Disrupt';

export interface TranscriptParagraph {
    id: string;
    text: string;
    speaker: string;
    timestamp: number;
    status: 'Approved' | 'Hidden' | 'Pending';
    comment?: string;
}

export interface MosiStakeholder {
    id: string;
    company_id?: string;
    user_id?: string;
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    company_name?: string;
    sector?: string;
    employees?: string;
    revenue?: string;
    geography?: string;
    domain?: string;
    address?: string;
    pincode?: string;
    created_at?: string;
}

export interface MosiSession {
    id: string;
    stakeholder_id: string;
    user_id?: string;
    company_id?: string;
    companyId?: string; // Support for legacy camelCase in demo data
    status: 'Scheduled' | 'Recording' | 'Review' | 'Published' | string;
    date: string;
    duration: number; // in seconds
    audio_settings?: {
        audio: boolean;
        video: boolean;
    };
    summary?: string;
    problem_summary?: string;
    potential_roi?: string;
    tech_stack_recommended?: string[];
    transcript: (TranscriptParagraph | { speaker: string; time: string; text: string; opportunity?: boolean })[];
    recording_url?: string;
    created_at?: string;
    metadata?: {
        stakeholder: string;
        company: string;
        session_name: string;
    };
}

export interface MosiOpportunity {
    id: string;
    session_id: string;
    timestamp: number;
    title: string;
    description?: string;
    tag: CEEDTag;
    
    // Rubric Scoring (1-4)
    problem_clarity: number;
    budget_score: number;
    
    // Logistics & Matching
    is_paid: boolean;
    reward_amount?: string;
    working_hours?: number;
    duration_commitment?: string;
    
    origin: 'Customer' | 'Interviewer';
    actively_seeking: boolean;
    
    // Talent Attributes
    skillset: string[];
    toolset: string[];
    mindset: string[];
    
    // Assessment Matrix
    assessment_matrix: {
        clarity: number;
        awareness: number;
        attempts: number;
        intensity: number;
    };
    
    notes?: string;
    status: 'Approved' | 'Hidden' | 'Pending';
    comment?: string;
    created_at?: string;
}

export interface MosiEvidence {
    id: string;
    session_id: string;
    opportunity_id?: string;
    type: 'image' | 'video' | 'link' | 'file';
    url: string;
    title?: string;
    timestamp?: number;
    created_at?: string;
}

export interface UnifiedOpportunity {
    id: string;
    session_id?: string;
    company_id?: string;
    title: string;
    description?: string;
    ceed_tag: string;
    problem_clarity: number;
    budget_availability: number;
    is_paid_project: boolean;
    budget_amount: number;
    working_hours_defined: number;
    owner_origin: string;
    customer_actively_seeking: boolean;
    skillset: string[];
    toolset: string[];
    mindset: string[];
    duration_weeks: number;
    sync_status: string;
}
