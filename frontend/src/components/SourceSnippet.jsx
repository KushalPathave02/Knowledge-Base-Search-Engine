import React, { useState } from 'react';

function SourceSnippet({ source }) {
  const [expanded, setExpanded] = useState(false);
  
  // Truncate text to 150 characters for preview
  const maxLength = 150;
  const truncatedText = source.text.length > maxLength 
    ? source.text.substring(0, maxLength) + '...' 
    : source.text;
  
  const displayText = expanded ? source.text : truncatedText;

  return (
    <div className="source-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <p className="source-title">📄 {source.doc_title} (Page {source.page})</p>
          <p className="source-score">Relevance: {(source.score * 100).toFixed(1)}%</p>
        </div>
      </div>
      <p className="source-text">"{displayText}"</p>
      {source.text.length > maxLength && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            marginTop: '6px',
            padding: '0',
            textDecoration: 'underline'
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default SourceSnippet;
