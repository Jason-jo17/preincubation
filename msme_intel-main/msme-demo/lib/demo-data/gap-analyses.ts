
export const DEMO_GAP_ANALYSES = {
    'comp-001': {
        market_saturation_score: 45,
        founder_quality_score: 85,
        business_maturity_score: 75,
        market_opportunity_score: 80,
        leadership_quality_score: 70,
        innovation_differentiator_score: 65,
        talent_pool_score: 80,
        brand_identity_score: 55,
        top_priority: "Brand Identity",
        top_priority_score: 55,
        key_asset: "Founder Quality",
        key_asset_score: 85,
        overall_score: 72,
        rag_distribution: {
            red: 1,
            amber: 3,
            green: 4
        },
        key_strengths: [
            "Proprietary manufacturing technology",
            "Strong local market presence",
            "Efficient supply chain management"
        ],
        top_opportunities: [
            "Export market expansion",
            "Adoption of IoT for predictive maintenance",
            "Brand repositioning for premium segment"
        ],
        vertical_analyses: [
            {
                vertical_name: "Marketing",
                score: 55,
                gaps: ["Weak international presence", "Outdated website"],
                opportunities: ["Values-based branding", "SEO optimization"]
            },
            {
                vertical_name: "Technology",
                score: 70,
                gaps: ["Disparate manufacturing systems"],
                opportunities: ["IoT integration", "Unified production dashboard"]
            },
            {
                vertical_name: "Operations",
                score: 85,
                gaps: ["Occasional QC delays"],
                opportunities: ["Real-time quality monitoring"]
            }
        ],
        recommendations: [
            "Launch a dedicated export-focused digital campaign.",
            "Pilot IoT sensors on critical production lines.",
            "Refine quality control processes with automated checks."
        ]
    },
    'comp-002': {
        market_saturation_score: 60,
        founder_quality_score: 80,
        business_maturity_score: 85,
        market_opportunity_score: 70,
        leadership_quality_score: 75,
        innovation_differentiator_score: 55,
        talent_pool_score: 65,
        brand_identity_score: 70,
        top_priority: "Innovation",
        top_priority_score: 55,
        key_asset: "Business Maturity",
        key_asset_score: 85,
        overall_score: 75,
        rag_distribution: {
            red: 0,
            amber: 2,
            green: 6
        },
        key_strengths: [
            "Robust financial health",
            "Scalable operational processes",
            "Diversified client base"
        ],
        top_opportunities: [
            "New product line development",
            "Strategic acquisition of competitors",
            "Digital transformation of legacy systems"
        ],
        vertical_analyses: [
            {
                vertical_name: "Marketing",
                score: 70,
                gaps: ["Limited cross-selling"],
                opportunities: ["Loyalty program", "Account-based marketing"]
            },
            {
                vertical_name: "Technology",
                score: 55,
                gaps: ["On-premise servers", "Security vulnerabilities"],
                opportunities: ["Cloud migration", "Cybersecurity audit"]
            },
            {
                vertical_name: "Operations",
                score: 80,
                gaps: ["High logistics costs"],
                opportunities: ["Route optimization software"]
            }
        ],
        recommendations: [
            "Develop a customer loyalty program to increase LTV.",
            "Migrate core infrastructure to AWS/Azure for scalability.",
            "Acquire a smaller logistics partner to reduce costs."
        ]
    },
    'comp-011': {
        market_saturation_score: 30, // Low saturation
        founder_quality_score: 90,
        business_maturity_score: 65,
        market_opportunity_score: 95,
        leadership_quality_score: 85,
        innovation_differentiator_score: 90,
        talent_pool_score: 80,
        brand_identity_score: 60,
        top_priority: "Brand Identity",
        top_priority_score: 60,
        key_asset: "Market Opportunity",
        key_asset_score: 95,
        overall_score: 82,
        rag_distribution: {
            red: 0,
            amber: 1,
            green: 7
        },
        key_strengths: [
            "Highly scalable tech platform",
            "Visionary leadership team",
            "Rapid user acquisition"
        ],
        top_opportunities: [
            "Monetization strategy optimization",
            "International expansion",
            "AI-driven product enhancements"
        ],
        vertical_analyses: [
            {
                vertical_name: "Marketing",
                score: 90,
                gaps: ["High CAC in new markets"],
                opportunities: ["Organic community building", "Viral loop optimization"]
            },
            {
                vertical_name: "Technology",
                score: 95,
                gaps: ["Minor technical debt"],
                opportunities: ["Microservices architecture"]
            },
            {
                vertical_name: "Operations",
                score: 85,
                gaps: ["Customer support scaling"],
                opportunities: ["AI chatbots", "Self-service knowledge base"]
            }
        ],
        recommendations: [
            "Focus on community-driven growth to lower CAC.",
            "Refactor monolithic components into microservices.",
            "Deploy AI support agents to handle L1 queries."
        ]
    },
    'aeq-001': {
        market_saturation_score: 78,
        founder_quality_score: 72,
        business_maturity_score: 82,
        market_opportunity_score: 88,
        leadership_quality_score: 68,
        innovation_differentiator_score: 76,
        talent_pool_score: 78,
        brand_identity_score: 70,
        top_priority: "Succession Planning",
        top_priority_score: 72,
        key_asset: "Market Opportunity",
        key_asset_score: 88,
        overall_score: 75,
        rag_distribution: { red: 2, amber: 4, green: 2 },
        key_strengths: ["Tier-1 Airbus Supplier", "Integrated Ecosystem", "10,000-ton Press"],
        top_opportunities: ["PLI Scheme", "Defense Export", "New Client Acquisition"],
        vertical_analyses: [
            { vertical_name: "Strategy", score: 70, gaps: ["No succession plan", "High debt"], opportunities: ["IPO Readiness", "Deleveraging"] },
            { vertical_name: "Operations", score: 85, gaps: ["Consumer segment drag"], opportunities: ["Smart Factory L2"] },
            { vertical_name: "Technology", score: 75, gaps: ["Low R&D Spend"], opportunities: ["IP Co-creation"] }
        ],
        recommendations: ["Formalize succession plan immediately.", "Hire CTO for digital roadmap.", "Refinance high-cost debt."]
    },
    'dyn-001': {
        market_saturation_score: 72,
        founder_quality_score: 88,
        business_maturity_score: 92,
        market_opportunity_score: 90,
        leadership_quality_score: 90,
        innovation_differentiator_score: 85,
        talent_pool_score: 76,
        brand_identity_score: 88,
        top_priority: "Margin Expansion",
        top_priority_score: 65,
        key_asset: "Business Maturity",
        key_asset_score: 92,
        overall_score: 85,
        rag_distribution: { red: 0, amber: 2, green: 6 },
        key_strengths: ["Global Sole Source (Airbus)", "30-Year Succession", "R&D Depth"],
        top_opportunities: ["A220 Door Ramp-up", "AMCA Program", "Metallurgy Turnaround"],
        vertical_analyses: [
            { vertical_name: "Strategy", score: 90, gaps: ["High Valuation"], opportunities: ["M&A"] },
            { vertical_name: "Operations", score: 88, gaps: ["Metallurgy Volatility"], opportunities: ["Automation"] },
            { vertical_name: "Technology", score: 85, gaps: [], opportunities: ["Defense R&D"] }
        ],
        recommendations: ["Accelerate A220 industrialization.", "Turnaround metallurgy division.", "Scale defense exports."]
    },
    'taal-001': {
        market_saturation_score: 45,
        founder_quality_score: 65,
        business_maturity_score: 78,
        market_opportunity_score: 75,
        leadership_quality_score: 70,
        innovation_differentiator_score: 55,
        talent_pool_score: 60,
        brand_identity_score: 62,
        top_priority: "Operational Scale",
        top_priority_score: 45,
        key_asset: "Tangible Assets",
        key_asset_score: 90,
        overall_score: 68,
        rag_distribution: { red: 2, amber: 4, green: 2 },
        key_strengths: ["240-acre Airfield", "Debt-free", "High Margins"],
        top_opportunities: ["MRO Hub", "Drone Testing", "Contract Manufacturing"],
        vertical_analyses: [
            { vertical_name: "Strategy", score: 65, gaps: ["Low Scale", "Tenant Dependence"], opportunities: ["Asset Monetization"] },
            { vertical_name: "Operations", score: 70, gaps: ["Limited Order Book"], opportunities: ["Capacity Utilization"] },
            { vertical_name: "Technology", score: 55, gaps: ["Low Innovation"], opportunities: ["UAV Partnerships"] }
        ],
        recommendations: ["Partner for MRO hub development.", "Diversify beyond tenant revenue.", "Invest in modern manufacturing tech."]
    }
};

export function getDemoGapAnalysis(companyId: string) {
    // Randomize slightly if not found
    return DEMO_GAP_ANALYSES[companyId as keyof typeof DEMO_GAP_ANALYSES] || {
        market_saturation_score: Math.floor(30 + Math.random() * 40),
        founder_quality_score: Math.floor(60 + Math.random() * 30),
        business_maturity_score: Math.floor(50 + Math.random() * 40),
        market_opportunity_score: Math.floor(60 + Math.random() * 30),
        leadership_quality_score: Math.floor(60 + Math.random() * 30),
        innovation_differentiator_score: Math.floor(50 + Math.random() * 40),
        talent_pool_score: Math.floor(60 + Math.random() * 30),
        brand_identity_score: Math.floor(40 + Math.random() * 40),
        top_priority: "Innovation Differentiator",
        top_priority_score: 55,
        key_asset: "Founder Quality",
        key_asset_score: 85,
        overall_score: 65,
        rag_distribution: {
            red: 3,
            amber: 4,
            green: 5
        },
        key_strengths: [
            "Strong product-market fit in primary segment",
            "Experienced founding team with domain expertise",
            "High customer retention rates"
        ],
        top_opportunities: [
            "Expand digital marketing footprint",
            "Automate core operational workflows",
            "Develop strategic partnerships for distribution"
        ],
        vertical_analyses: [
            {
                vertical_name: "Marketing",
                score: 45,
                gaps: ["No digital marketing strategy", "Brand inconsistency", "Low social engagement"],
                opportunities: ["Launch targeted ad campaigns", "Rebrand visual identity", "Influencer partnerships"]
            },
            {
                vertical_name: "Technology",
                score: 65,
                gaps: ["Legacy CRM system", "Manual data entry", "Lack of analytics"],
                opportunities: ["Implement HubSpot CRM", "Automate reporting", "Adopt cloud infrastructure"]
            },
            {
                vertical_name: "Operations",
                score: 75,
                gaps: ["Supply chain bottlenecks", "High inventory costs"],
                opportunities: ["Just-in-time inventory", "Vendor consolidation"]
            }
        ],
        recommendations: [
            "Hire a Head of Marketing to drive brand strategy.",
            "Upgrade to a cloud-based ERP system for better visibility.",
            "Negotiate long-term contracts with key suppliers."
        ]
    };
}
