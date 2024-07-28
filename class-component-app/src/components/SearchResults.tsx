import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './CardList';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [selectedCard, setSelectedCard] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm) {
          const response = await axios.get(
            `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
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
  }, [searchTerm, location.search]);

  const handleCardClick = (character: SearchResult) => {
    setSelectedCard(character);
    navigate(`/?page=${currentPage}&details=${character.name}`);
  };

  const handleCloseDetailedCard = () => {
    setSelectedCard(null);
    navigate(`/?page=${currentPage}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/?page=${page}`);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className="search-results">
      <div className="results-section">
        <CardList results={results} onCardClick={handleCardClick} />
        {results.length > 0 && (
          <Pagination
            totalItems={100}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {selectedCard && (
        <div className="details-section">
          <DetailedCard
            character={selectedCard}
            onClose={handleCloseDetailedCard}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
