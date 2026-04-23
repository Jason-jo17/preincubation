from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.services.supabase_service import get_supabase
from app.models.company import Company, CompanyCreate

router = APIRouter()

@router.get("/", response_model=List[dict])
async def list_companies(
    sector_id: Optional[str] = None,
    stage: Optional[str] = None,
    rag_score: Optional[str] = None,
    limit: int = Query(50, le=100),
    offset: int = 0
):
    """List companies with filters"""
    supabase = get_supabase()
    
    query = supabase.table("companies").select("*")
    
    if sector_id:
        query = query.eq("primary_sector_id", sector_id)
    if stage:
        query = query.eq("stage", stage)
    
    result = query.range(offset, offset + limit - 1).execute()
    return result.data

@router.get("/{company_id}", response_model=dict)
async def get_company(company_id: str):
    """Get company details with financials and latest gap analysis"""
    supabase = get_supabase()
    
    result = supabase.table("companies").select(
        "*, company_financials(*), company_leadership(*), gap_analysis(*)"
    ).eq("id", company_id).single().execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    return result.data

@router.post("/", response_model=dict)
async def create_company(company: CompanyCreate):
    """Create new company"""
    supabase = get_supabase()
    
    result = supabase.table("companies").insert(company.dict()).execute()
    return result.data[0]

@router.put("/{company_id}", response_model=dict)
async def update_company(company_id: str, company: CompanyCreate):
    """Update company details"""
    supabase = get_supabase()
    
    result = supabase.table("companies").update(company.dict()).eq("id", company_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    return result.data[0]
