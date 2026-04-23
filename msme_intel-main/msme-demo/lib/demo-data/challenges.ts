import { Challenge } from '../types/detailed-company';

export interface NagpurChallenge extends Challenge {
  company_id: string;
  prd_id: string;
  company: string;
  contact: string;
  skills_required: string[];
  expected_outcomes: string[];
  timeline_weeks: number;
  prize_category: string;
  reference_videos?: { title: string; url: string }[];
  existing_product?: string;
}

export const NAGPUR_NEXT_CHALLENGES: NagpurChallenge[] = [
  {
    id: "challenge-nag-001",
    company_id: "ata-001",
    prd_id: "prd-nag-001",
    title: "AI-Powered Shopfloor Workflow Optimization",
    description: "How might we develop a smart scheduling and monitoring system that optimizes production workflows, reduces idle time, and improves resource utilization on the shopfloor?",
    company: "Ashta Tech Automation Pvt. Ltd.",
    contact: "Harshad Wasule (Technical Director)",
    tags: ["Industry 4.0", "MES", "OEE", "AI Scheduling", "IoT", "Manufacturing"],
    status: "published",
    category: "Digital Manufacturing",
    complexity: "high",
    skills_required: ["Full Stack Development", "IoT/Embedded", "Python/ML", "UI/UX Design"],
    expected_outcomes: [
      "Real-time machine status dashboard",
      "Digital job card mobile app",
      "AI-based scheduling recommendations",
      "OEE improvement of 10-15%"
    ],
    timeline_weeks: 12,
    prize_category: "Grand Challenge"
  },
  {
    id: "challenge-nag-002",
    company_id: "open-002",
    prd_id: "prd-nag-002",
    title: "Open Innovation Challenge",
    description: "How might we empower student innovators to discover and solve real problems faced by MSMEs in Nagpur/Vidarbha through technology-enabled solutions?",
    company: "Self-Identified MSME",
    contact: "Student Team to Find",
    tags: ["Open Innovation", "Customer Discovery", "Entrepreneurship", "Field Research"],
    status: "published",
    category: "Open Category",
    complexity: "medium",
    skills_required: ["Customer Research", "Problem Solving", "Prototyping", "Any Technical Stack"],
    expected_outcomes: [
      "MSME problem validated through field research",
      "Working prototype addressing real problem",
      "Business model canvas",
      "Potential startup opportunity"
    ],
    timeline_weeks: 12,
    prize_category: "Best Open Innovation"
  },
  {
    id: "challenge-nag-003",
    company_id: "ts-003",
    prd_id: "prd-nag-003",
    title: "Swappable Battery System for Agricultural Tractors",
    description: "How might we design a modular, swappable battery system for tractors that enables quick battery exchange while ensuring safety, durability, and ease of use in harsh agricultural environments?",
    company: "Tractor Seva",
    contact: "Dhruvil Sheth (Founder & CEO)",
    tags: ["Electric Vehicles", "Battery Technology", "AgriTech", "BMS", "Rural Electrification"],
    status: "published",
    category: "Clean Mobility",
    complexity: "high",
    skills_required: ["Mechanical Design", "Electrical Engineering", "Embedded Systems", "BMS"],
    expected_outcomes: [
      "Quick-swap mechanism design (<5 min)",
      "Standardized battery pack spec",
      "BMS with cloud connectivity",
      "Swap station concept design"
    ],
    timeline_weeks: 14,
    prize_category: "Best Hardware Innovation"
  },
  {
    id: "challenge-nag-004",
    company_id: "mod-004",
    prd_id: "prd-nag-004",
    title: "AI-Powered Digital Platform for Custom Metal Furniture",
    description: "How might we create a digital platform that enables customers to visualize custom furniture designs in 3D, automatically generates manufacturing specifications, and streamlines the order-to-production workflow?",
    company: "Aviven Engitech Pvt. Ltd. (Modura)",
    contact: "Aviikumar Ujwane (Founder & Director)",
    tags: ["3D Configurator", "CAD Automation", "Manufacturing", "Metal Fabrication", "B2B Platform"],
    status: "published",
    category: "Digital Platform",
    complexity: "medium",
    skills_required: ["3D Graphics (Three.js)", "Full Stack Development", "CAD/CAM Knowledge", "UI/UX"],
    expected_outcomes: [
      "3D product configurator",
      "Auto-generated manufacturing drawings",
      "Real-time cost estimation",
      "Customer approval workflow"
    ],
    timeline_weeks: 12,
    prize_category: "Best Digital Platform"
  },
  {
    id: "challenge-nag-005",
    company_id: "sma-005",
    prd_id: "prd-nag-005",
    title: "Indigenous RF Power Amplifier for Defence Communications",
    description: "How might we design an indigenous RF power amplifier circuit for defence applications that meets military specifications for performance, reliability, and environmental ruggedness while reducing import dependence?",
    company: "SMARK Automations",
    contact: "Krunal Bhongade (Founder & CEO)",
    tags: ["RF Engineering", "Defence Electronics", "Make in India", "Power Amplifier", "Atmanirbhar"],
    status: "published",
    category: "Defence Technology",
    complexity: "high",
    skills_required: ["RF Circuit Design", "PCB Layout (RF)", "Analog Electronics", "Test & Measurement"],
    expected_outcomes: [
      "RF PA circuit design and simulation",
      "Prototype PCB fabrication",
      "Testing across frequency and temperature",
      "Documentation for manufacturing transfer"
    ],
    timeline_weeks: 16,
    prize_category: "Best Defence Innovation"
  },
  {
    id: "challenge-nag-006",
    company_id: "mit-006",
    prd_id: "prd-nag-006",
    title: "Modular Bio-Inspired Air Purification Platform",
    description: "How might we design a modular, configurable air purification platform that combines biological and mechanical filtration with smart monitoring to provide scalable clean air solutions for diverse indoor environments?",
    company: "Biowall Agritech Pvt. Ltd. (Mitrasena)",
    contact: "Manohar Malani (Chief Scientific Officer)",
    tags: ["CleanTech", "Air Quality", "IoT", "Bio-Filtration", "Smart Building"],
    status: "published",
    category: "CleanTech",
    complexity: "medium",
    skills_required: ["Mechanical Design", "IoT/Embedded", "Mobile App Development", "Air Quality Science"],
    expected_outcomes: [
      "Modular hardware design",
      "Multi-stage filtration system",
      "Smart monitoring with IoT",
      "Living wall bio-filter integration"
    ],
    timeline_weeks: 12,
    prize_category: "Best CleanTech Solution"
  },
  {
    id: "challenge-nag-007",
    company_id: "spw-007",
    prd_id: "prd-nag-007",
    title: "Indigenous Digital Caliper with Smart Connectivity",
    description: "How might we design an indigenous digital caliper that matches imported quality standards while adding smart connectivity features for data logging and quality management system integration?",
    company: "Sanjay Precision Works",
    contact: "Sanjay Borkar (Managing Director)",
    tags: ["Precision Metrology", "Make in India", "IoT", "Quality Management", "SPC"],
    status: "published",
    category: "Precision Engineering",
    complexity: "high",
    skills_required: ["Embedded Systems", "Low Power Design", "Mechanical Design", "Mobile App Development"],
    expected_outcomes: [
      "Encoder signal processing for 0.01mm resolution",
      "BLE wireless connectivity",
      "SPC integration software/app",
      "Caliper mechanical design for manufacturing"
    ],
    timeline_weeks: 14,
    prize_category: "Best Make in India Product"
  },
  {
    id: "challenge-nag-008",
    company_id: "bc-008",
    prd_id: "prd-nag-008",
    title: "Automated Precision Winding System for Transformers",
    description: "How might we design an automated precision winding system that handles multiple wire gauges, maintains consistent tension, and integrates quality inspection to reduce manual dependency and improve production consistency?",
    company: "Beta Computronics Pvt. Ltd.",
    contact: "Sandeep Darwhekar (Director)",
    tags: ["Industrial Automation", "Transformer Manufacturing", "Tension Control", "PLC", "Quality Inspection"],
    status: "published",
    category: "Industrial Automation",
    complexity: "high",
    skills_required: ["PLC Programming", "Servo Control", "Mechanical Design", "Sensor Integration", "HMI"],
    expected_outcomes: [
      "Closed-loop tension control system",
      "Multi-gauge wire handling mechanism",
      "Integrated quality monitoring",
      "Data logging dashboard"
    ],
    timeline_weeks: 14,
    prize_category: "Best Automation Solution",
    reference_videos: [
      {
        "title": "NITTOKU Winding Machine",
        "url": "https://youtu.be/lequv5Bh6yE"
      },
      {
        "title": "12 Spindle Transformer Coil Winding",
        "url": "https://youtu.be/lKdDKrGZrcw"
      }
    ]
  },
  {
    id: "challenge-nag-009",
    company_id: "bis-009",
    prd_id: "prd-nag-009",
    title: "AI-Powered Yield Optimization for Food Dehydration",
    description: "How might we leverage IoT sensors, data analytics, and AI to optimize the dehydration process parameters in real-time, maximizing yield while maintaining consistent product quality?",
    company: "Baron Integrated Services Pvt. Ltd.",
    contact: "Kuldeep Shiwankar (Managing Director)",
    tags: ["Food Processing", "AI/ML", "IoT", "Yield Optimization", "Quality Control"],
    status: "published",
    category: "AgriTech / Food Processing",
    complexity: "medium",
    skills_required: ["Industrial IoT", "Data Science", "Food Processing Knowledge", "Dashboard Development"],
    expected_outcomes: [
      "Process monitoring sensor network",
      "Yield prediction ML model",
      "Inline quality inspection",
      "Real-time control recommendations"
    ],
    timeline_weeks: 12,
    prize_category: "Best AgriTech Solution"
  },
  {
    id: "challenge-nag-010",
    company_id: "tw-010",
    prd_id: "prd-nag-010",
    title: "Real-Time UX Feedback and Analytics Platform",
    description: "How might we create a lightweight, non-intrusive tool that captures real-time user feedback and behavioral context to help product teams make faster, data-driven UX decisions?",
    company: "Techwalnut Innovations LLP",
    contact: "Dr. Akshay Kekre (Founder & CEO)",
    tags: ["UX Research", "Product Analytics", "SaaS", "SDK", "Sentiment Analysis"],
    status: "published",
    category: "SaaS / Product Tools",
    complexity: "medium",
    skills_required: ["Frontend Development (SDK)", "Full Stack Development", "Data Analytics", "NLP/ML"],
    expected_outcomes: [
      "Embeddable feedback widget (<50KB)",
      "Contextual micro-survey system",
      "Behavioral analytics (heatmaps, session replay)",
      "Insights dashboard with sentiment analysis"
    ],
    timeline_weeks: 12,
    prize_category: "Best SaaS Product"
  },
  {
    id: "challenge-nag-011",
    company_id: "nav-011",
    prd_id: "prd-nag-011",
    title: "Intelligent Adaptive Lighting System for SAR Drones",
    description: "How might we design an intelligent lighting system for drones that adapts its beam pattern and intensity based on mission type, environmental conditions, and detected objects to enhance search and rescue operations?",
    company: "Navitas (Zero Systems)",
    contact: "Rashmi Kulkarni (Managing Partner)",
    tags: ["Drone Technology", "SAR", "Adaptive Lighting", "Embedded Systems", "Emergency Response"],
    status: "published",
    category: "Drone Technology",
    complexity: "high",
    skills_required: ["Optical Design", "Embedded Systems", "Drone Integration", "Power Electronics"],
    expected_outcomes: [
      "Adaptive optics design (10°-120° beam)",
      "Intelligent control based on telemetry",
      "Camera integration for object tracking",
      "Power-optimized operation"
    ],
    timeline_weeks: 14,
    prize_category: "Best Emerging Tech Solution"
  },
  {
    id: "challenge-nag-012",
    company_id: "ac-012",
    prd_id: "prd-nag-012",
    title: "AI-Powered Fire Detection and Suppression System",
    description: "How might we develop an AI-based fire detection system that can identify fire hazards in their earliest stages in cotton processing environments and automatically target suppression to minimize damage?",
    company: "Automation Controls",
    contact: "Latesh Agrawal (CEO)",
    tags: ["Fire Safety", "AI/ML", "Computer Vision", "Industrial Safety", "Thermal Imaging"],
    status: "published",
    category: "Industrial Safety",
    complexity: "high",
    skills_required: ["Computer Vision", "Machine Learning", "Embedded Systems", "Mechanical Design"],
    expected_outcomes: [
      "Multi-sensor detection network",
      "AI fire detection algorithm",
      "Targeted suppression system",
      "Integration with plant safety systems"
    ],
    timeline_weeks: 14,
    prize_category: "Best Safety Innovation",
    reference_videos: [
      {
        "title": "AI Fire Detection Sprinkler Demo",
        "url": "https://www.youtube.com/shorts/VO9VtvpyVUI"
      }
    ]
  },
  {
    id: "challenge-nag-013",
    company_id: "hix-013",
    prd_id: "prd-nag-013",
    title: "GPS-Denied Worker Safety System for Confined Spaces",
    description: "How might we enable real-time location tracking and vital sign monitoring of workers in confined spaces where mobile networks are unavailable, ensuring rapid response in emergencies?",
    company: "Hixaa Technologies Private Limited",
    contact: "Atul Ghumade (CTO)",
    tags: ["Worker Safety", "Indoor Positioning", "IoT", "Wearables", "Confined Space", "UWB"],
    status: "published",
    category: "Worker Safety",
    complexity: "high",
    skills_required: ["Embedded Systems", "UWB/BLE", "Sensor Integration", "Mesh Networking", "Full Stack"],
    expected_outcomes: [
      "Indoor positioning system (<3m accuracy)",
      "Vital sign monitoring wearable",
      "Mesh communication network",
      "Safety dashboard with real-time alerts"
    ],
    timeline_weeks: 16,
    prize_category: "Grand Challenge",
    existing_product: "Raksha IoT (https://hixaa.com/products/)"
  }
];
