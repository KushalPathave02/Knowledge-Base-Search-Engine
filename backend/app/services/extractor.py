from pypdf import PdfReader
from app.utils.text_utils import chunk_text
from typing import IO

def extract_text_from_pdf(file: IO):
    reader = PdfReader(file)
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            for chunk in chunk_text(text):
                yield {
                    "page": page_num + 1,
                    "text": chunk
                }
