import React from 'react';
import { useGetCharactersQuery } from '../utils/api';

export interface SearchResult {
  name: string;
}

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const { data, error, isLoading } = useGetCharactersQuery(searchTerm);

  if (isLoading) return <div>Loading...</div>;

  let errorMessage = 'An unknown error occurred.';
  if (error) {
    if ('status' in error) {
      errorMessage = `Error: ${error.status}`;
    } else if ('message' in error) {
      errorMessage = `Error: ${error.message}`;
    }
  }

  if (error) return <div>{errorMessage}</div>;

  return (
    <ul>
      {data?.map((character) => <li key={character.name}>{character.name}</li>)}
    </ul>
  );
};

export default SearchResults;
