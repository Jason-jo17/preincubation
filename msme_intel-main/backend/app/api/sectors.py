
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
from app.agents.sector_thesis_agent import SectorThesisAgent
from app.models.sector_thesis import SectorThesis
import pypdf
import io

router = APIRouter()
agent = SectorThesisAgent()

@router.post("/generate", response_model=SectorThesis)
async def generate_sector_thesis(
    sector_name: str = Form(...),
    files: List[UploadFile] = File(...)
):
    """
    Generate a sector thesis from uploaded documents (PDF/TXT).
    """
    try:
        combined_text = ""
        
        # Simple text extraction (mocking PDF parsing for brevity, in prod use PyPDF2/Textract)
        for file in files:
            content = await file.read()
            file_text = ""
            if file.filename.lower().endswith('.pdf'):
                try:
                    reader = pypdf.PdfReader(io.BytesIO(content))
                    file_text = "\n".join(
                        page.extract_text() or "" for page in reader.pages
                    )
                except Exception:
                    file_text = f"[Could not extract PDF: {file.filename}]"
            else:
                try:
                    file_text = content.decode('utf-8')
                except UnicodeDecodeError:
                    file_text = f"[Binary file: {file.filename}]"
            
            combined_text += f"\n--- Source: {file.filename} ---\n{file_text}\n"

        # Generate Thesis
        thesis = await agent.generate_thesis(sector_name, combined_text)
        return thesis

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
