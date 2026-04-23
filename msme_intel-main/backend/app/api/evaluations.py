# backend/app/api/evaluations.py

from fastapi import APIRouter, HTTPException
from typing import List, Optional, Dict, Any
from ..models.submission import CompanyEvaluation
from ..services.supabase_service import get_supabase
from datetime import datetime

router = APIRouter(prefix="/evaluations", tags=["Company Evaluations"])

@router.post("/")
async def create_evaluation(evaluation: Dict[str, Any]):
    """
    Submit a company evaluation and award building points to the student.
    """
    supabase = get_supabase()
    
    # 1. Save evaluation
    if "evaluated_at" not in evaluation:
        evaluation["evaluated_at"] = datetime.utcnow().isoformat()
        
    res = supabase.table('company_evaluations').insert(evaluation).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create evaluation")
        
    evaluation_id = res.data[0]['id']
    submission_id = evaluation.get("submission_id")
    final_score = evaluation.get("overall_score", 0)

    # 2. Finalize Submission Status
    supabase.table('student_submissions').update({
        "status": "evaluated",
        "final_score": final_score
    }).eq('id', submission_id).execute()
    
    # 3. Reward Points to Student
    # Get student_id from submission
    sub_res = supabase.table('student_submissions').select('student_id').eq('id', submission_id).single().execute()
    if sub_res.data:
        student_id = sub_res.data['student_id']
        # Points = overall_score * 10
        points_to_add = int(final_score * 10)
        
        # Incremental update: Retrieve current and add
        student_res = supabase.table('students').select('total_points').eq('id', student_id).single().execute()
        current_points = student_res.data.get('total_points', 0) if student_res.data else 0
        
        supabase.table('students').update({
            'total_points': current_points + points_to_add
        }).eq('id', student_id).execute()
    
    return res.data[0]

@router.get("/submission/{submission_id}")
async def get_evaluations_for_submission(submission_id: str):
    """
    Retrieve all evaluations for a specific submission.
    """
    supabase = get_supabase()
    res = supabase.table('company_evaluations').select('*').eq('submission_id', submission_id).execute()
    return res.data
