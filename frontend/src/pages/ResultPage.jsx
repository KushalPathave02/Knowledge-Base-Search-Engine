import React from 'react';
import AnswerCard from '../components/AnswerCard';
import SourceSnippet from '../components/SourceSnippet';

function ResultPage({ results }) {
  return (
    <div>
      <AnswerCard answer={results.answer} />
      <h3>Sources:</h3>
      {results.sources.map((source, index) => (
        <SourceSnippet key={index} source={source} />
      ))}
    </div>
  );
}

export default ResultPage;
