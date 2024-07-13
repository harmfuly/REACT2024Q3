import React from 'react';
import { SearchResult } from './SearchResults';

interface CardProps {
  result: SearchResult;
  onCardClick: (name: string) => void;
}

const Card: React.FC<CardProps> = ({ result, onCardClick }) => {
  return (
    <div
      role="button"
      onClick={() => onCardClick(result.name)}
      className="result-item"
    >
      <h2>{result.name}</h2>
      <p>Height: {result.height}</p>
      <p>Mass: {result.mass}</p>
      <p>Hair Color: {result.hair_color}</p>
      <p>Skin Color: {result.skin_color}</p>
      <p>Eye Color: {result.eye_color}</p>
      <p>Birth Year: {result.birth_year}</p>
      <p>Gender: {result.gender}</p>
    </div>
  );
};

export default Card;
