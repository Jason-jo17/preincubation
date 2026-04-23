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
        },
        company_roadmaps: {
            id: "rd-hical-001",
            title: "Hical Aerospace & Electromagnetics Expansion",
            executive_summary: "Strategic roadmap focusing on resolving working capital constraints, upgrading to Industry 4.0, and diversifying the OEM client base beyond UTC/Collins.",
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
        },
        company_roadmaps: {
            id: "rd-dynamatic-001",
            title: "Dynamatic Aerotropolis Scale-up",
            executive_summary: "Scaling the A220 aircraft door production and industrializing AMCA components while optimizing the metallurgy segment.",
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
