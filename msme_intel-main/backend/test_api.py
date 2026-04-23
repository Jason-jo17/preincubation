from app.services.supabase_service import get_supabase
import json

def test_query():
    supabase = get_supabase()
    try:
        # Test simplified query first
        res = supabase.table("companies").select("*, sectors(name)").limit(5).execute()
        print("Simple Query Success:", json.dumps(res.data, indent=2))
        
        # Test full query
        res_full = supabase.table("companies").select(
            "*, sectors(name), gap_analysis(rag_score, overall_potential_score)"
        ).limit(5).execute()
        print("Full Query Success:", json.dumps(res_full.data, indent=2))
        
    except Exception as e:
        print("Query Failed:", str(e))

if __name__ == "__main__":
    test_query()
