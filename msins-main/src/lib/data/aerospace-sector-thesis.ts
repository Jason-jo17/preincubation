import { DetailedSectorThesis } from "../../types/msme-sector-registry";

export const AEROSPACE_SECTOR_THESIS: DetailedSectorThesis = {
  "id": "aerospace",
  "display_name": "Aerospace",
  "status": "published",
  "research_date": "Jan 17, 2026",
  "executive_summary": "India's aerospace and defense market stands at approximately USD 27-29 billion (₹2.25-2.40 lakh crore) as of 2024-25, representing roughly 2% of the global aerospace market [^1][^2]. Government and industry projections indicate the sector will reach USD 70 billion (₹5.8 lakh crore) by 2030, driven by massive commercial aviation expansion, indigenous defense manufacturing, and an emerging space economy [^1]. With defense production reaching ₹1,50,590 Cr in FY25 [^4] and exports growing at +284.5% [^3], India is emerging as a critical node in the global aerospace supply chain.",
  "key_findings": [
    "Current market size: USD 27-29 billion (₹2.25-2.40 lakh crore) in 2024-25 [^1][^2].",
    "Projected growth to USD 70 billion by 2030 at 10% CAGR [^1].",
    "Civil aviation: 85.8% of aviation market, 211 million passengers in 2024 [^5].",
    "Defense production: ₹1,50,590 crore in FY25, up 18% YoY [^4].",
    "Export growth: +284.5%, fastest among top 15 nations [^3].",
    "MRO sector: USD 2.3-3.8B with 90% outsourced [^11].",
    "OEM sourcing: Boeing $1B+, Airbus targeting $2B by 2030 [^20]."
  ],
  "investment_thesis": "Compelling growth investment with structural demand drivers, cost competitiveness (15-25% savings) [^15], policy support (₹4L crore defense procurement) [^16], and geopolitical tailwinds [^20]. Fivefold growth to USD 70B by 2030 achievable given 970+ aircraft orders and OEM commitments [^9].",
  "market_stats": {
    "current_size": 29000000000,
    "current_size_display": "$29 Billion",
    "forecast_size": 70000000000,
    "forecast_size_display": "$70 Billion",
    "cagr": 10,
    "forecast_year": 2030,
    "currency": "USD"
  },
  "market_structure": {
    "total_companies": 850,
    "msme_percentage": 45,
    "organized_split": {
      "organized": 61,
      "unorganized": 39
    },
    "geographic_distribution": {
      "Karnataka": 25,
      "Telangana": 18,
      "Maharashtra": 15,
      "Tamil Nadu": 12,
      "Gujarat": 8,
      "Uttar Pradesh": 7,
      "Others": 15
    }
  },
  "market_segments": [
    "Commerical",
    "Defense",
    "MRO",
    "Space"
  ],
  "sub_sectors": [
    {
      "name": "Commercial Aviation",
      "description": "Largest segment at 85.8% share. India operates 713 aircraft currently, projected to reach 1,522 by 2031 [^8].",
      "market_size": 15000,
      "cagr": 12.21,
      "growth_drivers": [
        "Rising middle class",
        "Regional connectivity",
        "Aircraft orders 970+"
      ],
      "key_players": [
        "IndiGo",
        "Air India",
        "SpiceJet"
      ],
      "msme_opportunity_score": 75,
      "citation_ids": [
        "c5",
        "c7",
        "c8",
        "c9"
      ]
    },
    {
      "name": "Defense Aerospace",
      "description": "Military aircraft, UAVs, weapons systems. 61.1% indigenous production [^10].",
      "market_size": 17570,
      "cagr": 5.1,
      "growth_drivers": [
        "Indigenization mandates",
        "Border security",
        "Export opportunities"
      ],
      "key_players": [
        "HAL",
        "BEL",
        "DRDO",
        "Tata Advanced Systems"
      ],
      "msme_opportunity_score": 65,
      "citation_ids": [
        "c4",
        "c6",
        "c10",
        "c16"
      ]
    },
    {
      "name": "MRO Services",
      "description": "90% outsourced currently, targeting 90% self-sufficiency by 2040 [^11].",
      "market_size": 3800,
      "cagr": 10.3,
      "growth_drivers": [
        "GST reduction to 5%",
        "Growing fleet",
        "Government support"
      ],
      "key_players": [
        "Air India Engineering",
        "GMR Aero Technic",
        "Air Works"
      ],
      "msme_opportunity_score": 85,
      "citation_ids": [
        "c11"
      ]
    }
  ],
  "growth_drivers": [
    {
      "name": "Commercial Aviation Expansion",
      "type": "demand_side",
      "impact_level": "high",
      "description": "India 5th largest aviation market [^8] with 211M passengers. Order book of 970+ aircraft [^9].",
      "estimated_impact_percentage": 30,
      "citation_ids": [
        "c5",
        "c8",
        "c9"
      ]
    },
    {
      "name": "Defense Indigenization Mandates",
      "type": "policy",
      "impact_level": "high",
      "description": "Positive Indigenisation Lists embargo 346+ items. ₹4L crore contracts 2025-27 [^16].",
      "estimated_impact_percentage": 25,
      "citation_ids": [
        "c4",
        "c6",
        "c10",
        "c16"
      ]
    }
  ],
  "opportunities": [
    {
      "title": "MRO Specialized Services",
      "type": "service",
      "description": "Engine overhaul, landing gear, APU maintenance - 90% currently outsourced [^11].",
      "market_size_estimate": 3200,
      "overall_score": 8.5,
      "capital_requirement": "₹5-20 Cr",
      "time_to_market_months": 24,
      "citation_ids": [
        "c11"
      ]
    },
    {
      "title": "UAV/Drone Manufacturing",
      "type": "product",
      "description": "Agricultural, surveillance, delivery drones.",
      "market_size_estimate": 1800,
      "overall_score": 8,
      "capital_requirement": "₹25-100 Lakhs",
      "time_to_market_months": 12
    }
  ],
  "policies": [
    {
      "name": "Make in India - Aerospace",
      "type": "Industrial Policy",
      "description": "75% defense capex reserved for domestic industry [^16].",
      "impact": "High",
      "status": "active",
      "citation_ids": [
        "c16"
      ]
    },
    {
      "name": "UDAN Scheme",
      "type": "Connectivity Policy",
      "description": "Regional connectivity targets 120 new destinations carrying 4 crore passengers [^17].",
      "impact": "Medium",
      "status": "active",
      "citation_ids": [
        "c17"
      ]
    },
    {
      "name": "MRO GST Reduction",
      "type": "Tax Incentive",
      "description": "Reduced from 18% to 5% to compete with Singapore/Dubai [^11].",
      "impact": "High",
      "status": "active",
      "citation_ids": [
        "c11"
      ]
    }
  ],
  "risks": [
    {
      "name": "Technology Dependency",
      "category": "technology",
      "severity": "high",
      "probability": 0.8,
      "description": "Dependence on foreign engines and avionics.",
      "mitigation": [
        "Indigenous R&D",
        "Tech transfer agreements"
      ],
      "citation_ids": []
    },
    {
      "name": "Capital Intensity",
      "category": "financial",
      "severity": "high",
      "probability": 0.85,
      "description": "High capex for facilities and certification.",
      "mitigation": [
        "PLI utilization",
        "Strategic investors"
      ],
      "citation_ids": []
    }
  ],
  "competitors": [
    {
      "name": "HAL",
      "type": "public_sector",
      "revenue": 28000,
      "market_share": 35,
      "key_strengths": [
        "Government backing",
        "Monopoly on military aircraft"
      ],
      "citation_ids": []
    },
    {
      "name": "Tata Advanced Systems",
      "type": "private_sector",
      "revenue": 9500,
      "market_share": 12,
      "key_strengths": [
        "Boeing/Lockheed JVs",
        "Modern facilities"
      ],
      "citation_ids": []
    }
  ],
  "market_stats_history": [
    {
      "year": 2023,
      "market_size": 23200,
      "growth_rate": 15
    },
    {
      "year": 2024,
      "market_size": 25500,
      "growth_rate": 10,
      "citation_ids": [
        "c1",
        "c2"
      ]
    },
    {
      "year": 2025,
      "market_size": 29000,
      "growth_rate": 13,
      "citation_ids": [
        "c1"
      ]
    },
    {
      "year": 2030,
      "market_size": 70000,
      "growth_rate": 10,
      "citation_ids": [
        "c1"
      ]
    }
  ],
  "emerging_companies": [
    {
      "id": "aeq-001",
      "name": "Aequs Limited",
      "description": "Precision aerospace manufacturing"
    },
    {
      "id": "dyn-001",
      "name": "Dynamatic Technologies",
      "description": "Aerostructures and hydraulics"
    },
    {
      "id": "taal-001",
      "name": "Taneja Aerospace",
      "description": "Aviation structural assemblies"
    }
  ],
  "citations": [
    {
      "id": "c1",
      "citation_key": "MMI_2024_aerospace_trajectory",
      "citation_number": 1,
      "source_type": "industry",
      "source_name": "Modern Manufacturing India",
      "publication_year": 2024,
      "title": "Indian Aerospace Industry: On a High Growth Trajectory",
      "url": "https://www.mmindia.co.in/article/93/indian-aerospace-industry-on-a-high-growth-trajectory",
      "reliability_score": 8,
      "tags": [
        "aerospace",
        "market_size",
        "growth"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "India aerospace market projected to reach USD 70 billion by 2030"
    },
    {
      "id": "c2",
      "citation_key": "CMI_2024_aerospace_defence",
      "citation_number": 2,
      "source_type": "report",
      "source_name": "Custom Market Insights",
      "publication_year": 2024,
      "title": "India Aerospace and Defence Market Size, Trends, Share 2033",
      "url": "https://www.custommarketinsights.com/report/india-aerospace-and-defence-market/",
      "reliability_score": 8,
      "tags": [
        "aerospace",
        "defense",
        "market_size"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Current market size USD 27-29 billion in 2024"
    },
    {
      "id": "c3",
      "citation_key": "WTE_2024_aerospace_exports",
      "citation_number": 3,
      "source_type": "industry",
      "source_name": "World's Top Exports",
      "publication_year": 2024,
      "title": "Aerospace Exports by Country 2024",
      "url": "https://www.worldstopexports.com/aerospace-exports-by-country/",
      "reliability_score": 7,
      "tags": [
        "aerospace",
        "exports",
        "trade"
      ],
      "geographic_focus": [
        "India",
        "Global"
      ],
      "excerpt": "India achieved fastest aerospace export growth +284.5% in 2024"
    },
    {
      "id": "c4",
      "citation_key": "VisionIAS_2025_defence_exports",
      "citation_number": 4,
      "source_type": "academic",
      "source_name": "Vision IAS",
      "publication_year": 2025,
      "title": "India's Defence Exports",
      "url": "https://visionias.in/current-affairs/monthly-magazine/2025-05-17/security/indias-defence-exports-1",
      "reliability_score": 8,
      "tags": [
        "defense",
        "production",
        "exports"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Defense production reached ₹1,50,590 crore (USD 17.57 billion) in FY25"
    },
    {
      "id": "c5",
      "citation_key": "IMARC_2024_india_aviation",
      "citation_number": 5,
      "source_type": "report",
      "source_name": "IMARC Group",
      "publication_year": 2024,
      "title": "India Aviation Market Size, Share, Growth and Outlook, 2033",
      "url": "https://www.imarcgroup.com/india-aviation-market",
      "reliability_score": 9,
      "tags": [
        "aviation",
        "market_size",
        "forecast"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "India is the world's tenth-largest civil aviation market and third-largest domestic aviation market"
    },
    {
      "id": "c6",
      "citation_key": "PIB_2025_defence_exports_surge",
      "citation_number": 6,
      "source_type": "government",
      "source_name": "Press Information Bureau",
      "publication_year": 2025,
      "title": "Defence exports surge to a record high of Rs 23,622 crore",
      "url": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2117348",
      "reliability_score": 10,
      "tags": [
        "defense",
        "exports",
        "government"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Defence exports target: ₹50,000 crore (USD 6 billion) by FY29"
    },
    {
      "id": "c7",
      "citation_key": "Mordor_2024_india_aviation",
      "citation_number": 7,
      "source_type": "report",
      "source_name": "Mordor Intelligence",
      "publication_year": 2024,
      "title": "India Aviation Market Size, Share 2030 Report",
      "url": "https://www.mordorintelligence.com/industry-reports/analysis-of-aviation-industry-in-india",
      "reliability_score": 8,
      "tags": [
        "aviation",
        "forecast",
        "cagr"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "12.03% CAGR for aviation through 2030"
    },
    {
      "id": "c8",
      "citation_key": "NOA_2024_aviation_rank",
      "citation_number": 8,
      "source_type": "government",
      "source_name": "News on Air",
      "publication_year": 2024,
      "title": "India Emerges as World's 5th Biggest Aviation Market in 2024",
      "url": "https://www.newsonair.gov.in/india-emerges-as-worlds-5th-biggest-aviation-market-in-2024/",
      "reliability_score": 9,
      "tags": [
        "aviation",
        "fleet",
        "ranking"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "India operates 713 aircraft currently, projected to reach 1,522 by 2031"
    },
    {
      "id": "c9",
      "citation_key": "Secretariat_2024_aerospace_rise",
      "citation_number": 9,
      "source_type": "news",
      "source_name": "The Secretariat News",
      "publication_year": 2024,
      "title": "Indian Aerospace Manufacturing On The Rise",
      "url": "https://thesecretariat.in/article/indian-aerospace-manufacturing-on-the-rise",
      "reliability_score": 7,
      "tags": [
        "aerospace",
        "manufacturing",
        "orders"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "India holds orders for 970+ aircraft from Boeing and Airbus"
    },
    {
      "id": "c10",
      "citation_key": "Gymkhana_2025_defence_inflection",
      "citation_number": 10,
      "source_type": "industry",
      "source_name": "Gymkhana Partners",
      "publication_year": 2025,
      "title": "Major sector inflection: India defense and aerospace",
      "url": "https://www.gymkhanapartners.com/dispatches/major-sector-inflection-india-defense-and-aerospace",
      "reliability_score": 8,
      "tags": [
        "defense",
        "indigenous",
        "manufacturing"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Indigenous defense production now constitutes 61.1% of the market"
    },
    {
      "id": "c11",
      "citation_key": "IBEF_2024_mro_trends",
      "citation_number": 11,
      "source_type": "government",
      "source_name": "IBEF",
      "publication_year": 2024,
      "title": "India's MRO Industry: Future Trends & Growth Opportunities",
      "url": "https://www.ibef.org/blogs/the-future-of-the-mro-industry-in-india-trends-and-opportunities",
      "reliability_score": 9,
      "tags": [
        "mro",
        "market_size",
        "policy"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "MRO sector USD 2.3-3.8B, 90% outsourced, GST reduced to 5%"
    },
    {
      "id": "c12",
      "citation_key": "GVR_2024_aerospace_parts",
      "citation_number": 12,
      "source_type": "report",
      "source_name": "Grand View Research",
      "publication_year": 2024,
      "title": "India Aerospace Parts Manufacturing Market To Reach $21.48Bn",
      "url": "https://www.grandviewresearch.com/press-release/india-aerospace-parts-manufacturing-market-analysis",
      "reliability_score": 9,
      "tags": [
        "aerospace",
        "manufacturing",
        "supply_chain"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Aerospace manufacturing USD 13.6B in 2023, projected USD 21.48B by 2030"
    },
    {
      "id": "c13",
      "citation_key": "FlightGlobal_2024_india_china",
      "citation_number": 13,
      "source_type": "industry",
      "source_name": "Flight Global",
      "publication_year": 2024,
      "title": "India to eclipse China as aerospace's next frontier",
      "url": "https://www.flightglobal.com/aerospace/india-to-eclipse-china-as-aerospaces-next-frontier/152186.article",
      "reliability_score": 9,
      "tags": [
        "aerospace",
        "competitiveness",
        "cost"
      ],
      "geographic_focus": [
        "India",
        "Global"
      ],
      "excerpt": "Hyderabad ranks #1 globally for aerospace cost-effectiveness"
    },
    {
      "id": "c14",
      "citation_key": "Mordor_2024_aviation_defence_space",
      "citation_number": 14,
      "source_type": "report",
      "source_name": "Mordor Intelligence",
      "publication_year": 2024,
      "title": "India Aviation, Defense, And Space Market Size & Share Analysis",
      "url": "https://www.mordorintelligence.com/industry-reports/india-aviation-defense-and-space-market",
      "reliability_score": 8,
      "tags": [
        "space",
        "market_size",
        "startups"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Space sector USD 8.4-9B in 2024, targeting USD 44B by 2033; 400+ private space enterprises"
    },
    {
      "id": "c15",
      "citation_key": "ITA_2024_india_aerospace_defence",
      "citation_number": 15,
      "source_type": "government",
      "source_name": "International Trade Administration",
      "publication_year": 2024,
      "title": "India - Aerospace and Defense",
      "url": "https://www.trade.gov/country-commercial-guides/india-aerospace-and-defense",
      "reliability_score": 10,
      "tags": [
        "aerospace",
        "cost_competitiveness",
        "supply_chain"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Cost advantages of 15-25% in manufacturing with additional 10-20% savings through local sourcing"
    },
    {
      "id": "c16",
      "citation_key": "IBEF_2024_defence_manufacturing",
      "citation_number": 16,
      "source_type": "government",
      "source_name": "IBEF",
      "publication_year": 2024,
      "title": "India's Defence Manufacturing Industry Revolutionizing Exports",
      "url": "https://www.ibef.org/industry/defence-manufacturing",
      "reliability_score": 9,
      "tags": [
        "defense",
        "industrial_policy",
        "infrastructure"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Defense Industrial Corridors: ₹8,658 crore investments, 253 MoUs"
    },
    {
      "id": "c17",
      "citation_key": "InvestIndia_2024_civil_aviation",
      "citation_number": 17,
      "source_type": "government",
      "source_name": "Invest India",
      "publication_year": 2024,
      "title": "Investment Opportunities in Civil Aviation",
      "url": "https://www.investindia.gov.in/sector/civil-aviation",
      "reliability_score": 9,
      "tags": [
        "aviation",
        "policy",
        "infrastructure"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "UDAN regional connectivity targets 120 new destinations"
    },
    {
      "id": "c18",
      "citation_key": "IMARC_2024_aircraft_components",
      "citation_number": 18,
      "source_type": "report",
      "source_name": "IMARC Group",
      "publication_year": 2024,
      "title": "India Aircraft Components Market Size, Share",
      "url": "https://www.imarcgroup.com/india-aircraft-components-market",
      "reliability_score": 8,
      "tags": [
        "aerospace",
        "components",
        "supply_chain"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Aircraft components market USD 16.22B in 2024"
    },
    {
      "id": "c19",
      "citation_key": "AviationA2Z_2025_global_hub",
      "citation_number": 19,
      "source_type": "industry",
      "source_name": "Aviation A2Z",
      "publication_year": 2025,
      "title": "India is Becoming a Global Aerospace Hub",
      "url": "https://aviationa2z.com/index.php/2025/10/23/india-is-becoming-a-global-aerospace-hub/",
      "reliability_score": 7,
      "tags": [
        "aerospace",
        "supply_chain",
        "global"
      ],
      "geographic_focus": [
        "India",
        "Global"
      ],
      "excerpt": "India targeting 10% of global aerospace supply chain by 2033"
    },
    {
      "id": "c20",
      "citation_key": "BizStd_2025_supply_chain_crisis",
      "citation_number": 20,
      "source_type": "news",
      "source_name": "Business Standard",
      "publication_year": 2025,
      "title": "Global aerospace firms turn to India amid Western supply chain crisis",
      "url": "https://www.business-standard.com/external-affairs-defence-security/news/global-aerospace-firms-turn-to-india-amid-western-supply-chain-crisis-125021700469_1.html",
      "reliability_score": 8,
      "tags": [
        "aerospace",
        "oem_sourcing",
        "supply_chain"
      ],
      "geographic_focus": [
        "India",
        "Global"
      ],
      "excerpt": "Boeing sources over $1B annually, Airbus targets $2B by 2030"
    },
    {
      "id": "c21",
      "citation_key": "IMARC_2024_aerospace_composites",
      "citation_number": 21,
      "source_type": "report",
      "source_name": "IMARC Group",
      "publication_year": 2024,
      "title": "India Aerospace Composites Market Size, Share | 2033",
      "url": "https://www.imarcgroup.com/india-aerospace-composites-market",
      "reliability_score": 8,
      "tags": [
        "aerospace",
        "composites",
        "materials"
      ],
      "geographic_focus": [
        "India"
      ],
      "excerpt": "Aerospace composites $330.2M in 2024, projected $690.6M by 2033"
    },
    {
      "id": "c22",
      "citation_key": "Brigade_2024_devanahalli_hub",
      "citation_number": 22,
      "source_type": "industry",
      "source_name": "Brigade Group",
      "publication_year": 2024,
      "title": "How Devanahalli is emerging as a major commercial hub",
      "url": "https://www.brigadegroup.com/blog/general/how-devanahalli-is-emerging-as-a-major-commercial-hub-of-bengaluru",
      "reliability_score": 7,
      "tags": [
        "aerospace",
        "infrastructure",
        "regional"
      ],
      "geographic_focus": [
        "India",
        "Karnataka"
      ],
      "excerpt": "Karnataka: 25% of aircraft/spacecraft industry, 65% aerospace exports"
    }
  ]
};
