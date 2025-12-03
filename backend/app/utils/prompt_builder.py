def build_rag_prompt(question: str, passages: list) -> str:
    """
    Build an optimized RAG prompt for accurate answers.
    Uses clear structure and strict instructions for better LLM accuracy.
    """
    header = """You are a precise and factual assistant. Your task is to answer questions ONLY based on the provided passages.

CRITICAL RULES:
1. ONLY use information from the passages below - NO external knowledge
2. Quote or reference the specific passage when answering
3. If the answer is NOT in the passages, respond: "I don't have this information in the provided documents"
4. Do NOT infer, assume, or add information not explicitly stated
5. Be concise and direct - answer only what is asked
6. If multiple passages are relevant, combine them logically

PASSAGES:
"""
    
    body = ""
    for i, p in enumerate(passages, start=1):
        page_info = p.get('page', 'N/A')
        text = p.get('text', '').strip()
        body += f"[Passage {i}] (Page {page_info})\n{text}\n\n"
    
    tail = f"""QUESTION: {question}

ANSWER: (Reference the passage number(s) and be specific)"""
    
    return header + body + tail
