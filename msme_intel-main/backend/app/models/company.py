from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class CompanyBase(BaseModel):
    name: str
    primary_sector_id: Optional[str] = None
    stage: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    founded_year: Optional[int] = None
    employee_count: Optional[int] = None
    headquarters_location: Optional[str] = None
    funnel_stage: Optional[str] = "lead" # lead, screened, financial_review, gap_analysis, roadmap

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class CompanyFinancials(BaseModel):
    id: str
    company_id: str
    fiscal_year: int
    revenue_inr_lakhs: Optional[float] = None
    profit_inr_lakhs: Optional[float] = None
    funding_raised_inr_lakhs: Optional[float] = None
    valuation_inr_cr: Optional[float] = None
    cagr: Optional[float] = None
    ebitda_margin: Optional[float] = None
    net_profit_margin: Optional[float] = None
    balance_sheet_summary: Optional[Dict[str, Any]] = None # { "assets": ..., "liabilities": ..., "equity": ... }
    created_at: datetime

class CompanyLeadership(BaseModel):
    id: str
    company_id: str
    name: str
    role: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    created_at: datetime
