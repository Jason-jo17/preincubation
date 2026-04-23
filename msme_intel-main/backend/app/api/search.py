from fastapi import APIRouter, Query
from typing import List
from app.services.embeddings_service import EmbeddingsService
from app.services.supabase_service import get_supabase

router = APIRouter()
embeddings_service = EmbeddingsService()

@router.post("/semantic")
async def semantic_search(
    query: str,
    sector_id: str,
    limit: int = Query(5, le=20)
):
    """Perform semantic search across sector thesis documents"""
    try:
        results = embeddings_service.similarity_search(query, sector_id, limit)
        return {
            "query": query,
            "results": results
        }
    except Exception as e:
        return {
            "error": str(e),
            "results": []
        }

@router.get("/companies")
async def search_companies(
    q: str,
    limit: int = Query(20, le=100)
):
    """Full-text search for companies"""
    supabase = get_supabase()
    
    # Simple text search (can be enhanced with PostgreSQL full-text search)
    result = supabase.table("companies").select(
        "*, sectors(name)"
    ).ilike("name", f"%{q}%").limit(limit).execute()
    
    return result.data
