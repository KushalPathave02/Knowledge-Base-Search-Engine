import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your question..."
        style={{ width: '300px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px' }}>Search</button>
    </form>
  );
}

export default SearchBar;
