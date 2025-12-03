from pydantic import BaseModel
from typing import List, Optional

class Document(BaseModel):
    id: str
    title: str
    user_id: str
    tags: Optional[List[str]] = None

class Passage(BaseModel):
    doc_id: str
    doc_title: str
    page: int
    text: str
    score: Optional[float] = None

class SearchResponse(BaseModel):
    answer: str
    sources: List[Passage]
