from app.db.mongo import documents_collection, passages_collection
from app.services.embeddings import embed_text
from bson.objectid import ObjectId
import numpy as np

def create_document_and_passages(title: str, passages_data: list, user_id: str):
    doc_id = documents_collection.insert_one({
        "title": title,
        "user_id": user_id
    }).inserted_id

    passages_to_insert = []
    for passage in passages_data:
        embedding = embed_text(passage['text'])
        passages_to_insert.append({
            "doc_id": str(doc_id),
            "doc_title": title,
            "page": passage['page'],
            "text": passage['text'],
            "embedding": embedding,
            "user_id": user_id
        })
    
    if passages_to_insert:
        passages_collection.insert_many(passages_to_insert)
    
    return str(doc_id)

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors."""
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0
    return dot_product / (norm1 * norm2)

def vector_search(query: str, user_id: str, top_k: int = 8):
    query_embedding = embed_text(query)
    
    # Fetch passages only for this user
    all_passages = list(passages_collection.find(
        {"user_id": user_id},
        {"_id": 0}
    ))
    
    if not all_passages:
        return []
    
    # Calculate similarity scores for each passage
    scored_passages = []
    for passage in all_passages:
        score = cosine_similarity(query_embedding, passage['embedding'])
        passage['score'] = score
        scored_passages.append(passage)
    
    # Sort by score and return top_k
    scored_passages.sort(key=lambda x: x['score'], reverse=True)
    return scored_passages[:top_k]
