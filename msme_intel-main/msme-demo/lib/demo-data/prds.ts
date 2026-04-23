import { BuildForXPRD } from "../types/prd";

export const NAGPUR_NEXT_PRDS: BuildForXPRD[] = [
  {
    id: "prd-nag-001",
    company_id: "company-ashta-001",
    company_automation_interest_id: "int-ashta-001",
    automation_need_id: "need-ashta-workflow",
    sector_id: "digital_manufacturing",
    mosi_session_id: "mosi-nag-001",
    prd_code: "NAG/2026/MFG/001",
    title: "AI-Powered Shopfloor Workflow Optimization",
    slug: "ashta-workflow-optimization",
    executive_summary: "Develop a smart scheduling and monitoring system for Ashta Tech to optimize production workflows, reduce idle time, and improve resource utilization on the shopfloor.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6-7",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Manual scheduling at Ashta Tech's automation shopfloor lead to sub-optimal machine utilization and high idle times between production stages.",
      impact: "Reduced overall equipment effectiveness (OEE) and delayed project delivery schedules.",
      stakeholders_affected: ["Production Managers", "Shopfloor Operators", "Planning Dept"],
      root_causes: ["Dynamic project changes", "Manual logging errors", "Lack of real-time visibility"],
      current_workarounds: ["Whiteboard scheduling", "End-of-day manual reports"],
      cost_of_inaction: "Estimated 15% loss in potential production capacity."
    },
    objectives: [
      { title: "Real-time Monitoring", description: "Implement a digital monitoring system for all active machines.", is_primary: true },
      { title: "Smart Scheduling", description: "Develop an AI-based scheduling algorithm to minimize idle time.", is_primary: true }
    ],
    scope: {
      in_scope: ["Digital job card mobile app", "AI-based scheduling backend", "Live monitoring dashboard"],
      out_of_scope: ["Mechanical machine upgrades", "Full ERP replacement"]
    },
    functional_requirements: [
      { id: "func-001", category: "Monitoring", requirement: "Capture real-time machine status (On/Off/Idle/Fault).", priority: "Must Have", acceptance_criteria: ["Latency < 2s for status updates"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "UX", requirement: "Mobile app for operators must be highly intuitive with < 2 clicks for status updates.", priority: "High" }
    ],
    technical_specifications: { tech_stack: ["Next.js", "Python/FastAPI", "PostgreSQL"], integrations: ["Existing Tally inventory data"] },
    user_stories: [
      { role: "Supervisor", action: "view the real-time shopfloor map", outcome: "reassign resources to bottleneck areas immediately", acceptance_criteria: ["Map updates without page refresh"] }
    ],
    success_metrics: { primary: ["10-15% improvement in OEE", "50% reduction in manual logging time"], secondary: ["Zero missed delivery milestones due to internal bottlenecks"] },
    timeline_milestones: [{ event: "MVP Dashboard", date: "2026-05-15", description: "Real-time status monitoring for 5 key machines." }],
    evaluation_criteria: { 
      technical: [{ criterion: "AI Algorithm", weight: 40, description: "Efficiency of scheduling recommendations." }],
      functional: [{ criterion: "User Adoption", weight: 30, description: "Ease of use for shopfloor workers." }],
      innovation: [{ criterion: "Real-time Data Fusion", weight: 30, description: "Handling diverse machine signals." }]
    },
    resources_provided: { documentation: ["Production workflow diagrams", "Historical project timelines"] },
    constraints_guidelines: { constraints: ["Must work in poor Wi-Fi environments (offline-first)."], guidelines: ["Follow Material Design 3 guidelines for UI."] },
    prize_pool: { total: "₹2,00,000", currency: "INR", breakdown: ["Winner: ₹1.5L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-002",
    company_id: "company-open-002",
    company_automation_interest_id: "int-open-002",
    automation_need_id: "need-open-innovation",
    sector_id: "general",
    mosi_session_id: "mosi-nag-002",
    prd_code: "NAG/2026/OPN/002",
    title: "Open Innovation Challenge",
    slug: "open-innovation-challenge",
    executive_summary: "Empower student innovators to discover and solve real problems faced by MSMEs in Nagpur through technology-enabled solutions.",
    status: "published",
    version: 1,
    competition_type: "ideation",
    trl_level_expected: "3-5",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Many smaller MSMEs lack the technical resources to identify or vocalize their automation gaps.",
      impact: "Innovation gap persists as local talent is not connected to real industrial pain points.",
      stakeholders_affected: ["Micro-entrepreneurs", "Student Innovators", "Regional Hubs"],
      root_causes: ["Fragmented communication", "Cost barrier for R&D", "Lack of structured discovery"],
      current_workarounds: ["Ad-hoc consulting", "Generic SaaS tools"],
      cost_of_inaction: "Loss of regional competitiveness for micro-MSMEs."
    },
    objectives: [
      { title: "Problem Discovery", description: "Validate at least one real-world MSME pain point through field research.", is_primary: true },
      { title: "MVP Development", description: "Build a working prototype addressing the discovered problem.", is_primary: true }
    ],
    scope: {
      in_scope: ["Field research/Customer discovery", "Prototype development", "Business model canvas"],
      out_of_scope: ["Full scale production manufacturing"]
    },
    functional_requirements: [
      { id: "func-001", category: "Discovery", requirement: "Complete a structured problem discovery report (min 5 interviews).", priority: "Must Have", acceptance_criteria: ["Interview logs included"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Viability", requirement: "Solution must have a potential payback period < 18 months.", priority: "High" }
    ],
    technical_specifications: { tech_stack: ["Any appropriate for the solution"], integrations: ["Potential integration with MSME Intelligence Platform"] },
    user_stories: [
      { role: "Student Team", action: "present a validated problem statement", outcome: "secure pilot funding from regional partners", acceptance_criteria: ["Clear evidence of industrial pain point"] }
    ],
    success_metrics: { primary: ["Number of validated problem statements", "Working prototype functional for pilot"], secondary: ["Potential for startup spin-off"] },
    timeline_milestones: [{ event: "Discovery Report", date: "2026-05-01", description: "Submission of research findings." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Problem Fit", weight: 50, description: "How well the solution solves a real problem." }],
      functional: [{ criterion: "Execution", weight: 30, description: "Quality of the prototype." }],
      innovation: [{ criterion: "Novelty", weight: 20, description: "Uniqueness of the approach." }]
    },
    resources_provided: { documentation: ["MSME Problem Discovery Guide", "Inpulse Platform access"] },
    constraints_guidelines: { constraints: ["Must focus on MSMEs in the Nagpur/Vidarbha region."], guidelines: ["Adhere to Ethical research standards."] },
    prize_pool: { total: "₹1,00,000", currency: "INR", breakdown: ["Best Discovery: ₹50k", "Best Prototype: ₹50k"] }
  },
  {
    id: "prd-nag-003",
    company_id: "company-tractor-seva-003",
    company_automation_interest_id: "int-tractor-003",
    automation_need_id: "need-tractor-battery",
    sector_id: "agritech",
    mosi_session_id: "mosi-nag-003",
    prd_code: "NAG/2026/EV/003",
    title: "Swappable Battery System for Agricultural Tractors",
    slug: "tractor-swappable-battery",
    executive_summary: "Design a modular, swappable battery system for tractors that enables quick exchange while ensuring safety and durability in rural agricultural environments.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Agricultural tractors face downtime during peak seasons due to long charging hours for fixed EV batteries.",
      impact: "Reduced operational efficiency for farmers and lost seasonal income.",
      stakeholders_affected: ["Farmers", "Agri-logistic Providers", "EV Manufacturers"],
      root_causes: ["High charging time", "Limited rural power infrastructure", "Heavy usage patterns"],
      current_workarounds: ["Oversized batteries", "Switching back to diesel"],
      cost_of_inaction: "Estimated ₹5,000 daily loss per tractor during harvest."
    },
    objectives: [
      { title: "Modular Design", description: "Create a swappable battery pack that is easy to handle by one person.", is_primary: true },
      { title: "Durability", description: "Ensure safety and performance in 50°C heat and dusty fields.", is_primary: true }
    ],
    scope: {
      in_scope: ["Battery pack mechanical locking system", "BMS with cloud sync", "Standard connector design"],
      out_of_scope: ["Battery cell manufacturing", "Full tractor powertrain design"]
    },
    functional_requirements: [
      { id: "func-001", category: "Safety", requirement: "System must have an auto-cutoff during accidental disconnect.", priority: "Must Have", acceptance_criteria: ["Zero spark during 100 consecutive swaps"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Weight", requirement: "Each swappable module must weigh < 15kg.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["C/C++ for BMS", "LoRaWAN for cloud connectivity", "SolidWorks/CAD for mechanicals"], integrations: ["Agri-Cloud for state-of-health tracking"] },
    user_stories: [
      { role: "Farmer", action: "swap the battery at the field edge", outcome: "resumes work in < 5 minutes without returning to the farm shed", acceptance_criteria: ["Swap time < 300s verified"] }
    ],
    success_metrics: { primary: ["Swap time < 5 minutes", "98% BMS data accuracy"], secondary: ["Modular scaling (1x pack to 4x packs)"] },
    timeline_milestones: [{ event: "Mechanical Design", date: "2026-05-15", description: "Approved CAD and 3D printed swap mechanism." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Mechanical Ruggedness", weight: 40, description: "Durability against vibrations." }],
      functional: [{ criterion: "BMS Intelligence", weight: 40, description: "Accuracy of health/charge estimation." }],
      innovation: [{ criterion: "Connector Design", weight: 20, description: "Novelty of dust-proof high-current pins." }]
    },
    resources_provided: { documentation: ["Tractor Seva chassis dimensions", "Duty cycle data"] },
    constraints_guidelines: { constraints: ["Must use LFP cells for safety."], guidelines: ["IP67 protection rating required."] },
    prize_pool: { total: "₹3,00,000", currency: "INR", breakdown: ["Winner: ₹2.5L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-004",
    company_id: "company-modura-004",
    company_automation_interest_id: "int-modura-004",
    automation_need_id: "need-modura-platform",
    sector_id: "manufacturing",
    mosi_session_id: "mosi-nag-004",
    prd_code: "NAG/2026/PLT/004",
    title: "AI-Powered Digital Platform for Custom Metal Furniture",
    slug: "modura-furniture-configurator",
    executive_summary: "Develop a 3D configurator platform for Modura that automates design-to-manufacturing workflows for custom metal furniture.",
    status: "published",
    version: 1,
    competition_type: "gig",
    trl_level_expected: "7",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Custom furniture manufacturing at Modura suffers from slow design approvals and manual translation of 3D concepts into manufacturing drawings.",
      impact: "High lead times and Frequent errors in fabrication due to misinterpretation of dimensions.",
      stakeholders_affected: ["End Customers", "Fabricators", "Design Dept"],
      root_causes: ["Lack of unified 3D platform", "Manual BOM generation", "Fragmented feedback loop"],
      current_workarounds: ["Emailing 2D sketches", "Manual measurements on floor"],
      cost_of_inaction: "Estimated ₹20k loss per custom order in rework and material waste."
    },
    objectives: [
      { title: "3D Configurator", description: "Enable real-time 3D visualization and customization of modular metal structures.", is_primary: true },
      { title: "Automated Manufacturing", description: "Generate DXF/G-code output directly from customer-approved designs.", is_primary: true }
    ],
    scope: {
      in_scope: ["Three.js based configurator", "Real-time pricing engine", "DXF export module"],
      out_of_scope: ["Physical fabrication", "Delivery logistics"]
    },
    functional_requirements: [
      { id: "func-001", category: "Configurator", requirement: "Support real-time 'snap-to-grid' for modular units.", priority: "Must Have", acceptance_criteria: ["Accuracy to +/- 0.5mm in 3D scene"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Performance", requirement: "3D scene must load in < 1.5s on 4G networks.", priority: "High" }
    ],
    technical_specifications: { tech_stack: ["React", "Three.js/Fiber", "Python backend"], integrations: ["Nesting software APIs"] },
    user_stories: [
      { role: "Product Designer", action: "upload a base structural component", outcome: "customers can customize it within set parameters", acceptance_criteria: ["Collision detection for 3D elements"] }
    ],
    success_metrics: { primary: ["60% reduction in design-to-production lead time", "Zero fabrication errors due to design input"], secondary: ["Increase in customer conversion through real-time visualization"] },
    timeline_milestones: [{ event: "Core Configurator", date: "2026-05-15", description: "Full 3D interaction for basic modular units." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Graphics Fidelity", weight: 40, description: "Smoothness and accuracy of 3D scene." }],
      functional: [{ criterion: "Export Accuracy", weight: 40, description: "Precision of generated CAD files." }],
      innovation: [{ criterion: "Ux Flow", weight: 20, description: "Clarity for non-expert users." }]
    },
    resources_provided: { documentation: ["Modura structural assembly guides", "Material price lists"] },
    constraints_guidelines: { constraints: ["Must run in standard web browsers."], guidelines: ["Adhere to CAD export standards."] },
    prize_pool: { total: "₹1,50,000", currency: "INR", breakdown: ["Winner: ₹1L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-005",
    company_id: "company-smark-005",
    company_automation_interest_id: "int-smark-005",
    automation_need_id: "need-smark-amp",
    sector_id: "defence",
    mosi_session_id: "mosi-nag-005",
    prd_code: "NAG/2026/DEF/005",
    title: "Indigenous RF Power Amplifier for Defence Communications",
    slug: "indigenous-rf-power-amplifier",
    executive_summary: "Design an indigenous RF power amplifier for defence applications that meets MIL-spec standards while reducing import dependency.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "5-6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "India's defence communication systems rely heavily on imported RF power amplifiers, posing a security risk and high cost.",
      impact: "Vulnerability in supply chains and high capital outflow for critical electronic sub-systems.",
      stakeholders_affected: ["DRDO/Defence Labs", "Army Communication Units", "Indigenous MSMEs"],
      root_causes: ["Lack of domestic RF design talent", "High cost of RF test equipment", "Stringent MIL-spec requirements"],
      current_workarounds: ["Importing modules (COTS)", "License-based assembly"],
      cost_of_inaction: "Compromised strategic autonomy in communication infrastructure."
    },
    objectives: [
      { title: "RF Performance", description: "Deliver 50W output power in the 30-512 MHz range with 40% efficiency.", is_primary: true },
      { title: "Ruggedness", description: "Operate consistently from -40°C to +85°C.", is_primary: true }
    ],
    scope: {
      in_scope: ["Circuit design/Simulation", "PCB layout for RF", "Prototype assembly and testing"],
      out_of_scope: ["Transceiver integration", "Full radio handheld enclosure"]
    },
    functional_requirements: [
      { id: "func-001", category: "RF", requirement: "Pout > 47dBm with < 10% distortion.", priority: "Must Have", acceptance_criteria: ["Verified by spectrum analyzer test"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Standard", requirement: "Must adhere to MIL-STD-810G for environmental ruggedness.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["ADS or Microwave Office for sim", "Altium for PCB", "GaN or LDMOS devices"], integrations: ["Thermal management system"] },
    user_stories: [
      { role: "RF Engineer", action: "simulate the harmonic rejection", outcome: "tuning the filter network to meet spectral mask requirements", acceptance_criteria: ["Harmonics < -30dBc"] }
    ],
    success_metrics: { primary: ["95% efficiency target achieved", "Successful MIL-spec thermal cycle test"], secondary: ["50% lower BOM cost than imported equivalents"] },
    timeline_milestones: [{ event: "Simulation Approval", date: "2026-05-15", description: "Design summary with >10dB return loss." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Spectral Purity", weight: 50, description: "Cleanliness of output signal." }],
      functional: [{ criterion: "Thermal Efficiency", weight: 30, description: "Heat dissipation performance." }],
      innovation: [{ criterion: "Miniaturization", weight: 20, description: "Packaging density." }]
    },
    resources_provided: { documentation: ["MIL-STD-810G specs", "S-Parameter models"] },
    constraints_guidelines: { constraints: ["Must use indigenous components where possible (preference)."], guidelines: ["Follow RF layout best practices (controlled impedance)."] },
    prize_pool: { total: "₹5,00,000", currency: "INR", breakdown: ["Winner: ₹4L", "Runner-up: ₹1L"] }
  },
  {
    id: "prd-nag-006",
    company_id: "company-mitrasena-006",
    company_automation_interest_id: "int-mitrasena-006",
    automation_need_id: "need-mitrasena-purifier",
    sector_id: "cleantech",
    mosi_session_id: "mosi-nag-006",
    prd_code: "NAG/2026/CT/006",
    title: "Modular Bio-Inspired Air Purification Platform",
    slug: "mitrasena-bio-purifier",
    executive_summary: "Develop a modular air purification system for Mitrasena that combines bio-filtration with smart monitoring for scalable indoor air quality.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Traditional indoor air purifiers rely solely on HEPA filters which become waste and don't address CO2 or humidity naturally.",
      impact: "Increased landfill waste and sub-optimal air quality 'freshness' in closed offices.",
      stakeholders_affected: ["Office Tenants", "Hospitals", "Sustainability Managers"],
      root_causes: ["Limited natural ventilation", "Chemical/Synthetic filter dominance", "Lack of integrated bio-solutions"],
      current_workarounds: ["Standalone HEPA units", "Potted plants (inefficient)"],
      cost_of_inaction: "Reduced employee well-being and rising filter replacement costs."
    },
    objectives: [
      { title: "Modular Hardware", description: "Design a stackable system for easy scaling from home to large halls.", is_primary: true },
      { title: "Smart Monitoring", description: "Real-time IAQ dashboard with PM2.5, VOC, and CO2 alerts.", is_primary: true }
    ],
    scope: {
      in_scope: ["Mechanical stackable design", "Filter/Plant hybrid module", "IoT sensor telemetry"],
      out_of_scope: ["HVAC integration", "Proprietary plant nursery"]
    },
    functional_requirements: [
      { id: "func-001", category: "Purification", requirement: "System must reduce PM2.5 by 90% in 15 mins in a 200 sq.ft room.", priority: "Must Have", acceptance_criteria: ["Verified by independent sensor suite"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Noise", requirement: "Operating noise must be < 35dB (quiet mode).", priority: "High" }
    ],
    technical_specifications: { tech_stack: ["ESP32", "InFluxDB", "Grafana for dashboard"], integrations: ["Smart Home APIs (Alexa/Google Home)"] },
    user_stories: [
      { role: "Facility Manager", action: "view the filter/plant health status", outcome: "schedule non-disruptive maintenance", acceptance_criteria: ["Historical trend visualization"] }
    ],
    success_metrics: { primary: ["95% VOC removal target", "80% reduction in synthetic filter waste"], secondary: ["Positive user sentiment for indoor 'freshness' scores"] },
    timeline_milestones: [{ event: "Airflow Simulation", date: "2026-05-15", description: "Optimization of noise vs. CADR." }],
    evaluation_criteria: { 
      technical: [{ criterion: "IaQ Accuracy", weight: 40, description: "Reliability of sensor data." }],
      functional: [{ criterion: "Modular Ergonomics", weight: 30, description: "Ease of assembly/stacking." }],
      innovation: [{ criterion: "Bio-Integation", weight: 30, description: "Effectiveness of 'living wall' module." }]
    },
    resources_provided: { documentation: ["Mitrasena bio-filter specs", "IAQ standard benchmarks"] },
    constraints_guidelines: { constraints: ["Must use eco-friendly materials (wood/recyclable plastic)."], guidelines: ["Follow ASHRAE indoor air quality standards."] },
    prize_pool: { total: "₹1,50,000", currency: "INR", breakdown: ["Winner: ₹1L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-007",
    company_id: "company-sanjay-precision-007",
    company_automation_interest_id: "int-precision-007",
    automation_need_id: "need-precision-caliper",
    sector_id: "manufacturing",
    mosi_session_id: "mosi-nag-007",
    prd_code: "NAG/2026/MFG/007",
    title: "Indigenous Digital Caliper with Smart Connectivity",
    slug: "sanjay-smart-caliper",
    executive_summary: "Develop a high-precision indigenous digital caliper for Sanjay Precision Works with BLE connectivity for integrated quality management.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6-7",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Quality inspection at Sanjay Precision relies on manual data entry from digital calipers, leading to 'fat-finger' errors and fragmented records.",
      impact: "Traceability gaps in critical automotive parts and increased lead time for quality documentation.",
      stakeholders_affected: ["QC Inspectors", "Plant Managers", "OEM Compliance Teams"],
      root_causes: ["Manual logging process", "Cost barrier of imported smart calipers", "Lack of local wireless metrology tools"],
      current_workarounds: ["Manual spreadsheets", "Photo-evidence of readings"],
      cost_of_inaction: "Compromised supplier audit scores with tier-1 OEMs."
    },
    objectives: [
      { title: "Precision Sensing", description: "Achieve 0.01mm resolution with indigenous linear encoder processing.", is_primary: true },
      { title: "Wireless Sync", description: "Direct BLE broadcast of values to a mobile QMS app.", is_primary: true }
    ],
    scope: {
      in_scope: ["Signal processing for linear encoder", "BLE firmware integration", "Companion data-logging app"],
      out_of_scope: ["Stainless steel jaw grinding", "Mass manufacture tooling"]
    },
    functional_requirements: [
      { id: "func-001", category: "Metrology", requirement: "Accuracy must be +/- 0.02mm over full scale (150mm).", priority: "Must Have", acceptance_criteria: ["NABL traceable master verification"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Power", requirement: "Battery life > 1 year on CR2032 (normal use).", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["STM32 or similar low-power MCU", "Flutter for app", "Custom PCB"], integrations: ["CSV/JSON export for ERPs"] },
    user_stories: [
      { role: "Quality Engineer", action: "press a button on the caliper", outcome: "value is recorded against the specific job card in the app", acceptance_criteria: ["Single press operation"] }
    ],
    success_metrics: { primary: ["90% reduction in QC logging time", "Zero data-entry errors in QC reports"], secondary: ["Caliper BOM cost < ₹2500"] },
    timeline_milestones: [{ event: "Encoder Accuracy Test", date: "2026-05-15", description: "Successful reading of 0.01mm increments." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Metrological Stability", weight: 50, description: "Repeatability of measurements." }],
      functional: [{ criterion: "Connectivity Flow", weight: 30, description: "Seamless handshake with mobile app." }],
      innovation: [{ criterion: "Indigenous Design", weight: 20, description: "Novelty in encoder signal decoding." }]
    },
    resources_provided: { documentation: ["Stainless steel frame drawings", "Metrology standard DIN 862"] },
    constraints_guidelines: { constraints: ["Must withstand industrial oil sprays (IP54)."], guidelines: ["Use open BLE metrology protocols."] },
    prize_pool: { total: "₹2,50,000", currency: "INR", breakdown: ["Winner: ₹2L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-008",
    company_id: "company-beta-008",
    company_automation_interest_id: "int-beta-008",
    automation_need_id: "need-beta-winding",
    sector_id: "manufacturing",
    mosi_session_id: "mosi-nag-008",
    prd_code: "NAG/2026/MFG/008",
    title: "Automated Precision Winding System for Transformers",
    slug: "beta-precision-winding",
    executive_summary: "Develop an automated transformer winding system for Beta Computronics that ensures consistent tension and integrated quality inspection.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Transformer winding at Beta is heavily manual, leading to inconsistent tension and frequent wire snaps for thinner gauges.",
      impact: "High rejection rate of coils due to inductance variance and insulation damage.",
      stakeholders_affected: ["Production Head", "Operators", "QA Managers"],
      root_causes: ["Manual tension control", "Lack of automated pitch tracking", "High operator skill dependency"],
      current_workarounds: ["Manual pedal-driven machines", "Post-winding repair"],
      cost_of_inaction: "Estimated ₹50k monthly in copper scrap alone."
    },
    objectives: [
      { title: "Tension Control", description: "Implement closed-loop tension control for 30AWG to 48AWG wires.", is_primary: true },
      { title: "Integrated Inspection", description: "Vision-based detection of overlaps or gaps in windings.", is_primary: true }
    ],
    scope: {
      in_scope: ["Servo-driven main spindle", "Programmable wire traverser", "Tension sensor feedback loop"],
      out_of_scope: ["Heavy-duty power transformer winding (>5kVA)"]
    },
    functional_requirements: [
      { id: "func-001", category: "Control", requirement: "System must support multi-section bobbins with automated layer counting.", priority: "Must Have", acceptance_criteria: ["+/- 0 turns accuracy"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Safety", requirement: "Emergency e-stop must halt spindle in < 20ms.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["PLC/HMI or Embedded Controller", "Stepper/Servo drives", "OpenCV for inspection"], integrations: ["Job parameter upload via USB/Net"] },
    user_stories: [
      { role: "Operator", action: "select a winding recipe", outcome: "machine automatically adjusts pitch and tension for the specific wire", acceptance_criteria: ["Recipe loading in < 10s"] }
    ],
    success_metrics: { primary: ["95% reduction in wire snapping", "Inductance variance < 1% across batches"], secondary: ["2.5x increase in throughput per operator"] },
    timeline_milestones: [{ event: "Tension Rig Demo", date: "2026-05-15", description: "Demonstrate constant tension on variable spindle speed." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Control Loop Precision", weight: 40, description: "Responsiveness of tensioner." }],
      functional: [{ criterion: "Winding Quality", weight: 40, description: "Uniformity of the coil." }],
      innovation: [{ criterion: "HMI Intuitiveness", weight: 20, description: "Ease of recipe creation." }]
    },
    resources_provided: { documentation: ["Beta transformer coil specs", "Winding speed benchmarks"] },
    constraints_guidelines: { constraints: ["Must handle variable wire insulation thicknesses."], guidelines: ["Adhere to CE safety standards for rotating machinery."] },
    prize_pool: { total: "₹3,00,000", currency: "INR", breakdown: ["Winner: ₹2.5L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-009",
    company_id: "company-baron-009",
    company_automation_interest_id: "int-baron-009",
    automation_need_id: "need-baron-dehydration",
    sector_id: "agritech",
    mosi_session_id: "mosi-nag-009",
    prd_code: "NAG/2026/AGR/009",
    title: "AI-Powered Yield Optimization for Food Dehydration",
    slug: "baron-dehydration-ai",
    executive_summary: "Leverage IoT sensors and AI for Baron Integrated Services to optimize food dehydration process parameters and maximize yield.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Food dehydration at Baron relies on fixed time-based cycles, ignoring ambient humidity and raw material moisture variability.",
      impact: "Inconsistent product quality and high energy waste due to over-drying.",
      stakeholders_affected: ["Operations Head", "Energy Auditors", "Retail Clients"],
      root_causes: ["Lack of real-time moisture feedback", "Manual damper/heater control", "Variability in input batch quality"],
      current_workarounds: ["Operator experience 'feel'", "Post-process lab testing"],
      cost_of_inaction: "Estimated ₹15 Lakh annual loss in energy and yield inconsistency."
    },
    objectives: [
      { title: "Dynamic Control", description: "Implement real-time adjustment of temperature and airflow based on product moisture.", is_primary: true },
      { title: "Yield Analytics", description: "Build an ML model to predict optimal cycle completion time.", is_primary: true }
    ],
    scope: {
      in_scope: ["Industrial IoT sensor network", "Adaptive PID/AI control logic", "Process monitoring dashboard"],
      out_of_scope: ["Boiler/Heating hardware fabrication"]
    },
    functional_requirements: [
      { id: "func-001", category: "Analytics", requirement: "System must predict final moisture within 0.5% margin in real-time.", priority: "Must Have", acceptance_criteria: ["Verified against lab moisture analyzer"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Hygiene", requirement: "All sensors in contact with air path must be food-grade.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["Python/Scikit-learn", "MQTT", "Grafana for dashboard"], integrations: ["Industry 4.0 cloud backend"] },
    user_stories: [
      { role: "Shift Supervisor", action: "view the predictive 'Time remaining' clock", outcome: "plan the next loading batch accurately", acceptance_criteria: ["Prediction updates every 5 mins"] }
    ],
    success_metrics: { primary: ["20% energy savings per batch", "10% increase in average yield per seasonality"], secondary: ["100% batches meeting target moisture standard"] },
    timeline_milestones: [{ event: "Sensor Fusion Demo", date: "2026-05-15", description: "Correlation found between air delta and product moisture." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Prediction Accuracy", weight: 40, description: "MAE on moisture prediction." }],
      functional: [{ criterion: "Control Stability", weight: 40, description: "Responsiveness to batch variability." }],
      innovation: [{ criterion: "Dashoard Clarity", weight: 20, description: "Actionability of insights." }]
    },
    resources_provided: { documentation: ["Dehydration chamber airflow charts", "Historical batch data"] },
    constraints_guidelines: { constraints: ["Must withstand 90% RH and 80°C temp."], guidelines: ["Adhere to FSSAI data logging requirements for food."] },
    prize_pool: { total: "₹1,50,000", currency: "INR", breakdown: ["Winner: ₹1L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-010",
    company_id: "company-techwalnut-010",
    company_automation_interest_id: "int-techwalnut-010",
    automation_need_id: "need-techwalnut-analytics",
    sector_id: "saas",
    mosi_session_id: "mosi-nag-010",
    prd_code: "NAG/2026/IT/010",
    title: "Real-Time UX Feedback and Analytics Platform",
    slug: "techwalnut-ux-analytics",
    executive_summary: "Develop a lightweight SaaS tool for Techwalnut to capture real-time user feedback and behavioral data for faster UX decisions.",
    status: "published",
    version: 1,
    competition_type: "gig",
    trl_level_expected: "7",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Product teams at Techwalnut lack direct context on *why* users drop off from specific flows in their web products.",
      impact: "Iterative design takes too long, leading to lost conversion and slowed product growth.",
      stakeholders_affected: ["Product Owners", "UX Researchers", "Frontend Devs"],
      root_causes: ["Generic analytics tools lack 'Why'", "Difficulty in capturing contextual feedback", "Slow SDK implementation loops"],
      current_workarounds: ["Google Analytics (no qualitative)", "Email surveys (low response)"],
      cost_of_inaction: "Missed market opportunity due to slow UX pivoting."
    },
    objectives: [
      { title: "Contextual Feedback", description: "Capture feedback exactly where the user is struggling in the UI.", is_primary: true },
      { title: "Behavioral Analytics", description: "Track session heatmaps and micro-interactions seamlessly.", is_primary: true }
    ],
    scope: {
      in_scope: ["JavaScript SDK (<50KB)", "Behavioral heatmap generator", "SaaS dashboard for insights"],
      out_of_scope: ["Full enterprise CRM integration"]
    },
    functional_requirements: [
      { id: "func-001", category: "SDK", requirement: "System must trigger contextual surveys based on session stagnation (>10s on one element).", priority: "Must Have", acceptance_criteria: ["Triggers accurately in 95% cases"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Performance", requirement: "SDK performance impact must be < 100ms on TTI (Time to Interactive).", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["Next.js", "TailwindCSS", "Node.js/Redis for streaming events"], integrations: ["Segment/Mixpanel fallback"] },
    user_stories: [
      { role: "UX Designer", action: "see a video reply of a failed checkout session", outcome: "immediately identify the confusing button label", acceptance_criteria: ["Session playback latency < 2s"] }
    ],
    success_metrics: { primary: ["30% increase in product feedback response rate", "50% reduction in time to identify UX bottlenecks"], secondary: ["SDK size < 30KB (Gzipped)"] },
    timeline_milestones: [{ event: "Beta SDK", date: "2026-05-15", description: "Working event tracking and heatmap baseline." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Data Streaming", weight: 40, description: "Efficiency of event capture." }],
      functional: [{ criterion: "UI Dashboard", weight: 40, description: "Clarity of behavioral insights." }],
      innovation: [{ criterion: "SDK Footprint", weight: 20, description: "Minimal impact on host performance." }]
    },
    resources_provided: { documentation: ["Techwalnut product user flow maps", "API specs"] },
    constraints_guidelines: { constraints: ["Must be fully GDPA/data privacy compliant."], guidelines: ["Adhere to inclusive design/A11y standards."] },
    prize_pool: { total: "₹1,50,000", currency: "INR", breakdown: ["Winner: ₹1L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-011",
    company_id: "company-navitas-011",
    company_automation_interest_id: "int-nav-011",
    automation_need_id: "need-nav-drone",
    sector_id: "drone_tech",
    mosi_session_id: "mosi-nag-011",
    prd_code: "NAG/2026/DRN/011",
    title: "Intelligent Adaptive Lighting System for SAR Drones",
    slug: "navitas-drone-lighting",
    executive_summary: "Develop an intelligent adaptive lighting system for Navitas (Zero Systems) to enhance search and rescue operations through drones.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Standard drone searchlights have fixed beam patterns that either blind the sensor in fog or fail to illuminate distant ground targets effectively in uneven terrain.",
      impact: "Search and rescue missions at night take longer, reducing the survival probability in critical situations.",
      stakeholders_affected: ["Rescue Teams", "Drone Pilots", "Disaster Management Authorities"],
      root_causes: ["Atmospheric scattering", "Fixed optical geometry", "Manual light adjustment lag"],
      current_workarounds: ["Dual-light setups (heavy)", "Flying at lower altitudes (risky)"],
      cost_of_inaction: "Potential loss of life due to visibility-related delays."
    },
    objectives: [
      { title: "Adaptive Optics", description: "Implement a motorized or solid-state beam adjustment from 10° to 120°.", is_primary: true },
      { title: "Intelligent Control", description: "Direct linkage between GIMBAL status and lighting intensity/beam.", is_primary: true }
    ],
    scope: {
      in_scope: ["High-power LED driver (up to 200W)", "Adaptive optical lens system", "Drone telemetry handshake"],
      out_of_scope: ["Drone frame manufacturing", "SAR mission planning software"]
    },
    functional_requirements: [
      { id: "func-001", category: "Lighting", requirement: "System must automatically narrow beam as drone altitude increases (>50m).", priority: "Must Have", acceptance_criteria: ["Verified by flight telemetry log sync"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Weight", requirement: "Total module weight must be < 400g.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["Embedded C/C++", "MAVLink protocol", "SolidWorks for optics"], integrations: ["DJI SDK / PX4 Integration"] },
    user_stories: [
      { role: "Rescue Coordinator", action: "detect a person via thermal sensor", outcome: "drone light automatically 'spotlights' the target to assist ground teams", acceptance_criteria: ["Handshake latency < 500ms"] }
    ],
    success_metrics: { primary: ["2x increase in night-time search area coverage", "40% power savings through intelligent intensity scaling"], secondary: ["Zero optical flare on host camera"] },
    timeline_milestones: [{ event: "Optics Prototype", date: "2026-05-15", description: "Demonstrate beam zooming on test bench." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Optical Precision", weight: 40, description: "Uniformity of light beam." }],
      functional: [{ criterion: "Integration Lag", weight: 30, description: "Speed of response to telemetry." }],
      innovation: [{ criterion: "Weight Efficiency", weight: 30, description: "Power-to-weight ratio." }]
    },
    resources_provided: { documentation: ["Navitas drone electrical interface guide", "MAVLink library"] },
    constraints_guidelines: { constraints: ["Must withstand high vibrations and wind shear."], guidelines: ["Follow aviation electrical safety norms."] },
    prize_pool: { total: "₹2,50,000", currency: "INR", breakdown: ["Winner: ₹2L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-012",
    company_id: "company-automation-controls-012",
    company_automation_interest_id: "int-ac-012",
    automation_need_id: "need-ac-fire-detection",
    sector_id: "safety_tech",
    mosi_session_id: "mosi-nag-012",
    prd_code: "NAG/2026/SFT/012",
    title: "AI-Powered Fire Detection and Suppression System",
    slug: "automation-controls-fire-ai",
    executive_summary: "Develop an AI-based early fire detection and targeted suppression system for Automation Controls, specifically for cotton processing environments.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Cotton ginning plants face high risk of 'flash fires' that traditional smoke detectors can't catch until it's too late for the whole facility.",
      impact: "Entire stock of raw cotton and expensive machinery destroyed in minutes.",
      stakeholders_affected: ["Ginning Plant Owners", "Insurers", "Safety Officers"],
      root_causes: ["High static electricity", "Flammability of cotton dust", "Slow response of generic detectors"],
      current_workarounds: ["Manual patrolling", "General sprinklers (damage clean stock)"],
      cost_of_inaction: "₹1 Crore+ loss per major industrial fire event."
    },
    objectives: [
      { title: "Early Detection", description: "Identify flame/spark within 200ms using multi-spectral AI vision.", is_primary: true },
      { title: "Targeted Suppression", description: "Direct a precise spray to the fire source instead of the whole hall.", is_primary: true }
    ],
    scope: {
      in_scope: ["Thermal/Vision data fusion algorithm", "Motorized suppression nozzle control", "Industrial alarm interface"],
      out_of_scope: ["Full plant plumbing install", "Fire insurance certification"]
    },
    functional_requirements: [
      { id: "func-001", category: "AI", requirement: "System must distinguish between moving vehicle lights and real sparks/flame.", priority: "Must Have", acceptance_criteria: ["False positive rate < 0.1%"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Reliability", requirement: "Fault-tolerant operation with 24/7 self-diagnostics.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["PyTorch for vision", "NVIDIA Xavier for edge AI", "RTOS for suppression control"], integrations: ["Existing Central Fire Panel API"] },
    user_stories: [
      { role: "Safety Officer", action: "receive a real-time 'Pre-alert' on tablet", outcome: "isolate the specific conveyor before a spark spreads", acceptance_criteria: ["Alert latency < 1s"] }
    ],
    success_metrics: { primary: ["98% detection of sparked cotton before transition to flame", "95% reduction in total water damage through targeted activation"], secondary: ["ROI through insurance premium reduction"] },
    timeline_milestones: [{ event: "Spark Detection", date: "2026-05-15", description: "Identify cigarette-size spark at 10m in dusty room." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Algorithm Recall", weight: 50, description: "Sensitivity to tiny sparks." }],
      functional: [{ criterion: "System Response", weight: 30, description: "Total time from detection to suppression." }],
      innovation: [{ criterion: "Robustness", weight: 20, description: "Operation in extreme dust conditions." }]
    },
    resources_provided: { documentation: ["Cotton mill layout examples", "Fire safety code IS 2189"] },
    constraints_guidelines: { constraints: ["All sensors must be explosion-proof (EX rated)."], guidelines: ["Follow UL/FM standards for fire detection sensitivity."] },
    prize_pool: { total: "₹3,00,000", currency: "INR", breakdown: ["Winner: ₹2.5L", "Runner-up: ₹50k"] }
  },
  {
    id: "prd-nag-013",
    company_id: "company-hixaa-013",
    company_automation_interest_id: "int-hix-013",
    automation_need_id: "need-hix-tracking",
    sector_id: "safety_tech",
    mosi_session_id: "mosi-nag-013",
    prd_code: "NAG/2026/SFT/013",
    title: "GPS-Denied Worker Safety System for Confined Spaces",
    slug: "hixaa-confined-space-safety",
    executive_summary: "Develop a real-time location and vital monitoring system for workers in confined spaces where GPS and mobile networks are unavailable.",
    status: "published",
    version: 1,
    competition_type: "makeathon",
    trl_level_expected: "6-7",
    submission_deadline: "2026-06-15",
    evaluation_start_date: "2026-06-16",
    results_announcement_date: "2026-06-30",
    problem_statement: {
      overview: "Workers in underground tanks, mines, or industrial basements cannot be tracked via standard GPS, making emergency rescue purely manual and risky.",
      impact: "Delayed emergency response leads to preventable fatalities in confined space accidents.",
      stakeholders_affected: ["Site Supervisors", "EHS Managers", "First Responders"],
      root_causes: ["Fartaday cage effect in structures", "Lack of ad-hoc mesh networks", "Harsh RF environments"],
      current_workarounds: ["Manual check-ins", "Physical tether lines"],
      cost_of_inaction: "High human risk and multi-million $ legal liabilities for MSMEs."
    },
    objectives: [
      { title: "Indoor Positioning", description: "Track workers with < 3m accuracy using UWB or BLE mesh.", is_primary: true },
      { title: "Vital Link", description: "Real-time Fall detection and Heart Rate monitoring.", is_primary: true }
    ],
    scope: {
      in_scope: ["Wearable device (bracelet/tag)", "Portable mesh anchor nodes", "Command center dashboard"],
      out_of_scope: ["Full industrial SCADA integration", "Satellite linkup"]
    },
    functional_requirements: [
      { id: "func-001", category: "Connectivity", requirement: "System must auto-form a mesh network within 60s of node placement.", priority: "Must Have", acceptance_criteria: ["Verified by network topology map on dashboard"], dependencies: [] }
    ],
    non_functional_requirements: [
      { id: "nfunc-001", category: "Ruggedness", requirement: "Wearable must be IP68 and intrinsically safe for explosive gases.", priority: "Critical" }
    ],
    technical_specifications: { tech_stack: ["Zephyr RTOS", "UWB (Ultra-Wide Band)", "Elixir/Phoenix for real-time dashboard"], integrations: ["Raksha IoT cloud fallback"] },
    user_stories: [
      { role: "Safety Supervisor", action: "see a 'Man Down' alert", outcome: "instantly locate the worker on a 3D floor plan for the rescue team", acceptance_criteria: ["Alert triggered in < 3s after fall"] }
    ],
    success_metrics: { primary: ["Location accuracy < 2m in steel tanks", "100% vital data availability across mesh"], secondary: ["Mesh node battery life > 48h for continuous missions"] },
    timeline_milestones: [{ event: "Mesh Reliability Demo", date: "2026-05-15", description: "Data transfer across 5 hops in blocked environment." }],
    evaluation_criteria: { 
      technical: [{ criterion: "Positioning Precision", weight: 40, description: "3D location accuracy." }],
      functional: [{ criterion: "Wearable Comfort", weight: 30, description: "Ergonomics for full-shift use." }],
      innovation: [{ criterion: "Mesh Resilience", weight: 30, description: "Self-healing network logic." }]
    },
    resources_provided: { documentation: ["Hixaa Raksha protocol overview", "Confined space safety standards"] },
    constraints_guidelines: { constraints: ["Must avoid interference with existing industrial WiFi."], guidelines: ["Adhere to ISA 100.11a wireless standards."] },
    prize_pool: { total: "₹4,00,000", currency: "INR", breakdown: ["Winner: ₹3L", "Runner-up: ₹1L"] }
  }
];
