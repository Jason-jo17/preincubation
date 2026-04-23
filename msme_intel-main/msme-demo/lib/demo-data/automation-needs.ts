import { SectorAutomationNeed } from "../types/automation-needs";

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
    id: "need-aero-2",
    sector_id: "aerospace",
    title: "Predictive Health Monitoring for Heavy Forging Presses",
    slug: "forging-press-predictive-maintenance",
    description: "IoT-based monitoring for high-tonnage (10,000T+) forging presses. Uses vibration and hydraulic pressure analysis to predict seal failures and ram misalignments.",
    automation_type: "predictive_analytics",
    ceed_quadrant: "core",
    impact_level: "transformative",
    estimated_roi_percentage: 42,
    implementation_complexity: "high",
    time_to_value_weeks: 18,
    target_company_size: ["Large"],
    target_employee_range: "500+",
    target_revenue_range: "₹100Cr+",
    prerequisite_tech_maturity: "Medium - Requires industrial sensor retrofitting on hydraulic lines.",
    tech_stack_suggested: {
      primary: ["Python", "InfluxDB", "Grafana"],
      secondary: ["Azure IoT Edge", "Spark Streaming"]
    },
    data_requirements: {
      real_time: ["Vibration (10kHz)", "Hydraulic Pressure", "Oil Temp"],
      structured: ["Maintenance Logs", "Production Cycles"]
    },
    research_citations: [
      { title: "Predictive Maintenance for Hydraulic Systems", source: "MIT Industrial Press", year: 2023 }
    ],
    industry_benchmarks: {
      metric: "Unplanned Downtime",
      current_avg: "14% Annual",
      potential_improvement: "2% Annual"
    },
    status: "published",
    is_featured: true,
    priority_rank: 2,
    tags: ["Aerospace", "IoT", "Maintenance"],
    discovery_insight: {
      session_id: "mosi-1",
      rationale: "Aequs operational bottleneck identified as the 10,000-ton press downtime.",
      confidence: 0.88
    }
  },
  {
    id: "need-aero-3",
    sector_id: "aerospace",
    title: "Digital Twin for Multi-Axis CNC Machining",
    slug: "cnc-digital-twin-optimization",
    description: "Virtual replica of 5-axis machining centers to optimize tool paths, reduce scrap for titanium alloys, and predict tool wear in real-time.",
    automation_type: "iot_integration",
    ceed_quadrant: "disruption",
    impact_level: "high",
    estimated_roi_percentage: 35,
    implementation_complexity: "very_high",
    time_to_value_weeks: 24,
    target_company_size: ["Medium", "Large"],
    target_employee_range: "100-500",
    target_revenue_range: "₹20Cr+",
    prerequisite_tech_maturity: "High - Requires modern CNC controllers (Fanuc/Siemens) with API access.",
    tech_stack_suggested: {
      primary: ["NVIDIA Omniverse", "Siemens MindSphere", "C++"],
      secondary: ["Python", "Unity3D", "MQTT"]
    },
    data_requirements: {
      real_time: ["Spindle Load", "X/Y/Z Coordinates", "Coolant Flow"],
      unstructured: ["G-Code Archives", "3D CAD Models (STEP/IGES)"]
    },
    research_citations: [
      { title: "Digital Twins in Aircraft Component Manufacturing", source: "Journal of Advanced Manufacturing", year: 2025 }
    ],
    industry_benchmarks: {
      metric: "Material Scrap Rate (Titanium)",
      current_avg: "18%",
      potential_improvement: "4%"
    },
    status: "published",
    is_featured: false,
    priority_rank: 3,
    tags: ["Aerospace", "Digital Twin", "Manufacturing"]
  },
  {
    id: "need-aero-4",
    sector_id: "aerospace",
    title: "Blockchain-based Supply Chain Compliance Ledger",
    slug: "aerospace-blockchain-traceability",
    description: "Immutable record of material certifications (Form 1, CoC) and manufacturing history for AS9100 compliance and counterfeit detection.",
    automation_type: "supply_chain_automation",
    ceed_quadrant: "core",
    impact_level: "high",
    estimated_roi_percentage: 15,
    implementation_complexity: "high",
    time_to_value_weeks: 20,
    target_company_size: ["Small", "Medium", "Large"],
    target_employee_range: "20+",
    target_revenue_range: "₹5Cr+",
    prerequisite_tech_maturity: "Medium - Requires stakeholder participation across tiers.",
    tech_stack_suggested: {
      primary: ["Hyperledger Fabric", "Go", "Node.js"],
      secondary: ["IPFS", "CouchDB", "Kubernetes"]
    },
    data_requirements: {
      structured: ["Material Batch Numbers", "Certification Metadata"],
      unstructured: ["Scanned Test Reports", "NDT Images"]
    },
    research_citations: [
      { title: "Counterfeit Detection in Defense Supply Chains", source: "IMF Industrial Policy Report", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Audit Compliance Time",
      current_avg: "3 Weeks",
      potential_improvement: "4 Hours"
    },
    status: "published",
    is_featured: false,
    priority_rank: 4,
    tags: ["Aerospace", "Blockchain", "Compliance"]
  },
  {
    id: "need-aero-5",
    sector_id: "aerospace",
    title: "Engineering Attrition & Succession Analytics",
    slug: "aerospace-talent-risk-analytics",
    description: "Predictive model to identify flight-risk among high-skill design engineers and automatically suggest internal succession pathways to fill critical vacant roles like CTO and specialized Subject Matter Experts.",
    automation_type: "predictive_analytics",
    ceed_quadrant: "efficiency",
    impact_level: "medium",
    estimated_roi_percentage: 22,
    implementation_complexity: "medium",
    time_to_value_weeks: 12,
    target_company_size: ["Medium", "Large"],
    target_employee_range: "200+",
    target_revenue_range: "₹50Cr+",
    prerequisite_tech_maturity: "Low - Can be implemented with HRIS data.",
    tech_stack_suggested: {
      primary: ["Python", "Scikit-Learn", "Pandas"],
      secondary: ["PowerBI", "Snowflake"]
    },
    data_requirements: {
      structured: ["Employee Tenure", "Skill Matrices", "Payroll History"],
      unstructured: ["Performance Reviews", "Exit Interview Sentiment"]
    },
    research_citations: [
      { title: "Human Capital Risk in High-Tech Manufacturing", source: "Harvard Business Review Digital", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Key Person Dependency Risk",
      current_avg: "High (documented in 65% of MSMEs)",
      potential_improvement: "Low (Active succession mapping)"
    },
    status: "published",
    is_featured: true,
    priority_rank: 5,
    tags: ["Aerospace", "HR Tech", "Analytics"],
    discovery_insight: {
      session_id: "mosi-1",
      rationale: "Strategic concern over vacant CTO position and engineering attrition at Aequs.",
      confidence: 0.98,
      quote: "Our primary headache isn't just machines; it's the 25% attrition in our engineering design center."
    }
  },
  // Agriculture
  {
    id: "need-agri-1",
    sector_id: "sector-agri",
    title: "AI Crop Disease Detection",
    slug: "crop-disease-detection-ai",
    description: "Mobile-first computer vision model that identifies crop diseases and pest infestations from farmer-captured photos, providing instant treatment recommendations.",
    automation_type: "computer_vision",
    ceed_quadrant: "disruption",
    impact_level: "transformative",
    estimated_roi_percentage: 38,
    implementation_complexity: "medium",
    time_to_value_weeks: 10,
    target_company_size: ["Small"],
    target_employee_range: "1-20",
    target_revenue_range: "₹10L - ₹2Cr",
    prerequisite_tech_maturity: "Low - Requires smartphone camera.",
    tech_stack_suggested: {
      primary: ["TensorFlow Lite", "Python", "FastAPI"],
      secondary: ["Flutter", "Firebase"]
    },
    data_requirements: {
      unstructured: ["Farm Crop Photos", "Field Condition Images"]
    },
    research_citations: [
      { title: "AI in Precision Agriculture", source: "FAO Digital Farm Report", year: 2024 }
    ],
    industry_benchmarks: {
      metric: "Crop Loss Due to Undetected Disease",
      current_avg: "18% Annual",
      potential_improvement: "4% Annual"
    },
    status: "published",
    is_featured: true,
    priority_rank: 1,
    tags: ["Agriculture", "AI", "Mobile"]
  },
  {
    id: "need-agri-2",
    sector_id: "sector-agri",
    title: "IoT Soil & Irrigation Monitoring",
    slug: "smart-irrigation-iot",
    description: "Low-cost soil moisture and NPK sensor network connected to an automated irrigation controller, reducing water usage by 40% while improving yield consistency.",
    automation_type: "iot_integration",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 30,
    implementation_complexity: "low",
    time_to_value_weeks: 6,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "1-50",
    target_revenue_range: "₹20L - ₹5Cr",
    prerequisite_tech_maturity: "Low - Plug-and-play sensors.",
    tech_stack_suggested: {
      primary: ["Arduino/ESP32", "MQTT", "Node-RED"],
      secondary: ["InfluxDB", "Grafana"]
    },
    data_requirements: {
      real_time: ["Soil Moisture (%)", "NPK Levels", "Weather API"]
    },
    research_citations: [],
    industry_benchmarks: {
      metric: "Water Usage per Hectare",
      current_avg: "1200L/day",
      potential_improvement: "720L/day"
    },
    status: "published",
    is_featured: true,
    priority_rank: 2,
    tags: ["Agriculture", "IoT", "Water"]
  },
  {
    id: "need-agri-3",
    sector_id: "sector-agri",
    title: "Agri Supply Chain Cold-Chain Tracker",
    slug: "cold-chain-agri-tracker",
    description: "Real-time cold-chain monitoring IoT device for perishable produce in transit — tracks temperature, humidity, and shock events to reduce post-harvest losses.",
    automation_type: "supply_chain_automation",
    ceed_quadrant: "core",
    impact_level: "high",
    estimated_roi_percentage: 25,
    implementation_complexity: "medium",
    time_to_value_weeks: 12,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "5-100",
    target_revenue_range: "₹50L - ₹10Cr",
    prerequisite_tech_maturity: "Low - Requires 4G connectivity in transit vehicles.",
    tech_stack_suggested: {
      primary: ["ESP32 + BLE", "MQTT", "Python"],
      secondary: ["AWS IoT Core", "React Dashboard"]
    },
    data_requirements: {
      real_time: ["Temperature (°C)", "Humidity (%)", "GPS Location"]
    },
    research_citations: [
      { title: "Reducing Post-Harvest Loss via Cold Chain IoT", source: "NABARD AgriTech Report", year: 2025 }
    ],
    industry_benchmarks: {
      metric: "Post-Harvest Loss",
      current_avg: "30% perishables",
      potential_improvement: "8%"
    },
    status: "published",
    is_featured: false,
    priority_rank: 3,
    tags: ["Agriculture", "Supply Chain", "IoT"]
  },
  // Nagpur & Vidarbha: Manufacturing & Engineering
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
  },
  {
    id: "need-mfg-nagpur-2",
    sector_id: "manufacturing-engineering-nagpur",
    title: "Digital Quality Gate for CNC Shops",
    slug: "cnc-digital-quality-gate",
    description: "Multi-parameter digital gauge station that automatically logs dimensions and surface finish directly to a cloud dashboard, bypassing manual paper trails.",
    automation_type: "computer_vision",
    ceed_quadrant: "core",
    impact_level: "medium",
    estimated_roi_percentage: 24,
    implementation_complexity: "low",
    time_to_value_weeks: 6,
    target_company_size: ["Small"],
    target_employee_range: "10-50",
    target_revenue_range: "₹1Cr - ₹10Cr",
    prerequisite_tech_maturity: "Low - Replaces manual verniers and micrometers.",
    tech_stack_suggested: {
      primary: ["Raspberry Pi", "Digital Vernier API", "Next.js"],
      secondary: ["InfluxDB", "FastAPI"]
    },
    data_requirements: {
      structured: ["Dimension Readings (mm)", "Operator ID", "Timestamp"]
    },
    research_citations: [],
    industry_benchmarks: {
      metric: "QA Lag Time",
      current_avg: "24 Hours (Paper)",
      potential_improvement: "Real-time"
    },
    status: "published",
    is_featured: false,
    priority_rank: 2,
    tags: ["QA", "CNC", "Digitalization"]
  },
  {
    id: "need-mfg-nagpur-3",
    sector_id: "manufacturing-engineering-nagpur",
    title: "IoT Retrofit for Loom-embedded Systems",
    slug: "loom-iot-retrofit",
    description: "Cloud-connected gateway module that retrofits onto existing circular loom PLC cards to provide real-time tension tracking and predictive failure alerts for multi-gauge wire production.",
    automation_type: "iot_integration",
    ceed_quadrant: "efficiency",
    impact_level: "high",
    estimated_roi_percentage: 28,
    implementation_complexity: "medium",
    time_to_value_weeks: 10,
    target_company_size: ["Small", "Medium"],
    target_employee_range: "15-100",
    target_revenue_range: "₹2Cr - ₹15Cr",
    prerequisite_tech_maturity: "Medium - Requires access to PLC board I/O headers.",
    tech_stack_suggested: {
      primary: ["ESP32", "MQTT", "Node.js"],
      secondary: ["TimescaleDB", "Grafana"]
    },
    data_requirements: {
      real_time: ["Wire Tension (mN)", "Spindle RPM", "Temp"],
      structured: ["Maintenance Cycles", "Error Logs"]
    },
    research_citations: [],
    industry_benchmarks: {
      metric: "Machine Downtime",
      current_avg: "12% Monthly",
      potential_improvement: "4% Monthly"
    },
    status: "published",
    is_featured: true,
    priority_rank: 3,
    tags: ["IoT", "Textile", "Nagpur"],
    discovery_insight: {
      session_id: "nagpur-mfg-002",
      rationale: "Beta Computronics (beta-comp-001) has demonstrated market fit for this in the woven sack sector.",
      confidence: 0.95
    }
  }
];

