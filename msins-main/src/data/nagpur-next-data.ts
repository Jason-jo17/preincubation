import { type MsmeChallengeListItem } from "./msme-challenges-list";

export interface ProgramMetadata {
  program: string;
  platform: string;
  category: string;
  program_duration: string;
  format: string;
  culmination: string;
  opportunity: string;
  source_document: string;
  version: string;
  created_date: string;
  total_challenges: number;
}

export interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: number;
  status: string;
  opportunity?: boolean;
}

export interface MosiInterview {
  id: string;
  challenge_id: string;
  company_id: string;
  stakeholder_id: string;
  status: string;
  date: string;
  duration: number;
  summary: string;
  problem_summary: string;
  potential_roi: string;
  tech_stack_recommended: string[];
  metadata: {
    stakeholder: string;
    designation: string;
    company: string;
    location: string;
    session_name: string;
  };
  transcript: TranscriptEntry[];
}

export interface ChallengePRD {
  executive_summary: string;
  problem_statement?: {
    overview: string;
    current_state?: string[];
    desired_state?: string[];
    impact?: string;
    root_causes?: string[];
    constraints?: string[];
    requirements?: string[];
    use_cases?: string[];
    fire_risks?: string[];
    current_issues?: string[];
  };
  functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
    priority: string;
  }[];
  non_functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
  }[];
  technical_specifications?: {
    architecture?: string;
    tech_stack_recommended?: string[];
    integration_points?: string[];
    hardware_requirements?: string[];
    frontend?: string;
    backend?: string;
    cad_integration?: string;
    nesting?: string;
    design_tools?: string[];
    semiconductor?: string;
    pcb?: string;
    testing?: string;
    hardware?: string[];
    software?: string[];
    power?: string;
    sensing?: string;
    processor?: string;
    display?: string;
    battery?: string;
    plc?: string;
    tension_control?: string;
    hmi?: string;
    data?: string;
    sensors?: string[];
    controller?: string;
    database?: string;
    ml_platform?: string;
    widget?: string;
    analytics?: string;
    nlp?: string;
    optics?: string;
    led?: string;
    gimbal?: string;
    vision?: string;
    ai?: string;
    compute?: string;
    actuator?: string;
    positioning?: string;
    vitals?: string;
    safety?: string;
    network?: string;
    wearable?: string;
  };
  success_metrics: {
    primary_kpis: {
      metric?: string;
      baseline?: string;
      target: string;
      timeframe?: string;
    }[];
    secondary_kpis?: {
      metric: string;
      baseline: string;
      target: string;
    }[];
  };
  timeline_weeks: number;
  budget_estimate: string;
  eligibility_criteria?: {
    msme_requirements: string[];
    problem_requirements: string[];
  };
  evaluation_criteria?: string[];
}

export interface NagpurNextChallenge extends MsmeChallengeListItem {
  challenge_number: number;
  official_title: string;
  domain: string;
  tech_stack: string[];
  hmw_statement: string;
  challenge_overview: string;
  student_deliverables: string[];
  expected_outcome: string;
  complexity: "Variable" | "Low" | "Medium" | "High" | "Very High";
  skills_required: string[];
  prd?: ChallengePRD;
  mosi_interviews?: MosiInterview[];
  reference_videos?: string[];
  existing_product?: string;
  proposed_solution_pdf?: string;
  industry_context?: string;
  tags: string[];
}

export const NAGPUR_NEXT_PROGRAM_META: ProgramMetadata = {
  program: "Nagpur NEXT Student Innovation Challenge 2026",
  platform: "Inpulse by InUnity",
  category: "MSME Innovation",
  program_duration: "3 months of intensive collaboration",
  format: "Student teams partnered with MSME mentors",
  culmination: "Demo Day pitch to industry leaders",
  opportunity: "Incubation support for winning solutions",
  source_document: "Nagpur_NEXT_Innovation_Challenge_Documentation.docx",
  version: "2.0.0",
  created_date: "2026-04-07",
  total_challenges: 12,
};

// Aggregate Metrics for Data Uniformity
export const NAGPUR_TOTAL_CHALLENGES = 12;
export const NAGPUR_TOTAL_APPLICANTS = 121; // Calculated from nagpur-next-data.ts
export const NAGPUR_AVG_IMPACT = 8.4;


export const NAGPUR_NEXT_CHALLENGES: NagpurNextChallenge[] = [
  {
    id: "challenge-nag-011",
    challenge_number: 11,
    official_title: "Intelligent Lighting Systems for Drones",
    title: "SAR Drone Lighting Systems",
    domain: "Drones / Emergency Response",
    tech_stack: ["Swarm Intelligence", "LED Systems", "Communication Protocols", "Path Planning"],
    hmw_statement: "How might we enable coordinated fleets of drones with intelligent lighting to cover dark zones during search-and-rescue?",
    challenge_overview: "Single drones have limited range/battery. Coordinated fleets with adaptive beam lighting (10-120°) are needed for large-area SAR at night.",
    company: "Navitas (Zero Systems)",
    region: "Nagpur",
    department: "Drone Lab",
    sector: "Drones",
    status: "Published",
    applicants: 12,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Adaptive beam (10-120°) drone lights slaved to camera tracking for emergency response.",
    problemLocation: "SAR Operation Zones",
    businessImpact: "+50% faster coverage; camera-integrated target illumination.",
    desiredOutcome: "Ultra-efficient <50W lighting with MAVLink flight controller integration.",
    student_deliverables: [
      "Design swarm coordination algorithms",
      "Develop energy-efficient LED systems",
      "Create fleet communication protocols",
      "Implement autonomous path planning",
    ],
    expected_outcome: "Efficient large-area nighttime SAR coverage.",
    proposed_solution_pdf: "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf",
    mosi_interviews: [
      {
        id: "mosi-nag-011",
        challenge_id: "challenge-nag-011",
        company_id: "company-navitas-011",
        stakeholder_id: "stakeholder-navitas-01",
        status: "Published",
        date: "2026-04-05",
        duration: 2400,
        summary: "Discovery session on adaptive lighting system requirements for search and rescue drones, exploring beam control, mission profiles, and power optimization needs.",
        problem_summary: "Fixed drone lights cannot adapt to SAR mission needs – wide scanning vs focused illumination. High power consumption limits flight time. No integration with cameras.",
        potential_roi: "40% improvement in night SAR area coverage; 30% flight time extension; 50% reduction in operator workload.",
        tech_stack_recommended: ["STM32", "Liquid lens optics", "MAVLink", "React", "PWM drivers"],
        metadata: {
          stakeholder: "Rashmi Kulkarni",
          designation: "Managing Partner",
          company: "Navitas (Zero Systems)",
          location: "Nagpur, Maharashtra",
          session_name: "SAR Drone Lighting Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Rashmi, tell us about Zero Systems and your work with drones.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Rashmi",
            "text": "Navitas through Zero Systems builds application-specific drone solutions. We've worked with disaster response teams, wildlife monitoring organizations, and industrial inspection clients. Lighting has been a persistent pain point for night operations.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "What's wrong with current drone lighting options?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Rashmi",
            "text": "They're essentially flashlights mounted on drones. Fixed beam angle, fixed intensity. During search, you need wide coverage. When you spot something, you need focused light on that spot. Currently you either compromise on both or carry multiple lights.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "How do SAR missions typically work at night?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Rashmi",
            "text": "Two phases. Search phase – drone flies at 50-100m altitude, scanning large areas. You want flood light, as wide as possible. Once you detect something – a person, a vehicle – you switch to inspect phase. Drop altitude, focus light on target, maybe hover while ground team reaches.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "What beam angles would cover these scenarios?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Rashmi",
            "text": "Search phase needs 90-120 degrees – really wide. Inspect phase needs 10-20 degrees for concentrated light. And you need to transition smoothly, ideally automatically based on altitude. Lower altitude, tighter beam.",
            "timestamp": 480,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "Is there interest in integrating with the camera system?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Rashmi",
            "text": "Absolutely. If the thermal camera detects a heat signature, the visible light should automatically point there. Object tracking illumination – keep the light on the target as the drone moves. That's game-changing for rescue teams.",
            "timestamp": 600,
            "status": "Approved"
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What are the weight and power constraints?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Rashmi",
            "text": "Total lighting payload should be under 500 grams including mount and controller. Power under 50 watts at peak – lights are the biggest battery drain after motors. Intelligent power management that dims when not needed would significantly extend mission time.",
            "timestamp": 720,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "Any special spectrum requirements?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Rashmi",
            "text": "White for general search. Red for preserving night vision of ground crew. IR for covert operations where you don't want to alert anyone. Having all three switchable in one unit would be ideal. The control system needs to handle all these modes.",
            "timestamp": 840,
            "status": "Approved"
          }
        ]
      }
    ],
    complexity: "High",
    skills_required: ["Embedded Systems", "Optics", "Mechanical Design", "Drone Systems"],
    tags: ["Drones", "SAR", "Emergency Response", "Adaptive Optics", "UAV Payloads"],
    prd: {
      executive_summary: "Design an adaptive lighting system for search and rescue drones.",
      problem_statement: {
        overview: "Current search and rescue (SAR) operations using drones at night are heavily constrained by lighting. Single-purpose payload drones have limited range and battery life, and static lighting systems cannot adapt to varying altitudes or tracking requirements.",
        current_state: [
          "Drones equipped with standard lights waste battery illuminating non-essential areas.",
          "Fixed beam angles fail to provide adequate coverage during multi-altitude sweeps.",
          "Lack of tracking integration makes target acquisition slow and manual."
        ],
        impact: "Inefficient lighting drastically reduces the effective operational window for nighttime SAR, increasing the risk to lost individuals and extending mission timelines."
      },
      success_metrics: {
        primary_kpis: [
{ metric: "Beam Adjustable", target: "10-120°" },
          { metric: "Power", target: "<50W" },
        ],
      },
      functional_requirements: [
        { id: "FR-11-001", category: "Optics", requirement: "Dynamic beam angle control (10° to 120°) via flight controller command", priority: "P0" },
        { id: "FR-11-002", category: "Power", requirement: "Peak power consumption restricted to <50W for battery preservation", priority: "P0" },
        { id: "FR-11-003", category: "Integration", requirement: "MAVLink protocol support for synchronized camera tracking", priority: "P1" },
        { id: "FR-11-004", category: "Lighting", requirement: "Multi-spectrum switching (White, Red, IR) within a single unit", priority: "P2" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹5-8 Lakhs for prototype",
    },
  },  {
    id: "challenge-nag-012",
    challenge_number: 12,
    official_title: "Fire Detection and Suppression System",
    title: "Industrial Fire Detection AI",
    domain: "Industrial Safety",
    tech_stack: ["Fire Sensors", "Microcontrollers", "Suppression Systems", "Automation"],
    hmw_statement: "How might we design an automatic system to detect and suppress fires early in cotton industries?",
    challenge_overview: "Cotton is highly flammable. Smoke detectors trigger too late. Needs thermal/vision-based early hot-spot detection with targeted suppression.",
    company: "Automation Controls",
    region: "Nagpur",
    department: "Safety Division",
    sector: "Manufacturing",
    status: "Published",
    applicants: 10,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Thermal+AI fire detection with targeted pan-tilt water mist for cotton ginning safety.",
    problemLocation: "Cotton Ginning Unit",
    businessImpact: "Detection <10 seconds; zero water drenching damage.",
    desiredOutcome: "99% false alarm suppression in dusty environments.",
    student_deliverables: [
      "Identify early fire sensors (thermal/flame)",
      "Design control logic for suppression",
      "Develop targeted misting mechanism",
      "Demonstrate simulated fire response",
    ],
    expected_outcome: "Automatic early fire detection and suppression for cotton plants.",
    mosi_interviews: [
      {
        id: "mosi-nag-012",
        challenge_id: "challenge-nag-012",
        company_id: "company-automation-controls-012",
        stakeholder_id: "stakeholder-automation-01",
        status: "Published",
        date: "2026-04-06",
        duration: 2700,
        summary: "Discovery session on AI-powered fire detection and suppression for cotton processing, exploring early detection challenges and targeted suppression requirements.",
        problem_summary: "Cotton processing has extreme fire risk. Smoke detectors trigger too late. Sprinkler systems cause collateral damage. Need early thermal detection with targeted suppression.",
        potential_roi: "90% faster detection; 70% reduction in fire damage; 50% reduction in insurance premiums; 80% less collateral damage.",
        tech_stack_recommended: ["FLIR thermal", "YOLOv8", "NVIDIA Jetson", "Pan-tilt actuators", "Water mist systems"],
        metadata: {
          stakeholder: "Latesh Agrawal",
          designation: "CEO",
          company: "Automation Controls",
          location: "Nagpur, Maharashtra",
          session_name: "Fire Detection Suppression Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Latesh ji, tell us about fire risks in cotton processing and why current systems fall short.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Latesh",
            "text": "Cotton is extremely flammable – the fibers, the dust, everything. A spark from machinery, static electricity, even a hot bearing can start a fire. And once it starts in cotton, it spreads explosively. We've seen entire warehouses gone in 20 minutes.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "What fire protection do cotton mills typically have?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Latesh",
            "text": "Smoke detectors and sprinkler systems. Problem with smoke detectors – they trigger only when there's significant smoke, meaning fire is already established. Problem with sprinklers – they drench everything. Water damage to undamaged cotton is sometimes worse than fire damage.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "What would earlier detection look like?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Latesh",
            "text": "Detecting hot spots before they become flames. Cotton ignites around 400°C, but a smoldering hot spot might be 100-150°C for minutes before it flames. If we catch it at 80-100°C, we can prevent fire entirely. That requires thermal cameras, not smoke sensors.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "How would AI help in this scenario?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Latesh",
            "text": "Cotton mills have normal heat sources – motors running, bearings warm, even sunlight. AI needs to distinguish normal process heat from anomalous heat that indicates a problem. Pattern recognition – where heat shouldn't be, how fast it's growing, whether it's accompanied by visual smoke.",
            "timestamp": 480,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "What about the suppression side?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Latesh",
            "text": "Targeted suppression is key. Instead of flooding the whole zone, you want a nozzle that aims exactly at the hot spot. There was a viral video of a Chinese system at a railway station – AI detected fire, turret aimed automatically, and extinguished it. That's what we need.",
            "timestamp": 600,
            "status": "Approved"
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "We have that reference video. What suppression agents would work for cotton?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Latesh",
            "text": "Water mist is preferable to water spray – less water, more surface coverage. For enclosed spaces, CO2 or foam could work. The key is getting agent to the source fast and accurately, not blanketing the area.",
            "timestamp": 720,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "What's the false alarm tolerance in such a system?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Latesh",
            "text": "Very low. If the system cries wolf 5 times, the sixth time people ignore it or disable it. False alarm rate needs to be under 1%. That's where the AI has to be really well trained on cotton mill specific data.",
            "timestamp": 840,
            "status": "Approved"
          },
          {
            "id": "t15",
            "speaker": "Interviewer",
            "text": "What would be the business impact if such a system worked?",
            "timestamp": 900,
            "status": "Approved"
          },
          {
            "id": "t16",
            "speaker": "Latesh",
            "text": "Insurance companies would love it – probably 30-50% premium reduction for certified systems. Mill owners would save on actual fire losses. And we could sell it across Vidarbha's cotton belt – hundreds of ginning mills, spinning mills. Huge market.",
            "timestamp": 960,
            "status": "Approved"
          }
        ]
      }
    ],
    reference_videos: ["https://www.youtube.com/shorts/VO9VtvpyVUI"],
    complexity: "High",
    skills_required: ["Computer Vision", "Deep Learning", "Embedded Systems", "Mechanical Design"],
    tags: ["Fire Safety", "Computer Vision", "Industrial Safety", "Cotton Industry", "AI"],
    prd: {
      executive_summary: "Design AI-powered fire detection using thermal cameras with targeted suppression.",
      success_metrics: {
        primary_kpis: [
{ metric: "Detection Time", target: "<10 seconds" },
          { metric: "False Alarm Rate", target: "<1%" },
        ],
      },
      functional_requirements: [
        { id: "FR-12-001", category: "Detection", requirement: "Real-time thermal hot-spot detection (80°C - 120°C) using IR array", priority: "P0" },
        { id: "FR-12-002", category: "AI", requirement: "Anomalous heat pattern recognition to suppress false alarms from machinery", priority: "P0" },
        { id: "FR-12-003", category: "Suppression", requirement: "Automatic pan-tilt turret orientation toward detected heat centroid", priority: "P1" },
        { id: "FR-12-004", category: "Safety", requirement: "Targeted water-mist deployment with <10 second response delay", priority: "P1" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹8-12 Lakhs for prototype",
    },
  },  {
    id: "challenge-nag-001",
    challenge_number: 1,
    official_title: "Workflow Optimisation for Shopfloor",
    title: "Workflow Optimisation for Shopfloor",
    domain: "Manufacturing Automation",
    tech_stack: ["IoT Sensors", "Real-time Dashboards", "Mobile Apps", "Data Analytics"],
    hmw_statement: "How might we design a digital workflow system that streamlines shop-floor operations and boosts efficiency beyond the current 50–60%?",
    challenge_overview: "Manufacturing industries in the MSME sector face inefficient workflows, lack of real-time visibility, and dependence on manual coordination, resulting in efficiency levels of only 50–60%. Companies like Ashta Tech Automation Pvt. Ltd. deal with unplanned downtime, delayed job allocation, and material unavailability.",
    company: "Ashta Tech Automation Pvt. Ltd.",
    region: "Nagpur",
    department: "Shopfloor",
    sector: "Manufacturing",
    status: "Published",
    applicants: 12,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Design a digital workflow system for Ashta Tech to transform shop-floor operations and boost OEE from 50-60% to 75%+.",
    problemLocation: "Ashta Tech Shopfloor",
    businessImpact: "25% order delays; customer churn; ₹25-40L annual opportunity cost.",
    desiredOutcome: "Reduced idle time, proactive alerts, 75%+ OEE, and data-driven insights.",
    student_deliverables: [
      "Identify inefficiencies in shop-floor workflows",
      "Design a digital job management system",
      "Develop a real-time monitoring dashboard",
      "Create downtime tracking and root-cause analysis",
      "Integrate mobile/tablet-based operator interfaces",
      "Consider scalability across factory sizes",
    ],
    expected_outcome: "Reduce machine idle time, improve coordination, increase OEE, enhance productivity.",
    mosi_interviews: [
      {
        id: "mosi-nag-001",
        challenge_id: "challenge-nag-001",
        company_id: "company-ashta-001",
        stakeholder_id: "stakeholder-ashta-01",
        status: "Published",
        date: "2026-03-15",
        duration: 2700,
        summary: "Technical discovery session focusing on shopfloor visibility challenges, manual scheduling inefficiencies, and OEE improvement opportunities in industrial automation manufacturing.",
        problem_summary: "No real-time visibility into machine status and production progress. Manual scheduling with Excel leads to suboptimal resource utilization and missed deliveries.",
        potential_roi: "15-20% improvement in OEE; ₹25-40 Lakhs annual savings through reduced idle time and improved scheduling.",
        tech_stack_recommended: ["Node.js", "React", "MQTT", "Modbus TCP", "TimescaleDB", "Python (ML)"],
        metadata: {
          stakeholder: "Harshad Wasule",
          designation: "Technical Director",
          company: "Ashta Tech Automation Pvt. Ltd.",
          location: "Nagpur, Maharashtra",
          session_name: "Shopfloor Workflow Optimization Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Thank you for meeting with us, Harshad ji. Can you walk us through how production scheduling currently works at Ashta Tech?",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Harshad",
            "text": "Sure. Right now, our production planning is done weekly in Excel. The planning team takes customer orders, checks machine availability based on what supervisors tell them, and creates a schedule. Then we print job cards and distribute them to the floor.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "How do you track progress against that schedule during the week?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Harshad",
            "text": "That's where the problem starts. We rely on supervisors walking the floor and calling in updates. By the time I know there's a delay, it's already too late to adjust. We're always firefighting.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "What percentage of deliveries would you say are delayed due to these visibility issues?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Harshad",
            "text": "Honestly, about 25% of our orders face some delay. We've lost some repeat customers because of this. Our OEE is probably around 55-60%, but I can't even calculate it properly because we don't have accurate data.",
            "timestamp": 360,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "Do your machines have PLCs or any digital interface we could tap into for data?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Harshad",
            "text": "About 60% of our machines have Siemens or Delta PLCs. The older ones, maybe 40%, have no digital interface at all. We'd need some kind of retrofit sensors for those.",
            "timestamp": 480,
            "status": "Approved"
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "What would be the ideal outcome for you? If we could build something, what would success look like?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Harshad",
            "text": "I want to see all my machines on a screen, know which ones are running, which are idle, and why. I want to know if we're going to miss a deadline before it happens, not after. And I want operators to log their work digitally, not on paper that gets lost.",
            "timestamp": 600,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "If we could get your OEE from 55% to 70%, what would that mean in rupees?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Harshad",
            "text": "That's a 15 percentage point improvement. With our current capacity, that's easily ₹30-40 lakhs per year in additional throughput without adding any machines. Plus savings from reduced overtime and expediting costs.",
            "timestamp": 720,
            "status": "Approved"
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "Are your operators comfortable with mobile apps or tablets?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Harshad",
            "text": "The younger ones, yes. Some senior operators might need training. But if the app is simple, just tap to start, tap to stop, I think they can learn quickly. The key is it shouldn't slow them down.",
            "timestamp": 840,
            "status": "Approved"
          },
          {
            "id": "t15",
            "speaker": "Interviewer",
            "text": "What budget would you have in mind for such a system?",
            "timestamp": 900,
            "status": "Approved"
          },
          {
            "id": "t16",
            "speaker": "Harshad",
            "text": "We've looked at MES systems from Siemens and others – they quoted ₹50 lakhs and up. That's out of reach. If something can be built for ₹5-10 lakhs that solves even 60% of the problem, I'd be very interested.",
            "timestamp": 960,
            "status": "Approved"
          }
        ]
      }
    ],
    complexity: "High",
    skills_required: ["IoT/Embedded Systems", "Web Development", "Database Design", "UI/UX", "Industrial Protocols"],
    tags: ["Industry 4.0", "MES", "OEE", "IoT", "Manufacturing", "Digital Transformation"],
    prd: {
      executive_summary: "Design a comprehensive digital workflow system to transform shop-floor operations in MSME manufacturing facilities.",
      problem_statement: {
        overview: "Manufacturing MSMEs operate at 50-60% efficiency due to lack of real-time visibility, manual coordination, and reactive problem-solving.",
        current_state: ["Manual job allocation via paper job cards", "No real-time visibility into machine status", "Reactive response to breakdowns"],
        desired_state: ["Digital job management with real-time tracking", "Live dashboard showing all machine status", "Mobile-first operator interfaces"],
        impact: "25% of orders face delays; customer churn due to missed deadlines; ₹25-40 Lakhs annual opportunity cost.",
        root_causes: ["No digital infrastructure for shopfloor operations", "Lack of IoT connectivity to machines"],
      },
      functional_requirements: [
        { id: "FR-001", category: "Job Management", requirement: "Digital job card creation with barcode/QR assignment", priority: "P0" },
        { id: "FR-002", category: "Job Management", requirement: "Real-time job status tracking", priority: "P0" },
        { id: "FR-003", category: "Machine Monitoring", requirement: "Machine status dashboard", priority: "P0" },
        { id: "FR-004", category: "Analytics", requirement: "Automated OEE calculation and downtime root-cause reporting", priority: "P1" },
      ],
      success_metrics: {
        primary_kpis: [
{ metric: "OEE", baseline: "55-60%", target: "70-75%", timeframe: "6 months" },
          { metric: "On-Time Delivery", baseline: "75%", target: "90%", timeframe: "6 months" },
        ],
      },

      timeline_weeks: 12,
      budget_estimate: "₹5-10 Lakhs for MVP including hardware",
    },
  },

  {
    id: "challenge-nag-003",
    challenge_number: 3,
    official_title: "Swappable Battery for Tractors",
    title: "Swappable Battery for Tractors",
    domain: "Electric Mobility / AgriTech",
    tech_stack: ["Battery Management Systems", "Mechanical Engineering", "Solar Integration", "IoT"],
    hmw_statement: "How might we design a fast, safe, and cost-effective battery swapping system for tractors to minimize downtime and enable reliable electric farming operations?",
    challenge_overview: "Electric tractors face major downtime due to long plug-in charging times (several hours), which is impractical during critical farming windows. Existing solutions rely on stable power infrastructure unavailable in rural areas.",
    company: "Tractor Seva",
    region: "Nagpur",
    department: "R&D",
    sector: "Electric Mobility",
    status: "Published",
    applicants: 8,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Designing a battery swapping ecosystem to solve charging downtime for electric tractors in rural scenarios.",
    problemLocation: "Rural Farms",
    businessImpact: "75%+ fleet utilization and reduced operational downtime.",
    desiredOutcome: "Battery swap in <5 minutes with solar-ready infrastructure.",
    student_deliverables: [
      "Identify energy requirements and duty cycles",
      "Design modular, durable battery packs",
      "Develop a mechanical docking/locking mechanism",
      "Integrate BMS and charging infrastructure",
      "Consider rural infrastructure constraints",
    ],
    expected_outcome: "Enable reliable electric farming operations with minimal downtime.",
    mosi_interviews: [
      {
        id: "mosi-nag-003",
        challenge_id: "challenge-nag-003",
        company_id: "company-tractor-seva-003",
        stakeholder_id: "stakeholder-tractor-01",
        status: "Published",
        date: "2026-03-20",
        duration: 3000,
        summary: "Technical discovery session on electric tractor battery challenges, exploring swappable battery design requirements for agricultural applications.",
        problem_summary: "Electric tractor charging takes 4-8 hours, but farming operations are time-critical. Need quick battery swap (<5 min) to enable continuous operation during peak farming seasons.",
        potential_roi: "3-4x increase in daily tractor utilization; enables battery-as-a-service business model; 50% TCO reduction vs diesel.",
        tech_stack_recommended: ["LFP Battery Chemistry", "CAN Bus BMS", "AWS IoT Core", "React Native", "SolidWorks"],
        metadata: {
          stakeholder: "Dhruvil Sheth",
          designation: "Founder & CEO",
          company: "Tractor Seva",
          location: "Nagpur, Maharashtra",
          session_name: "Swappable Battery System Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Dhruvil, tell us about Tractor Seva and the problem you're trying to solve with electric tractors.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Dhruvil",
            "text": "Tractor Seva is building an electric tractor rental platform for small farmers who can't afford to buy tractors. We've converted some tractors to electric, but the charging time is killing our business model.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "How long does charging currently take?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Dhruvil",
            "text": "Full charge is 6-8 hours. Even fast charging would be 2-3 hours. But during sowing or harvesting season, farmers need the tractor for 12-14 hours straight. They can't wait for charging.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "That's the classic EV challenge. What's your vision for solving it?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Dhruvil",
            "text": "Swappable batteries. Like NIO does for cars in China, or Gogoro for scooters. But for tractors, it's more complex. The batteries are heavier, the environment is harsh, and farmers aren't technically trained.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "What capacity batteries are we talking about?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Dhruvil",
            "text": "Each pack would be 20-30 kWh. Weight around 200-250 kg. You'd need 2-3 packs for a day's work. So a swap station would need to charge 4-6 batteries to handle our fleet.",
            "timestamp": 480,
            "status": "Approved"
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "How would the swap physically work? Can a farmer handle a 200kg battery?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Dhruvil",
            "text": "Definitely not manually. We need a mechanism – rails with assisted lifting, maybe gas springs or hydraulics. The farmer should just unlock, slide out, slide in the new one. Under 5 minutes total.",
            "timestamp": 600,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What about dust, water, vibration? Agriculture is a harsh environment.",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Dhruvil",
            "text": "That's our biggest concern. The connectors need to be IP67 minimum. Probably need dust caps and some kind of air purge when connecting. The battery enclosure has to survive monsoon and summer heat.",
            "timestamp": 720,
            "status": "Approved"
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "What about BMS? How would you track battery health across swappable packs?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Dhruvil",
            "text": "Each battery needs its own smart BMS that talks to the cloud. We need to track state of charge, state of health, cycle count, temperature history. If a battery is degrading, we should catch it before it goes into a tractor.",
            "timestamp": 840,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t15",
            "speaker": "Interviewer",
            "text": "What would this enable for your business model?",
            "timestamp": 900,
            "status": "Approved"
          },
          {
            "id": "t16",
            "speaker": "Dhruvil",
            "text": "Battery-as-a-service. Farmer pays per kWh used, not for the battery itself. Lower upfront cost for them, recurring revenue for us. And tractors can run 3-4x more hours per day. It completely changes the economics.",
            "timestamp": 960,
            "status": "Approved"
          }
        ]
      }
    ],
    complexity: "High",
    skills_required: ["Mechanical Engineering", "Battery Systems", "Embedded Systems", "IoT", "Rural Design"],
    tags: ["Electric Vehicles", "Battery Swap", "AgriTech", "Rural Technology", "Sustainable Farming"],
    prd: {
      executive_summary: "Design a complete swappable battery ecosystem for electric tractors including standardized battery packs and quick-swap mechanisms.",
      problem_statement: {
        overview: "Electric tractor charging takes 6-8 hours, but farming operations during sowing/harvesting require 12-14 hour continuous operation.",
      },
      success_metrics: {
        primary_kpis: [
{ metric: "Swap Time", target: "<5 minutes" },
          { metric: "Fleet Utilization", baseline: "40%", target: "75%" },
        ],
      },
      functional_requirements: [
        { id: "FR-03-001", category: "Mechanical", requirement: "Assisted quick-swap docking mechanism handling >200kg battery packs", priority: "P0" },
        { id: "FR-03-002", category: "Connectivity", requirement: "Standardized IP67-rated power/data connector for agricultural environments", priority: "P0" },
        { id: "FR-03-003", category: "BMS", requirement: "Real-time telemetry (SoC, SoH, Temperature) via CAN-to-Cloud gateway", priority: "P1" },
        { id: "FR-03-004", category: "Infrastructure", requirement: "Charging station logic for solar-priority multi-pack rotation", priority: "P2" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹15-25 Lakhs for prototype system",
    },
  },
  {
    id: "challenge-nag-004",
    challenge_number: 4,
    official_title: "Digital Platform for Custom Furniture",
    title: "Digital Platform for Custom Furniture",
    domain: "Manufacturing / Sustainability",
    tech_stack: ["CAD Integration", "Nesting Algorithms", "Web Platform", "Supply Chain"],
    hmw_statement: "How might we design a digital customization and sourcing platform that helps customers create dimension-based metal furniture while reducing material waste?",
    challenge_overview: "Metal furniture manufacturing involves significant material waste due to standardized sizing and poor design-production coordination. Customers struggle to find furniture that fits exact spatial needs.",
    company: "Aviven Engitech Pvt. Ltd. (Modura)",
    region: "Nagpur",
    department: "Digital Experience",
    sector: "Manufacturing",
    status: "Published",
    applicants: 5,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Web platform for 3D furniture customization with automated nesting to reduce sheet-metal waste.",
    problemLocation: "Modura Manufacturing Unit",
    businessImpact: "Design cycle reduced from 14 days to 2 days; material waste <8%.",
    desiredOutcome: "Mass customization with closed-loop recycling for offcuts.",
    student_deliverables: [
      "Identify customer requirements for customizable metal furniture",
      "Develop a dimension-based digital configuration system",
      "Design an intelligent sheet-metal nesting engine",
      "Propose a recycling loop for tracking offcuts",
    ],
    expected_outcome: "Reduce material waste and enable mass customization.",
    mosi_interviews: [
      {
        id: "mosi-nag-004",
        challenge_id: "challenge-nag-004",
        company_id: "company-modura-004",
        stakeholder_id: "stakeholder-modura-01",
        status: "Published",
        date: "2026-03-22",
        duration: 2400,
        summary: "Discovery session exploring the design-to-production workflow challenges in custom metal furniture manufacturing and the need for 3D visualization and automated drawing generation.",
        problem_summary: "Design iterations take weeks with manual back-and-forth. Customers cannot visualize the final product. Manufacturing drawings are created manually leading to errors.",
        potential_roi: "80% reduction in design cycle time; 30% improvement in quote-to-order conversion; 50% reduction in production errors.",
        tech_stack_recommended: ["Three.js", "React", "Node.js", "PostgreSQL", "ezdxf", "Python"],
        metadata: {
          stakeholder: "Aviikumar Ujwane",
          designation: "Founder & Director",
          company: "Aviven Engitech Pvt. Ltd. (Modura)",
          location: "Nagpur, Maharashtra",
          session_name: "Custom Furniture Platform Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Aviikumar, tell us about Modura and the kind of furniture you manufacture.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Aviikumar",
            "text": "Modura is our brand for custom metal furniture – office desks, industrial racks, modular workstations. Everything is custom because every client has different space constraints and requirements.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "Walk us through how a typical order flows from customer inquiry to production.",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Aviikumar",
            "text": "Customer calls or meets our sales team. They describe what they want, sometimes with a sketch, sometimes just verbally. Our designer creates a 2D drawing in AutoCAD. We send it for approval. Customer usually wants changes. We revise, send again. This goes 4-5 rounds typically.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "How long does this design iteration process take?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Aviikumar",
            "text": "Average 7-10 days. Sometimes 2-3 weeks if the customer is slow to respond or keeps changing requirements. By then, some customers lose patience and go elsewhere.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "What's the biggest communication gap you see?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Aviikumar",
            "text": "Customers can't visualize 2D drawings. They approve something, then when they see the finished product, they say 'this isn't what I imagined.' That's when problems start. We've had cases where we had to redo entire orders.",
            "timestamp": 480,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "Have you considered 3D visualization?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Aviikumar",
            "text": "Yes, but creating 3D models for every custom order takes even more time than 2D. We need something where the customer can configure dimensions themselves and see the 3D result instantly. Like those kitchen design tools, but for metal furniture.",
            "timestamp": 600,
            "status": "Approved"
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What happens after design approval? How do you create manufacturing drawings?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Aviikumar",
            "text": "The designer manually creates fabrication drawings – cutting lists, assembly views, BOM. This is where errors creep in. Wrong dimensions, missing parts. Our production team catches maybe 80% before fabrication, but 20% slip through.",
            "timestamp": 720,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "What would the ideal solution look like for you?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Aviikumar",
            "text": "A configurator where the customer picks a base design, adjusts dimensions, selects material and finish, sees it in 3D with realistic rendering. When they approve, the system automatically generates DXF files for our laser cutter and a BOM for procurement. Zero manual translation.",
            "timestamp": 840,
            "status": "Approved"
          },
          {
            "id": "t15",
            "speaker": "Interviewer",
            "text": "Would such a system also help with pricing?",
            "timestamp": 900,
            "status": "Approved"
          },
          {
            "id": "t16",
            "speaker": "Aviikumar",
            "text": "Absolutely. Right now, pricing is also manual calculation. If the configurator could calculate material weight, estimate labor, and give instant quotes – that alone would double our conversion rate. Customers want instant prices, not 'we'll get back to you.'",
            "timestamp": 960,
            "status": "Approved"
          }
        ]
      }
    ],
    complexity: "Medium",
    skills_required: ["Web Development", "3D Graphics (Three.js)", "CAD Integration", "Algorithm Design", "UI/UX"],
    tags: ["3D Configurator", "Custom Manufacturing", "Sustainability", "CAD/CAM", "Material Optimization"],
    prd: {
      executive_summary: "Build a 3D configurator platform enabling customers to customize metal furniture dimensions and optimize material usage.",
      problem_statement: {
        overview: "Design-to-production cycle takes 7-14 days due to manual 2D drawings. 15-20% material waste from poor nesting.",
      },
      success_metrics: {
        primary_kpis: [
{ metric: "Design Cycle Time", baseline: "7-14 days", target: "1-2 days" },
          { metric: "Material Waste", baseline: "15-20%", target: "<8%" },
        ],
      },
      functional_requirements: [
        { id: "FR-04-001", category: "Visualization", requirement: "Dimension-based 3D furniture configurator with real-time feedback", priority: "P0" },
        { id: "FR-04-002", category: "Manufacturing", requirement: "Automated DXF/SVG vector generation from custom dimensions", priority: "P0" },
        { id: "FR-04-003", category: "Optimization", requirement: "Intelligent sheet-metal nesting engine to maximize material yield", priority: "P1" },
        { id: "FR-04-004", category: "E-commerce", requirement: "Dynamic cost estimation engine for instant customer quoting", priority: "P2" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for MVP platform",
    },
  },
  {
    id: "challenge-nag-005",
    challenge_number: 5,
    official_title: "RF Power Amplifier Circuit for Defence",
    title: "RF Power Amplifier for Defence",
    domain: "Defence / Electronics",
    tech_stack: ["RF Design Tools", "PCB Design", "Simulation Software", "High-Frequency Electronics"],
    hmw_statement: "How might we design and prototype a compact, energy-efficient RF power amplifier circuit for defense communication systems?",
    challenge_overview: "Indigenous (Made-in-India) RF amplifier solutions reduce dependency on imported components with ITAR restrictions. Students work hands-on with GHz-range RF circuit design.",
    company: "SMARK Automations",
    region: "Nagpur",
    department: "Electronics Lab",
    sector: "Defence",
    status: "Published",
    applicants: 3,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Indigenous RF power amplifier design to replace tactical imports in defense systems.",
    problemLocation: "SMARK R&D Facility",
    businessImpact: "Eliminates ITAR restrictions; 40% cost reduction vs imports.",
    desiredOutcome: "Functional RF hardware prototype meeting JSS 55555 specs.",
    student_deliverables: [
      "Design and simulate GHz RF power amplifier",
      "Optimize gain, efficiency, and stability",
      "Design PCB layout for high-frequency operation",
      "Demonstrate functional hardware module",
    ],
    expected_outcome: "Indigenous RF amplifier solution for defense applications.",
    mosi_interviews: [
      {
        id: "mosi-nag-005",
        challenge_id: "challenge-nag-005",
        company_id: "company-smark-005",
        stakeholder_id: "stakeholder-smark-01",
        status: "Published",
        date: "2026-03-25",
        duration: 2700,
        summary: "Technical discovery session on indigenous RF power amplifier development for defence communications, exploring import substitution opportunities and design requirements.",
        problem_summary: "Defence communication systems depend on imported RF components with ITAR restrictions, long lead times, and high costs. Need indigenous design meeting MIL specs.",
        potential_roi: "30-40% cost reduction vs imports; strategic autonomy; ₹50-100 Cr sector-wide import substitution potential.",
        tech_stack_recommended: ["Keysight ADS", "Altium Designer", "LDMOS/GaN devices", "Rogers PCB"],
        metadata: {
          stakeholder: "Krunal Bhongade",
          designation: "Founder & CEO",
          company: "SMARK Automations",
          location: "Nagpur, Maharashtra",
          session_name: "RF Power Amplifier Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Krunal, SMARK is working on defence electronics. Tell us about the RF power amplifier challenge.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Krunal",
            "text": "We supply to several defence PSUs for communication systems. The RF power amplifier is a critical component that we currently import from US and European vendors. This creates multiple problems.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "What are the main challenges with imports?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Krunal",
            "text": "First, ITAR restrictions. Some components we simply cannot get because of export controls. Second, lead times of 6-12 months. Third, cost – we're paying 3-4x what indigenous manufacturing would cost. Fourth, no customization possible.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "What frequency bands are you targeting?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Krunal",
            "text": "For tactical radio, VHF band – 30 to 88 MHz. For air-ground communications, UHF – 225 to 400 MHz. The specifications are JSS 55555 compliant – that's the Indian defence standard similar to MIL-STD.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "What power levels are we talking about?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Krunal",
            "text": "10 to 50 watts depending on application. Efficiency is critical – we need Power Added Efficiency above 40% because these systems often run on battery or vehicle power. Gain around 30-40 dB.",
            "timestamp": 480,
            "status": "Approved"
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "What about environmental requirements?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Krunal",
            "text": "This is where it gets tough. Operating temperature from minus 40 to plus 70 degrees Celsius. Vibration and shock per MIL-STD-810. EMI compliance per MIL-STD-461. These aren't just specs on paper – systems get tested rigorously.",
            "timestamp": 600,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What's the current state of indigenous RF design capability?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Krunal",
            "text": "Limited. The RF transistors themselves – LDMOS, GaN – we have to import. But the circuit design, PCB layout, matching networks, protection circuits – that can be done here. We need design expertise and testing infrastructure.",
            "timestamp": 720,
            "status": "Approved"
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "Do you have testing equipment?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Krunal",
            "text": "We have basic RF test equipment – network analyzers, power meters. For full qualification, we'd need to use external labs like SAMEER or LRDE. That's manageable. The bigger gap is design expertise.",
            "timestamp": 840,
            "status": "Approved"
          },
          {
            "id": "t15",
            "speaker": "Interviewer",
            "text": "What would success look like for this project?",
            "timestamp": 900,
            "status": "Approved"
          },
          {
            "id": "t16",
            "speaker": "Krunal",
            "text": "A working prototype that meets JSS specs. Complete documentation for technology transfer. Indian design using ITAR-free components. Cost 30-40% below imports. This becomes a reference design we can productionize.",
            "timestamp": 960,
            "status": "Approved",
            "opportunity": true
          }
        ]
      }
    ],
    complexity: "Very High",
    skills_required: ["RF Circuit Design", "PCB Design", "Simulation (ADS)", "Electronics Prototyping"],
    tags: ["Defence Electronics", "RF Engineering", "Make in India", "Atmanirbhar Bharat", "iDEX"],
    prd: {
      executive_summary: "Design, simulate, and prototype an indigenous RF power amplifier for tactical defence communications.",
      problem_statement: {
        overview: "Defence systems depend on imported RF components with 6-12 month lead times.",
      },
      success_metrics: {
        primary_kpis: [
{ metric: "Efficiency", target: "PAE > 40%" },
          { metric: "Gain", target: "30-40 dB" },
        ],
      },
      functional_requirements: [
        { id: "FR-05-001", category: "Performance", requirement: "Power Added Efficiency (PAE) > 40% across VHF/UHF bands", priority: "P0" },
        { id: "FR-05-002", category: "RF Design", requirement: "Stable 30-40 dB gain with high linearity for tactical data", priority: "P0" },
        { id: "FR-05-003", category: "Environmental", requirement: "Operational capability in temperatures ranging from -40°C to +70°C", priority: "P1" },
        { id: "FR-05-004", category: "Standards", requirement: "Design compliance with JSS 55555 and MIL-STD-810/461", priority: "P1" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹5-8 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-006",
    challenge_number: 6,
    official_title: "Modular Air Purification Platform",
    title: "Modular Air Purification Platform",
    domain: "CleanTech / Healthcare",
    tech_stack: ["Filtration Systems", "Airflow Design", "Modular Engineering", "Sensors"],
    hmw_statement: "How might we design a modular air purification platform that can be easily configured for different environments?",
    challenge_overview: "Different environments face varying pollutants (dust, pathogens, VOCs). One-size-fits-all purifiers are inefficient. Needs a modular, bio-integrated approach.",
    company: "Biowall Agritech Pvt. Ltd. (Mitrasena)",
    region: "Nagpur",
    department: "Product Design",
    sector: "CleanTech",
    status: "Published",
    applicants: 7,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Stackable, smart air purifiers combining bio-filtration with HEPA for schools and hospitals.",
    problemLocation: "Urban Offices/Hospitals",
    businessImpact: "Energy efficiency +40% vs single boxes; linear scaling to 5000 sqft.",
    desiredOutcome: "Interconnected units with PM2.5 monitoring and bio-filtering.",
    student_deliverables: [
      "Identify common pollutants across different environments",
      "Design modular filtration units (HEPA/Bio/Carbon)",
      "Develop scalable airflow enclosure",
      "Prototype smart monitoring and control",
    ],
    expected_outcome: "Versatile air purification platform adaptable to various environments.",
    mosi_interviews: [
      {
        id: "mosi-nag-006",
        challenge_id: "challenge-nag-006",
        company_id: "company-mitrasena-006",
        stakeholder_id: "stakeholder-mitrasena-01",
        status: "Published",
        date: "2026-03-28",
        duration: 2400,
        summary: "Discovery session on modular air purification systems, exploring the integration of bio-filtration with smart sensing for diverse urban environments.",
        problem_summary: "Air quality varies significantly between schools, hospitals, and offices. One-size-fits-all purifiers are inefficient. Need modular units adaptable to specific pollutants.",
        potential_roi: "50% increase in filtration efficiency; 30% reduction in maintenance costs; 40% energy savings through smart modulation.",
        tech_stack_recommended: ["ESP32", "Sensirion PM2.5 sensors", "React", "Firebase", "Modular mechanical interlocking"],
        metadata: {
          stakeholder: "Anurag Agrawal",
          designation: "Managing Director",
          company: "Biowall Agritech Pvt. Ltd. (Mitrasena)",
          location: "Nagpur, Maharashtra",
          session_name: "Modular Air Purifier Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Anurag, tell us about Mitrasena and your approach to air purification.",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Anurag",
            "text": "We've been building 'Biowalls' – vertical gardens that filter air. But we've realized that for many urban spaces, a fixed wall is too expensive or impractical. We need a product that's as effective as a Biowall but as flexible as a standard air purifier.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "What are the limitations of current portable air purifiers?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Anurag",
            "text": "They use HEPA filters which are great for dust but terrible for VOCs or CO2. And they're binary – either on or off. They don't adapt to the specific pollution profile of the room. A classroom has different needs than a hospital waiting room.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "How will modularity help here?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Anurag",
            "text": "We want stackable modules. A base unit with the fan and smarts. Then you add modules: a HEPA module for dust, a Carbon module for smells, a UV-C module for pathogens, and our signature 'Bio-module' with living plants for CO2 and VOCs.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "How do you ensure the system is smart?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Anurag",
            "text": "The base unit needs high-quality sensors – PM2.5, VOC, CO2, Humidity, Temperature. It should recognize which modules are attached and adjust the airflow profile accordingly. If it detects high CO2 in a meeting room, it signals that the bio-module needs more light or water.",
            "timestamp": 480,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "What's the 'internet of things' component?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Anurag",
            "text": "Building managers want to see air quality across the whole building. We need a dashboard where they can see health scores for every room, filter life status, and energy usage. And it should integrate with existing HVAC systems if possible.",
            "timestamp": 600,
            "status": "Approved"
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What are the maintenance challenges?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Anurag",
            "text": "Living plants need water and light. HEPA filters need replacement. A smart system should notify the facility team exactly when and what is needed. Predictive maintenance based on sensor data instead of just a fixed timer.",
            "timestamp": 720,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t13",
            "speaker": "Interviewer",
            "text": "What's the business impact for a client?",
            "timestamp": 780,
            "status": "Approved"
          },
          {
            "id": "t14",
            "speaker": "Anurag",
            "text": "Healthier employees mean fewer sick days. Better air quality in schools leads to better concentration. In hospitals, it reduces the risk of hospital-acquired infections. We're not selling a box; we're selling 'Clean Air as a Service'.",
            "timestamp": 840,
            "status": "Approved"
          }
        ]
      }
    ],
    complexity: "Medium",
    skills_required: ["Mechanical Engineering", "IoT/Embedded", "Air Quality Science", "Mobile App Development"],
    tags: ["CleanTech", "Air Quality", "Bio-Filtration", "IoT", "Smart Buildings"],
    prd: {
      executive_summary: "Design a modular air purification system combining bio-filtration with smart monitoring.",
      success_metrics: {
        primary_kpis: [
{ metric: "PM2.5 Reduction", target: ">90%" },
          { metric: "Energy Efficiency", target: "30-40% better than box units" },
        ],
      },
      functional_requirements: [
        { id: "FR-06-001", category: "Modularity", requirement: "Stackable interface for hot-swapping HEPA, Bio, and Carbon modules", priority: "P0" },
        { id: "FR-06-002", category: "Sensing", requirement: "Integrated PM2.5, VOC, and CO2 monitoring with dashboard output", priority: "P0" },
        { id: "FR-06-003", category: "Intelligence", requirement: "Auto-module recognition for fan-speed and airflow optimization", priority: "P1" },
        { id: "FR-06-004", category: "Maintenance", requirement: "Predictive saturation alerts for filter/plant-module care", priority: "P2" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-007",
    challenge_number: 7,
    official_title: "Indigenous Digital Caliper and Gauge",
    title: "Indigenous Digital Caliper & Gauge",
    domain: "Precision Instruments",
    tech_stack: ["Embedded Systems", "Sensing Mechanisms", "Bluetooth/USB", "Data Integration"],
    hmw_statement: "How might we develop an indigenous digital caliper system that eliminates import dependency and enables real-time data integration?",
    challenge_overview: "90% of precision instruments are imported. Need a 'Made in India' connected caliper for paperless quality control in MSME shopfloors.",
    company: "Sanjay Precision Works",
    region: "Nagpur",
    department: "Quality Control",
    sector: "Manufacturing",
    status: "Published",
    applicants: 15,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Bluetooth-enabled digital caliper for paperless QC and real-time SPC charts in factories.",
    problemLocation: "Sanjay Precision Unit",
    businessImpact: "Price point reduction (₹6K vs ₹25K for connected units); zero transcription errors.",
    desiredOutcome: "Paperless QC records and one-tap data transfer to app.",
    student_deliverables: [
      "Design sensing mechanisms for precision measurement",
      "Develop embedded electronics with display",
      "Integrate Bluetooth/USB for data transfer",
      "Demonstrate working digital caliper prototype",
    ],
    expected_outcome: "Made-in-India digital measurement system with data connectivity.",
    complexity: "High",
    skills_required: ["Embedded Systems", "Wireless Protocols", "UI/UX Development", "Metrology"],
    tags: ["Metrology", "IoT", "Precision Engineering", "Import Substitution", "Digital QC"],
    mosi_interviews: [
      {
        id: "mosi-nag-007",
        challenge_id: "challenge-nag-007",
        company_id: "company-sanjay-007",
        stakeholder_id: "stakeholder-sanjay-01",
        status: "Published",
        date: "2026-03-30",
        duration: 2100,
        summary: "Discovery session on indigenous digital caliper development, exploring import substitution and data integration for paperless quality control.",
        problem_summary: "90% of precision instruments are imported. Existing connected tools are prohibitively expensive for MSMEs. Need 'Made in India' connected caliper for digital QC.",
        potential_roi: "50-70% reduction in instrument procurement cost; 100% elimination of manual data entry errors in QC; real-time SPC capability.",
        tech_stack_recommended: ["Capacitive sensing", "BLE 5.0", "Flutter", "SQLite", "Ultra-low power MCU"],
        metadata: {
          stakeholder: "Sanjay Wasule",
          designation: "CEO",
          company: "Sanjay Precision Works",
          location: "Nagpur, Maharashtra",
          session_name: "Digital Caliper & Gauge Discovery"
        },
        transcript: [
          {
            "id": "t1",
            "speaker": "Interviewer",
            "text": "Sanjay ji, your company does high-precision machining. Why do you want to build your own calipers?",
            "timestamp": 60,
            "status": "Approved"
          },
          {
            "id": "t2",
            "speaker": "Sanjay",
            "text": "Every machinist in my plant uses at least two calipers. We have 50 machinists. Currently, we buy Mitutoyo or Insize. They're excellent but expensive. And if we want the versions that can send data to a computer, the price triples.",
            "timestamp": 120,
            "status": "Approved"
          },
          {
            "id": "t3",
            "speaker": "Interviewer",
            "text": "Why is data connectivity important for you?",
            "timestamp": 180,
            "status": "Approved"
          },
          {
            "id": "t4",
            "speaker": "Sanjay",
            "text": "Right now, the operator measures a part, writes the value on a paper log, then at the end of the shift, someone enters those 100 values into Excel. It's slow, prone to errors, and the data is 8 hours old by the time I see it.",
            "timestamp": 240,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t5",
            "speaker": "Interviewer",
            "text": "How would a connected caliper change this?",
            "timestamp": 300,
            "status": "Approved"
          },
          {
            "id": "t6",
            "speaker": "Sanjay",
            "text": "Operator measures, presses a button on the caliper, and the value goes straight to an app on their phone or a tablet at the station. The app tells them immediately if the part is within tolerance. I can see the live production quality from my office.",
            "timestamp": 360,
            "status": "Approved"
          },
          {
            "id": "t7",
            "speaker": "Interviewer",
            "text": "What are the technical challenges in building a caliper?",
            "timestamp": 420,
            "status": "Approved"
          },
          {
            "id": "t8",
            "speaker": "Sanjay",
            "text": "Precision is everything. We need 10-20 micron accuracy. That requires very stable capacitive sensing scales and high-quality stainless steel bodies. The electronics must be ultra-low power – a button cell should last a year.",
            "timestamp": 480,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t9",
            "speaker": "Interviewer",
            "text": "What about the user interface on the app?",
            "timestamp": 540,
            "status": "Approved"
          },
          {
            "id": "t10",
            "speaker": "Sanjay",
            "text": "It should be extremely simple. Load a job, start measuring. High-visibility green/red indicators for Pass/Fail. Automatically generate SPC (Statistical Process Control) charts – X-bar, R-charts. This helps us catch machine wear before parts go out of tolerance.",
            "timestamp": 600,
            "status": "Approved",
            "opportunity": true
          },
          {
            "id": "t11",
            "speaker": "Interviewer",
            "text": "What's the market potential outside your own plant?",
            "timestamp": 660,
            "status": "Approved"
          },
          {
            "id": "t12",
            "speaker": "Sanjay",
            "text": "Huge. Every small workshop in India faces the same problem. They want to modernize but cannot afford Japanese or German connected tools. If we can provide 'Mitutoyo quality at Indian prices' with built-in Bluetooth, we can sell thousands.",
            "timestamp": 720,
            "status": "Approved"
          }
        ]
      }
    ],

    prd: {
      executive_summary: "Develop an indigenous digital caliper with Bluetooth connectivity for real-time data transfer.",
      success_metrics: {
        primary_kpis: [
          { metric: "Resolution", target: "0.01mm" },
          { metric: "Price", target: "₹5,000-8,000" },
        ],
      },
      functional_requirements: [
        { id: "FR-07-001", category: "Metrology", requirement: "Capacitive sensing scale with 0.01mm (10 micron) resolution", priority: "P0" },
        { id: "FR-07-002", category: "Wireless", requirement: "BLE 5.0 wireless sync to host tablet on 'Send' button trigger", priority: "P0" },
        { id: "FR-07-003", category: "Power", requirement: "Ultra-low power sleep modes for 12-month battery life on CR2032", priority: "P1" },
        { id: "FR-07-004", category: "Software", requirement: "Integration with mobile SPC charts for real-time pass/fail logic", priority: "P2" },
      ],
      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-008",
    challenge_number: 8,
    official_title: "Transformer Manufacturing",
    title: "Transformer Coil Winding Automation",
    domain: "Manufacturing / Automation",
    tech_stack: ["Coil Winding Machines", "Process Monitoring", "Quality Control Systems"],
    hmw_statement: "How might we transform labor-intensive inductor and transformer manufacturing into a streamlined, reliable process?",
    challenge_overview: "Manual winding and testing in SMEs leads to quality variations and worker fatigue. Needs automated winding mechanisms with multi-gauge handling.",
    company: "Beta Computronics Pvt. Ltd.",
    region: "Nagpur",
    department: "Production",
    sector: "Manufacturing",
    status: "Published",
    applicants: 9,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Servo-based winding automation to reduce defects and setup time in transformer manufacturing.",
    problemLocation: "Beta Computronics Unit",
    businessImpact: "Setup time <5 mins (was 60 mins); defects <2%.",
    desiredOutcome: "Precision winding with closed-loop tension control and digital counting.",
    student_deliverables: [
      "Design automated winding mechanisms",
      "Improve fixtures and tooling for consistency",
      "Develop process monitoring for quality control",
      "Integrate digital traceability",
    ],
    expected_outcome: "Streamline transformer manufacturing with improved consistency.",
    reference_videos: ["https://youtu.be/lequv5Bh6yE", "https://youtu.be/lKdDKrGZrcw"],
    complexity: "High",
    skills_required: ["PLC Programming", "Servo Systems", "Mechanical Design", "Industrial IoT"],
    tags: ["Transformer", "Automation", "PLC", "Quality Control", "Industry 4.0"],
    prd: {
      executive_summary: "Design a precision winding automation system with closed-loop tension control.",
      success_metrics: {
        primary_kpis: [
{ metric: "Defect Rate", baseline: "5%", target: "<2%" },
          { metric: "Setup Time", baseline: "60 min", target: "<5 min" },
        ],
      },
      functional_requirements: [
        { id: "FR-08-001", category: "Automation", requirement: "Programmable servo-controlled winding for 10-45 AWG wire gauges", priority: "P0" },
        { id: "FR-08-002", category: "Quality", requirement: "Active closed-loop wire tension control to prevent insulation damage", priority: "P0" },
        { id: "FR-08-003", category: "Metrology", requirement: "Digital turn-counting with <0.1% error and wire-break detection", priority: "P1" },
        { id: "FR-08-004", category: "Setup", requirement: "Quick-change fixture system to reduce job-change setup time to <10 min", priority: "P1" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹8-12 Lakhs for retrofit",
    },
  },
  {
    id: "challenge-nag-009",
    challenge_number: 9,
    official_title: "Improving the Yield of Food Processing Centers",
    title: "Food Processing Yield Improvement",
    domain: "Food Processing / AgriTech",
    tech_stack: ["Automation", "Machine Design", "Computer Vision", "Process Optimization"],
    hmw_statement: "How might we develop machinery that minimizes peeling and cutting losses for processed onion products?",
    challenge_overview: "Yield losses occur during manual peeling/cutting due to onion size/shape variations. Needs adaptive machinery to maintain precision.",
    company: "Baron Integrated Services Pvt. Ltd.",
    region: "Nagpur",
    department: "Process Floor",
    sector: "Food Processing",
    status: "Published",
    applicants: 11,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Yield monitoring and adaptive drying for onion processing to save ₹50-80L annually.",
    problemLocation: "Baron Dehydration Unit",
    businessImpact: "Yield +0.5% (significant revenue); energy -20%.",
    desiredOutcome: "Inline moisture measurement and adaptive heat control.",
    student_deliverables: [
      "Analyze current peeling/cutting loss points",
      "Develop innovative machinery designs",
      "Design for size/shape variation tolerance",
      "Maintain product quality while maximizing yield",
    ],
    expected_outcome: "Redefine onion processing with minimal loss.",
    complexity: "Medium",
    skills_required: ["Process Engineering", "IoT/Sensors", "Machine Learning", "Food Science"],
    tags: ["Food Processing", "Dehydration", "AI/ML", "Process Optimization", "AgriTech"],
    prd: {
      executive_summary: "Develop AI-powered process optimization for dehydration plants.",
      success_metrics: {
        primary_kpis: [
{ metric: "Yield Improvement", target: "+0.5% net" },
          { metric: "Quality Rejects", baseline: "5%", target: "<2%" },
        ],
      },
      functional_requirements: [
        { id: "FR-09-001", category: "Mechanical", requirement: "Adaptive abrasive peeling mechanism that adjusts to onion size variations", priority: "P0" },
        { id: "FR-09-002", category: "Sensing", requirement: "Inline NIR moisture sensing for real-time dehydration control", priority: "P0" },
        { id: "FR-09-003", category: "Automation", requirement: "Closed-loop conveyor speed control based on output moisture feedback", priority: "P1" },
        { id: "FR-09-004", category: "Traceability", requirement: "Automated yield tracking system (Input weight vs Processed weight)", priority: "P2" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹12-18 Lakhs for pilot",
    },
  },
  {
    id: "challenge-nag-010",
    challenge_number: 10,
    official_title: "Real-time Feedback Tool for User Experience",
    title: "Real-time UX Feedback Tool",
    domain: "Product Development / UX",
    tech_stack: ["Web/Mobile Plugins", "Analytics", "Real-time Processing", "Dashboards"],
    hmw_statement: "How might we design a tool that seamlessly captures user experience data during initial product interactions?",
    challenge_overview: "Standard surveys have 2% response rates. Need an in-context, lightweight widget to capture sentiment during onboarding or first use.",
    company: "Techwalnut Innovations LLP",
    region: "Nagpur",
    department: "Software Product",
    sector: "Product Development",
    status: "Published",
    applicants: 6,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Lightweight (<50KB) privacy-first UX feedback widget with real-time sentiment analysis.",
    problemLocation: "Techwalnut SaaS Platform",
    businessImpact: "Response rates 10-15%; time-to-insight reduced to hours.",
    desiredOutcome: "Sentiment-linked behavioral data with auto-theming of feedback.",
    student_deliverables: [
      "Design intuitive feedback mechanisms",
      "Develop real-time analysis pipeline",
      "Create visualization dashboards for product teams",
      "Integrate with development workflows",
    ],
    expected_outcome: "Enable teams to rapidly address user pain points.",
    complexity: "Medium",
    skills_required: ["Frontend Development", "Backend Development", "NLP/ML", "Product Design"],
    tags: ["UX Research", "SaaS", "Product Analytics", "Sentiment Analysis", "Customer Feedback"],
    prd: {
      executive_summary: "Build a lightweight UX feedback widget for in-context sentiment capture.",
      success_metrics: {
        primary_kpis: [
{ metric: "Response Rate", baseline: "2%", target: ">10%" },
          { metric: "Widget Size", target: "<50KB" },
        ],
      },
      functional_requirements: [
        { id: "FR-10-001", category: "Performance", requirement: "Lightweight frontend widget footprint (<50KB) for minimal impact", priority: "P0" },
        { id: "FR-10-002", category: "Logic", requirement: "Context-aware feedback triggers based on user behavioral events", priority: "P0" },
        { id: "FR-10-003", category: "Analytics", requirement: "Real-time NLP sentiment analysis engine for categorizing frustration", priority: "P1" },
        { id: "FR-10-004", category: "Security", requirement: "Privacy-by-design architecture with zero PII/Personal data capture", priority: "P1" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for MVP",
    },
  },


  {
    id: "challenge-nag-013",
    challenge_number: 13,
    official_title: "Worker Safety System",
    title: "Raksha: GPS-Denied Safety Tracking",
    domain: "Worker Safety / IoT",
    tech_stack: ["UWB/BLE Mesh", "Wearable Sensors", "LoRaWAN", "Edge Computing"],
    hmw_statement: "How might we enable location tracking and vitals monitoring for workers in GPS-denied confined spaces?",
    challenge_overview: "Mines and boilers have no cellular/GPS. Need UWB/BLE mesh networks to monitor vitals and location for emergency response.",
    company: "Hixaa Technologies Private Limited",
    region: "Nagpur",
    department: "Safety IoT",
    sector: "Industrial Safety",
    status: "Published",
    applicants: 18,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "UWB positioning and vital sign mesh network for workers in tunnels and mines.",
    problemLocation: "Mines / Confined Spaces",
    businessImpact: "Emergency response <5 mins; real-time location visibility.",
    desiredOutcome: "1-3m positioning accuracy with man-down detection.",
    student_deliverables: [
      "Design GPS-denied location tracking (UWB)",
      "Develop wearable vits monitoring",
      "Create local mesh/LoRa network",
      "Implement SOS/Panic alert systems",
    ],
    expected_outcome: "Real-time worker safety in connectivity-challenged environments.",
    existing_product: "https://hixaa.com/products/",
    complexity: "Very High",
    skills_required: ["Embedded Systems", "Wireless Protocols", "Wearable Design", "Mobile App Development"],
    tags: ["Worker Safety", "IoT", "UWB", "Confined Space", "Wearables", "Mesh Networking"],
    prd: {
      executive_summary: "Extend Raksha IoT platform with GPS-denied positioning and vitals mesh.",
      success_metrics: {
        primary_kpis: [
{ metric: "Positioning Accuracy", target: "1-3m" },
          { metric: "Response Time", baseline: "40 min", target: "<5 min" },
        ],
      },
      functional_requirements: [
        { id: "FR-13-001", category: "Positioning", requirement: "Centimeter-level indoor positioning (1-3m) using UWB tech", priority: "P0" },
        { id: "FR-13-002", category: "Network", requirement: "Self-healing mesh network for data relay in GPS-denied zones", priority: "P0" },
        { id: "FR-13-003", category: "Safety", requirement: "Wearable vitals monitoring (HR, Temp) with IMU fall detection", priority: "P1" },
        { id: "FR-13-004", category: "Certification", requirement: "Intrinsically safe (ATEX/PESO) hardware design for hazardous zones", priority: "P1" },
      ],

      timeline_weeks: 12,
      budget_estimate: "₹10-15 Lakhs for pilot",
    },
  },
];
