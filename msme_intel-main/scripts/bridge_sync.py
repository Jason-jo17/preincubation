import os
import json
import httpx
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from the root .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# MSME Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") # Use service key to bypass RLS

# Target Bridge Configuration
BRIDGE_API_URL = "http://localhost:3005/api/bridge/msme-intel"
BRIDGE_SECRET = os.getenv("BRIDGE_SECRET")

def bridge_sync():
    """
    Synchronizes MOSI intelligence data from MSME Supabase to the Stakeholder Directory API.
    """
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Error: MSME Supabase credentials not found in .env")
        return

    if not BRIDGE_SECRET:
        print("❌ Error: BRIDGE_SECRET not found in .env")
        return

    print(f"🎬 Starting Bridge Sync from MSME to Stakeholder Directory...")

    try:
        # 1. Initialize Supabase Client
        client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

        # 2. Fetch MOSI Data
        print("📥 Fetching MOSI Stakeholders...")
        stakeholders = client.table("mosi_stakeholders").select("*").execute()
        
        print("📥 Fetching MOSI Sessions...")
        sessions = client.table("mosi_sessions").select("*").execute()
        
        print("📥 Fetching MOSI Opportunities...")
        opportunities = client.table("mosi_opportunities").select("*").execute()

        payload = {
            "stakeholders": stakeholders.data,
            "sessions": sessions.data,
            "opportunities": opportunities.data
        }

        print(f"📤 Pushing data to Bridge API: {BRIDGE_API_URL}")
        
        # 3. POST to Bridge API
        headers = {
            "X-Bridge-Auth": BRIDGE_SECRET,
            "Content-Type": "application/json"
        }

        with httpx.Client(timeout=30.0) as http_client:
            response = http_client.post(BRIDGE_API_URL, json=payload, headers=headers)
            
            if response.status_code == 200:
                result = response.json()
                print("✅ Sync Successful!")
                print(f"   - Stakeholders: {result['results']['stakeholdersSynced']}")
                print(f"   - Sessions: {result['results']['sessionsSynced']}")
                print(f"   - Opportunities: {result['results']['opportunitiesSynced']}")
            else:
                print(f"❌ Sync Failed (Status {response.status_code}):")
                print(f"   Response: {response.text}")

    except Exception as e:
        print(f"💥 Bridge Crash: {str(e)}")

if __name__ == "__main__":
    bridge_sync()
