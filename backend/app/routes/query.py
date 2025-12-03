from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from app.services.vectorstore import vector_search
from app.services.ollama_client import generate_answer
from app.utils.prompt_builder import build_rag_prompt
from app.models.pydantic_models import SearchResponse
from app.services.auth_service import verify_token

router = APIRouter()

@router.get("/api/search", response_model=SearchResponse)
async def search_query(
    q: str,
    top_k: int = 12,  # Increased from 8 to get more context for better accuracy
    authorization: Optional[str] = Header(None)
):
    if not q:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

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

    try:
        # Search for relevant passages - retrieve more for better context and accuracy
        retrieved_passages = vector_search(q, user_id, top_k)
        if not retrieved_passages:
            return SearchResponse(answer="I don't have information about this in the documents. Please upload documents first.", sources=[])

        # Use top 8 passages for generating answer (better context)
        passages_for_answer = retrieved_passages[:8]
        
        prompt = build_rag_prompt(q, passages_for_answer)
        answer = generate_answer(prompt)
        
        # Return top 3 most relevant sources to user for reference
        top_sources = retrieved_passages[:3]
        
        return SearchResponse(answer=answer, sources=top_sources)
    except Exception as e:
        import traceback
        error_msg = f"Search error: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
