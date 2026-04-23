
export interface EcosystemCompany {
    id: string;
    name: string;
    description: string;
    rating: number;
    location: string;
    contact: {
        email: string;
        phone: string;
        website: string;
    };
    services: string[];
    match_score?: number;
}

export interface EcosystemCategory {
    id: string;
    title: string;
    description: string;
    icon_name: 'Cpu' | 'Landmark' | 'Users' | 'Megaphone' | 'Scale' | 'Globe' | 'Code'; // Lucide icon names
    companies: EcosystemCompany[];
}

export const ECOSYSTEM_DATA: EcosystemCategory[] = [
    {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Cloud migration, ERP, and process automation experts.',
        icon_name: 'Cpu',
        companies: [
            {
                id: 'dt-001',
                name: 'TechSolutions Inc.',
                description: 'Specializing in cloud migration and ERP implementation for manufacturing MSMEs.',
                rating: 4.8,
                location: 'Bangalore, Karnataka',
                contact: {
                    email: 'contact@techsolutions.example.com',
                    phone: '+91 80 1234 5678',
                    website: 'https://techsolutions.example.com'
                },
                services: ['Cloud Migration', 'ERP Implementation', 'IoT Solutions'],
                match_score: 95
            },
            {
                id: 'dt-002',
                name: 'Innovate Digital',
                description: 'Digital workflow automation and data analytics services.',
                rating: 4.6,
                location: 'Pune, Maharashtra',
                contact: {
                    email: 'info@innovatedigital.example.com',
                    phone: '+91 20 8765 4321',
                    website: 'https://innovatedigital.example.com'
                },
                services: ['Workflow Automation', 'Data Analytics', 'Cybersecurity'],
                match_score: 88
            }
        ]
    },
    {
        id: 'financial-services',
        title: 'Financial Services',
        description: 'Banking, lending, and investment partners.',
        icon_name: 'Landmark',
        companies: [
            {
                id: 'fs-001',
                name: 'GrowthCapital Partners',
                description: 'Providing working capital loans and growth financing for early-stage startups.',
                rating: 4.9,
                location: 'Mumbai, Maharashtra',
                contact: {
                    email: 'loans@growthcapital.example.com',
                    phone: '+91 22 1234 5678',
                    website: 'https://growthcapital.example.com'
                },
                services: ['Working Capital Loans', 'Venture Debt', 'Financial Advisory'],
                match_score: 92
            },
            {
                id: 'fs-002',
                name: 'SME Bank of India',
                description: 'Dedicated banking solutions for small and medium enterprises.',
                rating: 4.5,
                location: 'New Delhi, Delhi',
                contact: {
                    email: 'support@smebank.example.com',
                    phone: '1800 123 4567',
                    website: 'https://smebank.example.com'
                },
                services: ['Business Accounts', 'Trade Finance', 'MSME Loans'],
                match_score: 85
            }
        ]
    },
    {
        id: 'talent-aqua',
        title: 'Talent Aqua',
        description: 'Recruitment, training, and HR management.',
        icon_name: 'Users',
        companies: [
            {
                id: 'hr-001',
                name: 'TalentRecruit',
                description: 'Helping companies scale their teams with top-tier technical talent.',
                rating: 4.7,
                location: 'Hyderabad, Telangana',
                contact: {
                    email: 'jobs@talentrecruit.example.com',
                    phone: '+91 40 1234 5678',
                    website: 'https://talentrecruit.example.com'
                },
                services: ['Executive Search', 'Technical Recruiting', 'RPO'],
                match_score: 90
            },
            {
                id: 'hr-002',
                name: 'SkillUp Academy',
                description: 'Corporate training programs for upskilling employees.',
                rating: 4.4,
                location: 'Bangalore, Karnataka',
                contact: {
                    email: 'train@skillup.example.com',
                    phone: '+91 80 8765 4321',
                    website: 'https://skillup.example.com'
                },
                services: ['Corporate Training', 'Leadership Development', 'Compliance Training'],
                match_score: 82
            }
        ]
    },
    {
        id: 'marketing',
        title: 'Marketing',
        description: 'Branding, digital marketing, and PR agencies.',
        icon_name: 'Megaphone',
        companies: [
            {
                id: 'mkt-001',
                name: 'MarketReach Agency',
                description: 'Full-service digital marketing agency focused on B2B lead generation.',
                rating: 4.6,
                location: 'Gurgaon, Haryana',
                contact: {
                    email: 'hello@marketreach.example.com',
                    phone: '+91 124 1234 567',
                    website: 'https://marketreach.example.com'
                },
                services: ['SEO', 'Content Marketing', 'Lead Generation'],
                match_score: 87
            }
        ]
    },
    {
        id: 'legal-ip',
        title: 'Legal & IP',
        description: 'Intellectual property, compliance, and corporate law.',
        icon_name: 'Scale',
        companies: [
            {
                id: 'leg-001',
                name: 'Global IP Attorneys',
                description: 'Full-service IP firm for patent filings and strategy.',
                rating: 4.8,
                location: 'Chennai, Tamil Nadu',
                contact: {
                    email: 'legal@globalip.example.com',
                    phone: '+91 44 1234 5678',
                    website: 'https://globalip.example.com'
                },
                services: ['Patent Filing', 'Trademark Registration', 'IP Litigation'],
                match_score: 94
            }
        ]
    },
    {
        id: 'software-ecosystem',
        title: 'Software Ecosystem',
        description: 'SaaS, Cloud Infrastructure, and Business Application vendors.',
        icon_name: 'Code',
        companies: [
            {
                id: 'sw-001',
                name: 'CloudScale MSME',
                description: 'Optimized AWS/Azure cloud offsets for manufacturing firms.',
                rating: 4.9,
                location: 'Bengaluru, India',
                contact: {
                    email: 'support@cloudscale.example.com',
                    phone: '+91 80 5555 1212',
                    website: 'https://cloudscale.example.com'
                },
                services: ['Cloud Infrastructure', 'Managed Kubernetes', 'Edge Computing'],
                match_score: 98
            },
            {
                id: 'sw-002',
                name: 'ERP-Simplify',
                description: 'Lightweight ERP and inventory management built specifically for Indian MSMEs.',
                rating: 4.7,
                location: 'Surat, Gujarat',
                contact: {
                    email: 'sales@erpsimplify.example.com',
                    phone: '+91 261 444 0000',
                    website: 'https://erpsimplify.example.com'
                },
                services: ['Inventory Tracking', 'GST Compliance', 'Procurement Logic'],
                match_score: 91
            },
            {
                id: 'sw-003',
                name: 'MindCore AI',
                description: 'Pre-trained AI models for quality inspection in hardware factories.',
                rating: 4.8,
                location: 'Chennai, Tamil Nadu',
                contact: {
                    email: 'hello@mindcore.example.com',
                    phone: '+91 44 222 3333',
                    website: 'https://mindcore.example.com'
                },
                services: ['Computer Vision', 'Predictive Maintenance', 'Quality Audit'],
                match_score: 89
            }
        ]
    }
];

import { MAHARASHTRA_ECOSYSTEM } from './maharashtra-ecosystem';

export function getEcosystemCategories(ecosystemId: 'national' | 'maharashtra' = 'maharashtra'): EcosystemCategory[] {
    if (ecosystemId === 'maharashtra') {
        return MAHARASHTRA_ECOSYSTEM;
    }
    return ECOSYSTEM_DATA;
}

export function getCategoryById(id: string, ecosystemId: 'national' | 'maharashtra' = 'maharashtra'): EcosystemCategory | undefined {
    const data = ecosystemId === 'maharashtra' ? MAHARASHTRA_ECOSYSTEM : ECOSYSTEM_DATA;
    return data.find(c => c.id === id);
}
