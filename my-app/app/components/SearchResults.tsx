"use client";

import React from 'react';
import { useGetPeopleQuery } from '../utils/api';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

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
  const { data, error, isLoading } = useGetPeopleQuery(searchTerm);

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

  const results = (data as ApiResponse)?.results || [];

  return (
    <ul>
      {results.map((person: SearchResult) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
};

export default SearchResults;
