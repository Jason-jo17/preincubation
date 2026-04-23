import { RegionalIntelligence } from '../types/detailed-company';

export const REGIONAL_DATA: Record<string, RegionalIntelligence> = {
    "blr-bel": {
        region_name: "Bangalore-Belagavi Axis",
        hub_type: "Aerospace & Precision Engineering",
        correlation_score: 0.88,
        economic_indicators: {
            "Regional GDP Contribution": "₹45,000 Cr",
            "MSME Density": "High",
            "Logistics Efficiency Rank": 4
        },
        sector_synergies: ['Marine Logistics', 'Precision Tooling', 'Defense Electronics'],
        ai_opportunity_ranking: [
            { rank: 1, sector: 'Aerospace', rationale: 'HAL/ISRO vicinity, high-precision machining demand.' },
            { rank: 2, sector: 'Precision Tooling', rationale: 'AS9100 SMEs requiring automated quality checks.' }
        ],
        stakeholders: [
            { name: 'BAA', full: 'Belagavi Aerospace Association', type: 'Trade Body' },
            { name: 'BCIC', full: 'Bangalore Chamber of Industries', type: 'Business Council' },
            { name: 'KASSIA', full: 'Karnataka Small & Scale Industries', type: 'MSME Body' }
        ]
    },
    "mangalore": {
        region_name: "Dakshina Kannada (Mangaluru)",
        hub_type: "Industrial Map: 18 Economic Sectors",
        correlation_score: 0.94,
        economic_indicators: {
            "Per Capita GDP": "₹6.69 Lakh (8th in India)",
            "GSDP Contribution": "5.7% of Karnataka",
            "MSME Count": "18,918+ Registered Units",
            "Port Throughput": "46.01 MMT (FY25)",
            "Refinery Revenue": "₹89,312 Cr (MRPL)"
        },
        sector_synergies: ['Port Logistics', 'Petrochemicals', 'Banking', 'Cashew Processing', 'Fisheries', 'ITES'],
        priority_sectors: [
            {
                id: 'oil-gas',
                name: 'Petrochemicals & Specialty Chemicals',
                metrics: '₹89,312 Cr anchor',
                anchor_companies: ['MRPL', 'OMPL', 'ISPRL', 'Shell-MRPL', 'Cardolite'],
                gaps: ['Analog turnaround monitoring', 'Manual HSE checks'],
                ai_opportunities: ['Predictive maintenance', 'Digital twins', 'GRM optimization'],
                adoption_level: 'high'
            },
            {
                id: 'port-logistics',
                name: 'Port-Led Logistics & EXIM',
                metrics: '46.01 MMT Throughput',
                anchor_companies: ['NMPA', 'Hasan Hajee & Co.', 'Amogha Group', 'Delta Infralogistics'],
                gaps: ['Paper-based documentation', 'Single CFS facility'],
                ai_opportunities: ['Real-time cargo tracking', 'Automated customs classification'],
                adoption_level: 'low'
            },
            {
                id: 'bfsi',
                name: 'Banking, Finance & Insurance (BFSI)',
                metrics: 'Heritage Hub (4 Banks started here)',
                anchor_companies: ['Karnataka Bank HQ', 'Corporation Bank (Union)', 'Canara Bank Office'],
                gaps: ['Traditional underwriting for MSMEs'],
                ai_opportunities: ['AI credit scoring', 'Fraud detection'],
                adoption_level: 'high'
            },
            {
                id: 'it-ites',
                name: 'IT & Software Ecosystem',
                metrics: '₹4,500+ Cr annual revenue',
                anchor_companies: ['Infosys', 'Robosoft', 'UnifyCX', 'Niveus', 'Novigo'],
                gaps: ['Talent drain to Bengaluru'],
                ai_opportunities: ['Generative AI for dev', 'Product-based pivots'],
                adoption_level: 'high'
            },
            {
                id: 'healthcare',
                name: 'Medical Tourism & Healthcare Hub',
                metrics: '8,000+ beds, 8 medical colleges',
                anchor_companies: ['KMC', 'Yenepoya', 'Father Muller', 'AJ Hospital'],
                gaps: ['Fragmented diagnostic data'],
                ai_opportunities: ['Diagnostic radiology AI', 'Patient flow optimization'],
                adoption_level: 'mixed'
            },
            {
                id: 'food-processing',
                name: 'Food Processing & Fisheries',
                metrics: '40% of Karnataka marine catch',
                anchor_companies: ['Ideal Ice Cream', 'Shree Ulka LLP', 'Mukka Sea Food', 'Blueline Foods'],
                gaps: ['Inadequate cold chain', 'High perishability'],
                ai_opportunities: ['Shelf-life prediction AI', 'Catch prediction'],
                adoption_level: 'low'
            },
            {
                id: 'cashew',
                name: 'Cashew Processing & Export',
                metrics: '25% of India\'s capacity',
                anchor_companies: ['Achal Industries', 'DVK Group', 'Bolkar', 'Reliable Cashew'],
                gaps: ['Manual shelling & grading'],
                ai_opportunities: ['Optical grading CV', 'Workforce automation'],
                adoption_level: 'very low'
            },
            {
                id: 'engineering',
                name: 'General Engineering & Fabrication',
                metrics: '6,000+ MSME units',
                anchor_companies: ['Lamina Suspensions', 'Garodi Steels', 'Adya Industries'],
                gaps: ['Lack of CNC modularity', 'Manual inspection'],
                ai_opportunities: ['Zero-defect manufacturing AI'],
                adoption_level: 'medium'
            },
            {
                id: 'construction',
                name: 'Construction & Real Estate',
                metrics: 'High per-capita residential growth',
                anchor_companies: ['Rohan Corporation', 'Land Trades', 'Mugrody Constructions'],
                gaps: ['Project delay tracking'],
                ai_opportunities: ['BIM with AI scheduling'],
                adoption_level: 'medium'
            },
            {
                id: 'marine-eng',
                name: 'Marine Engineering & Boat Building',
                metrics: 'Hoige Bazar heritage',
                anchor_companies: ['Mangalore Shipyard', 'Master Shipyard'],
                gaps: ['Traditional design methodology'],
                ai_opportunities: ['Hull design optimization AI'],
                adoption_level: 'low'
            },
            {
                id: 'edtech',
                name: 'Educational Services & EdTech',
                metrics: 'Global Education Hub',
                anchor_companies: ['Expert Classes', 'Sahyadri Systems', 'NITK Startups'],
                gaps: ['Traditional classroom focus'],
                ai_opportunities: ['Adaptive learning platforms'],
                adoption_level: 'mixed'
            },
            {
                id: 'hospitality',
                name: 'Hospitality & Tourism',
                metrics: 'Religious & Beach tourism peak',
                anchor_companies: ['Ocean Pearl', 'Taj Gateway', 'Goldfinch'],
                gaps: ['Seasonal demand management'],
                ai_opportunities: ['Yield management AI'],
                adoption_level: 'medium'
            },
            {
                id: 'tile-refractories',
                name: 'Tile & Refractories (Legacy)',
                metrics: 'Heritage Sector',
                anchor_companies: ['Albuquerque Tiles', 'Pinto Tiles'],
                gaps: ['Obsolete kiln tech'],
                ai_opportunities: ['Kiln temperature AI control'],
                adoption_level: 'very low'
            },
            {
                id: 'auto-components',
                name: 'Auto Components (Niche)',
                metrics: 'Export focused leaf springs',
                anchor_companies: ['Lamina', 'Supreme Motors'],
                gaps: ['Supply chain visibility'],
                ai_opportunities: ['Inventory forecasting AI'],
                adoption_level: 'medium'
            },
            {
                id: 'printing-packaging',
                name: 'Printing & Packaging',
                metrics: 'South Karnataka Hub',
                anchor_companies: ['Big Bags International', 'Bright Packaging'],
                gaps: ['Manual quality checks'],
                ai_opportunities: ['Print defect detection AI'],
                adoption_level: 'high'
            },
            {
                id: 'rubber-plastic',
                name: 'Rubber & Plastic Products',
                metrics: 'Petrochemical synergy',
                anchor_companies: ['Konkan Speciality Poly', 'Brightflexi'],
                gaps: ['Raw material price volatility'],
                ai_opportunities: ['Price prediction AI'],
                adoption_level: 'medium'
            },
            {
                id: 'jewelry',
                name: 'Jewelry & Handicrafts',
                metrics: 'Temple jewelry heritage',
                anchor_companies: ['Sulthan Retail', 'Muliya Jewels', 'G.L. Acharya'],
                gaps: ['Limited digital design'],
                ai_opportunities: ['Generative jewelry design'],
                adoption_level: 'low'
            },
            {
                id: 'retail',
                name: 'Retail & Distribution',
                metrics: 'High consumption district',
                anchor_companies: ['Karnataka Agencies', 'Digital Planet', 'Kanchana Hyundai'],
                gaps: ['Last mile fragmentation'],
                ai_opportunities: ['Route optimization AI'],
                adoption_level: 'high'
            },
            {
                id: 'aerospace',
                name: 'Aerospace & Defense Precision Engineering',
                metrics: '₹1,500+ Cr MSME Cluster',
                anchor_companies: ['Hical Technologies', 'Lamina Suspensions', 'Garodi Steels'],
                gaps: ['Fragmented digital supply chain', 'Certification costs'],
                ai_opportunities: ['AI-driven quality inspection', 'Predictive maintenance for actuators'],
                adoption_level: 'medium'
            }
        ],
        ai_opportunity_ranking: [
            { rank: 1, sector: 'Port-Led Logistics', rationale: '46 MMT volumes, analog operations, government modernization mandate.' },
            { rank: 2, sector: 'Petrochemicals', rationale: '₹89,000 Cr anchor, safety-critical, predictive maintenance ROI.' },
            { rank: 3, sector: 'BFSI', rationale: 'Karnataka Bank HQ, IBM partnership, KDEM FinTech hub.' },
            { rank: 4, sector: 'Aerospace & Defense', rationale: 'High-precision manufacturing base, AS9100 certified SMEs.' },
            { rank: 5, sector: 'Cashew & Food Processing', rationale: 'Manual grading ripe for computer vision, 70,000 workers.' },
            { rank: 6, sector: 'Jewelry & Handicrafts', rationale: 'Generative design opportunity for traditional temple jewelry.' }
        ],
        stakeholders: [
            { name: 'KCCI', full: 'Kanara Chamber of Commerce', type: 'Trade Body' },
            { name: 'NMPA', full: 'New Mangalore Port Authority', type: 'Public Sector' },
            { name: 'MSEZ', full: 'SEZ Infrastructure', type: 'Infrastructure' },
            { name: 'KDEM', full: 'Digital Mission', type: 'Strategic' }
        ]
    },
    "nagpur": {
        region_name: "Nagpur & Vidarbha",
        hub_type: "Multimodal Logistics & Defense Base",
        correlation_score: 0.92,
        executive_summary: "Nagpur sits at the geographic center of India — the 'Zero Mile' — and is undergoing a transformation from a traditional mining and trade city into a defense-aerospace powerhouse and multimodal logistics hub. MIHAN SEZ alone has attracted ₹25,000+ crore in investments, anchored by Solar Defence, Dassault, and Mahindra.",
        economic_indicators: {
            "Investment Committed": "₹1.5+ Lakh Cr",
            "MIHAN SEZ Investment": "₹25,000+ Cr",
            "Industrial Workforce": "3-4 Lakh",
            "MIDC MSME Units": "1,000+ (Hingna/Butibori)",
            "Power Capacity": "14,000+ MW",
            "Subsidy Limit": "80% FCI (D+ Zone)"
        },
        sector_synergies: [
            "Aerospace ↔ Defense (Shared MIHAN infrastructure)",
            "Steel/Metals ↔ Infrastructure (Samruddhi Mahamarg demand)",
            "Mining ↔ Heavy Engineering (WCL/MOIL vendor ecosystem)",
            "Energy ↔ Industrial Clusters (Surplus power region)",
            "Agri-Tech ↔ Orange Processing (Patanjali Mega Park)"
        ],
        priority_sectors: [
            {
                id: 'aerospace-defense',
                name: 'Aerospace & Defense',
                metrics: '₹27,000+ Cr committed | Solar, TASL, Dassault Reliance',
                anchor_companies: ['Solar Industries', 'Tata Advanced Systems', 'Yantra India Ltd', 'Dassault Reliance Aerospace', 'Air India MRO'],
                gaps: ['Qualified Tier-2 suppliers', 'NADCAP certifications', 'Precision tooling'],
                ai_opportunities: ['AI composite inspection', 'Predictive maintenance for MRO', 'Autonomous UAV navigation'],
                adoption_level: 'medium'
            },
            {
                id: 'auto-ancillaries',
                name: 'Automotive & Ancillaries',
                metrics: '1,500-acre Mahindra plant (incoming) | 400+ MSMEs',
                anchor_companies: ['Mahindra & Mahindra', 'Sharda Auto', 'Sharda Ispat', 'International Combustion'],
                gaps: ['Transition to EV standards', 'Shop-floor Industry 4.0', 'CNC penetration'],
                ai_opportunities: ['CNC optimization', 'Quality vision systems', 'Supply chain digitization'],
                adoption_level: 'low'
            },
            {
                id: 'textiles',
                name: 'Textiles & Apparel',
                metrics: 'Indo Rama ₹3,000+ Cr rev | 750 unit Orange City Cluster',
                anchor_companies: ['Indo Rama Synthetics', 'Gimatex Industries', 'Orange City Garment Cluster'],
                gaps: ['Outdated ginning machinery', 'FarmerRaw material tracing'],
                ai_opportunities: ['AI cotton grading', 'Supply chain traceability', 'Predictive spinning maintenance'],
                adoption_level: 'low'
            },
            {
                id: 'it-ites',
                name: 'IT / ITES',
                metrics: '₹4,453 Cr SEZ exports | TCS, Infosys, HCL',
                anchor_companies: ['Persistent Systems', 'TCS', 'Infosys', 'HCL Tech', 'InfoCepts'],
                gaps: ['Talent brain drain', 'Venture capital access'],
                ai_opportunities: ['Generative AI for enterprise', 'Data analytics hub development'],
                adoption_level: 'high'
            },
            {
                id: 'steel-metals',
                name: 'Steel & Metals',
                metrics: 'Sunflag ₹3,657 Cr | Lloyds Metals ₹6,721 Cr',
                anchor_companies: ['Sunflag Iron & Steel', 'Lloyds Metals', 'Jayaswal NECO'],
                gaps: ['High power costs', 'Mine safety documentation', 'Process waste'],
                ai_opportunities: ['EAF process optimization', 'Digital twins for steel mills', 'Mine safety AI'],
                adoption_level: 'medium'
            },
            {
                id: 'mining-minerals',
                name: 'Mining & Minerals',
                metrics: 'WCL (63 MT prod) | MOIL (50% India Manganese)',
                anchor_companies: ['WCL (Coal India)', 'MOIL Limited', 'MECL'],
                gaps: ['Environmental compliance overhead', 'Manual geological mapping'],
                ai_opportunities: ['Predictive HEMM maintenance', 'Autonomous haulage', 'Drone surveillance'],
                adoption_level: 'medium'
            },
            {
                id: 'power-energy',
                name: 'Power & Energy',
                metrics: '14,000+ MW capacity hub',
                anchor_companies: ['MAHAGENCO', 'NTPC Mouda', 'Adani Power Tiroda'],
                gaps: ['Fly ash utilization', 'Grid stability with renewables'],
                ai_opportunities: ['Turbine predictive maintenance', 'Grid demand forecasting', 'Coal blend optimization'],
                adoption_level: 'medium'
            },
            {
                id: 'food-processing',
                name: 'Food Processing & Agri-Tech',
                metrics: 'Patanjali Mega Food Park (800 TPD)',
                anchor_companies: ['Patanjali', 'Haldiram\'s', 'Dinshaw\'s Dairy'],
                gaps: ['Perishability (orange juice)', 'Cold chain fragmentation'],
                ai_opportunities: ['AI crop grading', 'Precision irrigation', 'Cold chain IoT'],
                adoption_level: 'low'
            },
            {
                id: 'healthcare',
                name: 'Healthcare & Medical',
                metrics: 'AIIMS Nagpur | 5,000+ specialized beds',
                anchor_companies: ['AIIMS Nagpur', 'Max Super Speciality', 'Wockhardt', 'KIMS-Kingsway'],
                gaps: ['Rural telemedicine access', 'Fragmented patient records'],
                ai_opportunities: ['AI diagnostics', 'Robotic surgery', 'Hospital flow automation'],
                adoption_level: 'medium'
            },
            {
                id: 'education-research',
                name: 'Education & Research',
                metrics: 'VNIT, IIM Nagpur, CSIR-NEERI',
                anchor_companies: ['VNIT', 'IIM Nagpur', 'IIIT Nagpur', 'NEERI'],
                gaps: ['Industry-academia gap', 'R&D commercialization'],
                ai_opportunities: ['Adaptive learning', 'R&D collaboration platforms'],
                adoption_level: 'medium'
            },
            {
                id: 'logistics',
                name: 'Logistics & Warehousing',
                metrics: 'Samruddhi Mahamarg | CONCOR Multi-Modal Park',
                anchor_companies: ['CONCOR', 'CWC', 'GMR Airport', 'XSIO'],
                gaps: ['Underwhelming air cargo', 'Analog warehouse tracking'],
                ai_opportunities: ['Route optimization', 'Automated warehouse management', 'Drone delivery'],
                adoption_level: 'medium'
            },
            {
                id: 'electronics-electrical',
                name: 'Electronics & Electrical',
                metrics: 'KEC International (1,200kV testing)',
                anchor_companies: ['KEC International', 'JDS Transformer', 'High Rise Transformers'],
                gaps: ['Semiconductor gap', 'Manual assembly in SMEs'],
                ai_opportunities: ['Smart grid interfaces', 'Robotic fabrication for towers'],
                adoption_level: 'medium'
            },
            {
                id: 'chemicals-pharma',
                name: 'Chemicals & Pharma',
                metrics: 'Unijules, Nitika (Exporters)',
                anchor_companies: ['Unijules', 'Nitika Pharmaceutal', 'Lupin (MIHAN)'],
                gaps: ['Limited API manufacturing', 'WHO-GMP/USFDA compliance'],
                ai_opportunities: ['Process analytical technology', 'Regulatory compliance AI'],
                adoption_level: 'low'
            },
            {
                id: 'construction',
                name: 'Construction & Real Estate',
                metrics: 'Nagpur Metro Ph 2 | Godrej, HOABL',
                anchor_companies: ['Godrej Properties', 'Kalpataru', 'Nagpur Metro'],
                gaps: ['Skilled worker shortage', 'Project delay monitoring'],
                ai_opportunities: ['AI project scheduling', 'Worker safety vision systems'],
                adoption_level: 'medium'
            },
            {
                id: 'bfsi',
                name: 'Banking & Finance',
                metrics: 'RBI Regional Office Hub',
                anchor_companies: ['RBI', 'FinVise AI', 'Nagpur Angels'],
                gaps: ['MSME credit underwriting', 'Digital financial literacy'],
                ai_opportunities: ['AI credit scoring', 'Fintech for MSMEs'],
                adoption_level: 'medium'
            },
            {
                id: 'retail-trade',
                name: 'Retail & Trade',
                metrics: 'Kalamna APMC (Asia largest mandi)',
                anchor_companies: ['VR Nagpur', 'DMart', 'Kalamna Mandi'],
                gaps: ['E-commerce competition', 'Legacy mandi operations'],
                ai_opportunities: ['Mandi price prediction', 'Inventory analytics'],
                adoption_level: 'medium'
            },
            {
                id: 'printing-publishing',
                name: 'Printing & Publishing',
                metrics: 'Lokmat (Solar-powered printing)',
                anchor_companies: ['Lokmat Media', 'The Hitavada', 'Nava Bharat'],
                gaps: ['Digital ad competition', 'Manual typesetting legacy'],
                ai_opportunities: ['Dynamic content layout', 'AI-driven ad targeting'],
                adoption_level: 'medium'
            },
            {
                id: 'hospitality-tourism',
                name: 'Hospitality & Tourism',
                metrics: 'Tadoba (Tiger Capital)',
                anchor_companies: ['Radisson Blu', 'Le Meridien', 'MTDC'],
                gaps: ['Limited international connectivity', 'Seasonal dependency'],
                ai_opportunities: ['AI concierge', 'Yield management for tourism'],
                adoption_level: 'low'
            }
        ],
        ai_opportunity_ranking: [
            { rank: 1, sector: "Automotive & Ancillaries", rationale: "High MSME density (~400) + Mahindra mega plant demand. Industry 4.0 adoption mandatory for Tier-2 suppliers." },
            { rank: 2, sector: "Textiles & Apparel", rationale: "Extreme tech gap in ginning. AI grading and supply chain tracing can revitalize 1,000+ units." },
            { rank: 3, sector: "Food Processing", rationale: "Orange processing wastage reduction (30% gap) via AI sorting and cold chain IoT." },
            { rank: 4, sector: "Steel & Metals", rationale: "Process optimization in EAFs and rolling mills for energy savings in high-tariff region." },
            { rank: 5, sector: "Chemicals & Pharma", rationale: "Regulatory compliance AI for WHO-GMP standards for SME exporters." },
            { rank: 6, sector: "Electronics & Electrical", rationale: "Smart grid equipment and robotic welding for transmission towers (KEC ecosystem)." }
        ],
        comparison_data: {
            target_city: "Mangaluru (Dakshina Kannada)",
            metrics: {
                "Industrial Focus": "Nagpur (Mining/Defense) vs Mangaluru (Port/Refinery)",
                "Anchors": "Solar/TASL (Nagpur) vs MRPL (Mangaluru)",
                "Connectivity": "Inland-Multimodal (Nagpur) vs Deepwater Port (Mangaluru)"
            },
            unique_to_region: ["Coal Mining (WCL)", "Defense Munitions", "Orange Processing"],
            unique_to_target: ["Petroleum Refining", "Shipbuilding", "Fisheries Exports"],
            shared_sectors: ["IT/ITES", "Healthcare Hub", "Education", "Agri-Tech"]
        },
        research_prompts: [
            { sector: "Automotive", prompt: "Research Mahindra's 1500-acre Nagpur plant impact on local VMC/CNC job shops." },
            { sector: "Aerospace", prompt: "Evaluate AS9100 certification readiness among Nagpur's general engineering SMEs." },
            { sector: "Textiles", prompt: "Map the automation gap in Butibori's spinning mills vs international Industry 4.0 benchmarks." },
            { sector: "Steel", prompt: "Analyze iron ore sourcing from Gadchiroli and the potential for integrated metal clusters in Nagpur." },
            { sector: "Agri-Tech", prompt: "Explore Patanjali's orange processing facility's demand for smart sorting/grading solutions." },
            { sector: "Logistics", prompt: "Identify air cargo growth bottlenecks at MIHAN despite the GMR upgrade plan." }
        ],
        stakeholders: [
            { name: 'VIA', full: 'Vidarbha Industries Association', type: 'Trade Body' },
            { name: 'MIA', full: 'MIDC Industries Association Hingna', type: 'Trade Body' },
            { name: 'BMA', full: 'Butibori Manufacturers Association', type: 'Trade Body' },
            { name: 'VEDC', full: 'Vidarbha Economic Development Council', type: 'Strategy' },
            { name: 'DIC', full: 'District Industries Center', type: 'Regulatory' }
        ]
    }
};
