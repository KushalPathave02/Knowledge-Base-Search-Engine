# 📚 Knowledge-Base Search Engine

A **Retrieval-Augmented Generation (RAG)** system that allows users to upload PDF documents, ask questions, and get intelligent answers powered by local LLMs (Ollama). Built with React, Python FastAPI, MongoDB, and semantic search.

## ✨ Features

### Core Features
- **📄 Document Upload**: Upload PDF files and automatically extract text passages
- **🔍 Semantic Search**: Vector-based document retrieval using embeddings
- **🤖 AI-Powered Answers**: Generate accurate answers using Ollama LLM
- **💬 Chat History**: Save and manage conversation history with IST timestamps
- **👤 User Authentication**: Secure login/signup with JWT tokens
- **🔐 Password Security**: Bcrypt-based password hashing

### Advanced Features
- **Structured Answer Format**: Answers displayed with proper formatting (headings, bullet points, sections)
- **Relevance Scoring**: Shows how relevant each source is to the query
- **Multi-Document Search**: Search across all uploaded documents
- **Real-time Chat**: Instant responses with streaming support
- **Responsive UI**: Works on desktop and mobile devices
- **IST Timezone Support**: All timestamps in Indian Standard Time

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ • Login/Signup Page                                  │  │
│  │ • Chat Interface (SearchPage)                        │  │
│  │ • Document Upload Modal                             │  │
│  │ • Chat History Sidebar (IST Timestamps)             │  │
│  │ • Structured Answer Display                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Python FastAPI)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Authentication Service                               │  │
│  │ • User registration & login                          │  │
│  │ • JWT token generation & verification               │  │
│  │ • Password hashing (bcrypt)                          │  │
│  │ • IST timezone support                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Document Processing                                  │  │
│  │ • PDF text extraction                                │  │
│  │ • Passage chunking & storage                         │  │
│  │ • Embedding generation (sentence-transformers)      │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Search & Retrieval                                   │  │
│  │ • Vector similarity search (cosine)                  │  │
│  │ • Top-K passage retrieval                            │  │
│  │ • Relevance scoring                                  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ LLM Integration                                      │  │
│  │ • Ollama client for local LLMs                       │  │
│  │ • RAG prompt building                                │  │
│  │ • Answer formatting & cleaning                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Chat History Management                              │  │
│  │ • Save conversations                                 │  │
│  │ • Load chat history                                  │  │
│  │ • Delete conversations                               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────┘
                         │ Database Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Collections:                                         │  │
│  │ • users: User accounts & authentication              │  │
│  │ • documents: Uploaded PDF metadata                   │  │
│  │ • passages: Text chunks with embeddings              │  │
│  │ • chat_history: Conversation logs                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **React 19**: UI framework
- **Vite**: Build tool & dev server
- **Axios**: HTTP client
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

### Backend
- **Python 3.11**: Programming language
- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **PyMongo**: MongoDB driver
- **PyJWT**: JWT authentication
- **Bcrypt**: Password hashing
- **Sentence-Transformers**: Embedding generation
- **PyPDF**: PDF text extraction
- **Ollama**: Local LLM integration
- **Pytz**: Timezone support (IST)

### Database & Deployment
- **MongoDB Atlas**: Cloud database
- **Render**: Backend and frontend hosting

---

## 📋 Project Structure

```
Knowledge-Base-Search-Engine/
├── frontend/                          # React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx         # Auth page
│   │   │   ├── SearchPage.jsx        # Main chat interface
│   │   │   └── ResultPage.jsx        # Results display
│   │   ├── components/
│   │   │   ├── ChatHistory.jsx       # Chat sidebar
│   │   │   └── SourceSnippet.jsx     # Source display
│   │   ├── api/
│   │   │   └── api.js                # API client
│   │   ├── config/
│   │   │   └── constants.js          # API URL config
│   │   ├── styles/
│   │   │   └── app.css               # Global styles
│   │   └── App.jsx                   # Main component
│   ├── netlify.toml                  # Netlify config
│   ├── vite.config.js                # Vite config
│   └── package.json
│
├── backend/                           # Python FastAPI
│   ├── app/
│   │   ├── main.py                   # FastAPI app
│   │   ├── config.py                 # Configuration
│   │   ├── routes/
│   │   │   ├── auth.py               # Auth endpoints
│   │   │   ├── query.py              # Search endpoint
│   │   │   ├── upload.py             # Upload endpoint
│   │   │   └── history.py            # Chat history endpoints
│   │   ├── services/
│   │   │   ├── auth_service.py       # Auth logic
│   │   │   ├── vectorstore.py        # Vector search
│   │   │   ├── ollama_client.py      # LLM integration
│   │   │   └── extractor.py          # PDF extraction
│   │   ├── models/
│   │   │   ├── user_models.py        # Data models
│   │   │   └── pydantic_models.py    # API models
│   │   ├── utils/
│   │   │   └── prompt_builder.py     # RAG prompts
│   │   └── db/
│   │       └── mongo.py              # DB connection
│   ├── render.yaml                   # Render config
│   ├── requirements.txt               # Dependencies
│   └── .env.example
│
├── DEPLOYMENT_GUIDE.md               # Deployment instructions
├── ENV_SETUP.md                      # Environment setup
└── README.md                         # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB Atlas account
- Ollama installed locally

### Local Development

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with MongoDB URI and Ollama host

# Run backend
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run frontend
npm run dev
```

#### 3. Access Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Documents
- `POST /api/upload` - Upload PDF document
- `GET /api/documents` - List user documents

### Search
- `GET /api/search?q=query` - Search and get answer

### Chat History
- `POST /api/history/save` - Save chat conversation
- `GET /api/history/list` - Get all chats
- `GET /api/history/{chat_id}` - Get specific chat
- `DELETE /api/history/{chat_id}` - Delete chat

---

## 🔄 Data Flow

### Document Upload Flow
```
1. User uploads PDF
2. Backend extracts text passages
3. Generate embeddings for each passage
4. Store in MongoDB (document + embeddings)
5. Ready for search
```

### Query & Answer Flow
```
1. User asks question
2. Generate embedding for query
3. Vector search in MongoDB
4. Retrieve top-K relevant passages
5. Build RAG prompt with passages
6. Send to Ollama LLM
7. Clean & format answer
8. Return to frontend
9. Save to chat history
```

---

## 🎨 Features in Detail

### 1. User Authentication
- Secure registration with email validation
- Login with JWT tokens
- Password hashing with bcrypt
- Token expiration (30 days)

### 2. Document Management
- PDF upload with title
- Automatic text extraction
- Passage chunking
- Embedding generation (all-MiniLM-L6-v2)
- Vector storage in MongoDB

### 3. Semantic Search
- Query embedding generation
- Cosine similarity search
- Top-K passage retrieval
- Relevance scoring

### 4. Answer Generation
- RAG (Retrieval-Augmented Generation)
- Ollama LLM integration
- Structured prompt building
- Answer formatting & cleaning
- Bullet points & sections support

### 5. Chat History
- Save conversations with IST timestamps
- Load previous chats
- Delete conversations
- Chat title auto-generation

### 6. UI/UX
- Modern gradient design
- Responsive layout
- Real-time chat interface
- Structured answer display
- IST timezone support

---

## 🌐 Deployment

### Backend (Render)
- **URL**: https://knowledge-base-search-engine-c9fv.onrender.com
- See `DEPLOYMENT_GUIDE.md` for setup

### Frontend (Render)
- Deploy with `npm run build`
- Publish directory: `dist`
- See `DEPLOYMENT_GUIDE.md` for setup

---

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://knowledge-base-search-engine-c9fv.onrender.com
```

### Backend (.env)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/knowledge_base
OLLAMA_HOST=http://localhost:11434
EMBED_MODEL_NAME=all-MiniLM-L6-v2
SECRET_KEY=your-secret-key
```

See `ENV_SETUP.md` for complete details.

---

## 🔧 Configuration

### Ollama Models
- Default: `llama3`
- Can be changed in `ollama_client.py`

### Embedding Model
- Default: `all-MiniLM-L6-v2`
- Lightweight & fast

### Vector Search
- Algorithm: Cosine similarity
- Top-K: 8 passages retrieved, 3 returned to user

---

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB connection failed**: Check `MONGO_URI` and IP whitelist
- **Ollama not responding**: Ensure Ollama service is running
- **CORS errors**: Check frontend URL in CORS config

### Frontend Issues
- **API calls failing**: Verify `VITE_API_URL` environment variable
- **Login not working**: Check backend auth service
- **Chat history empty**: Ensure user is logged in

See `DEPLOYMENT_GUIDE.md` for more troubleshooting.

---

## 📈 Performance

- **Search latency**: ~1-2 seconds (depends on Ollama)
- **Upload speed**: ~5-10 seconds per PDF
- **Embedding generation**: ~100ms per passage
- **Vector search**: ~50ms for top-K retrieval

---

## 🔐 Security

- JWT token-based authentication
- Bcrypt password hashing
- User-specific data isolation
- Environment variable protection
- HTTPS in production

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

Created with ❤️ for knowledge management and AI-powered search.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📞 Support

For issues or questions:
1. Check `DEPLOYMENT_GUIDE.md`
2. Check `ENV_SETUP.md`
3. Review API documentation at `/docs`
4. Check GitHub issues

---

**Happy Searching! 🚀**
  render deploy link :- https://knowledge-base-search-engine-1-e0nu.onrender.com 

Screen Shots of the Poject :- 
