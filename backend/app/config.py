import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGO_URI', "mongodb://localhost:27017/")
    OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL', "http://localhost:11434")
    EMBEDDING_MODEL = os.getenv('EMBEDDING_MODEL', "all-MiniLM-L6-v2")
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-this-in-production')
