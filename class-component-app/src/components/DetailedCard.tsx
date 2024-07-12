import { useEffect, useState } from 'react';
import axios from 'axios';

interface DetailedCardProps {
  name: string;
  onClose: () => void;
}

interface DetailedCardData {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
}

const DetailedCard: React.FC<DetailedCardProps> = ({ name, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [detailedData, setDetailedData] = useState<DetailedCardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.example.com/card-details/${name}`);
        setDetailedData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedData();
  }, [name]);

  return (
    <div className="detailed-card">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {detailedData && (
        <div>
          <h2>{detailedData.name}</h2>
          <p>Height: {detailedData.height}</p>
          <p>Mass: {detailedData.mass}</p>
          <p>Hair Color: {detailedData.hair_color}</p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DetailedCard;
