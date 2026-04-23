"""
Company Portal API
Routes:
  POST /api/portal/invite          → admin invites company to create account
  POST /api/portal/register        → company user completes registration
  POST /api/portal/login           → company portal login (separate from admin login)
  GET  /api/portal/me              → get current company user profile
  GET  /api/portal/{company_id}/profile   → get company's own profile data
  PUT  /api/portal/{company_id}/profile   → company updates basic info
  POST /api/portal/{company_id}/validate  → company validates a scraped field
  POST /api/portal/{company_id}/dispute   → company submits evidence to dispute data
  GET  /api/portal/{company_id}/disputes  → list all disputes for a company
  POST /api/portal/{company_id}/dispute/{dispute_id}/upload → upload evidence file
"""
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timezone, timedelta
from app.services.supabase_service import get_supabase
import secrets, hashlib, os

router = APIRouter(prefix="/api/portal", tags=["company-portal"])

class InviteRequest(BaseModel):
    company_id: str
    email: EmailStr
    name: str

class RegisterRequest(BaseModel):
    invite_token: str
    password: str
    name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdate(BaseModel):
    # Fields company can self-update (basic info only)
    website: Optional[str] = None
    description: Optional[str] = None
    employee_count: Optional[int] = None
    linkedin_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    # Products/services (self-reported)
    products_services: Optional[List[str]] = None
    certifications: Optional[List[str]] = None
    export_countries: Optional[List[str]] = None
    # Financial (self-reported, marked as unverified)
    annual_turnover_self_reported: Optional[float] = None
    employee_count_self_reported: Optional[int] = None

class ValidateField(BaseModel):
    field_name: str
    tab: str
    confirmed_value: str      # company confirms this value is correct

class DisputeSubmission(BaseModel):
    field_name: str
    tab: str
    disputed_value: str       # what platform shows (wrong)
    correct_value: str        # what company says is correct
    evidence_type: str        # 'document' | 'url' | 'text'
    evidence_url: Optional[str] = None
    evidence_text: Optional[str] = None

@router.post("/invite")
async def invite_company_user(req: InviteRequest):
    """Admin invites a company to create their portal account."""
    sb = get_supabase()
    token = secrets.token_urlsafe(32)
    expires = (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()
    
    sb.table("company_portal_users").insert({
        "company_id": req.company_id,
        "email": req.email,
        "name": req.name,
        "invite_token": token,
        "invite_expires_at": expires,
    }).execute()
    
    # In production: send email with link to /portal/register?token={token}
    return {"message": "Invite sent", "token": token, 
            "register_url": f"/portal/register?token={token}"}

@router.post("/register")
async def register_company_user(req: RegisterRequest):
    sb = get_supabase()
    user = sb.table("company_portal_users").select("*") \
        .eq("invite_token", req.invite_token).single().execute()
    
    if not user.data:
        raise HTTPException(404, "Invalid invite token")
    if user.data["invite_expires_at"] < datetime.now(timezone.utc).isoformat():
        raise HTTPException(400, "Invite token expired")
    
    pwd_hash = hashlib.sha256(req.password.encode()).hexdigest()
    sb.table("company_portal_users").update({
        "password_hash": pwd_hash,
        "name": req.name,
        "is_verified": True,
        "invite_token": None,
    }).eq("id", user.data["id"]).execute()
    
    return {"message": "Registration complete", "company_id": user.data["company_id"]}

@router.post("/login")
async def company_portal_login(req: LoginRequest):
    sb = get_supabase()
    user = sb.table("company_portal_users").select("*") \
        .eq("email", req.email).single().execute()
    
    if not user.data:
        raise HTTPException(401, "Invalid credentials")
    
    pwd_hash = hashlib.sha256(req.password.encode()).hexdigest()
    if user.data["password_hash"] != pwd_hash:
        raise HTTPException(401, "Invalid credentials")
    
    # Update last login
    sb.table("company_portal_users").update({
        "last_login_at": datetime.now(timezone.utc).isoformat()
    }).eq("id", user.data["id"]).execute()
    
    # Return user info — frontend stores in Zustand with role='company_owner'
    return {
        "user": {
            "id": user.data["id"],
            "name": user.data["name"],
            "email": user.data["email"],
            "role": "company_owner",
            "company_id": user.data["company_id"],
        },
        "token": f"portal_{user.data['id']}"  # replace with JWT in production
    }

@router.get("/{company_id}/profile")
async def get_company_profile(company_id: str):
    sb = get_supabase()
    company = sb.table("companies").select("*").eq("id", company_id).single().execute()
    if not company.data:
        raise HTTPException(404, "Company not found")
    
    verifications = sb.table("company_field_verifications").select("*") \
        .eq("company_id", company_id).execute()
    
    return {
        "company": company.data,
        "field_verifications": verifications.data or [],
    }

@router.put("/{company_id}/profile")
async def update_company_profile(company_id: str, updates: ProfileUpdate):
    """Company updates their own basic profile fields."""
    sb = get_supabase()
    
    update_data = {k: v for k, v in updates.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(400, "No fields to update")
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    # Mark self-reported fields explicitly
    if "annual_turnover_self_reported" in update_data:
        update_data["turnover_source"] = "self_reported"
    if "employee_count_self_reported" in update_data:
        update_data["employee_count_source"] = "self_reported"
    
    sb.table("companies").update(update_data).eq("id", company_id).execute()
    
    # Log in field verifications as self-reported
    for field, value in update_data.items():
        if field in ["updated_at"]:
            continue
        sb.table("company_field_verifications").upsert({
            "company_id": company_id,
            "field_name": field,
            "field_value": str(value),
            "tab": "overview",
            "source": "company_self_reported",
            "status": "pending",  # analyst must confirm self-reported data
        }, on_conflict="company_id,field_name").execute()
    
    return {"message": "Profile updated", "status": "pending_verification"}

@router.post("/{company_id}/validate")
async def company_validates_field(company_id: str, validation: ValidateField):
    """Company confirms a scraped field value is correct."""
    sb = get_supabase()
    sb.table("company_field_verifications").upsert({
        "company_id": company_id,
        "field_name": validation.field_name,
        "field_value": validation.confirmed_value,
        "tab": validation.tab,
        "source": "company_confirmed",
        "status": "verified",
        "verified_at": datetime.now(timezone.utc).isoformat(),
        "note": "Confirmed by company portal user",
    }, on_conflict="company_id,field_name").execute()
    
    return {"message": "Field confirmed as correct"}

@router.post("/{company_id}/dispute")
async def submit_data_dispute(company_id: str, dispute: DisputeSubmission):
    """Company disputes incorrect scraped data and provides evidence."""
    sb = get_supabase()
    result = sb.table("company_data_disputes").insert({
        "company_id": company_id,
        "field_name": dispute.field_name,
        "tab": dispute.tab,
        "disputed_value": dispute.disputed_value,
        "correct_value": dispute.correct_value,
        "evidence_type": dispute.evidence_type,
        "evidence_url": dispute.evidence_url,
        "evidence_text": dispute.evidence_text,
        "status": "pending",
    }).execute()
    
    return {"message": "Dispute submitted", "dispute_id": result.data[0]["id"],
            "status": "pending", "note": "Our team will review within 48 hours"}

@router.post("/{company_id}/dispute/{dispute_id}/upload")
async def upload_evidence_file(company_id: str, dispute_id: str, file: UploadFile = File(...)):
    """Upload a supporting document for a dispute."""
    sb = get_supabase()
    
    # Upload to Supabase Storage
    file_content = await file.read()
    file_path = f"disputes/{company_id}/{dispute_id}/{file.filename}"
    
    sb.storage.from_("evidence-files").upload(file_path, file_content)
    
    # Update dispute record
    sb.table("company_data_disputes").update({
        "evidence_file_path": file_path,
        "evidence_type": "document"
    }).eq("id", dispute_id).execute()
    
    return {"message": "Evidence uploaded", "file_path": file_path}

@router.get("/{company_id}/disputes")
async def get_company_disputes(company_id: str):
    sb = get_supabase()
    disputes = sb.table("company_data_disputes").select("*") \
        .eq("company_id", company_id).order("created_at", desc=True).execute()
    return disputes.data or []
