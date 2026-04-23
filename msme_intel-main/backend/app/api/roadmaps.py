from fastapi import APIRouter, HTTPException
from app.agents.roadmap_agent import RoadmapAgent
from app.services.supabase_service import get_supabase

router = APIRouter()
agent = RoadmapAgent()

@router.post("/{company_id}/roadmap")
@router.post("/{company_id}/roadmap/generate")
async def generate_roadmap(company_id: str):
    """Generate AI roadmap based on gap analysis results"""
    supabase = get_supabase()
    
    company_res = supabase.table("companies").select("*") \
        .eq("id", company_id).single().execute()
    if not company_res.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    gap_res = supabase.table("gap_analysis").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).limit(1).execute()
    if not gap_res.data:
        raise HTTPException(
            status_code=400,
            detail="No gap analysis found. Run gap analysis before generating roadmap."
        )
    
    try:
        roadmap = agent.generate_roadmap(company_res.data, gap_res.data[0])
        roadmap["company_id"] = company_id
        roadmap["gap_analysis_id"] = gap_res.data[0]["id"]
        
        result = supabase.table("roadmaps").insert({
            "company_id": company_id,
            "gap_analysis_id": gap_res.data[0]["id"],
            "roadmap_data": roadmap
        }).execute()
        
        return {"roadmap_id": result.data[0]["id"], "roadmap": roadmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Roadmap generation failed: {str(e)}")

@router.get("/{company_id}/roadmap")
async def get_latest_roadmap(company_id: str):
    """Get most recent roadmap for a company"""
    supabase = get_supabase()
    result = supabase.table("roadmaps").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).limit(1).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="No roadmap found.")
    return result.data[0]

@router.put("/{roadmap_id}")
async def update_roadmap(roadmap_id: str, roadmap_data: dict):
    """Update an existing roadmap"""
    supabase = get_supabase()
    result = supabase.table("roadmaps").update({"roadmap_data": roadmap_data}) \
        .eq("id", roadmap_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return result.data[0]
