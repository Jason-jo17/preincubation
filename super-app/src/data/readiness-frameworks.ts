/**
 * InUnity Venture Readiness Diagnostic — Framework Data v3.0
 * Unified P1-P9 Rubric for Startup Diagnostics
 */

export interface Question {
  id: string;
  label: string;
  hint?: string;
  type: 'text' | 'number' | 'select' | 'team' | 'textarea';
  options?: string[];
  placeholder?: string;
  description?: string;
  example?: string;
  scoreField: string;
}

export interface ReadinessFramework {
  id: string;
  name: string;
  subtitle: string;
  weight: number; // Decimal (e.g., 0.15 for 15%)
  description: string;
  observationField: string;
  questions: {
    core: Question[];
    deepDive: Question[];
  };
}

export const READINESS_FRAMEWORKS: Record<string, ReadinessFramework> = {
  P1: {
    id: 'P1',
    name: "Character & Problem Clarity",
    subtitle: "Founder integrity, resilience, and depth of problem understanding.",
    weight: 0.15,
    description: "Evaluates the founder's commitment and how deeply they understand the friction they are solving.",
    observationField: 'p1_observation',
    questions: {
      core: [
        {
          id: 'p1_problem_statement',
          label: 'What is the deep, underlying problem?',
          hint: 'Define the core friction or inefficiency.',
          type: 'textarea',
          placeholder: 'What is the deep, underlying problem?',
          description: 'Define the core friction or inefficiency you are solving.',
          example: "Local manufacturers lose 30% of margin because they buy raw materials from 4 different middlemen who don't consolidate orders.",
          scoreField: 'p1_problem_score'
        },
        {
          id: 'p1_why_us',
          label: 'Why is this team specifically qualified to win?',
          hint: 'Founder-market fit & unique insights.',
          type: 'textarea',
          placeholder: 'Founder-market fit & unique insight.',
          description: 'Why is this team specifically qualified to win?',
          example: "Our CTO spent 10 years in logistics for BlueChip Corp and saw this specific inefficiency firsthand across 200 vendors.",
          scoreField: 'p1_why_us_score'
        },
        {
          id: 'p1_commitment',
          label: 'Current level of commitment?',
          hint: 'Time, money, and focus levels.',
          type: 'text',
          placeholder: 'Time, money, and focus levels.',
          description: 'Level of dedication to this specific venture.',
          example: "3/4 founders are full-time; we have invested $15k of our own savings to build the initial MVP.",
          scoreField: 'p1_commitment_score'
        },
        {
          id: 'p1_learning',
          label: 'Evidence of rapid iteration?',
          hint: 'How fast did you pivot or learn from failure?',
          type: 'text',
          placeholder: 'How fast does the team iterate?',
          description: 'Evidence of rapid experimentation and adaptation.',
          example: "We ran 5 landing page tests in 2 weeks, resulting in a 40% pivot from B2C to B2B based on sign-up data.",
          scoreField: 'p1_learning_score'
        }
      ],
      deepDive: [
        {
          id: 'p1_deep_empathy',
          label: 'Describe the worst version of this problem...',
          hint: 'Customer empathy and depth of pain understanding.',
          type: 'textarea',
          placeholder: 'Depth of emotional understanding of user pain.',
          description: 'Do you feel the "pain" your customer feels?',
          example: "Spent 40 hours shadowing warehouse managers; observed they carry physical clipboards because the current digital tools have too small buttons for gloves.",
          scoreField: 'p1_deep_empathy_score'
        },
        {
          id: 'p1_resilience',
          label: 'Past evidence of resilience?',
          hint: 'How did you handle a previous major setback?',
          type: 'textarea',
          placeholder: 'Past failures handled or pivots survived.',
          description: 'How does the team handle extreme pressure?',
          example: "Previous startup failed due to co-founder departure; I successfully wound it down, paid back debts, and started this with 2 core engineers from that team.",
          scoreField: 'p1_resilience_score'
        },
        {
          id: 'p1_sacrifice',
          label: 'What have you given up to build this?',
          hint: 'Opportunity cost and skin in the game.',
          type: 'text',
          placeholder: 'What has been given up to build this?',
          description: 'Opportunity cost and skin in the game.',
          example: "Left a $120k/year senior role to build this venture with zero salary for the first 12 months.",
          scoreField: 'p1_sacrifice_score'
        }
      ]
    }
  },
  P2: {
    id: 'P2',
    name: 'Customer Discovery',
    subtitle: 'Evidence of market interaction and validated insights.',
    weight: 0.13,
    description: 'Measures the quantity and quality of feedback from the real market.',
    observationField: 'p2_observation',
    questions: {
      core: [
        {
          id: 'p2_interview_count',
          label: 'Number of stakeholder interviews?',
          type: 'number',
          placeholder: 'Total # of stakeholders interviewed.',
          description: 'Quantitative evidence of market feedback.',
          example: "Conducted 62 deep-dive interviews with purchasing officers across the textile industry.",
          scoreField: 'p2_interview_count_score'
        },
        {
          id: 'p2_stakeholder_types',
          label: 'Who did you talk to?',
          hint: 'Users, buyers, partners, etc.',
          type: 'text',
          placeholder: 'Who did you talk to? (Users, buyers, partners).',
          description: 'Breadth of perspectives captured.',
          example: "End-users (operators), purchasers (CFOs), and channel partners (distributors).",
          scoreField: 'p2_stakeholder_types_score'
        },
        {
          id: 'p2_key_insight',
          label: 'One non-obvious thing you learned?',
          type: 'textarea',
          placeholder: 'One non-obvious thing you learned.',
          description: 'Validated non-obvious truth about the market.',
          example: "Customers don't care about the price being 10% lower; they care about the delivery window being guaranteed under 24 hours.",
          scoreField: 'p2_key_insight_score'
        }
      ],
      deepDive: [
        {
          id: 'p2_pivoted',
          label: 'What did you change based on feedback?',
          type: 'textarea',
          placeholder: 'What did you change based on feedback?',
          description: 'Evidence that you are listening to the market.',
          example: "Moved from an 'Uber for Logistics' model to a 'B2B SaaS Inventory' model after 15 interviews suggested high fragmentation.",
          scoreField: 'p2_pivoted_score'
        },
        {
          id: 'p2_evidence',
          label: 'Quality of the data captured?',
          type: 'text',
          placeholder: 'Synthesized evidence vs. anecdotal bias.',
          description: 'How do you verify the feedback?',
          example: "Used a structured scoring rubric for all interviews to eliminate confirmation bias; 80% of interviewed CFOs confirmed the pain point.",
          scoreField: 'p2_evidence_score'
        },
        {
          id: 'p2_pilot_users',
          label: 'Number of pilot/LOI users?',
          type: 'text',
          placeholder: 'Commitment from early users.',
          description: 'First signs of true market pull.',
          example: "6 companies have signed non-binding LOIs to pilot the software for $500/month starting in Q3.",
          scoreField: 'p2_pilot_users_score'
        },
        {
          id: 'p2_objections',
          label: 'Common objections you are investigating?',
          type: 'textarea',
          placeholder: 'Counter-evidence you are investigating.',
          description: 'Healthy self-awareness of risks.',
          example: "CFOs are worried about the IT integration heavy-lift; we are currently building a 'Zero-IT' CSV upload feature to address this.",
          scoreField: 'p2_objections_score'
        }
      ]
    }
  },
  P3: {
    id: 'P3',
    name: 'Product & TRL',
    subtitle: 'Technical durability and readiness level of the solution.',
    weight: 0.13,
    description: 'Assesses the technical maturity and architecture of the solution.',
    observationField: 'p3_observation',
    questions: {
      core: [
        {
          id: 'p3_trl',
          label: 'Current Tech Readiness Level (TRL)?',
          type: 'select',
          options: ['1 - Basic Research', '2 - Concept Formulated', '3 - Experimental Proof', '4 - Lab Validation', '5 - Relevant Environment', '6 - Subsystem Demo', '7 - System Prototype', '8 - Production Ready', '9 - Mission Proven'],
          description: 'NASA Technology Readiness Level scale.',
          example: "TRL 4 - Lab Validation.",
          scoreField: 'p3_trl_score'
        },
        {
          id: 'p3_built',
          label: 'What is the current status of the build?',
          type: 'textarea',
          placeholder: 'Current status of the build.',
          description: 'Detailed technical status.',
          example: "Fully functional web application on React/Node with integrated Supabase DB; handling concurrent users in staging.",
          scoreField: 'p3_built_score'
        },
        {
          id: 'p3_product_type',
          label: 'Product Category?',
          type: 'select',
          options: ['SaaS', 'Hardware', 'Marketplace', 'DeepTech', 'Service-Tech', 'Other'],
          description: 'Category of the solution.',
          example: "SaaS.",
          scoreField: 'p3_product_type_score'
        }
      ],
      deepDive: [
        {
          id: 'p3_external_testing',
          label: 'Results of external testing?',
          type: 'textarea',
          placeholder: 'Testing by someone outside the team.',
          description: 'Objective proof of performance.',
          example: "Beta tests with 5 external companies led to 3 bug fixes and 1 UI redesign.",
          scoreField: 'p3_external_testing_score'
        },
        {
          id: 'p3_tech_risk',
          label: 'Critical technical risk identified?',
          type: 'text',
          placeholder: 'What could break the product?',
          description: 'Biggest technical bottleneck.',
          example: "Scaling the matching algorithm from 100 to 10,000 requests per minute without latency.",
          scoreField: 'p3_tech_risk_score'
        },
        {
          id: 'p3_trl_gap',
          label: 'Next milestone to move up TRL?',
          type: 'text',
          placeholder: 'What is needed to reach next TRL?',
          description: 'Requirement for progression.',
          example: "Need to deploy into a factory environment for 30 continuous days to move to TRL 6.",
          scoreField: 'p3_trl_gap_score'
        },
        {
          id: 'p3_ip',
          label: 'Proprietary IP or algorithms?',
          type: 'text',
          placeholder: 'Algorithms, patents, or trade secrets.',
          description: 'Core technical moats.',
          example: "Proprietary image recognition algorithm optimized for low-bandwidth mobile devices.",
          scoreField: 'p3_ip_score'
        }
      ]
    }
  },
  P4: {
    id: 'P4',
    name: 'Differentiation',
    subtitle: 'How you win against incumbents and alternatives.',
    weight: 0.07,
    description: 'Evaluates the uniqueness of the value proposition.',
    observationField: 'p4_observation',
    questions: {
      core: [
        {
          id: 'p4_differentiation',
          label: 'Why will customers pick you over others?',
          type: 'textarea',
          placeholder: 'Why will customers pick you?',
          description: 'Your core Value Proposition.',
          example: "Only solution that provides data in 5 minutes vs. the industry standard of 24 hours.",
          scoreField: 'p4_differentiation_score'
        },
        {
          id: 'p4_competitors',
          label: 'What is the "Alternative Logic" used today?',
          hint: 'Includes Excel, manual work, or rival startups.',
          type: 'textarea',
          placeholder: 'What do they use today (including Excel)?',
          description: 'What is the current non-consumption or incumbent solution?',
          example: "Manual Excel sheets managed by 3 full-time data entry clerks.",
          scoreField: 'p4_competitors_score'
        },
        {
          id: 'p4_without_us',
          label: 'Cost of sticking with the status quo?',
          type: 'text',
          placeholder: 'Cost of doing nothing.',
          description: 'The pain of sticking with current methods.',
          example: "$2,000/month in labor costs plus 5% error rate in data entry.",
          scoreField: 'p4_without_us_score'
        }
      ],
      deepDive: [
        {
          id: 'p4_customer_preference',
          label: 'Evidence of customer preference?',
          type: 'textarea',
          placeholder: 'Why do users say they like you better?',
          description: 'Concrete feedback on superiority.',
          example: "User testing score of 4.8/5 compared to the rival's 3.2/5 based on 'clean UI' and 'speed'.",
          scoreField: 'p4_customer_preference_score'
        },
        {
          id: 'p4_hard_to_copy',
          label: 'Non-replicable barrier to entry?',
          type: 'text',
          placeholder: 'Why can’t a giant copy you tomorrow?',
          description: 'Strategic moats.',
          example: "Exclusive data access agreement with 3 leading logistics hubs in the region.",
          scoreField: 'p4_hard_to_copy_score'
        },
        {
          id: 'p4_ab_testing',
          label: 'A/B testing or comparison results?',
          type: 'text',
          placeholder: 'Comparison data against alternatives.',
          description: 'Quantitative performance proof.',
          example: "A/B test showed 15% higher conversation rate using our checkout flow versus the standard Shopify plugin.",
          scoreField: 'p4_ab_testing_score'
        }
      ]
    }
  },
  P5: {
    id: 'P5',
    name: 'Market & ICP',
    subtitle: 'Targeting, urgency, and scale potential.',
    weight: 0.12,
    description: 'Measures the scale of the opportunity and clarity of targets.',
    observationField: 'p5_observation',
    questions: {
      core: [
        {
          id: 'p5_icp',
          label: 'Describe the "Desperate Customer" (ICP)?',
          type: 'textarea',
          placeholder: 'Who is the "Desperate Customer"?',
          description: 'Define your narrow, early-adopter segment.',
          example: "Operations Managers at mid-sized 3PL firms (20-100 trucks) in Tier 1 cities.",
          scoreField: 'p5_icp_score'
        },
        {
          id: 'p5_market_size',
          label: 'TAM / SAM / SOM calculation?',
          type: 'text',
          placeholder: 'Addressable revenue potential.',
          description: 'Scale of the opportunity.',
          example: "TAM: $5B Global, SAM: $500M SE Asia, SOM: $15M Year 1.",
          scoreField: 'p5_market_size_score'
        },
        {
          id: 'p5_urgency',
          label: 'What is the "Hair on Fire" urgency?',
          hint: 'Fine, Fee, or Fear triggers?',
          type: 'text',
          placeholder: 'Why buy now? (Fine, Fee, or Fear).',
          description: 'The trigger for immediate adoption.',
          example: "New environmental regulations (Fee) coming into effect next year require precise carbon tracking.",
          scoreField: 'p5_urgency_score'
        }
      ],
      deepDive: [
        {
          id: 'p5_gtm',
          label: 'Go-to-Market (GTM) strategy details?',
          type: 'textarea',
          placeholder: 'Channel strategy for first 100 users.',
          description: 'How do you acquire users profitably?',
          example: "Direct LinkedIn outreach to Ops Managers + partnerships with 2 industry associations.",
          scoreField: 'p5_gtm_score'
        },
        {
          id: 'p5_unfair_access',
          label: 'Distribution Moat?',
          hint: 'Partnerships or unfair network access.',
          type: 'text',
          placeholder: 'Partnerships or hidden network access.',
          description: 'Non-replicable growth hacks.',
          example: "Lead founder sits on the national board of the Manufacturing Council, giving us direct access to 400 CEOs.",
          scoreField: 'p5_unfair_access_score'
        }
      ]
    }
  },
  P6: {
    id: 'P6',
    name: 'Business Model',
    subtitle: 'Revenue engine and unit economic potential.',
    weight: 0.11,
    description: 'Evaluates capitalization potential and revenue logic.',
    observationField: 'p6_observation',
    questions: {
      core: [
        {
          id: 'p6_revenue_model',
          label: 'How exactly do you make money?',
          type: 'textarea',
          placeholder: 'How exactly do you make money?',
          description: 'Your monetization strategy.',
          example: "Monthly SaaS subscription ($250/seat) + 2% transaction fee on marketplace sales.",
          scoreField: 'p6_revenue_model_score'
        },
        {
          id: 'p6_revenue_stage',
          label: 'Current Revenue Stage?',
          type: 'select',
          options: ['Pre-Revenue', 'Initial Pilots (Free)', 'Paid Pilots', 'Early Revenue', 'Recurring Revenue', 'Scaling'],
          description: 'Current financial traction.',
          example: "Early Revenue.",
          scoreField: 'p6_revenue_model_score'
        },
        {
          id: 'p6_bmc_status',
          label: 'Business Model Canvas (BMC) maturity?',
          type: 'text',
          placeholder: 'Status of the 9 blocks.',
          description: 'Business Model Canvas coverage.',
          example: "7/9 blocks validated; still testing the best 'Customer Relationship' automation strategy.",
          scoreField: 'p6_bmc_score'
        }
      ],
      deepDive: [
        {
          id: 'p6_pricing_tested',
          label: 'How was pricing validated?',
          type: 'textarea',
          placeholder: 'Willingness to pay evidence.',
          description: 'Proof that the price point is viable.',
          example: "Pricing survey of 50 users showed 70% would pay $50-100/month; 10% already paid $200 for early access.",
          scoreField: 'p6_pricing_tested_score'
        },
        {
          id: 'p6_unit_economics',
          label: 'Early LTV/CAC math?',
          type: 'text',
          placeholder: 'Early math on profitability per user.',
          description: 'Sustainability of growth.',
          example: "Target LTV of $4k with a CAC of $800; currently CAC is high ($2k) but falling as we shift to content-led growth.",
          scoreField: 'p6_unit_economics_score'
        }
      ]
    }
  },
  P7: {
    id: 'P7',
    name: 'Traction & CRL',
    subtitle: 'Active user proof and feedback loops.',
    weight: 0.11,
    description: 'Measures active market pull and user retention.',
    observationField: 'p7_observation',
    questions: {
      core: [
        {
          id: 'p7_crl',
          label: 'Commercial Readiness Level (CRL)?',
          type: 'select',
          options: ['1 - Ignorant', '2 - Identified', '3 - Validated', '4 - Qualified', '5 - Committed', '6 - Commercialized', '7 - Scalable', '8 - Proven', '9 - High Growth'],
          description: 'Commercial Readiness Level (1-9).',
          example: "CRL 3 - Validated.",
          scoreField: 'p7_crl_score'
        },
        {
          id: 'p7_active_users',
          label: 'Number of Active Users (DAU/WAU/MAU)?',
          type: 'number',
          placeholder: 'DAU/MAU or active accounts.',
          description: 'Current user engagement.',
          example: "12 Weekly Active Users (WAU) from 5 separate paying accounts.",
          scoreField: 'p7_active_users_score'
        },
        {
          id: 'p7_retention',
          label: 'Evidence of retention (Stickiness)?',
          type: 'textarea',
          placeholder: 'Do they come back?',
          description: 'Sticky factor of the product.',
          example: "Zero churn in the first 90 days; 4/5 pilots converted to paid annual contracts.",
          scoreField: 'p7_retention_score'
        }
      ],
      deepDive: [
        {
          id: 'p7_growth',
          label: 'Growth Velocity (% WoW/MoM)?',
          type: 'text',
          placeholder: 'Week-over-week or Month-over-month %.',
          description: 'Rate of expansion.',
          example: "20% WoW growth in registered users over the last 8 weeks.",
          scoreField: 'p7_growth_score'
        },
        {
          id: 'p7_referrals',
          label: 'Referral/Viral coefficient?',
          type: 'text',
          placeholder: 'Evidence of viral or referral growth.',
          description: 'Organic growth mechanisms.',
          example: "25% of new signups come from the 'Invite a Colleague' button inside the dashboard.",
          scoreField: 'p7_referrals_score'
        },
        {
          id: 'p7_churn',
          label: 'Why do users leave? (Churn audit)',
          type: 'textarea',
          placeholder: 'Why do users leave?',
          description: 'Analysis of loss.',
          example: "Exited 2 users who were 'Too Small' for the feature set; focusing more on Enterprise now.",
          scoreField: 'p7_churn_score'
        }
      ]
    }
  },
  P8: {
    id: 'P8',
    name: 'Team Readiness',
    subtitle: 'Founder mix, skills, and execution track record.',
    weight: 0.12,
    description: 'Evaluates the human capital behind the venture.',
    observationField: 'p8_observation',
    questions: {
      core: [
        {
          id: 'p8_team_members',
          label: 'Core Team Members',
          type: 'team',
          description: 'List of core members and their primary roles.',
          example: "CEO (Strategy), CTO (Ex-IBM), Head of Sales (15 yrs exp).",
          scoreField: 'p8_team_score'
        },
        {
          id: 'p8_missing_skills',
          label: 'What hire is needed next?',
          type: 'text',
          placeholder: 'What hire is needed next?',
          description: 'Vulnerabilities in the human capital stack.',
          example: "Need a dedicated UI/UX designer and a full-time Customer Success manager.",
          scoreField: 'p8_missing_skills_score'
        },
        {
          id: 'p8_commitment',
          label: 'Founder Equity & Focus status?',
          type: 'text',
          placeholder: 'Full-time vs Side-project status.',
          description: 'Financial and time alignment.',
          example: "Equal equity split (33% each); all 3 on vesting schedules; full focus.",
          scoreField: 'p8_commitment_score'
        }
      ],
      deepDive: [
        {
          id: 'p8_advisors',
          label: 'Who are your key advisors?',
          type: 'textarea',
          placeholder: 'External veterans supporting the team.',
          description: 'Knowledge leverage.',
          example: "Advised by Prof. X from Oxford (Chemistry) and Jane Doe (Former VP Sales at Salesforce).",
          scoreField: 'p8_advisors_score'
        },
        {
          id: 'p8_prior_work',
          label: 'Team track record (Evidence of Done)?',
          type: 'textarea',
          placeholder: 'Past startups or domain expertise.',
          description: 'Proven track record of the team.',
          example: "Product head previously built and sold a travel-tech app for $1.2M in 2018.",
          scoreField: 'p8_prior_work_score'
        },
        {
          id: 'p8_internal_challenge',
          label: 'How long has the team worked together?',
          type: 'text',
          placeholder: 'How long have you worked together?',
          description: 'Durability under pressure.',
          example: "Cofounders were roommates at Uni and worked together at previous employer for 4 years.",
          scoreField: 'p8_internal_challenge_score'
        }
      ]
    }
  },
  P9: {
    id: 'P9',
    name: 'Advantage & Moats',
    subtitle: 'High-level defensibility and winner logic.',
    weight: 0.06,
    description: 'Assesses the strategic depth and barriers to entry.',
    observationField: 'p9_observation',
    questions: {
      core: [
        {
          id: 'p9_competitor_awareness',
          label: 'Deep analysis of incumbents?',
          type: 'textarea',
          placeholder: 'What will Google/Meta do if they see you?',
          description: 'Threat landscape analysis.',
          example: "Google would see us as sub-scale but might acquire for the specific Southeast Asian logistics data.",
          scoreField: 'p9_competitor_awareness_score'
        },
        {
          id: 'p9_hard_to_copy_core',
          label: 'Technological or data moat?',
          type: 'textarea',
          placeholder: 'What is non-trivial to replicate?',
          description: 'Defensible IP/Assets.',
          example: "Proprietary database of 10k+ local warehouse maps that are not on Google Maps.",
          scoreField: 'p9_hard_to_copy_score'
        }
      ],
      deepDive: [
        {
          id: 'p9_ip',
          label: 'Formal IP (Patents, Trade Secrets)?',
          type: 'text',
          placeholder: 'Legal or structural defensibility.',
          description: 'Formal protection.',
          example: "Design patent filed for the unique modular sensor casing.",
          scoreField: 'p9_ip_score'
        },
        {
          id: 'p9_network_effects',
          label: 'Potential for Network Effects?',
          type: 'text',
          placeholder: 'Data or user network effects.',
          description: 'Growth that creates scale moats.',
          example: "The more users upload data, the more accurate the benchmark becomes for everyone (Data Network Effect).",
          scoreField: 'p9_network_effects_score'
        },
        {
          id: 'p9_switching_costs',
          label: 'Switching costs for customers?',
          type: 'text',
          placeholder: 'Why is it painful to leave?',
          description: 'Retention moats.',
          example: "Exporting data to another platform takes 2 weeks of manual cleaning due to our proprietary format.",
          scoreField: 'p9_switching_costs_score'
        }
      ]
    }
  }
};
