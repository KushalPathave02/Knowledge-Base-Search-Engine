# Deployment Guide - Knowledge Base Search Engine

## Overview
This guide covers deploying both the frontend and backend of the Knowledge Base Search Engine.

---

## Backend Deployment (Render)

### Prerequisites
- Render account (https://render.com)
- GitHub repository connected to Render
- MongoDB Atlas account (for cloud database)
- Ollama service (local or cloud)

### Step 1: Prepare Environment Variables
Create these environment variables in Render dashboard:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/knowledge_base
OLLAMA_HOST=http://your-ollama-server:11434
EMBED_MODEL_NAME=all-MiniLM-L6-v2
SECRET_KEY=your-secret-key-here
```

### Step 2: Deploy Backend
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in the following:
   - **Name**: `knowledge-base-backend`
   - **Runtime**: Python 3.11
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Starter ($7/month)

5. Add environment variables from Step 1
6. Click "Deploy Web Service"

### Backend URL
Once deployed, you'll get a URL like:
```
https://knowledge-base-backend.onrender.com
```

---

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (https://netlify.com)
- GitHub repository connected to Netlify

### Step 1: Update API Endpoint
Update the frontend API calls to use your backend URL:

In `/frontend/src/api/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://knowledge-base-backend.onrender.com';
```

### Step 2: Deploy Frontend
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Fill in the following:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. Add environment variable:
   - **REACT_APP_API_URL**: `https://knowledge-base-backend.onrender.com`

6. Click "Deploy site"

### Frontend URL
Once deployed, you'll get a URL like:
```
https://knowledge-base-search.netlify.app
```

---

## Important Configuration Notes

### CORS Setup (Backend)
Make sure your backend allows requests from your frontend domain:

In `backend/app/main.py`, update CORS settings:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://knowledge-base-search.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Database Connection
- Use MongoDB Atlas for cloud database
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

### Ollama Service
- If using local Ollama, you need to expose it publicly or use a cloud service
- Alternative: Use Hugging Face API or other LLM services

---

## Testing After Deployment

### Test Backend
```bash
curl https://knowledge-base-backend.onrender.com/api/search?q=test
```

### Test Frontend
Visit: `https://knowledge-base-search.netlify.app`

---

## Troubleshooting

### Backend not starting
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend API calls failing
- Check CORS settings in backend
- Verify API_BASE_URL is correct
- Check browser console for errors

### Slow response times
- Upgrade Render plan for better resources
- Optimize MongoDB queries
- Consider caching responses

---

## Cost Estimation

- **Backend (Render)**: $7/month (Starter)
- **Frontend (Netlify)**: Free tier available
- **Database (MongoDB Atlas)**: Free tier (512MB) or paid
- **Total**: ~$7-15/month

---

## Next Steps

1. Deploy backend first
2. Test backend endpoints
3. Update frontend API URL
4. Deploy frontend
5. Test full application flow
6. Monitor logs and performance

