# backend/app/api/mosi.py

from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Dict, Any, Optional
from ..models.mosi import MosiSession, MosiOpportunity, MosiEvidence, MosiStakeholder
from ..services.mosi_bridge import MosiBridgeService
from ..services.supabase_service import get_supabase

router = APIRouter(prefix="/mosi", tags=["MOSI Integration"])

@router.post("/stakeholder")
async def sync_mosi_stakeholder(stakeholder: MosiStakeholder):
    """
    Synchronizes a formal stakeholder profile from the MOSI tool.
    """
    try:
        bridge = MosiBridgeService()
        return await bridge.sync_stakeholder(stakeholder)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/synthesis")
async def receive_mosi_synthesis(
    session_data: MosiSession,
    opportunities: List[MosiOpportunity],
    stakeholder: Optional[MosiStakeholder] = None,
    evidence: List[MosiEvidence] = [],
    background_tasks: BackgroundTasks = None
):
    """
    Receives synthesized session data from the MOSI Interview tool.
    Triggers the bridge service to sync scores and generate PRDs.
    """
    try:
        bridge = MosiBridgeService()
        
        # 0. Sync Stakeholder if provided
        if stakeholder:
            await bridge.sync_stakeholder(stakeholder)
            
        # 1. Sync the session and opportunities to MSME database
        result = await bridge.sync_discovery_data(session_data, opportunities, evidence)
        
        # 2. Trigger CEED score re-calculation in background
        if background_tasks:
            background_tasks.add_task(bridge.recalculate_ceed_scores, str(session_data.company_id))
            
            # 3. Trigger PRD generation for high-intensity opportunities
            for opp in opportunities:
                if opp.assessment_matrix.intensity >= 4 and opp.actively_seeking:
                    background_tasks.add_task(bridge.trigger_prd_generation, str(opp.id))
        
        return {
            "status": "success",
            "message": "Discovery data received and integrated",
            "session_id": str(session_data.id),
            "opportunities_synced": len(opportunities)
        }
    except Exception as e:
        print(f"❌ MOSI Integration Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stakeholders/{company_id}")
async def get_mosi_stakeholders(company_id: str):
    """
    Retrieves the synchronized stakeholder registry for a company.
    """
    try:
        bridge = MosiBridgeService()
        return await bridge.get_stakeholders(company_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/feed/{company_id}")
async def get_intelligence_feed(company_id: str):
    """
    Consolidated strategic intelligence feed for the CEED Dashboard.
    Aggregates Discovery (MOSI), Strategy (Interests), and Build (PRDs) events.
    """
    supabase = get_supabase()
    
    # 1. Fetch latest MOSI Sessions
    sessions_res = supabase.table('mosi_sessions').select('*, mosi_opportunities(*)').eq('company_id', company_id).order('created_at', desc=True).limit(3).execute()
    
    # 2. Fetch latest Company Interests
    interests_res = supabase.table('company_automation_interests').select('*, sector_automation_needs(title)').eq('company_id', company_id).order('context_added_at', desc=True).limit(3).execute()
    
    # 3. Fetch latest Published PRDs
    prds_res = supabase.table('buildforx_prds').select('title, prd_code, created_at').eq('company_id', company_id).eq('status', 'published').order('created_at', desc=True).limit(3).execute()
    
    feed = []
    
    # Format Discoveries
    for s in sessions_res.data:
        feed.append({
            "id": f"disc-{s['id']}",
            "type": "discovery",
            "title": "New Discovery Internalized",
            "description": f"Stakeholder interview completed. {len(s.get('mosi_opportunities', []))} tactical gaps identified.",
            "timestamp": s['created_at'],
            "intensity": 4, # Mock/Calculated
            "metadata": {"session_id": s['id']}
        })
        
    # Format Interests
    for i in interests_res.data:
        feed.append({
            "id": f"int-{i['id']}",
            "type": "context",
            "title": "Strategy Shift: Needs Mapping",
            "description": f"Company added specific context for '{i['sector_automation_needs']['title']}' blueprint.",
            "timestamp": i['context_added_at'],
            "intensity": 3,
            "metadata": {"interest_id": i['id']}
        })
        
    # Format PRDs
    for p in prds_res.data:
        feed.append({
            "id": f"prd-{p['prd_code']}",
            "type": "build",
            "title": "BuildForX: Challenge Live",
            "description": f"New professional challenge published: {p['title']}.",
            "timestamp": p['created_at'],
            "intensity": 5,
            "metadata": {"prd_code": p['prd_code']}
        })
        
    # Sort and return latest 10
    feed.sort(key=lambda x: x['timestamp'], reverse=True)
    return feed[:10]
