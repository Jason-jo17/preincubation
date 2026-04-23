from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Depends
from typing import List, Dict, Any
from app.services.supabase_service import get_supabase
from app.services.csv_service import CSVService
from app.services.screening_service import ScreeningService
from app.models.company import Company, CompanyCreate
from app.models.gap_analysis import GapAnalysis

router = APIRouter()

@router.post("/upload-csv")
async def upload_companies_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file to bulk import companies into the 'Leads' stage.
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV.")
    
    content = await file.read()
    companies_data = CSVService.parse_company_csv(content)
    
    if not companies_data:
        raise HTTPException(status_code=400, detail="No valid company data found in CSV.")
    
    supabase = get_supabase()
    created_count = 0
    errors = []
    
    for company in companies_data:
        try:
            # Add default funnel stage
            company["funnel_stage"] = "lead"
            # Insert into Supabase
            supabase.table("companies").insert(company).execute()
            created_count += 1
        except Exception as e:
            errors.append(f"Error importing {company.get('name', 'Unknown')}: {str(e)}")
            
    return {
        "message": f"Successfully imported {created_count} companies.",
        "errors": errors,
        "total_processed": len(companies_data)
    }

@router.post("/{company_id}/screen")
async def screen_company(company_id: str, thesis_content: str = None):
    """
    Triggers the screening analysis for a company.
    Calculates Thesis Score and Financial Health, then updates Classification.
    """
    supabase = get_supabase()
    
    # Fetch company and financials
    company_res = supabase.table("companies").select("*, company_financials(*)").eq("id", company_id).single().execute()
    if not company_res.data:
        raise HTTPException(status_code=404, detail="Company not found")
        
    company_data = company_res.data
    financials_data = company_data.get("company_financials", [])
    # Use latest financials
    latest_financials = financials_data[0] if financials_data else {}
    
    # Calculate Scores
    # Note: Pydantic models should be used for validation, but for quick prototype we pass dicts/objects if compatible
    # Here we mock the object structures for the service methods if needed, or update service to accept dicts.
    # Updated ScreeningService to take objects, so we might need simple adapter or just pass specific fields.
    
    # 1. Financial Score
    # Simple adapter object
    class FinancialsAdapter:
        def __init__(self, data):
            self.revenue_inr_lakhs = data.get('revenue_inr_lakhs')
            self.profit_inr_lakhs = data.get('profit_inr_lakhs')
            self.cagr = data.get('cagr')
            self.ebitda_margin = data.get('ebitda_margin')
            
    fin_score = ScreeningService.calculate_financial_health(FinancialsAdapter(latest_financials))
    
    # 2. Thesis Analysis (AI)
    # We need a Company object, create one from data
    # company_obj = Company(**company_data) # Might fail if extra fields or missing required
    # Simplified:
    class CompanyAdapter:
        def __init__(self, data):
            self.description = data.get('description')
            
    thesis_result = await ScreeningService.analyze_thesis_alignment(CompanyAdapter(company_data), thesis_content)
    thesis_score = thesis_result["score"]
    
    # 3. Market Opportunity (Mocked for now, or fetched from Sector data)
    market_opp_score = 70 
    
    # 4. Classification
    classification = ScreeningService.determine_screening_classification(fin_score, thesis_score, market_opp_score)
    
    # Update Gap Analysis / Create new record
    # specific screening_classification field
    
    # Check if gap analysis exists
    existing_gap = supabase.table("gap_analysis").select("id").eq("company_id", company_id).execute()
    
    analysis_data = {
        "company_id": company_id,
        "financial_health_score": fin_score,
        "market_opportunity_score": market_opp_score,
        "strategy_score": thesis_score, # Mapping thesis align to strategy for now
        "screening_classification": classification,
        "overall_potential_score": int((fin_score + thesis_score + market_opp_score) / 3),
        "rag_score": "green" if classification in ["best_bet", "best_fit"] else "amber" if classification == "stretched_fit" else "red",
        "confidence_level": "medium"
    }
    
    if existing_gap.data:
        supabase.table("gap_analysis").update(analysis_data).eq("id", existing_gap.data[0]['id']).execute()
    else:
        supabase.table("gap_analysis").insert(analysis_data).execute()
        
    # Update Funnel Stage
    supabase.table("companies").update({"funnel_stage": "screened"}).eq("id", company_id).execute()
    
    return {
        "financial_score": fin_score,
        "thesis_score": thesis_score,
        "classification": classification,
        "proofs": thesis_result["proofs"]
    }

@router.put("/{company_id}/stage")
async def update_funnel_stage(company_id: str, stage: str):
    """
    Manually update the funnel stage.
    """
    valid_stages = ["lead", "screened", "financial_review", "gap_analysis", "roadmap"]
    if stage not in valid_stages:
        raise HTTPException(status_code=400, detail=f"Invalid stage. Must be one of: {valid_stages}")
        
    supabase = get_supabase()
    result = supabase.table("companies").update({"funnel_stage": stage}).eq("id", company_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Company not found")
        
    return {"message": f"Moved company to {stage}", "company": result.data[0]}
