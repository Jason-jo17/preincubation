export interface InnovatorProject {
  title: string;
  description: string;
  techUsed: string[];
  relevance: string; // Explaining why this overlaps with company need
}

export interface EnrichedInnovator {
  id: string;
  name: string;
  role: string;
  source: string;
  matchScore: number;
  toolset: string[];
  skillset: string[];
  mindset: string[];
  primaryProjects: InnovatorProject[];
  avatarLabel: string;
}

export const enrichedInnovators: EnrichedInnovator[] = [
  {
    id: "inn-001",
    name: "Aditya Deshmukh",
    role: "Embedded Systems Lead",
    source: "COEP Bhau Institute",
    matchScore: 96,
    avatarLabel: "AD",
    toolset: ["STM32", "Altium Designer", "FreeRTOS", "MQTT", "Arduino"],
    skillset: ["PCB Design", "Firmware Development", "Sensors", "Hardware Proto"],
    mindset: ["Product-focused", "Iterative", "Reliable Builder"],
    primaryProjects: [
      {
        title: "Adaptive Drone Lighting",
        description: "Developed a MAVLink-controlled LED payload for night search operations.",
        techUsed: ["MAVLink", "PWM Drivers", "Aluminum heat-sinks"],
        relevance: "Direct match for your Drone Lighting challenge — already familiar with flight controller integration.",
      },
      {
        title: "Smart Utility Grid",
        description: "IoT nodes for real-time power monitoring in rural substations.",
        techUsed: ["LoRaWAN", "Energy Monitoring ICs"],
        relevance: "Expertise in power management is critical for your battery-operated industrial systems.",
      }
    ]
  },
  {
    id: "inn-002",
    name: "Priya Sharma",
    role: "Computer Vision Researcher",
    source: "SPPU Research Park",
    matchScore: 92,
    avatarLabel: "PS",
    toolset: ["PyTorch", "OpenCV", "NVIDIA Jetson", "React", "Docker"],
    skillset: ["Anomaly Detection", "Thermal Imaging", "Parallel Compute"],
    mindset: ["Analytical", "Experimental", "Quality-obsessed"],
    primaryProjects: [
      {
        title: "Industrial Hot-spot AI",
        description: "Trained a YOLO-based model to detect bearing overheating in sugar mills.",
        techUsed: ["FLIR Lepton", "Jetson Nano", "TensorRT"],
        relevance: "Highly relevant to your Industrial Fire Detection challenge — experience with thermal anomaly detection.",
      },
      {
        title: "Automated QC for Textiles",
        description: "Surface defect detection for loom-produced fabrics.",
        techUsed: ["High-speed cameras", "Deep learning"],
        relevance: "Solves your 'Real-time visibility' needs on the shop floor using visual intelligence.",
      }
    ]
  },
  {
    id: "inn-003",
    name: "Vikram Mane",
    role: "Automation Architect",
    source: "KIT Innovation Foundation",
    matchScore: 89,
    avatarLabel: "VM",
    toolset: ["Python", "PostgreSQL", "React Native", "InfluxDB", "Node.js"],
    skillset: ["Data Pipelines", "HMI Design", "SCADA Integration"],
    mindset: ["Entrepreneurial", "Fast Excution", "System Thinker"],
    primaryProjects: [
      {
        title: "OEE Tracker Pro",
        description: "Deployed a low-cost shopfloor dashboard for 3 auto-ancillaries in Kolhapur.",
        techUsed: ["React", "Express", "SQLite"],
        relevance: "Matches your Shopfloor Optimization goal — proven delivery of OEE improvement systems for MSMEs.",
      },
      {
        title: "AGV Fleet Manager",
        description: "Warehouse navigation system for small-scale material movement.",
        techUsed: ["Lidar", "ROS", "Bluetooth Low Energy"],
        relevance: "Relevant for upcoming material handling automation in your factory.",
      }
    ]
  },
  {
    id: "inn-004",
    name: "Ananya Kulkarni",
    role: "Industrial AI Specialist",
    source: "VNIT Nagpur",
    matchScore: 94,
    avatarLabel: "AK",
    toolset: ["TensorFlow", "Scikit-Learn", "Grafana", "Python", "Kubernetes"],
    skillset: ["Predictive Maintenance", "Data Orchestration", "Root Cause Analysis"],
    mindset: ["Systemic", "Data-driven"],
    primaryProjects: [
      {
        title: "VibrationSense AI",
        description: "Predictive maintenance system for CNC spindle motors.",
        techUsed: ["Accelerometers", "Fast Fourier Transform", "Python"],
        relevance: "Perfect for your Shopfloor Optimization — reduces unplanned downtime via early failure prediction.",
      },
      {
        title: "Energy Optimizer",
        description: "Real-time auditing of industrial power consumption using ML.",
        techUsed: ["InfluxDB", "XGBoost"],
        relevance: "Strategic fit for your sustainability goals and utility cost reduction.",
      }
    ]
  },
  {
    id: "inn-005",
    name: "Siddharth Joshi",
    role: "EV Systems Engineer",
    source: "GCOE Nagpur",
    matchScore: 90,
    avatarLabel: "SJ",
    toolset: ["SolidWorks", "MATLAB", "Simulink", "Battery Testers"],
    skillset: ["BMS Design", "Thermal Management", "Mechatronics"],
    mindset: ["Safety-first", "Hardware-hacker"],
    primaryProjects: [
      {
        title: "Modular Battery Swap",
        description: "Designed a locking mechanism for quick-swap battery modules in e-rickshaws.",
        techUsed: ["CAD", "FEA Analysis", "Aluminum Casting"],
        relevance: "Direct overlap with your Swappable Battery for Tractors challenge.",
      },
      {
        title: "Solar Pump Controller",
        description: "Efficiency optimizer for solar-powered agri-pumps.",
        techUsed: ["MPPT Algorithms", "Power Electronics"],
        relevance: "Valuable for your AgriTech and rural hardware deployment strategies.",
      }
    ]
  }
];

export const talentHubStats = [
  { label: "Verified Innovators", value: "142", icon: "users" },
  { label: "High Fit (90%+)", value: "24", icon: "target" },
  { label: "Proven MSME Success", value: "12", icon: "star" },
];
