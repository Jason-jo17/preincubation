import { Program } from "../types/detailed-company";

export const PROGRAMS: Program[] = [
    {
        id: 'build-4-x-2026',
        name: 'Build 4 X: The Ideation Event',
        description: 'Virtual event where students submit ideas for real-world industrial challenges. Shortlisted students proceed to Makethons.',
        type: 'ideation',
        trl_range: 'TRL 2',
        status: 'active',
        start_date: '2026-04-15',
        end_date: '2026-04-30',
        outcomes: [
            "L2-L3 Ideation Reports",
            "Shortlisted Talent Pool",
            "Validated Problem Statements"
        ],
        metrics: {
            participants: 450,
            shortlisted: 45,
            partners: 12,
            success_rate: 10,
            funding_committed: "15 Lakhs"
        }
    },
    {
        id: 'make-4-x-aero',
        name: 'Make 4 X: Aerospace Edition',
        description: 'A 48-hour challenge to build functional prototypes for aerospace structural components.',
        type: 'makeathon',
        trl_range: 'TRL 3-4',
        status: 'active',
        start_date: '2026-05-20',
        end_date: '2026-05-22',
        outcomes: [
            "Functional Prototypes (L4)",
            "Industry Pilot Agreements",
            "Engineering Validation"
        ],
        metrics: {
            participants: 120,
            shortlisted: 18,
            partners: 6,
            success_rate: 15,
            funding_committed: "45 Lakhs"
        }
    },
    {
        id: 'pre-incubation-exo',
        name: 'Pre-Incubation: ExO Catalyst',
        description: 'Structured program for the Top 4% talent focusing on Exponential Organizations and Blue Ocean Strategy. Students should build their challenge solutions using the ExO Catalyst Platform.',
        type: 'incubation',
        trl_range: 'TRL 5',
        status: 'active',
        start_date: '2026-03-01',
        end_date: '2026-08-31',
        link: 'https://stakeholder-fawn.vercel.app/',
        outcomes: [
            "Strategic Roadmaps",
            "Entity Formation Support",
            "Venture Readiness Audit"
        ],
        metrics: {
            participants: 15,
            shortlisted: 4,
            partners: 8,
            success_rate: 26,
            funding_committed: "1.2 Cr"
        }
    },
    {
        id: 'nagpur-next-2026',
        name: 'Nagpur NEXT MSME Innovation Challenge',
        description: 'High-fidelity innovation program targeting 13 key industrial challenges across Nagpur and Vidarbha regional engineering MSMEs.',
        type: 'makeathon',
        trl_range: 'TRL 3-6',
        status: 'active',
        start_date: '2026-04-07',
        end_date: '2026-06-30',
        link: 'https://inunity.in/nagpurnext/',
        outcomes: [
            "13 Validated PRDs",
            "Functional Prototypes for SME Shopfloors",
            "Digital Transformation Roadmaps"
        ],
        metrics: {
            participants: 13,
            shortlisted: 13,
            partners: 12,
            success_rate: 0,
            funding_committed: "In-kind Innovation Support"
        }
    }
];
