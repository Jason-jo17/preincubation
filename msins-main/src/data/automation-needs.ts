import { SectorAutomationNeed } from "../types/automation";

export const DEMO_AUTOMATION_NEEDS: SectorAutomationNeed[] = [
  // Manufacturing
  {
    id: "need-mfg-1",
    sector_id: "sector-mfg",
    title: "AI-Powered Visual Quality Inspection",
    slug: "ai-visual-quality-inspection",
    description: "Deploy computer vision for automated defect detection on production lines, replacing manual visual inspection with 99.9% accuracy.",
    automation_type: "computer_vision",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 35,
    implementation_complexity: "medium",
    time_to_value_weeks: 12,
    target_company_size: ["Medium", "Large"],
    target_employee_range: "50-500",
    target_revenue_range: "₹10Cr - ₹100Cr",
    prerequisite_tech_maturity: "High - Requires existing camera infrastructure or new IoT gateway.",
    tech_stack_suggested: {
      primary: ["Python", "TensorFlow/PyTorch", "OpenCV"],
      secondary: ["FastAPI", "PostgreSQL", "Redis"],
      edge: ["NVIDIA Jetson", "Intel NCS"]
    },
    data_requirements: {
      structured: ["Defect Logs", "Production Speed"],
      unstructured: ["High-res Images", "Video Streams"]
    },
    research_citations: [
      { title: "Deep Learning for Industrial Defect Detection", source: "IEEE Trans. Ind. Inf.", year: 2023 }
    ],
    industry_benchmarks: {
      metric: "Defect Rate",
      current_avg: "4.5% (Manual)",
      potential_improvement: "0.5% (AI)"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["AI", "Quality", "Manufacturing"],
    discovery_insight: {
      session_id: "mosi-1",
      rationale: "Stakeholder Rajesh Kumar explicitly called out manual QC bottlenecks in the finishing department.",
      confidence: 0.95,
      quote: "Our finishing line is currently our biggest headache... human error in visual inspection is costing us 4% in rejections."
    }
  },
  {
    id: "need-mfg-2",
    sector_id: "sector-mfg",
    title: "Predictive Maintenance System",
    slug: "predictive-maintenance",
    description: "ML-based prediction of equipment failures to enable proactive maintenance scheduling and reduce downtime.",
    automation_type: "predictive_analytics",
    ceed_quadrant: "efficiency",
    impact_level: "transformative",
    estimated_roi_percentage: 45,
    implementation_complexity: "high",
    time_to_value_weeks: 16,
    target_company_size: ["Medium", "Large"],
    target_employee_range: "50-200",
    target_revenue_range: "₹20Cr+",
    prerequisite_tech_maturity: "Medium - Requires sensor data integration (Vibration, Temperature).",
    tech_stack_suggested: {
        primary: ["Python", "Scikit-Learn", "Azure IoT Hub"],
        secondary: ["Grafana", "InfluxDB"]
    },
    data_requirements: {
        real_time: ["Vibration Sensor Data", "Current Usage"]
    },
    research_citations: [],
    industry_benchmarks: {
        metric: "Uptime",
        current_avg: "85%",
        potential_improvement: "98%"
    },
    status: "published",
    is_featured: true,
    priority_rank: 2,
    tags: ["IoT", "Maintenance", "Analytics"],
    discovery_insight: {
      session_id: "mosi-1",
      rationale: "Interview evidence suggests die-heater failures are a core cause of unplanned downtime.",
      confidence: 0.88
    }
  },
  // BFSI
  {
    id: "need-bfsi-1",
    sector_id: "sector-bfsi",
    title: "AI-Powered MSME Credit Scoring",
    slug: "ai-credit-scoring",
    description: "Alternative credit scoring using transaction data, GST returns, and business patterns for faster loan processing.",
    automation_type: "predictive_analytics",
    ceed_quadrant: "disruption",
    impact_level: "transformative",
    estimated_roi_percentage: 50,
    implementation_complexity: "high",
    time_to_value_weeks: 20,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "10-100",
    target_revenue_range: "₹5Cr - ₹50Cr",
    prerequisite_tech_maturity: "High - Requires API access to banking and GST portals.",
    tech_stack_suggested: {
        primary: ["Python", "XGBoost", "FastAPI"],
        secondary: ["AWS SageMaker", "MongoDB"]
    },
    data_requirements: {
        structured: ["Bank Statements", "GST Returns", "Trade History"]
    },
    research_citations: [],
    industry_benchmarks: {
        metric: "Approval Time",
        current_avg: "14 Days",
        potential_improvement: "2 Hours"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["FinTech", "Credit", "AI"],
    discovery_insight: {
      session_id: "mosi-2",
      rationale: "Operations head identified specialized battery component design as the primary hurdle for EV expansion.",
      confidence: 0.92,
      quote: "We want to move into the EV space, but the precision requirements for battery housings are beyond our current manual design capability."
    }
  },
  // Logistics
  {
    id: "need-log-1",
    sector_id: "sector-log",
    title: "Autonomous Mobile Robot (AMR) Integration",
    slug: "amr-warehouse-logistics",
    description: "Low-cost AMRs for MSME warehouses to automate order picking and material movement, reducing labor intensity by 60%.",
    automation_type: "supply_chain_automation",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 30,
    implementation_complexity: "medium",
    time_to_value_weeks: 14,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "20-100",
    target_revenue_range: "₹2Cr - ₹20Cr",
    prerequisite_tech_maturity: "Medium - Requires flat flooring and WiFi coverage.",
    tech_stack_suggested: {
        primary: ["ROS2", "SLAM Algorithms", "Python"],
        secondary: ["LiDAR Plugins", "MQTT"]
    },
    data_requirements: {
        real_time: ["Lidar Map Stream", "Battery Status"]
    },
    research_citations: [
      { title: "AMR Adoption in MSMEs", source: "IMF Industrial Report", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Pick Rate",
      current_avg: "40 Items/Hr",
      potential_improvement: "120 Items/Hr"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["Robotics", "Logistics", "Warehouse"]
  },
  {
    id: "need-log-2",
    sector_id: "sector-log",
    title: "Last-Mile Delivery Route Optimization",
    slug: "last-mile-route-optimization",
    description: "AI-driven dynamic routing for last-mile delivery fleets, reducing fuel costs and delivery times through real-time traffic and demand signal integration.",
    automation_type: "predictive_analytics",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 22,
    implementation_complexity: "medium",
    time_to_value_weeks: 10,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "10-200",
    target_revenue_range: "₹1Cr - ₹30Cr",
    prerequisite_tech_maturity: "Low - Requires GPS-enabled vehicles.",
    tech_stack_suggested: {
        primary: ["Python", "Google OR-Tools", "FastAPI"],
        secondary: ["Redis", "PostgreSQL"]
    },
    data_requirements: {
        real_time: ["GPS Coordinates", "Traffic API"],
        structured: ["Order Manifest", "Delivery History"]
    },
    research_citations: [],
    industry_benchmarks: {
      metric: "Fuel Cost per Delivery",
      current_avg: "₹45",
      potential_improvement: "₹28"
    },
    status: "published",
    is_featured: false,
    priority_rank: 2,
    tags: ["Logistics", "AI", "Fleet"]
  },
  // Healthcare
  {
    id: "need-health-1",
    sector_id: "sector-health",
    title: "AI-Driven Radiology Triage Assistant",
    slug: "radiology-triage-ai",
    description: "Automated scan analysis to flag urgent anomalies (strokes, fractures) for immediate radiologist review in resource-constrained MSME clinics.",
    automation_type: "computer_vision",
    ceed_quadrant: "disruption",
    impact_level: "transformative",
    estimated_roi_percentage: 40,
    implementation_complexity: "high",
    time_to_value_weeks: 18,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "5-50",
    target_revenue_range: "₹1Cr - ₹15Cr",
    prerequisite_tech_maturity: "High - Requires DICOM integration and cloud processing.",
    tech_stack_suggested: {
        primary: ["PyTorch", "MONAI", "FastAPI"],
        secondary: ["Orthanc DICOM Server", "Next.js"]
    },
    data_requirements: {
        unstructured: ["DICOM Images", "Patient History"]
    },
    research_citations: [],
    industry_benchmarks: {
      metric: "TAT (Turnaround Time)",
      current_avg: "6 Hours",
      potential_improvement: "15 Minutes"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["Healthcare", "AI", "Diagnostics"]
  },
  // Aerospace
  {
    id: "need-aero-1",
    sector_id: "aerospace",
    title: "AI-Integrated RFQ & Quote Optimization",
    slug: "aerospace-rfq-automation",
    description: "Automate the complex RFQ analysis for aerospace components. Extract technical specs from blueprints and automatically calculate BOM costs with supplier lead-time predictions.",
    automation_type: "nlp_automation",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 28,
    implementation_complexity: "medium",
    time_to_value_weeks: 14,
    target_company_size: ["Medium", "Large"],
    target_employee_range: "100-1000",
    target_revenue_range: "₹50Cr - ₹500Cr",
    prerequisite_tech_maturity: "High - Requies digitized historical RFQ data and ERP integration.",
    tech_stack_suggested: {
      primary: ["Python", "OpenAI GPT-4 (Vision)", "FastAPI"],
      secondary: ["PostgreSQL", "React", "Docker"]
    },
    data_requirements: {
      unstructured: ["PDF Drawings", "Excel RFQ Sheets", "Email History"],
      structured: ["Material Price Indices", "Internal Labor Rates"]
    },
    research_citations: [
      { title: "Digitalization in Aerospace Supply Chains", source: "Deloitte Aerospace Report", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Quote Turnaround",
      current_avg: "12 Days",
      potential_improvement: "2 Days"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["Aerospace", "NLP", "Supply Chain"],
    discovery_insight: {
      session_id: "mosi-1",
      rationale: "CEO Aravind Melligeri highlighted the efficiency lag in quoting complex structural components.",
      confidence: 0.94,
      quote: "Automated RFQ processing would allow us to bid on 3x more contracts with the same engineering headcount."
    }
  },
  {
    id: "need-mfg-nagpur-1",
    sector_id: "manufacturing-engineering-nagpur",
    title: "SME-Native Robotic Welding Cell",
    slug: "sme-robotic-welding-cell",
    description: "Compact, affordable 6-axis robotic welding cells designed specifically for Nagpur's tier-2/3 vendors, reducing reliance on specialized labor and improving consistency.",
    automation_type: "process_automation",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 32,
    implementation_complexity: "medium",
    time_to_value_weeks: 14,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "20-150",
    target_revenue_range: "₹5Cr - ₹25Cr",
    prerequisite_tech_maturity: "Medium - Requires stable power and basic digital safety fencing.",
    tech_stack_suggested: {
      primary: ["Robot Language (KRL/AS)", "PLC (Siemens/Beckhoff)", "Python"],
      secondary: ["ROS2", "OpenCV for seam tracking"]
    },
    data_requirements: {
      real_time: ["Spatter count", "Cycle time", "Welding current"],
      structured: ["Job IDs", "Yield Rate"]
    },
    research_citations: [
      { title: "Robotics Penetration in Vidarbha MSMEs", source: "VNIT Research Paper", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Weld Consistency",
      current_avg: "78% (Manual)",
      potential_improvement: "99.2% (Robotic)"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["Robotics", "Welding", "Nagpur"],
    discovery_insight: {
      session_id: "nagpur-mfg-001",
      rationale: "Ashta Tech (ata-001) serves 50+ local MSMEs with this exact requirement.",
      confidence: 0.98,
      quote: "The scarcity of certified manual welders in Hingna MIDC is our primary growth bottleneck."
    }
  }
];
