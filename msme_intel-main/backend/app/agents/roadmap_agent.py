import json
from typing import Dict, Any
from app.services.claude_service import ClaudeService

class RoadmapAgent:
    
    SYSTEM_PROMPT = """You are an expert business strategist specializing in creating actionable 6-month roadmaps for MSMEs.

You are proficient in multiple frameworks:
- ExO (Exponential Organizations)
- Lean Startup
- OKR (Objectives & Key Results)
- Blue Ocean Strategy
- Jobs-to-be-Done

Create practical, achievable roadmaps that address specific gaps and leverage market opportunities. Return ONLY valid JSON, no markdown formatting."""
    
    def generate_roadmap(self, company_data: Dict[str, Any], gap_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate 6-month roadmap based on company data and gap analysis"""
        
        prompt = f"""Create a comprehensive 6-month roadmap for this company:

COMPANY DATA:
{json.dumps(company_data, indent=2)}

GAP ANALYSIS:
{json.dumps(gap_analysis, indent=2)}

Generate roadmap in strict JSON format (no markdown, no code blocks):
{{
  "title": "6-Month Growth Roadmap for [Company Name]",
  "executive_summary": "Brief overview of the roadmap strategy and expected outcomes",
  "frameworks": ["ExO", "OKR", "Lean Startup"],
  "phases": [
    {{
      "phase_number": 1,
      "phase_name": "Foundation (Month 1-2)",
      "objectives": ["Objective 1", "Objective 2"],
      "initiatives": [
        {{
          "name": "Initiative name",
          "description": "Detailed description",
          "owner": "Role responsible",
          "timeline": "Weeks 1-4",
          "deliverables": ["Deliverable 1", "Deliverable 2"]
        }}
      ],
      "milestones": ["Milestone 1", "Milestone 2"],
      "success_metrics": ["Metric 1", "Metric 2"]
    }},
    {{
      "phase_number": 2,
      "phase_name": "Growth (Month 3-4)",
      "objectives": ["Objective 1", "Objective 2"],
      "initiatives": [
        {{
          "name": "Initiative name",
          "description": "Details",
          "owner": "Role",
          "timeline": "Weeks 9-16",
          "deliverables": ["Deliverable 1"]
        }}
      ],
      "milestones": ["Milestone 1"],
      "success_metrics": ["Metric 1"]
    }},
    {{
      "phase_number": 3,
      "phase_name": "Scale (Month 5-6)",
      "objectives": ["Objective 1", "Objective 2"],
      "initiatives": [
        {{
          "name": "Initiative name",
          "description": "Details",
          "owner": "Role",
          "timeline": "Weeks 17-24",
          "deliverables": ["Deliverable 1"]
        }}
      ],
      "milestones": ["Milestone 1"],
      "success_metrics": ["Metric 1"]
    }}
  ],
  "gtm_strategy": {{
    "target_segments": ["Segment 1", "Segment 2"],
    "distribution_channels": ["Channel 1", "Channel 2"],
    "pricing_strategy": "Description of pricing approach",
    "marketing_tactics": ["Tactic 1", "Tactic 2"]
  }},
  "resource_requirements": {{
    "budget_inr_lakhs": 50,
    "team": [
      {{"role": "CTO", "when": "Month 1"}},
      {{"role": "Sales Lead", "when": "Month 2"}}
    ],
    "technology": ["Technology 1", "Technology 2"]
  }},
  "expected_outcomes": {{
    "metrics": {{
      "revenue_target_inr_cr": 2.5,
      "customer_target": 500,
      "market_share_target_pct": 5
    }},
    "success_criteria": ["Criteria 1", "Criteria 2"]
  }}
}}"""
        
        response_text = ClaudeService.create_message(
            system=self.SYSTEM_PROMPT,
            user_message=prompt,
            max_tokens=8192
        )
        
        # Clean response - remove markdown code blocks if present
        cleaned_response = response_text.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response[7:]
        if cleaned_response.startswith("```"):
            cleaned_response = cleaned_response[3:]
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3]
        cleaned_response = cleaned_response.strip()
        
        try:
            roadmap = json.loads(cleaned_response)
            return roadmap
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            print(f"Response: {cleaned_response}")
            raise
