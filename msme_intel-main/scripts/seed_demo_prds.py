import os
import uuid
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def seed_demo_prds():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Error: Supabase credentials not found")
        return

    client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("🚀 Starting Demo PRD & Log Seeding...")

    try:
        # 1. New Sector: Textile & Apparel
        textile_sector_res = client.table("sectors").upsert({"name": "Textile & Apparel", "description": "Sustainable textile manufacturing and smart supply chain solutions."}).execute()
        textile_sector_id = textile_sector_res.data[0]['id']
        print(f"✅ Sector 'Textile & Apparel' set (ID: {textile_sector_id})")

        # 2. Company: CottonWorks
        cotton_id = "cott-001-0000-0000-0000-000000000000"
        client.table("companies").upsert({
            "id": cotton_id,
            "name": "CottonWorks Pvt Ltd",
            "primary_sector_id": textile_sector_id,
            "stage": "growth",
            "headquarters_location": "Tirupur, Tamil Nadu",
            "funnel_stage": "roadmap"
        }).execute()
        print(f"✅ Company 'CottonWorks' set (ID: {cotton_id})")

        # 3. Automation Need: Textile Waste Segregator
        need_res = client.table("sector_automation_needs").upsert({
            "id": "need-textile-001-0000-0000-000000000000",
            "sector_id": textile_sector_id,
            "title": "Smart Textile Waste Segregator",
            "slug": "smart-textile-waste-segregator",
            "automation_type": "Robotics & Computer Vision",
            "ceed_quadrant": "efficiency",
            "impact_level": "high",
            "status": "published"
        }).execute()
        need_id = need_res.data[0]['id']
        print(f"✅ Automation Need 'Waste Segregator' set (ID: {need_id})")

        # 4. Conversation Log (Session) for CottonWorks
        stakeholder_id = "550e8400-e29b-41d4-a716-446655440003"
        client.table("mosi_stakeholders").upsert({
            "id": stakeholder_id,
            "company_id": cotton_id,
            "name": "Senthil Kumar",
            "role": "Plant Head"
        }).execute()

        session_id = "111e8400-e29b-41d4-a716-446655440003"
        client.table("mosi_sessions").upsert({
            "id": session_id,
            "stakeholder_id": stakeholder_id,
            "company_id": cotton_id,
            "status": "Published",
            "date": "Mar 20, 2026",
            "summary": "Discovery session regarding textile waste contamination. Cotton is being mixed with synthetic scraps, reducing recycling value.",
            "transcript": [
                {"speaker": "Senthil", "time": "02:30", "text": "We are losing 20% value by mixing high-grade scrap with general waste."},
                {"speaker": "Interviewer", "time": "03:15", "text": "Can manual workers distinguish them?"},
                {"speaker": "Senthil", "time": "03:45", "text": "No, it's impossible by touch alone."}
            ]
        }).execute()
        print(f"✅ Conversation Log for 'CottonWorks' set (ID: {session_id})")

        # 5. PRDs
        # Aequs (Aerospace)
        client.table("buildforx_prds").upsert({
            "id": "prd-001-0000-0000-0000-000000000001",
            "company_id": "aeq-001-0000-0000-0000-000000000000",
            "sector_id": "778009bc-805c-449e-b9b5-6f68c3ef9081", # Aerospace
            "prd_code": "BFX-AERO-001",
            "title": "Aerospace RFQ Pipeline Automation",
            "slug": "aerospace-rfq-pipeline-automation",
            "executive_summary": "Automated pipeline using NLP and OCR to handle aerospace quoting requests, reducing response time from weeks to hours.",
            "status": "published"
        }).execute()

        # CottonWorks (Textile)
        client.table("buildforx_prds").upsert({
            "id": "prd-001-0000-0000-0000-000000000002",
            "company_id": cotton_id,
            "sector_id": textile_sector_id,
            "prd_code": "BFX-TEXT-001",
            "title": "AI Waste Segregation Assistant",
            "slug": "ai-waste-segregation-assistant",
            "executive_summary": "Computer-vision driven segregation system to distinguish silk from cotton scraps for high-value recycling.",
            "status": "published"
        }).execute()
        print("✅ Demo PRDs for Aerospace and Textile seeded successfully!")

    except Exception as e:
        print(f"💥 Seeding Error: {str(e)}")

if __name__ == "__main__":
    seed_demo_prds()
