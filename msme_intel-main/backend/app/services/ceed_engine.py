from typing import Dict, List, Optional, Any
from ..services.claude_service import ClaudeService
from ..services.supabase_service import get_supabase
import json

class CEEDAnalysisEngine:
    """
    CEED Framework Analysis Engine
    
    Core: Existing business strength, market position, revenue stability
    Expansion: Geographic/product diversification potential, new market readiness
    Efficiency: Process automation level, digital maturity, cost optimization scope
    Disruption: Innovation capability, technology adoption, differentiation potential
    """
    
    def __init__(self):
        self.claude = ClaudeService()
        self.supabase = get_supabase()
    
    async def analyze_company(
        self, 
        company_id: str, 
        force_refresh: bool = False
    ) -> Dict[str, Any]:
        """
        Perform comprehensive CEED analysis on a company.
        """
        # 1. Check if analysis already exists and not forced refresh
        if not force_refresh:
            existing = self.supabase.table('ceed_analysis').select('*').eq('company_id', company_id).order('analyzed_at', desc=True).limit(1).execute()
            if existing.data:
                return existing.data[0]

        # 2. Get company data
        company_res = self.supabase.table('companies').select('*').eq('id', company_id).single().execute()
        company = company_res.data
        
        # 3. Get financials
        financials_res = self.supabase.table('company_financials').select('*').eq('company_id', company_id).execute()
        financials = financials_res.data
        
        # 4. Get gap analysis
        gap_res = self.supabase.table('gap_analysis').select('*').eq('company_id', company_id).order('analysis_date', desc=True).limit(1).execute()
        gap_analysis = gap_res.data[0] if gap_res.data else {}
        
        # 5. Get sector thesis for context
        sector_id = company.get('primary_sector_id')
        sector_thesis = {}
        if sector_id:
            thesis_res = self.supabase.table('sector_thesis').select('*').eq('sector_id', sector_id).limit(1).execute()
            sector_thesis = thesis_res.data[0] if thesis_res.data else {}
        
        # 6. Perform quadrant assessments using AI
        core_assessment = await self._analyze_quadrant(
            "CORE", 
            f"existing business strength, revenue stability, and market position. Financials: {financials}",
            company, 
            gap_analysis, 
            sector_thesis
        )
        
        expansion_assessment = await self._analyze_quadrant(
            "EXPANSION", 
            "geographic/product diversification potential and new market readiness.",
            company, 
            gap_analysis, 
            sector_thesis
        )
        
        efficiency_assessment = await self._analyze_quadrant(
            "EFFICIENCY", 
            "operational automation potential, digital maturity, and cost optimization scope.",
            company, 
            gap_analysis, 
            sector_thesis
        )
        
        disruption_assessment = await self._analyze_quadrant(
            "DISRUPTION", 
            "innovation capability, technology adoption, and differentiation potential.",
            company, 
            gap_analysis, 
            sector_thesis
        )
        
        # 7. Determine primary and secondary quadrants
        scores = {
            'core': core_assessment['score'],
            'expansion': expansion_assessment['score'],
            'efficiency': efficiency_assessment['score'],
            'disruption': disruption_assessment['score']
        }
        
        sorted_quadrants = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        primary_quadrant = sorted_quadrants[0][0]
        secondary_quadrant = sorted_quadrants[1][0]
        
        # 8. Calculate automation readiness
        automation_readiness = self._calculate_automation_readiness(
            efficiency_assessment,
            disruption_assessment,
            gap_analysis
        )
        
        analysis_data = {
            'company_id': company_id,
            'sector_id': sector_id,
            'core_score': core_assessment['score'],
            'expansion_score': expansion_assessment['score'],
            'efficiency_score': efficiency_assessment['score'],
            'disruption_score': disruption_assessment['score'],
            'primary_quadrant': primary_quadrant,
            'secondary_quadrant': secondary_quadrant,
            'core_assessment': core_assessment,
            'expansion_assessment': expansion_assessment,
            'efficiency_assessment': efficiency_assessment,
            'disruption_assessment': disruption_assessment,
            'automation_readiness_score': int(automation_readiness['score']),
            'automation_priority_level': automation_readiness['priority'],
            'estimated_automation_roi': float(automation_readiness['estimated_roi']),
            'confidence_score': 0.85,
            'analyzed_at': 'now()'
        }
        
        # 9. Save to database
        save_res = self.supabase.table('ceed_analysis').insert(analysis_data).execute()
        return save_res.data[0]
    
    async def _analyze_quadrant(self, quadrant_name: str, definition: str, company: dict, gap_analysis: dict, sector_thesis: dict) -> Dict[str, Any]:
        """Generic quadrant analysis helper."""
        
        prompt = f"""
        Analyze the {quadrant_name} quadrant for this company. 
        Focus on: {definition}
        
        Company Context:
        Name: {company.get('name')}
        Description: {company.get('description')}
        Stage: {company.get('stage')}
        Employee Count: {company.get('employee_count')}
        
        Gap Analysis Context:
        Scores: { {k: v for k, v in gap_analysis.items() if 'score' in k} }
        Key Strengths: {gap_analysis.get('key_strengths', [])}
        Critical Gaps: {gap_analysis.get('critical_gaps', [])}
        
        Sector Thesis Context:
        {sector_thesis.get('title', 'Unknown Sector')}
        Content Summary: {sector_thesis.get('content', '')[:500]}...
        
        Return a refined JSON analysis with:
        {{
            "score": <0-100 overall score for this quadrant>,
            "sub_scores": {{
                "dimension_1": <0-100>,
                "dimension_2": <0-100>,
                "dimension_3": <0-100>
            }},
            "evidence": ["Evidence 1", "Evidence 2"],
            "gaps": ["Gap 1", "Gap 2"],
            "opportunities": ["Opportunity 1", "Opportunity 2"],
            "automation_opportunities": [
                {{
                    "area": "Topic",
                    "current_state": "Manual...",
                    "automation_potential": "AI/ML...",
                    "estimated_impact": "X% reduction"
                }}
            ] (only for EFFICIENCY quadrant),
            "disruptive_opportunities": [
                 {{
                    "opportunity": "Title",
                    "potential_impact": "Description",
                    "barriers": ["Barrier 1"]
                }}
            ] (only for DISRUPTION quadrant)
        }}
        """
        
        response_text = self.claude.create_message(
            system="You are an expert MSME business analyst. Return ONLY valid JSON.",
            user_message=prompt
        )
        
        try:
            # Clean response text if needed (e.g. removing markdown blocks)
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            
            return json.loads(response_text)
        except Exception:
            # Fallback
            return {
                "score": 50,
                "sub_scores": {"general": 50},
                "evidence": ["Analysis failed, provided default"],
                "gaps": [],
                "opportunities": []
            }

    def _calculate_automation_readiness(self, efficiency: dict, disruption: dict, gap: dict) -> Dict[str, Any]:
        """Weighted calculation of automation readiness."""
        eff_score = efficiency.get('score', 50)
        tech_readiness = disruption.get('sub_scores', {}).get('technology_adoption_readiness', 50)
        
        # If gap analysis has systems/processes score, factor it in
        systems_score = gap.get('systems_processes_score', 50)
        
        readiness_score = (eff_score * 0.4) + (tech_readiness * 0.4) + (systems_score * 0.2)
        
        if readiness_score >= 75:
            priority = 'critical'
            roi = 40
        elif readiness_score >= 60:
            priority = 'high'
            roi = 30
        elif readiness_score >= 45:
            priority = 'medium'
            roi = 20
        else:
            priority = 'low'
            roi = 10
            
        return {'score': readiness_score, 'priority': priority, 'estimated_roi': roi}
