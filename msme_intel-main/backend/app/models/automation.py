from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class SectorAutomationNeedBase(BaseModel):
    sector_id: str
    regional_context_id: Optional[str] = None
    title: str
    slug: str
    description: Optional[str] = None
    automation_type: str # process_automation, predictive_analytics, etc.
    ceed_quadrant: str # core, expansion, efficiency, disruption
    impact_level: str # transformative, high, medium, incremental
    estimated_roi_percentage: Optional[int] = 0
    implementation_complexity: Optional[str] = "medium"
    time_to_value_weeks: Optional[int] = 0
    target_company_size: Optional[List[str]] = []
    target_employee_range: Optional[str] = None
    target_revenue_range: Optional[str] = None
    prerequisite_tech_maturity: Optional[str] = None
    tech_stack_suggested: Optional[Dict[str, Any]] = {}
    data_requirements: Optional[Dict[str, Any]] = {}
    research_citations: Optional[List[Dict[str, Any]]] = []
    industry_benchmarks: Optional[Dict[str, Any]] = {}
    status: Optional[str] = "draft"
    is_featured: Optional[bool] = False
    priority_rank: Optional[int] = 0
    tags: Optional[List[str]] = []

class SectorAutomationNeed(SectorAutomationNeedBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AutomationInterestCreate(BaseModel):
    current_pain_points: List[str]
    current_process_description: str
    desired_outcomes: List[str]
    budget_range: Optional[str] = None
    timeline_preference: Optional[str] = None
    existing_systems: Optional[Dict[str, Any]] = {}
    data_availability: Optional[Dict[str, Any]] = {}
    constraints: Optional[List[str]] = []
    success_metrics: Optional[Dict[str, Any]] = {}
    poc_name: str
    poc_email: str
    poc_phone: Optional[str] = None
    poc_designation: Optional[str] = None
    additional_context: Optional[str] = None

class CompanyAutomationInterest(BaseModel):
    id: str
    company_id: str
    automation_need_id: str
    status: str
    current_pain_points: List[str]
    current_process_description: str
    desired_outcomes: List[str]
    budget_range: Optional[str] = None
    timeline_preference: Optional[str] = None
    existing_systems: Optional[Dict[str, Any]] = {}
    data_availability: Optional[Dict[str, Any]] = {}
    constraints: Optional[List[str]] = []
    success_metrics: Optional[Dict[str, Any]] = {}
    poc_name: str
    poc_email: str
    poc_phone: Optional[str] = None
    poc_designation: Optional[str] = None
    additional_context: Optional[str] = None
    ice_approval_status: str
    ice_comments: Optional[str] = None
    interested_at: datetime
    context_added_at: Optional[datetime] = None
    updated_at: datetime

    class Config:
        from_attributes = True
