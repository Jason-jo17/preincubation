export interface DetailedIncubator {
  name: string;
  city: string;
  msinsGrant: string;
  otherGovtFunds: string;
  fundsReceived: string;
  startups: string;
  outcomes: string;
  utilization: string;
  status: "Elite" | "Active" | "Slow" | "Limited Data" | "Stable";
  notes: string;
  source: string;
}

export interface RegistryIncubator {
  id: number;
  name: string;
  city: string;
  email: string;
  sector: string;
  type?: string;
  address?: string;
  website: string;
}

export const DETAILED_PERFORMANCE_DATA: DetailedIncubator[] = [
  {
    name: "IIT Bombay SINE",
    city: "Mumbai",
    msinsGrant: "Not confirmed",
    otherGovtFunds: "₹50 Cr (NIDHI), ₹10 Cr (IoE)",
    fundsReceived: "₹75+ Cr Est.",
    startups: "245",
    outcomes: "80% survival; $3.56B value",
    utilization: "N/A",
    status: "Elite",
    notes: "India's top academic incubator; Unicorns: Gupshup, IdeaForge",
    source: "sineiitb.org",
  },
  {
    name: "Venture Centre (NCL)",
    city: "Pune",
    msinsGrant: "Not confirmed",
    otherGovtFunds: "₹50 Cr (NIDHI), BIRAC, MeitY",
    fundsReceived: "₹80–100+ Cr Est.",
    startups: "750+",
    outcomes: "85% survival; ₹700Cr+ mobilized",
    utilization: "N/A",
    status: "Elite",
    notes: "#1 Bioincubator; National IP Award 2023",
    source: "venturecenter.co.in",
  },
  {
    name: "COEP Bhau Institute",
    city: "Pune",
    msinsGrant: "Listed",
    otherGovtFunds: "₹15 Cr (NIDHI), SISFS",
    fundsReceived: "N/A",
    startups: "12+ active",
    outcomes: "Notable: Cresa GreenTech",
    utilization: "N/A",
    status: "Active",
    notes: "Leaders status from MSINS; DST-supported",
    source: "bhau.org",
  },
  {
    name: "SPPU Research Park",
    city: "Pune",
    msinsGrant: "Listed",
    otherGovtFunds: "₹5 Cr (SISFS)",
    fundsReceived: "₹3 Cr (SISFS)",
    startups: "50+",
    outcomes: "200+ jobs created",
    utilization: "60%",
    status: "Active",
    notes: "Mentors Solapur and Akola centres",
    source: "sppu-rpf.in",
  },
  {
    name: "Somaiya riidl",
    city: "Mumbai",
    msinsGrant: "₹5 Cr",
    otherGovtFunds: "₹10 Cr (NIDHI SSS), BIRAC",
    fundsReceived: "Multiple streams",
    startups: "300+",
    outcomes: "₹400Cr+ Revenue; 1000+ jobs",
    utilization: "High",
    status: "Elite",
    notes: "Highest-performing MSInS-funded by volume",
    source: "riidl.org",
  },
  {
    name: "Mumbai University (MU IDEAS)",
    city: "Mumbai",
    msinsGrant: "₹5 Cr",
    otherGovtFunds: "None confirmed",
    fundsReceived: "N/A",
    startups: "N/A",
    outcomes: "VASUNDHARA, SPARK programs",
    utilization: "N/A",
    status: "Active",
    notes: "10,000 sq ft at Kalina campus",
    source: "mu.ac.in",
  },
  {
    name: "AIC-BAMU Foundation",
    city: "Aurangabad",
    msinsGrant: "₹5 Cr",
    otherGovtFunds: "₹10 Cr (NITI), MSME",
    fundsReceived: "N/A",
    startups: "142",
    outcomes: "SARTHI investment module",
    utilization: "N/A",
    status: "Active",
    notes: "First biotech incubator of Marathwada",
    source: "aicbamu.com",
  },
  {
    name: "DBATU DFIIE",
    city: "Lonere",
    msinsGrant: "₹5 Cr sanctioned",
    otherGovtFunds: "None confirmed",
    fundsReceived: "₹75 L",
    startups: "Navākur Cohort 5.0",
    outcomes: "5,000 sq ft facility",
    utilization: "15%",
    status: "Slow",
    notes: "Only 15% utilization over 7 years; systemic bottleneck?",
    source: "dbatu.ac.in",
  },
  {
    name: "MAGIC",
    city: "Aurangabad",
    msinsGrant: "₹5 Cr",
    otherGovtFunds: "MSME; iDEX; SISFS",
    fundsReceived: "N/A",
    startups: "N/A",
    outcomes: "Tier 2/3 focus; Women Cell",
    utilization: "N/A",
    status: "Active",
    notes: "Contract signed Sep 2019",
    source: "magicincubation.com",
  },
  {
    name: "NETRARIT (RIT-TBI)",
    city: "Sangli",
    msinsGrant: "₹5 Cr",
    otherGovtFunds: "₹3.5 Cr (NIDHI), ₹3 Cr (MSME)",
    fundsReceived: "₹12.4 Cr total",
    startups: "67 registered",
    outcomes: "136 patents filed, 35 granted",
    utilization: "Exemplary",
    status: "Elite",
    notes: "Best-documented incubator with full disclosure",
    source: "netrarit.com",
  },
];

export const MSINS_REGISTRY_28: RegistryIncubator[] = [
  { id: 1, name: "KIT's Innovation & Research Foundation", city: "Kolhapur", email: "nidhitbi@kitcoek.in", sector: "Manufacturing, Electronics, AgriTech, HealthTech, EduTech, Food Processing, IoT, Drone, Robotics, AI/ML", website: "https://www.kitirf.com/", type: "TBI", address: "R.S. No. 199 B/2, Near Chitranagari, Kolhapur 416 234" },
  { id: 2, name: "AIC - BAMU Foundation", city: "Chhatrapati Sambhaji Nagar", email: "ceo.aic@bamu.ac.in", sector: "Agnostic", website: "http://www.bamu.ac.in/" },
  { id: 3, name: "ARAI - AMTIF Institute", city: "Pune", email: "ceo@amtifarai.org", sector: "Automobile", website: "https://www.araiindia.com/" },
  { id: 4, name: "BAIF Development Research Foundation", city: "Pune", email: "mayur.sarode@baif.org.in", sector: "Agriculture", website: "https://baif.org.in/" },
  { id: 5, name: "COEP Bhau Institute", city: "Pune", email: "ceo.bhau@coeptech.ac.in", sector: "Agnostic", website: "https://bhau.org/" },
  { id: 6, name: "D Y Patil Institute", city: "Pune", email: "ceo.dpu.ic@dpu.edu.in", sector: "Agnostic", website: "https://dpu.edu.in/about-incubation-centre.aspx" },
  { id: 7, name: "DBATU Forum of Innovation (DFIIE)", city: "Lonere", email: "ceo.dfiie@dbatu.ac.in", sector: "Agnostic", website: "https://dbatu.ac.in/" },
  { id: 8, name: "iSpark Mumbai (MSSU Mumbai)", city: "Mumbai", email: "ceo_ispark@mssu.ac.in", sector: "Agnostic", website: "https://mssu.ac.in/" },
  { id: 9, name: "Incubein Foundation", city: "Nagpur", email: "ceo.incubeinfoundation@gmail.com", sector: "Agnostic", website: "https://www.nagpuruniversity.ac.in" },
  { id: 10, name: "JITO Incubation Center", city: "Mumbai", email: "coo@jitojiif.com", sector: "Agnostic", website: "https://www.jitojiif.com/jito-incubation-centre/index.html" },
  { id: 11, name: "KBCNMU Centre for Innovation Incubation and Linkages", city: "Jalgaon", email: "ceo.kciil@nmu.ac.in", sector: "Agnostic", website: "https://www.nmu.ac.in" },
  { id: 12, name: "Kolhapur Institute of Technology", city: "Kolhapur", email: "ceo.nidhitbi@kitcoek.in", sector: "Agnostic", website: "https://www.kitcoek.in/" },
  { id: 13, name: "Kumbhathon Innovation Foundation", city: "Nashik", email: "foundersoffice@kumbhathon.com", sector: "Agnostic", website: "https://kumbhathon.com/" },
  { id: 14, name: "Marathwada Accelerator (MAGIC)", city: "Aurangabad", email: "contact@magicincubation.com", sector: "Agnostic", website: "https://www.magicaurangabad.com/" },
  { id: 15, name: "MU IDEAS FOUNDATION", city: "Mumbai", email: "director.iil@mu.ac.in", sector: "Agnostic", website: "https://www.muideas.org/" },
  { id: 16, name: "MUHS University Nashik", city: "Nashik", email: "ceodisha@muhs.ac.in", sector: "Health", website: "https://www.library.muhs.ac.in/" },
  { id: 17, name: "Netrarit Foundation", city: "Sangli", email: "nrit@ritindia.edu", sector: "Agnostic", website: "https://www.ritic.org/" },
  { id: 18, name: "PDKV Research & Incubation Foundation", city: "Akola", email: "pdkvincubation@gmail.com", sector: "Agriculture", website: "https://www.pdkv.ac.in/" },
  { id: 19, name: "Research Innovation Incubation Design Laboratory Foundation", city: "Mumbai", email: "riidlfoundation@somaiya.edu", sector: "Agnostic", website: "https://riidl.org/" },
  { id: 20, name: "Sahyadri Farms Agri Incubation", city: "Nashik", email: "gokul.tungar@sahyadrifarms.com", sector: "Agriculture", website: "https://www.sahyadrifarms.com/" },
  { id: 21, name: "SGBAU Research & Incubation", city: "Amravati", email: "ceo.srif@sgbau.ac.in", sector: "Agnostic", website: "http://www.incubation.sgbau.ac.in/" },
  { id: 22, name: "SPPU Research & Incubation Park Foundation", city: "Pune", email: "info.sppurpf@gmail.com", sector: "Agnostic", website: "http://iil.unipune.ac.in/" },
  { id: 23, name: "SUK Research and Development Foundation", city: "Kolhapur", email: "pdr_env@unishivaji.ac.in", sector: "Agnostic", website: "https://www.unishivaji.ac.in/" },
  { id: 24, name: "Tribetech Community (TRICEF)", city: "Gadchiroli", email: "diilgug@gmail.com", sector: "Agnostic", website: "https://unigug.ac.in/naac_ssr/731/Tricef%20Brochure%20(2).pdf" },
  { id: 25, name: "UDDYAM PAHSUI FOUNDATION", city: "Solapur", email: "ceo.uddyam@sus.ac.in", sector: "Agnostic", website: "http://incubation.sus.ac.in/" },
  { id: 26, name: "Venture Centre NCL", city: "Pune", email: "managerincubator@venturecenter.co.in", sector: "Clean Energy, Green Hydrogen", website: "https://www.venturecenter.co.in/" },
  { id: 27, name: "Wainganga Incubation Foundation", city: "Nagpur", email: "wif@wcem.edu.in", sector: "Agnostic", website: "https://www.neusourcestartup.com/companies/wainganga-incubation-foundation" },
  { id: 28, name: "WISE SNDTWU INCUBATION CENTRE", city: "Mumbai", email: "ceo@wisesndtwu.org", sector: "Agnostic", website: "https://www.sndt.ac.in/iil" },
];

export const FUNDING_REPORT_TEXT = {
  intro: "Maharashtra sanctioned ₹5 crore grants each to 16 incubators through the Maharashtra State Innovation Society (MSINS), totaling an ₹80 crore commitment — yet granular fund utilization data for most of these incubators is not publicly available.",
  summary: "Only a handful of incubators have disclosed how much they actually received, and no consolidated government audit or utilization report exists in the public domain. The research below represents the most complete picture currently available.",
  msins_background: "MSINS was established on August 18, 2017 under Maharashtra's Department of Skill Development and Entrepreneurship. The society is the nodal agency implementing the Maharashtra State Innovative Startup Policy 2018, which aimed to develop 15+ incubators and attract ₹5,000 crore in angel/seed investment.",
  opacity_analysis: "The single most important finding of this research is the near-total absence of public fund utilization data. DBATU DFIIE is the only state-funded incubator to publicly disclose its tranche receipts — receiving only 15% utilization over nearly seven years.",
  policy_2025: "The Maharashtra Startup Policy 2025, approved under CM Devendra Fadnavis, targets 25,000 entrepreneurs with the ₹500 crore CM Maha-Fund. A 300-acre Maharashtra Innovation City near Navi Mumbai is envisioned.",
};

export const GOVERNANCE_METRICS = {
   totalBudget: "₹420Cr",
   utilized: "₹284Cr",
   remaining: "₹136Cr",
   utilizationPercent: "67.6%",
   costPerStartup: "₹15.4L",
   costPerSuccess: "₹58.4L",
   utilTrend: { value: "4%", positive: true },
   disbursalTrend: { value: "8%", positive: true }
};

export const MONTHLY_DISBURSAL_DATA = [
   { month: 'Jul', value: 22 },
   { month: 'Aug', value: 28 },
   { month: 'Sep', value: 32 },
   { month: 'Oct', value: 24 },
   { month: 'Nov', value: 38 },
   { month: 'Dec', value: 42 },
   { month: 'Jan', value: 36 },
   { month: 'Feb', value: 44 },
   { month: 'Mar', value: 48 },
];

export const CENTER_UTILIZATION_CHART = [
   { name: 'COEP', value: 92 },
   { name: 'IIT', value: 90 },
   { name: 'Venture', value: 93 },
   { name: 'VNIT', value: 87 },
   { name: 'Nashik', value: 78 },
   { name: 'Amravati', value: 65 },
   { name: 'Gadchiroli', value: 53 },
];

export const FUND_ALERTS_DATA = [
   {
      id: "a1",
      title: "Underutilized Funds",
      description: "Gadchiroli TBI at 53% utilization — ₹1.9Cr unused",
      severity: "high",
      time: "2h ago"
   },
   {
      id: "a2",
      title: "No Output Alert",
      description: "Amravati center — ₹3.8Cr spent, only 8 graduates",
      severity: "high",
      time: "3h ago"
   },
   {
      id: "a3",
      title: "Overspending Risk",
      description: "Nashik AgriTech approaching 90% budget with 60% milestones",
      severity: "medium",
      time: "5h ago"
   },
   {
      id: "a4",
      title: "Delayed Reporting",
      description: "3 centers have not submitted Q4 financial reports",
      severity: "low",
      time: "1d ago"
   }
];
