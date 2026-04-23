from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class BuildForXPRDBase(BaseModel):
    company_automation_interest_id: str
    company_id: str
    automation_need_id: str
    sector_id: str
    prd_code: str
    title: str
    slug: str
    executive_summary: Optional[str] = None
    problem_statement: Optional[Dict[str, Any]] = {}
    objectives: Optional[List[Dict[str, Any]]] = []
    scope: Optional[Dict[str, Any]] = {}
    functional_requirements: Optional[List[Dict[str, Any]]] = []
    non_functional_requirements: Optional[List[Dict[str, Any]]] = []
    technical_specifications: Optional[Dict[str, Any]] = {}
    user_stories: Optional[List[Dict[str, Any]]] = []
    success_metrics: Optional[Dict[str, Any]] = {}
    timeline_milestones: Optional[List[Dict[str, Any]]] = []
    evaluation_criteria: Optional[Dict[str, Any]] = {}
    resources_provided: Optional[Dict[str, Any]] = {}
    constraints_guidelines: Optional[Dict[str, Any]] = {}
    competition_type: Optional[str] = "makeathon"
    trl_level_expected: Optional[str] = "TRL 3-4"
    prize_pool: Optional[Dict[str, Any]] = {}
    program_id: Optional[str] = None
    status: Optional[str] = "draft"
    version: Optional[int] = 1
    submission_deadline: Optional[datetime] = None
    evaluation_start_date: Optional[datetime] = None
    results_announcement_date: Optional[datetime] = None

class PRDCreate(BuildForXPRDBase):
    pass

class BuildForXPRD(BuildForXPRDBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
