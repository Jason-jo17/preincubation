import os
import uuid
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def seed_full_demo():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Error: Supabase credentials not found")
        return

    client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("🚀 Starting Full Demo Seeding...")

    try:
        # 1. Seed Sectors
        print("🌱 Seeding Sectors...")
        aero_sector_name = "Aerospace & Precision Manufacturing"
        sectors = client.table("sectors").select("id").eq("name", aero_sector_name).execute()
        
        if sectors.data:
            sector_id = sectors.data[0]['id']
            print(f"   Sector '{aero_sector_name}' already exists (ID: {sector_id})")
        else:
            sector_res = client.table("sectors").insert({"name": aero_sector_name, "description": "High-precision aerospace components."}).execute()
            sector_id = sector_res.data[0]['id']
            print(f"   Created Sector '{aero_sector_name}' (ID: {sector_id})")

        # 2. Seed Companies
        print("🏢 Seeding Companies...")
        companies_data = [
            {"id": "aeq-001-0000-0000-0000-000000000000", "name": "Aequs Limited", "primary_sector_id": sector_id, "stage": "mature", "headquarters_location": "Belagavi, Karnataka", "funnel_stage": "gap_analysis"},
            {"id": "comp-001-0000-0000-0000-000000000000", "name": "TechForge Manufacturing", "primary_sector_id": sector_id, "stage": "growth", "headquarters_location": "Pune, Maharashtra", "funnel_stage": "screened"},
            {"id": "comp-002-0000-0000-0000-000000000000", "name": "Precision Components Ltd", "primary_sector_id": sector_id, "stage": "mature", "headquarters_location": "Bangalore, Karnataka", "funnel_stage": "financial_review"}
        ]
        # Map shortened IDs to valid UUIDs for foreign key constraints if needed, but here I'll use the UUID format
        for comp in companies_data:
            client.table("companies").upsert(comp).execute()

        aequs_id = companies_data[0]['id']
        techforge_id = companies_data[1]['id']

        # 3. Seed Stakeholders
        print("👥 Seeding Stakeholders...")
        stakeholders = [
            {"id": "550e8400-e29b-41d4-a716-446655440001", "company_id": aequs_id, "name": "Aravind Melligeri", "role": "CEO", "company_name": "Aequs Limited", "sector": aero_sector_name},
            {"id": "550e8400-e29b-41d4-a716-446655440002", "company_id": techforge_id, "name": "Mr. Rajesh Kumar", "role": "Operations Head", "company_name": "TechForge Manufacturing", "sector": aero_sector_name}
        ]
        for sh in stakeholders:
            client.table("mosi_stakeholders").upsert(sh).execute()

        aravind_id = stakeholders[0]['id']
        rajesh_id = stakeholders[1]['id']

        # 4. Seed Sessions
        print("🎙️ Seeding MOSI Sessions...")
        sessions = [
            {
                "id": "111e8400-e29b-41d4-a716-446655440001", 
                "stakeholder_id": aravind_id, 
                "company_id": aequs_id, 
                "status": "Published", 
                "date": "Apr 01, 2026", 
                "duration": 1800,
                "summary": "Interview with CEO Aravind Melligeri focusing on operational bottlenecks. Aerospace segment scaling to $500M is hindered by consumer segment drag and CTO vacancy.",
                "transcript": [
                    {"speaker": "Aravind", "time": "04:05", "text": "Look, we have the Airbus contract..."},
                    {"speaker": "Interviewer", "time": "05:00", "text": "What about the profit margins?"},
                    {"speaker": "Aravind", "time": "05:45", "text": "Consumer segment is bleeding our resources."}
                ]
            },
            {
                "id": "111e8400-e29b-41d4-a716-446655440002", 
                "stakeholder_id": rajesh_id, 
                "company_id": techforge_id, 
                "status": "Published", 
                "date": "Mar 25, 2026", 
                "duration": 1450,
                "summary": "Operations review with Rajesh Kumar. Focus on manual finishing bottlenecks and QC requirements for aerospace components."
            }
        ]
        for sess in sessions:
            client.table("mosi_sessions").upsert(sess).execute()

        aequs_sess_id = sessions[0]['id']

        # 5. Seed Opportunities
        print("💡 Seeding MOSI Opportunities...")
        opportunities = [
            {
                "id": "222e8400-e29b-41d4-a716-446655440001",
                "session_id": aequs_sess_id,
                "title": "Automated RFQ Processing for Aerospace",
                "description": "Reduce quoting time from weeks to hours using NLP and OCR pipelines.",
                "tag": "Efficiency",
                "problem_clarity": 4,
                "budget_score": 4,
                "actively_seeking": True,
                "is_paid": True,
                "skillset": ["Python", "NLP", "Process Engineering"],
                "status": "Approved"
            },
            {
                "id": "222e8400-e29b-41d4-a716-446655440002",
                "session_id": aequs_sess_id,
                "title": "Spin-off Consumer Segment",
                "description": "Strategic restructuring to separate P&L and focus on high-growth aerospace.",
                "tag": "Core",
                "problem_clarity": 4,
                "budget_score": 3,
                "actively_seeking": True,
                "status": "Approved"
            }
        ]
        for opp in opportunities:
            client.table("mosi_opportunities").upsert(opp).execute()

        # 6. Seed Unified Opportunities
        print("🔗 Seeding Unified Opportunities (Bridge)...")
        unified = [
            {
                "session_id": aequs_sess_id,
                "company_id": aequs_id,
                "title": "Aerospace RFQ Automation",
                "description": "AI-driven pipeline for component quoting.",
                "ceed_tag": "Efficiency",
                "problem_clarity": 4,
                "budget_availability": 4,
                "skillset": ["NLP", "FastAPI"]
            }
        ]
        for uo in unified:
            client.table("unified_opportunities").upsert(uo).execute()

        print("✅ Full Demo Seeding Completed Successfully!")

    except Exception as e:
        print(f"💥 Seeding Error: {str(e)}")

if __name__ == "__main__":
    seed_full_demo()
