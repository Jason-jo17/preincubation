from supabase import create_client, Client
from app.config import settings

supabase_client: Client = None

def init_supabase():
    global supabase_client
    try:
        supabase_client = create_client(settings.supabase_url, settings.supabase_key)
        print("✅ Supabase initialized successfully")
    except Exception as e:
        print(f"⚠️ Supabase initialization failed: {e}")
        # In a real app we might want to exit, but for dev with mocks we want to start
        supabase_client = None
    return supabase_client

def get_supabase() -> Client:
    if supabase_client is None:
        init_supabase()
    return supabase_client
