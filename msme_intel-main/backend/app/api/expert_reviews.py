"""
Expert Roadmap Review API
Routes:
  POST /api/experts/register          → register as expert (admin approves)
  GET  /api/experts                   → list all active experts
  POST /api/roadmaps/{roadmap_id}/request-review    → admin requests expert review
  GET  /api/roadmaps/{roadmap_id}/reviews            → get all reviews for a roadmap
  POST /api/roadmaps/{roadmap_id}/review             → expert submits their review
  PUT  /api/roadmaps/{roadmap_id}/review/{review_id} → expert updates review
  GET  /api/experts/{expert_id}/pending              → expert's pending reviews
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from app.services.supabase_service import get_supabase

router = APIRouter(prefix="/api", tags=["expert-reviews"])

class ExpertRegistration(BaseModel):
    name: str
    email: str
    domains: List[str]
    credentials: str
    linkedin_url: Optional[str] = None
    bio: Optional[str] = None

class PhaseValidation(BaseModel):
    phase_number: int
    is_validated: bool
    comment: Optional[str] = None
    suggested_changes: List[str] = []

class ExpertAddition(BaseModel):
    type: str  # 'milestone' | 'initiative' | 'resource' | 'risk' | 'kpi'
    phase_number: Optional[int] = None  # null = applies to whole roadmap
    content: Dict[str, Any]
    rationale: str

class ExpertReviewSubmission(BaseModel):
    phase_validations: List[PhaseValidation]
    expert_additions: List[ExpertAddition] = []
    overall_verdict: str  # 'approved' | 'approved_with_changes' | 'needs_revision'
    overall_comment: str
    confidence_score: int  # 1-10

@router.post("/experts/register")
async def register_expert(reg: ExpertRegistration):
    sb = get_supabase()
    result = sb.table("expert_profiles").insert({
        "name": reg.name,
        "email": reg.email,
        "domains": reg.domains,
        "credentials": reg.credentials,
        "linkedin_url": reg.linkedin_url,
        "bio": reg.bio,
        "is_active": False,  # Admin must approve
        "user_id": reg.email,  # Use email as user_id until full auth
    }).execute()
    return {"message": "Registration submitted — pending admin approval", "id": result.data[0]["id"]}

@router.get("/experts")
async def list_experts(domain: Optional[str] = None):
    sb = get_supabase()
    query = sb.table("expert_profiles").select("*").eq("is_active", True)
    if domain:
        query = query.contains("domains", [domain])
    return query.execute().data or []

@router.post("/roadmaps/{roadmap_id}/request-review")
async def request_expert_review(roadmap_id: str, expert_id: str):
    """Admin assigns a roadmap to an expert for review."""
    sb = get_supabase()
    
    roadmap = sb.table("company_roadmaps").select("company_id").eq("id", roadmap_id).single().execute()
    if not roadmap.data:
        raise HTTPException(404, "Roadmap not found")
    
    result = sb.table("roadmap_expert_reviews").insert({
        "roadmap_id": roadmap_id,
        "expert_id": expert_id,
        "company_id": roadmap.data["company_id"],
        "status": "pending",
    }).execute()
    
    return {"review_id": result.data[0]["id"], "status": "pending"}

@router.get("/roadmaps/{roadmap_id}/reviews")
async def get_roadmap_reviews(roadmap_id: str):
    sb = get_supabase()
    reviews = sb.table("roadmap_expert_reviews").select(
        "*, expert_profiles(name, credentials, domains, linkedin_url)"
    ).eq("roadmap_id", roadmap_id).execute()
    return reviews.data or []

@router.post("/roadmaps/{roadmap_id}/review")
async def submit_expert_review(roadmap_id: str, expert_id: str, review: ExpertReviewSubmission):
    """Expert submits their validation of a roadmap."""
    sb = get_supabase()
    
    # Find the pending review assignment
    assignment = sb.table("roadmap_expert_reviews").select("id").eq(
        "roadmap_id", roadmap_id).eq("expert_id", expert_id).single().execute()
    
    if not assignment.data:
        raise HTTPException(404, "No review assignment found for this expert")
    
    result = sb.table("roadmap_expert_reviews").update({
        "status": "complete",
        "phase_validations": [pv.dict() for pv in review.phase_validations],
        "expert_additions": [ea.dict() for ea in review.expert_additions],
        "overall_verdict": review.overall_verdict,
        "overall_comment": review.overall_comment,
        "confidence_score": review.confidence_score,
        "reviewed_at": datetime.now(timezone.utc).isoformat(),
    }).eq("id", assignment.data["id"]).execute()
    
    # If approved: merge expert additions into the roadmap
    if review.overall_verdict in ["approved", "approved_with_changes"] and review.expert_additions:
        await _merge_expert_additions(roadmap_id, review.expert_additions)
    
    return {"message": "Review submitted", "verdict": review.overall_verdict}

async def _merge_expert_additions(roadmap_id: str, additions: List[ExpertAddition]):
    """Merge expert additions into the roadmap phases."""
    sb = get_supabase()
    roadmap = sb.table("company_roadmaps").select("phases").eq("id", roadmap_id).single().execute()
    
    if not roadmap.data:
        return
    
    phases = roadmap.data.get("phases", [])
    
    for addition in additions:
        if addition.phase_number and addition.phase_number <= len(phases):
            phase = phases[addition.phase_number - 1]
            if addition.type == "milestone":
                phase.setdefault("milestones", []).append(
                    f"[Expert] {addition.content.get('title', addition.rationale)}")
            elif addition.type == "initiative":
                phase.setdefault("initiatives", []).append({
                    **addition.content,
                    "source": "expert",
                    "rationale": addition.rationale
                })
            elif addition.type == "risk":
                phase.setdefault("risks", []).append(addition.content)
    
    sb.table("company_roadmaps").update({"phases": phases}).eq("id", roadmap_id).execute()

@router.get("/experts/{expert_id}/pending")
async def get_expert_pending_reviews(expert_id: str):
    sb = get_supabase()
    reviews = sb.table("roadmap_expert_reviews").select(
        "*, company_roadmaps(title, executive_summary), companies(name, district, state)"
    ).eq("expert_id", expert_id).eq("status", "pending").execute()
    return reviews.data or []
