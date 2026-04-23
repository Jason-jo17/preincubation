
import json
import uuid
from datetime import date
from typing import List, Dict, Any
from app.services.claude_service import ClaudeService
from app.models.sector_thesis import SectorThesis, Citation

class SectorThesisAgent:
    def __init__(self):
        self.claude = ClaudeService()

    async def generate_thesis(self, sector_name: str, documents_context: str) -> SectorThesis:
        """
        Generates a comprehensive sector thesis using Claude, based on uploaded documents.
        """
        
        system_prompt = """
        You are an expert Equity Research Analyst at a top-tier investment bank. 
        Your task is to generate a comprehensive "Sector Thesis" for the Indian MSME landscape based on the provided research documents.
        
        You must output a STRICT JSON object matching the following schema. Do not include markdown formatting like ```json ... ```.
        
        Schema Structure:
        {
          "display_name": "Sector Name",
          "executive_summary": "Detailed summary with inline citations like [^1]",
          "investment_thesis": "Why invest in this sector now?",
          "key_findings": ["Finding 1 [^1]", "Finding 2 [^2]"],
          "market_stats": {
            "current_size": 123456789 (in USD),
            "current_size_display": "$1.2 Billion",
            "forecast_size": 987654321,
            "forecast_size_display": "$9.8 Billion",
            "cagr": 15.5,
            "forecast_year": 2030,
            "currency": "USD"
          },
          "market_structure": {
             "total_companies": 500,
             "msme_percentage": 75.5,
             "organized_split": {"organized": 40, "unorganized": 60},
             "geographic_distribution": {"State1": 30, "State2": 20}
          },
          "sub_sectors": [
            {
               "name": "Sub Sector 1",
               "description": "...",
               "market_size": 100,
               "cagr": 10,
               "growth_drivers": ["..."],
               "key_players": ["..."],
               "msme_opportunity_score": 85,
               "citation_ids": ["c1", "c2"]
            }
          ],
          "growth_drivers": [
            {
                "name": "Driver Name",
                "type": "policy",
                "impact_level": "high",
                "description": "...",
                "estimated_impact_percentage": 25,
                "citation_ids": ["c1"]
            }
          ],
          "opportunities": [
             {
               "title": "Opportunity 1",
               "type": "manufacturing",
               "description": "...",
               "market_size_estimate": 50,
               "overall_score": 9.0,
               "capital_requirement": "10-20L",
               "time_to_market_months": 6,
               "citation_ids": ["c1"]
             }
          ],
          "policies": [
             {
               "name": "Policy Name",
               "type": "Incentive",
               "description": "...",
               "impact": "High",
               "status": "active",
               "citation_ids": ["c2"]
             }
          ],
          "risks": [
             {
                "name": "Risk Name",
                "category": "market",
                "severity": "high",
                "probability": 0.8,
                "description": "...",
                "mitigation": ["..."],
                "citation_ids": ["c3"]
             }
          ],
          "competitors": [
             {
                "name": "Company A",
                "type": "private_sector",
                "revenue": 1000,
                "market_share": 25,
                "key_strengths": ["..."],
                "citation_ids": []
             }
          ],
           "citations": [
             {
               "id": "c1",
               "citation_key": "Author_Year_Keyword",
               "citation_number": 1,
               "source_type": "report",
               "source_name": "Report Name",
               "publication_year": 2024,
               "title": "Full Title",
               "url": "https://...",
               "reliability_score": 9,
               "excerpt": "Quote from text",
               "geographic_focus": ["India"]
             }
           ]
        }

        EXAMPLE OUTPUT (Truncated for pattern matching):
        {
            "display_name": "Artificial Intelligence",
            "executive_summary": "India's AI market stands at $7.6-13B [^1]...",
            "sub_sectors": [
                {
                    "name": "Machine Learning Platforms",
                    "market_size": 5950,
                    "cagr": 38.5,
                    "citation_ids": ["c3", "c10"]
                }
            ],
            "citations": [
                {
                    "id": "c3",
                    "citation_key": "FBI_2024_ai_india",
                    "source_name": "Fortune Business Insights",
                    "excerpt": "AI market $9.51B in 2024...",
                    "reliability_score": 8
                }
            ]
        }
        
        CRITICAL INSTRUCTIONS:
        1. create a Bibliography of citations from the input text. Assign each citation a unique ID (c1, c2, etc.) and a sequential citation_number (1, 2, ...).
        2. Use the citation number in the text as [^1], [^2].
        3. Populate 'citation_ids' arrays in sub-objects with the corresponding IDs ("c1").
        4. Ensure all numbers are realistic and consistent.
        """
        
        user_prompt = f"""
        Generate a detailed sector thesis for the sector: "{sector_name}".
        
        Use the following extracted text from uploaded research documents as the source of truth:
        
        {documents_context[:50000]}
        
        If the documents are insufficient, use your internal knowledge but mark citations as "AI Generated Estimate".
        """

        try:
            # Call Claude (simulate async for now if ClaudeService isn't async)
            response_text = self.claude.create_message(
                system=system_prompt,
                user_message=user_prompt,
                model="claude-sonnet-4-20250514",
                max_tokens=4000
            )
            
            # Parse JSON
            try:
                # Remove any potential markdown fencing
                clean_json = response_text.replace("```json", "").replace("```", "").strip()
                data = json.loads(clean_json)
                
                # Add ID and Metadata
                data['id'] = str(uuid.uuid4())
                data['status'] = 'draft'
                data['research_date'] = date.today().isoformat()
                
                # Validate with Pydantic
                thesis = SectorThesis(**data)
                return thesis
                
            except json.JSONDecodeError:
                print(f"Failed to decode Claude response: {response_text}")
                raise Exception("AI failed to generate valid JSON")
                
        except Exception as e:
            print(f"Error generating thesis: {e}")
            raise
