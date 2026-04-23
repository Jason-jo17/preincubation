export const MOCK_CEED_ANALYSIS = {
  id: "ceed-1",
  company_name: "Aequs Limited",
  sector: "Aerospace & Precision Manufacturing",
  primary_quadrant: "expansion",
  secondary_quadrant: "efficiency",
  scores: {
    core: 85,
    expansion: 42,
    efficiency: 65,
    disruption: 55
  },
  assessments: {
    core: {
      score: 85,
      sub_scores: { 
        "Revenue Stability": 95, 
        "Customer Retention": 90, 
        "Market Position": 85,
        "Product Maturity": 70
      },
      evidence: ["Airbus contract secured", "Market cap ₹7,700 Cr", "Only integrated aerospace ecosystem in India"],
      gaps: ["Profitability drag from consumer segment", "Net profit margin -10.6%"],
      opportunities: ["Spin-off consumer segment to separate P&L"]
    },
    expansion: {
       score: 42,
       sub_scores: {
          "Geo Diversification": 50,
          "Product Range": 40,
          "Export Readiness": 60,
          "New Segments": 30
       },
       evidence: ["Targeting $500M in aerospace scale"],
       gaps: ["Consumer segment bleeding resources", "Vacant CTO position hindering scale", "High engineering attrition"],
       opportunities: ["Establish engineering leadership", "Document succession plan"]
    },
    efficiency: {
      score: 65,
      sub_scores: {
        "Process Automation": 45,
        "Digital Maturity": 60,
        "Cost Optimization": 50,
        "Resource Utilization": 85
      },
      evidence: ["Losing weeks quoting for new aerospace components"],
      gaps: ["Manual RFQ pipeline", "High engineering dependency for quotes"],
      opportunities: ["Automate RFQ processing pipeline"],
      automation_opportunities: [
         { area: "Sales & Quoting", current_state: "Manual aerospace RFQ generation", automation_potential: "NLP/OCR Pipeline", estimated_impact: "Reduce quoting time from weeks to hours" }
      ]
    },
    disruption: {
       score: 55,
       sub_scores: {
          "Tech Adoption": 65,
          "IP Creation": 40,
          "Innovation R&D": 50,
          "Digital Strategy": 60
       },
       evidence: ["Willingness to automate engineering workflows"],
       gaps: ["No automated pipelines for core design processes"],
       opportunities: ["Generative AI for component pricing"],
       disruptive_opportunities: [
          { opportunity: "AI Engineering Workflow", potential_impact: "De-risk high attrition by capturing institutional knowledge", barriers: ["Implementation time", "Adoption resistance"] }
       ]
    }
  }
};

export const INITIAL_MOSI_SESSIONS = [
  {
    id: "mosi-1",
    stakeholder_id: "Plant Manager",
    user_id: "researcher-1",
    company_id: "ceed-1",
    status: "Published" as const,
    date: "Mar 25, 2026",
    duration: 1240,
    audio_settings: { audio: true, video: false },
    summary: "Production floor walk-through focusing on CNC utilization. Identified significant idle time during tool changes. Staff mentioned repetitive data entry for QC reports.",
    opportunities: [
      {
        id: "opp-1",
        session_id: "mosi-1",
        timestamp: 450,
        title: "CNC Tool Change Optimization",
        tag: "Efficiency" as const,
        problem_clarity: 4,
        budget_score: 3,
        is_paid: false,
        origin: "Interviewer" as const,
        actively_seeking: true,
        skillset: ["Industrial Engineering"],
        toolset: ["Lean Six Sigma"],
        mindset: ["Process Optimization"],
        assessment_matrix: { clarity: 4, awareness: 3, attempts: 2, intensity: 3 },
        status: "Approved" as const
      },
      {
        id: "opp-2",
        session_id: "mosi-1",
        timestamp: 820,
        title: "Automated QC Data Entry",
        tag: "Efficiency" as const,
        problem_clarity: 2,
        budget_score: 2,
        is_paid: false,
        origin: "Stakeholder" as const,
        actively_seeking: false,
        skillset: ["IoT"],
        toolset: ["MQTT"],
        mindset: ["Reliability"],
        assessment_matrix: { clarity: 2, awareness: 2, attempts: 1, intensity: 2 },
        status: "Pending" as const
      }
    ],
    transcript: []
  },
  {
    id: "mosi-3",
    stakeholder_id: "CEO Aravind Melligeri",
    user_id: "researcher-1",
    company_id: "ceed-1",
    status: "Published" as const,
    date: "Apr 01, 2026",
    duration: 1800,
    audio_settings: { audio: true, video: true },
    summary: "Interview with CEO Aravind Melligeri of Aequs Limited focusing on operational bottlenecks and strategic roadmap. The primary concern is scaling the aerospace segment to $500M while addressing the profitability drag from the consumer segment. Critical gaps identified include high engineering attrition, the vacant CTO position, and lack of a documented succession plan.",
    opportunities: [
      {
        id: "opp-aeq-001",
        session_id: "mosi-3",
        timestamp: 240,
        title: "Spin-off Consumer Segment",
        tag: "Core" as const,
        problem_clarity: 4,
        budget_score: 3,
        is_paid: true,
        origin: "Customer" as const,
        actively_seeking: true,
        skillset: ["Financial Restructuring", "Executive Strategy"],
        toolset: ["ERP Split", "Financial Modeling"],
        mindset: ["Visionary Focus", "Risk Management"],
        assessment_matrix: { clarity: 4, awareness: 4, attempts: 1, intensity: 4 },
        status: "Approved" as const
      },
      {
        id: "opp-aeq-002",
        session_id: "mosi-3",
        timestamp: 310,
        title: "Automated RFQ Processing for Aerospace",
        tag: "Efficiency" as const,
        problem_clarity: 3,
        budget_score: 4,
        is_paid: true,
        origin: "Interviewer" as const,
        actively_seeking: true,
        skillset: ["NLP", "Sales Automation", "Process Engineering"],
        toolset: ["Python", "FastAPI", "OCR"],
        mindset: ["Process Optimization", "Efficiency"],
        assessment_matrix: { clarity: 3, awareness: 4, attempts: 2, intensity: 3 },
        status: "Approved" as const
      }
    ],
    transcript: [
      { speaker: "Aravind", time: "04:05", text: "Look, we have the Airbus contract, and we are the only integrated aerospace ecosystem in India. Our market cap is strong at ₹7,700 Cr." },
      { speaker: "Interviewer", time: "04:12", text: "That's impressive. But I see your net profit margin is sitting at -10.6%. What's dragging it down?" },
      { speaker: "Aravind", time: "05:00", text: "It's the consumer segment. Aerospace is growing smoothly, but consumer is bleeding our resources and holding back our overall profitability. We need to separate its P&L or spin it off entirely." },
      { speaker: "Aravind", time: "07:45", text: "A bit, but we need someone to come in and build an automated RFQ pipeline. We are losing weeks just quoting for new aerospace components." }
    ]
  }
];
