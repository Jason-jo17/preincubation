from typing import List, Optional, Dict
from pydantic import BaseModel, Field
from datetime import date

# ============================================================================
# CITATION MODELS
# ============================================================================

class Citation(BaseModel):
    id: str = Field(default_factory=lambda: "cit_" + uuid.uuid4().hex[:8])
    citation_key: str
    citation_number: int
    source_type: str = Field(..., description="'report', 'news', 'government', 'academic', 'industry'")
    source_name: str
    author: Optional[str] = None
    publication_year: int
    publication_date: Optional[str] = None
    title: str
    url: str
    reliability_score: int
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = []
    geographic_focus: Optional[List[str]] = []

# ============================================================================
# SECTOR THESIS MODELS
# ============================================================================

class MarketStats(BaseModel):
    current_size: float
    current_size_display: str
    forecast_size: float
    forecast_size_display: str
    cagr: float
    forecast_year: int
    currency: str

class MarketStructure(BaseModel):
    total_companies: int
    msme_percentage: float
    organized_split: Dict[str, float]  # {"organized": 60, "unorganized": 40}
    geographic_distribution: Dict[str, float]

class SubSector(BaseModel):
    name: str
    description: str
    market_size: float
    cagr: float
    growth_drivers: List[str]
    key_players: List[str]
    msme_opportunity_score: int
    citation_ids: Optional[List[str]] = []

class GrowthDriver(BaseModel):
    name: str
    type: str # 'policy' | 'market' | 'technology' | 'demand_side'
    impact_level: str # 'high' | 'medium' | 'low'
    description: str
    estimated_impact_percentage: Optional[float] = None
    citation_ids: Optional[List[str]] = []

class Opportunity(BaseModel):
    title: str
    type: str # 'manufacturing' | 'service' | 'trading'
    description: str
    market_size_estimate: float
    overall_score: float # 1-10
    capital_requirement: str
    time_to_market_months: int
    citation_ids: Optional[List[str]] = []

class Policy(BaseModel):
    name: str
    type: str
    description: str
    impact: str # 'High' | 'Medium' | 'Low'
    status: str # 'active' | 'expired' | 'upcoming'
    citation_ids: Optional[List[str]] = []

class Risk(BaseModel):
    name: str
    category: str # 'policy' | 'market' | 'technology' | 'financial'
    severity: str # 'high' | 'medium' | 'low'
    probability: float # 0-1
    description: str
    mitigation: Optional[List[str]] = []
    citation_ids: Optional[List[str]] = []

class Competitor(BaseModel):
    name: str
    type: str # 'startup' | 'listed' | 'private_sector' | 'psu'
    revenue: float
    market_share: float
    key_strengths: List[str]
    citation_ids: Optional[List[str]] = []

class MarketStatsHistory(BaseModel):
    year: int
    market_size: float
    growth_rate: float
    citation_ids: Optional[List[str]] = []

class SectorThesis(BaseModel):
    id: str
    display_name: str
    status: str = "draft"
    research_date: str = Field(default_factory=lambda: date.today().isoformat())

    # Content
    executive_summary: str
    investment_thesis: str
    key_findings: List[str]

    # Sections
    market_stats: MarketStats
    market_structure: MarketStructure
    market_segments: List[str] = []
    sub_sectors: List[SubSector]
    growth_drivers: List[GrowthDriver]
    opportunities: List[Opportunity]
    policies: List[Policy]
    risks: List[Risk]
    competitors: List[Competitor]
    market_stats_history: List[MarketStatsHistory] = []
    
    # Citations
    citations: Optional[List[Citation]] = []

import uuid
