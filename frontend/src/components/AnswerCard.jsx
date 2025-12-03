import React from 'react';

function AnswerCard({ answer }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Answer:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default AnswerCard;
