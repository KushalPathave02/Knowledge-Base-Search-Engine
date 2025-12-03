from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from app.services.auth_service import verify_token, save_chat_history, get_chat_history, get_chat_by_id, delete_chat
from app.models.user_models import ChatHistory

router = APIRouter(prefix="/api/history", tags=["history"])

def get_user_id_from_token(authorization: Optional[str] = Header(None)):
    """Extract and verify user ID from authorization header."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return user_id

@router.post("/save")
async def save_history(chat: ChatHistory, authorization: Optional[str] = Header(None)):
    """Save a chat to history."""
    user_id = get_user_id_from_token(authorization)
    
    chat_id = save_chat_history(user_id, chat.title, chat.messages)
    
    return {
        "id": chat_id,
        "message": "Chat saved successfully"
    }

@router.get("/list")
async def list_history(authorization: Optional[str] = Header(None)):
    """Get all chat histories for the user."""
    user_id = get_user_id_from_token(authorization)
    
    chats = get_chat_history(user_id)
    
    return {
        "chats": chats,
        "count": len(chats)
    }

@router.get("/{chat_id}")
async def get_history(chat_id: str, authorization: Optional[str] = Header(None)):
    """Get a specific chat by ID."""
    user_id = get_user_id_from_token(authorization)
    
    chat = get_chat_by_id(chat_id, user_id)
    
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    return chat

@router.delete("/{chat_id}")
async def delete_history(chat_id: str, authorization: Optional[str] = Header(None)):
    """Delete a chat."""
    user_id = get_user_id_from_token(authorization)
    
    success = delete_chat(chat_id, user_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    return {"message": "Chat deleted successfully"}
