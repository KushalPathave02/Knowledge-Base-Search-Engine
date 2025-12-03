# Environment Variables Setup Guide

## Frontend Environment Variables

### Local Development (.env file)
Create a `.env` file in the `frontend/` folder:

```
VITE_API_URL=http://localhost:8000
```

### Production (Netlify)
Set these environment variables in Netlify dashboard:

**Variable Name:** `VITE_API_URL`
**Value:** `https://knowledge-base-search-engine-c9fv.onrender.com`

#### Steps to add in Netlify:
1. Go to your Netlify site dashboard
2. Click **Site settings**
3. Go to **Build & deploy** → **Environment**
4. Click **Edit variables**
5. Add new variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://knowledge-base-search-engine-c9fv.onrender.com`
6. Click **Save**
7. Trigger a new deploy

---

## Backend Environment Variables

### Local Development (.env file)
Create a `.env` file in the `backend/` folder:

```
MONGO_URI=mongodb://localhost:27017/knowledge_base
OLLAMA_HOST=http://localhost:11434
EMBED_MODEL_NAME=all-MiniLM-L6-v2
SECRET_KEY=your-secret-key-here
```

### Production (Render)
Set these environment variables in Render dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGO_URI` | `mongodb+srv://username:password@cluster.mongodb.net/knowledge_base` | Use MongoDB Atlas connection string |
| `OLLAMA_HOST` | `http://your-ollama-server:11434` | Your Ollama service URL |
| `EMBED_MODEL_NAME` | `all-MiniLM-L6-v2` | Embedding model name |
| `SECRET_KEY` | `your-secret-key-here` | Generate a strong secret key |

#### Steps to add in Render:
1. Go to your Render service dashboard
2. Click **Environment**
3. Add each variable:
   - Click **Add Environment Variable**
   - Enter **Key** and **Value**
   - Click **Save**
4. Render will automatically redeploy

---

## Important Notes

### VITE_ Prefix
- Frontend environment variables must start with `VITE_` to be accessible in Vite
- Example: `VITE_API_URL` (not just `API_URL`)

### MongoDB Connection String
- For local: `mongodb://localhost:27017/knowledge_base`
- For cloud (MongoDB Atlas): `mongodb+srv://username:password@cluster.mongodb.net/knowledge_base`

### Secret Key Generation
Generate a strong secret key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### CORS Configuration
If you get CORS errors, update `backend/app/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-netlify-domain.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is set correctly in Netlify
- Verify backend URL is accessible
- Check browser console for CORS errors

### Backend can't connect to MongoDB
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes Render IP
- Test connection string locally first

### Ollama not responding
- Verify `OLLAMA_HOST` is correct
- Check Ollama service is running
- Ensure firewall allows connections

