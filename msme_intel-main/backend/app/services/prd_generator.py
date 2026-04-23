from typing import Dict, Optional, Any, List
from ..services.claude_service import ClaudeService
from ..services.supabase_service import get_supabase
import json
from datetime import datetime

class PRDGeneratorAgent:
    """
    AI-powered PRD Generator for BuildForX competitions.
    Creates comprehensive PRDs from company automation interests.
    """
    
    def __init__(self):
        self.claude = ClaudeService()
        self.supabase = get_supabase()
    
    async def generate_prd(self, interest_id: str, mosi_session_id: Optional[str] = None) -> Dict[str, Any]:
        """Generate complete PRD from approved automation interest."""
        
        # 1. Get automation interest with all context
        interest_res = self.supabase.table('company_automation_interests').select('*').eq('id', interest_id).single().execute()
        interest = interest_res.data
        
        # 1.1 Get MOSI Context if provided
        mosi_context = ""
        if mosi_session_id:
            mosi_res = self.supabase.table('mosi_sessions').select('*, mosi_opportunities(*)').eq('id', mosi_session_id).single().execute()
            if mosi_res.data:
                session = mosi_res.data
                mosi_context = f"Interview Summary: {session.get('summary')}\nOpportunities Found:\n"
                for opp in session.get('mosi_opportunities', []):
                    mosi_context += f"- {opp.get('title')}: {opp.get('description')} (Tag: {opp.get('tag')})\n"

        # 2. Get automation need
        need_res = self.supabase.table('sector_automation_needs').select('*').eq('id', interest['automation_need_id']).single().execute()
        automation_need = need_res.data
        
        # 3. Get company
        company_res = self.supabase.table('companies').select('*').eq('id', interest['company_id']).single().execute()
        company = company_res.data
        
        # 4. Get sector
        sector_res = self.supabase.table('sectors').select('*').eq('id', company['primary_sector_id']).single().execute()
        sector = sector_res.data
        
        # 5. Generate PRD code
        prd_code = f"PRD-{sector['name'][:3].upper()}-2026-{interest_id[:4].upper()}"
        
        # 6. Generate PRD sections using AI
        # Instead of multiple calls, we'll try one comprehensive call to get a structured PRD
        prompt = f"""
        Generate a comprehensive Product Requirement Document (PRD) for a BuildForX competition.
        
        Company: {company['name']}
        Sector: {sector['name']}
        Automation Need: {automation_need['title']}
        Description: {automation_need['description']}
        
        Company's Context:
        Pain Points: {interest.get('current_pain_points', [])}
        Current Process: {interest.get('current_process_description', '')}
        Desired Outcomes: {interest.get('desired_outcomes', [])}
        Existing Systems: {interest.get('existing_systems', {})}
        Constraints: {interest.get('constraints', [])}
        Success Metrics: {interest.get('success_metrics', {})}
        
        MOSI Discovery Evidence:
        {mosi_context}
        
        Generate a detailed JSON structure containing:
        1. "executive_summary": <overarching summary>
        2. "problem_statement": {{
            "overview": "...",
            "impact": "...",
            "stakeholders_affected": ["..."],
            "root_causes": ["..."],
            "current_workarounds": ["..."],
            "cost_of_inaction": "..."
        }}
        3. "objectives": [{{ "title": "...", "description": "...", "is_primary": true }}]
        4. "scope": {{ "in_scope": ["..."], "out_of_scope": ["..."] }}
        5. "functional_requirements": [{{ 
            "id": "FR-001", "category": "...", "requirement": "...", 
            "priority": "Must Have", "acceptance_criteria": ["..."], "dependencies": [] 
        }}]
        6. "non_functional_requirements": [{{ "id": "NFR-001", "requirement": "...", "priority": "..." }}]
        7. "technical_specifications": {{ "architecture": "...", "tech_stack": ["..."], "data_model": "..." }}
        8. "user_stories": [{{ "role": "...", "action": "...", "outcome": "...", "acceptance_criteria": ["..."] }}]
        9. "success_metrics": {{ "primary": ["..."], "secondary": ["..."] }}
        10. "evaluation_criteria": {{ 
            "technical": [{{ "criterion": "...", "weight": 20, "description": "..." }}],
            "functional": [...], "innovation": [...], "presentation": [...]
        }}
        """
        
        response_text = self.claude.create_message(
            system="You are a senior Product Manager specializing in AI/Automation. Return ONLY valid JSON.",
            user_message=prompt
        )
        
        try:
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
                
            prd_data = json.loads(response_text)
        except Exception:
            # Fallback
            prd_data = {"executive_summary": "Failed to generate detailed PRD, please retry."}
            
        final_prd = {
            'company_automation_interest_id': interest_id,
            'company_id': interest['company_id'],
            'automation_need_id': interest['automation_need_id'],
            'sector_id': company['primary_sector_id'],
            'prd_code': prd_code,
            'title': f"{automation_need['title']} for {company['name']}",
            'slug': f"{automation_need['slug']}-{interest_id[:4]}",
            **prd_data,
            'status': 'draft',
            'version': 1
        }
        
        # Save to database
        save_res = self.supabase.table('buildforx_prds').insert(final_prd).execute()
        prd = save_res.data[0]
        
        # --- Stakeholder & Problem Ingestion Logic ---
        # Add the stakeholder and the problems to the stakeholder platform (MOSI)
        try:
            # 1. Ensure Stakeholder exists
            sh_res = self.supabase.table('mosi_stakeholders').select('*').eq('company_id', company['id']).execute()
            if not sh_res.data:
                # Create a placeholder stakeholder for the company if missing
                sh_data = {
                    'company_id': company['id'],
                    'name': f"{company['name']} Operations Lead",
                    'role': 'Stakeholder',
                    'company_name': company['name'],
                    'sector': sector['name']
                }
                sh_res = self.supabase.table('mosi_stakeholders').insert(sh_data).execute()
            
            stakeholder = sh_res.data[0]
            
            # 2. Create a "Build Challenge" Session for ingestion
            session_data = {
                'stakeholder_id': stakeholder['id'],
                'company_id': company['id'],
                'status': 'Completed',
                'summary': f"Build Challenge Inception: {prd['title']}",
                'date': datetime.now().strftime("%Y-%m-%d")
            }
            session_res = self.supabase.table('mosi_sessions').insert(session_data).execute()
            session = session_res.data[0]
            
            # 3. Create MOSI Opportunity (The "Problem")
            problem = prd.get('problem_statement', {})
            opp_data = {
                'session_id': session['id'],
                'timestamp': 0,
                'title': prd['title'],
                'description': problem.get('overview', prd['executive_summary']),
                'tag': prd.get('ceed_tag', 'Efficiency'), # Default to Efficiency if not specified
                'status': 'Approved',
                'origin': 'BuildChallenge'
            }
            self.supabase.table('mosi_opportunities').insert(opp_data).execute()
            
            print(f"Successfully ingested stakeholder and problem for {company['name']} into MOSI platform.")
            
        except Exception as ingest_err:
            print(f"Ingestion warning (non-blocking): {str(ingest_err)}")
            
        return prd
