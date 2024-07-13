import React from 'react';
import { SearchResult } from './SearchResults';

interface CardProps {
  result: SearchResult;
  onCardClick: (result: SearchResult) => void;
}

const Card: React.FC<CardProps> = ({ result, onCardClick }) => {
  return (
    <div
      role="button"
      onClick={() => onCardClick(result)}
      className="result-item"
    >
      <h2>{result.name}</h2>
    </div>
  );
};

export default Card;
