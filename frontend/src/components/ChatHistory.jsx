import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatHistory({ onSelectChat, currentChatId, refreshTrigger = 0 }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChatHistory();
  }, [refreshTrigger]);

  const loadChatHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/history/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChats(response.data.chats);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8000/api/history/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChats(chats.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ padding: '0 16px', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
          Chat History
        </h3>
      </div>
      
      {loading ? (
        <div style={{ padding: '16px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
          Loading...
        </div>
      ) : chats.length === 0 ? (
        <div style={{ padding: '16px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
          No chats yet
        </div>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: currentChatId === chat.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                borderLeft: currentChatId === chat.id ? '3px solid #667eea' : '3px solid transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                borderRadius: '4px',
                margin: '0 8px',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>
                  {chat.title}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  {formatDate(chat.created_at)}
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteChat(chat.id, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px 8px',
                  marginLeft: '8px'
                }}
                title="Delete chat"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatHistory;
