from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    companies, gap_analysis, roadmaps, search, sectors, 
    funnel, company_portal, xlsx_intelligence, expert_reviews,
    ceed_analysis, automation_needs, buildforx_prd, submissions, mosi, evaluations, interests
)
from app.api.routers import company_funnel
from app.services.supabase_service import init_supabase

app = FastAPI(
    title="MSME Intelligence Platform API",
    description="AI-powered gap analysis and roadmap generation for MSMEs",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services on startup
@app.on_event("startup")
async def startup_event():
    init_supabase()
    print("✅ Supabase initialized")

# Include API routers
app.include_router(companies.router, prefix="/api/companies", tags=["companies"])
app.include_router(gap_analysis.router, prefix="/api/companies", tags=["gap-analysis"])
app.include_router(roadmaps.router, prefix="/api/companies", tags=["roadmaps"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
app.include_router(sectors.router, prefix="/api/sectors", tags=["sectors"])
app.include_router(funnel.router, prefix="/api/funnel", tags=["funnel"])
app.include_router(company_portal.router)
app.include_router(xlsx_intelligence.router)
app.include_router(expert_reviews.router)
app.include_router(company_funnel.router)
app.include_router(ceed_analysis.router, prefix="/api")
app.include_router(automation_needs.router, prefix="/api")
app.include_router(buildforx_prd.router, prefix="/api")
app.include_router(submissions.router, prefix="/api")
app.include_router(mosi.router, prefix="/api")
app.include_router(evaluations.router, prefix="/api")
app.include_router(interests.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "MSME Intelligence Platform API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
