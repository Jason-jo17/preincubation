
// Hardened Data Repository - Nagpur NEXT Cohort
import { DetailedCompany } from '@/lib/types/detailed-company';

export const NEW_COMPANIES: DetailedCompany[] = [
    // COMPANY 1: AEQUS AEROSPACE
    {
        id: 'aeq-001',
        name: 'Aequs Limited',
        legal_name: 'Aequs Limitied (formerly Aequs Private Limited)',
        cin: 'U35100KA2006PTC039290',
        gstin: '29AAICA6657B1Z6',
        pan: 'AAICA6657B',
        company_status: 'Active',
        authorized_capital: 500.0,
        paid_up_capital: 350.5,
        net_worth: 850.0,
        founded_year: 2006,
        registration_date: '2006-03-27',
        headquarters_city: 'Bengaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: 'Aequs Tower, No. 55, Whitefield Main Road, Mahadevapura Post, Bengaluru – 560048, Karnataka',
        sector: 'aerospace',
        sub_sector: 'Precision Components & Assemblies',
        industry_classification: 'Aerospace Manufacturing',
        website: 'https://www.aequs.com',
        linkedin_url: 'https://www.linkedin.com/company/aequs',
        employee_count: 4000,
        company_type: 'Public Limited Company',
        listing_status: 'Listed',
        stock_codes: { "BSE": "543943", "NSE": "AEQUS" },
        promoter_holding_percentage: 45.2,
        market_cap: 7700.00,
        stage: 'growth',
        current_stage: 6,
        rag_status: 'amber',
        overall_score: 78,
        latest_revenue: 959.21,
        latest_net_profit: -102.35,
        revenue_growth_yoy: -2.94,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',

        benchmark_msme: {
            name: 'Spirit AeroSystems (USA/Global)',
            description: 'The world\'s largest first-tier aerostructures manufacturer and a global benchmark for high-precision OEE and digital twin implementation.',
            location: 'Wichita, Kansas',
            revenue: '$6B+',
            key_strengths: [
                'Automated Fiber Placement (AFP)',
                'High-Precision Digital Metrology',
                'Global Tier-1 Compliance Standards',
                'Advanced NDT (Non-Destructive Testing)'
            ],
            gap_comparison: [
                { category: 'OEE Precision', current_score: 72, benchmark_score: 94, rationale: 'Benchmark uses real-time fiber tension sensors and automated fiber placement machines vs semi-manual layup at Aequus.' },
                { category: 'Digital Twin Adoption', current_score: 45, benchmark_score: 90, rationale: 'Benchmark has full shadow-digital twins for all primary aerostructures vs standalone PLC data at Aequus.' },
                { category: 'Precision Metrology', current_score: 78, benchmark_score: 98, rationale: 'Benchmark utilizes 100% automated laser-trackers for assembly validation vs manual gauging for secondary structures.' }
            ]
        },

        solution_mappings: [
            {
                solution_id: 'sol-001',
                solution_name: 'AI-Powered Precision Machining Optimization',
                provider: 'Student Team (IIT Dharwad)',
                mapped_gap: 'Higher scrap rate in complex precision components.',
                relevance_score: 0.92,
                description: 'Real-time vibration analysis and predictive tool-wear modeling for CNC machines using acoustic emission sensors.'
            },
            {
                solution_id: 'sol-002',
                solution_name: 'Digital Twin for Aerospace Surface Finishing',
                provider: 'Innovator (BOPPL Labs)',
                mapped_gap: 'Manual inspection and curing time variability.',
                relevance_score: 0.88,
                description: 'Development of a physics-informed digital twin to optimize curing temp and humidity for aerospace-grade coatings.'
            }
        ],

        financials: [
            {
                fiscal_year: 'FY2024-25',
                revenue: 959.21,
                revenue_from_operations: 924.61,
                net_profit: -102.35,
                net_margin_percentage: -10.67,
                long_term_debt: 630.86,
                revenue_growth_yoy: -2.94,
                segment_breakdown: { "aerospace": 88.23, "consumer": 11.77 },
                data_source: 'IPO Prospectus, Annual Report',
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2023-24',
                revenue: 988.30,
                revenue_from_operations: 965.07,
                net_profit: -14.24,
                data_source: 'Annual Report',
                confidence: 'HIGH'
            }
        ],

        founders: [
            {
                name: 'Aravind Shivaputrappa Melligeri',
                age: 52,
                current_role: 'Executive Chairman & CEO',
                years_in_sector: 28,
                tenure_years: 24,
                education: 'BE (Mechanical) NIT Karnataka, MS (Robotics) Penn State University',
                background: '25+ years aerospace experience. Co-founded QuEST Global (1997). Founded Aequs in 2000.',
                equity_stake: 45.2,
                is_promoter: true,
                notable_achievements: ['Outstanding Engineering Alumnus Penn State 2023', 'Co-founder QuEST Global']
            }
        ],

        leadership: [
            { name: 'Rajeev Kaul', role: 'Managing Director', tenure_years: 18, total_experience_years: 22, education: 'BA Mathematics Delhi University, CA ICAI' },
            { name: 'Dinesh V. Iyer', role: 'Chief Financial Officer', tenure_years: 3, total_experience_years: 20 },
            { name: 'Ravi Guttal', role: 'CTO & Sr. VP Engineering', tenure_years: 10, total_experience_years: 25 },
            { name: 'Mohamed Bouzidi', role: 'President – Aerospace', tenure_years: 8, total_experience_years: 30 }
        ],

        board: {
            total_board_members: 8,
            executive_directors: 2,
            independent_directors: 3,
            succession_plan_exists: false,
            succession_plan_details: 'No documented succession plan. Founder age 52 with no named successor.',
            governance_score: 72
        },

        talent: {
            total_employees: 4000,
            permanent_employees: 3500,
            employee_growth_yoy: 25.0,
            glassdoor_rating: 3.5,
            glassdoor_review_count: 185,
            glassdoor_top_pros: ['Supportive top management', 'Visionary leadership'],
            glassdoor_top_cons: ['Below-market salaries', '6-day work week'],
            critical_skills_missing: ['CTO role vacant', 'Digital marketing team'],
            high_turnover_roles: ['Engineering roles', 'Senior management']
        },

        regional_context: {
            region_name: 'Bengaluru (Aerospace Hub)',
            hub_type: 'Precision Manufacturing Ecosystem',
            correlation_score: 92,
            economic_indicators: {
                "proximity_to_hal": "High",
                "export_potential": "Very High",
                "skilled_labor_availability": "High"
            },
            sector_synergies: ['Defense', 'Civil Aviation', 'Space Tech'],
            ecosystem_peers: [
                { name: 'ideaForge (Navi Mumbai)', role: 'Aerospace Peer (UAV)', alignment: 'High' },
                { name: 'Aeron Systems (Pune)', role: 'Navigation Partner', alignment: 'High' },
                { name: 'DroneAcharya (Pune)', role: 'Service Integration', alignment: 'Medium' }
            ]
        },
        brand: {
            brand_awareness_level: 'National',
            primary_markets: ['India', 'USA', 'Europe', 'Asia'],
            certifications: [
                { "name": "AS9100", "version": "Rev D", "certified": true },
                { "name": "NADCAP", "scope": "Chemical Processing", "certified": true },
                { "name": "Boeing Approved" },
                { "name": "Airbus Approved" }
            ],
            awards: [
                { "award": "Airbus Accredited SQIP Award", "year": 2024 },
                { "award": "CII 75 Most Innovative Companies", "year": 2023 }
            ],
            tagline: 'Ecosystems of Efficiency',
            differentiation_claim: 'Only precision component manufacturer in India with full vertical integration in single SEZ'
        },

        products: [
            { product_name: 'Engine Case Machining', category: 'Components', description: 'Precision-machined engine components', target_application: 'Airbus A320, A350', certifications: ['AS9100D'] },
            { product_name: 'Landing Gear Components', category: 'Components', description: 'Landing system components', target_application: 'Multiple aircraft programs' },
            { product_name: 'Over Wing Exit Door Assemblies', category: 'Assemblies', description: 'Complete door assemblies for A321neo', target_application: 'Airbus A321neo' }
        ],

        innovation: {
            fiscal_year: 'FY2024',
            rd_investment_percentage: 3.2,
            rd_team_size: 120,
            patents_filed: 7,
            patents_granted: 5,
            technology_partners: ['Aubert & Duval', 'Magellan Aerospace', 'Saab AB'],
            industry_4_adoption: 'Advanced'
        },

        clients: [
            { client_name: 'Airbus', client_sector: 'Civil Aviation', client_type: 'OEM', revenue_contribution_percentage: 35.0, is_top_3_client: true, has_long_term_contract: true },
            { client_name: 'Boeing', client_sector: 'Civil Aviation', client_type: 'OEM', revenue_contribution_percentage: 20.0, is_top_3_client: true, has_long_term_contract: true },
            { client_name: 'Safran', client_sector: 'Aerospace', client_type: 'OEM', revenue_contribution_percentage: 15.0, is_top_3_client: true }
        ],

        client_demographics: {
            top_3_clients_percentage: 70.0,
            concentration_risk: 'HIGH',
            civil_aviation_percentage: 88.0,
            export_percentage: 78.0
        },

        gap_analysis: {
            overall_gap_score: 75,
            investment_readiness: 'Caution',

            market_saturation_score: 78,
            market_saturation_diagnosis: 'Low Penetration',
            market_saturation_assessment: 'Aequs has captured only ~1.9% of its ₹50,000 Cr TAM with current ₹959 Cr revenue. Aerospace segment growing 50% YoY indicates strong growth runway.',
            market_saturation_evidence: 'Revenue ₹959 Cr vs TAM ₹50,000 Cr = 1.92% penetration. Target $1B (₹8,300 Cr) in 5 years.',

            founder_quality_score: 72,
            founder_quality_assessment: 'Strong technical founder with 28 years sector experience but at age 52 with no documented succession plan, key person risk is emerging.',
            founder_quality_red_flags: [
                'No documented succession plan',
                'Founder age 52 with 24-year tenure',
                'Over-reliance on founder vision',
                'No named successor for CEO role'
            ],
            founder_quality_green_flags: [
                '28 years aerospace sector experience',
                '45% equity stake shows commitment',
                'Successful track record (QuEST Global co-founder)',
                'Attracted top-tier investors'
            ],

            business_maturity_score: 82,
            business_maturity_assessment: 'Operational since 2000 with established systems. Tier-1 status with Airbus/Boeing. AS9100 Rev D, NADCAP certifications. Consistent losses indicate business model refinement needed.',

            market_opportunity_score: 88,
            market_opportunity_assessment: 'Massive addressable market driven by India aviation boom, PLI scheme, and China+1 shift.',
            tam: 50000.00,
            sam: 8000.00,
            som: 2000.00,
            current_penetration_percentage: 1.92,

            leadership_quality_score: 68,
            leadership_quality_assessment: 'Experienced leadership team but succession planning gaps and CTO role vacant.',
            leadership_gaps: ['No succession plan', 'CTO role vacant', 'Weak second-line leadership'],

            innovation_differentiator_score: 76,
            innovation_assessment: 'Industry-leading infrastructure (10,000-ton press) but R&D at 3.2% vs industry 5% is low.',
            innovation_gaps: ['R&D investment at 3.2%', 'Only 7 patents filed', 'Limited IP portfolio'],

            talent_pool_score: 78,
            talent_assessment: 'Large workforce with specialized talent. High attrition (18%) and below-market comp are risks.',
            talent_gaps: ['High engineering attrition', 'Below-market salaries', 'Work-life balance concerns'],

            brand_identity_score: 70,
            brand_assessment: 'Strong industry recognition (Airbus Awards) but weak consumer/digital presence.',
            brand_gaps: ['Limited brand awareness outside aerospace', 'Weak digital marketing'],

            critical_gaps: [
                'No succession plan for 52-year-old founder',
                'Three consecutive years of net losses',
                'High debt load (₹631 Cr)',
                'Revenue concentration: 88% aerospace, 70% top 3 clients',
                'CTO position vacant'
            ],
            moderate_gaps: [
                'Consumer segment dragging profitability',
                'R&D investment below industry average',
                'Weak digital marketing'
            ],
            key_strengths: [
                'Tier-1 supplier to Airbus (10-year contract)',
                'Only integrated aerospace ecosystem in India',
                'India\'s largest 10,000-ton forging press',
                'AS9100, NADCAP certifications'
            ],

            immediate_actions: [
                'Document formal succession plan',
                'Hire CTO immediately',
                'Separate consumer segment P&L',
                'Apply for PLI scheme funding'
            ],
            short_term_recommendations: [
                'Achieve profitability over growth',
                'Launch talent retention program',
                'Diversify client base'
            ],
            medium_term_recommendations: [
                'Scale to $500M aerospace revenue',
                'Establish US manufacturing presence',
                'Develop proprietary IP'
            ],

            time_to_opportunity_months: 18,
            probability_of_success_percentage: 72.5
        },
        problem_statements: [
            {
                id: 'prob-aeq-001',
                title: 'High-Strength Lightweight Composite Bonding',
                description: 'Seeking innovative bonding techniques for carbon-fiber to titanium joints that maintain structural integrity under extreme thermal cycles (-50C to +150C).',
                tags: ['Materials', 'Composites', 'Aerospace'],
                status: 'published',
                category: 'Manufacturing Technology',
                complexity: 'high'
            },
            {
                id: 'prob-aeq-002',
                title: 'Real-time Tool Wear Monitoring using AI',
                description: 'Implement an edge-AI solution to predict tool bit failure in 5-axis CNC machines to reduce scrap rates by 15%.',
                tags: ['AI', 'Industry 4.0', 'Precision Engineering'],
                status: 'preview',
                category: 'Digital Transformation',
                complexity: 'medium'
            }
        ],
        challenges: [
            {
                id: 'challenge-aeq-001',
                title: 'Carbon-Titanium Composite Bonding',
                description: 'Design a bonding interface that handles -50C to +150C thermal cycling without delamination.',
                problem_statement: 'High rejection rates in composite-to-metal bonding due to thermal expansion mismatch.',
                status: 'published',
                category: 'Materials Science',
                tags: ['Materials', 'Aerospace'],
                associated_program_id: 'make-4-x-aero'
            },
            {
                id: 'challenge-aeq-002',
                title: 'CNC Predictive Maintenance AI',
                description: 'Develop an edge-deployed model to predict 5-axis tool failure 30 mins before occurrence.',
                problem_statement: 'Unscheduled tool breakage causes significant downtime and part scrap.',
                status: 'published',
                category: 'Digital Manufacturing',
                tags: ['AI', 'Industry 4.0'],
                associated_program_id: 'make-4-x-aero'
            }
        ],
        recommended_strategic_actions: [
            {
                id: 'strat-aeq-001',
                title: 'Skill-Up: Precision Engineering 4.0',
                description: 'Establish a certified training center for CNC multi-axis operations to bridge the skill gap in Belagavi region.',
                impact: 'high',
                timeframe: '6-12 months',
                category: 'Talent Development'
            },
            {
                id: 'strat-aeq-002',
                title: 'Export Cluster Synergy',
                description: 'Leverage the Mangaluru Port-to-Belagavi Logistics corridor to reduce raw material import costs by 8% through bulk shipping alliances.',
                impact: 'medium',
                timeframe: '12-18 months',
                category: 'Supply Chain'
            }
        ],

    },

    // COMPANY 2: DYNAMATIC TECHNOLOGIES
    {
        id: 'dyn-001',
        name: 'Dynamatic Technologies Limited',
        legal_name: 'Dynamatic Technologies Limited',
        cin: 'L72200KA1973PLC002308',
        founded_year: 1973,
        headquarters_city: 'Bengaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: 'JKM Plaza, Dynamatic Aerotropolis, 55 KIADB Aerospace Park, Bangalore 562149',
        sector: 'aerospace',
        sub_sector: 'Hydraulics & Aerospace Components',
        website: 'https://www.dynamatics.com',
        linkedin_url: 'https://www.linkedin.com/company/dynamatic-technologies',
        employee_count: 840,
        company_type: 'Public Limited Company',
        listing_status: 'Listed',
        stock_codes: { "NSE": "DYNAMATECH", "BSE": "505242" },
        promoter_holding_percentage: 41.87,
        market_cap: 6500.00,
        stage: 'mature',
        current_stage: 6,
        rag_status: 'green',
        overall_score: 85,
        latest_revenue: 1472.00,
        latest_net_profit: 121.80,
        revenue_growth_yoy: 11.1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',

        financials: [
            {
                fiscal_year: 'FY2024',
                revenue: 1472.00,
                net_profit: 121.80,
                net_margin_percentage: 8.27,
                ebitda_margin_percentage: 15.7,
                long_term_debt: 200.00,
                debt_to_equity_ratio: 0.30,
                revenue_growth_yoy: 11.1,
                segment_breakdown: { "aerospace_defense": 52, "hydraulics": 33, "metallurgy": 15 },
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2023',
                revenue: 1326.00,
                net_profit: 42.80,
                net_margin_percentage: 3.23,
                long_term_debt: 233.00,
                confidence: 'HIGH'
            }
        ],

        founders: [
            {
                name: 'J.K. Malhoutra',
                age: 78,
                current_role: 'Founder',
                years_in_sector: 51,
                background: 'Founded Dynamatic Hydraulics Limited in 1973. Visionary industrialist.',
            }
        ],

        leadership: [
            { name: 'Dr. Udayant Malhoutra', role: 'CEO & Managing Director', tenure_years: 30, is_executive_director: true, background: 'Chairman National Institute of Design' },
            { name: 'Pierre de Bausset', role: 'Independent Director & Chairman', tenure_years: 5, is_independent_director: true, background: 'Former President & MD Airbus India' },
            { name: 'Chalapathi P', role: 'Executive Director & CFO', tenure_years: 17, is_executive_director: true },
            { name: 'Air Chief Marshal V.R. Chaudhari (Retd.)', role: 'Independent Director', tenure_years: 1, is_independent_director: true }
        ],

        board: {
            total_board_members: 7,
            executive_directors: 2,
            independent_directors: 4,
            succession_plan_exists: true,
            succession_plan_details: 'Dr. Udayant Malhoutra (son of founder) groomed over 30 years.',
            governance_score: 88
        },

        talent: {
            total_employees: 840,
            employee_growth_yoy: 7.0,
            glassdoor_rating: 3.6,
            glassdoor_review_count: 75,
            glassdoor_top_pros: ['Good infrastructure', 'Hands-on learning', 'Prestigious projects'],
            glassdoor_top_cons: ['Salary competitiveness', 'Work-life balance']
        },

        brand: {
            brand_awareness_level: 'International',
            primary_markets: ['India', 'USA', 'Europe', 'Middle East'],
            certifications: [
                { "name": "AS9100", "note": "Zero NC certification" },
                { "name": "NADCAP", "scope": "Heat Treatment, FPI, Welding" },
                { "name": "ISO 9001:2015", "certified": true }
            ],
            awards: [
                { "award": "Uttama Suraksha Puraskara", "year": 2025 },
                { "award": "Quality Leadership Award", "year": 2023 },
                { "award": "Airbus Strategic Partner", "year": 2022 }
            ]
        },

        products: [
            { product_name: 'Flap Track Beam Assemblies', category: 'Assemblies', description: 'Global sole source for Airbus A320/A330', target_application: 'A320, A330' },
            { product_name: 'A220 Aircraft Doors', category: 'Assemblies', description: 'Cargo, passenger, service doors', target_application: 'Airbus A220' },
            { product_name: 'P-8 Poseidon Mission Cabinets', category: 'Assemblies', description: 'Global sole source for power & mission cabinets', target_application: 'Boeing P-8 Poseidon' }
        ],

        innovation: {
            fiscal_year: 'FY2024',
            rd_team_size: 80,
            technology_partners: ['Airbus', 'Boeing', 'Dassault'],
            industry_4_adoption: 'Advanced'
        },

        clients: [
            { client_name: 'Airbus', client_sector: 'Civil Aviation', relationship_duration_years: 20, revenue_contribution_percentage: 30.0, is_top_3_client: true, has_long_term_contract: true },
            { client_name: 'Boeing', client_sector: 'Defense & Civil', relationship_duration_years: 15, revenue_contribution_percentage: 20.0, is_top_3_client: true },
            { client_name: 'HAL', client_sector: 'Defense', relationship_duration_years: 30, revenue_contribution_percentage: 15.0, is_top_3_client: true }
        ],

        client_demographics: {
            top_3_clients_percentage: 65.0,
            concentration_risk: 'MEDIUM',
            civil_aviation_percentage: 50.0,
            defense_govt_percentage: 35.0,
            oem_percentage: 75.0
        },

        gap_analysis: {
            overall_gap_score: 85,
            investment_readiness: 'Ready',

            market_saturation_score: 72,
            market_saturation_diagnosis: 'Growing',
            market_saturation_assessment: 'Moderate penetration with steady growth. Revenue ₹1,472 Cr with 11% YoY growth. Hydraulics segment is market leader.',

            founder_quality_score: 88,
            founder_quality_assessment: 'Excellent succession planning with 2nd generation leader groomed over 30 years.',
            founder_quality_green_flags: [
                '30-year succession planning',
                '2nd generation successfully leading',
                'Clear governance structure',
                'Strong board with ex-Airbus President'
            ],

            business_maturity_score: 92,
            business_maturity_assessment: 'Highly mature 51-year-old company with established global presence. Zero NC AS9100 certification.',

            market_opportunity_score: 90,
            market_opportunity_assessment: 'Excellent market opportunity in defense modernization and civil aviation. Sole source for Airbus flap beams.',
            tam: 60000.00,
            sam: 12000.00,
            som: 3000.00,

            leadership_quality_score: 90,
            leadership_quality_assessment: 'World-class leadership with ex-Chief of Air Staff on board.',

            innovation_differentiator_score: 85,
            innovation_assessment: 'Strong innovation with 3 global R&D centers and Industry 4.0 adoption.',

            talent_pool_score: 76,
            talent_assessment: 'Good infrastructure but concerns about compensation competitiveness.',

            brand_identity_score: 88,
            brand_assessment: 'International brand recognition. Global sole source for multiple programs.',

            critical_gaps: [
                'Metallurgy segment under pressure',
                'High valuation (P/E 68x)',
                'Profit volatility'
            ],
            key_strengths: [
                'Global sole source Airbus flap beams',
                'World leader hydraulics (80% India)',
                'Exclusive AMCA partner',
                'Only Indian company making aircraft doors',
                'Strong dividend policy'
            ],
            immediate_actions: [
                { title: 'Industrialize A220 doors ahead of schedule', impact: 'high', timeframe: '6 months', category: 'Production', associated_program_id: 'make-4-x-aero' },
                'Scale AMCA program',
                'Turnaround metallurgy segment'
            ],

            time_to_opportunity_months: 12,
            probability_of_success_percentage: 85.0
        }
    },

    // COMPANY 3: TAAL
    {
        id: 'taal-001',
        name: 'Taneja Aerospace and Aviation Ltd',
        legal_name: 'Taneja Aerospace and Aviation Limited',
        cin: 'L62200TZ1988PLC014460',
        founded_year: 1988,
        headquarters_city: 'Hosur',
        headquarters_state: 'Tamil Nadu',
        registered_office_address: 'Belagondapalli Village, Thally Road, Denkanikotta Taluk, Krishnagiri District, Tamil Nadu - 635114',
        sector: 'aerospace',
        sub_sector: 'Components & MRO',
        website: 'https://www.taal.co.in',
        employee_count: 35,
        company_type: 'Public Limited Company',
        listing_status: 'Listed',
        stock_codes: { "BSE": "522229" },
        promoter_holding_percentage: 52.03,
        market_cap: 800.00,
        stage: 'growth',
        current_stage: 6,
        rag_status: 'amber',
        overall_score: 68,
        latest_revenue: 41.00,
        latest_net_profit: 18.00,
        revenue_growth_yoy: 36.7,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',

        financials: [
            {
                fiscal_year: 'FY2025',
                revenue: 41.00,
                net_profit: 18.00,
                net_margin_percentage: 43.90,
                ebitda_margin_percentage: 64.0,
                debt_to_equity_ratio: 0.00,
                revenue_growth_yoy: 36.7,
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2024',
                revenue: 30.00,
                net_profit: 11.00,
                net_margin_percentage: 36.67,
                debt_to_equity_ratio: 0.00,
                confidence: 'HIGH'
            }
        ],

        leadership: [
            { name: 'Dr. Prahlada Ramarao', role: 'Chairman', tenure_years: 10, is_independent_director: true, background: 'Former DRDO scientist, Padma Shri' },
            { name: 'Salil Baldev Taneja', role: 'Promoter & Non-Executive Director', tenure_years: 35, background: 'MD TAAL Tech India' },
            { name: 'Rakesh Duda', role: 'Managing Director', tenure_years: 3, is_executive_director: true, background: 'Former Hero MotoCorp' }
        ],

        board: {
            total_board_members: 4,
            executive_directors: 1,
            independent_directors: 2
        },

        talent: {
            total_employees: 35,
            permanent_employees: 35
        },

        brand: {
            brand_awareness_level: 'National',
            certifications: [
                { "name": "AS9100", "certified": true },
                { "name": "DGCA CAR-21", "note": "Aircraft Manufacturing Approval" },
                { "name": "Aerodrome Licence", "note": "DGCA-licensed private aerodrome" }
            ],
            marketing_sophistication: 'Basic'
        },

        gap_analysis: {
            overall_gap_score: 68,
            investment_readiness: 'Caution',

            market_saturation_score: 45,
            market_saturation_diagnosis: 'Niche',
            market_saturation_assessment: 'Limited operational scale (₹41 Cr revenue) but asset-rich with 240-acre airfield.',

            founder_quality_score: 65,
            founder_quality_assessment: 'Promoter family involved since 1988. New MD since 2022 brings fresh perspective.',

            business_maturity_score: 78,
            business_maturity_assessment: 'Operating since 1988. First private company licensed to manufacture aircraft in India.',

            market_opportunity_score: 75,
            market_opportunity_assessment: 'Aviation infrastructure opportunity strong with Hosur/Bengaluru growth.',

            leadership_quality_score: 70,
            talent_pool_score: 60,
            innovation_differentiator_score: 55,
            brand_identity_score: 62,

            critical_gaps: [
                'Minimal operational scale',
                'HANSA program transferred out',
                'Limited order book visibility',
                'Heavy tenant dependence'
            ],
            key_strengths: [
                '240-acre DGCA-licensed airfield',
                'Debt-free balance sheet',
                '64% OPM',
                'Strong dividend policy'
            ],

            time_to_opportunity_months: 24,
            probability_of_success_percentage: 60.0
        }
    },
    // COMPANY 4: HICAL TECHNOLOGIES
    {
        // Core Company Information
        id: 'hical-001',
        name: 'Hical Technologies Private Limited',
        legal_name: 'Hical Technologies Private Limited (formerly Hical Aerospace Private Limited)',
        cin: 'U31900KA2011PTC060176',
        gstin: '29AACCH7296L1ZU',
        pan: undefined, // Not disclosed in research
        company_status: 'Active',
        registration_date: '2011-08-26',
        founded_year: 1988,

        // Addresses
        registered_office_address: 'Sy. No.46&47, Electronic City, Phase 2, Hosur Road, Bangalore, Karnataka - 560100',
        corporate_office_address: 'Sy. No.46&47, Electronic City, Phase 2, Hosur Road, Bangalore, Karnataka - 560100',

        // Location
        headquarters_city: 'Bangalore',
        headquarters_state: 'Karnataka',

        // Classification
        sector: 'aerospace',
        sub_sector: 'Electromagnetics & Actuators',
        industry_classification: 'Manufacture of Other Electrical Equipment N.E.C. (NIC Code 3190)',

        // Online Presence
        website: 'https://www.hical.com/',
        linkedin_url: 'https://www.linkedin.com/company/hical-technologies-pvt-ltd/',

        // Company Type & Structure
        company_type: 'Private Limited Company',
        listing_status: 'Unlisted',
        stock_codes: undefined,
        promoter_holding_percentage: 100.0,
        market_cap: undefined, // Private company

        // Capitalization
        authorized_capital: 5.0,
        paid_up_capital: 4.97,
        net_worth: undefined, // Estimated ~35-40 Cr based on paid-up + growth

        // Employee & Stage
        employee_count: 517,
        stage: 'growth',
        current_stage: 5, // Established growth stage
        rag_status: 'amber',
        overall_score: 72,

        // Financial Overview
        latest_revenue: 212.2,
        latest_net_profit: undefined, // Not disclosed; ICRA notes negative operating cash flow
        revenue_growth_yoy: 36.0,

        // Metadata
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'MEDIUM-HIGH',
        last_research_date: '2025-01-20',
        notes: "Karnataka's premier aerospace electromagnetics specialist. 11-year UTC Gold Supplier. ISRO GOCO partner. High growth (36% YoY) but working capital stress and customer concentration risk.",

        // ========================================================================
        // FINANCIAL DATA
        // ========================================================================
        financials: [
            {
                fiscal_year: 'FY2025',
                revenue: 212.2,
                revenue_from_operations: undefined,
                net_profit: 0,
                net_margin_percentage: undefined,
                ebitda: 0,
                ebitda_margin_percentage: 14.0,
                shareholders_equity: undefined,
                long_term_debt: undefined,
                short_term_debt: 82.5, // Working capital debt
                debt_to_equity_ratio: 2.8, // TOL/TNW
                revenue_growth_yoy: 36.0,
                segment_breakdown: { "aerospace_defense": 80, "space": 12, "other": 8 },
                data_source: 'Company disclosures, industry sources',
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2024',
                revenue: 158.0,
                revenue_from_operations: undefined,
                net_profit: 0,
                net_margin_percentage: undefined,
                ebitda: 0,
                ebitda_margin_percentage: 12.3,
                shareholders_equity: undefined,
                long_term_debt: undefined,
                short_term_debt: 82.5,
                debt_to_equity_ratio: 2.8,
                revenue_growth_yoy: 12.5,
                segment_breakdown: { "aerospace_defense": 80, "space": 12, "other": 8 },
                data_source: 'ICRA Rating Report',
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2023',
                revenue: 137.0,
                revenue_from_operations: undefined,
                net_profit: 0,
                net_margin_percentage: undefined,
                ebitda: 0,
                ebitda_margin_percentage: 10.8,
                shareholders_equity: undefined,
                long_term_debt: undefined,
                short_term_debt: 62.0,
                debt_to_equity_ratio: undefined,
                revenue_growth_yoy: 26.2,
                segment_breakdown: undefined,
                data_source: 'ICRA, Tracxn',
                confidence: 'MEDIUM'
            },
            {
                fiscal_year: 'FY2022',
                revenue: 109.0,
                revenue_from_operations: undefined,
                net_profit: 0,
                net_margin_percentage: undefined,
                ebitda: 0,
                ebitda_margin_percentage: undefined,
                shareholders_equity: undefined,
                long_term_debt: undefined,
                short_term_debt: undefined,
                debt_to_equity_ratio: undefined,
                revenue_growth_yoy: 0,
                segment_breakdown: undefined,
                data_source: 'Estimated from growth rates',
                confidence: 'MEDIUM'
            },
            {
                fiscal_year: 'FY2021',
                revenue: 95.0,
                revenue_from_operations: undefined,
                net_profit: 0,
                net_margin_percentage: undefined,
                ebitda: 0,
                ebitda_margin_percentage: undefined,
                shareholders_equity: undefined,
                long_term_debt: undefined,
                short_term_debt: undefined,
                debt_to_equity_ratio: undefined,
                revenue_growth_yoy: 0,
                segment_breakdown: undefined,
                data_source: 'Estimated; COVID-19 impact year',
                confidence: 'LOW'
            }
        ],

        // ========================================================================
        // FOUNDERS
        // ========================================================================
        founders: [
            {
                name: 'Shashikiran Mullur',
                age: undefined, // Not disclosed
                current_role: 'Founder/Chairman',
                years_in_sector: 38,
                tenure_years: 37,
                education: 'Not disclosed',
                background: '38+ years in aerospace industry. Founded Hical in 1988. Also coffee planter in Malnad region.',
                equity_stake: undefined, // Part of 100% promoter holding
                is_promoter: true,
                linkedin_url: undefined,
                notable_achievements: [
                    '11 consecutive years UTC/Collins Aerospace Gold Supplier',
                    'ISRO GOCO contract holder',
                    'Indian Offset Partner certification',
                    '37 years operational history'
                ]
            },
            {
                name: 'Sujaya Shashikiran',
                age: undefined,
                current_role: 'Managing Director',
                years_in_sector: 30,
                tenure_years: 13,
                education: 'SJCE Mysore (1979-84)',
                background: '3+ decades in engineering, manufacturing, and administration',
                equity_stake: undefined,
                is_promoter: true,
                linkedin_url: undefined,
                notable_achievements: []
            },
            {
                name: 'Jaiveer Yashas Shashikiran',
                age: undefined,
                current_role: 'Joint Managing Director',
                years_in_sector: 9,
                tenure_years: 9,
                education: 'National University of Singapore',
                background: 'Second-generation leader. Former Director of Business Development.',
                equity_stake: undefined,
                is_promoter: true,
                linkedin_url: undefined,
                notable_achievements: []
            }
        ],

        // ========================================================================
        // LEADERSHIP TEAM
        // ========================================================================
        leadership: [
            {
                name: 'Murali P',
                role: 'CTO/Head Technology Center',
                tenure_years: undefined,
                total_experience_years: 25,
                education: 'Gujarat Technological University',
                background: 'Ex-ISRO, Ex-Moog India. Deep aerospace and defense technology expertise.',
                is_executive_director: false,
                is_independent_director: false
            },
            {
                name: 'Mohammed Ajaz',
                role: 'VP Operations',
                tenure_years: undefined,
                total_experience_years: undefined,
                education: undefined,
                background: 'Operations leadership',
                is_executive_director: false,
                is_independent_director: false
            },
            {
                name: 'Thatti Suresh',
                role: 'VP Business Development',
                tenure_years: undefined,
                total_experience_years: undefined,
                education: undefined,
                background: 'Sales and business development',
                is_executive_director: false,
                is_independent_director: false
            },
            {
                name: 'Murali Nellepalli',
                role: 'GM Finance',
                tenure_years: undefined,
                total_experience_years: undefined,
                education: undefined,
                background: 'Finance leadership',
                is_executive_director: false,
                is_independent_director: false
            },
            {
                name: 'Soumya Venkatesh',
                role: 'HCM Head',
                tenure_years: undefined,
                total_experience_years: undefined,
                education: undefined,
                background: 'Human capital management and sustainability',
                is_executive_director: false,
                is_independent_director: false
            },
            {
                name: 'V.B. Venkatesh',
                role: 'Independent Director',
                tenure_years: undefined,
                total_experience_years: undefined,
                education: undefined,
                background: '5 other directorships',
                is_executive_director: false,
                is_independent_director: true
            }
        ],

        // ========================================================================
        // BOARD COMPOSITION
        // ========================================================================
        board: {
            total_board_members: 4,
            executive_directors: 3,
            independent_directors: 1,
            succession_plan_exists: false,
            succession_plan_details: 'No documented succession plan publicly available. Jaiveer Yashas Shashikiran (JMD) positioned as likely successor, but 3 of 4 directors are from same family creating high key person risk.',
            governance_score: 65
        },

        // ========================================================================
        // TALENT METRICS
        // ========================================================================
        talent: {
            total_employees: 517,
            permanent_employees: undefined,
            employee_growth_yoy: -7.0,
            glassdoor_rating: 2.7,
            glassdoor_review_count: 20,
            glassdoor_ceo_approval: 40,
            glassdoor_recommend_to_friend: undefined,
            glassdoor_top_pros: [
                'Exposure to aerospace industry',
                'Technical learning opportunities',
                'Stable organization',
                'Work with prestigious clients (ISRO, Collins)'
            ],
            glassdoor_top_cons: [
                'Below-market compensation (15-20% lower)',
                'Limited work-life balance',
                'Hierarchical decision-making',
                'Slow career progression',
                '6-day work week concerns'
            ],
            critical_skills_missing: [
                'Digital marketing expertise',
                'Advanced manufacturing specialists',
                'Software engineers for Industry 4.0',
                'Senior finance talent (only GM-level)'
            ],
            high_turnover_roles: [
                'Engineering roles (18% attrition)',
                'Manufacturing staff',
                'Mid-level management'
            ]
        },

        // ========================================================================
        // BRAND METRICS
        // ========================================================================
        brand: {
            brand_awareness_level: 'National',
            primary_markets: ['India', 'USA', 'Europe'],
            certifications: [
                { "name": "AS9100", "version": "Rev D", "certified": true },
                { "name": "CEMILAC", "scope": "Design Approval", "certified": true },
                { "name": "NADCAP", "scope": "Cable Harnesses (via YTPL)", "certified": true },
                { "name": "ISO 9001:2015", "certified": true },
                { "name": "ISRO GOCO", "certified": true },
                { "name": "Indian Offset Partner", "certified": true },
                { "name": "DST-NSTEDB Recognized", "certified": true }
            ],
            awards: [
                { "award": "UTC/Collins Aerospace Gold Supplier", "year": 2024, "category": "11 consecutive years" },
                { "award": "ISRO GOCO Contract", "category": "Strategic Partner" }
            ],
            marketing_sophistication: 'Basic',
            tagline: undefined,
            differentiation_claim: "Karnataka's premier aerospace electromagnetics specialist with 37 years operational history serving ISRO, HAL, and global OEMs"
        },

        // ========================================================================
        // PRODUCTS
        // ========================================================================
        products: [
            {
                product_name: 'Electromechanical Actuators',
                category: 'Actuators',
                description: 'Linear and rotary actuators for aerospace applications including launch vehicles and aircraft control systems',
                target_application: 'ISRO launch vehicles, aircraft control systems',
                certifications: ['CEMILAC', 'AS9100'],
                oem_approvals: ['ISRO', 'HAL']
            },
            {
                product_name: 'DC Solenoids',
                category: 'Electromagnetics',
                description: 'Aerospace and defense-grade DC solenoids',
                target_application: 'Tejas Mk2, various aircraft systems',
                certifications: ['AS9100'],
                oem_approvals: ['HAL', 'DRDO']
            },
            {
                product_name: 'Aerospace Valves',
                category: 'Flow Control',
                description: 'Precision valves for aerospace applications',
                target_application: 'Aircraft hydraulic and pneumatic systems',
                certifications: ['AS9100'],
                oem_approvals: ['Collins Aerospace', 'Honeywell']
            },
            {
                product_name: 'Igniter Systems',
                category: 'Propulsion Components',
                description: 'Ignition systems for rocket motors',
                target_application: 'Launch vehicle propulsion',
                certifications: ['CEMILAC'],
                oem_approvals: ['ISRO']
            },
            {
                product_name: 'Cable Harnesses',
                category: 'Interconnects',
                description: 'Aerospace-grade cable harnesses via YTPL subsidiary (29.5% stake)',
                target_application: 'Aircraft electrical systems',
                certifications: ['NADCAP', 'AS9100'],
                oem_approvals: []
            },
            {
                product_name: 'Motors & Actuators',
                category: 'Electromechanical',
                description: 'Specialized motors and actuators for aerospace applications',
                target_application: 'Aircraft systems',
                certifications: ['AS9100'],
                oem_approvals: ['Collins Aerospace']
            }
        ],

        // ========================================================================
        // INNOVATION METRICS
        // ========================================================================
        innovation: {
            fiscal_year: 'FY2024',
            rd_investment_percentage: undefined, // Not disclosed
            rd_team_size: undefined, // Estimated 25-30% of engineering staff
            patents_filed: undefined, // Not disclosed
            patents_granted: 0,
            new_products_launched: [],
            technology_partners: [
                'ISRO',
                'DRDO',
                'HAL',
                'NSE Industries France (JV partner)'
            ],
            industry_4_adoption: 'Basic'
        },

        // ========================================================================
        // CLIENTS
        // ========================================================================
        clients: [
            {
                client_name: 'Collins Aerospace (UTC)',
                client_sector: 'Aerospace',
                client_type: 'OEM',
                revenue_contribution_percentage: 15.0,
                is_top_3_client: true,
                products_services: ['Actuators', 'Valves', 'Solenoids'],
                has_long_term_contract: true,
                relationship_duration_years: 11
            },
            {
                client_name: 'ISRO',
                client_sector: 'Space',
                client_type: 'Government',
                revenue_contribution_percentage: 12.0,
                is_top_3_client: true,
                products_services: ['Electromechanical Actuators', 'Igniter Systems'],
                has_long_term_contract: true,
                relationship_duration_years: 10
            },
            {
                client_name: 'Honeywell',
                client_sector: 'Aerospace',
                client_type: 'OEM',
                revenue_contribution_percentage: 10.0,
                is_top_3_client: true,
                products_services: ['Dedicated production line'],
                has_long_term_contract: true,
                relationship_duration_years: undefined
            },
            {
                client_name: 'Woodward',
                client_sector: 'Aerospace',
                client_type: 'Tier-1',
                revenue_contribution_percentage: 8.0,
                is_top_3_client: false,
                products_services: [],
                has_long_term_contract: true,
                relationship_duration_years: undefined
            },
            {
                client_name: 'HAL (Hindustan Aeronautics Limited)',
                client_sector: 'Defense',
                client_type: 'Government',
                revenue_contribution_percentage: 7.0,
                is_top_3_client: false,
                products_services: ['Solenoids for Tejas Mk2'],
                has_long_term_contract: false,
                relationship_duration_years: undefined
            }
        ],

        // ========================================================================
        // CLIENT DEMOGRAPHICS
        // ========================================================================
        client_demographics: {
            top_3_clients_percentage: 37.0, // Collins 15% + ISRO 12% + Honeywell 10%
            concentration_risk: 'HIGH', // Top 5 = 52%
            defense_govt_percentage: 19.0, // ISRO 12% + HAL 7%
            civil_aviation_percentage: undefined, // Included in aerospace
            domestic_india_percentage: 50.0,
            export_percentage: 50.0,
            oem_percentage: 60.0 // Collins, Honeywell, and other OEMs
        },

        // ========================================================================
        // GAP ANALYSIS
        // ========================================================================
        gap_analysis: {
            overall_gap_score: 72,
            // Market Saturation
            market_saturation_score: 92, // Using 1-100 scale (was 8/10)
            market_saturation_diagnosis: 'Low Penetration / High Growth',
            market_saturation_assessment: 'Hical has captured only ~1.17% of India\'s $16.22B aerospace components TAM with current ₹158 Cr revenue (FY2024). Growing 2-3x faster than market (36% vs 6.37% CAGR) with 95%+ addressable market untapped.',
            market_saturation_evidence: 'Revenue ₹212.2 Cr (FY2025) vs TAM ₹1,35,000 Cr = 1.17% penetration. 1,600+ aircraft orders and PLI scheme create massive growth runway.',

            // Founder Quality
            founder_quality_score: 70,
            founder_quality_assessment: '38+ years aerospace experience with proven track record (11-year Gold Supplier, ISRO GOCO) but limited public profile and high key person concentration risk in family-owned structure.',
            founder_quality_red_flags: [
                'No documented succession plan',
                'Over-concentration of decision-making in founding family',
                'All 3 executive directors from same family',
                '100% promoter holding limits external oversight',
                'Limited professional management depth'
            ],
            founder_quality_green_flags: [
                '38+ years sector experience (since 1988)',
                '11 consecutive years UTC/Collins Gold Supplier status',
                'Strategic ISRO GOCO partnership secured',
                'Indian Offset Partner certification',
                'Successfully navigated COVID-19 recovery (26% growth FY2023)',
                'Second-generation succession in progress (Jaiveer as JMD)'
            ],

            // Business Maturity
            business_maturity_score: 82,
            business_maturity_assessment: 'Operational since 1988 (37 years) with established quality systems (AS9100, CEMILAC, NADCAP). Tier-1 supplier status with major OEMs. However, negative operating cash flow for 3 consecutive years and working capital stress indicate business model refinement needed.',

            // Market Opportunity
            market_opportunity_score: 88,
            market_opportunity_assessment: 'Massive addressable market driven by India aviation boom (1,600+ aircraft orders), PLI scheme (₹1.97 lakh crore), Atmanirbhar Bharat (68% indigenous target), and China+1 supply chain shift.',
            tam: 135000.00, // ₹1,35,000 Cr ($16.22B converted)
            sam: 8000.00, // Karnataka aerospace + Hical segments
            som: 650.00, // Realistically winnable over 5 years
            current_penetration_percentage: 1.17,

            // Leadership Quality
            leadership_quality_score: 60,
            leadership_quality_assessment: 'Second-generation succession planned with JMD in place; professional CTO from ISRO. However, family-dominated board (3 of 4 directors), only 1 independent director, and limited professional management depth.',
            leadership_gaps: [
                'Only 1 of 4 directors is independent',
                'No documented succession plan',
                'Limited professional management depth beyond VP level',
                'Finance leadership at GM level (not CFO)',
                'Family board dominance limits governance'
            ],

            // Innovation & Differentiation
            innovation_differentiator_score: 60,
            innovation_assessment: 'ISRO GOCO contract, CEMILAC design approval, and DST recognition demonstrate innovation capability. However, limited patent portfolio disclosure, no R&D investment visibility, and basic Industry 4.0 adoption.',
            innovation_gaps: [
                'No disclosed patents or IP portfolio',
                'R&D investment percentage not disclosed',
                'Basic digital manufacturing adoption',
                'No advanced manufacturing (additive, automation)',
                'Limited innovation pipeline visibility'
            ],

            // Talent Pool
            talent_pool_score: 50,
            talent_assessment: '517 employees with specialized aerospace skills and ₹30.4 Lakh revenue per employee (efficient). However, 7% workforce reduction, 2.7 Glassdoor rating, below-market compensation (15-20% lower), and 15% positive outlook signal serious talent challenges.',
            talent_gaps: [
                'Below-market compensation (15-20% lower than industry)',
                'Poor work-life balance (2.5/5 rating)',
                'High attrition rate (18% in engineering)',
                '7% workforce reduction YoY (Aug 2024-2025)',
                'Low employee morale (15% positive business outlook)',
                'Limited career progression opportunities',
                'Hierarchical decision-making culture'
            ],

            // Brand Identity
            brand_identity_score: 60,
            brand_assessment: 'Strong B2B recognition through 11-year UTC Gold Supplier status, ISRO partnership, and industry certifications. However, basic digital presence (website), minimal content marketing, and limited thought leadership.',
            brand_gaps: [
                'Basic website sophistication',
                'Minimal content marketing or PR',
                'Limited social media engagement (12K LinkedIn followers but low activity)',
                'No thought leadership positioning',
                'Weak digital marketing presence'
            ],

            // Consolidated Gaps & Strengths
            critical_gaps: [
                'Negative operating cash flow for 3 consecutive years',
                'High working capital intensity (63% NWC/OI)',
                'Customer concentration risk (52% from top 5 clients)',
                'ICRA rating downgrade in FY2024 (subsequently reaffirmed)',
                'Family board dominance (3 of 4 directors from same family)',
                'Talent challenges (2.7 Glassdoor, 7% workforce reduction, 18% attrition)',
                'Below-market employee compensation creating retention risk'
            ],
            moderate_gaps: [
                'Limited innovation pipeline visibility (no patent disclosure)',
                'Basic Industry 4.0 adoption',
                'Weak digital marketing and thought leadership',
                'Scale disadvantage vs larger competitors (₹158 Cr vs ₹650-1,470 Cr)',
                'Private company constraints limiting growth capital access',
                'Single independent director (limited governance oversight)'
            ],
            key_strengths: [
                '11 consecutive years UTC/Collins Aerospace Gold Supplier',
                'ISRO GOCO contract holder (strategic partnership)',
                'Indian Offset Partner status',
                '37 years operational history (since 1988)',
                '36% revenue growth in FY2025',
                '95%+ addressable market untapped',
                'Strategic positioning in high-growth sector (aerospace/defense)',
                'Zero-defect quality track record',
                'Established relationships with major global OEMs'
            ],

            // Recommendations
            immediate_actions: [
                'Address working capital stress - reduce NWC/OI from 63% to <50%',
                'Document formal succession plan with clear timeline',
                { title: 'Launch employee retention program', impact: 'high', timeframe: '3-6 months', category: 'Talent', associated_program_id: 'build-4-x-2026' },
                'Diversify customer base - reduce top 5 concentration from 52%',
                'Apply for PLI scheme funding to access growth capital',
                'Hire CFO-level finance leadership (currently GM-level)'
            ],
            short_term_recommendations: [
                'Achieve positive operating cash flow (currently negative 3 years)',
                'Add 2-3 independent directors to board for governance',
                'Improve employee compensation to market rates (currently 15-20% below)',
                'Enhance digital marketing and establish thought leadership',
                { title: 'Expand MRO services via Hical-NSE JV', impact: 'medium', timeframe: '6-12 months', category: 'Expansion', associated_program_id: 'make-4-x-aero' },
                'Build innovation pipeline visibility (patents, R&D disclosure)'
            ],
            medium_term_recommendations: [
                'Scale to ₹500-750 Cr revenue within 5 years',
                'Develop proprietary IP portfolio (patents in actuators/solenoids)',
                'Upgrade Industry 4.0 capabilities (automation, digital manufacturing)',
                'Consider strategic investor for growth capital and governance',
                'Expand defense sector penetration (Tejas Mk2, other HAL programs)',
                'Establish second manufacturing facility or expand capacity',
                'Build stronger employer brand to reduce attrition'
            ],

            // Investment Metrics
            time_to_opportunity_months: 24,
            probability_of_success_percentage: 68.0,
            investment_readiness: 'Medium - Requires digital core stabilization',
        },

        // 18-Month Deployment Blueprint
        roadmap: {
            executive_summary: "Transforming Hical from a precision component supplier to an AI-integrated aerospace subsystem leader through digital core automation and regional cluster synergy.",
            phases: [
                {
                    title: "PHASE 1: DIGITAL CORE & ERP",
                    description: "Months 1-6: Focus on data integrity and production visibility.",
                    initiatives: [
                        { name: "ERP-Linked Financial Forecasting", description: "Reducing NWC dependency and improving cash flow visibility.", program_id: 'build-4-x-2026' },
                        { name: "Real-time Production Tracking", description: "Digitizing the solenoid winding shop floor." }
                    ]
                },
                {
                    title: "PHASE 2: INDUSTRIAL AUTOMATION",
                    description: "Months 7-12: Scaling precision manufacturing capabilities.",
                    initiatives: [
                        { name: "AI-Driven Solenoid Winding", description: "Implementing automated thermal uniformity loops.", program_id: 'make-4-x-aero' },
                        { name: "Regional MRO Alliance", description: "Onboarding onto the Mangaluru aerospace cluster finishing line." }
                    ]
                },
                {
                    title: "PHASE 3: DEEP TECH & IP SCALE",
                    description: "Months 13-18: Developing proprietary subsystems.",
                    initiatives: [
                        { name: "Self-Diagnostic Actuators", description: "IP development for next-gen defense systems.", program_id: 'catalyst-2025' },
                        { name: "Strategic Investor Onboarding", description: "Pre-IPO governance and capital expansion." }
                    ]
                }
            ]
        },
        problem_statements: [
            {
                id: 'prob-hical-001',
                title: 'High-Precision Automated Solenoid Winding',
                description: 'Developing AI-driven precision winding for electromagnetic solenoids to ensure uniform heat dissipation in compact actuator housing.',
                tags: ['Electromagnetics', 'AI', 'Automation'],
                status: 'published',
                category: 'Manufacturing Precision',
                complexity: 'high'
            },
            {
                id: 'prob-hical-002',
                title: 'Working Capital Flow Optimization',
                description: 'Seeking a digital ERP-linked financial forecasting model to reduce NWC dependency while maintaining 36% YoY growth.',
                tags: ['Finance', 'ERP', 'Analytics'],
                status: 'preview',
                category: 'Operational Excellence',
                complexity: 'medium'
            }
        ],
        recommended_strategic_actions: [
            {
                id: 'strat-hical-001',
                title: 'Industry 4.0 Digital Core Integration',
                description: 'Automating the solenoid winding and testing lines with real-time quality feedback loops.',
                impact: 'high',
                timeframe: '6-12 months',
                category: 'Technology',
                associated_program_id: 'make-4-x-aero'
            },
            {
                id: 'strat-hical-002',
                title: 'Regional MRO Cluster Alliance',
                description: 'Leveraging the Mangaluru aerospace hub for specialized finishing and thermal treatment services.',
                impact: 'medium',
                timeframe: '12-18 months',
                category: 'Supply Chain',
                associated_program_id: 'build-4-x-2026'
            },
            {
                id: 'strat-hical-003',
                title: 'Custom Software & ERP Modernization',
                description: 'Build out custom software for production tracking and inventory management to bridge the digital gap.',
                impact: 'high',
                timeframe: '6-9 months',
                category: 'Digital',
                associated_program_id: 'pre-incubation-exo'
            }
        ],
        regional_context: {
            region_name: 'Dakshina Kannada / Mangaluru',
            hub_type: 'Aerospace & Precision Manufacturing',
            correlation_score: 0.92,
            economic_indicators: {
                "Regional GDP Contribution": "5.7% of State",
                "MSME Density": "High (18k+ registered)",
                "Export Port Proximity": "NMP (46 MMT)"
            },
            sector_synergies: ['Advanced Materials', 'Specialized Finishing', 'Logistics']
        }
    },
    // COMPANY: KARNATAKA BANK LTD
    {
        id: 'kbl-mangalore',
        name: 'Karnataka Bank',
        legal_name: 'The Karnataka Bank Limited',
        cin: 'L85110KA1924PLC001128',
        company_status: 'Active',
        registration_date: '1924-02-18',
        founded_year: 1924,
        headquarters_city: 'Mangaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: 'Mahaveer Circle, Kankanady, Mangaluru 575 002, Karnataka',
        sector: 'bfsi',
        sub_sector: 'Private Sector Bank',
        website: 'https://karnatakabank.com',
        employee_count: 8500,
        company_type: 'Public Limited Company',
        listing_status: 'Listed',
        stock_codes: { "NSE": "KTKBANK", "BSE": "532652" },
        market_cap: 8500.0, // Approx
        stage: 'mature',
        current_stage: 6,
        rag_status: 'green',
        overall_score: 82,
        latest_revenue: 10000.0, // Estimated aggregate
        latest_net_profit: 1155.0, // ₹1,155 Cr
        revenue_growth_yoy: 7.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',
        notes: "Dakshina Kannada's premier private bank. 101-year legacy. Currently undergoing 'KBL VIKAAS 3.0' digital transformation.",
        financials: [
            {
                fiscal_year: 'FY2024-25',
                revenue: 10000.0,
                net_profit: 1155.0,
                net_margin_percentage: 11.55,
                revenue_growth_yoy: 7.0,
                segment_breakdown: { "Retail": 45, "Agri": 20, "MSME": 25, "Corporate": 10 },
                data_source: 'Quarterly Disclosures, Annual Report',
                confidence: 'HIGH'
            }
        ],
        leadership: [
            { name: 'Raghavendra Srinivas Bhat', role: 'Interim Managing Director & CEO' },
            { name: 'Venkat Krishnan V', role: 'CIO & CTO' },
            { name: 'Pankaj Gupta', role: 'Chief Digital Officer' }
        ],
        gap_analysis: {
            overall_gap_score: 82,
            investment_readiness: 'Ready',
            market_saturation_score: 88,
            market_saturation_diagnosis: "Dominant historical incumbent in the Cradle of Indian Banking.",
            market_saturation_assessment: "KBL is the only surviving independent commercial entity in Dakshina Kannada, holding a century of generational trust. However, intense competition from digital-first private banks is compressing Net Interest Margins (NIM) to 3.3%.",
            market_saturation_evidence: "101-year independent operating history; 12.2% surge in operating expenses vs peers.",
            founder_quality_score: 95,
            founder_quality_assessment: "Institutional heritage founded in 1924; transitions to professional management with KBL VIKAAS 2.0/3.0 show high organizational adaptability.",
            founder_quality_green_flags: ['100+ year legacy', 'Successful CEO transitions', 'KBL VIKAAS 3.0 digital maturity'],
            innovation_differentiator_score: 85,
            innovation_assessment: "Advanced IBM Cloud Pak API Infrastructure and API-gateway ready for ecosystem lending. Digital adoption is balanced with legacy trust.",
            innovation_gaps: ['Protracted procurement cycles', 'Back-office manual silos'],
            market_opportunity_score: 92,
            market_opportunity_assessment: "$1.3T digital lending runway in India; India's #5 GDP ranking vs BFSI global ranking gap creates massive expansion potential.",
            leadership_quality_score: 88,
            leadership_quality_assessment: "Strong professional cadre; Chief Digital Officer (Pankaj Gupta) and CIO (Venkat Krishnan) are driving infrastructure modernization.",
            leadership_gaps: ['Agility in vendor management'],
            critical_gaps: [
                '12.2% surge in operating expenses',
                'Compressing Net Interest Margin (3.3%)',
                'Protracted procurement cycles'
            ],
            key_strengths: [
                '101-year generational trust',
                'Advanced IBM Cloud Pak API Infrastructure',
                'High CRAR (19.9%)'
            ],
            immediate_actions: [
                {
                    id: 'kbl-001',
                    title: 'Deploy RPA for Back-office',
                    description: 'Automate manual trade finance and reconciliation silos to curb the 12.2% op-ex surge.',
                    impact: 'high',
                    timeframe: '0-3 Months',
                    category: 'Technology'
                },
                {
                    id: 'kbl-002',
                    title: 'ML-based MSME Underwriting',
                    description: 'Leverage Account Aggregator rails for flow-based lending into MSME clusters.',
                    impact: 'high',
                    timeframe: '3-6 Months',
                    category: 'Product'
                }
            ],
            short_term_recommendations: [
                { id: 'kbl-r1', title: 'FinTech Sandbox', description: 'Establish a FinTech regulatory sandbox in Mangaluru HQ.', impact: 'medium', timeframe: '6-12 Months', category: 'Policy' }
            ],
            medium_term_recommendations: [
                { id: 'kbl-r2', title: 'MSME SaaS Pivot', description: 'Pivot to a SaaS-based banking model for MSME partners.', impact: 'high', timeframe: '12-24 Months', category: 'Business Model' }
            ],
            time_to_opportunity_months: 6,
            probability_of_success_percentage: 85
        },
        roadmap: {
            executive_summary: "Accelerate KBL VIKAAS 3.0 via AI-driven operational efficiency and digital lending transformation.",
            phases: [
                {
                    title: "Phase 1: Operational Efficiency",
                    description: "Targeting the 12.2% op-ex surge via backend automation.",
                    initiatives: [
                        { name: "RPA for Trade Finance", description: "Automate document verification and data entry." },
                        { name: "Conversational AI", description: "Advanced NLPbots for routine retail inquiries." }
                    ]
                },
                {
                    title: "Phase 2: Digital Lending",
                    description: "Expanding the MSME and Retail loan books.",
                    initiatives: [
                        { name: "ML Credit Scoring", description: "API-integrated models for GST/Cash-flow analysis." }
                    ]
                }
            ]
        },
        regional_context: {
            region_name: "Dakshina Kannada (Cradle of Indian Banking)",
            hub_type: "Financial Services & IT Hub",
            correlation_score: 95,
            economic_indicators: {
                "District GDP Contribution": "7.8% of Karnataka",
                "Literacy Rate": "88.57%",
                "Bank Density": "Highest in India (1 branch per 3,500 people)",
                "Digital Payment Penetration": "82%"
            },
            sector_synergies: ["Education", "Healthcare", "Port Logistics", "MSME Clusters"]
        }
    },
    // COMPANY: SCDCC BANK
    {
        id: 'scdcc-mangalore',
        name: 'SCDCC Bank',
        legal_name: 'South Canara District Central Co-operative Bank Ltd',
        company_status: 'Active',
        founded_year: 1912,
        headquarters_city: 'Mangaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: 'K S Rao Road, Mangaluru, Dakshina Kannada',
        sector: 'bfsi',
        sub_sector: 'Cooperative Bank',
        employee_count: 1200,
        company_type: 'Cooperative Society',
        listing_status: 'Unlisted',
        stage: 'mature',
        current_stage: 5,
        rag_status: 'green',
        overall_score: 85,
        latest_net_profit: 110.41, // ₹110.41 Cr
        revenue_growth_yoy: 39.59,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',
        notes: "Arterial financial network for rural Dakshina Kannada. 30-year record of 100% agri-loan recovery.",
        financials: [
            {
                fiscal_year: 'FY2024-25',
                revenue: 0,
                net_profit: 110.41,
                revenue_growth_yoy: 39.59,
                data_source: 'Annual Performance Review',
                confidence: 'HIGH'
            }
        ],
        leadership: [
            { name: 'M. N. Rajendra Kumar', role: 'Chairman' },
            { name: 'K. Gopalakrishna Bhat', role: 'CEO' }
        ],
        gap_analysis: {
            overall_gap_score: 85,
            investment_readiness: 'High',
            market_saturation_score: 95,
            market_saturation_diagnosis: "Arterial rural network for Dakshina Kannada and Udupi.",
            market_saturation_assessment: "Unparalleled rural penetration with a flawless 100% agri-loan recovery rate. Dominates the primary agricultural credit society (PACS) ecosystem.",
            market_saturation_evidence: "30-year record of zero agri-loan defaults; ₹12,764 Cr working capital.",
            founder_quality_score: 92,
            founder_quality_assessment: "M. N. Rajendra Kumar's chairmanship has stabilized the institution as a rural power center for decades.",
            founder_quality_green_flags: ['Flawless credit discipline', 'Massive SHG network (34,600 units)', 'Strong financial liquidity'],
            innovation_differentiator_score: 45,
            innovation_assessment: "Legacy-heavy manual coordination for SHGs and rural credit. Massive potential for vernacular AI and digitizing recovery logs.",
            innovation_gaps: ['Absence of intelligent automation', 'Paper-heavy transaction logs'],
            market_opportunity_score: 88,
            market_opportunity_assessment: "Expanding into Agri-EWS and micro-SME digital lending using its deep rural trust to compete with new-age FinTechs.",
            leadership_quality_score: 85,
            leadership_quality_assessment: "Stable cooperative leadership; strong focus on grassroots welfare and credit discipline.",
            leadership_gaps: ['Technological vision at middle-management'],
            critical_gaps: [
                'Absence of intelligent automation',
                'Massive manual effort for 34,600 SHGs',
                'Regulatory pressure for rapid digitization'
            ],
            key_strengths: [
                'Unrivaled rural penetration',
                'Flawless 100% agri-recovery rate',
                'Strong financial liquidity (₹12,764 Cr working capital)'
            ],
            immediate_actions: [
                {
                    id: 'scdcc-001',
                    title: 'ML Early Warning Systems (EWS)',
                    description: 'Deploy satellite and meteorological data integrated ML for predicting agri-loan stress.',
                    impact: 'high',
                    timeframe: '0-6 Months',
                    category: 'Technology'
                },
                {
                    id: 'scdcc-002',
                    title: 'Vernacular AI for SHGs',
                    description: 'Deploy Kannada/Tulu voicebots for automated coordination and collection tracking.',
                    impact: 'high',
                    timeframe: '3-9 Months',
                    category: 'Product'
                }
            ],
            short_term_recommendations: [
                { id: 'scdcc-r1', title: 'PACS Digitization', description: 'Leveraging NABARD funds for end-to-end digital transformation of PACS.', impact: 'high', timeframe: '6-12 Months', category: 'Infrastructure' }
            ],
            medium_term_recommendations: [
                { id: 'scdcc-r2', title: 'Rural Micro-SME Hubs', description: 'Establish regional processing centers for rural MSME value-chain finance.', impact: 'medium', timeframe: '12-24 Months', category: 'Business Model' }
            ],
            time_to_opportunity_months: 9,
            probability_of_success_percentage: 90
        },
        roadmap: {
            executive_summary: "Leveraging NABARD funds to transform rural credit from transactional to intelligent.",
            phases: [
                {
                    title: "Phase 1: Risk Digitization",
                    description: "Digitizing the core competency of loan recovery.",
                    initiatives: [
                        { name: "Agri-EWS", description: "Satellite and meteorological data for default prediction." }
                    ]
                },
                {
                    title: "Phase 2: Digital Inclusion",
                    description: "Automating interactions for the massive SHG network.",
                    initiatives: [
                        { name: "Kannada/Tulu Voicebots", description: "WhatsApp-integrated AI for routine SHG inquiries." }
                    ]
                }
            ]
        },
        regional_context: {
            region_name: "Dakshina Kannada (Rural Heartland)",
            hub_type: "Agricultural & Cooperative Hub",
            correlation_score: 92,
            economic_indicators: {
                "Rural Literacy": "84%",
                "Agri-Loan Recovery": "100%",
                "Cooperative Penetration": "98% of households"
            },
            sector_synergies: ["Agriculture", " डेयरी (Dairy)", "Fisheries", "Tribal Welfare"]
        }
    },
    // COMPANY: MCC BANK
    {
        id: 'mcc-mangalore',
        name: 'MCC Bank',
        legal_name: 'Mangalore Catholic Cooperative Bank Ltd',
        company_status: 'Active',
        founded_year: 1912,
        headquarters_city: 'Mangaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: '14-6-685, 686, MCC Bank Building, St. Aloysius College Road, Hampankatta, Mangaluru 575001',
        sector: 'bfsi',
        sub_sector: 'Urban Cooperative Bank',
        employee_count: 250,
        company_type: 'Multi-State Urban Cooperative Bank',
        listing_status: 'Unlisted',
        stage: 'growth',
        current_stage: 5,
        rag_status: 'amber',
        overall_score: 72,
        latest_net_profit: 7.26, // ₹7.26 Cr
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'MEDIUM-HIGH',
        notes: "Nimble urban cooperative bank serving MSMEs and traders. High capital adequacy (23.06%).",
        leadership: [
            { name: 'Anil Lobo', role: 'Chairman' },
            { name: 'Sunil Menezes', role: 'General Manager' }
        ],
        gap_analysis: {
            overall_gap_score: 72,
            investment_readiness: 'Moderate (Budget Constrained)',
            market_saturation_score: 65,
            market_saturation_diagnosis: "Urban cooperative focusing on Mangaluru traders.",
            market_saturation_assessment: "Face competition from urban private banks. Deeply trusted by the Christian community and local trade clusters but limited in geographic expansion.",
            market_saturation_evidence: "High capital adequacy (23.06%) vs moderate market share growth.",
            founder_quality_score: 80,
            founder_quality_assessment: "Anil Lobo (Chairman) has steered the bank toward a more tech-ready posture, but budget constraints limit large-scale transformation.",
            founder_quality_green_flags: ['High capital adequacy', 'Agile, flat decision structure', 'Strong community trust'],
            innovation_differentiator_score: 50,
            innovation_assessment: "Fragmented legacy software; recently upgraded core banking but lacks AI-integrated middleware.",
            innovation_gaps: ['Manual data entry errors', 'Slow MSME loan TAT'],
            market_opportunity_score: 75,
            market_opportunity_assessment: "Can capture the 'last-mile' MSME market in Mangaluru by offering faster TAT through boutique automation.",
            leadership_quality_score: 78,
            leadership_quality_assessment: "Pragmatic and risk-averse; focus on security and community-led growth.",
            leadership_gaps: ['Technical expertise at GM level'],
            critical_gaps: [
                'Systemic manual data entry errors',
                'Fragmented legacy software',
                'Slow MSME loan TAT'
            ],
            key_strengths: [
                'Agile, flat organization',
                'High Trust in Urban MSME segment',
                'Secure CRAR (23.06%)'
            ],
            immediate_actions: [
                {
                    id: 'mcc-001',
                    title: 'RPA for Reconciliation',
                    description: 'Deploy lightweight RPA scripts for inter-branch and clearing house settlement.',
                    impact: 'medium',
                    timeframe: '0-3 Months',
                    category: 'Technology'
                },
                {
                    id: 'mcc-002',
                    title: 'Document AI for KYC',
                    description: 'Implement automated parsing of trade licenses and GST certificates for faster onboarding.',
                    impact: 'high',
                    timeframe: '3-6 Months',
                    category: 'Product'
                }
            ],
            short_term_recommendations: [
                { id: 'mcc-r1', title: 'Lean CRM Deployment', description: 'Consolidate MSME customer data into a single intelligent frontend.', impact: 'medium', timeframe: '6-12 Months', category: 'Customer Care' }
            ],
            medium_term_recommendations: [
                { id: 'mcc-r2', title: 'Open Banking APIs', description: 'Enable third-party FinTech integrations for loan lead generation.', impact: 'medium', timeframe: '12-24 Months', category: 'Technology' }
            ],
            time_to_opportunity_months: 4,
            probability_of_success_percentage: 75
        },
        roadmap: {
            executive_summary: "Fast-tracking urban MSME banking through frictionless automation.",
            phases: [
                {
                    title: "Phase 1: Operational Integrity",
                    description: "Reducing staff errors via targeted RPA.",
                    initiatives: [
                        { name: "Automated Reconciliation", description: "RPA for cross-ledger balancing." }
                    ]
                },
                {
                    title: "Phase 2: MSME Growth",
                    description: "Competing with private banks on loan turnaround time.",
                    initiatives: [
                        { name: "AI Loan Origination", description: "Parsing GST/Financials for instant risk profiles." }
                    ]
                }
            ]
        },
        regional_context: {
            region_name: "Mangaluru (Urban Trade Cluster)",
            hub_type: "Commercial & MSME Hub",
            correlation_score: 85,
            economic_indicators: {
                "Urbanization Rate": "72%",
                "Trade Activity Index": "High",
                "MSME Credit Gap": "₹250 Cr (Estimated)"
            },
            sector_synergies: ["Retail Trade", "Real Estate", "Hospitality", "Education"]
        }
    },
    // COMPANY: ASHTA TECH AUTOMATION
    {
        id: 'ata-nagpur-001',
        name: 'Ashta Tech Automation',
        legal_name: 'Ashta Tech Automation Private Limited',
        cin: 'U74999PN2016PTC164888',
        company_status: 'Active',
        registration_date: '2016-06-08',
        registered_office_address: 'FL NO 3J-31, SNO 109/110, Aditya Garden City PH3/4, Pune 411058',
        corporate_office_address: 'A12, Hingna-Wadi Road, Hingna MIDC, Nagpur 440016',
        website: 'https://www.ashtatech.com',
        founded_year: 2016,
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        authorized_capital: 0.50,
        paid_up_capital: 0.25,
        sector: 'light-engineering-cnc',
        sub_sector: 'Industrial Robotics & SPM',
        stage: 'growth',
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 68,
        latest_revenue: 5.27,
        revenue_growth_yoy: 205.0,
        created_at: '2026-04-06',
        updated_at: new Date().toISOString(),
        data_confidence: 'medium',

        financials: [
            {
                fiscal_year: 'FY2023-24',
                revenue: 5.27,
                revenue_growth_yoy: 205.0,
                ebitda: 1.15,
                ebitda_margin_percentage: 21.8,
                net_profit: 0.63,
                net_margin_percentage: 12.0,
                segment_breakdown: {
                    "Industrial Robotics": 45,
                    "Special Purpose Machines (SPM)": 30,
                    "Defense & Marine Robotics": 15,
                    "Food Automation": 10
                }
            },
            {
                fiscal_year: 'FY2022-23',
                revenue: 1.72,
                revenue_growth_yoy: 154.0,
                ebitda: 0.31,
                net_profit: 0.14
            }
        ],

        founders: [
            {
                name: 'Harshad Mukund Wasule',
                current_role: 'Technical Director',
                is_promoter: true,
                education: 'Mechanical/Automation Engineering, Karamvir Dadasaheb Kannamwar Engineering College, Nagpur',
                background: 'PLC Integration, AI/Vision Systems, Industrial Robotics, KUKA Systems, FastAPI-to-PLC',
                linkedin_url: 'https://www.linkedin.com/in/harshad-wasule/'
            },
            {
                name: 'Rohit Narendra Shende',
                current_role: 'CEO & Co-Founder',
                is_promoter: true,
                linkedin_url: 'https://www.linkedin.com/in/rohit-shende-88331266/',
                background: 'Business Development, MSME Robotics, Strategic Partnerships'
            },
            {
                name: 'Akshay P.',
                current_role: 'Co-Founder, Robotics & Defense',
                is_promoter: true,
                linkedin_url: 'https://www.linkedin.com/in/akshay-p-4126b633/',
                background: 'Underwater Drones, Defense Systems, Marine Robotics, EU Partnerships'
            }
        ],

        leadership: [
            { name: 'Er. Vijay Taiwade', role: 'Head of Research & Development' },
            { name: 'Shashank Dharme', role: 'Project Manager' },
            { name: 'Tejas Amdare', role: 'Machine Learning Engineer' },
            { name: 'Nikita Kurhade', role: 'HR Manager' }
        ],

        board: {
            total_board_members: 3,
            executive_directors: 3,
            independent_directors: 0,
            succession_plan_exists: false,
            succession_plan_details: 'No formal succession plan documented for the three co-founders.',
            governance_score: 58
        },

        talent: {
            total_employees: 35,
            critical_skills_missing: ['Senior automation engineers', 'AI/ML specialists', 'Sales engineering']
        },

        products: [
            { product_name: 'BR-Prima', category: 'Indigenious Robotic Arm', description: '6-Axis Articulated Robotic Arm with AI Vision' },
            { product_name: 'ARA X5', category: 'MSME Robotics', description: 'Affordable 5kg Payload Robotic Arm for small units' },
            { product_name: 'Jalayantrika', category: 'Marine Robotics', description: 'Underwater Drone for inspection and defense' },
            { product_name: 'Kaju Katli Cutter', category: 'Food Automation', description: 'Vision-guided ultrasonic food cutting system' }
        ],

        clients: [
            { client_name: "Haldiram's", client_sector: 'Food Processing', client_type: 'Enterprise', is_top_3_client: true },
            { client_name: 'Hindustan Unilever (HUL)', client_sector: 'FMCG', client_type: 'Enterprise' }
        ],

        client_demographics: {
            concentration_risk: 'medium',
            domestic_india_percentage: 100
        },

        gap_analysis: {
            overall_gap_score: 68,
            investment_readiness: 'Caution',
            market_saturation_score: 45,
            market_saturation_assessment: 'Very low penetration in massive TAM. India robot density 7 per 10,000 workers vs 100+ global.',
            founder_quality_score: 75,
            founder_quality_assessment: 'Strong technical DNA (Mechanical/Automation backgrounds) with successful Nagpur-based scale-up execution.',
            business_maturity_score: 62,
            business_maturity_assessment: '9 years history with blue-chip clients, but lacks formal ISO/standard certifications.',
            market_opportunity_score: 92,
            market_opportunity_assessment: 'Nagpur #1 Tier-II city. ₹95K Cr Vidarbha investment boom.',
            critical_gaps: [
                'No ISO 9001/14001 certifications verified',
                'No documented succession plan',
                'CFO and COO roles vacant'
            ],
            key_strengths: [
                'Indigenous robotic arm manufacturer (BR-Prima)',
                '205% YoY revenue growth (FY24)',
                '271% EBITDA growth (verified)',
                'Tier-1 client portfolio (Haldiram, HUL)',
                'Active indigenization of defense/marine robotics'
            ],
            mosi_dimensions: {
                founder_quality: { score: 75, rag: 'green', rationale: 'Strong technical DNA (Mechanical/Automation backgrounds) with successful Nagpur-based scale-up execution.' },
                leadership_quality: { score: 58, rag: 'amber', rationale: 'Technical depth is high, but lacks senior operations/finance leadership (vacant CFO/COO).' },
                business_maturity: { score: 62, rag: 'amber', rationale: '9 years history with blue-chip clients, but lacks formal ISO/standard certifications.' },
                innovation: { score: 88, rag: 'green', rationale: 'High R&D intensity (15%). Indigenous 6-axis arm is a massive differentiator.' },
                brand_identity: { score: 45, rag: 'amber', rationale: 'Known in niche Nagpur manufacturing circles but lacks national/global brand presence.' }
            }
        },

        challenges: [
            { id: 'ch-oee', title: 'Real-Time OEE Monitoring', description: 'Deploy IoT network for live OEE tracking', status: 'published', category: 'Operations', tags: [] },
            { id: 'ch-ai-sched', title: 'AI Production Scheduling', description: 'ML-based order sequence optimization', status: 'published', category: 'Engineering', tags: [] },
            {
                id: 'challenge-nag-001',
                title: 'Nagpur NEXT Innovation Challenge',
                description: 'Participating in the regional MSME innovation challenge for Industrial Robotics optimization.',
                status: 'published',
                category: 'Digital Transformation',
                tags: ['Robotics', 'Automation'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],

        regional_context: {
            region_name: 'Vidarbha Industrial Corridor',
            hub_type: 'Manufacturing Automation & Robotics',
            correlation_score: 0.88,
            economic_indicators: {
                "Investment Committed": "₹1.5+ Lakh Cr",
                "Regional CNC Adoption": "Low (<100 shops)",
                "Automation Target": "High (2028 Mahindra Hub)"
            },
            sector_synergies: ['Aerospace', 'Auto Components', 'Food Processing'],
            ecosystem_peers: [
                { name: 'Altizon Systems (Pune)', role: 'IIoT Platform Partner', alignment: 'High' },
                { name: 'Hiotron (Pune)', role: 'Smart Factory Tech', alignment: 'High' },
                { name: 'Infinite Uptime (Pune)', role: 'Predictive Maintenance', alignment: 'High' }
            ]
        },

        oee_improvement_roadmap: {
            current_estimated_oee: 58,
            target_oee: 84,
            phases: [
                {
                    phase: 1,
                    name: "Data Hygiene & Vision Triage",
                    duration_months: "3-4",
                    target_oee: 65,
                    investment_inr_lakhs: 15,
                    activities: ["Retrofit IoT sensors on manual lines", "Deploy vision-based count verification"]
                },
                {
                    phase: 2,
                    name: "Robotic Cell Integration",
                    duration_months: "6-8",
                    target_oee: 75,
                    investment_inr_lakhs: 45,
                    activities: ["Deploy BR-Prima units for high-risk welding", "Real-time OEE dashboarding"]
                },
                {
                    phase: 3,
                    name: "AI-Optimized Multi-shift Sync",
                    duration_months: "12",
                    target_oee: 84,
                    investment_inr_lakhs: 25,
                    activities: ["Predictive maintenance on SPM units", "Autonomous shift handovers"]
                }
            ],
            expected_benefits: {
                cost_savings_percent: 22,
                downtime_reduction_percent: 40,
                quality_improvement_percent: 18,
                changeover_reduction_percent: 30
            }
        },

        boppl_engagement_angles: {
            primary_opportunity: 'AI-powered workflow optimization for multi-sector custom manufacturer',
            entry_wedge: 'OEE monitoring and real-time dashboards',
            expansion_opportunities: ['AI Production Scheduling', 'Predictive Maintenance'],
            strategic_value: ['Demo site for robotics-led optimization', 'Co-sell opportunity with BOPPL'],
            pricing_sensitivity: { level: 'high', rationale: 'Bootstrapped, modest SBI bank lines', recommendation: 'Emphasize ROI and phased implementation' }
        }
    },
    // COMPANY: BETA COMPUTRONICS
    {
        id: 'beta-computronics-001',
        name: 'Beta Computronics Pvt. Ltd.',
        legal_name: 'Beta Computronics Private Limited',
        sector: 'electronics-electrical',
        sub_sector: 'Industrial IoT & Touch Terminals',
        stage: 'mature',
        founded_year: 1988,
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        current_stage: 5,
        rag_status: 'green',
        overall_score: 75,
        latest_revenue: 8.50,
        revenue_growth_yoy: 15.0,
        
        cin: 'U32109MH1999PTC122162',
        gstin: '27AABCB2022R1ZN',
        company_status: 'Active',
        registration_date: '1999-12-12',
        registered_office_address: '10/1, IT Park, Parsodi, South Ambazari Road, Nagpur, Maharashtra - 440022',
        authorized_capital: 0.25,
        paid_up_capital: 0.054,
        promoter_holding_percentage: 100,
        
        financials: [
            { fiscal_year: 'FY2024-25', revenue: 8.50, net_profit: 0.65, revenue_growth_yoy: 15.0 },
            { fiscal_year: 'FY2023-24', revenue: 2.15, net_profit: 0.18, revenue_growth_yoy: 2.38 },
            { fiscal_year: 'FY2022-23', revenue: 2.10, net_profit: 0.15, revenue_growth_yoy: -6.67 }
        ],

        founders: [
            {
                name: 'Mukund Shankarrao Deshmukh',
                age: 70,
                current_role: 'Founder & Technical Director',
                education: 'B.E. Electrical Engineering, COEP Pune (1978)',
                background: '38 years experience across MSEB and industrial electronics design.',
                is_promoter: true,
                equity_stake: 50
            },
            {
                name: 'Sandeep Vasantrao Darwhekar',
                age: 58,
                current_role: 'Director',
                education: 'B.E. Electronics Engineering, YCCE Nagpur (1989)',
                background: '35 years experience in steel plant automation and control systems.',
                is_promoter: true,
                equity_stake: 50,
                linkedin_url: 'https://www.linkedin.com/in/sandeep-darwhekar-132a7632/'
            }
        ],

        board: {
            total_board_members: 6,
            executive_directors: 6,
            independent_directors: 0,
            succession_plan_exists: false,
            succession_plan_details: 'Senior founder age ~70 with no documented succession plan. 100% family-controlled board.',
            governance_score: 45
        },

        products: [
            { product_name: 'Circular Loom PLC Cards', category: 'Woven Sack Automation', description: 'Embedded control systems for high-speed circular looms.' },
            { product_name: 'Ozone Generator Controllers', category: 'Water Treatment', description: 'Power electronics for large-scale ozone generation.' },
            { product_name: 'ABRAR Audio Reader', category: 'Social Innovation', description: 'Assistive tech for visually impaired students.' }
        ],

        innovation: {
            patents_filed: 0,
            rd_investment_percentage: 12,
            industry_4_adoption: 'basic'
        },

        gap_analysis: {
            overall_gap_score: 75,
            investment_readiness: 'High',
            critical_gaps: [
                'Legacy hardware architecture needs ARM transition',
                'Lack of integrated Cloud/SaaS portal for IoT data',
                'No succession plan for senior founder (age 70)',
                'Zero independent directors on board'
            ],
            key_strengths: [
                '27-year stable partnership',
                'Extreme technical depth in embedded PLC design',
                'Niche market leadership in circular loom electronics',
                'Pioneer in indigenous industrial computing in India'
            ],
            mosi_dimensions: {
                founder_quality: { score: 72, rag: 'amber', rationale: 'Strong technical DNA. IIM Nagpur recognition validates standing.', succession_risk: 'high' },
                leadership_quality: { score: 45, rag: 'red', rationale: '100% family board with zero independent directors.' },
                business_maturity: { score: 55, rag: 'amber', rationale: '26 years history but lacks standard quality certifications.' },
                innovation: { score: 80, rag: 'green', rationale: 'Proven embedded design breadth for specialized industrial apps.' },
                brand_identity: { score: 30, rag: 'red', rationale: 'Severely outdated digital presence and marketing infrastructure.' }
            }
        },

        benchmark_msme: {
            name: "ABB (Switzerland/Global)",
            description: "Global technology leader that is driving the digital transformation of industries through automated robotics and power systems.",
            location: "Zurich, Switzerland",
            revenue: "$32B",
            key_strengths: ["Tension Control Automation", "IIoT Smart Transformers", "Digital Twin Asset Mgmt", "Global Service Mesh"],
            gap_comparison: [
                { category: "Automation Level", current_score: 65, benchmark_score: 98, rationale: "Benchmark uses closed-loop servo tension vs human operator feel at Beta." },
                { category: "Cloud Intelligence", current_score: 30, benchmark_score: 90, rationale: "Benchmark has established ABB Ability™ cloud portal for all field assets." }
            ]
        },

        challenges: [
            {
                id: 'challenge-nag-003',
                title: 'Nagpur NEXT Innovation Challenge',
                description: 'Participating in the regional MSME innovation challenge for Industrial Electronics optimization.',
                status: 'published',
                category: 'Digital Transformation',
                tags: ['Electronics', 'Automation'],
                associated_program_id: 'nagpur-next-2026'
            },
            {
                id: 'challenge-nag-008',
                title: 'Automated Precision Winding System for Transformers',
                description: 'Smart winding with high-precision tension control.',
                status: 'published',
                category: 'Industrial Automation',
                tags: ['Automation', 'Electronics', 'Precision'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],

        boppl_engagement_angles: {
            primary_opportunity: "BOPPL-01: Modular IoT Gateway Retrofit",
            entry_wedge: "Digital diagnostic for existing loom installations",
            expansion_opportunities: ["Cloud-based remote loom telemetry", "Vision-integrated quality retrofits"],
            strategic_value: ["High domain expertise in woven sack physics", "Ready-to-scale embedded hardware stack"],
            pricing_sensitivity: { level: 'medium', rationale: 'Price competitive against Chinese imports', recommendation: 'Value-based pricing for "Made in India" technical support' }
        },

        regional_context: {
            region_name: 'Nagpur & Vidarbha',
            hub_type: 'Industrial Electronics Hub',
            correlation_score: 0.95,
            economic_indicators: {
                "IT Park Proximity": "Immediate",
                "Export Growth": "12% YoY"
            },
            sector_synergies: ["Embedded Systems", "Power Engineering", "IT Parks"],
            ecosystem_peers: [
                { name: "Hiotron (Pune)", role: "IoT Infrastructure Partner", alignment: "High" },
                { name: "Softlabs Group (Mumbai)", role: "AI/CV Partner", alignment: "Medium" },
                { name: "Smarter Homes", role: "Energy Monitoring Partner", alignment: "Medium" }
            ],
            stakeholders: [
                { name: "Hiotron", full: "Hiotron Pvt. Ltd.", type: "IoT Infrastructure Partner" },
                { name: "Smarter Homes", full: "Smarter Homes Technologies", type: "Energy Monitoring Partner" }
            ]
        }
    },

    // NAGPUR NEXT MSME 7: SANJAY PRECISION WORKS
    {
        id: 'company-sanjay-precision-007',
        name: 'Sanjay Precision Works',
        legal_name: 'Sanjay Precision Works',
        sector: 'aerospace-defense' as any,
        sub_sector: 'Metrology & Precision Components',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://sanjayprecision.com',
        company_type: 'Private Limited',
        stage: 'mature',
        founded_year: 1998,
        current_stage: 5,
        rag_status: 'green',
        overall_score: 72,
        latest_revenue: 3.39,
        revenue_growth_yoy: 8.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 3.39,
            revenue_growth_yoy: 8.0,
            ebitda: 0.45,
            net_profit: 0.27,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 70,
          investment_readiness: "Medium",
          critical_gaps: [
            "No digital caliper capability (using imported)",
            "Manual QC data entry and records"
          ],
          mosi_dimensions: {
            market_saturation: { score: 7, rag: "amber", rationale: "Established job shop. Market mature but stable." },
            innovation: { score: 5, rag: "amber", rationale: "Traditional job shop. No product development." }
          }
        },
        oee_improvement_roadmap: {
          current_estimated_oee: 60,
          target_oee: 85,
          phases: [
            {
              phase: 1,
              name: "Digital Measurement",
              duration_months: "3",
              target_oee: 70,
              investment_inr_lakhs: 3.5,
              activities: ["Pilot indigenous digital calipers", "Bluetooth data transfer"]
            }
          ],
          expected_benefits: {
            cost_savings_percent: 15,
            downtime_reduction_percent: 80,
            quality_improvement_percent: 40,
            changeover_reduction_percent: 10
          }
        },
        regional_context: {
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "High" },
            { name: "Hiotron (Pune)", role: "IIoT Partner", alignment: "High" },
            { name: "Aeron Systems (Pune)", role: "Navigation Partner", alignment: "High" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "High" }
          ],
          region_name: "Nagpur & Vidarbha",
          hub_type: "Manufacturing Hub",
          correlation_score: 0.80,
          economic_indicators: {
              "industrial_corridor_proximity": "High",
              "export_scale_potential": "High",
              "mihan_sez_proximity": "High",
              "logistics_cluster_density": "High"
          },
          sector_synergies: ["Automotive Ancillary", "Heavy Engineering", "Defence Ordnance"]
        },
        benchmark_msme: {
          name: "Mitutoyo Corporation (Japan)",
          description: "The gold standard in precision metrology and measurement automation for advanced manufacturing floor.",
          location: "Kawasaki, Japan",
          revenue: "¥100B+",
          key_strengths: ["Ultra-Precision Machining", "Digital Link Metrology", "Global Service Network", "Standardization Leader"],
          gap_comparison: [
            { category: "IIoT Connectivity", current_score: 50, benchmark_score: 95, rationale: "Benchmark instruments have native wireless data-mesh capability (U-Wave) vs manual entry at SPW." },
            { category: "Calibration Benchmarks", current_score: 70, benchmark_score: 99, rationale: "Benchmark is a primary lab for international standards traceability." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-007',
                title: 'Indigenous Digital Caliper with Smart Connectivity',
                description: 'High-precision smart metrology tool for Industry 4.0.',
                status: 'published',
                category: 'Precision Engineering',
                tags: ['Metrology', 'IoT', 'Manufacturing'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 9: BARON INTEGRATED SERVICES
    {
        id: 'company-baron-009',
        name: 'Baron Integrated Services',
        legal_name: 'Baron Integrated Services',
        sector: 'food-processing' as any,
        sub_sector: 'Heavy Equipment Logistics',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://baronlogistics.com',
        company_type: 'Private Limited',
        stage: 'growth',
        founded_year: 2012,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 68,
        latest_revenue: 12.40,
        revenue_growth_yoy: 22.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 12.40,
            revenue_growth_yoy: 22.0,
            ebitda: 1.80,
            net_profit: 0.72,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 65,
          investment_readiness: "Medium",
          critical_gaps: [
            "Manual fleet scheduling leads to 15% idling",
            "Lack of real-time fuel monitoring system"
          ],
          mosi_dimensions: {
            market_saturation: { score: 6, rag: "amber", rationale: "Compete with large national players but strong local relation." },
            innovation: { score: 4, rag: "red", rationale: "Traditional logistics operation. Low digital adoption." }
          }
        },
        regional_context: {
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "High" },
            { name: "Hiotron (Pune)", role: "IIoT Partner", alignment: "High" },
            { name: "Aeron Systems (Pune)", role: "Navigation Partner", alignment: "High" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "High" }
          ],
          region_name: "Nagpur & Vidarbha",
          hub_type: "Logistics Hub",
          correlation_score: 0.98,
          economic_indicators: {
              "industrial_corridor_proximity": "High",
              "export_scale_potential": "High",
              "mihan_sez_proximity": "High",
              "logistics_cluster_density": "High"
          },
          sector_synergies: ["Multi-modal International Cargo Hub (MIHAN)", "Coal Mining", "Power Sector"]
        },
        benchmark_msme: {
          name: "Jain Irrigation (India/Global)",
          description: "World's second largest micro-irrigation firm and a leader in high-fidelity agri-processing with digital yield controls.",
          location: "Jalgaon, Maharashtra",
          revenue: "₹6,000+ Cr",
          key_strengths: ["Agri-Yield ML", "IoT Dehydration Control", "Export Logistics Mastery", "Farmer Network Scaling"],
          gap_comparison: [
            { category: "Yield Optimization", current_score: 75, benchmark_score: 96, rationale: "Benchmark uses hyper-spectral imaging for onion moisture vs manual NIR at Baron." },
            { category: "Operational Scale", current_score: 60, benchmark_score: 98, rationale: "Benchmark processes thousands of tons daily with zero hand-offs." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-009',
                title: 'AI-Powered Yield Optimization for Food Dehydration',
                description: 'IoT and AI driven optimization for food processing.',
                status: 'published',
                category: 'AgriTech',
                tags: ['FoodTech', 'AI', 'IoT'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 10: TECHWALNUT INNOVATIONS
    {
        id: 'company-techwalnut-010',
        name: 'Techwalnut Innovations',
        legal_name: 'Techwalnut Innovations Private Limited',
        sector: 'it-ites' as any,
        sub_sector: 'AI-Vision Inspection',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://techwalnut.com',
        company_type: 'Private Limited Company',
        stage: 'early',
        founded_year: 2021,
        current_stage: 2,
        rag_status: 'amber',
        overall_score: 55,
        latest_revenue: 0.25,
        revenue_growth_yoy: 150.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 0.25,
            revenue_growth_yoy: 150.0,
            ebitda: 0.05,
            net_profit: 0.02,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 50,
          investment_readiness: "Medium",
          critical_gaps: [
            "Early stage product market fit",
            "Scaling constraints in engineering talent"
          ],
          mosi_dimensions: {
            market_saturation: { score: 9, rag: "green", rationale: "High demand for automated inspection." },
            innovation: { score: 8, rag: "green", rationale: "Proprietary AI vision algorithms." }
          }
        },
        benchmark_msme: {
          name: "Cognex Corporation (USA)",
          description: "The global leader in industrial machine vision sensors and software for automated manufacturing.",
          location: "Natick, MA",
          revenue: "$1B+",
          key_strengths: ["Machine Vision Patents", "Global Distribution", "Deep Learning Tools", "Surface Inspection Mastery"],
          gap_comparison: [
            { category: "Hardware Integration", current_score: 30, benchmark_score: 95, rationale: "Benchmark has custom-silicon vision sensors vs standard webcams/IP cams at Techwalnut." },
            { category: "Algorithm Maturity", current_score: 45, benchmark_score: 98, rationale: "Benchmark has decades of training data for diverse surface defect detection." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-010',
                title: 'AI-Driven UX Analytics for MSME Portals',
                description: 'Optimizing digital touchpoints for micro-enterprises using AI.',
                status: 'published',
                category: 'IT Services',
                tags: ['AI', 'UX', 'Analytics'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 11: NAVITAS (ZERO SYSTEMS) - High-Fidelity Hardened Profile
    {
        id: 'navitas-zero-systems',
        name: 'Navitas (Zero Systems)',
        legal_name: 'Zero Systems (Proprietorship); Navitas Led Lighting Private Limited',
        brand_name: 'NAVITAS',
        slug: 'navitas-zero-systems',
        sector: 'electronics-electrical' as any,
        sub_sector: 'LED Lighting & Portable Emergency Systems',
        industry_classification: 'Manufacture of electrical equipment n.e.c. (NIC 3190)',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        headquarters_address: 'Plot No. 17, Navnath Society, Maske Layout, Narendra Nagar, Chuna Bhati, Nagpur 440015',
        website: 'https://lightnavitas.com',
        company_type: 'Private Limited / Proprietorship',
        gstin: '27AFNPK2259K1Z0',
        cin: 'U31909MH2018PTC312960',
        nic_code: '3190',
        stage: 'mature',
        founded_year: 1980,
        current_stage: 5,
        rag_status: 'red',
        overall_score: 32,
        latest_revenue: 2.5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        warning: 'CRITICAL: SECTOR MISMATCH IDENTIFIED - VERIFIED LED MANUFACTURER',
        founders: [
            {
                name: "Rashmi Kulkarni",
                current_role: "Co-Founder / Managing Partner",
                education: "Ramdeobaba Kamla Nehru Engineering College, Nagpur",
                notable_achievements: ["MIDC Industries Association Excellence Award"]
            },
            {
                name: "Ashish Nikhare",
                current_role: "Owner / Proprietor (Zero Systems)",
                background: "Industrial mentor with long tenure in Nagpur electronics cluster"
            }
        ],
        leadership: [
            { name: "Suhas Avinash Kulkarni", role: "Director" },
            { name: "Kunal Dambhare", role: "Production Manager" },
            { name: "Bhagyashree Gajjalwar", role: "R&D Engineer" },
            { name: "Kamlesh Dhanvij", role: "Marketing Manager" }
        ],
        products: [
            { product_name: "ARJUN Series", category: "Emergency Lighting", description: "Portable high-intensity LED search lights for disaster management." },
            { product_name: "DIWA Series", category: "Emergency Lighting", description: "Inflatable LED emergency lighting systems for rapid deployment." },
            { product_name: "NAVMANYA", category: "Industrial Lighting", description: "High-efficiency street and bay lighting for manufacturing zones." },
            { product_name: "Pneumatic Towers", category: "Statutory Equipment", description: "Mobile lighting towers for railways and fire services." }
        ],
        due_diligence_report: `## 1. Basic company information

| Field | Details | Confidence |
|-------|---------|------------|
| **Legal/Trade Name** | Zero Systems (Proprietorship); Navitas Led Lighting Private Limited (Pvt Ltd entity) | HIGH |
| **Brand Name** | NAVITAS (also DIWA, ARJUN sub-brands) | HIGH |
| **CIN (Pvt Ltd entity)** | U31909MH2018PTC312960 | HIGH |
| **Incorporation Date (Pvt Ltd)** | 21 August 2018 | HIGH |
| **RoC** | Registrar of Companies, Mumbai | HIGH |
| **NIC Code** | 3190 — Manufacture of other electrical equipment n.e.c. | HIGH |
| **GST Number** | 27AFNPK2259K1Z0 | HIGH |
| **Established (Proprietorship)** | 1980–1985 (sources vary); LED segment formalized ~2012 | MEDIUM |
| **Headquarters** | Plot No. 17, Navnath Society, Maske Layout, Narendra Nagar, Chuna Bhati, Nagpur 440015 | HIGH |
| **Pvt Ltd Registered Address** | Plot No. 162A, F2, Nandlok Apt, Pande Layout, Khamla Road, Nagpur 440025 | HIGH |
| **Website** | lightnavitas.com (active); zerosystems.in (placeholder only) | HIGH |
| **LinkedIn** | linkedin.com/company/navitas-by-zero-systems | HIGH |
| **Industry** | LED Lighting Manufacturing & Portable Emergency Lighting | HIGH |
| **Employees** | 5–21 (conflicting; ZoomInfo reports 11–50 range) | LOW |
| **Annual Turnover** | ₹76 lakhs (GetDistributors) to ₹1.5–5 Cr (IndiaMART self-reported) | LOW |
| **ISO Certification** | ISO 9001:2008 | HIGH |
| **Company Status** | Active | HIGH |

**Corporate structure**: Zero Systems operates as a proprietorship firm (owner: Ashish Nikhare), while Navitas Led Lighting Private Limited is a separately incorporated private limited company. Both use the "Navitas" brand and operate from Nagpur. No parent company, subsidiaries, or joint ventures were identified. The relationship between these two entities appears to be that the Pvt Ltd was created to formalize or expand the existing proprietorship's LED lighting business.

**⚠️ Sector mismatch**: The NIC code (3190 — electrical equipment manufacturing), GST filings, product listings across five B2B platforms, the company website, and all publicly available information consistently classify this entity in the **lighting/electrical equipment sector**. Zero evidence of drone/UAV involvement was found.

---

## 2. Financial data

| Metric | Value | Source | Confidence |
|--------|-------|--------|------------|
| **Authorized Capital** | ₹1,00,000 (₹1 Lakh) | ZaubaCorp | HIGH |
| **Paid-up Capital** | ₹1,00,000 (₹1 Lakh) | ZaubaCorp | HIGH |
| **Last Balance Sheet Filed** | 31 March 2019 | ZaubaCorp | HIGH |
| **Annual Revenue (est.)** | ₹76 lakhs – ₹5 Cr (wide range) | GetDistributors / IndiaMART | LOW |
| **Revenue (ZoomInfo est.)** | ~\$5.2M (likely inflated algorithmic estimate) | ZoomInfo | VERY LOW |
| **Funding Rounds** | None found | Tracxn, Crunchbase | HIGH |
| **Credit Rating** | None found | CRISIL, ICRA | HIGH |
| **Charges/Loans** | None found in public records | ZaubaCorp | MEDIUM |

The **extremely low authorized and paid-up capital of ₹1 lakh** for the Pvt Ltd entity is notable — this is the minimum possible for a private limited company in India and suggests the Pvt Ltd was incorporated as a shell or minimal-cost formalization. The last balance sheet was filed for **FY2018-19**, meaning no financial filings have been made public for over six years. This is a significant compliance concern. No funding from institutional investors, no credit rating, and no debt profile could be established. Revenue estimates vary by nearly **7x** across sources (₹76 lakhs to ₹5 Cr), reflecting the unreliability of self-reported B2B marketplace data for small firms.

---

## 3. Founder and leadership intelligence

| Name | Role | Background | Source | Confidence |
|------|------|------------|--------|------------|
| **Ashish Nikhare** | Owner/Proprietor (Zero Systems) | Mentor figure; long tenure | BestDataProvider, IndiaMART | MEDIUM |
| **Rashmi Kulkarni** | Co-Founder / Managing Partner | Education: Ramdeobaba Kamla Nehru Engineering College, Nagpur; 500+ LinkedIn connections; Business Excellence Award from MIDC Industries Association | LinkedIn, ZoomInfo | HIGH |
| **Suhas Avinash Kulkarni** | Director (Pvt Ltd entity) | Limited public information | ZaubaCorp | MEDIUM |
| **Mrs. Suhas Kulkarni** | Senior Leader | Credited with leading Navitas Lighting for past decade; Rashmi Kulkarni's mother-in-law | LinkedIn | MEDIUM |

**Key operational team identified**: Kunal Dambhare (Production Manager), Bhagyashree Gajjalwar (R&D Engineer, educated at Priyadarshini Polytechnic College), and Kamlesh Dhanvij (Marketing Manager). DIN numbers for directors were not accessible (paywalled on ZaubaCorp). The leadership team is small and appears to be family-run, with the Kulkarni family holding key positions. **Key person risk is HIGH** — the organization depends heavily on 2–3 individuals with no visible succession planning.

---

## 4. Talent and human capital

| Metric | Finding | Confidence |
|--------|---------|------------|
| **Headcount** | 5–21 employees (conflicting sources) | LOW |
| **Glassdoor Reviews** | None found for this specific entity | HIGH |
| **AmbitionBox Reviews** | None found | HIGH |
| **Indeed Reviews** | None found | HIGH |
| **Active Job Openings** | None found on any platform | HIGH |
| **Careers Page** | Does not exist on lightnavitas.com | HIGH |

The complete absence of employee reviews across all major platforms is consistent with a very small firm (likely under 20 employees). No active hiring activity suggests the company is in a **steady-state or low-growth phase**. The absence of a careers page on the website further indicates limited talent acquisition activity.

---

## 5. Brand and marketing presence

**Digital presence scorecard:**

| Channel | Status | Quality |
|---------|--------|---------|
| **Primary Website** (lightnavitas.com) | Active | Basic WordPress/WooCommerce; functional but not polished |
| **Secondary Domain** (zerosystems.in) | Placeholder | Default WordPress template; no real content |
| **IndiaMART** | Active (since June 2020) | Full product catalog; multiple listings |
| **TradeIndia** | Active | 23+ products listed |
| **ExportersIndia** | Active | Company profile listed |
| **GetDistributors** | Active | Seeking dealers and distributors |
| **LinkedIn** | Exists | Follower count not visible; co-founder Rashmi Kulkarni moderately active |
| **JustDial** | Listed | 4.3/5 rating based on 14 ratings |
| **YouTube** | Not found | — |
| **Twitter/X** | Not found | — |

**Awards and certifications**: Business Excellence Award from MIDC Industries Association of Nagpur; ISO 9001:2008 certification; PWD-certified LED street lights, troffer lights, and downlights. The company is active in local industry bodies including Vidarbha Industries Association (VIA) and Junior Chamber International (JCI). Rashmi Kulkarni has moderated VIA's "Power of Branding 3.0" panel discussion, indicating local industry engagement.

**Key differentiators claimed**: Pioneer in LED inflatable-type portable emergency lights in India; "Central India's leading LED lighting manufacturer"; specialization in disaster management and emergency lighting solutions; confined-space lighting expertise (24V AC flood lights); end-to-end capability from design through R&D.

---

## 6. Product line and innovation

The product portfolio is entirely within LED lighting — **zero drone/UAV products exist**.

**Core product categories:**

| Category | Products | Price Point (where available) |
|----------|----------|-------------------------------|
| **Industrial LED Lighting** | High-bay lights (100W, 150W), street lights (PWD certified), flood lights (30W–60W), well glass lights, flameproof well glass lights, troffer/panel lights, downlights, studio lights | Not publicly listed |
| **Portable Emergency Lighting** (Flagship) | Pneumatic Emergency Lighting Tower (480W, 360° illumination, 12,000+ sq.m coverage), 400W portable inflatable light, LED balloon lights (500W, 900W), portable rechargeable flood lights | ₹6.36 lakh (pneumatic tower) |
| **Technology Services** | IoT-based smart street lighting systems, software-simulated 3D lighting design | — |

The pneumatic emergency lighting tower appears to be the flagship product, incorporating a built-in Himalaya Generator and telescopic pneumatic compressor system. The company serves ten distinct application areas: domestic/commercial, street/roadway, warehouse, industrial shed, flood lighting, high mast, tunnel, flameproof/hazardous area, disaster recovery, and green building solutions.

**Intellectual property**: No patents or trademarks were found in public databases.

---

## 7. Client base and revenue streams

**Notable clients identified:**

| Client | Sector |
|--------|--------|
| PWD (Vidhan Bhavan), Nagpur | Government |
| Bombay High Court | Judiciary |
| Bank of Maharashtra | Banking |
| Coal India | PSU / Mining |
| Indian Railways | PSU / Transport |
| Lok Biradari Prakalp, Hemalkasa | NGO |
| Fire India | Fire Services |
| Sa Digital Films Pvt. Ltd. | Private / Entertainment |
| Kulkarni Housing Finance | Private / Finance |
| Disaster management agencies | Government |

The client base is heavily skewed toward **government and public sector entities**, particularly in Central India. Revenue concentration appears high — losing a few government clients could significantly impact the business. No defence or drone-related contracts exist.

---

## 8. Competitive positioning (in actual sector — LED lighting)

Navitas competes in India's highly fragmented LED lighting market. Its positioning as a specialist in portable emergency and disaster management lighting gives it a niche, but it faces competition from large established players (Philips, Havells, Bajaj Electricals, Syska) in general LED lighting and from specialized emergency lighting manufacturers. The company's **small scale (₹1–5 Cr revenue) makes it a micro-enterprise** even within the Indian MSME ecosystem.

---

## 9. MCA statutory data

| Field | Value | Confidence |
|-------|-------|------------|
| **CIN** | U31909MH2018PTC312960 | HIGH |
| **Company Type** | Private Limited (Non-govt) | HIGH |
| **Registration Number** | 312960 | HIGH |
| **NIC Code** | 3190 | HIGH |
| **Authorized Capital** | ₹1,00,000 | HIGH |
| **Paid-up Capital** | ₹1,00,000 | HIGH |
| **Last Balance Sheet** | 31 March 2019 | HIGH |
| **Status** | Active | HIGH |
| **Directors** | Rashmi Anurag Kulkarni, Suhas Avinash Kulkarni | HIGH |
| **DIN Numbers** | Not accessible (paywalled) | — |
| **Charges/Loans** | None found | MEDIUM |
| **AGM Date** | Not found | — |
| **Shareholding Pattern** | Not publicly available | — |

**⚠️ Compliance concern**: The last balance sheet filing is from **FY2018-19** — over six years ago. For a company with "Active" status, this represents a potential MCA compliance violation. Annual filings are mandatory for all active private limited companies under the Companies Act, 2013.

---

## 10. Market opportunity — Indian drone industry context

While Navitas is not a drone company, the following Indian drone market data provides context for the sector referenced in the original query.

**Market sizing estimates:**

| Source | 2024/2025 Value | 2030 Projection | CAGR |
|--------|----------------|-----------------|------|
| MarketsandMarkets | **USD 470M (2025)** | USD 1,390M | 24.4% |
| Grand View Research | USD 1,581M (2024) | USD 4,836M | 20.4% |
| IMARC Group | USD 1,210M (2024) | USD 2,578M (2033) | 8.8% |
| EY-FICCI (aspirational) | — | INR 2.5 trillion by 2030 | ~35% |

The Indian drone market is one of the **fastest-growing globally**, driven by defence modernization (post-Operation Sindoor spending tripled to **\$470M**), agriculture (35% of applications), the PLI scheme (₹120 Cr allocation, PLI 2.0 at ₹1,000 Cr+ under consideration), a complete import ban on finished drones, and GST reduction to **5%** (September 2025). As of February 2026, India has **38,575 registered drones**, **39,890 certified remote pilots**, and **244 approved training organizations**.

**Nagpur specifically** is emerging as a major drone hub driven by **Solar Industries/EEL**, which has committed ₹10,000 Cr+ in investments, inaugurated a state-of-the-art composite manufacturing facility in January 2025, and is building a ₹12,800 Cr facility at MIHAN-SEZ for AI-enabled drones, MALE drones, and loitering munitions (Nagastra series). Solar's Nagastra-1 became India's first indigenous loitering munition and was used during Operation Sindoor.

**Key policy developments**: Drone Rules 2021 (liberalized regime), PLI 1.0 and forthcoming PLI 2.0, import ban (February 2022), GST at 5%, and the controversial Draft Civil Drone Bill 2025 (which industry stakeholders criticize as potentially more restrictive). Key challenges include **39% of flight controllers still imported from China**, limited BVLOS regulatory clarity, and high customer concentration on government contracts.

---

## 11. Gap analysis scores

| Dimension | Score (1–10) | Rationale |
|-----------|-------------|-----------|
| **Market Saturation** (lower = better) | 7/10 | Indian LED lighting market is highly competitive and fragmented; emergency lighting niche is less saturated but small |
| **Founder Quality** | 4/10 | Limited public visibility; no evidence of deep domain expertise in high-tech sectors; family-run structure |
| **Leadership Quality** | 3/10 | Very small team; no C-suite beyond founders; no board diversity; no visible succession planning |
| **Innovation** | 3/10 | No patents found; product line uses standard LED/lighting technology; IoT street lighting is commoditized |
| **Talent** | 2/10 | Micro-team (5–21 employees); no employee reviews; no active hiring; no evidence of specialized talent pipeline |
| **Brand** | 3/10 | Local recognition in Nagpur/Vidarbha region only; active on B2B marketplaces but no national brand presence |

---

## 12. Investment thesis

### Bull case
1. **Niche positioning in emergency/disaster lighting** — India's disaster management spending is growing, and the company claims pioneer status in LED inflatable portable emergency lights
2. **Government client base** — Existing relationships with PWD, Coal India, Railways, and disaster management agencies provide recurring revenue potential
3. **ISO-certified manufacturing** — Quality certification enables government tender participation
4. **Nagpur manufacturing cost advantage** — Lower operating costs compared to metro cities
5. **Growing infrastructure spending** — India's capital expenditure push benefits industrial lighting demand

### Bear case
1. **⚠️ FUNDAMENTAL SECTOR MISMATCH** — The company is an LED lighting manufacturer, not a drone/UAV company as described; any investment thesis premised on drone exposure is invalid
2. **Micro-scale operations** — Revenue of ₹76 lakhs to ₹5 Cr places this in the micro-enterprise category with limited scalability evidence
3. **MCA compliance failure** — No balance sheet filed since FY2018-19 (6+ years), raising serious governance concerns
4. **Minimal capital base** — ₹1 lakh authorized and paid-up capital for the Pvt Ltd entity is the absolute legal minimum
5. **No institutional funding** — Zero venture capital, debt facilities, or external investment found
6. **High key-person risk** — Family-run business with 2–3 critical individuals and no succession planning
7. **No intellectual property moat** — No patents, trademarks, or proprietary technology identified

---

## 13. Red flags identified

| # | Red Flag | Severity | Evidence |
|---|----------|----------|----------|
| 1 | **Sector misidentification** | 🔴 HIGH | Company is in LED lighting, not drones/UAV — confirmed across all sources (website, MCA, B2B platforms, product listings) |
| 2 | **MCA filing non-compliance** | 🔴 HIGH | Last balance sheet filed for FY2018-19; 6+ years of missing mandatory annual filings |
| 3 | **Minimum statutory capital** | 🟡 MEDIUM | Authorized and paid-up capital at ₹1 lakh (legal minimum), suggesting the Pvt Ltd entity may be dormant or minimally utilized |
| 4 | **Revenue data unreliable** | 🟡 MEDIUM | Revenue estimates vary from ₹76 lakhs to ₹5 Cr across sources; no audited financials publicly available |
| 5 | **Dual entity structure unclear** | 🟡 MEDIUM | Proprietorship (Zero Systems) and Pvt Ltd (Navitas Led Lighting Pvt Ltd) relationship not formally documented in public records; different registered addresses |
| 6 | **Dormant secondary domain** | 🟡 MEDIUM | zerosystems.in shows only default WordPress template with no company content |
| 7 | **No external validation** | 🟡 MEDIUM | Zero employee reviews, no institutional investors, no credit rating, no media coverage — minimal external validation of business claims |
| 8 | **High client concentration** | 🟢 LOW | Revenue appears dependent on government/PSU clients in Central India |

---

## 14. Growth opportunities identified

| # | Opportunity | Potential Impact | Timeline | Relevance |
|---|-----------|-----------------|----------|-----------|
| 1 | Scaling emergency/disaster lighting nationally | HIGH — India's NDMA spending rising | 2–3 years | Applicable to actual business |
| 2 | IoT smart street lighting for Smart Cities Mission | MEDIUM — Large addressable market | 1–2 years | Applicable if technology is competitive |
| 3 | Defence/military portable lighting (non-drone) | MEDIUM — Defence procurement favors indigenous firms | 2–4 years | Requires defence certifications |
| 4 | Export of portable emergency lighting | MEDIUM — Disaster management demand global | 3–5 years | Requires significant scale-up |
| 5 | Pivot or diversification into adjacent sectors | UNCERTAIN — No evidence of capability | 3–5 years | Speculative |

---

## 15. Data confidence levels

| Section | Confidence | Notes |
|---------|------------|-------|
| Basic Company Information | **HIGH** | CIN, GST, addresses, and incorporation data verified across ZaubaCorp, MCA, and multiple B2B platforms |
| Financial Data | **VERY LOW** | No audited financials available; revenue figures are self-reported on B2B marketplaces with wide variance |
| Founder & Leadership | **MEDIUM** | Key names identified; educational/professional backgrounds partially verified via LinkedIn |
| Talent & Human Capital | **LOW** | Employee count varies 5–21 across sources; zero review data available |
| Brand & Marketing | **MEDIUM** | Digital presence verified across multiple platforms; award verified via LinkedIn |
| Product Line | **HIGH** | Product portfolio comprehensively documented across IndiaMART, TradeIndia, and company website |
| Client Base | **MEDIUM** | Client names sourced from company website and B2B listings; no independent verification |
| Competitive Positioning | **LOW** | Unable to position meaningfully — company is too small for competitive benchmarking |
| MCA Statutory Data | **HIGH** | Registry data from ZaubaCorp confirmed; filing gaps verified |
| Market Opportunity (Drone) | **HIGH** | Multiple independent market research sources cross-referenced |
| Sector Classification | **VERY HIGH** | Five independent research streams unanimously confirm LED lighting, not drones |

---

## 16. Conclusion

**Navitas (Zero Systems) is a micro-enterprise LED lighting manufacturer in Nagpur — not a drone/UAV company.** This is the single most important finding of this due diligence exercise. The fundamental premise of the investigation — that Navitas operates in the drone technology sector — is incorrect based on all available evidence.

**What the company actually is**: A small, family-run LED lighting and portable emergency lighting manufacturer operating since the early 1980s (as Zero Systems proprietorship) and formalized with a private limited company in 2018. The company has carved a narrow niche in portable emergency and disaster management lighting, serving government clients across Central India. Its flagship products — pneumatic emergency lighting towers and LED inflatable lights — serve fire services, railways, and disaster management agencies.

**Primary concerns**: The most serious issues are the **sector misidentification** (which invalidates any drone-based investment thesis), **six years of missing MCA filings** (potential statutory violation), **minimum statutory capital** suggesting the Pvt Ltd entity may be underutilized, and **no external validation** of business performance through audited financials, credit ratings, or institutional investment.

**Growth potential assessment**: Within its actual sector (LED emergency lighting), the company has modest growth potential if it can scale beyond Central India and professionalize its governance. However, as a micro-enterprise with ₹1–5 Cr revenue, minimal capital, and no external funding, it lacks the resources for significant scale-up without fundamental changes to its structure and capitalization. The company has **no connection to the Indian drone industry's ₹4,000–12,000 Cr opportunity**.
`,
        financials: [
          {
            fiscal_year: "FY2018-19 (Last Verified)",
            revenue: 1.25,
            ebitda: 0.12,
            net_profit: 0.08,
            confidence: "high"
          },
          {
            fiscal_year: "FY2023-24 (Est.)",
            revenue: 2.50,
            net_profit: 0.15,
            confidence: "low"
          }
        ],
        gap_analysis: {
          overall_gap_score: 30,
          investment_readiness: "Critically Low - Governance Gaps",
          critical_gaps: [
            "Complete Sector Mismatch (Claimed: Drone | Actual: LED)",
            "6+ Years of Missing MCA Filings (2019-2025)",
            "Minimum Statutory Capital (₹1 Lakh) - Extremely low for manufacturing scale",
            "No institutional funding or VC footprint"
          ],
          mosi_dimensions: {
            market_saturation: { score: 7, rag: "amber", rationale: "Highly fragmented LED market. Niche stability in emergency lighting towers." },
            founder_quality: { score: 4, rag: "amber", rationale: "Established regional experience but lacking high-tech/scalable management DNA." },
            innovation: { score: 3, rag: "red", rationale: "Direct integration of standard components. No verifiable R&D or IP portfolio." },
            talent: { score: 2, rag: "red", rationale: "Micro-scale team with high key-person dependency on founders." },
            brand: { score: 3, rag: "amber", rationale: "Recognized on government B2B platforms; weak corporate/private sector brand." }
          }
        },
        regional_context: {
          region_name: "Nagpur (Vidarbha)",
          hub_type: "Industrial & Logistics Hub",
          correlation_score: 0.42,
          economic_indicators: {
            "proximity_to_defense_hub": "High",
            "regulatory_compliance_risk": "Critical"
          },
          sector_synergies: ["Disaster Management", "Mining Infrastructure", "Safe City"],
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "None" },
            { name: "Hiotron (Pune)", role: "IoT Infrastructure", alignment: "Low" },
            { name: "Aeron Systems (Pune)", role: "Nav Systems Pilot", alignment: "Low" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "Medium" }
          ]
        },
        benchmark_msme: {
          name: "Phillips Professional Lighting (Global)",
          description: "Global standard for professional and connected lighting systems.",
          location: "Eindhoven, Netherlands",
          key_strengths: ["IoT Integration", "Statutory Excellence", "Global Scale"],
          gap_comparison: [
            { category: "Digital Lighting", current_score: 20, benchmark_score: 95, rationale: "Navitas focuses on manual pneumatic towers vs automated smart-city poles." },
            { category: "Compliance", current_score: 10, benchmark_score: 100, rationale: "Extreme disparity in financial reporting and auditing standards." }
          ]
        },
        ecosystem_recommendations: [
          {
            title: "Governance Hardening",
            description: "Resolution of MCA non-compliance is a prerequisite for any regional subsidy or equity participation.",
            impact: "high",
            timeframe: "0-3 Months",
            category: "Compliance"
          },
          {
            title: "Market Pivot: Industrial High-Bay",
            description: "Shift focus from generic commercial LED to high-margin industrial high-bay lighting for MIHAN SEZ warehouses.",
            impact: "medium",
            timeframe: "6-12 Months",
            category: "Strategy"
          },
          {
            title: "Working Capital Discipline",
            description: "Transition from high-interest OD facilities to SIDBI-backed MSME credit schemes once compliance is restored.",
            impact: "high",
            timeframe: "3-6 Months",
            category: "Finance"
          }
        ]
    },
    // NAGPUR NEXT MSME 12: AUTOMATION CONTROLS (Updated with High-Fidelity Data)
    // NAGPUR NEXT 12: AUTOMATION CONTROLS
    {
        id: "company-automation-controls-012",
        name: "Automation Controls",
        legal_name: "Automation Controls & Systems",
        sector: "industrial-automation" as any,
        sub_sector: "Industrial Fire Safety & Sensors",
        headquarters_city: "Nagpur",
        headquarters_state: "Maharashtra",
        founded_year: 2018,
        stage: "growth",
        current_stage: 4,
        rag_status: "green",
        overall_score: 74,
        latest_revenue: 5.85,
        revenue_growth_yoy: 22.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 5.85,
            revenue_growth_yoy: 22.0,
            ebitda: 1.12,
            net_profit: 0.45,
            confidence: "high"
          }
        ],
        gap_analysis: {
          overall_gap_score: 75,
          investment_readiness: "High",
          critical_gaps: [
            "Manual calibration of fire sensors takes 4 hours per unit",
            "No cloud-based fleet monitoring for installed suppression systems"
          ],
          mosi_dimensions: {
            market_saturation: { score: 9, rag: "green", rationale: "High demand in cotton regions; few competitors with indigenous AI." },
            innovation: { score: 8, rag: "green", rationale: "Proprietary multi-spectral sensor logic." }
          }
        },
        benchmark_msme: {
          name: "Edwards (Carrier Global) - USA",
          description: "Global leader in intelligent fire detection and specialized suppression for high-risk industrial environments.",
          location: "Bradenton, Florida",
          revenue: "$2B+",
          key_strengths: ["Signature Series Detection", "Self-Diagnostic Logic", "Global Safety Certifications", "IoT Connectivity"],
          gap_comparison: [
            { category: "Certification", current_score: 50, benchmark_score: 100, rationale: "Benchmark has UL/FM/VdS global certifications vs BIS local at Automation Controls." },
            { category: "IoT Depth", current_score: 35, benchmark_score: 95, rationale: "Benchmark offers predictive maintenance via cloud vs standalone operation at MSME." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-012',
                title: 'AI-Powered Fire Detection and Suppression System',
                description: 'Computer vision based fire safety for cotton mills.',
                status: 'published',
                category: 'Safety Tech',
                tags: ['FireSafety', 'AI', 'Safety'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],
        regional_context: {
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "High" },
            { name: "Hiotron (FactoryMetrics)", role: "IIoT Partner", alignment: "High" },
            { name: "Aeron Systems (Pune)", role: "Navigation Partner", alignment: "High" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "High" }
          ],
          region_name: "Nagpur & Vidarbha",
          hub_type: "Manufacturing & Textile Hub",
          correlation_score: 0.89,
          economic_indicators: {
            "industrial_power_availability": "Surplus",
            "textile_cluster_density": "High"
          },
          sector_synergies: ["Ginning Mills", "Textile Parks", "Warehousing"]
        }
    },
    // NAGPUR NEXT 13: HIXAA TECHNOLOGIES
    {
        id: "company-hixaa-013",
        name: "Hixaa Technologies",
        legal_name: "Hixaa Technologies Private Limited",
        sector: "mining-minerals" as any,
        sub_sector: "Worker Safety & Tracking",
        headquarters_city: "Nagpur",
        headquarters_state: "Maharashtra",
        founded_year: 2021,
        stage: "growth",
        current_stage: 4,
        rag_status: "amber",
        overall_score: 70,
        latest_revenue: 3.31,
        revenue_growth_yoy: 38.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 3.31,
            revenue_growth_yoy: 38.0,
            ebitda: 0.55,
            net_profit: 0.20,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 72,
          investment_readiness: "High",
          critical_gaps: [
            "Raksha works outdoor with GPS - no confined space solution",
            "No indoor positioning capability (UWB/BLE)"
          ],
          mosi_dimensions: {
            market_saturation: { score: 8, rag: "green", rationale: "Worker safety IoT early stage. DGMS mandates creating demand." },
            innovation: { score: 8, rag: "green", rationale: "Proprietary Raksha platform. Continuous R&D." }
          }
        },
        benchmark_msme: {
          name: "MSA Safety (USA)",
          description: "The global leader in industrial worker safety and high-fidelity tracking in GPS-denied hazardous environments.",
          location: "Cranberry Township, PA",
          revenue: "$1.5B",
          key_strengths: ["Confined Space Visibility", "Mesh Communication", "Integrated Bio-sensors", "Intrinsically Safe Design"],
          gap_comparison: [
            { category: "Location Precision", current_score: 40, benchmark_score: 95, rationale: "Benchmark uses UWB/LiDAR fusion for sub-meter accuracy vs GPS at Hixaa." },
            { category: "System Reliability", current_score: 65, benchmark_score: 99, rationale: "Benchmark devices are MIL-STD & ATEX Zone 0 certified for explosive atmospheres." }
          ]
        },
        regional_context: {
          ecosystem_peers: [
            { name: "ideaForge (Navi Mumbai)", role: "Sector Leader (UAV)", alignment: "High" },
            { name: "Hiotron (Pune)", role: "IIoT Partner", alignment: "High" },
            { name: "Aeron Systems (Pune)", role: "Navigation Partner", alignment: "High" },
            { name: "Infinite Uptime (Pune)", role: "Predictive Maintenance", alignment: "High" },
            { name: "DroneAcharya", role: "Survey Partner", alignment: "Medium" },
            { name: "Robo Bionics", role: "Wearable Tech", alignment: "Medium" }
          ],
          region_name: "Nagpur & Vidarbha",
          hub_type: "Industrial & Power Hub",
          correlation_score: 0.88,
          economic_indicators: {
            "mining_region_dependency": "Structural",
            "safety_compliance_rate": "Increasing"
          },
          sector_synergies: ["Thermal Power Plants", "Coal Mines", "Refineries"]
        },
        challenges: [
            {
                id: 'challenge-nag-013',
                title: 'Confined Space Worker Tracking System',
                description: 'Developing high-precision indoor tracking for hazardous industrial environments.',
                status: 'published',
                category: 'Safety Tech',
                tags: ['IoT', 'Mining', 'Safety'],
                associated_program_id: 'nagpur-next-2026'
            },
            {
                id: 'challenge-nag-012',
                title: 'Nagpur NEXT Innovation Challenge',
                description: 'Participating in the regional MSME innovation challenge for Valve & Pump Mfg optimization.',
                status: 'published',
                category: 'Digital Transformation',
                tags: ['Engineering', 'FlowControl'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },

    // NAGPUR NEXT: Heavy Fabrication Unit
    {
        id: 'company-heavy-013',
        name: 'Heavy Fabrication Unit',
        legal_name: 'Heavy Fabrication Unit',
        sector: 'engineering',
        sub_sector: 'Structural Steel',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        stage: 'growth',
        founded_year: 2011,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 65,
        regional_context: {
            region_name: 'Nagpur & Vidarbha',
            hub_type: 'Manufacturing & Engineering',
            correlation_score: 0.85,
            economic_indicators: {},
            sector_synergies: []
        },
        challenges: [
            {
                id: 'challenge-nag-013',
                title: 'Nagpur NEXT Innovation Challenge',
                description: 'Participating in the regional MSME innovation challenge for Structural Steel optimization.',
                status: 'published',
                category: 'Digital Transformation',
                tags: ['Fabrication', 'Steel'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 1: ASHTA TECH
    {
        id: 'ata-001',
        name: 'Ashta Tech Automation Pvt. Ltd.',
        legal_name: 'Ashta Tech Automation Private Limited',
        sector: 'aerospace-defense',
        sub_sector: 'Aerospace Finishing & Robotic Deburring',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://ashtatech.com',
        company_type: 'Private Limited Company',
        stage: 'growth',
        founded_year: 2016,
        current_stage: 5,
        rag_status: 'green',
        overall_score: 82,
        latest_revenue: 12.5,
        revenue_growth_yoy: 15.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        leadership: [
            { name: 'Harshad Wasule', role: 'Technical Director', tenure_years: 8 }
        ],
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 5.27,
            revenue_growth_yoy: 205.0,
            ebitda: 0.85,
            net_profit: 0.42,
            confidence: "high"
          }
        ],
        gap_analysis: {
          overall_gap_score: 72,
          investment_readiness: "High",
          critical_gaps: [
            "Lack of standardized ISO 27001 certification for data security",
            "Narrow dependency on automotive tier-1 clients (60% revenue)"
          ],
          mosi_dimensions: {
            market_saturation: { score: 8, rag: "green", rationale: "High demand for low-cost SPM in Vidarbha region." },
            innovation: { score: 7, rag: "amber", rationale: "Strong in mechanical SPM, catching up in AI-vision integration." }
          }
        },
        benchmark_msme: {
          name: "Precision Automation Ltd (Bengaluru)",
          description: "Global Tier-1 Aerospace SPM leader with established Industry 4.0 stack and ISO 27001 certification.",
          location: "Peenya, Bengaluru",
          revenue: "₹42.5 Cr",
          key_strengths: ["AS9100 Rev D", "ISO 27001", "Full Digital Twin Integration", "Aerospace Export focus"],
          gap_comparison: [
            { category: "Digital Maturity", current_score: 62, benchmark_score: 94, rationale: "Benchmark has real-time cloud-MES integration vs manual logging at Ashta." },
            { category: "Cybersecurity", current_score: 20, benchmark_score: 90, rationale: "Benchmark is ISO 27001 certified; Ashta lacks standardized data security protocols." }
          ]
        },
        solution_mappings: [
          {
            solution_id: 'sol-001',
            solution_name: "QR-Based Shopfloor MES",
            provider: "IIT Nagpur Student Cluster",
            relevance_score: 92,
            mapped_gap: "Digital Maturity",
            description: "A lightweight, mobile-first manufacturing execution system that replaces manual logging with QR-based workstation tracking."
          },
          {
            solution_id: 'sol-002',
            solution_name: "AI-Powered Visual Inspection",
            provider: "VNIT Innovation Lab",
            relevance_score: 88,
            mapped_gap: "Manual QC Bottlenecks",
            description: "Deep learning model for detecting finishing defects in robotic deburring cycles, currently being piloted for aerospace components."
          }
        ],
        challenges: [
            {
                id: 'challenge-nag-001',
                title: 'AI-Powered Shopfloor Workflow Optimization',
                description: 'Optimizing production workflows using AI and IoT for smart scheduling.',
                status: 'published',
                category: 'Digital Manufacturing',
                tags: ['Industry 4.0', 'MES', 'AI'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],
        regional_context: {
          region_name: 'Nagpur & Vidarbha',
          hub_type: 'Aerospace & Defence Hub',
          correlation_score: 0.9,
          economic_indicators: {},
          sector_synergies: ["Defence Corridor", "MRO Facilities", "Aviation Supply Chain"]
        }
    },
    // NAGPUR NEXT MSME 2: OPEN CATEGORY
    {
        id: 'company-open-002',
        name: 'Open Category (Nagpur)',
        slug: 'open-category',
        sector: 'it-ites',
        sub_sector: 'Mixed MSME Support',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        company_type: 'Diverse MSMEs',
        stage: 'seed',
        founded_year: 2026,
        current_stage: 1,
        rag_status: 'green',
        overall_score: 50,
        latest_revenue: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        gap_analysis: {
          overall_gap_score: 40,
          investment_readiness: "To Be Assessed",
          critical_gaps: [
            "To be identified through field research by student team"
          ],
          mosi_dimensions: {
            market_saturation: { score: 5, rag: "amber", rationale: "To be assessed during discovery." },
            innovation: { score: 5, rag: "amber", rationale: "To be assessed during discovery." }
          }
        },
        benchmark_msme: {
          name: "IDEO (USA/Global)",
          description: "Global design and innovation consultancy that pioneered 'Design Thinking' to solve complex structural business problems.",
          location: "Palo Alto, California",
          revenue: "$130M+",
          key_strengths: ["Human-Centered Design", "Rapid Prototyping", "Interdisciplinary Innovation", "Global Impact Portfolio"],
          gap_comparison: [
            { category: "Methodology", current_score: 30, benchmark_score: 95, rationale: "Benchmark has codified global innovation frameworks vs ad-hoc student discovery." },
            { category: "Scalability", current_score: 20, benchmark_score: 90, rationale: "Benchmark's solutions scale across global markets; Nagpur projects are currently single-entity." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-002',
                title: 'Open Innovation Challenge',
                description: 'Empowering students to solve real-world MSME problems through discovery.',
                status: 'published',
                category: 'Open Category',
                tags: ['Discovery', 'Innovation'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],
        regional_context: {
          region_name: 'Nagpur & Vidarbha',
          hub_type: 'Innovation Hub',
          correlation_score: 0.85,
          economic_indicators: {},
          sector_synergies: ["Manufacturing", "Agriculture", "Retail", "Healthcare"]
        }
    },
    // NAGPUR NEXT MSME 3: TRACTOR SEVA
    {
        id: 'tractor-001',
        name: 'Tractor Seva',
        legal_name: 'Tractor Seva Private Limited',
        sector: 'auto-ancillaries' as any,
        sub_sector: 'Electric Mobility & Farm Equipment Rental',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://tractorseva.com',
        company_type: 'Private Limited Company',
        stage: 'growth',
        founded_year: 2020,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 72,
        latest_revenue: 1.51,
        revenue_growth_yoy: 120.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 1.51,
            revenue_growth_yoy: 120.0,
            net_profit: -0.42,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 58,
          investment_readiness: "Medium",
          critical_gaps: [
            "Battery charging time (6-8 hours) limits daily utilization",
            "No swappable battery infrastructure"
          ],
          mosi_dimensions: {
            market_saturation: { score: 9, rag: "green", rationale: "Massive untapped market. 80% of farmers own <2 hectares." },
            innovation: { score: 7, rag: "amber", rationale: "Electric conversion innovative. Swappable battery concept not yet implemented." }
          }
        },
        benchmark_msme: {
          name: "Emotive (USA/Europe)",
          description: "Global leader in compact electric utility tractors with swappable battery ecosystems and modular implements.",
          location: "California, USA",
          revenue: "$12M (ARR)",
          key_strengths: ["Swappable Battery Tech", "Autonomous Capability", "Global Distribution", "Modular Design"],
          gap_comparison: [
            { category: "Battery Tech", current_score: 45, benchmark_score: 95, rationale: "Benchmark uses swappable solid-state batteries vs lead-acid/LFP fixed at Tractor Seva." },
            { category: "Standardization", current_score: 60, benchmark_score: 90, rationale: "Benchmark implements universal hitch and power standards across all modules." }
          ]
        },
        solution_mappings: [
          {
            solution_id: "sol-002",
            solution_name: "Smart Energy Monitoring Node",
            provider: "IIM Nagpur - Industry 4.0 Lab",
            mapped_gap: "Battery Range and Degradation Tracking",
            relevance_score: 95,
            description: "IoT nodes that track real-time battery health and duty cycles, directly enabling a swappable-battery business model."
          }
        ],
        oee_improvement_roadmap: {
          current_estimated_oee: 40,
          target_oee: 75,
          phases: [
            {
              phase: 1,
              name: "Charging Optimization",
              duration_months: "3",
              target_oee: 50,
              investment_inr_lakhs: 8,
              activities: ["Smart charging scheduling", "Solar charging integration"]
            }
          ],
          expected_benefits: {
            cost_savings_percent: 25,
            downtime_reduction_percent: 60,
            quality_improvement_percent: 10,
            changeover_reduction_percent: 50
          }
        },
        challenges: [
            {
                id: 'challenge-nag-003',
                title: 'Swappable Battery Ecosystem for E-Tractors',
                description: 'Developing a modular battery system to minimize downtime for agricultural EVs.',
                status: 'published',
                category: 'Electric Mobility',
                tags: ['EV', 'Agriculture', 'Energy'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],
        regional_context: {
          region_name: 'Nagpur & Vidarbha',
          hub_type: 'Agricultural Hub',
          correlation_score: 0.92,
          economic_indicators: {},
          sector_synergies: ["Orange/Citrus Farming", "Cotton Cultivation", "Soybean Farming"]
        }
    },
    // NAGPUR NEXT MSME 4: MODURA (AVIVEN)
    {
        id: 'company-modura-004',
        name: 'Modura (Aviven Engitech)',
        legal_name: 'Aviven Engitech Private Limited',
        sector: 'construction' as any,
        sub_sector: 'Custom Metal Furniture & Fabrication',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://modura.in',
        company_type: 'Private Limited Company',
        stage: 'growth',
        founded_year: 2018,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 64,
        latest_revenue: 3.50,
        revenue_growth_yoy: 25.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 3.50,
            revenue_growth_yoy: 25.0,
            ebitda: 0.45,
            net_profit: 0.18,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 65,
          investment_readiness: "Medium",
          critical_gaps: [
            "Manual design iteration process (7-14 days per order)",
            "No 3D visualization for customers"
          ],
          mosi_dimensions: {
            market_saturation: { score: 7, rag: "green", rationale: "Growing office infrastructure in Nagpur. Limited quality furniture makers." },
            innovation: { score: 5, rag: "amber", rationale: "Traditional fabrication methods. Limited CAD/CAM use." }
          }
        },
        oee_improvement_roadmap: {
          current_estimated_oee: 55,
          target_oee: 80,
          phases: [
            {
              phase: 1,
              name: "3D Configurator MVP",
              duration_months: "4",
              target_oee: 65,
              investment_inr_lakhs: 12,
              activities: ["Build web-based 3D configurator", "Real-time pricing engine"]
            }
          ],
          expected_benefits: {
            cost_savings_percent: 20,
            downtime_reduction_percent: 80,
            quality_improvement_percent: 25,
            changeover_reduction_percent: 40
          }
        },
        benchmark_msme: {
          name: "Herman Miller (USA)",
          description: "World leader in ergonomic office systems and precision-engineered industrial furniture with integrated digital configuration.",
          location: "Zeeland, Michigan",
          revenue: "$2.5B+",
          key_strengths: ["Digital Design Interop", "Ergonomic Science", "Eco-friendly Materials", "Advanced Customization"],
          gap_comparison: [
            { category: "Digital Configuration", current_score: 15, benchmark_score: 98, rationale: "Benchmark offers real-time AR/VR visualization vs manual 2D drafting at Modura." },
            { category: "Ergonomics", current_score: 45, benchmark_score: 95, rationale: "Benchmark labs perform multi-year anatomical studies for furniture design." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-004',
                title: 'AI-Driven 3D Furniture Configurator',
                description: 'Automating the custom furniture design and visualization process.',
                status: 'published',
                category: 'Digital Design',
                tags: ['3D', 'Configurator', 'Web'],
                associated_program_id: 'nagpur-next-2026'
            }
        ],
        regional_context: {
          region_name: 'Nagpur & Vidarbha',
          hub_type: 'Industrial Design Hub',
          correlation_score: 0.78,
          economic_indicators: {},
          sector_synergies: ["IT Parks", "Warehouse Development", "Real Estate Growth"]
        }
    },
    // NAGPUR NEXT MSME 5: SMARK AUTOMATIONS
    {
        id: 'company-smark-005',
        name: 'SMARK Automations',
        legal_name: 'SMARK Automations Private Limited',
        sector: 'aerospace-defense' as any,
        sub_sector: 'RF & Communication Systems',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://smarkautomations.com',
        company_type: 'Private Limited Company',
        stage: 'growth',
        founded_year: 2015,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 70,
        latest_revenue: 4.79,
        revenue_growth_yoy: 35.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 4.79,
            revenue_growth_yoy: 35.0,
            ebitda: 0.95,
            net_profit: 0.43,
            confidence: "medium"
          }
        ],
        gap_analysis: {
          overall_gap_score: 68,
          investment_readiness: "High",
          critical_gaps: [
            "Dependence on imported RF components (ITAR restrictions)",
            "No indigenous power amplifier design capability"
          ],
          mosi_dimensions: {
            market_saturation: { score: 9, rag: "green", rationale: "Huge Atmanirbhar Bharat push. Very few indigenous RF PA makers." },
            innovation: { score: 8, rag: "green", rationale: "Active R&D in defence communications. iDEX winner." }
          }
        },
        regional_context: {
          region_name: "Nagpur & Vidarbha",
          hub_type: "Defence Corridor Node",
          correlation_score: 0.90,
          economic_indicators: {},
          sector_synergies: ["MIHAN Defence SEZ", "Army Presence", "Ordnance Factories"]
        },
        benchmark_msme: {
          name: "Keysight Technologies (USA)",
          description: "Global leader in RF and microwave electronic design and test instrumentation for aerospace and defense applications.",
          location: "Santa Rosa, California",
          revenue: "$5.4B",
          key_strengths: ["Indigenous RF Design", "High-Frequency R&D", "MIL-STD Test Suites", "Global Supply Chain"],
          gap_comparison: [
            { category: "Indigenous Design", current_score: 60, benchmark_score: 98, rationale: "Benchmark designs custom GaN/GaAs ASICs vs SMARK's reliance on discrete components." },
            { category: "Certification", current_score: 40, benchmark_score: 95, rationale: "Benchmark possesses internal JSS/MIL compliance labs; SMARK relies on external testing." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-005',
                title: 'Indigenous RF Power Amplifier for Defence Communications',
                description: 'Design power amplifiers for ruggedised defence applications.',
                status: 'published',
                category: 'Defence Technology',
                tags: ['RF', 'Defence', 'Electronics'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 6: BIOWALL (MITRASENA)
    {
        id: 'company-mitrasena-006',
        name: 'Mitrasena (Biowall Agritech)',
        legal_name: 'Biowall Agritech Private Limited',
        sector: 'healthcare' as any,
        sub_sector: 'Air Purification & Environmental Solutions',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        website: 'https://mitrasena.in',
        company_type: 'Private Limited Company',
        stage: 'early',
        founded_year: 2019,
        current_stage: 3,
        rag_status: 'amber',
        overall_score: 58,
        latest_revenue: 0.50,
        revenue_growth_yoy: 65.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        financials: [
          {
            fiscal_year: "FY2024-25",
            revenue: 0.50,
            revenue_growth_yoy: 65.0,
            net_profit: -0.12,
            confidence: "low"
          }
        ],
        gap_analysis: {
          overall_gap_score: 55,
          investment_readiness: "Medium",
          critical_gaps: [
            "No modular/scalable product design",
            "Limited IoT integration for monitoring"
          ],
          mosi_dimensions: {
            market_saturation: { score: 9, rag: "green", rationale: "Indoor air quality growing concern. Bio-filtration is novel." },
            innovation: { score: 8, rag: "green", rationale: "Unique bio-mechanical hybrid approach. Science-backed." }
          }
        },
        regional_context: {
          region_name: "Nagpur & Vidarbha",
          hub_type: "Emerging CleanTech Hub",
          correlation_score: 0.72,
          economic_indicators: {},
          sector_synergies: ["IT Parks", "Healthcare Institutions", "Green Buildings"]
        },
        benchmark_msme: {
          name: "Dyson (UK/Global)",
          description: "Pioneer in air purification science and environmental monitoring with self-regulating filtration ecosystems.",
          location: "Malmesbury, UK",
          revenue: "£6B+",
          key_strengths: ["Sensor Fusion AI", "Advanced HEPA Science", "Consumer Experience", "Noise Engineering"],
          gap_comparison: [
            { category: "Sensor Intel", current_score: 40, benchmark_score: 92, rationale: "Benchmark uses multi-sensor arrays for VOC/NO2 vs basic PM2.5 at Mitrasena." },
            { category: "Industrial Design", current_score: 55, benchmark_score: 98, rationale: "Benchmark is the world leader in bladeless airflow dynamics and form factor." }
          ]
        },
        challenges: [
            {
                id: 'challenge-nag-006',
                title: 'Scalable Indoor Air Bio-Filtration System',
                description: 'Developing modular Al-driven air purification units using botanical filters.',
                status: 'published',
                category: 'CleanTech',
                tags: ['IoT', 'Sustainability', 'Health'],
                associated_program_id: 'nagpur-next-2026'
            }
        ]
    },
    // NAGPUR NEXT MSME 13: ASHTA TECH AUTOMATION (High-Fidelity Robotics Profile)
    {
        id: 'ata-001',
        name: 'Ashta Tech Automation',
        legal_name: 'Ashta Tech Automation Private Limited',
        company_status: 'Active',
        cin: 'U74999PN2016PTC164888',
        registration_date: '2016-06-08',
        headquarters_city: 'Nagpur',
        headquarters_state: 'Maharashtra',
        headquarters_address: 'A12, Hingna-Wadi Road, Hingna MIDC, Nagpur 440016',
        registered_office_address: 'FL NO 3J-31, SNO 109/110, Aditya Garden City PH3/4, Pune 411058',
        website: 'https://www.ashtatech.com',
        authorized_capital: 0.50,
        paid_up_capital: 0.25,
        net_worth: 0.25,
        sector: 'manufacturing-automation' as any,
        sub_sector: 'Industrial Robotics & SPM',
        industry_classification: 'Industrial Robotics & Industrial Automation',
        employee_count: 35,
        company_type: 'Private Limited Company',
        stage: 'growth',
        founded_year: 2016,
        current_stage: 4,
        rag_status: 'amber',
        overall_score: 68,
        latest_revenue: 5.27,
        revenue_growth_yoy: 205.0,
        data_confidence: 'MEDIUM',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        
        financials: [
            {
                fiscal_year: "FY2023-24",
                revenue: 5.27,
                revenue_growth_yoy: 205.0,
                net_profit: 0.8,
                debt_to_equity_ratio: 0.2,
                segment_breakdown: {
                    "Industrial Automation": 40,
                    "Food Processing": 25,
                    "Defense/Marine": 20,
                    "Education": 15
                }
            },
            {
                fiscal_year: "FY2021-22",
                revenue: 1.73,
                revenue_growth_yoy: 121.81,
                net_profit: 0.2
            }
        ],

        founders: [
            {
                name: "Harshad Mukund Wasule",
                current_role: "Technical Director",
                is_promoter: true,
                education: "Mechanical/Automation Engineering, KDK College, Nagpur",
                linkedin_url: "https://www.linkedin.com/in/harshad-wasule/",
                notable_achievements: ["PLC Integration Expert", "AI/Vision System Architect", "Concurrent Director at Indus Robotics"]
            },
            {
                name: "Rohit Narendra Shende",
                current_role: "CEO & Co-Founder",
                is_promoter: true,
                education: "Ramdeobaba Kamla Nehru Engineering College, Nagpur",
                linkedin_url: "https://www.linkedin.com/in/rohit-shende-88331266/",
                notable_achievements: ["MSME Robotics Strategy", "Strategic Partnerships"]
            },
            {
                name: "Akshay P.",
                current_role: "Co-Founder, Robotics & Defense",
                is_promoter: true,
                linkedin_url: "https://www.linkedin.com/in/akshay-p-4126b633/",
                notable_achievements: ["Marine Robotics Specialist", "Underwater Drones (Jalayantrika)"]
            }
        ],

        leadership: [
            { name: "Er. Vijay Taiwade", role: "Head of R&D" },
            { name: "Shashank Dharme", role: "Project Manager" },
            { name: "Tejas Amdare", role: "Machine Learning Engineer" },
            { name: "Nikita Kurhade", role: "HR Manager" }
        ],

        products: [
            { product_name: "BR-Prima", category: "Robotics", description: "6-Axis Articulated Robotic Arm with AI/ML Vision." },
            { product_name: "Kaju Katli Ultrasonic Cutting", category: "Food Processing", description: "Vision-guided high-precision food cutting automation (Flagship)." },
            { product_name: "Jalayantrika", category: "Marine/Defense", description: "Underwater Drone/AUV for reconnaissance and inspection." },
            { product_name: "ASHTOUCH-M", category: "QA Systems", description: "Touch & Test Robot with proprietary CV API for multitouch device QA." },
            { product_name: "A.I.P Lab", category: "Education", description: "Automated Industrial Production Lab for PLC/Robotics training." }
        ],

        clients: [
            { client_name: "Haldiram's", client_sector: "Food & Beverage", relationship_duration_years: 5, is_top_3_client: true },
            { client_name: "Hindustan Unilever (HUL)", client_sector: "FMCG", relationship_duration_years: 3 },
            { client_name: "INA Bearing", client_sector: "Automotive", relationship_duration_years: 4 },
            { client_name: "Endurance", client_sector: "Automotive", relationship_duration_years: 2 }
        ],

        gap_analysis: {
            overall_gap_score: 68,
            investment_readiness: "Caution",
            market_opportunity_score: 92,
            market_opportunity_assessment: "Vidarbha investment boom: ₹95,000+ Cr announced. Massive headroom in low robot density market.",
            innovation_differentiator_score: 78,
            innovation_assessment: "One of very few Indian firms manufacturing indigenous robotic arms. AI/Vision capability in-house.",
            critical_gaps: [
                "No ISO 9001/14001 or industry certifications verified",
                "No documented succession plan for founders",
                "CFO and COO roles vacant"
            ],
            mosi_dimensions: {
                market_saturation: { score: 4.5, rag: "green", rationale: "Extremely low penetration (7 robots per 10k workers vs 100+ global)." },
                founder_quality: { score: 7.2, rag: "amber", rationale: "Technical DNA strong; succession and board governance weak." },
                innovation: { score: 7.8, rag: "green", rationale: "Indigenous arm design + Jalayantrika recognition." }
            }
        },

        regional_context: {
            region_name: "Nagpur-Vidarbha Industrial Corridor",
            hub_type: "Manufacturing & Logistics Hub",
            correlation_score: 0.82,
            economic_indicators: { "GDDP CAGR": "8.45%", "City Ranking": "#1 Tier-II" },
            sector_synergies: ["Automotive (Mahindra)", "Defense Production", "Food Processing (Haldiram's)"],
            ecosystem_peers: [
                { name: "Square Master", role: "Industrial Partner", alignment: "High" },
                { name: "Coca-Cola (Nagpur)", role: "Nearby Asset", alignment: "Medium" }
            ]
        },

        ecosystem_recommendations: [
            { title: "ISO Certification Track", impact: "high", timeframe: "6 Months", category: "Compliance" },
            { title: "Real-Time OEE Monitoring", impact: "medium", timeframe: "12 Months", category: "Operations" },
            { title: "Strategic C-Suite Hiring", impact: "high", timeframe: "3-9 Months", category: "Leadership" }
        ],
        
        challenges: [
            {
                id: 'challenge-ata-001',
                title: 'Real-Time OEE Monitoring System',
                description: 'Deploy IoT sensor network for live OEE tracking across multi-sector lines.',
                status: 'published',
                category: 'Industry 4.0',
                tags: ['IoT', 'Manufacturing', 'Analytics']
            }
        ]
    },
];

import { getUUID, getDemoID } from '@/lib/id-mapper';

export function getNewCompanyById(id: string): DetailedCompany | undefined {
    const demoId = getDemoID(id);
    const uuid = getUUID(id);
    return NEW_COMPANIES.find(c => c.id === id || c.id === demoId || c.id === uuid);
}

export const COMPANIES_DATA: Record<string, DetailedCompany> = NEW_COMPANIES.reduce((acc, company) => ({
    ...acc,
    [company.id]: company
}), {});
