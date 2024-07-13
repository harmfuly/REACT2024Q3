import { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './CardList';
import DetailedCard from './DetailedCard';
import CardList from './CardList';
import DetailedCard from './DetailedCard';

export interface SearchResult {
export interface SearchResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm) {
          const response = await axios.get(
            `https://swapi.dev/api/people/?search=${searchTerm}`,
          );
          setResults(response.data.results);
        } else {
          setResults([]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleCardClick = (name: string) => {
    setSelectedCard(name);
  };

  const handleCloseDetailedCard = () => {
    setSelectedCard(null);
  };

  const handleCardClick = (name: string) => {
    setSelectedCard(name);
  };

  const handleCloseDetailedCard = () => {
    setSelectedCard(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedCard) {
    return (
      <DetailedCard
        name={selectedCard}
        onClose={handleCloseDetailedCard}
      />
    );
  }

  if (selectedCard) {
    return (
      <DetailedCard
        characterName={selectedCard}
        onClose={handleCloseDetailedCard}
      />
    );
  }

  return <CardList results={results} onCardClick={handleCardClick} />;
};

export default SearchResults;
