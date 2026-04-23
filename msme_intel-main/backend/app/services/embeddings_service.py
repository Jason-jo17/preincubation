from openai import OpenAI
from typing import List, Dict
from app.config import settings
from app.services.supabase_service import get_supabase

client = OpenAI(api_key=settings.openai_api_key)

class EmbeddingsService:
    
    @staticmethod
    def generate_embedding(text: str) -> List[float]:
        """Generate embedding for text using OpenAI"""
        try:
            response = client.embeddings.create(
                input=text,
                model="text-embedding-3-small"
            )
            return response.data[0].embedding
        except Exception as e:
            print(f"OpenAI embeddings error: {e}")
            raise
    
    @staticmethod
    def similarity_search(query: str, sector_id: str, limit: int = 5) -> List[Dict]:
        """Search sector thesis vectors using pgvector similarity"""
        supabase = get_supabase()
        
        # Generate query embedding
        query_embedding = EmbeddingsService.generate_embedding(query)
        
        # Use pgvector similarity search
        try:
            result = supabase.rpc(
                'match_sector_thesis',
                {
                    'query_embedding': query_embedding,
                    'match_threshold': 0.7,
                    'match_count': limit,
                    'sector_filter': sector_id
                }
            ).execute()
            
            return result.data
        except Exception as e:
            print(f"Vector search error: {e}")
            raise
