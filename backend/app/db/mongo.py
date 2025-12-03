from pymongo import MongoClient
from app.config import Config

MONGO_URI = Config.MONGO_URI
client = MongoClient(MONGO_URI)
db = client['knowledge_base']

documents_collection = db['documents']
passages_collection = db['passages']
users_collection = db['users']
chat_history_collection = db['chat_history']

def get_db():
    return db
