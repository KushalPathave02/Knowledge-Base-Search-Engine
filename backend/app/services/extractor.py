from pypdf import PdfReader
from app.utils.text_utils import chunk_text
from typing import IO
import re

def extract_text_from_pdf(file: IO):
    """
    Extract text from PDF with improved handling of tables and structured data.
    Preserves formatting and spacing to maintain table structure.
    """
    reader = PdfReader(file)
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            # Clean up text while preserving structure
            text = clean_extracted_text(text)
            
            # Split into logical sections (paragraphs, tables, etc.)
            sections = split_into_sections(text)
            
            for section in sections:
                for chunk in chunk_text(section, chunk_size=600, overlap=150):
                    if chunk.strip():  # Only yield non-empty chunks
                        yield {
                            "page": page_num + 1,
                            "text": chunk
                        }

def clean_extracted_text(text: str) -> str:
    """
    Clean extracted text while preserving important formatting.
    - Remove excessive whitespace but keep line breaks
    - Preserve table-like structures with multiple spaces
    """
    # Normalize line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    
    # Remove excessive blank lines (more than 2 consecutive)
    text = re.sub(r'\n\n\n+', '\n\n', text)
    
    # Preserve spacing in table-like content (lines with multiple spaces)
    # Don't collapse spaces that appear to be part of table formatting
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # If line has multiple consecutive spaces, it's likely a table
        if '  ' in line:  # Multiple spaces = table formatting
            cleaned_lines.append(line)
        else:
            # For regular text, normalize single spaces
            line = ' '.join(line.split())
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)

def split_into_sections(text: str) -> list:
    """
    Split text into logical sections to preserve context.
    Keeps tables and structured data together.
    """
    # Split by double newlines (paragraph breaks)
    sections = text.split('\n\n')
    
    # Merge small sections with next section to avoid fragmentation
    merged_sections = []
    current_section = ""
    
    for section in sections:
        current_section += section + '\n\n'
        
        # Keep sections together if they're small or part of a table
        if len(current_section) > 300 or section.count('\n') > 5:
            merged_sections.append(current_section.strip())
            current_section = ""
    
    if current_section.strip():
        merged_sections.append(current_section.strip())
    
    return merged_sections
