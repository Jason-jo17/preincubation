from typing import Dict, List
from app.services.embeddings_service import EmbeddingsService
from app.services.supabase_service import get_supabase

class MatchingAgent:
    
    def match_ecosystem_services(self, company_id: str, gap_analysis: Dict, limit: int = 5) -> List[Dict]:
        """Match company with relevant ecosystem services based on gap analysis"""
        supabase = get_supabase()
        
        # Extract critical gaps and build search query
        critical_gaps = gap_analysis.get("critical_gaps", [])
        search_query = " ".join(critical_gaps)
        
        # Get all ecosystem services
        services_result = supabase.table("ecosystem_services").select("*").execute()
        services = services_result.data
        
        # Simple matching based on service tags and gaps
        matches = []
        for service in services:
            service_tags = service.get("service_tags", [])
            
            # Calculate relevance score
            relevance_score = 0
            matching_rationale = []
            
            # Check if service tags match any critical gaps
            for gap in critical_gaps:
                gap_lower = gap.lower()
                for tag in service_tags:
                    if tag.lower() in gap_lower or gap_lower in tag.lower():
                        relevance_score += 20
                        matching_rationale.append(f"Addresses {gap}")
            
            if relevance_score > 0:
                matches.append({
                    "service_id": service["id"],
                    "service_name": service["name"],
                    "category": service["category"],
                    "relevance_score": min(relevance_score, 100),
                    "matching_rationale": " | ".join(matching_rationale[:3])
                })
        
        # Sort by relevance score and return top matches
        matches.sort(key=lambda x: x["relevance_score"], reverse=True)
        return matches[:limit]
