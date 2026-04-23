import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def verify_mosi_links():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Error: Supabase credentials not found in root .env")
        return

    print(f"🔍 Starting Forensic Data Audit for MOSI Integration...")
    client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    try:
        # 1. Check Tables Existence
        tables = ["mosi_stakeholders", "mosi_sessions", "mosi_opportunities", "companies"]
        for table in tables:
            res = client.table(table).select("count", count="exact").limit(1).execute()
            print(f"📊 Table '{table}': {res.count} records found.")

        # 2. Verify Stakeholder -> Session Link
        sessions = client.table("mosi_sessions").select("id, stakeholder_id").execute()
        linked_sessions = [s for s in sessions.data if s.get('stakeholder_id')]
        print(f"🔗 Sessions with Stakeholder IDs: {len(linked_sessions)} / {len(sessions.data)}")

        # 3. Verify Session -> Opportunity Link
        opportunities = client.table("mosi_opportunities").select("id, session_id").execute()
        linked_opps = [o for o in opportunities.data if o.get('session_id')]
        print(f"🔗 Opportunities with Session IDs: {len(linked_opps)} / {len(opportunities.data)}")

        # 4. Verify Company -> Session Link
        company_sessions = [s for s in sessions.data if s.get('company_id')]
        print(f"🏢 Sessions with Company IDs: {len(company_sessions)} / {len(sessions.data)}")

        # Audit Summary
        if len(linked_sessions) == 0 and len(sessions.data) > 0:
            print("⚠️ WARNING: sessions exist but are ORPHANED (no stakeholder_id).")
        if len(linked_opps) == 0 and len(opportunities.data) > 0:
            print("⚠️ WARNING: opportunities exist but are ORPHANED (no session_id).")

    except Exception as e:
        print(f"💥 Audit Error: {str(e)}")

if __name__ == "__main__":
    verify_mosi_links()
