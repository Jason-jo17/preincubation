import { 
    Lightbulb, 
    Hammer, 
    Rocket 
} from "lucide-react";

export const PROGRAMS = [
    {
        id: "ideation",
        name: "Discovery Ideation",
        type: "ideation",
        trl_range: "TRL 2-3",
        description: "Early-stage identification of industrial gaps and the formulation of conceptual technical solutions for regional MSME clusters.",
        outcomes: ["Problem Statement Definition", "Technical Feasibility Study", "Solution Architecture"],
        metrics: {
            participants: 1240,
            shortlisted: 180,
            partners: 12,
            success_rate: 14.5,
            funding_committed: "15 L"
        }
    },
    {
        id: "makeathon",
        name: "BuildForX Makeathon",
        type: "makeathon",
        trl_range: "TRL 3-4",
        description: "Rapid prototyping sprints where engineering talent builds functional MVPs to address specific MSME automation needs identified in CEED.",
        outcomes: ["Functional Prototype", "Initial Benchtesting", "Stakeholder Feedback Cycle"],
        metrics: {
            participants: 850,
            shortlisted: 45,
            partners: 24,
            success_rate: 5.3,
            funding_committed: "85 L"
        }
    },
    {
        id: "catalyst",
        name: "ExO Catalyst",
        type: "pre-incubation",
        trl_range: "TRL 4-5",
        description: "Intensive pre-incubation for high-potential prototypes, focusing on industrial hardening, pilot deployment, and stakeholder integration.",
        outcomes: ["On-site Pilot Implementation", "Industrial Grade Hardening", "Business Model Validation"],
        metrics: {
            participants: 120,
            shortlisted: 18,
            partners: 8,
            success_rate: 15.0,
            funding_committed: "1.4 Cr"
        }
    }
];

export const PROGRAM_STATS = [
    {
        title: "Total Talent Pool",
        value: "4,280",
        change: "+12%",
        description: "vs last cohort",
        color: "orange"
    },
    {
        title: "Active Challenges",
        value: "18",
        description: "across 4 sectors",
        color: "blue"
    },
    {
        title: "Conversion to TRL 5",
        value: "8.5%",
        description: "Exceeding target of 5%",
        color: "indigo"
    },
    {
        title: "Industry Funding",
        value: "₹2.4 Cr",
        description: "Committed for prototypes",
        color: "green"
    }
];
