from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class SectorThesisBase(BaseModel):
    title: str
    content: str
    sector_id: str
    version: Optional[int] = 1

class SectorThesis(SectorThesisBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ThesisAnalysisBase(BaseModel):
    company_id: str
    thesis_id: str
    alignment_score: Optional[int] = None
    proof_points: Optional[str] = None
    source_data: Optional[str] = "manual" # traxn, mca, website, manual
    status: Optional[str] = "pending" # analyzed, pending, failed

class ThesisAnalysisCreate(ThesisAnalysisBase):
    pass

class ThesisAnalysis(ThesisAnalysisBase):
    id: str
    analysis_date: datetime
    
    class Config:
        from_attributes = True
