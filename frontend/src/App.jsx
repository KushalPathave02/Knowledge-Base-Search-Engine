import React, { useState, useEffect } from 'react';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ChatHistory from './components/ChatHistory';
import './styles/app.css';

function App() {
  const [view, setView] = useState('home'); // 'home', 'login', 'signup', 'chat'
  const [user, setUser] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView('chat');
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('chat');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentChatId(null);
    setView('home');
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  // Show home page if not logged in and not in login/signup
  if (view === 'home') {
    return <HomePage onLoginClick={() => setView('login')} onSignupClick={() => setView('signup')} onGuestClick={() => setView('chat')} />;
  }

  // Show login page
  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBackClick={() => setView('home')} />;
  }

  // Show signup page
  if (view === 'signup') {
    return <LoginPage isSignup={true} onLoginSuccess={handleLoginSuccess} onBackClick={() => setView('home')} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>💡 Knowledge Base</h1>
        </div>
        
        <nav className="sidebar-nav">
          <button
            onClick={handleNewChat}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ➕ New Chat
          </button>
        </nav>

        {/* Chat History - Only show if logged in */}
        {user && (
          <div style={{ flex: 1, overflowY: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <ChatHistory onSelectChat={handleSelectChat} currentChatId={currentChatId} refreshTrigger={refreshHistory} />
          </div>
        )}

        {/* User Profile and Logout - Only show if logged in */}
        {user && (
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                marginRight: '12px'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '12px', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.email}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {/* Guest Mode - Show login/signup buttons if not logged in */}
        {!user && (
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>
            <button
              onClick={() => setView('login')}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              🔐 Login
            </button>
            <button
              onClick={() => setView('signup')}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              📝 Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <SearchPage 
          chatId={currentChatId} 
          isLoggedIn={!!user} 
          onChatSaved={() => setRefreshHistory(prev => prev + 1)}
        />
      </div>
    </div>
  );
}

export default App;
