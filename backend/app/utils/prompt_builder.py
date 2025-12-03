def build_rag_prompt(question: str, passages: list) -> str:
    header = """You are a helpful and precise assistant. Your task is to answer the user's question based ONLY on the provided passages.

IMPORTANT INSTRUCTIONS:
1. Answer ONLY using information from the passages below
2. Do NOT make up or infer information not in the passages
3. Structure your answer clearly with proper formatting
4. If the answer is not in the passages, say "I don't have this information in the documents"
5. Be concise, clear, and well-organized
6. Use bullet points or numbered lists when appropriate
7. Highlight key points with emphasis

PASSAGES:
"""
    
    body = ""
    for i, p in enumerate(passages, start=1):
        page_info = f"Page {p.get('page', 'N/A')}" if p.get('page') else "Document"
        body += f"\n[Passage {i}] ({page_info})\n{p.get('text', '')}\n"
    
    tail = f"""

QUESTION: {question}

ANSWER FORMAT:
- Start with a clear, direct answer
- Use bullet points or numbered lists for multiple points
- Keep paragraphs short and focused
- Use proper formatting for readability

ANSWER:"""
    
    return header + body + tail


def clean_answer(answer: str) -> str:
    """Clean and format the answer for better readability."""
    # Remove extra whitespace at the beginning and end
    answer = answer.strip()
    
    # Remove "ANSWER:" prefix if it exists
    if answer.startswith("ANSWER:"):
        answer = answer[7:].strip()
    
    # Remove excessive newlines (more than 2 consecutive)
    while "\n\n\n" in answer:
        answer = answer.replace("\n\n\n", "\n\n")
    
    # Clean up bullet points formatting
    lines = answer.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.rstrip()
        # Normalize bullet points
        if line.strip().startswith(('-', '•', '*')):
            # Ensure consistent bullet formatting
            content = line.strip()[1:].strip()
            cleaned_lines.append(f"- {content}")
        elif line.strip():
            cleaned_lines.append(line)
        else:
            cleaned_lines.append("")
    
    # Join and remove trailing empty lines
    answer = '\n'.join(cleaned_lines).rstrip()
    
    return answer
