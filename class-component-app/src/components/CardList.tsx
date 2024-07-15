import React from 'react';
import Card from './Card';
import { SearchResult } from './SearchResults';

interface CardListProps {
  results: SearchResult[];
  onCardClick: (result: SearchResult) => void;
}

const CardList: React.FC<CardListProps> = ({ results, onCardClick }) => {
  return (
    <div className="results-grid">
      {results.map((result, index) => (
        <Card key={index} result={result} onCardClick={onCardClick} />
      ))}
      {results.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default CardList;
