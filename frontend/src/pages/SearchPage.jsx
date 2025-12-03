import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload as UploadIcon } from 'lucide-react';
import axios from 'axios';
import { searchQuery, uploadFile as uploadFileAPI } from '../api/api';
import SourceSnippet from '../components/SourceSnippet';

const ChatMessage = ({ message, isUser }) => (
  <div className={`message-wrapper ${isUser ? 'user' : ''}`}>
    <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
      <p>{message.text}</p>
      {!isUser && message.sources && (
        <div className="sources-container">
          <div className="sources-title">📎 Sources</div>
          {message.sources.map((source, index) => (
            <SourceSnippet key={index} source={source} />
          ))}
        </div>
      )}
    </div>
  </div>
);

function SearchPage({ chatId, isLoggedIn = false, onChatSaved }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFileState] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Load chat messages when chatId changes
  useEffect(() => {
    if (chatId === null) {
      // New chat - clear messages and uploaded files
      setMessages([]);
      setUploadedFiles([]);
    } else {
      // Load existing chat
      loadChatMessages(chatId);
      setUploadedFiles([]);
    }
  }, [chatId]);

  const loadChatMessages = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/history/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };

  const saveToHistory = async (chatMessages) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const title = chatMessages[0]?.text?.substring(0, 50) || 'New Chat';
      await axios.post('http://localhost:8000/api/history/save', {
        title: title,
        messages: chatMessages
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Trigger history refresh
      if (onChatSaved) {
        onChatSaved();
      }
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    if (!isLoggedIn) {
      alert('Please login or sign up to search documents');
      return;
    }

    const userMessage = { text: input, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await searchQuery(input);
      const botMessage = { text: res.data.answer, sources: res.data.sources, isUser: false };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      
      // Save to history immediately
      await saveToHistory(finalMessages);
    } catch (error) {
      console.error("Search failed:", error);
      const errorMessage = { text: '❌ Sorry, something went wrong. Please try again.', isUser: false };
      setMessages(prev => [...prev, errorMessage]);
      
      // Still save the conversation with error message
      const messagesWithError = [...updatedMessages, errorMessage];
      await saveToHistory(messagesWithError);
    }
    setLoading(false);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      setUploadMessage('Please provide a title and select a file.');
      return;
    }
    setUploading(true);
    setUploadMessage('');
    try {
      await uploadFileAPI(uploadFile, uploadTitle);
      
      // Add to uploaded files list
      setUploadedFiles(prev => [...prev, {
        name: uploadTitle,
        fileName: uploadFile.name,
        size: uploadFile.size
      }]);
      
      setUploadMessage('✅ Document uploaded successfully!');
      setUploadTitle('');
      setUploadFileState(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadMessage('');
      }, 1500);
    } catch (error) {
      setUploadMessage('❌ Upload failed. Please try again.');
      console.error(error);
    }
    setUploading(false);
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Start a Conversation</h2>
            {isLoggedIn ? (
              <p>Upload your documents and ask questions to get instant answers powered by AI.</p>
            ) : (
              <div>
                <p style={{ marginBottom: '16px' }}>Login or sign up to upload documents and search.</p>
                <p style={{ fontSize: '14px', color: '#aaa' }}>👉 Use the Login/Sign Up buttons in the sidebar to get started!</p>
              </div>
            )}
          </div>
        )}
        
        {/* Display uploaded files */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {uploadedFiles.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#667eea',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  📄
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '500', fontSize: '14px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                    PDF
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="message-wrapper">
            <div className="message-bubble bot">
              <div className="loading-spinner"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <div className="input-wrapper">
          <button 
            className="upload-icon-button"
            onClick={() => {
              if (!isLoggedIn) {
                alert('Please login or sign up to upload documents');
                return;
              }
              setShowUploadModal(true);
            }}
            title={isLoggedIn ? "Upload document" : "Login to upload"}
            style={{
              background: 'none',
              border: 'none',
              color: isLoggedIn ? '#667eea' : '#ccc',
              cursor: isLoggedIn ? 'pointer' : 'not-allowed',
              fontSize: '20px',
              padding: '8px',
              marginRight: '8px',
              opacity: isLoggedIn ? 1 : 0.5
            }}
          >
            <UploadIcon size={20} />
          </button>
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            className="send-button" 
            onClick={handleSend} 
            disabled={loading}
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: '20px', color: '#333' }}>
              📄 Upload Document
            </h2>
            <form onSubmit={handleUploadSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  Document Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g., Company Manual"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  PDF File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => setUploadFileState(e.target.files[0])}
                  accept=".pdf"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              {uploadMessage && (
                <div style={{
                  background: uploadMessage.includes('✅') ? '#efe' : '#fee',
                  color: uploadMessage.includes('✅') ? '#3a3' : '#c33',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {uploadMessage}
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    opacity: uploading ? 0.7 : 1
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadMessage('');
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#f0f0f0',
                    color: '#333',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
