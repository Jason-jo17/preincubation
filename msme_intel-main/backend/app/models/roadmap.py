from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class RoadmapPhase(BaseModel):
    phase_number: int
    phase_name: str
    objectives: List[str]
    initiatives: List[Dict[str, Any]]
    milestones: List[str]
    success_metrics: List[str]

class GTMStrategy(BaseModel):
    target_segments: List[str]
    distribution_channels: List[str]
    pricing_strategy: str
    marketing_tactics: List[str]

class ResourceRequirements(BaseModel):
    budget_inr_lakhs: float
    team: List[Dict[str, str]]
    technology: List[str]

class ExpectedOutcomes(BaseModel):
    metrics: Dict[str, Any]
    success_criteria: List[str]

class RoadmapBase(BaseModel):
    company_id: str
    gap_analysis_id: Optional[str] = None
    title: str
    executive_summary: str
    frameworks: List[str]
    phases: List[RoadmapPhase]
    gtm_strategy: GTMStrategy
    resource_requirements: ResourceRequirements
    expected_outcomes: ExpectedOutcomes

class RoadmapCreate(RoadmapBase):
    pass

class Roadmap(RoadmapBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
