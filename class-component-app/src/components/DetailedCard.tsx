import { SearchResult } from './SearchResults';
import React from 'react';

interface DetailedCardProps {
  character: SearchResult;
  onClose: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ character, onClose }) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
  } = character;

  return (
    <div className="detailed-card">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h1>{name}</h1>
      <p>Height: {height}</p>
      <p>Mass: {mass}</p>
      <p>Hair Color: {hair_color}</p>
      <p>Skin Color: {skin_color}</p>
      <p>Eye Color: {eye_color}</p>
      <p>Birth Year: {birth_year}</p>
      <p>Gender: {gender}</p>
    </div>
  );
};

export default DetailedCard;
