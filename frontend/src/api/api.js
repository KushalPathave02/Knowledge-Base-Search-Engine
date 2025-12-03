import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const api = axios.create({ 
    baseURL: `${API_BASE_URL}/api`
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const uploadFile = (file, title) => {
  const form = new FormData();
  form.append("title", title);
  form.append("file", file);
  return api.post("/upload", form, { 
      headers: getAuthHeader()
    });
};

export const searchQuery = (q, top_k = 8) => api.get(`/search?q=${encodeURIComponent(q)}&top_k=${top_k}`, {
  headers: getAuthHeader()
});

export const getDocuments = () => api.get("/documents", {
  headers: getAuthHeader()
});
