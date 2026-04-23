from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime

class MosiStakeholder(BaseModel):
    id: Optional[UUID] = None
    company_id: Optional[UUID] = None
    user_id: Optional[UUID] = None
    name: str
    role: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    company_name: Optional[str] = None
    sector: Optional[str] = None
    employees: Optional[str] = None
    revenue: Optional[str] = None
    geography: Optional[str] = None
    domain: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None
    created_at: Optional[datetime] = None

class TranscriptParagraph(BaseModel):
    id: str
    text: str
    speaker: str
    timestamp: float
    status: str = "Pending"
    comment: Optional[str] = None

class MosiSession(BaseModel):
    id: Optional[UUID] = None
    stakeholder_id: UUID
    user_id: Optional[UUID] = None
    company_id: Optional[UUID] = None
    status: str = "Review"
    date: Optional[str] = None
    duration: int = 0
    audio_settings: Dict[str, bool] = {"audio": True, "video": True}
    summary: Optional[str] = None
    transcript: List[TranscriptParagraph] = []
    recording_url: Optional[str] = None
    created_at: Optional[datetime] = None

class AssessmentMatrix(BaseModel):
    clarity: int = 2
    awareness: int = 2
    attempts: int = 2
    intensity: int = 2

class MosiOpportunity(BaseModel):
    id: Optional[UUID] = None
    session_id: UUID
    timestamp: int
    title: str
    description: Optional[str] = None
    tag: str # Core, Efficiency, Expansion, Disrupt
    problem_clarity: int = 2
    budget_score: int = 2
    is_paid: bool = False
    reward_amount: Optional[str] = None
    working_hours: Optional[int] = None
    duration_commitment: Optional[str] = None
    origin: str = "Customer"
    actively_seeking: bool = True
    skillset: List[str] = []
    toolset: List[str] = []
    mindset: List[str] = []
    assessment_matrix: AssessmentMatrix = AssessmentMatrix()
    notes: Optional[str] = None
    status: str = "Pending"
    comment: Optional[str] = None

class MosiEvidence(BaseModel):
    id: Optional[UUID] = None
    session_id: UUID
    opportunity_id: Optional[UUID] = None
    type: str
    url: str
    title: Optional[str] = None
    timestamp: Optional[int] = None

class UnifiedOpportunity(BaseModel):
    id: Optional[UUID] = None
    session_id: Optional[UUID] = None
    company_id: Optional[UUID] = None
    title: str
    description: Optional[str] = None
    ceed_tag: str
    problem_clarity: int = 2
    budget_availability: int = 2
    is_paid_project: bool = False
    budget_amount: float = 0.0
    working_hours_defined: int = 0
    owner_origin: str = "customer"
    customer_actively_seeking: bool = True
    skillset: List[str] = []
    toolset: List[str] = []
    mindset: List[str] = []
    duration_weeks: int = 4
    sync_status: str = "synced"
