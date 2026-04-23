from typing import Dict, Any, List
from app.models.company import Company, CompanyFinancials
from app.models.gap_analysis import GapAnalysis
from app.models.thesis import ThesisAnalysis

class ScreeningService:
    @staticmethod
    def calculate_financial_health(financials: CompanyFinancials) -> int:
        """
        Calculates a 0-100 score based on financial metrics.
        """
        score = 50 # Base score
        
        if financials.revenue_inr_lakhs and financials.revenue_inr_lakhs > 1000:
            score += 10
        if financials.profit_inr_lakhs and financials.profit_inr_lakhs > 0:
            score += 20
        if financials.cagr and financials.cagr > 15:
            score += 15
        if financials.ebitda_margin and financials.ebitda_margin > 10:
            score += 10
            
        return min(100, score)

    @staticmethod
    def determine_screening_classification(
        financial_score: int, 
        thesis_score: int, 
        market_opp_score: int
    ) -> str:
        """
        Determines the screening classification (Best Bet, Best Fit, Stretched Fit, Rejected)
        based on a matrix of Financial Health, Thesis Alignment, and Market Opportunity.
        """
        avg_score = (financial_score + thesis_score + market_opp_score) / 3
        
        if avg_score >= 80:
            return "best_bet"
        elif avg_score >= 65:
            return "best_fit"
        elif avg_score >= 50:
            return "stretched_fit"
        else:
            return "rejected"

    @staticmethod
    async def analyze_thesis_alignment(company: Company, thesis_content: str) -> Dict[str, Any]:
        """
        Uses AI (mocked or actual LLM) to analyze company against sector thesis.
        Returns score and proof points.
        """
        # TODO: Integrate with Claude/OpenAI for real analysis
        # For now, return a placeholder based on description presence
        
        if not company.description:
            return {"score": 30, "proofs": "Insufficient data for analysis."}
            
        score = 60
        proofs = "- Company description partially matches sector keywords.\n- Further investigation needed."
        
        return {"score": score, "proofs": proofs}
