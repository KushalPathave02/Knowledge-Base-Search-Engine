from fastapi import APIRouter, HTTPException
from app.db.mongo import documents_collection
from bson import ObjectId
from typing import List

router = APIRouter()

@router.get("/api/documents")
async def list_documents():
    docs = []
    for doc in documents_collection.find():
        docs.append({
            "id": str(doc["_id"]),
            "title": doc["title"]
        })
    return docs

@router.get("/api/documents/{id}")
async def get_document(id: str):
    try:
        doc = documents_collection.find_one({"_id": ObjectId(id)})
        if doc:
            return {
                "id": str(doc["_id"]),
                "title": doc["title"]
            }
        raise HTTPException(status_code=404, detail="Document not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid document ID")
