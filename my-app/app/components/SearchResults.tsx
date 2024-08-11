"use client";

import React from 'react';
import { useGetPostsQuery } from '../utils/api';

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const { data, error, isLoading } = useGetPostsQuery(searchTerm);

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

  return <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>;
};

export default SearchResults;