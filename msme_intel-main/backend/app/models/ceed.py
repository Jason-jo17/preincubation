from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class CEEDQuadrantAssessment(BaseModel):
    score: int
    sub_scores: Dict[str, int]
    evidence: List[str]
    gaps: List[str]
    opportunities: List[str]
    automation_opportunities: Optional[List[Dict[str, Any]]] = None
    disruptive_opportunities: Optional[List[Dict[str, Any]]] = None

class CEEDAnalysisBase(BaseModel):
    company_id: str
    sector_id: str
    core_score: int
    expansion_score: int
    efficiency_score: int
    disruption_score: int
    primary_quadrant: str
    secondary_quadrant: Optional[str] = None
    core_assessment: Dict[str, Any]
    expansion_assessment: Dict[str, Any]
    efficiency_assessment: Dict[str, Any]
    disruption_assessment: Dict[str, Any]
    automation_readiness_score: int
    automation_priority_level: str
    estimated_automation_roi: float
    confidence_score: float

class CEEDAnalysisCreate(CEEDAnalysisBase):
    pass

class CEEDAnalysis(CEEDAnalysisBase):
    id: str
    analyzed_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True
