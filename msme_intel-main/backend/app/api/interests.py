# backend/app/api/interests.py

from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Optional, Dict, Any
from ..services.supabase_service import get_supabase
from ..services.prd_generator import PRDGeneratorAgent
from datetime import datetime

router = APIRouter(prefix="/interests", tags=["Company Interests"])

@router.post("/")
async def record_company_interest(interest: Dict[str, Any], background_tasks: BackgroundTasks):
    """
    Record a company's interest in a sector automation need and collect their specific context.
    If context is high-intensity, trigger PRD generation.
    """
    supabase = get_supabase()
    
    # 1. Save to company_automation_interests
    interest_data = {
        "company_id": interest.get("company_id", "ceed-1"),
        "automation_need_id": interest.get("automation_need_id"),
        "current_pain_points": interest.get("current_pain_points", []),
        "desired_outcomes": interest.get("desired_outcomes", []),
        "status": "context_added",
        "context_added_at": datetime.utcnow().isoformat()
    }
    
    res = supabase.table('company_automation_interests').insert(interest_data).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to record interest")
        
    interest_id = res.data[0]['id']
    
    # 2. Heuristic check: Should we auto-generate PRD?
    # For demo, if pain points are provided, we auto-trigger
    if interest.get("current_pain_points"):
        background_tasks.add_task(auto_generate_prd, interest_id)
        
    return res.data[0]

async def auto_generate_prd(interest_id: str):
    """Background task to trigger PRD generation."""
    try:
        generator = PRDGeneratorAgent()
        await generator.generate_prd(interest_id)
        print(f"✅ Auto-generated PRD for interest {interest_id}")
    except Exception as e:
        print(f"❌ Failed to auto-generate PRD: {str(e)}")

@router.get("/company/{company_id}")
async def list_company_interests(company_id: str):
    """List all automation needs a company is interested in."""
    supabase = get_supabase()
    res = supabase.table('company_automation_interests').select('*, sector_automation_needs(title, slug)').eq('company_id', company_id).execute()
    return res.data
