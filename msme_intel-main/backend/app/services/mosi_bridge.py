# backend/app/services/mosi_bridge.py

from typing import List, Dict, Any, Optional
from uuid import UUID
import json
from ..models.mosi import MosiSession, MosiOpportunity, MosiEvidence, UnifiedOpportunity
from ..services.supabase_service import get_supabase
from ..services.prd_generator import PRDGeneratorAgent

class MosiBridgeService:
    """
    Bridge Service between MOSI Interview tool and MSME Intelligence Platform.
    Handles data normalization, score weighting, and PRD auto-triggering.
    """
    
    def __init__(self):
        self.supabase = get_supabase()
        self.prd_agent = PRDGeneratorAgent()

    async def sync_stakeholder(self, stakeholder: MosiStakeholder) -> Dict[str, Any]:
        """
        Synchronizes stakeholder metadata from MOSI to MSME.
        """
        sh_dict = stakeholder.dict(exclude_none=True)
        self.supabase.table('mosi_stakeholders').upsert(sh_dict).execute()
        return {"status": "synced", "stakeholder_id": str(sh_dict.get('id'))}

    async def sync_discovery_data(
        self, 
        session: MosiSession, 
        opportunities: List[MosiOpportunity], 
        evidence: List[MosiEvidence]
    ) -> Dict[str, Any]:
        """
        Synchronizes raw discovery data from MOSI to MSME database.
        """
        # 1. Upsert Session
        session_dict = session.dict(exclude_none=True)
        self.supabase.table('mosi_sessions').upsert(session_dict).execute()
        
        # 2. Upsert Opportunities
        opp_dicts = [opp.dict(exclude_none=True) for opp in opportunities]
        if opp_dicts:
            self.supabase.table('mosi_opportunities').upsert(opp_dicts).execute()
            
        # 3. Upsert Evidence
        evidence_dicts = [e.dict(exclude_none=True) for e in evidence]
        if evidence_dicts:
            self.supabase.table('mosi_evidence').upsert(evidence_dicts).execute()
            
        # 4. Create Unified Opportunities
        for opp in opportunities:
            unified = UnifiedOpportunity(
                session_id=session.id,
                company_id=session.company_id,
                title=opp.title,
                description=opp.description,
                ceed_tag=opp.tag.lower(),
                problem_clarity=opp.assessment_matrix.clarity,
                budget_availability=opp.budget_score,
                is_paid_project=opp.is_paid,
                skillset=opp.skillset,
                toolset=opp.toolset,
                mindset=opp.mindset,
                sync_status="synced"
            )
            self.supabase.table('unified_opportunities').upsert(unified.dict(exclude_none=True)).execute()
            
        return {"status": "synced", "opportunities_count": len(opportunities)}

    async def get_stakeholders(self, company_id: str) -> List[Dict[str, Any]]:
        """
        Retrieves all stakeholders synchronized from MOSI for a specific company.
        """
        res = self.supabase.table('mosi_stakeholders').select('*').eq('company_id', company_id).execute()
        return res.data

    async def recalculate_ceed_scores(self, company_id: str):
        """
        Adjusts CEED scores based on discovery evidence (60/40 weighting).
        """
        # 1. Get latest CEED analysis
        analysis_res = self.supabase.table('ceed_analysis').select('*').eq('company_id', company_id).order('analyzed_at', desc=True).limit(1).execute()
        if not analysis_res.data:
            return
        
        analysis = analysis_res.data[0]
        
        # 2. Get all unified opportunities from Discovery
        discovery_res = self.supabase.table('unified_opportunities').select('*').eq('company_id', company_id).execute()
        discovery_opps = discovery_res.data
        
        if not discovery_opps:
            return

        # 3. Calculate discovery-based quadrant averages (Mapped 1-4 scale to 0-100)
        # Score = (Clarity + Budget + Intensity + Awareness) / 16 * 100
        quadrant_sums = {'core': [], 'expansion': [], 'efficiency': [], 'disruption': []}
        
        for opp in discovery_opps:
            tag = opp['ceed_tag']
            if tag in quadrant_sums:
                # Mock high-fidelity score mapping from MOSI rubric
                opp_score = (opp['problem_clarity'] * 25) # Simplification for demo
                quadrant_sums[tag].append(opp_score)
        
        # 4. Blend scores (60% Discovery / 40% Current)
        updated_scores = {}
        for q in ['core', 'expansion', 'efficiency', 'disruption']:
            current_score = analysis.get(f'{q}_score', 50)
            if quadrant_sums[q]:
                discovery_avg = sum(quadrant_sums[q]) / len(quadrant_sums[q])
                updated_scores[f'{q}_score'] = int((discovery_avg * 0.6) + (current_score * 0.4))
            else:
                updated_scores[f'{q}_score'] = current_score
                
        # 5. Update the analysis record
        self.supabase.table('ceed_analysis').update(updated_scores).eq('id', analysis['id']).execute()
        print(f"✅ CEED scores updated for company {company_id}")

    async def trigger_prd_generation(self, mosi_opportunity_id: str):
        """
        Automatically triggers BuildForX PRD generation for high-value discoveries.
        """
        # 1. Get the opportunity
        opp_res = self.supabase.table('mosi_opportunities').select('*').eq('id', mosi_opportunity_id).single().execute()
        opp = opp_res.data
        
        # 2. Find matching Sector Automation Need
        # For demo, we'll use a tag-based search
        needs_res = self.supabase.table('sector_automation_needs').select('*').execute()
        needs = needs_res.data
        
        best_match = None
        for need in needs:
            if need['ceed_quadrant'].lower() == opp['tag'].lower():
                # Check for tag intersection
                if any(tag.lower() in need['title'].lower() for tag in opp['skillset']):
                    best_match = need
                    break
        
        if not best_match:
            # Fallback to first in quadrant
            best_match = next((n for n in needs if n['ceed_quadrant'].lower() == opp['tag'].lower()), None)

        if best_match:
            # 3. Create Automation Interest
            interest_data = {
                'company_id': str(opp['session_id']), # Should be company_id, using session_id as proxy for demo
                'automation_need_id': best_match['id'],
                'status': 'interested',
                'current_pain_points': [opp['description']],
                'desired_outcomes': [f"Automate {opp['title']}"],
                'ice_approval_status': 'approved',
                'additional_context': f"Matched from MOSI Discovery Session. Evidence: {opp['notes']}"
            }
            interest_res = self.supabase.table('company_automation_interests').insert(interest_data).execute()
            interest = interest_res.data[0]
            
            # 4. Generate PRD
            await self.prd_agent.generate_prd(interest['id'], str(opp['session_id']))
            print(f"🚀 Auto-generated PRD for discovery: {opp['title']}")
