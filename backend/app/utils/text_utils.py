def chunk_text(text: str, chunk_size: int = 500, overlap: int = 100):
    """Yields successive overlapping chunks from text."""
    if chunk_size <= overlap:
        raise ValueError("chunk_size must be greater than overlap")

    start = 0
    while start < len(text):
        end = start + chunk_size
        yield text[start:end]
        start += chunk_size - overlap
