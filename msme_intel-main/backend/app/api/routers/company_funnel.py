from fastapi import APIRouter, HTTPException, UploadFile, File, BackgroundTasks, Query
from typing import List, Optional
import pandas as pd
from pydantic import BaseModel
import io
import json
import os
import datetime
from app.services.supabase_service import get_supabase
from app.utils.mca_integration import fetch_mca_data
from app.config import settings

router = APIRouter(prefix="/api/company-funnel", tags=["Company Funnel"])

# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class CompanyUpload(BaseModel):
    name: str
    sector: str
    sub_sector: Optional[str] = None
    cin: Optional[str] = None
    website: Optional[str] = None
    employee_count: Optional[int] = None
    founded_year: Optional[int] = None
    headquarters_city: Optional[str] = None
    headquarters_state: Optional[str] = None

class ThesisScoreResponse(BaseModel):
    company_id: str
    overall_score: float
    market_alignment_score: float
    growth_potential_score: float
    policy_advantage_score: float
    competitive_position_score: float
    innovation_readiness_score: float
    scoring_rationale: dict
    matched_opportunities: List[str]
    key_strengths: List[str]
    key_gaps: List[str]
    immediate_actions: List[str]

class FinancialData(BaseModel):
    fiscal_year: str
    revenue: float
    gross_profit: Optional[float] = None
    net_profit: Optional[float] = None
    total_assets: Optional[float] = None
    total_liabilities: Optional[float] = None
    data_source: str = 'manual'

class RAGClassification(BaseModel):
    rag_status: str  # red, amber, green
    rag_category: str  # stretched_fit, best_fit, best_bet
    confidence_score: float
    classification_reasoning: str
    recommendation: str

class GapAnalysisExtended(BaseModel):
    market_saturation_score: float
    founder_quality_score: float
    leadership_quality_score: float
    innovation_differentiator_score: float
    talent_pool_score: float
    brand_identity_score: float
    critical_gaps: List[str]
    strengths: List[str]
    addressable_opportunity: float

class RoadmapWithROI(BaseModel):
    total_investment_required: float
    expected_revenue_increase: float
    roi_percentage: float
    payback_period_months: int
    milestones: List[dict]
    engagement_model: str

# ============================================================================
# STAGE 1: UPLOAD COMPANIES
# ============================================================================

@router.post("/upload/csv")
async def upload_companies_csv(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None
):
    """
    Upload companies via CSV
    """
    supabase = get_supabase()
    # Read CSV
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    
    companies_created = []
    
    for _, row in df.iterrows():
        # Insert company
        company_data = {
            "name": row['name'],
            "primary_sector_id": None, # Needs resolution or use sector name directly if schema allows
            # "sector": row['sector'], # Schema uses primary_sector_id reference
             # Adapting to schema: assuming we might resolve sector or store temporarily
             # For now, let's assume the user meant 'sector' as a string is handled or we need to find the ID.
             # PROVISIONAL: using existing 'stage' or 'description' to store raw sector if needed, or query ID.
             # Let's try to query sector ID by name.
        }
        
        # Try to find sector ID
        sector_res = supabase.table("sectors").select("id").eq("name", row['sector']).execute()
        sector_id = sector_res.data[0]['id'] if sector_res.data else None
        
        company_insert_data = {
            "name": row['name'],
            "primary_sector_id": sector_id,
            "website": row.get('website'),
            "employee_count": int(row['employee_count']) if pd.notna(row.get('employee_count')) else None,
            "founded_year": int(row['founded_year']) if pd.notna(row.get('founded_year')) else None,
            "headquarters_location": f"{row.get('city', '')}, {row.get('state', '')}",
             # "sub_sector": row.get('sub_sector'), # Not in schema, maybe put in description or extended attrs
        }
        
        company = supabase.table("companies").insert(company_insert_data).execute()
        if not company.data:
            continue
            
        company_id = company.data[0]['id']
        
        # Create funnel stage tracker
        supabase.table("company_funnel_stages").insert({
            "company_id": company_id,
            "current_stage": 1,
            "stage_1_uploaded_at": "NOW()",
            "stage_1_status": "complete"
        }).execute()
        
        # If CIN provided, fetch MCA data
        if 'cin' in row and pd.notna(row.get('cin')):
            if background_tasks:
                background_tasks.add_task(fetch_mca_data, company_id, row['cin'])
        
        companies_created.append(company_id)
    
    return {
        "companies_created": len(companies_created),
        "company_ids": companies_created,
        "message": f"Successfully uploaded {len(companies_created)} companies to Stage 1"
    }

@router.post("/upload/single")
async def upload_single_company(company: CompanyUpload):
    """
    Upload single company manually
    """
    supabase = get_supabase()
    
    # Resolve sector
    sector_res = supabase.table("sectors").select("id").eq("name", company.sector).execute()
    sector_id = sector_res.data[0]['id'] if sector_res.data else None
    
    company_insert_data = {
        "name": company.name,
        "primary_sector_id": sector_id,
        "website": company.website,
        "employee_count": company.employee_count,
        "founded_year": company.founded_year,
        "headquarters_location": f"{company.headquarters_city}, {company.headquarters_state}",
    }

    # Insert company
    result = supabase.table("companies").insert(company_insert_data).execute()
    company_id = result.data[0]['id']
    
    # Create funnel tracker
    supabase.table("company_funnel_stages").insert({
        "company_id": company_id,
        "current_stage": 1,
        "stage_1_uploaded_at": "NOW()",
        "stage_1_status": "complete"
    }).execute()
    
    return {
        "company_id": company_id,
        "message": "Company uploaded successfully"
    }

# ============================================================================
# STAGE 2: THESIS SCORING
# ============================================================================

@router.post("/{company_id}/score-against-thesis")
async def score_company_against_thesis(company_id: str) -> ThesisScoreResponse:
    """
    Score company against sector thesis using Claude
    """
    from anthropic import Anthropic
    supabase = get_supabase()
    
    # Fetch company
    company = supabase.table("companies").select("*, sectors(name)").eq("id", company_id).single().execute()
    sector_name = company.data['sectors']['name'] if company.data.get('sectors') else "Unknown"

    # Fetch relevant sector thesis
    thesis = supabase.table("sector_thesis").select("*").eq(
        "sector_id", company.data['primary_sector_id']
    ).single().execute()
    
    if not thesis.data:
         # Mock or handle missing thesis
         return ThesisScoreResponse(
             company_id=company_id,
             overall_score=0, market_alignment_score=0, growth_potential_score=0,
             policy_advantage_score=0, competitive_position_score=0, innovation_readiness_score=0,
             scoring_rationale={}, matched_opportunities=[], key_strengths=[], key_gaps=[], immediate_actions=[]
         )

    # Fetch sub-sectors and opportunities (Mocked or assumes existing tables)
    # sub_sectors = supabase.table("sub_sectors").select("*").eq("thesis_id", thesis.data['id']).execute()
    # opportunities = supabase.table("sector_opportunities").select("*").eq("thesis_id", thesis.data['id']).execute()
    # policies = supabase.table("sector_policies").select("*").eq("thesis_id", thesis.data['id']).execute()
    
    # Call Claude for scoring
    client = Anthropic(api_key=settings.anthropic_api_key)
    
    # Using mock data for prompt where DB fetch is missing
    prompt = f"""
You are an expert MSME analyst. Score this company against the sector thesis data.

COMPANY:
Name: {company.data['name']}
Sector: {sector_name}
Employees: {company.data.get('employee_count', 'Unknown')}
Founded: {company.data.get('founded_year', 'Unknown')}
Location: {company.data.get('headquarters_location')}

SECTOR THESIS:
Title: {thesis.data['title']}
Content: {thesis.data['content'][:500]}...

Provide a comprehensive scoring analysis in JSON format.
{{
  "overall_score": 0-100,
  "market_alignment_score": 0-100,
  "growth_potential_score": 0-100,
  "policy_advantage_score": 0-100,
  "competitive_position_score": 0-100,
  "innovation_readiness_score": 0-100,
  "scoring_rationale": {{
    "market_alignment": "Explanation",
    "growth_potential": "Explanation",
    "policy_advantages": "Explanation",
    "competitive_position": "Explanation",
    "innovation_readiness": "Explanation"
  }},
  "evidence_points": ["Point 1"],
  "matched_opportunity_ids": [],
  "matched_policy_ids": [],
  "key_strengths": ["Strength 1"],
  "key_gaps": ["Gap 1"],
  "immediate_actions": ["Action 1"]
}}
"""
    
    # Mock response for development if API key not set or for speed
    if not settings.anthropic_api_key:
        scoring_data = {
            "overall_score": 75,
            "market_alignment_score": 80,
            "growth_potential_score": 70,
            "policy_advantage_score": 60,
            "competitive_position_score": 75,
            "innovation_readiness_score": 65,
            "scoring_rationale": {"market_alignment": "Aligned"},
            "evidence_points": ["Point"],
            "matched_opportunity_ids": [],
            "matched_policy_ids": [],
            "key_strengths": ["Strong team"],
            "key_gaps": ["Funding needed"],
            "immediate_actions": ["Apply for loan"]
        }
    else:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )
        scoring_data = json.loads(response.content[0].text)
    
    # Store in database
    thesis_score = supabase.table("company_thesis_scores").insert({
        "company_id": company_id,
        "thesis_id": thesis.data['id'],
        "overall_score": scoring_data['overall_score'],
        "market_alignment_score": scoring_data['market_alignment_score'],
        "growth_potential_score": scoring_data['growth_potential_score'],
        "policy_advantage_score": scoring_data['policy_advantage_score'],
        "competitive_position_score": scoring_data['competitive_position_score'],
        "innovation_readiness_score": scoring_data['innovation_readiness_score'],
        "scoring_rationale": scoring_data['scoring_rationale'],
        "evidence_points": scoring_data['evidence_points'],
        "matched_opportunities": scoring_data['matched_opportunity_ids'],
        "matched_policies": scoring_data['matched_policy_ids'],
        "key_strengths": scoring_data['key_strengths'],
        "key_gaps": scoring_data['key_gaps'],
        "immediate_actions": scoring_data['immediate_actions']
    }).execute()
    
    # Update funnel stage
    passed_filter = scoring_data['overall_score'] >= 40
    
    supabase.table("company_funnel_stages").update({
        "current_stage": 2 if not passed_filter else 3,
        "stage_2_scored_at": "NOW()",
        "stage_2_status": "complete",
        "passed_stage_2_filter": passed_filter
    }).eq("company_id", company_id).execute()
    
    return ThesisScoreResponse(**{
        "company_id": company_id,
        **scoring_data
    })

# ============================================================================
# STAGE 3: FINANCIAL DATA
# ============================================================================

@router.post("/{company_id}/add-financials")
async def add_company_financials(company_id: str, financials: List[FinancialData]):
    """
    Add financial data for company (can be from MCA, direct transactions, or manual)
    """
    supabase = get_supabase()
    for financial in financials:
        # Calculate ratios
        gross_margin = (financial.gross_profit / financial.revenue * 100) if financial.revenue > 0 and financial.gross_profit else None
        net_margin = (financial.net_profit / financial.revenue * 100) if financial.revenue > 0 and financial.net_profit else None
        
        supabase.table("company_financials_extended").insert({
            "company_id": company_id,
            "fiscal_year": financial.fiscal_year,
            "revenue": financial.revenue,
            "gross_profit": financial.gross_profit,
            "net_profit": financial.net_profit,
            "total_assets": financial.total_assets,
            "total_liabilities": financial.total_liabilities,
            "gross_margin_percentage": gross_margin,
            "net_margin_percentage": net_margin,
            "data_source": financial.data_source
        }).execute()
    
    # Calculate CAGR (Mock function call or implementation)
    # cagr = supabase.rpc("calculate_company_cagr", {"p_company_id": company_id}).execute()
    
    # Update funnel
    supabase.table("company_funnel_stages").update({
        "current_stage": 4,
        "stage_3_financials_at": "NOW()",
        "stage_3_status": "complete",
        "passed_stage_3_filter": True
    }).eq("company_id", company_id).execute()
    
    return {
        "message": "Financials added successfully",
        "next_stage": "RAG Classification"
    }

# ============================================================================
# STAGE 4: RAG (RED/AMBER/GREEN) CLASSIFICATION
# ============================================================================

@router.post("/{company_id}/rag-classify")
async def classify_company_rag(company_id: str) -> RAGClassification:
    """
    Classify company as Red/Amber/Green
    """
    supabase = get_supabase()
    # Fetch thesis score
    thesis_score = supabase.table("company_thesis_scores").select("*").eq(
        "company_id", company_id
    ).single().execute()
    
    # Fetch company details
    company = supabase.table("companies").select("*").eq("id", company_id).single().execute()
    
    # Prepare data for Claude
    from anthropic import Anthropic
    client = Anthropic(api_key=settings.anthropic_api_key)
    
    prompt = f"""
Classify this MSME into RAG categories (RED, AMBER, GREEN).
Company: {company.data.get('name')}
Thesis Score: {thesis_score.data.get('overall_score') if thesis_score.data else 0}

Return JSON:
{{
  "rag_status": "red" | "amber" | "green",
  "rag_category": "stretched_fit" | "best_fit" | "best_bet",
  "confidence_score": 0.0-1.0,
  "classification_reasoning": "Reason",
  "recommendation": "proceed"
}}
"""
    if not settings.anthropic_api_key:
         rag_data = {
             "rag_status": "amber",
             "rag_category": "best_fit",
             "confidence_score": 0.8,
             "classification_reasoning": "Good potential",
             "recommendation": "proceed",
             "risk_factors": [],
             "opportunity_factors": [],
             "market_opportunity_score": 70,
             "company_readiness_score": 60,
             "execution_risk_score": 40,
             "fit_analysis": {},
             "recommended_actions": []
         }
    else:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )
        rag_data = json.loads(response.content[0].text)
    
    # Store in database
    rag_classification = supabase.table("company_rag_classification").insert({
        "company_id": company_id,
        "rag_status": rag_data['rag_status'],
        "rag_category": rag_data['rag_category'],
        "confidence_score": rag_data['confidence_score'],
        "classification_reasoning": rag_data.get('classification_reasoning', ''),
        "risk_factors": rag_data.get('risk_factors', []),
        "opportunity_factors": rag_data.get('opportunity_factors', []),
        "market_opportunity_score": rag_data.get('market_opportunity_score', 0),
        "company_readiness_score": rag_data.get('company_readiness_score', 0),
        "execution_risk_score": rag_data.get('execution_risk_score', 0),
        "fit_analysis": rag_data.get('fit_analysis', {}),
        "recommendation": rag_data.get('recommendation', ''),
        "recommended_actions": rag_data.get('recommended_actions', [])
    }).execute()
    
    # Update funnel
    passed_filter = rag_data['rag_status'] in ['amber', 'green']
    
    supabase.table("company_funnel_stages").update({
        "current_stage": 4 if not passed_filter else 5,
        "stage_4_rag_classified_at": "NOW()",
        "stage_4_status": "complete",
        "passed_stage_4_filter": passed_filter
    }).eq("company_id", company_id).execute()
    
    return RAGClassification(**{
        "rag_status": rag_data['rag_status'],
        "rag_category": rag_data['rag_category'],
        "confidence_score": rag_data['confidence_score'],
        "classification_reasoning": rag_data.get('classification_reasoning', ''),
        "recommendation": rag_data.get('recommendation', '')
    })

# ============================================================================
# STAGE 5: GAP ANALYSIS
# ============================================================================

@router.post("/{company_id}/gap-analyze")
async def run_gap_analysis_stage5(company_id: str):
    """Stage 5: Run comprehensive gap analysis via GapAnalysisAgent"""
    from app.agents.gap_analysis_agent import GapAnalysisAgent
    supabase = get_supabase()
    
    company_res = supabase.table("companies").select(
        "*, company_financials(*), company_leadership(*)"
    ).eq("id", company_id).single().execute()
    
    if not company_res.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    agent = GapAnalysisAgent()
    analysis = agent.analyze_company_normalized(company_res.data)
    analysis["company_id"] = company_id
    
    result = supabase.table("gap_analysis").insert(analysis).execute()
    
    # Advance funnel
    supabase.table("company_funnel_stages").update({
        "current_stage": 6,
        "stage_5_gap_analyzed_at": __import__('datetime').datetime.utcnow().isoformat(),
        "stage_5_status": "complete",
        "passed_stage_5_filter": True
    }).eq("company_id", company_id).execute()
    
    return {
        "message": "Gap analysis complete",
        "analysis": result.data[0] if result.data else analysis,
        "next_stage": "Roadmap Generation"
    }

@router.get("/{company_id}/gap-analysis")
async def get_gap_analysis_stage5(company_id: str):
    """Get the latest gap analysis for a company"""
    supabase = get_supabase()
    result = supabase.table("gap_analysis").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).limit(1).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="No gap analysis found")
    return result.data[0]

# ============================================================================
# STAGE 6: ROADMAP GENERATION
# ============================================================================

@router.post("/{company_id}/generate-roadmap")
async def generate_roadmap_stage6(company_id: str):
    """Stage 6: Generate 6-month strategic roadmap via RoadmapAgent"""
    from app.agents.roadmap_agent import RoadmapAgent
    supabase = get_supabase()
    
    company_res = supabase.table("companies").select("*") \
        .eq("id", company_id).single().execute()
    if not company_res.data:
        raise HTTPException(status_code=404, detail="Company not found")
    
    gap_res = supabase.table("gap_analysis").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).limit(1).execute()
    if not gap_res.data:
        raise HTTPException(status_code=400, detail="Run gap analysis (Stage 5) first")
    
    agent = RoadmapAgent()
    roadmap = agent.generate_roadmap(company_res.data, gap_res.data[0])
    roadmap["company_id"] = company_id
    
    result = supabase.table("roadmaps").insert({
        "company_id": company_id,
        "gap_analysis_id": gap_res.data[0]["id"],
        "roadmap_data": roadmap
    }).execute()
    
    # Mark funnel complete
    supabase.table("company_funnel_stages").update({
        "current_stage": 7,
        "stage_6_roadmap_at": __import__('datetime').datetime.utcnow().isoformat(),
        "stage_6_status": "complete",
        "passed_stage_6_filter": True
    }).eq("company_id", company_id).execute()
    
    return {
        "message": "Roadmap generated successfully",
        "roadmap_id": result.data[0]["id"] if result.data else None,
        "roadmap": roadmap
    }

@router.get("/{company_id}/roadmap")
async def get_roadmap_stage6(company_id: str):
    """Get the latest roadmap for a company"""
    supabase = get_supabase()
    result = supabase.table("roadmaps").select("*") \
        .eq("company_id", company_id) \
        .order("created_at", desc=True).limit(1).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="No roadmap found")
    return result.data[0]
