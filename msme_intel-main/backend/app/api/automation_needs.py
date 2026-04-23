# backend/app/api/automation_needs.py

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.automation import (
    SectorAutomationNeed,
    CompanyAutomationInterest,
    AutomationInterestCreate
)
from ..services.supabase_service import get_supabase

router = APIRouter(prefix="/automation", tags=["Automation Needs"])

@router.get("/sectors/{sector_id}/needs")
async def get_sector_automation_needs(
    sector_id: str,
    ceed_quadrant: Optional[str] = None,
    automation_type: Optional[str] = None,
    status: str = "published"
):
    """
    Get automation needs for a sector, optionally filtered.
    """
    supabase = get_supabase()
    query = supabase.table('sector_automation_needs').select('*').eq('sector_id', sector_id).eq('status', status)
    
    if ceed_quadrant:
        query = query.eq('ceed_quadrant', ceed_quadrant)
    if automation_type:
        query = query.eq('automation_type', automation_type)
        
    res = query.order('priority_rank', asc=True).execute()
    return res.data

@router.get("/needs/{need_id}")
async def get_automation_need_detail(need_id: str):
    """Get detailed automation need with research citations."""
    supabase = get_supabase()
    res = supabase.table('sector_automation_needs').select('*').eq('id', need_id).single().execute()
    return res.data

@router.post("/needs/{need_id}/interest")
async def express_interest(
    need_id: str,
    company_id: str
):
    """Company expresses interest in an automation need."""
    supabase = get_supabase()
    data = {
        'company_id': company_id,
        'automation_need_id': need_id,
        'status': 'interested'
    }
    res = supabase.table('company_automation_interests').insert(data).execute()
    return res.data[0]

@router.put("/interest/{interest_id}/context")
async def add_company_context(
    interest_id: str,
    context: AutomationInterestCreate
):
    """Company adds their specific context to automation interest."""
    supabase = get_supabase()
    data = context.dict()
    data['status'] = 'context_added'
    data['context_added_at'] = 'now()'
    
    res = supabase.table('company_automation_interests').update(data).eq('id', interest_id).execute()
    return res.data[0]

@router.post("/interest/{interest_id}/approve")
async def ice_approve_interest(
    interest_id: str,
    approved: bool,
    comments: Optional[str] = None
):
    """ICE approves or rejects the automation interest."""
    supabase = get_supabase()
    status = 'approved' if approved else 'rejected'
    data = {
        'ice_approval_status': 'approved' if approved else 'rejected',
        'ice_comments': comments,
        'status': status
    }
    res = supabase.table('company_automation_interests').update(data).eq('id', interest_id).execute()
    return res.data[0]
