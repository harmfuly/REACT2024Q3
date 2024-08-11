import React, { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import ThemeToggle from '../components/ThemeToggle';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedSearchTerm);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    localStorage.setItem('searchTerm', term);
  };

  return (
    <div>
      <ThemeToggle />
      <div className="search-input-container">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="search-results-container">
        <SearchResults searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default SearchPage;
