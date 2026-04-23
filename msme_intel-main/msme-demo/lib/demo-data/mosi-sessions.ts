export interface MOSISession {
    id: string;
    companyId: string;
    sector_id?: string;
    stakeholder_id: string;
    date: string;
    title: string;
    summary: string;
    duration: number;
    status: string;
    problem_summary: string;
    context_quotes: string[];
    rationales: string[];
    potential_roi: string;
    tech_stack_recommended: string[];
    type: string;
    intensity: number;
    opportunities?: any[];
    transcript?: { speaker: string; time: string; text: string; opportunity?: boolean }[];
}

export const MOSI_SESSIONS: MOSISession[] = [
    {
        id: 'sess-001',
        companyId: 'comp-001', // TechForge Manufacturing
        sector_id: 'manufacturing',
        stakeholder_id: 'Rajesh Kumar',
        date: '2026-03-12',
        title: 'Precision Surface Defect Discovery',
        summary: 'Deep dive into the die-casting quality control process. Identified a critical bottleneck in manual inspection for hairline cracks.',
        duration: 1450,
        status: 'Published',
        problem_summary: 'Aluminum die-cast parts exhibit micro-cracks that are only visible under specific lighting, leading to a 4% rejection rate at late-stage assembly.',
        context_quotes: [
            "We can't rely on human inspectors for 24/7 high-speed production.",
            "The cost of a recall is 100x the cost of initial inspection."
        ],
        rationales: [
            "Manual inspection is inconsistent and slow.",
            "Micro-cracks are often missed due to eye fatigue."
        ],
        potential_roi: '₹12 Lakhs savings per quarter in material waste.',
        tech_stack_recommended: ['Deep Learning', 'Computer Vision'],
        type: 'discovery',
        intensity: 5,
        transcript: [
            { time: "00:05", speaker: "Interviewer", text: "Thanks for joining, Rajesh. Let's talk about the die-casting line. Where are you seeing the most friction right now?" },
            { time: "00:12", speaker: "Rajesh Kumar", text: "It's the finishing stage. We're running 24/7, but our QC is still manual. Human eyes just can't keep up with the speed and the volume." },
            { time: "00:45", speaker: "Interviewer", text: "Is it a speed issue or an accuracy issue?" },
            { time: "00:52", speaker: "Rajesh Kumar", text: "Both. But accuracy is the real killer. Hairline cracks are being missed after a 6-hour shift. If we could automate this detection, it would be a game-changer.", opportunity: true }
        ]
    },
    {
        id: 'sess-002',
        companyId: 'comp-002', // Precision Components Ltd
        sector_id: 'manufacturing',
        stakeholder_id: 'Anita Desai',
        date: '2026-03-20',
        title: 'Textile Waste Segregation',
        summary: 'Exploration of waste management efficiency. Found significant value loss in mixed scrap streams.',
        duration: 1820,
        status: 'Published',
        problem_summary: 'Textile waste segregation is currently manual, leading to contamination in recyclable streams and missed revenue from premium scrap.',
        context_quotes: [
            "We're losing value by mixing high-grade silk scrap with cotton.",
            "Automation could help us monetize our waste streams effectively."
        ],
        rationales: [
            "High-value scraps are difficult to identify by touch alone.",
            "Labor turnover in waste management is high."
        ],
        potential_roi: '22% increase in revenue from recycled materials.',
        tech_stack_recommended: ['Spectroscopy AI', 'Robotics', 'ERP Integration'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "01:20", speaker: "Interviewer", text: "Anita, how much value is currently lost in the segregation process?" },
            { time: "01:35", speaker: "Anita Desai", text: "Too much. We're mixing silk and high-grade synthetics with base cotton because the sorting is too fast for manual checks." },
            { time: "02:10", speaker: "Interviewer", text: "So you need material-level identification?" },
            { time: "02:25", speaker: "Anita Desai", text: "Exactly. If we can sort by fiber type using sensors, the scrap value triples.", opportunity: true }
        ]
    },
    {
        id: 'sess-003',
        companyId: 'comp-004', // SmartFactory Systems
        sector_id: 'manufacturing',
        stakeholder_id: 'Vikram Singh',
        date: '2026-03-25',
        title: 'Machine Health Prediction',
        summary: 'Discussion on downtime minimization for heavy press machinery. Spares logistics is the primary dependency.',
        duration: 950,
        status: 'Published',
        problem_summary: 'Unexpected downtime on the Hydra-Press 4000 causes total line stoppage. Spares take 2 weeks to arrive.',
        context_quotes: [
            "We only fix it when it breaks, which is the most expensive way.",
            "Last stop cost us 3 days of production."
        ],
        rationales: [
            "No historical data logging for vibration or temperature.",
            "Reactive maintenance is causing high stress and overtime costs."
        ],
        potential_roi: 'Reduces unplanned downtime by 40%.',
        tech_stack_recommended: ['Edge Analytics', 'Vibration Sensors', 'Logistics AI'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "04:10", speaker: "Interviewer", text: "Vikram, what happens when the Hydra-Press goes down?" },
            { time: "04:22", speaker: "Vikram Singh", text: "Everything stops. It's the heartbeat of the factory. And we're flying blind—no predictive data at all." },
            { time: "05:05", speaker: "Interviewer", text: "What's the main obstacle to adding sensors?" },
            { time: "05:15", speaker: "Vikram Singh", text: "Just the integration. We need a system that alerts us *before* the vibration hits critical levels.", opportunity: true }
        ]
    },
    {
        id: 'mosi-v001',
        companyId: 'aeq-001',
        sector_id: 'aerospace',
        stakeholder_id: 'Vikram Singh',
        date: 'Apr 02, 2026',
        title: 'Aequs Manufacturing Floor Optimization',
        summary: 'Deep dive into vertical integration bottlenecks on the Aequs shop floor. Identified raw material flow friction.',
        duration: 2450,
        status: 'Published',
        problem_summary: 'Vertical integration is bottlenecked by unsynced downstream units and a lack of digital twin visibility, leading to high scrap rates and material idle time.',
        context_quotes: [
            "We're seeing major delays in the precision machining units because the forging output isn't synced.",
            "Lowering the unit cost is the holy grail. The scrap rate is where we win or lose."
        ],
        rationales: [
            "Manual scheduling cannot handle the complexity of 30+ machining centers.",
            "Lack of real-time visibility prevents adaptive rerouting of material."
        ],
        potential_roi: '12% reduction in per-unit cost through scrap-rate optimization and throughput synchronization.',
        tech_stack_recommended: ['Digital Twin', 'Real-time Scheduling Engine', 'Computer Vision for Scrap Detection'],
        type: 'discovery',
        intensity: 5,
        transcript: [
            { time: "00:00", speaker: "Interviewer", text: "Vikram, thank you for showing us the shop floor. Aequs' scale in this single SEZ is impressive, but you mentioned earlier that the 'vertical integration' isn't as smooth as it looks on paper. Where are the actual friction points?" },
            { time: "00:45", speaker: "Vikram Singh", text: "It's the raw material flow. Even though everything is in one zone, we're seeing major delays in the precision machining units because the forging output isn't synced with the downstream assembly line. We have material sitting idle for 48 hours because of a scheduling mismatch." },
            { time: "01:20", speaker: "Interviewer", text: "Is that a capacity issue or a data visibility issue?" },
            { time: "01:35", speaker: "Vikram Singh", text: "It's visibility. We don't have a live digital twin of the flow. We're still using spreadsheets to track forgings moving to machining. If one CNC goes down, the whole queue backs up, and we don't know it for three hours.", opportunity: true },
            { time: "02:10", speaker: "Interviewer", text: "If you could solve that, what's the primary KPI you'd target?" },
            { time: "02:25", speaker: "Vikram Singh", text: "Lowering the unit cost is the holy grail. Specifically, reducing the scrap rate during the transition between forging and machining. The scrap rate is where we win or lose. If we can get real-time optimization there, it changes our margins overnight." }
        ]
    },
    {
        id: 'mosi-d001',
        companyId: 'dyn-001',
        sector_id: 'aerospace',
        stakeholder_id: 'Dr. Udayant M.',
        date: 'Mar 28, 2026',
        title: 'Dynamatic: Flap Track Beam Cycle Time Audit',
        summary: 'Exploration of sole-source production line efficiency for Airbus A320 programs.',
        duration: 1950,
        status: 'Published',
        problem_summary: 'As sole source for A320 flap track beams, any shift in OEM demand causes massive inventory whip-saw. Predicting tooling wear on older CNCs is critical to maintain 100% OTD.',
        context_quotes: [
            "Sole source means zero room for failure.",
            "Inventory whip-saw is killing our working capital."
        ],
        rationales: [
            "Reactive maintenance on core CNC centers.",
            "Demand signals from OEMs are decoupled from shop-floor capacity."
        ],
        potential_roi: '₹2 Cr annual savings in logistics and unplanned downtime.',
        tech_stack_recommended: ['Predictive Maintenance', 'Demand Linkage Engine'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "00:05", speaker: "Interviewer", text: "Dr. Udayant, being a sole source is a privilege, but also a massive risk. What keeps you up at night?" },
            { time: "00:15", speaker: "Dr. Udayant M.", text: "The whip-saw effect. Airbus scales up, we struggle to sync. But on the floor, it's the machine health. If a specialized 5-axis center goes down, the global A320 line feels it. We need an AI that predicts tool bit failure before the beam is ruined.", opportunity: true }
        ]
    },
    {
        id: 'mosi-h001',
        companyId: 'hical-001',
        sector_id: 'aerospace',
        stakeholder_id: 'Jaiveer S.',
        date: 'Apr 01, 2026',
        title: 'Hical: Electromagnetics Quality Automation',
        summary: 'Session focused on solenoid test automation and data logging for space-grade components.',
        duration: 1200,
        status: 'Published',
        problem_summary: 'Manual verification of electromagnetic solenoid performance requires 40 mins per unit. Scaling for ISRO payloads requires reducing this to 5 mins without quality loss.',
        context_quotes: [
            "ISRO standards are non-negotiable.",
            "Manual testing is the primary scale bottleneck."
        ],
        rationales: [
            "Current test rigs are manual and rely on human reading of oscilloscopes.",
            "Data logging for compliance is still paper-based."
        ],
        potential_roi: '8x increase in testing capacity for space payloads.',
        tech_stack_recommended: ['Automated Test Rigs', 'Digital Compliance Vault'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "01:10", speaker: "Interviewer", text: "Jaiveer, how do you scale a process that's inherently manual?" },
            { time: "01:25", speaker: "Jaiveer S.", text: "We can't. That's the problem. Our testing rigs are from the 90s. We need a system that captures wave-forms automatically and flags anomalies against the gold standard payload profile.", opportunity: true }
        ]
    },
    {
        id: 'mosi-ata-001',
        companyId: 'ata-001',
        sector_id: 'aerospace-defense',
        stakeholder_id: 'Milind A.',
        date: 'Apr 04, 2026',
        title: 'Ashta Tech: Collaborative Robotic Deburring Strategy',
        summary: 'Deep dive into aerospace job-shop friction. Identified manual deburring as the primary throughput bottleneck for MIHAN-destined parts.',
        duration: 2100,
        status: 'Published',
        problem_summary: 'Aerospace-grade parts require 100% surface perfection. Manual deburring is inconsistent, leading to a 7% rejection rate from MIHAN Tier-1 customers.',
        context_quotes: [
            "We can't get AS9100 certified if our finishing remains a manual variable.",
            "Collaborative robots are the only way to scale our Hingna facility."
        ],
        rationales: [
            "High variance in manual finishing across shifts.",
            "Current manpower is insufficient for the 3x volume increase projected for FY27."
        ],
        potential_roi: '₹14 Lakhs annual savings in rejection costs and 40% faster finishing cycles.',
        tech_stack_recommended: ['Cobot Integration', 'Force-Torque Sensors', 'Edge Finish Control'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "00:15", speaker: "Interviewer", text: "Milind, your Hingna facility is scaling fast. Where is the 'chasm' between your current output and Boeing-grade requirements?" },
            { time: "00:45", speaker: "Milind A.", text: "It's the finishing. We're machining 5-axis parts effectively, but then they sit in the deburring queue for 48 hours. A human with a file just isn't a digital process.", opportunity: true },
            { time: "01:20", speaker: "Interviewer", text: "So you're looking at robotic deburring?" },
            { time: "01:35", speaker: "Milind A.", text: "Exactly. We need a cobot that can handle the complex geometry of these aerospace castings. If we automate that, we hit the AS9100 throughput requirements overnight." }
        ]
    },
    {
        id: 'mosi-ata-002',
        companyId: 'ata-001',
        sector_id: 'aerospace-defense',
        stakeholder_id: 'Saurabh B.',
        date: 'Apr 05, 2026',
        title: 'Ashta Tech: SPM Digital Twin Integration',
        summary: 'Exploration of Special Purpose Machine (SPM) digitization. Transitioning from PLC-only to IoT-enabled assets.',
        duration: 1850,
        status: 'Published',
        problem_summary: 'Legacy SPMs lack data egress, preventing real-time OEE tracking. Nagpur clients are now demanding digital audit trails for all SPM-manufactured components.',
        context_quotes: [
            "Our machines are 'dumb' in a world that requires 'smart' data logs.",
            "Without a digital twin, we're just selling metal; we want to sell performance."
        ],
        rationales: [
            "Clients in the defense sector require per-part telemetry.",
            "Reactive maintenance on SPMs is costing 15% in lost availability."
        ],
        potential_roi: '₹22 Lakhs in premium contract value by offering "Smart-SPM" as a service.',
        tech_stack_recommended: ['IoT Gateways', 'Digital Twin Framework', 'MQTT Telemetry'],
        type: 'discovery',
        intensity: 4,
        transcript: [
            { time: "05:10", speaker: "Interviewer", text: "Saurabh, how does Ashta Tech differentiate in the crowded Nagpur SPM market?" },
            { time: "05:30", speaker: "Saurabh B.", text: "Right now, we don't differentiate enough. But if our machines arrived with a pre-configured digital twin and a live OEE dashboard, we would be unique in the region.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 1: ASHTA TECH
    {
        id: "mosi-nag-001",
        companyId: "company-ashta-001",
        sector_id: "aerospace-defense",
        stakeholder_id: "Harshad Wasule",
        date: "2026-03-15",
        title: "Shopfloor Workflow Optimization Discovery",
        summary: "Technical discovery session focusing on shopfloor visibility challenges, manual scheduling inefficiencies, and OEE improvement opportunities in industrial automation manufacturing.",
        duration: 2700,
        status: "Published",
        problem_summary: "No real-time visibility into machine status and production progress. Manual scheduling with Excel leads to suboptimal resource utilization and missed deliveries.",
        context_quotes: [
            "By the time I know there's a delay, it's already too late to adjust. We're always firefighting.",
            "I want to see all my machines on a screen, know which ones are running, which are idle, and why."
        ],
        rationales: [
            "Manual scheduling is reactive and lacks real-time feedback loops.",
            "Paper-based job cards lead to data loss and transcription errors."
        ],
        potential_roi: "₹25-40 Lakhs annual savings through reduced idle time and improved scheduling.",
        tech_stack_recommended: ["Node.js", "React", "MQTT", "Modbus TCP", "TimescaleDB", "Python (ML)"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "01:00", speaker: "Interviewer", text: "Thank you for meeting with us, Harshad ji. Can you walk us through how production scheduling currently works at Ashta Tech?" },
            { time: "02:00", speaker: "Harshad", text: "Sure. Right now, our production planning is done weekly in Excel. The planning team takes customer orders, checks machine availability based on what supervisors tell them, and creates a schedule. Then we print job cards and distribute them to the floor." },
            { time: "03:30", speaker: "Interviewer", text: "And how do you track progress against that Excel schedule in real-time?" },
            { time: "04:00", speaker: "Harshad", text: "That's where the problem starts. We rely on supervisors walking the floor and calling in updates. By the time I know there's a delay, it's already too late to adjust. We're always firefighting.", opportunity: true },
            { time: "09:00", speaker: "Interviewer", text: "What's the 'dream state' for your shop-floor visibility?" },
            { time: "10:00", speaker: "Harshad", text: "I want to see all my machines on a screen, know which ones are running, which are idle, and why. I want to know if we're going to miss a deadline before it happens, not after. And I want operators to log their work digitally, not on paper that gets lost.", opportunity: true },
            { time: "15:20", speaker: "Interviewer", text: "You mentioned looking at high-end MES systems. Why didn't those work out?" },
            { time: "16:00", speaker: "Harshad", text: "We've looked at MES systems from Siemens and others – they quoted ₹50 lakhs and up. That's out of reach for a Nagpur-based MSME. If something can be built for ₹5-10 lakhs that solves even 60% of the problem, I'd be very interested." }
        ]
    },
    // NAGPUR NEXT 2: OPEN CATEGORY
    {
        id: "mosi-nag-002",
        companyId: "company-open-002",
        sector_id: "it-ites",
        stakeholder_id: "Program Coordinator",
        date: "2026-03-18",
        title: "Open Innovation Challenge Briefing",
        summary: "Open category briefing session explaining the discovery process for student teams to identify and validate MSME problems in the Nagpur/Vidarbha region.",
        duration: 1800,
        status: "Published",
        problem_summary: "Student teams must conduct field research to identify real MSME problems, validate with stakeholders, and develop technology-enabled solutions.",
        context_quotes: [
            "The key is to interview at least 3 businesses before finalizing your problem.",
            "Ask three questions: Is it painful enough that someone would pay for a solution? Can you build something in 12 weeks? Is it scalable?"
        ],
        rationales: [
            "Direct industry interaction is required for problem validation.",
            "Discovery must focus on scalable and technically feasible solutions."
        ],
        potential_roi: "Variable based on problem identified; potential for startup creation.",
        tech_stack_recommended: ["Varies by project"],
        type: "discovery",
        intensity: 3,
        transcript: [
            { time: "01:00", speaker: "Coordinator", text: "Welcome to the Open Innovation track. This is different from other challenges where the problem is pre-defined. Here, you become the problem finders." },
            { time: "03:30", speaker: "Interviewer", text: "What kind of problems should they be looking for exactly?" },
            { time: "05:00", speaker: "Coordinator", text: "Problems that can be solved with technology – software, hardware, or both. Problems that have real business impact – time saved, money saved, quality improved.", opportunity: true },
            { time: "07:45", speaker: "Interviewer", text: "How do they validate if a problem is worth solving?" },
            { time: "09:00", speaker: "Coordinator", text: "Ask three questions: Is it painful enough that someone would pay for a solution? Can you build something in 12 weeks? Is it scalable beyond one business? If yes to all three, you have a winner.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 3: TRACTOR SEVA
    {
        id: "mosi-nag-003",
        companyId: "company-tractor-seva-003",
        sector_id: "auto-ancillaries",
        stakeholder_id: "Dhruvil Sheth",
        date: "2026-03-20",
        title: "Swappable Battery System Discovery",
        summary: "Technical discovery session on electric tractor battery challenges, exploring swappable battery design requirements for agricultural applications.",
        duration: 3000,
        status: "Published",
        problem_summary: "Electric tractor charging takes 4-8 hours, but farming operations are time-critical. Need quick battery swap (<5 min) to enable continuous operation.",
        context_quotes: [
            "A farmer can't wait half a day to charge a battery.",
            "The swappable system completely changes the economics of EV in agriculture."
        ],
        rationales: [
            "Fixed battery charging creates unacceptable downtime in peak seasons.",
            "Swappable batteries enable a Battery-as-a-Service (BaaS) model."
        ],
        potential_roi: "3-4x increase in daily tractor utilization; 50% TCO reduction vs diesel.",
        tech_stack_recommended: ["LFP Battery Chemistry", "CAN Bus BMS", "AWS IoT Core", "React Native", "SolidWorks"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "02:00", speaker: "Interviewer", text: "Dhruvil, walk us through the 'Range Anxiety' in an agricultural context." },
            { time: "02:30", speaker: "Dhruvil", text: "Tractor Seva is building an electric tractor rental platform. We've converted some tractors to electric, but the charging time is killing our business model." },
            { time: "04:00", speaker: "Dhruvil", text: "Full charge is 6-8 hours. Even fast charging would be 2-3 hours. But during sowing or harvesting season, farmers need the tractor for 12-14 hours straight. They can't wait for charging.", opportunity: true },
            { time: "08:30", speaker: "Interviewer", text: "So you need a mechanical way to swap these huge 200kg batteries?" },
            { time: "10:00", speaker: "Dhruvil", text: "Definitely not manually. We need a mechanism – rails with assisted lifting, maybe gas springs or hydraulics. The farmer should just unlock, slide out, slide in the new one. Under 5 minutes total.", opportunity: true },
            { time: "13:15", speaker: "Interviewer", text: "And how do you manage the health of these swappable units in a dusty field?" },
            { time: "14:00", speaker: "Dhruvil", text: "Each battery needs its own smart BMS that talks to the cloud. We need to track state of charge, state of health, cycle count, temperature history.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 4: MODURA
    {
        id: "mosi-nag-004",
        companyId: "company-modura-004",
        sector_id: "construction",
        stakeholder_id: "Aviikumar Ujwane",
        date: "2026-03-22",
        title: "Custom Furniture Platform Discovery",
        summary: "Discovery session exploring the design-to-production workflow challenges in custom metal furniture manufacturing and the need for 3D visualization.",
        duration: 2400,
        status: "Published",
        problem_summary: "Design iterations take weeks with manual back-and-forth. Customers cannot visualize the final product. Manufacturing drawings are created manually leading to errors.",
        context_quotes: [
            "Customers can't visualize 2D drawings. They approve something, then say 'this isn't what I imagined.'",
            "Automatic generation of DXF files and BOM would eliminate manual translation errors."
        ],
        rationales: [
            "Manual drafting for custom orders is slow and error-prone.",
            "Lack of 3D visualization leads to low conversion and post-production reworks."
        ],
        potential_roi: "80% reduction in design cycle time; 50% reduction in production errors.",
        tech_stack_recommended: ["Three.js", "React", "Node.js", "PostgreSQL", "ezdxf", "Python"],
        type: "discovery",
        intensity: 4,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Aviikumar, where is the lag in the design approval process?" },
            { time: "04:00", speaker: "Aviikumar", text: "Customer takes 4-5 rounds of revisions. This goes 7-10 days typically. Some customers lose patience and go elsewhere.", opportunity: true },
            { time: "06:45", speaker: "Interviewer", text: "Is it because they don't understand the technical drawings?" },
            { time: "08:00", speaker: "Aviikumar", text: "Exactly. Customers can't visualize 2D drawings. They approve something, then when they see the finished product, they say 'this isn't what I imagined.' That's when problems start.", opportunity: true },
            { time: "10:30", speaker: "Interviewer", text: "And how does this design intent hit the shop floor?" },
            { time: "12:00", speaker: "Aviikumar", text: "The designer manually creates fabrication drawings – cutting lists, assembly views, BOM. This is where errors creep in. Our production team catches maybe 80%, but 20% slip through.", opportunity: true },
            { time: "16:00", speaker: "Aviikumar", text: "If the configurator could calculate material weight, estimate labor, and give instant quotes – that alone would double our conversion rate." }
        ]
    },
    // NAGPUR NEXT 5: SMARK
    {
        id: "mosi-nag-005",
        companyId: "company-smark-005",
        sector_id: "aerospace-defense",
        stakeholder_id: "Krunal Bhongade",
        date: "2026-03-25",
        title: "RF Power Amplifier Discovery",
        summary: "Technical discovery session on indigenous RF power amplifier development for defence communications, exploring import substitution opportunities.",
        duration: 2700,
        status: "Published",
        problem_summary: "Defence communication systems depend on imported RF components with ITAR restrictions, long lead times, and high costs. Need indigenous design meeting MIL specs.",
        context_quotes: [
            "ITAR restrictions mean some components we simply cannot get because of export controls.",
            "A working prototype that meets JSS specs would be strategic for autonomy."
        ],
        rationales: [
            "Reliance on imports creates severe supply chain vulnerabilities (6-12 months lead time).",
            "Indigenous design reduces costs by 30-40% and allows for strategic customization."
        ],
        potential_roi: "Strategic autonomy; ₹50-100 Cr sector-wide import substitution potential.",
        tech_stack_recommended: ["Keysight ADS", "Altium Designer", "LDMOS/GaN devices", "Rogers PCB"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Krunal, tell us about the 'Independence' in RF design. Why now?" },
            { time: "04:00", speaker: "Krunal", text: "First, ITAR restrictions. Second, lead times of 6-12 months. Third, cost – we're paying 3-4x what indigenous manufacturing would cost. We need to build this in Nagpur.", opportunity: true },
            { time: "08:15", speaker: "Interviewer", text: "What are the environmental standards for these defense units?" },
            { time: "10:00", speaker: "Krunal", text: "MIL-spec requirements are tough. Temperature from minus 40 to plus 70 degrees. Vibration and shock testing for mobile radios is rigorous.", opportunity: true },
            { time: "14:45", speaker: "Interviewer", text: "What does success look like for Smark in this challenge?" },
            { time: "16:00", speaker: "Krunal", text: "Success is an Indian design using ITAR-free components. A working prototype that meets JSS specs would be strategic for autonomy. Cost 30-40% below imports.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 6: MITRASENA
    {
        id: "mosi-nag-006",
        companyId: "company-mitrasena-006",
        sector_id: "healthcare",
        stakeholder_id: "Manohar Malani",
        date: "2026-03-27",
        title: "Modular Air Purification Discovery",
        summary: "Discovery session on modular air purification combining bio-filtration with smart monitoring for scalable indoor air quality solutions.",
        duration: 2100,
        status: "Published",
        problem_summary: "Indoor air pollution in India is severe but existing purifiers are expensive, energy-intensive, and non-scalable. Need modular, eco-friendly solution.",
        context_quotes: [
            "Existing purifiers are standalone boxes; we want units that connect together like LEGO.",
            "The living wall becomes a guest experience feature, not just a machine."
        ],
        rationales: [
            "Conventional units are not designed for large-scale commercial scaling.",
            "Bio-filtration adds oxygen and humidity that synthetic filters cannot provide."
        ],
        potential_roi: "30-40% energy savings vs conventional systems.",
        tech_stack_recommended: ["ESP32", "React Native", "AWS IoT", "InfluxDB", "HEPA + Activated Carbon"],
        type: "discovery",
        intensity: 3,
        transcript: [
            { time: "02:10", speaker: "Interviewer", text: "Manohar, how is Mitrasena looking at the air purifier market differently?" },
            { time: "04:00", speaker: "Manohar", text: "STANDALONE units are expensive and energy-intensive. We believe scaling to a Nagpur corporate office requires a modular network.", opportunity: true },
            { time: "06:45", speaker: "Interviewer", text: "What does 'modular' mean for the installer?" },
            { time: "08:00", speaker: "Manohar", text: "We want units that connect together like LEGO. Purify 500 or 5000 square feet with the same modular building block.", opportunity: true },
            { time: "12:15", speaker: "Interviewer", text: "Does this include the botanical elements you mentioned?" },
            { time: "14:00", speaker: "Manohar", text: "Exactly. Corporate offices care about employee health and ESG. The living wall becomes a guest experience feature, not just a machine.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 7: SANJAY PRECISION
    {
        id: "mosi-nag-007",
        companyId: "company-precision-007",
        sector_id: "aerospace-defense",
        stakeholder_id: "Sanjay Borkar",
        date: "2026-03-29",
        title: "Digital Caliper Development Discovery",
        summary: "Discovery session on indigenous digital caliper development with smart connectivity for Industry 4.0 integration.",
        duration: 2400,
        status: "Published",
        problem_summary: "India imports 90%+ of precision instruments. Digital calipers lack connectivity, leading to manual data entry errors.",
        context_quotes: [
            "By the time we analyze manual QC records, it's already next week. Rejections have already happened.",
            "If we can offer a connected Indian caliper at ₹5-8k, every MSME would buy."
        ],
        rationales: [
            "Manual data entry is the primary bottleneck for real-time Statistical Process Control (SPC).",
            "Imported connected tools are prohibitively expensive for local MSMEs."
        ],
        potential_roi: "50% reduction in QC data entry time; real-time SPC enablement.",
        tech_stack_recommended: ["nRF52840", "BLE 5.0", "React Native", "Python", "Capacitive encoder"],
        type: "discovery",
        intensity: 4,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Sanjay, why are we still importing calipers when we're a manufacturing hub?" },
            { time: "04:00", speaker: "Sanjay", text: "Inspector measures 100 parts, writes in a register, then someone types into Excel. Errors happen in transcription. If we make them here, we can add intelligence.", opportunity: true },
            { time: "06:45", speaker: "Interviewer", text: "So you want to pipe that measurement directly into a database?" },
            { time: "08:00", speaker: "Sanjay", text: "Bluetooth to a mobile app. Reading goes with timestamp. End of shift, sync to our quality system. Simple.", opportunity: true },
            { time: "10:30", speaker: "Interviewer", text: "What's the price sensitivity for an MSME shop like yours?" },
            { time: "12:00", speaker: "Sanjay", text: "If we can offer a connected Indian caliper at ₹5000-8000, every MSME would buy. The software is where the real value is.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 8: BETA COMPUTRONICS
    {
        id: "mosi-nag-008",
        companyId: "company-beta-008",
        sector_id: "electronics-electrical",
        stakeholder_id: "Sandeep Darwhekar",
        date: "2026-04-01",
        title: "Transformer Winding Automation Discovery",
        summary: "Technical discovery session focusing on transformer coil winding automation, exploring tension control and quality requirements.",
        duration: 3000,
        status: "Published",
        problem_summary: "Manual winding has high operator dependency leading to inconsistent quality. Tension control is manual and varies with fatigue.",
        context_quotes: [
            "Loose winding causes electrical failures; too tight causes wire damage. Operator feel isn't enough.",
            "If we can retrofit automation at ₹5-10 lakhs, that would be the sweet spot."
        ],
        rationales: [
            "Inconsistent manual tension leads to high failure rates in final testing.",
            "Skilled operator dependency creates bottlenecks and quality variance between shifts."
        ],
        potential_roi: "₹20-35 Lakhs annual savings through reduced rejects and faster cycles.",
        tech_stack_recommended: ["Siemens S7-1200", "Servo drives", "Load cells", "Node-RED", "Grafana"],
        type: "discovery",
        intensity: 4,
        transcript: [
            { time: "02:30", speaker: "Interviewer", text: "Sandeep, what's the primary failure mode in manual transformer winding?" },
            { time: "04:00", speaker: "Sandeep", text: "The operator adjusts a brake on the wire spool by hand and feel. Tension inconsistency is a killer. Loose winding causes electrical failures; too tight causes wire damage.", opportunity: true },
            { time: "06:45", speaker: "Interviewer", text: "And switching between different gauges?" },
            { time: "08:00", speaker: "Sandeep", text: "Switching wire gauges takes 30-60 minutes of manual adjustment. It's too slow. We need automated changeovers.", opportunity: true },
            { time: "10:30", speaker: "Interviewer", text: "What would your ideal 'Smart Winder' do?" },
            { time: "12:00", speaker: "Sandeep", text: "I want closed-loop tension control. Layer alignment monitoring using simple camera systems. All data logged for traceability.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 9: BARON
    {
        id: "mosi-nag-009",
        companyId: "company-baron-009",
        sector_id: "food-processing",
        stakeholder_id: "Kuldeep Shiwankar",
        date: "2026-04-03",
        title: "Food Processing Yield Optimization Discovery",
        summary: "Discovery session exploring yield optimization opportunities in onion dehydration through IoT monitoring and AI-driven control.",
        duration: 2400,
        status: "Published",
        problem_summary: "5-10% yield variation between batches due to fixed process parameters. Over-drying to ensure compliance wastes significant yield.",
        context_quotes: [
            "We over-dry by 1-2% as a safety margin. That's direct revenue loss on every ton.",
            "If we can predict the 'Done' point accurately, we save lakhs in fuel and yield."
        ],
        rationales: [
            "Fixed drying times do not account for variations in raw material moisture and ambient weather.",
            "Manual sampling is delayed and doesn't provide the resolution needed for optimization."
        ],
        potential_roi: "₹20-50 Lakhs annual yield improvement; 20% energy savings.",
        tech_stack_recommended: ["Raspberry Pi", "MQTT", "NIR sensors", "Python ML", "Grafana"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "03:45", speaker: "Interviewer", text: "Kuldeep, how much yield is actually being 'evaporated' unnecessarily?" },
            { time: "06:00", speaker: "Kuldeep", text: "If we over-dry, we lose sold-weight. If we under-dry, we fail moisture spec. Currently we over-dry by 1-2% as a safety margin. That's money in the air.", opportunity: true },
            { time: "08:30", speaker: "Interviewer", text: "Why can't you just stick to a fixed schedule?" },
            { time: "10:00", speaker: "Kuldeep", text: "Onions from different farms have different cellular structure. Some dry faster. Fixed settings don't work for Nagpur's weather shifts.", opportunity: true },
            { time: "12:15", speaker: "Interviewer", text: "What's the financial impact of solving this?" },
            { time: "14:00", speaker: "Kuldeep", text: "3% yield improvement is 30 tons output. At ₹175/kg, that's over ₹50 lakhs per year in pure profit.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 10: TECHWALNUT
    {
        id: "mosi-nag-010",
        companyId: "company-techwalnut-010",
        sector_id: "it-ites",
        stakeholder_id: "Dr. Akshay Kekre",
        date: "2026-04-04",
        title: "UX Feedback Platform Discovery",
        summary: "Discovery session on the need for lightweight, contextual UX feedback tools that capture user sentiment during actual product usage.",
        duration: 2100,
        status: "Published",
        problem_summary: "Traditional user research is slow and disconnected. Survey response rates are low (<3%). Product teams lack real-time contextual insights.",
        context_quotes: [
            "In-context, in-the-moment feedback is 10x more valuable than quarterly NPS surveys.",
            "We need something lightweight (under 50KB) that doesn't impact load times."
        ],
        rationales: [
            "User feedback is best captured at the moment of friction, not via follow-up emails.",
            "Existing tools are either too heavy for MSME budgets or focused only on analytics, not sentiment."
        ],
        potential_roi: "5x increase in feedback response rate; 30% faster UI iteration cycles.",
        tech_stack_recommended: ["TypeScript", "Preact", "React", "ClickHouse", "Hugging Face"],
        type: "discovery",
        intensity: 3,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Dr. Akshay, why are current feedback loops failing product managers?" },
            { time: "04:00", speaker: "Akshay", text: "Response rate on email surveys is maybe 2-3%. And the feedback is disconnected from the actual UI issue the user had.", opportunity: true },
            { time: "06:30", speaker: "Interviewer", text: "So you want to capture it *inside* the app?" },
            { time: "08:00", speaker: "Akshay", text: "Exactly. We need something lightweight. Focused on feedback. Work across React, Vue, or plain JS without bloating the load time.", opportunity: true },
            { time: "10:15", speaker: "Interviewer", text: "When is the 'Golden Moment' for feedback?" },
            { time: "12:00", speaker: "Akshay", text: "Trigger a question move when someone is stuck for 2 minutes or hovering near the 'Cancel' button. Context is everything.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 11: NAVITAS
    {
        id: "mosi-nag-011",
        companyId: "company-navitas-011",
        sector_id: "aerospace-defense",
        stakeholder_id: "Rashmi Kulkarni",
        date: "2026-04-05",
        title: "SAR Drone Lighting Discovery",
        summary: "Discovery session on adaptive lighting system requirements for search and rescue drones, exploring beam control and power optimization.",
        duration: 2400,
        status: "Published",
        problem_summary: "Fixed drone lights cannot adapt to mission needs (scanning vs focused). High power consumption limits flight time.",
        context_quotes: [
            "During search, you need wide coverage. When you spot something, you need focused light on that spot.",
            "Lighting payload should be under 500 grams. Every gram counts in flight time."
        ],
        rationales: [
            "Fixed beam angles force a compromise between search speed and inspection detail.",
            "Manual lighting control increases pilot workload during high-stress rescue missions."
        ],
        potential_roi: "40% improvement in night SAR area coverage; 30% flight time extension.",
        tech_stack_recommended: ["STM32", "Liquid lens optics", "MAVLink", "PWM drivers"],
        type: "discovery",
        intensity: 4,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Rashmi, what's the bottleneck for night-time search and rescue today?" },
            { time: "04:00", speaker: "Rashmi", text: "Fixed beam means you either compromise on search width or focus depth. We need dynamic control that the pilot doesn't have to manually fiddle with.", opportunity: true },
            { time: "06:30", speaker: "Interviewer", text: "How should the beam adapt during a mission?" },
            { time: "08:00", speaker: "Rashmi", text: "Search needs 90-120 degrees. Inspect needs 10-20 degrees. Transition should be automatic based on altitude or sensor detection.", opportunity: true },
            { time: "10:45", speaker: "Interviewer", text: "And the battery hit? Active lighting is heavy on power." },
            { time: "12:00", speaker: "Rashmi", text: "Total lighting payload must be under 500g. Power management is critical to extend battery life by at least 15 minutes.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 12: AUTOMATION CONTROLS
    {
        id: "mosi-nag-012",
        companyId: "company-automation-012",
        sector_id: "textiles",
        stakeholder_id: "Latesh Agrawal",
        date: "2026-04-06",
        title: "Fire Detection Suppression Discovery",
        summary: "Discovery session on AI-powered fire detection and suppression for cotton processing, exploring early detection challenges.",
        duration: 2700,
        status: "Published",
        problem_summary: "Cotton processing has extreme fire risk. Detectors trigger too late. Targeted suppression is needed to minimize collateral damage.",
        context_quotes: [
            "If a smoldering hot spot is caught at 100°C, we prevent a mill fire. Smoke sensors are way too slow.",
            "Water damage to cotton can be worse than fire damage; we need a sniper approach."
        ],
        rationales: [
            "Traditional smoke detection captures fire only after it is established, allowing for rapid spread in cotton lint.",
            "Whole-zone sprinklers destroy expensive inventory; targeted misting is more efficient."
        ],
        potential_roi: "90% faster detection; 70% reduction in fire damage; lower insurance premiums.",
        tech_stack_recommended: ["FLIR thermal", "YOLOv8", "NVIDIA Jetson", "Pan-tilt actuators", "Mist systems"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Latesh, why are traditional sprinklers failing the cotton industry?" },
            { time: "04:00", speaker: "Latesh", text: "Sprinklers drench everything. Water damage to cotton is sometimes worse than fire damage. We need targeted mist, a 'sniper' approach.", opportunity: true },
            { time: "06:30", speaker: "Interviewer", text: "How early can your thermal system catch a hotspot?" },
            { time: "08:00", speaker: "Latesh", text: "AI needs to distinguish normal motor heat from anomalous smoldering in cotton lint at 100°C, before flames occur.", opportunity: true },
            { time: "10:45", speaker: "Interviewer", text: "What's the technical challenge in the suppression part?" },
            { time: "12:00", speaker: "Latesh", text: "Targeted suppression. A nozzle that aims exactly at the hot spot identified by thermal cameras, saving the rest of the pile.", opportunity: true }
        ]
    },
    // NAGPUR NEXT 13: HIXAA
    {
        id: "mosi-nag-013",
        companyId: "company-hixaa-013",
        sector_id: "mining-minerals",
        stakeholder_id: "Atul Ghumade",
        date: "2026-04-07",
        title: "Worker Safety System Discovery",
        summary: "Technical discovery session on GPS-denied worker safety systems for confined spaces, exploring indoor positioning and vital monitoring.",
        duration: 3000,
        status: "Published",
        problem_summary: "Workers in boilers, mines, or tanks have no location visibility. GPS/Cellular doesn't work. Emergency response is delayed by uncertainty.",
        context_quotes: [
            "Inside a multi-level boiler, seconds matter. Manual check-ins every 30 minutes are not enough.",
            "We need a self-healing mesh because steel structures are essentially Faraday cages."
        ],
        rationales: [
            "Safety incidents in confined spaces are often exacerbated by the inability to locate the casualty quickly.",
            "Manual logging systems are passive and prone to human error in high-risk environments."
        ],
        potential_roi: "90% reduction in emergency response time; 100% compliant location visibility.",
        tech_stack_recommended: ["UWB (DW3000)", "nRF52840", "BLE Mesh", "React", "Node.js"],
        type: "discovery",
        intensity: 5,
        transcript: [
            { time: "02:15", speaker: "Interviewer", text: "Atul, what happens when a worker goes 'dark' inside a boiler?" },
            { time: "04:00", speaker: "Atul", text: "Inside boilers or steel tanks, cellular is useless. It's essentially a Faraday cage. We're currently flying blind down there.", opportunity: true },
            { time: "06:30", speaker: "Interviewer", text: "What's the cost of that uncertainty in an emergency?" },
            { time: "08:00", speaker: "Atul", text: "A worker collapsed in a boiler last year and it took 40 minutes to find him. With real-time UWB location, it's 40 seconds.", opportunity: true },
            { time: "10:15", speaker: "Interviewer", text: "What vitals are you tracking to predict a collapse?" },
            { time: "12:00", speaker: "Atul", text: "Vital signs like heart rate and fall detection are essential. All managed from a 3D safety map on the surface.", opportunity: true },
            { time: "16:15", speaker: "Interviewer", text: "And the hardware requirement for the worker?" },
            { time: "18:00", speaker: "Atul", text: "Has to be under 100 grams. IP67. Workers shouldn't be able to remove it easily. It needs to be part of the uniform.", opportunity: true }
        ]
    }
];

