from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class GapAnalysisBase(BaseModel):
    company_id: str
    rag_score: str  # green, amber, red
    overall_potential_score: int
    confidence_level: str  # high, medium, low
    screening_classification: Optional[str] = None # stretched_fit, best_fit, best_bet, rejected
    
    # 6 Verticals
    hr_talent_score: int
    marketing_sales_score: int
    operations_score: int
    finance_score: int
    ip_innovation_score: int
    strategy_score: int
    
    # 9 Dimensions
    access_to_market_score: int
    access_to_finance_score: int
    succession_gap_score: int
    leadership_appetite_score: int
    market_saturation_score: int
    innovation_gap_score: int
    market_breakthrough_score: int
    systems_processes_score: int
    ip_creation_score: int
    
    # Additional scores
    financial_health_score: int
    market_opportunity_score: int
    
    # Insights
    key_strengths: List[str]
    critical_gaps: List[str]
    top_opportunities: List[str]
    priority_actions: List[str]

class GapAnalysisCreate(GapAnalysisBase):
    pass

class GapAnalysis(GapAnalysisBase):
    id: str
    analysis_date: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True
