from fastapi import APIRouter, HTTPException
from app.models.user_models import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import register_user, login_user, verify_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister):
    """Register a new user."""
    result = register_user(user_data.email, user_data.password, user_data.name)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Login a user."""
    result = login_user(user_data.email, user_data.password)
    
    if "error" in result:
        raise HTTPException(status_code=401, detail=result["error"])
    
    return result

@router.get("/verify")
async def verify(token: str):
    """Verify a token."""
    user_id = verify_token(token)
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return {"user_id": user_id, "valid": True}
