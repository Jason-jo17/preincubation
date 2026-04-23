from typing import Dict, List, Optional, Any
from ..services.supabase_service import get_supabase
from ..models.mosi import MosiSession, MosiOpportunity, AssessmentMatrix
import json

class MosiBridgeService:
    """
    Bridge Service to connect MOSI Interview Intelligence with MSME CEED Engine.
    """
    
    def __init__(self):
        self.supabase = get_supabase()

    async def get_company_discovery_summary(self, company_id: str) -> Dict[str, Any]:
        """
        Aggregates all published MOSI sessions and opportunities for a company.
        """
        # 1. Fetch all published sessions for this company
        sessions_res = self.supabase.table('mosi_sessions') \
            .select('*, mosi_opportunities(*)') \
            .eq('company_id', company_id) \
            .eq('status', 'Published') \
            .execute()
        
        sessions = sessions_res.data
        if not sessions:
            return {}

        # 2. Aggregate Opportunities by Quadrant
        quadrant_data = {
            'Core': {'total_score': 0, 'count': 0, 'opportunities': [], 'evidence': []},
            'Efficiency': {'total_score': 0, 'count': 0, 'opportunities': [], 'evidence': []},
            'Expansion': {'total_score': 0, 'count': 0, 'opportunities': [], 'evidence': []},
            'Disruption': {'total_score': 0, 'count': 0, 'opportunities': [], 'evidence': []}
        }

        for session in sessions:
            opps = session.get('mosi_opportunities', [])
            for opp in opps:
                tag = opp.get('tag')
                # Normalize 'Disrupt' to 'Disruption'
                if tag == 'Disrupt': tag = 'Disruption'
                
                if tag in quadrant_data:
                    # Calculate a base score from clarity and budget (max 100)
                    # Clarity (1-4) * 12.5 + Budget (1-4) * 12.5 = max 100
                    clarity = opp.get('problem_clarity', 2)
                    budget = opp.get('budget_score', 2)
                    opp_score = (clarity * 12.5) + (budget * 12.5)
                    
                    quadrant_data[tag]['total_score'] += opp_score
                    quadrant_data[tag]['count'] += 1
                    quadrant_data[tag]['opportunities'].append({
                       'title': opp.get('title'),
                       'description': opp.get('description'),
                       'is_paid': opp.get('is_paid'),
                       'reward': opp.get('reward_amount')
                    })

        # 3. Finalize Scores
        summary = {
            'company_id': company_id,
            'session_count': len(sessions),
            'quadrant_scores': {},
            'top_opportunities': [],
            'raw_discovery_context': ""
        }

        for q, data in quadrant_data.items():
            if data['count'] > 0:
                summary['quadrant_scores'][q.lower()] = int(data['total_score'] / data['count'])
                summary['top_opportunities'].extend(data['opportunities'][:2])
        
        # Build context string for AI
        context_parts = []
        for session in sessions:
            context_parts.append(f"Session Summary ({session.get('date')}): {session.get('summary')}")
            for opp in session.get('mosi_opportunities', [])[:3]:
                context_parts.append(f"- Opp: {opp.get('title')} ({opp.get('tag')})")
        
        summary['raw_discovery_context'] = "\n".join(context_parts)
        
        return summary

    async def sync_to_ceed_analysis(self, company_id: str):
        """
        Updates the ceed_analysis table using MOSI discovery data as the primary evidence.
        """
        summary = await self.get_company_discovery_summary(company_id)
        if not summary:
            return None

        # Fetch existing analysis to update
        existing = self.supabase.table('ceed_analysis') \
            .select('*') \
            .eq('company_id', company_id) \
            .order('analyzed_at', desc=True) \
            .limit(1) \
            .execute()
        
        if not existing.data:
            return None # Should ideally trigger a full analysis if missing
        
        analysis = existing.data[0]
        
        # Update scores weighted towards discovery findings (60% discovery, 40% automated)
        updates = {}
        for quad, score in summary['quadrant_scores'].items():
            key = f"{quad}_score"
            current_score = analysis.get(key, 50)
            updates[key] = int((score * 0.6) + (current_score * 0.4))

        # Update metadata
        updates['confidence_score'] = min(float(analysis.get('confidence_score', 0.85)) + 0.05, 0.98)
        updates['analyzed_at'] = 'now()'
        
        # Save updates
        res = self.supabase.table('ceed_analysis').update(updates).eq('id', analysis['id']).execute()
        return res.data[0]
