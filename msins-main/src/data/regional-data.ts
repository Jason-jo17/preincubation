

export const REGIONAL_DATA: Record<string, any> = {
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
                metrics: '₹27,000+ Cr committed | Dassault Reliance, Solar, TASL',
                anchor_companies: ['Solar Industries', 'Tata Advanced Systems', 'Dassault Reliance Aerospace', 'Yantra India Ltd', 'Godrej Aerospace'],
                gaps: [
                  'AS9100 Rev D certification gaps in Tier-3 suppliers',
                  'Lack of NADCAP certified heat treatment/plating facilities',
                  'Precision tooling for exotic alloys (Titanium, Inconel)',
                  'Qualified workforce for aero-structure assembly'
                ],
                ai_opportunities: [
                  'AI-driven composite defect detection using ultrasonics',
                  'Predictive maintenance for specialized MRO rigs',
                  'Digital twins for munitions production lines',
                  'Computer vision for precision assembly alignment'
                ],
                adoption_level: 'medium'
            },
            {
                id: 'auto-ancillaries',
                name: 'Automotive & Ancillaries',
                metrics: '1,500-acre Mahindra EV facility | 400+ MSME units',
                anchor_companies: ['Mahindra & Mahindra', 'Sharda Auto', 'Sharda Ispat', 'Supreme Motors', 'International Combustion'],
                gaps: [
                  'Legacy shop-floor Industry 4.0 gap (~70% analog)',
                  'EV components manufacturing expertise (BMS, Powertrain)',
                  'High cost of CNC modernization for micro-units',
                  'Supply chain traceability for OEM compliance'
                ],
                ai_opportunities: [
                  'OEE optimization using non-intrusive bolt-on IoT',
                  'Predictive tooling replacement AI',
                  'Supplier risk assessment models',
                  'Automated visual quality inspection for die-cast parts'
                ],
                adoption_level: 'low'
            },
            {
                id: 'textiles',
                name: 'Textiles & Apparel',
                metrics: 'Indo Rama ₹3,000+ Cr | 750 Garment Unit Cluster',
                anchor_companies: ['Indo Rama Synthetics', 'Gimatex Industries', 'Orange City Garment Cluster', 'Gimatex Spinning'],
                gaps: [
                  'Outdated ginning/spinning machinery efficiency',
                  'Zero liquid discharge compliance costs',
                  'Raw material (Cotton) traceability for exports',
                  'Skill gap in automated garment stitching'
                ],
                ai_opportunities: [
                  'Computer vision for fabric defect detection',
                  'AI-driven cotton grading solutions',
                  'Predictive maintenance for spinning mills',
                  'Smart inventory management for garment clusters'
                ],
                adoption_level: 'low'
            },
            {
                id: 'logistics',
                name: 'Logistics & Multimodal Hubs',
                metrics: 'CONCOR Multi-Modal Park | Samruddhi Mahamarg Node',
                anchor_companies: ['CONCOR', 'CWC', 'GMR MIHAN Airport', 'XSIO Logistics', 'Nagpur Metro Ph-2'],
                gaps: [
                  'Under-penetrated digital WMS in domestic warehouses',
                  'Last-mile delivery fragmentation',
                  'Freight brokerage transparency',
                  'Cold-chain connectivity for Vidarbha produce'
                ],
                ai_opportunities: [
                  'Dynamic route optimization for Samruddhi corridor',
                  'Smart warehouse layout AI using heatmaps',
                  'Predictive demand forecasting for regional mandis',
                  'IoT-enabled cold chain integrity monitoring'
                ],
                adoption_level: 'medium'
            },
            {
                id: 'steel-metals',
                name: 'Steel & Metals',
                metrics: 'Sunflag ₹3,657 Cr | Lloyds Metals ₹6,721 Cr',
                anchor_companies: ['Sunflag Iron & Steel', 'Lloyds Metals (Gadchiroli)', 'Jayaswal NECO', 'Topworth Urja'],
                gaps: [
                  'Energy efficiency in EAF (Electric Arc Furnaces)',
                  'Process waste recycling (Slag/Fly-ash)',
                  'Safety monitoring in hazardous zones',
                  'Mine-to-mill logistics integration'
                ],
                ai_opportunities: [
                  'EAF energy optimization algorithms',
                  'Digital twin for rolling mill heat management',
                  'AI-powered safety vision systems for smelters',
                  'Predictive fleet maintenance for mining haulage'
                ],
                adoption_level: 'medium'
            },
            {
                id: 'food-processing',
                name: 'Food Processing & Agribusiness',
                metrics: 'Patanjali Mega Park | 50% India Manganese (MOIL)',
                anchor_companies: ['Patanjali Mega Food Park', 'Haldiram\'s', 'Dinshaw\'s Dairy', 'MOIL Limited', 'WCL'],
                gaps: [
                  'High post-harvest wastage in Citrus clusters',
                  'Lack of automated sorting/grading at source',
                  'Food safety tracking for international exports',
                  'Energy intensive cold-storage gaps'
                ],
                ai_opportunities: [
                  'AI-based orange grading and sorting',
                  'Shelf-life prediction models for perishables',
                  'Solar-powered cold chain management systems',
                  'Soil-nutrient analytics for precision farming'
                ],
                adoption_level: 'low'
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
    },
    "mumbai": {
        region_name: "Mumbai Metropolitan Region (MMR)",
        hub_type: "Financial capital, IT & Port-Led Industrial Megacity",
        correlation_score: 0.98,
        executive_summary: "Mumbai is India's financial powerhouse, contributing over 6% of the national GDP. It serves as the primary gateway for international trade through JNPT and is the de facto headquarters for major Indian banks, IT giants, and pharmaceutical leaders. The region is pivotally shifting towards high-tech manufacturing, Fintech, and deep-sea logistics.",
        economic_indicators: {
            "GSDP Contribution": "₹6.3 Lakh Cr (MMR)",
            "Financial Control": "RBI, NSE, BSE Headquarters",
            "Port Capacity": "140+ MMT (JNPT/MBPT)",
            "MSME Density": "10,000+ High-Value Units",
            "IT Sector Value": "₹1.5+ Lakh Cr",
            "Infrastructure Focus": "Trans-Harbour Link, Coastal Road"
        },
        sector_synergies: [
            "Banking ↔ Fintech (NSE/BSE Ecosystem)",
            "Port ↔ Multi-modal Logistics (JNPT Connectivity)",
            "Pharma ↔ R&D Hubs (Thane/Belapur Belt)",
            "Auto ↔ EV Engineering (Mumbai-Pune Corridor)",
            "Media ↔ Ad-Tech (Film City Hub)"
        ],
        priority_sectors: [
            {
                id: 'bfsi',
                name: 'Banking, Finance & Insurance (BFSI)',
                metrics: 'Financial Capital of India | Hub for RBI & SEBI',
                anchor_companies: ['RBI', 'SBI', 'HDFC Bank', 'ICICI Bank', 'LIC', 'NSE', 'BSE'],
                gaps: ['Legacy infrastructure in cooperative banks', 'Manual underwriting friction', 'Compliance overhead'],
                ai_opportunities: ['AI-driven credit scoring', 'Algorithmic fraud detection', 'Conversational AI for retail banking'],
                adoption_level: 'high'
            },
            {
                id: 'it-ites',
                name: 'IT & Digital Services',
                metrics: '₹1.5 Lakh Cr+ regional revenue',
                anchor_companies: ['TCS', 'Reliance Jio', 'Accenture', 'Capgemini', 'LTIMindtree'],
                gaps: ['Infrastructure costs for startups', 'Talent retention in deep-tech', 'Legacy system migration'],
                ai_opportunities: ['Generative AI for local language services', 'Cybersecurity automation', 'Predictive cloud scaling'],
                adoption_level: 'high'
            },
            {
                id: 'pharma-biotech',
                name: 'Pharmaceuticals & Life Sciences',
                metrics: 'Hub for Formulations & R&D | 30% of India\'s Pharma Value',
                anchor_companies: ['Sun Pharma', 'Cipla', 'Lupin', 'Glenmark', 'Pfizer India'],
                gaps: ['Supply chain traceability', 'WHO-GMP/USFDA compliance digitized gap', 'High R&D cost-to-market'],
                ai_opportunities: ['AI-powered clinical trial optimization', 'Blockchain for drug integrity', 'Predictive formulation analytics'],
                adoption_level: 'medium'
            },
            {
                id: 'logistics-port',
                name: 'Port & Infrastructure Logistics',
                metrics: 'JNPT - 50% of India\'s container traffic',
                anchor_companies: ['JNPT', 'MBPT', 'DP World', 'APM Terminals', 'Gateway Distriparks'],
                gaps: ['Port congestion/Truck turnaround', 'Paper-heavy documentation', 'Inter-modal friction'],
                ai_opportunities: ['Vessel arrival prediction', 'Automated customs document extraction', 'Dynamic route optimization'],
                adoption_level: 'medium'
            },
            {
                id: 'auto-ev',
                name: 'Automotive & EV Convergence',
                metrics: 'MMR & Thane-Chakan access hub',
                anchor_companies: ['Tata Motors (HQ)', 'Mahindra (HQ)', 'Mercedes-Benz (Corporate)', 'Greaves Cotton'],
                gaps: ['Charging infrastructure data silos', 'Transition to EV Tier-2 supply chain'],
                ai_opportunities: ['EV battery health prediction', 'Connected car telematics', 'Robotic assembly QA'],
                adoption_level: 'high'
            }
        ],
        ai_opportunity_ranking: [
            { rank: 1, sector: "BFSI", rationale: "Mumbai's core strength. AI transformation in risk assessment and customer experience offers multi-billion dollar impact." },
            { rank: 2, sector: "Logistics", rationale: "JNPT/MBPT modernization through AI can reduce EXIM costs by 15-20%." },
            { rank: 3, sector: "Pharma", rationale: "Leveraging AI for global regulatory compliance (USFDA) and early-stage drug discovery." },
            { rank: 4, sector: "IT & Digital", rationale: "Shift from service-based to product-based AI solutions for the financial sector." }
        ],
        stakeholders: [
            { name: 'IMC', full: 'Indian Merchants\' Chamber', type: 'Trade Body' },
            { name: 'JNPT', full: 'Jawaharlal Nehru Port Authority', type: 'Infrastructure' },
            { name: 'NASSCOM West', full: 'IT Industry Body', type: 'Strategic' },
            { name: 'MAIDC', full: 'Development Corporation', type: 'Government' }
        ]
    }
};
