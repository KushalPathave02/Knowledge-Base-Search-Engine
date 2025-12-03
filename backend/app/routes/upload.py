from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header
from typing import Optional
import logging
from io import BytesIO
from app.services.extractor import extract_text_from_pdf
from app.services.vectorstore import create_document_and_passages
from app.services.auth_service import verify_token

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/api/upload")
async def upload_document(
    title: str = Form(...),
    file: UploadFile = File(...),
    authorization: Optional[str] = Header(None)
):
    # Get user_id from token
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    # Check file extension and content type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Content type check (allow variations)
    allowed_types = ["application/pdf", "application/x-pdf", "application/octet-stream"]
    if file.content_type and file.content_type not in allowed_types:
        logger.warning(f"Unusual content type for PDF: {file.content_type}")
        # Still allow it, just log the warning
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Create a BytesIO object from the content
        file_bytes = BytesIO(file_content)
        
        passages_data = list(extract_text_from_pdf(file_bytes))
        if not passages_data:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        doc_id = create_document_and_passages(title, passages_data, user_id)
        return {"job_id": doc_id, "status": "completed"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
