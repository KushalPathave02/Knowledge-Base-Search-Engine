import React from 'react';

function HomePage({ onLoginClick, onSignupClick, onGuestClick }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px',
        padding: '40px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>💡</div>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
          Knowledge Base Search Engine
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>
          Upload your documents and ask questions to get instant answers powered by AI.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '32px'
        }}>
          <button
            onClick={onLoginClick}
            style={{
              padding: '14px 32px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
          >
            🔐 Login
          </button>
          <button
            onClick={onSignupClick}
            style={{
              padding: '14px 32px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📝 Sign Up
          </button>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          paddingTop: '32px'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.8 }}>
            Or continue as a guest (chat history won't be saved)
          </p>
          <button
            onClick={onGuestClick}
            style={{
              padding: '12px 28px',
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
          >
            👤 Continue as Guest
          </button>
        </div>

        <div style={{
          marginTop: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Upload PDFs</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>AI Powered</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💾</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Save History</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
