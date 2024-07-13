import React, { useEffect, useState } from 'react';
import { fetchCharacterDetails } from '../utils/api';

interface DetailedCardProps {
  characterName: string;
  onClose: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ characterName, onClose }) => {
  const [characterDetails, setCharacterDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCharacterDetails(characterName);
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [characterName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="detailed-card">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{characterDetails.name}</h2>
      <p>Height: {characterDetails.height}</p>
      <p>Mass: {characterDetails.mass}</p>
      <p>Hair Color: {characterDetails.hair_color}</p>
      <p>Skin Color: {characterDetails.skin_color}</p>
      <p>Eye Color: {characterDetails.eye_color}</p>
      <p>Birth Year: {characterDetails.birth_year}</p>
      <p>Gender: {characterDetails.gender}</p>
    </div>
  );
};

export default DetailedCard;
