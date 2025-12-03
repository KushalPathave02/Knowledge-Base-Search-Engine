import ollama
from app.config import Config

client = ollama.Client(host=Config.OLLAMA_BASE_URL)

def generate_answer(prompt: str, model: str = "llama3"):
    try:
        response = client.generate(
            model=model,
            prompt=prompt
        )
        return response['response']
    except Exception as e:
        # Handle potential connection errors or other issues with Ollama service
        print(f"Error calling Ollama: {e}")
        return "I am sorry, but I am unable to generate an answer at this time."
