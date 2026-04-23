
export const DEMO_ROADMAPS = {
    'comp-001': {
        roi: 240,
        net_benefit_lakhs: 85,
        investment_lakhs: 25,
        payback_months: 9,
        milestones: [
            {
                id: 'm1-1',
                target_month: 1,
                title: 'Implement CRM and Marketing Automation',
                type: 'Technology',
                description: "Deploy HubSpot CRM, set up lead tracking, and automate email outreach to 100 target prospects",
                priority: 'critical',
                estimated_cost: 150000,
                dependencies: [],
                success_metrics: [
                    "CRM deployed and team trained",
                    "100 prospects added to pipeline",
                    "10 discovery calls booked"
                ]
            },
            {
                id: 'm1-2',
                target_month: 1,
                title: 'Fast-track Patent Applications',
                type: 'Legal',
                description: "Engage IP attorney, file expedited examination requests for 2 provisional patents, and initiate 1 new patent filing",
                priority: 'high',
                estimated_cost: 200000,
                dependencies: [],
                success_metrics: [
                    "Expedited examination requests filed",
                    "1 new provisional patent filed",
                    "IP strategy document created"
                ]
            },
            {
                id: 'm2-1',
                target_month: 2,
                title: 'PLI Application & Compliance',
                type: 'Operations',
                description: "Complete filing for Production Linked Incentive scheme and ensure all regulatory compliances.",
                priority: 'high',
                estimated_cost: 200000,
                dependencies: ['m1-1'],
                success_metrics: ["Application submitted", "Compliance audit passed"]
            },
            {
                id: 'm3-1',
                target_month: 3,
                title: 'Market Expansion Campaign',
                type: 'Marketing',
                description: "Launch targeted digital marketing campaigns in Tier-2 cities to expand footprint.",
                priority: 'medium',
                estimated_cost: 800000,
                dependencies: ['m1-1'],
                success_metrics: ["20% increase in leads", "50k impressions"]
            },
            {
                id: 'm4-1',
                target_month: 4,
                title: 'Series A Preparation',
                type: 'Finance',
                description: "Audit financials and prepare data room for Series A fundraising.",
                priority: 'high',
                estimated_cost: 300000,
                dependencies: [],
                success_metrics: ["Data room ready", "Financial audit complete"]
            },
            {
                id: 'm5-1',
                target_month: 5,
                title: 'Debt Syndication',
                type: 'Finance',
                description: "Syndicate debt for expansion capital requirements with partner banks.",
                priority: 'medium',
                estimated_cost: 100000,
                dependencies: ['m4-1'],
                success_metrics: ["Term sheet received", "Loan sanctioned"]
            },
            {
                id: 'm6-1',
                target_month: 6,
                title: 'New Product Launch',
                type: 'Product',
                description: "Commercial launch of the new IoT-enabled product line.",
                priority: 'critical',
                estimated_cost: 1200000,
                dependencies: ['m3-1'],
                success_metrics: ["Product launched", "First 50 customers"]
            },
        ]
    },
    'comp-002': {
        roi: 180,
        net_benefit_lakhs: 150,
        investment_lakhs: 60,
        payback_months: 14,
        milestones: [
            {
                id: 'm1', target_month: 1, title: 'EV Component Prototype Dev', type: 'R&D',
                description: "Design and fabricate initial prototype for EV motor controller.",
                priority: 'critical', estimated_cost: 1500000, dependencies: [],
                success_metrics: ["Prototype tested", "Design specs finalized"]
            },
            {
                id: 'm2', target_month: 3, title: 'OEM Pilot Partnerships', type: 'Sales',
                description: "Secure pilot testing agreements with 2 major 2-wheeler OEMs.",
                priority: 'high', estimated_cost: 200000, dependencies: ['m1'],
                success_metrics: ["2 MOUs signed", "Pilot schedule agreed"]
            },
            {
                id: 'm3', target_month: 4, title: 'Manufacturing Line Upgrade', type: 'Operations',
                description: "Retrofit Line C for EV component assembly.",
                priority: 'high', estimated_cost: 3500000, dependencies: ['m2']
            },
            {
                id: 'm4', target_month: 6, title: 'Export Certification', type: 'Compliance',
                description: "Obtain CE and UL certifications for European market export.",
                priority: 'medium', estimated_cost: 800000, dependencies: ['m3']
            },
        ]
    },
    'comp-011': {
        roi: 300,
        net_benefit_lakhs: 500,
        investment_lakhs: 100,
        payback_months: 11,
        milestones: [
            {
                id: 'm1', target_month: 1, title: 'Merchant Lending Pilot', type: 'Product',
                description: "Launch beta lending product for top 100 merchants.",
                priority: 'high', estimated_cost: 2000000, dependencies: [],
                success_metrics: ["Beta live", "100 merchants onboarded"]
            },
            {
                id: 'm2', target_month: 2, title: 'Referral Program Launch', type: 'Growth',
                description: "Incentivized referral program to lower CAC.",
                priority: 'medium', estimated_cost: 500000, dependencies: ['m1']
            },
            {
                id: 'm3', target_month: 4, title: 'Bank Partnership Integration', type: 'Tech',
                description: "API integration with partner bank for co-lending.",
                priority: 'critical', estimated_cost: 1500000, dependencies: []
            },
            {
                id: 'm4', target_month: 6, title: 'Regional Expansion (South)', type: 'Expansion',
                description: "Open sales offices in Chennai and Hyderabad.",
                priority: 'high', estimated_cost: 2500000, dependencies: ['m3']
            },
        ]
    }
};

import { NEW_COMPANIES } from './new-companies';

export function getRoadmap(companyId: string) {
    const company = NEW_COMPANIES.find((c: any) => c.id === companyId);
    
    if (company && company.gap_analysis) {
        let milestoneCount = 1;
        const milestones: any[] = [];

        const addActions = (actions: any[], targetMonths: number, priority: 'critical'|'high'|'medium'|'low') => {
            if (!actions || !Array.isArray(actions)) return;
            actions.forEach((action) => {
                const title = typeof action === 'string' ? action : (action.action || action.title || 'Ongoing Operational Improvement');
                const impact = typeof action === 'string' ? 'Medium Impact' : (action.impact || 'Medium Impact');
                const effort = typeof action === 'string' ? 'Medium Effort' : (action.effort || 'Medium Effort');
                
                const cost = 50000 + (title.length * 1000);
                
                const tLower = title.toLowerCase();
                let recommended_program: string | undefined;
                let prd_link: string | undefined;
                
                if (tLower.includes('tech') || tLower.includes('digital') || tLower.includes('software') || tLower.includes('it infrastructure') || tLower.includes('erp')) {
                    recommended_program = "Build 4 X: Open Innovation Challenge (TRL 3-5)";
                    prd_link = "/programs/prd-digital-transformation";
                } else if (tLower.includes('market') || tLower.includes('brand') || tLower.includes('sales')) {
                    recommended_program = "GTM Pre-Incubation Cohort (TRL 5-7)";
                    prd_link = "/programs/prd-gtm-expansion";
                }

                milestones.push({
                    id: `dyn-m${milestoneCount}`,
                    target_month: targetMonths,
                    title: title.length > 40 ? title.substring(0, 37) + '...' : title,
                    type: inferType(title),
                    description: typeof action === 'string' ? title : `${title}. Expected impact: ${impact}. Effort level: ${effort}.`,
                    priority: priority,
                    estimated_cost: cost,
                    dependencies: milestoneCount > 1 ? [`dyn-m${milestoneCount - 1}`] : [],
                    success_metrics: ["Implementation complete", "Metrics tracked locally"],
                    recommended_program,
                    prd_link
                });
                milestoneCount++;
            });
        };

        // 1. Identify underperforming categories (<60) and inject remediation milestones
        const gaps = company.gap_analysis as any;
        const remediationActions: any[] = [];
        
        if (gaps.leadership_quality_score < 60) remediationActions.push({ title: 'Corporate Governance & Succession Setup', category: 'Leadership' });
        if (gaps.innovation_differentiator_score < 60) remediationActions.push({ title: 'IP Portfolio & R&D Digitization', category: 'Innovation' });
        if (gaps.talent_pool_score < 60) remediationActions.push({ title: 'Talent Retention & Comp Benchmarking', category: 'HR' });
        if (gaps.brand_identity_score < 60) remediationActions.push({ title: 'Digital Presence & B2B Brand Refresh', category: 'Marketing' });

        // 2. Add remedial actions first (immediate priority)
        addActions(remediationActions, 1, 'critical');

        // 3. Add regular recommended actions
        addActions((company.gap_analysis as any).immediate_actions, 1, 'critical');
        addActions((company.gap_analysis as any).short_term_recommendations, 3, 'high');
        addActions((company.gap_analysis as any).medium_term_recommendations, 6, 'medium');

        if (milestones.length > 0) {
            const charSum = company.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
            return {
                id: `rm-${company.id}`,
                roi: 120 + (charSum % 100),
                net_benefit_lakhs: 40 + (charSum % 80),
                investment_lakhs: 15 + (charSum % 40),
                payback_months: 6 + (charSum % 12),
                milestones: milestones
            };
        }
    }

    const data = DEMO_ROADMAPS[companyId as keyof typeof DEMO_ROADMAPS];
    if (data) return data;

    // Generate rich mock data if not found
    return {
        roi: 150 + Math.floor(Math.random() * 100),
        net_benefit_lakhs: 50 + Math.floor(Math.random() * 100),
        investment_lakhs: 20 + Math.floor(Math.random() * 50),
        payback_months: 8 + Math.floor(Math.random() * 8),
        milestones: [
            {
                id: 'gen-1', target_month: 1, title: 'Strategic Planning & Setup', type: 'Strategy',
                description: "Initial strategic alignment and goal setting workshop.",
                priority: 'high', estimated_cost: 100000, dependencies: [],
                success_metrics: ["Goals defined", "Strategy document approved"]
            },
            {
                id: 'gen-2', target_month: 2, title: 'Operational Efficiency Upgrade', type: 'Operations',
                description: "Implement lean processes to reduce wastage by 15%.",
                priority: 'medium', estimated_cost: 300000, dependencies: ['gen-1'],
                success_metrics: ["Process audit complete", "New SOPs rolled out"]
            },
            {
                id: 'gen-3', target_month: 4, title: 'Go-To-Market Push', type: 'Marketing',
                description: "Aggressive sales drive in core markets.",
                priority: 'critical', estimated_cost: 500000, dependencies: ['gen-2'],
                success_metrics: ["Sales pipeline +30%", "10 new key accounts"]
            },
            {
                id: 'gen-4', target_month: 6, title: 'Quarterly Review & Optimization', type: 'Management',
                description: "Review KPIs and optimize strategy for next phase.",
                priority: 'low', estimated_cost: 50000, dependencies: [],
                success_metrics: ["Q2 Review complete"]
            },
        ]
    };
}

function inferType(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('tech') || lower.includes('software') || lower.includes('digital') || lower.includes('system') || lower.includes('platform')) return 'Technology';
    if (lower.includes('market') || lower.includes('campaign') || lower.includes('sales')) return 'Marketing';
    if (lower.includes('fund') || lower.includes('financ') || lower.includes('capital') || lower.includes('audit')) return 'Finance';
    if (lower.includes('hire') || lower.includes('train') || lower.includes('talent')) return 'HR';
    if (lower.includes('certificat') || lower.includes('complian') || lower.includes('patent')) return 'Compliance';
    if (lower.includes('product') || lower.includes('design') || lower.includes('launch')) return 'Product';
    return 'Operations';
}

export function getPhasedRoadmap(companyId: string) {
    const rawRoadmap = getRoadmap(companyId);
    const company = NEW_COMPANIES.find((c: any) => c.id === companyId);
    
    if (!rawRoadmap) return null;

    const milestones = rawRoadmap.milestones || [];
    
    // Group milestones into phases
    const phase1 = milestones.filter(m => m.target_month === 1);
    const phase2 = milestones.filter(m => m.target_month === 3);
    const phase3 = milestones.filter(m => m.target_month >= 6);

    const phases = [];
    if (phase1.length > 0) {
        phases.push({
            title: "Phase 1: Foundation & Core Hardening",
            description: "Immediate strategic actions to resolve critical gaps and stabilize operations.",
            initiatives: phase1.map(m => ({
                name: m.title,
                description: m.description,
                associated_program_id: m.recommended_program ? 'pro-demo' : undefined
            }))
        });
    }
    
    if (phase2.length > 0) {
        phases.push({
            title: "Phase 2: Operational Acceleration",
            description: "Medium-term enhancements to drive efficiency and market presence.",
            initiatives: phase2.map(m => ({
                name: m.title,
                description: m.description
            }))
        });
    }

    if (phase3.length > 0) {
        phases.push({
            title: "Phase 3: Strategic Growth & Scale",
            description: "Long-term initiatives to expand market share and achieve institutional excellence.",
            initiatives: phase3.map(m => ({
                name: m.title,
                description: m.description
            }))
        });
    }

    return {
        ...rawRoadmap,
        executive_summary: company 
            ? `Strategic roadmap for ${company.name} focusing on resolving ${company.gap_analysis?.critical_gaps?.[0] || 'operational gaps'} and accelerating ${company.sector.replace('_', ' ')} sector growth.`
            : `Tailored 18-month execution plan to address strategic gaps and leverage growth opportunities.`,
        phases: phases
    };
}

export const getDemoRoadmap = getRoadmap;
