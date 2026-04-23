from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class StudentSubmissionBase(BaseModel):
    prd_id: str
    student_id: Optional[str] = None
    team_id: Optional[str] = None
    submission_code: str
    title: str
    executive_summary: Optional[str] = None
    solution_approach: Optional[Dict[str, Any]] = {}
    technical_implementation: Optional[Dict[str, Any]] = {}
    demo_links: Optional[Dict[str, Any]] = {}
    repository_links: Optional[Dict[str, Any]] = {}
    deliverables: Optional[List[Dict[str, Any]]] = []
    requirements_coverage: Optional[List[Dict[str, Any]]] = []
    self_assessment: Optional[Dict[str, Any]] = {}
    business_viability: Optional[Dict[str, Any]] = {}
    status: Optional[str] = "submitted"
    preliminary_score: Optional[float] = None
    final_score: Optional[float] = None
    rank: Optional[int] = None

class SubmissionCreate(StudentSubmissionBase):
    pass

class StudentSubmission(StudentSubmissionBase):
    id: str
    submitted_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CompanyEvaluation(BaseModel):
    submission_id: str
    company_id: str
    score_breakdown: Optional[Dict[str, Any]] = {}
    overall_score: Optional[float] = None
    comments: Optional[str] = None
    interest_in_pilot: Optional[bool] = False
    pilot_rationale: Optional[str] = None
    evaluated_by: Optional[str] = None
    evaluated_at: datetime
