# backend/app/api/ceed_analysis.py

from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from ..models.ceed import CEEDAnalysis, CEEDAnalysisCreate
from ..services.ceed_engine import CEEDAnalysisEngine
from ..services.supabase_service import get_supabase

router = APIRouter(prefix="/ceed", tags=["CEED Analysis"])

@router.post("/analyze/{company_id}")
async def analyze_company_ceed(
    company_id: str,
    force_refresh: bool = False
):
    """
    Analyze a company using the CEED framework.
    Returns quadrant scores and automation readiness.
    """
    try:
        engine = CEEDAnalysisEngine()
        return await engine.analyze_company(company_id, force_refresh)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/companies")
async def get_companies_by_quadrant(
    quadrant: Optional[str] = None,
    automation_priority: Optional[str] = None,
    sector_id: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    """
    Get companies filtered by CEED quadrant and automation priority.
    """
    supabase = get_supabase()
    query = supabase.table('ceed_analysis').select('*, companies(name, description, stage)')
    
    if quadrant:
        query = query.eq('primary_quadrant', quadrant)
    if automation_priority:
        query = query.eq('automation_priority_level', automation_priority)
    if sector_id:
        query = query.eq('sector_id', sector_id)
        
    res = query.order('analyzed_at', desc=True).limit(limit).execute()
    return res.data

@router.get("/quadrant-distribution/{sector_id}")
async def get_sector_quadrant_distribution(sector_id: str):
    """
    Get distribution of companies across CEED quadrants for a sector.
    """
    supabase = get_supabase()
    res = supabase.rpc('get_sector_quadrant_distribution', {'p_sector_id': sector_id}).execute()
    return res.data
