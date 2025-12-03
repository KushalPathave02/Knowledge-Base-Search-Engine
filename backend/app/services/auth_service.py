import jwt
import bcrypt
from datetime import datetime, timedelta
from app.config import Config
from app.db.mongo import users_collection, chat_history_collection
from bson.objectid import ObjectId

SECRET_KEY = Config.SECRET_KEY or "your-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(user_id: str, expires_delta: timedelta = None) -> str:
    """Create a JWT access token."""
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    expire = datetime.utcnow() + expires_delta
    to_encode = {"sub": user_id, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> str:
    """Verify a JWT token and return the user_id."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def register_user(email: str, password: str, name: str):
    """Register a new user."""
    # Check if user already exists
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return {"error": "User already exists"}
    
    # Hash password and create user
    hashed_password = hash_password(password)
    user_data = {
        "email": email,
        "password": hashed_password,
        "name": name,
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = users_collection.insert_one(user_data)
    user_id = str(result.inserted_id)
    
    # Create access token
    token = create_access_token(user_id)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": email,
            "name": name,
            "created_at": user_data["created_at"]
        }
    }

def login_user(email: str, password: str):
    """Login a user."""
    user = users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        return {"error": "Invalid email or password"}
    
    user_id = str(user["_id"])
    token = create_access_token(user_id)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user["email"],
            "name": user["name"],
            "created_at": user["created_at"]
        }
    }

def save_chat_history(user_id: str, title: str, messages: list):
    """Save a chat conversation to history."""
    chat_data = {
        "user_id": user_id,
        "title": title,
        "messages": messages,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    result = chat_history_collection.insert_one(chat_data)
    return str(result.inserted_id)

def get_chat_history(user_id: str):
    """Get all chat histories for a user."""
    chats = list(chat_history_collection.find(
        {"user_id": user_id},
        {"messages": 0}  # Don't return full messages in list
    ).sort("created_at", -1))
    
    return [
        {
            "id": str(chat["_id"]),
            "title": chat["title"],
            "created_at": chat["created_at"],
            "updated_at": chat["updated_at"]
        }
        for chat in chats
    ]

def get_chat_by_id(chat_id: str, user_id: str):
    """Get a specific chat by ID (verify ownership)."""
    chat = chat_history_collection.find_one({
        "_id": ObjectId(chat_id),
        "user_id": user_id
    })
    
    if not chat:
        return None
    
    return {
        "id": str(chat["_id"]),
        "title": chat["title"],
        "messages": chat["messages"],
        "created_at": chat["created_at"],
        "updated_at": chat["updated_at"]
    }

def delete_chat(chat_id: str, user_id: str):
    """Delete a chat (verify ownership)."""
    result = chat_history_collection.delete_one({
        "_id": ObjectId(chat_id),
        "user_id": user_id
    })
    
    return result.deleted_count > 0
