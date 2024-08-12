"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
        placeholder="Enter search term..."
        name="searchTerm"
        id="searchTerm"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
