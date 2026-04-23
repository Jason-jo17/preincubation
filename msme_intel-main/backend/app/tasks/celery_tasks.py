from celery import Celery
import os

redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
app = Celery("msme_tasks", broker=redis_url, backend=redis_url)

@app.task(bind=True, max_retries=3)
def run_gap_analysis_task(self, company_id: str):
    """Async Celery task for gap analysis — returns result to Redis backend"""
    try:
        from app.agents.gap_analysis_agent import GapAnalysisAgent
        from app.services.supabase_service import init_supabase, get_supabase
        
        init_supabase()
        supabase = get_supabase()
        
        company_res = supabase.table("companies").select(
            "*, company_financials(*), company_leadership(*)"
        ).eq("id", company_id).single().execute()
        
        agent = GapAnalysisAgent()
        analysis = agent.analyze_company_normalized(company_res.data)
        analysis["company_id"] = company_id
        
        result = supabase.table("gap_analysis").insert(analysis).execute()
        return {"status": "complete", "analysis_id": result.data[0]["id"] if result.data else None}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)

@app.task(bind=True, max_retries=3)
def run_roadmap_task(self, company_id: str):
    """Async Celery task for roadmap generation"""
    try:
        from app.agents.roadmap_agent import RoadmapAgent
        from app.services.supabase_service import init_supabase, get_supabase
        
        init_supabase()
        supabase = get_supabase()
        
        company_res = supabase.table("companies").select("*").eq("id", company_id).single().execute()
        gap_res = supabase.table("gap_analysis").select("*") \
            .eq("company_id", company_id) \
            .order("created_at", desc=True).limit(1).execute()
        
        if not gap_res.data:
            return {"status": "error", "message": "No gap analysis found"}
        
        agent = RoadmapAgent()
        roadmap = agent.generate_roadmap(company_res.data, gap_res.data[0])
        roadmap["company_id"] = company_id
        
        result = supabase.table("roadmaps").insert({
            "company_id": company_id,
            "gap_analysis_id": gap_res.data[0]["id"],
            "roadmap_data": roadmap
        }).execute()
        return {"status": "complete", "roadmap_id": result.data[0]["id"] if result.data else None}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)
