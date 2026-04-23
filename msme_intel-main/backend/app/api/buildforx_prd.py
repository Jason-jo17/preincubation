# backend/app/api/buildforx_prd.py

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.prd import BuildForXPRD, PRDCreate
from ..services.prd_generator import PRDGeneratorAgent
from ..services.supabase_service import get_supabase

router = APIRouter(prefix="/prd", tags=["BuildForX PRDs"])

@router.post("/generate/{interest_id}")
async def generate_prd(interest_id: str):
    """
    Generate a PRD from approved company automation interest.
    Uses AI to create comprehensive PRD.
    """
    try:
        generator = PRDGeneratorAgent()
        return await generator.generate_prd(interest_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/published", response_model=List[BuildForXPRD])
async def list_published_prds():
    """
    List all PRDs that are open for student submissions.
    """
    supabase = get_supabase()
    res = supabase.table('buildforx_prds').select('*, companies(name), sectors(name)').eq('status', 'published').order('created_at', desc=True).execute()
    return res.data

@router.get("/")
async def list_prds(
    status: Optional[str] = None,
    sector_id: Optional[str] = None,
    competition_type: Optional[str] = None,
    program_id: Optional[str] = None
):
    """List PRDs with filters."""
    supabase = get_supabase()
    query = supabase.table('buildforx_prds').select('*, companies(name), sectors(name)')
    
    if status:
        query = query.eq('status', status)
    if sector_id:
        query = query.eq('sector_id', sector_id)
    if competition_type:
        query = query.eq('competition_type', competition_type)
    if program_id:
        query = query.eq('program_id', program_id)
        
    res = query.order('created_at', desc=True).execute()
    return res.data

@router.get("/{prd_id}")
async def get_prd(prd_id: str):
    """Get detailed PRD."""
    supabase = get_supabase()
    res = supabase.table('buildforx_prds').select('*, companies(name), sectors(name)').eq('id', prd_id).single().execute()
    return res.data

@router.put("/{prd_id}")
async def update_prd(prd_id: str, prd: PRDCreate):
    """Update PRD (company review or admin edit)."""
    supabase = get_supabase()
    data = prd.dict(exclude_unset=True)
    res = supabase.table('buildforx_prds').update(data).eq('id', prd_id).execute()
    return res.data[0]

@router.post("/{prd_id}/publish")
async def publish_prd(prd_id: str):
    """Publish PRD for student submissions."""
    supabase = get_supabase()
    res = supabase.table('buildforx_prds').update({'status': 'published'}).eq('id', prd_id).execute()
    return res.data[0]
