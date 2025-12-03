from sentence_transformers import SentenceTransformer
from app.config import Config

_model = None

def load_model():
    global _model
    if _model is None:
        _model = SentenceTransformer(Config.EMBEDDING_MODEL)
    return _model

def embed_text(text):
    model = load_model()
    vec = model.encode(text)
    return vec.tolist()
