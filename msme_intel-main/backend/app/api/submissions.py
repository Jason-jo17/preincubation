# backend/app/api/submissions.py

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from ..models.submission import StudentSubmission, SubmissionCreate
from ..services.supabase_service import get_supabase
import uuid

router = APIRouter(prefix="/submissions", tags=["Student Submissions"])

@router.post("/", response_model=StudentSubmission)
async def create_submission(submission: SubmissionCreate):
    """
    Submit a solution for a BuildForX PRD challenge.
    """
    supabase = get_supabase()
    
    # Generate unique code if not provided
    if not submission.submission_code:
        submission.submission_code = f"SUB-{uuid.uuid4().hex[:8].upper()}"
        
    submission_data = submission.model_dump(exclude_none=True)
    
    res = supabase.table('student_submissions').insert(submission_data).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create submission")
        
    return res.data[0]

@router.get("/prd/{prd_id}", response_model=List[StudentSubmission])
async def get_submissions_by_prd(prd_id: str):
    """
    Retrieve all submissions for a specific PRD challenge.
    """
    supabase = get_supabase()
    res = supabase.table('student_submissions').select('*').eq('prd_id', prd_id).execute()
    return res.data

@router.get("/{submission_id}", response_model=StudentSubmission)
async def get_submission_details(submission_id: str):
    """
    Retrieve detailed view of a specific student submission.
    """
    supabase = get_supabase()
    res = supabase.table('student_submissions').select('*, buildforx_prds(title, prd_code)').eq('id', submission_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Submission not found")
    return res.data

@router.get("/company/{company_id}", response_model=List[StudentSubmission])
async def list_company_submissions(company_id: str):
    """
    List all submissions for all PRDs belonging to a specific company.
    """
    supabase = get_supabase()
    # Join with buildforx_prds to filter by company_id
    res = supabase.table('student_submissions').select('*, buildforx_prds!inner(company_id, title)').eq('buildforx_prds.company_id', company_id).execute()
    return res.data
