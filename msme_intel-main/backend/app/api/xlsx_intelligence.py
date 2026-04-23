"""
XLSX Intelligence API
Accepts an Excel file with company data for any region.
Extracts: company list, sector distribution, investment/turnover profiles.
Then runs: ecosystem gap analysis, competitor clustering, growth opportunity scoring.

Routes:
  POST /api/intelligence/upload       → upload XLSX, returns job_id
  GET  /api/intelligence/{job_id}     → get processing status + results
  GET  /api/intelligence/{job_id}/ecosystem    → ecosystem provider gaps
  GET  /api/intelligence/{job_id}/competitors  → competitor cluster map
  GET  /api/intelligence/{job_id}/opportunities → sector opportunity matrix
  POST /api/intelligence/{job_id}/import        → import companies to platform
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from typing import Dict, Any, List, Optional
import pandas as pd, io, json, uuid
from datetime import datetime, timezone
from app.services.supabase_service import get_supabase
from app.services.claude_service import ClaudeService

router = APIRouter(prefix="/api/intelligence", tags=["xlsx-intelligence"])

# ── Column normalisation map ─────────────────────────────────────────────────
# Handles Udyam CSV format AND generic XLSX company lists

COLUMN_MAP = {
    # Udyam CSV columns
    "udyam reg. no": "udyam_reg_no",
    "enterprise name": "name",
    "owner name": "owner_name",
    "address": "address",
    "incorporation date": "incorporation_date",
    "pincode": "pincode",
    "district": "district",
    "state": "state",
    "employment": "employee_count",
    "major activity": "major_activity",
    "organisation type": "org_type",
    "investment cost (in rs.)": "investment_inr",
    "net turnover (in rs.)": "turnover_inr",
    "enterprise type": "enterprise_type",
    "nic 5 digit code": "nic_codes_raw",
    "email id": "email",
    "mobile no.": "phone",
    "latitude": "latitude",
    "longitude": "longitude",
    # Generic company list columns
    "company name": "name",
    "company": "name",
    "revenue": "turnover_inr",
    "employees": "employee_count",
    "sector": "sector_name",
    "industry": "sector_name",
    "city": "district",
    "website": "website",
}

def normalise_columns(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [c.lower().strip() for c in df.columns]
    rename_map = {c: COLUMN_MAP[c] for c in df.columns if c in COLUMN_MAP}
    return df.rename(columns=rename_map)

def parse_nic_codes(raw: str) -> List[str]:
    """Extract NIC codes from Udyam JSON format."""
    try:
        codes = json.loads(raw) if isinstance(raw, str) else []
        return [str(c.get("NIC5DigitId", "")) for c in codes if c.get("NIC5DigitId")]
    except Exception:
        return []

@router.post("/upload")
async def upload_xlsx_for_intelligence(
    file: UploadFile = File(...),
    region_label: str = "Unknown Region",
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """Upload XLSX/CSV with company data. Returns job_id to poll for results."""
    
    if not (file.filename.endswith('.xlsx') or file.filename.endswith('.csv')):
        raise HTTPException(400, "Only .xlsx or .csv files accepted")
    
    content = await file.read()
    
    # Parse file
    if file.filename.endswith('.csv'):
        df = pd.read_csv(io.StringIO(content.decode('utf-8-sig')))
    else:
        df = pd.read_excel(io.BytesIO(content))
    
    df = normalise_columns(df)
    
    if 'name' not in df.columns:
        raise HTTPException(400, "File must contain a company name column")
    
    # Store raw data in Supabase
    sb = get_supabase()
    job_id = str(uuid.uuid4())
    
    records = []
    for _, row in df.iterrows():
        rec = row.to_dict()
        # Parse NIC codes if present
        if 'nic_codes_raw' in rec:
            rec['nic_codes'] = parse_nic_codes(str(rec.get('nic_codes_raw', '')))
        # Convert NaN to None
        rec = {k: (None if pd.isna(v) else v) for k, v in rec.items()}
        records.append(rec)
    
    sb.table("intelligence_jobs").insert({
        "id": job_id,
        "region_label": region_label,
        "filename": file.filename,
        "total_companies": len(records),
        "raw_data": records,
        "status": "processing",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }).execute()
    
    # Run analysis in background
    background_tasks.add_task(_run_intelligence_analysis, job_id, records, region_label)
    
    return {
        "job_id": job_id,
        "companies_found": len(records),
        "region": region_label,
        "status": "processing",
        "poll_url": f"/api/intelligence/{job_id}"
    }

async def _run_intelligence_analysis(job_id: str, records: List[Dict], region_label: str):
    """Background task: runs all intelligence analysis on uploaded companies."""
    sb = get_supabase()
    
    try:
        # 1. Sector distribution
        sector_dist = _compute_sector_distribution(records)
        
        # 2. Size/stage distribution
        size_dist = _compute_size_distribution(records)
        
        # 3. Geographic distribution
        geo_dist = _compute_geo_distribution(records)
        
        # 4. Ecosystem gap analysis (Claude)
        ecosystem_gaps = await _analyse_ecosystem_gaps(records, sector_dist, region_label)
        
        # 5. Competitor clustering (Claude)
        competitor_clusters = await _cluster_competitors(records, sector_dist)
        
        # 6. Opportunity matrix (Claude)
        opportunities = await _generate_opportunity_matrix(records, sector_dist, region_label)
        
        # Store results
        sb.table("intelligence_jobs").update({
            "status": "complete",
            "sector_distribution": sector_dist,
            "size_distribution": size_dist,
            "geo_distribution": geo_dist,
            "ecosystem_gaps": ecosystem_gaps,
            "competitor_clusters": competitor_clusters,
            "opportunities": opportunities,
            "completed_at": datetime.now(timezone.utc).isoformat(),
        }).eq("id", job_id).execute()
        
    except Exception as e:
        sb.table("intelligence_jobs").update({
            "status": "error", "error": str(e)
        }).eq("id", job_id).execute()

def _compute_sector_distribution(records: List[Dict]) -> Dict:
    """Map NIC codes to sector groups and compute distribution."""
    sectors: Dict[str, int] = {}
    for r in records:
        sector = r.get("sector_name") or r.get("major_activity") or "Unknown"
        # If NIC codes present, infer sector
        if nic_codes := r.get("nic_codes", []):
            sector = _nic_to_sector(nic_codes[0] if nic_codes else "")
        sectors[sector] = sectors.get(sector, 0) + 1
    return sectors

def _nic_to_sector(nic_code: str) -> str:
    """Map 5-digit NIC code prefix to broad sector."""
    code = str(nic_code)[:2]
    mapping = {
        "01": "Agriculture", "10": "Food Processing", "11": "Beverages",
        "13": "Textiles", "14": "Apparel", "15": "Leather",
        "16": "Wood Products", "17": "Paper", "18": "Printing",
        "20": "Chemicals", "21": "Pharmaceuticals", "22": "Plastics & Rubber",
        "23": "Non-metallic Minerals", "24": "Basic Metals",
        "25": "Fabricated Metals", "26": "Electronics",
        "27": "Electrical Equipment", "28": "Machinery",
        "29": "Auto Vehicles", "30": "Other Transport",
        "32": "Gems & Jewellery", "62": "IT Services", "63": "Information Services",
    }
    return mapping.get(code, f"Manufacturing ({code})")

def _compute_size_distribution(records: List[Dict]) -> Dict:
    tiers = {"Micro": 0, "Small": 0, "Medium": 0, "Unknown": 0}
    for r in records:
        tier = r.get("enterprise_type") or "Unknown"
        tiers[tier] = tiers.get(tier, 0) + 1
    return tiers

def _compute_geo_distribution(records: List[Dict]) -> Dict:
    districts: Dict[str, int] = {}
    for r in records:
        d = r.get("district") or r.get("city") or "Unknown"
        districts[d] = districts.get(d, 0) + 1
    return districts

async def _analyse_ecosystem_gaps(records: List[Dict], sector_dist: Dict, region: str) -> Dict:
    """Use Claude to identify missing ecosystem services for this company set."""
    sectors_summary = ", ".join(f"{k}: {v} companies" for k, v in
                                 sorted(sector_dist.items(), key=lambda x: -x[1])[:8])
    total = len(records)
    
    prompt = f"""Analyse this set of {total} companies from {region}:
Sector distribution: {sectors_summary}
Enterprise types: {_compute_size_distribution(records)}

Based on this company profile, identify the ECOSYSTEM GAPS — what services, infrastructure, and support systems are MISSING or UNDER-SERVED in this region that would help these companies grow.

Return ONLY valid JSON:
{{
  "critical_gaps": [
    {{
      "category": "Finance | Technology | Talent | Market Access | Infrastructure | Regulatory",
      "gap": "Specific gap description",
      "affected_companies_percentage": 0-100,
      "urgency": "high | medium | low",
      "potential_providers": ["type of provider that could fill this gap"],
      "market_opportunity_inr_cr": 0
    }}
  ],
  "underserved_sectors": ["sector names"],
  "missing_services": {{
    "credit_access": "gap assessment",
    "technology_adoption": "gap assessment",
    "export_facilitation": "gap assessment",
    "skill_development": "gap assessment",
    "regulatory_support": "gap assessment"
  }},
  "recommendations": ["actionable recommendations"]
}}"""
    
    response = ClaudeService.create_message(
        system="You are an MSME ecosystem analyst. Return only valid JSON, no markdown.",
        user_message=prompt, max_tokens=2000
    )
    import json as _json
    return _json.loads(response.replace("```json","").replace("```","").strip())

async def _cluster_competitors(records: List[Dict], sector_dist: Dict) -> Dict:
    """Use Claude to cluster companies into competitor groups and identify top performers."""
    top_sectors = sorted(sector_dist.items(), key=lambda x: -x[1])[:5]
    
    # Build summary of companies per sector
    sector_companies = {}
    for r in records:
        sector = r.get("sector_name") or r.get("major_activity") or "Unknown"
        if sector not in sector_companies:
            sector_companies[sector] = []
        sector_companies[sector].append({
            "name": r.get("name"),
            "turnover_inr": r.get("turnover_inr"),
            "employees": r.get("employee_count"),
            "type": r.get("enterprise_type"),
        })
    
    prompt = f"""Analyse these companies grouped by sector:
{json.dumps({k: sector_companies[k][:10] for k, _ in top_sectors}, indent=2, default=str)}

For each sector, identify:
1. The natural competitive clusters (groups of similar companies)
2. Top 10% performers (by turnover, employees, growth signals)
3. Market leaders vs followers vs emerging players
4. Collaboration opportunities (companies that could partner vs compete)

Return ONLY valid JSON:
{{
  "clusters": [
    {{
      "sector": "sector name",
      "sub_clusters": [
        {{
          "cluster_name": "descriptive name",
          "companies": ["company names"],
          "characteristics": "what defines this cluster",
          "avg_turnover_lakhs": 0,
          "avg_employees": 0,
          "growth_potential": "high"
        }}
      ],
      "top_performers": ["company names"],
      "market_leaders": ["company names"],
      "collaboration_opportunities": ["describe partnerships"]
    }}
  ],
  "cross_sector_opportunities": ["opportunities"]
}}"""
    
    response = ClaudeService.create_message(
        system="You are an MSME competitive intelligence analyst. Return only valid JSON.",
        user_message=prompt, max_tokens=3000
    )
    import json as _json
    return _json.loads(response.replace("```json","").replace("```","").strip())

async def _generate_opportunity_matrix(records: List[Dict], sector_dist: Dict, region: str) -> Dict:
    """Use Claude to generate sector opportunity matrix for this region."""
    sectors_summary = ", ".join(f"{k}: {v}" for k, v in
                                 sorted(sector_dist.items(), key=lambda x: -x[1])[:8])
    
    total_investment = sum(float(r.get("investment_inr") or 0) for r in records)
    total_turnover = sum(float(r.get("turnover_inr") or 0) for r in records)
    
    prompt = f"""Analyse MSME opportunities in {region}:
Sectors present: {sectors_summary}
Total companies: {len(records)}
Total investment in region: ₹{total_investment/1e7:.1f} Cr
Total turnover in region: ₹{total_turnover/1e7:.1f} Cr

Generate a SECTOR OPPORTUNITY MATRIX for this region. For each sector present:
1. Current strength score (1-10)
2. Growth potential score (1-10)
3. Investment gap
4. Key interventions needed

Return ONLY valid JSON:
{{
  "sector_matrix": [
    {{
      "sector": "sector name",
      "company_count": 0,
      "total_turnover_cr": 0,
      "current_strength": 5,
      "growth_potential": 5,
      "composite_score": 5,
      "investment_gap_cr": 0,
      "interventions": ["list"],
      "flagship_companies": ["names"],
      "rag_status": "green"
    }}
  ],
  "regional_summary": {{
    "dominant_sector": "name",
    "emerging_sector": "name",
    "declining_risk": "name",
    "total_opportunity_inr_cr": 0,
    "recommended_focus": "strategy"
  }}
}}"""
    
    response = ClaudeService.create_message(
        system="You are a regional MSME development economist. Return only valid JSON.",
        user_message=prompt, max_tokens=3000
    )
    import json as _json
    return _json.loads(response.replace("```json","").replace("```","").strip())

@router.get("/{job_id}")
async def get_intelligence_job(job_id: str):
    sb = get_supabase()
    job = sb.table("intelligence_jobs").select(
        "id, region_label, filename, total_companies, status, created_at, completed_at, error"
    ).eq("id", job_id).single().execute()
    if not job.data:
        raise HTTPException(404, "Job not found")
    return job.data

@router.get("/{job_id}/ecosystem")
async def get_ecosystem_analysis(job_id: str):
    sb = get_supabase()
    job = sb.table("intelligence_jobs").select("ecosystem_gaps, sector_distribution, region_label").eq("id", job_id).single().execute()
    if not job.data:
        raise HTTPException(404, "Job not found")
    return job.data

@router.get("/{job_id}/competitors")
async def get_competitor_clusters(job_id: str):
    sb = get_supabase()
    job = sb.table("intelligence_jobs").select("competitor_clusters, sector_distribution").eq("id", job_id).single().execute()
    return job.data

@router.get("/{job_id}/opportunities")
async def get_opportunity_matrix(job_id: str):
    sb = get_supabase()
    job = sb.table("intelligence_jobs").select("opportunities, geo_distribution, size_distribution").eq("id", job_id).single().execute()
    return job.data

@router.post("/{job_id}/import")
async def import_companies_from_job(job_id: str, sector_id: str = None):
    """Import all companies from intelligence job into the platform."""
    sb = get_supabase()
    job = sb.table("intelligence_jobs").select("raw_data, region_label").eq("id", job_id).single().execute()
    
    if not job.data:
        raise HTTPException(404, "Job not found")
    
    imported = 0
    errors = []
    
    for rec in job.data["raw_data"]:
        try:
            name = rec.get("name")
            if not name:
                continue
            
            # Check if already exists by Udyam number or name
            existing = None
            if rec.get("udyam_reg_no"):
                existing = sb.table("companies").select("id").eq("udyam_reg_no", rec["udyam_reg_no"]).execute()
            if not existing or not existing.data:
                sb.table("companies").insert({
                    "name": name,
                    "udyam_reg_no": rec.get("udyam_reg_no"),
                    "owner_name": rec.get("owner_name"),
                    "email": rec.get("email"),
                    "phone": rec.get("phone"),
                    "major_activity": rec.get("major_activity", "Manufacturing"),
                    "enterprise_type": rec.get("enterprise_type"),
                    "org_type": rec.get("org_type"),
                    "district": rec.get("district"),
                    "state": rec.get("state"),
                    "pincode": rec.get("pincode"),
                    "latitude": rec.get("latitude"),
                    "longitude": rec.get("longitude"),
                    "investment_cost": rec.get("investment_inr"),
                    "net_turnover": rec.get("turnover_inr"),
                    "employee_count": rec.get("employee_count"),
                    "nic_codes": rec.get("nic_codes", []),
                    "primary_sector_id": sector_id,
                    "funnel_stage": "lead",
                    "udyam_imported": True,
                }).execute()
                imported += 1
        except Exception as e:
            errors.append({"name": rec.get("name"), "error": str(e)})
    
    return {"imported": imported, "skipped": len(job.data["raw_data"]) - imported - len(errors), "errors": errors}
