import { COMPANIES_DATA } from "./new-companies";

export const PENDING_REVIEWS_MOCK = [
    {
        id: "rev-hical-001",
        roadmap_id: "rd-hical-001",
        expert_id: "exp-001",
        status: "pending",
        created_at: new Date().toISOString(),
        companies: {
            name: "Hical Technologies",
            district: "Bangalore",
            state: "Karnataka",
            gap_analysis: COMPANIES_DATA["hical-001"]?.gap_analysis
        },
        company_roadmaps: {
            id: "rd-hical-001",
            title: "Hical Aerospace & Electromagnetics Expansion",
            executive_summary: "Strategic roadmap focusing on resolving working capital constraints, upgrading to Industry 4.0, and diversifying the OEM client base beyond UTC/Collins.",
            phases: [
                {
                    title: "Phase 1: Financial & Governance Hardening",
                    description: "Optimizing NWC and establishing board independence.",
                    initiatives: [
                        "Working Capital Optimization (Target <50% NWC/OI)",
                        "Induct 2 Independent Directors",
                        "Formalize Succession Planning Framework"
                    ]
                },
                {
                    title: "Phase 2: Digital Manufacturing & IP",
                    description: "Implementing advanced automation and IP creation.",
                    initiatives: [
                        { name: "Industry 4.0 Automation Pilot", description: "Automated solenoid winding and testing lines.", associated_program_id: "make-4-x-aero" },
                        { name: "Proprietary Actuator IP Development", description: "Developing in-house electromagnetic actuator designs.", associated_program_id: "build-4-x-2026" }
                    ]
                }
            ]
        }
    },
    {
        id: "rev-dynamatic-001",
        roadmap_id: "rd-dynamatic-001",
        expert_id: "exp-001",
        status: "pending",
        created_at: new Date().toISOString(),
        companies: {
            name: "Dynamatic Technologies",
            district: "Bangalore",
            state: "Karnataka",
            gap_analysis: COMPANIES_DATA["dyn-001"]?.gap_analysis
        },
        company_roadmaps: {
            id: "rd-dynamatic-001",
            title: "Dynamatic Aerotropolis Scale-up",
            executive_summary: "Scaling the A220 aircraft door production and industrializing AMCA components while optimizing the metallurgy segment.",
            phases: [
                {
                    title: "Phase 1: AMCA Precision Scaling",
                    description: "Industrializing defense components for HAL.",
                    initiatives: [
                        "Scale AMCA Program Production",
                        "Turnaround Metallurgy Segment Efficiency",
                        { name: "AMCA Structural Component Optimization", associated_program_id: "make-4-x-aero" }
                    ]
                }
            ]
        }
    }
];

export const MOCK_EXPERT_PROFILE = {
    id: "exp-001",
    name: "Dr. Arvind Rao",
    expert_domains: ["Aerospace", "Precision Engineering", "Supply Chain"],
    stats: {
        pending: 2,
        validated: 42,
        earnings: 84000
    }
};
