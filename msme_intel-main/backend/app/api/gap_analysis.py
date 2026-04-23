from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from app.agents.gap_analysis_agent import GapAnalysisAgent
from app.services.supabase_service import get_supabase

router = APIRouter()
agent = GapAnalysisAgent()

@router.post("/{company_id}/gap-analysis")
@router.post("/{company_id}/gap-analysis/run")
async def trigger_gap_analysis(company_id: str):
    """Run AI gap analysis on a company and store results"""
    supabase = get_supabase()
    
    company_res = supabase.table("companies").select(
        "*, company_financials(*), company_leadership(*)"
    ).eq("id", company_id).single().execute()
    
    if not company_res.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    try:
        analysis = agent.analyze_company_normalized(company_res.data)
        analysis["company_id"] = company_id
        result = supabase.table("gap_analysis").insert(analysis).execute()
        return result.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/{company_id}/gap-analysis")
async def get_latest_gap_analysis(company_id: str):
    """Get most recent gap analysis for a company"""
    supabase = get_supabase()
    result = supabase.table("gap_analysis").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True) \
        .limit(1).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="No analysis found. Run analysis first.")
    return result.data[0]

@router.get("/{company_id}/gap-analysis/history")
async def get_gap_analysis_history(company_id: str):
    """Get all gap analyses for a company"""
    supabase = get_supabase()
    result = supabase.table("gap_analysis").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).execute()
    return result.data
