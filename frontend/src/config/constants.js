// API Configuration
// For local development: Create a .env file with VITE_API_URL=http://localhost:8000
// For production: Set VITE_API_URL in Netlify environment variables
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://knowledge-base-search-engine-c9fv.onrender.com';
