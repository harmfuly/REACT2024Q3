import React, { useEffect } from 'react';
import axios from 'axios';
import CardList from './CardList';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  setResults,
  setSelectedCard,
  setLoading,
  setError,
  setCurrentPage,
} from '../redux/reducers';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { results, selectedCard, loading, error, currentPage } = useSelector(
    (state: RootState) => state.search,
  );
  const itemsPerPage = 10;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    dispatch(setCurrentPage(page));

    const fetchResults = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        if (searchTerm) {
          const response = await axios.get(
            `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`,
          );
          dispatch(setResults(response.data.results));
        } else {
          dispatch(setResults([]));
        }
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : 'An error occurred',
          ),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchResults();
  }, [searchTerm, location.search, dispatch]);

  const handleCardClick = (character: SearchResult) => {
    dispatch(setSelectedCard(character));
    navigate(`?page=${currentPage}&details=${character.name}`);
  };

  const handleCloseDetailedCard = () => {
    dispatch(setSelectedCard(null));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    navigate(`?page=${page}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
      <div className="details-section">
        {selectedCard && (
          <DetailedCard
            character={selectedCard}
            onClose={handleCloseDetailedCard}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
