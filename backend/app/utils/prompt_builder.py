def build_rag_prompt(question: str, passages: list) -> str:
    """
    Build an optimized RAG prompt for accurate answers.
    Uses clear structure and strict instructions for better LLM accuracy.
    Handles tables, numbers, and structured data properly.
    """
    header = """You are a precise and factual assistant. Your task is to answer questions ONLY based on the provided passages.

CRITICAL RULES:
1. ONLY use information from the passages below - NO external knowledge
2. Pay special attention to numbers, tables, and structured data
3. Quote or reference the specific passage when answering
4. If the answer is NOT in the passages, respond: "I don't have this information in the provided documents"
5. Do NOT infer, assume, or add information not explicitly stated
6. Be concise and direct - answer only what is asked
7. If multiple passages are relevant, combine them logically
8. For tables and structured data: preserve the exact numbers and relationships shown
9. If a question asks about specific values or statistics, provide exact numbers from the passages

PASSAGES:
"""
    
    body = ""
    for i, p in enumerate(passages, start=1):
        page_info = p.get('page', 'N/A')
        text = p.get('text', '').strip()
        
        # Preserve formatting for better readability
        body += f"[Passage {i}] (Page {page_info})\n"
        body += f"{text}\n"
        body += "-" * 80 + "\n\n"
    
    tail = f"""QUESTION: {question}

ANSWER: (Reference the passage number(s), be specific, and preserve exact numbers/values from tables)"""
    
    return header + body + tail
