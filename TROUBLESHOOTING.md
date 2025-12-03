# Troubleshooting Guide - Knowledge Base Search Engine

## Problem: Model is not giving answers

### Check 1: Is MongoDB Running?
```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start MongoDB
mongod --dbpath /path/to/data/directory

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Check 2: Is Ollama Running?
```bash
# Check if Ollama is running
ps aux | grep ollama

# If not running, start Ollama
ollama serve

# In another terminal, verify Ollama is working
curl http://localhost:11434/api/tags
```

### Check 3: Is Mistral Model Downloaded?
```bash
# List available models
ollama list

# If mistral is not listed, pull it
ollama pull mistral

# Test the model
ollama run mistral "Hello, how are you?"
```

### Check 4: Have You Uploaded Documents?
1. Login to the application
2. Click the upload button (📄)
3. Upload a PDF file
4. Wait for upload to complete
5. Then try searching

### Check 5: Check Backend Logs
```bash
# In the backend directory, run with debug output
cd backend
python -m uvicorn app.main:app --reload --log-level debug
```

### Check 6: Verify MongoDB Connection
```bash
# Connect to MongoDB
mongo

# Check if database exists
show databases

# Check if knowledge_base database has collections
use knowledge_base
show collections

# Check if documents exist
db.documents.find()
db.passages.find()
```

### Check 7: Test API Endpoints
```bash
# Get your token first (from login response)
TOKEN="your_token_here"

# Test search endpoint
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/search?q=test"

# Test health check
curl http://localhost:8000/api/health
```

## Common Issues and Solutions

### Issue: "I don't have information about this in the documents"
- **Solution**: Upload documents first, then search

### Issue: Ollama connection refused
- **Solution**: Start Ollama with `ollama serve`

### Issue: MongoDB connection refused
- **Solution**: Start MongoDB service

### Issue: Mistral model not found
- **Solution**: Run `ollama pull mistral`

### Issue: Slow responses
- **Solution**: This is normal for first query. Mistral model takes time to load.

## Environment Setup

Make sure `.env` file has correct values:
```
MONGO_URI=mongodb://localhost:27017/
OLLAMA_BASE_URL=http://localhost:11434
EMBED_MODEL_NAME=all-MiniLM-L6-v2
```

## Quick Start Commands

```bash
# Terminal 1: Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo

# Terminal 2: Start Ollama
ollama serve

# Terminal 3: Pull Mistral model
ollama pull mistral

# Terminal 4: Start Backend
cd backend
python -m uvicorn app.main:app --reload

# Terminal 5: Start Frontend
cd frontend
npm run dev
```

Then:
1. Open http://localhost:5173
2. Login/Signup
3. Upload a PDF
4. Ask a question
