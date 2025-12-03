# Knowledge-Base Search Engine (RAG System using OLLAMA + Python + React + MongoDB Atlas)

This project is a searchable knowledge-base that can ingest documents (PDFs / text), index them semantically (embeddings), and answer user queries by retrieving relevant documents and synthesizing concise, accurate answers using a local/cloud LLM (Ollama).

## High-Level Architecture

```
 ┌─────────────┐        ┌─────────────────────────┐
 │ React UI    │ <----> │ Python FastAPI Backend  │
 │ (User Query │        │ - Document Upload       │
 │  Display)   │        │ - Embedding Generation  │
 └─────────────┘        │ - Vector DB Search      │
                         │ - LLM (Ollama) Answer   │
                         └─────────────────────────┘
                                      |
                             ┌───────────────────┐
                             │ MongoDB Atlas     │
                             │ - Documents       │
                             │ - Embeddings      │
                             └───────────────────┘
```

## Setup and Run Instructions

_Instructions to be added._
