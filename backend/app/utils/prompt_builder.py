def build_rag_prompt(question: str, passages: list) -> str:
    header = """You are a precise assistant. Follow these rules STRICTLY:
1. Answer ONLY using the passages provided below
2. Do NOT make up or infer information
3. If the exact answer is not in the passages, say "I don't have this information in the documents"
4. Answer the EXACT question asked - do not answer different questions
5. Be concise and direct

Passages:
"""
    
    body = ""
    for i, p in enumerate(passages, start=1):
        body += f"[{i}] (Page {p.get('page', 'N/A')}) {p.get('text', '')}\n\n"
    
    tail = f"\nQuestion: {question}\n\nAnswer: (Be specific and only answer this question)"
    
    return header + body + tail
