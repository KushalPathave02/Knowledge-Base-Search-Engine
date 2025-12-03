import ollama
from app.config import Config

client = ollama.Client(host=Config.OLLAMA_BASE_URL)

def generate_answer(prompt: str, model: str = "mistral"):
    """
    Generate answer using Ollama with optimized parameters for accuracy.
    
    Models available (in order of accuracy):
    - mistral: Fast and accurate, good for RAG
    - neural-chat: Optimized for conversations
    - llama2: General purpose
    - llama3: Larger but slower
    """
    try:
        response = client.generate(
            model=model,
            prompt=prompt,
            stream=False
        )
        return response['response'].strip()
    except Exception as e:
        # Handle potential connection errors or other issues with Ollama service
        print(f"Error calling Ollama: {e}")
        return "I am sorry, but I am unable to generate an answer at this time."
