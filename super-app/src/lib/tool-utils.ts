export const TOOL_ID_MAP: Record<string, string> = {
  // Strategic & Analysis
  "PESTLE Analysis": "pestle",
  "PESTLE_Analysis": "pestle",
  "SWOT Analysis": "swot",
  "SWOT_Analysis": "swot",
  "Porter's Five Forces": "porters_five_forces",
  "Porters Five Forces": "porters_five_forces",
  "Fish Bone Analysis ( Root Cause Analysis )": "fishbone_diagram",
  "Fishbone Diagram": "fishbone_diagram",
  "Fishbone_Diagram": "fishbone_diagram",
  "Iceberg Model / Systems Map": "iceberg_model",
  "Iceberg Model": "iceberg_model",
  "Systems Thinking": "iceberg_model",

  // Business Model & Lean
  "Business Model Canvas ( Osterwalder )": "bmc",
  "Business Model Canvas": "bmc",
  "Lean Canvas ( Ash Maurya )": "lean_canvas",
  "Lean Canvas": "lean_canvas",
  "Value Proposition Canvas": "vpc",
  "VPC Builder": "vpc",
  "Value Prop Canvas": "vpc",
  "Field Visit and Value Prop Canvas": "vpc",
  "Innovation Tool": "innovation",
  "Design Thinking Framework": "innovation",
  "MTP Canvas": "mtp_canvas",
  "Ikigai Framework ( founder-fit )": "mtp_ikigai",

  // Validation & Research
  "Javelin Experiment Board": "javelin_board",
  "Experiment Board": "javelin_board",
  "Validation Board": "javelin_board",
  "Assumption Mapping ( Strategyzer )": "assumption_mapping",
  "Hypothesis Mapping": "assumption_mapping",
  "Risk Mapping": "assumption_mapping",
  "The Mom Test ( Rob Fitzpatrick ) interview script": "interview_guide",
  "Interview Guide": "interview_guide",
  "Primary Research Interview": "interview_guide",
  "Empathy Mapping": "empathy_map",
  "Empathy Map": "empathy_map",

  // Marketing & Sales
  "TAM / SAM / SOM framing": "market_sizing",
  "Market Sizing": "market_sizing",
  "Opportunity Sizing": "market_sizing",
  "Competitor Matrix template": "competitor_matrix",
  "Competitor Analysis": "competitor_matrix",
  "Competitive Landscape": "competitor_matrix",
  "STP Framework ( Segmentation-Targeting-Positioning )": "stp_matrix",
  "STP Matrix": "stp_matrix",
  "Market Targeting": "stp_matrix",
  "AARRR Funnel template ( Pirate Metrics )": "aarrr",
  "Pirate Metrics": "aarrr",
  "Growth Funnel": "aarrr",

  // Product & Design
  "Kano Model": "kano",
  "Feature Prioritization": "kano",
  "Sean Ellis PMF Test": "sean_ellis",
  "Sean Ellis PMF Survey": "sean_ellis",
  "Product-Market Fit": "sean_ellis",
  "Crazy 8s": "crazy8",
  "Rapid Ideation": "crazy8",
  "Persona Journey": "persona_journey",
  "User Journey Mapping": "persona_journey",

  // Finance & Legal
  "Unit Economics calculator ( LTV / CAC )": "unit_economics",
  "Financial Scalability": "unit_economics",
  "Van Westendorp Price Sensitivity Meter": "van_westendorp",
  "Price Sensitivity": "van_westendorp",
  "Pricing Analysis": "van_westendorp",
  "Cap-Table template ( Carta / Ledgy )": "cap_table",
  "Equity Modeling": "cap_table",
  "Shareholding Structure": "cap_table",

  // Social & Impact
  "Problem Tree Analysis ( USAID / SIDA )": "problem_tree",
  "Problem Tree": "problem_tree",
  "Root Cause Tree": "problem_tree",
  "Theory of Change ( ToC ) v0": "theory_of_change",
  "Theory of Change": "theory_of_change",

  // Operations & Engineering
  "FMEA ( Failure Modes & Effects Analysis )": "fmea",
  "Failure Modes": "fmea",
  "Service Blueprint template": "service_blueprint",
  "Service Blueprint": "service_blueprint",
  "Operational Map": "service_blueprint",
};

export function getToolLink(toolName: string): string | null {
  const toolId = TOOL_ID_MAP[toolName];
  if (toolId) {
    return `/innovator/tools?tool=${toolId}`;
  }
  return null;
}
