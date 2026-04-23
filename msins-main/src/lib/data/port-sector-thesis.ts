import { DetailedSectorThesis } from "../../types/msme-sector-registry";

export const PORT_SECTOR_THESIS: DetailedSectorThesis = {
  id: "port-logistics",
  display_name: "Port & Logistics (Mangalore)",
  status: "published",
  research_date: "Mar 30, 2026",
  executive_summary: "Mangalore is the gateway to Karnataka, with New Mangalore Port (NMPA) handling over 46 MMT of cargo in FY25. The sector is critical for petroleum, coal, and coffee exports [^mng1].",
  key_findings: [
    "46.01 MMT throughput in FY25.",
    "Second largest port in India for petroleum shipments.",
    "Analog fragmentation in customs and last-mile connectivity.",
    "Low AI adoption currently, high mismatch in CFS utilization."
  ],
  investment_thesis: "Digitalization of the port-hinterland corridor. Opportunity for MSMEs in smart warehousing, IoT-enabled container tracking, and AI-driven customs automation.",
  market_stats: {
    current_size: 150000000000,
    current_size_display: "₹15,000 Cr",
    forecast_size: 280000000000,
    forecast_size_display: "₹28,000 Cr",
    cagr: 11,
    forecast_year: 2030,
    currency: "INR"
  },
  market_structure: {
    total_companies: 450,
    msme_percentage: 82,
    organized_split: {
      organized: 40,
      unorganized: 60
    },
    geographic_distribution: {
      "Panambur": 70,
      "Bunder": 20,
      "Others": 10
    }
  },
  market_segments: [
    "Port Ops",
    "Warehousing",
    "CFS",
    "Last-Mile"
  ],
  sub_sectors: [
    {
      name: "Reefer & Cold Chain",
      description: "Critical for Mangalore's high-value seafood and pharmaceutical exports.",
      market_size: 450,
      cagr: 14.5,
      growth_drivers: [
        "High-value seafood exports",
        "Pharma cluster growth"
      ],
      key_players: [
        "NMPA Logistics",
        "Master Marine"
      ],
      msme_opportunity_score: 92,
      citation_ids: [
        "mng1"
      ]
    },
    {
      name: "Blockchain Customs Clearing",
      description: "Digitalizing the 'Analog Choke' in EXIM documentation.",
      market_size: 120,
      cagr: 22,
      growth_drivers: [
        "Digital India Port mission",
        "Paperless trade policy"
      ],
      key_players: [
        "Customs House Agents",
        "Local Tech MSMEs"
      ],
      msme_opportunity_score: 95,
      citation_ids: [
        "mng1"
      ]
    }
  ],
  growth_drivers: [
    {
      name: "Sagarmala NMPA Expansion",
      type: "supply_side",
      impact_level: "high",
      description: "Deepening of drafts to handle larger vessels.",
      estimated_impact_percentage: 25,
      citation_ids: ["mng1"]
    },
    {
      name: "MRPL Petchem Expansion",
      type: "demand_side",
      impact_level: "high",
      description: "Increased demand for specialized chemical logistics.",
      estimated_impact_percentage: 40,
      citation_ids: ["mng1"]
    }
  ],
  opportunities: [
    {
      title: "Automated Reefer Monitoring",
      type: "product",
      description: "IoT sensors for real-time temp tracking of seafood containers to prevent spoilage.",
      market_size_estimate: 80,
      overall_score: 9.2,
      capital_requirement: "Low",
      time_to_market_months: 6
    },
    {
      title: "Smart Warehouse Management",
      type: "service",
      description: "AI-driven inventory slots for Mangalore's fragmented CFS landscape.",
      market_size_estimate: 150,
      overall_score: 8.8,
      capital_requirement: "Medium",
      time_to_market_months: 9
    }
  ],
  policies: [
    {
      name: "PM Gati Shakti",
      type: "supply_side",
      description: "Multimodal connectivity for port-hinterland flow.",
      impact: "High",
      status: "active",
      citation_ids: ["mng1"]
    }
  ],
  risks: [
    {
      name: "Draft Limitations",
      category: "market",
      severity: "medium",
      probability: 0.3,
      description: "Silting issues during monsoons affecting larger vessels.",
      mitigation: [
        "Annual maintenance dredging",
        "Tide-based vessel scheduling",
        "Breakwater enhancement"
      ],
      citation_ids: ["mng1"]
    }
  ],
  competitors: [],
  market_stats_history: [],
  emerging_companies: [
    {
      id: "shiprocket-mng",
      name: "SmartPort IoT",
      description: "Local startup providing container tracking sensors."
    }
  ],
  citations: [
    {
      id: "mng1",
      citation_key: "MNG_INTEL_2025",
      citation_number: 1,
      source_type: "report",
      source_name: "Mangalore Industrial Intelligence Map",
      publication_year: 2025,
      title: "Mangalore 18 Economic Sectors: A Complete Industrial Intelligence Map",
      url: "",
      reliability_score: 10,
      tags: [
        "mangalore",
        "dakshina_kannada",
        "gsdp"
      ],
      geographic_focus: [
        "Mangalore"
      ],
      excerpt: "Mangalore is India's 8th richest district by per capita GDP (₹6.69 lakh)."
    }
  ]
};
