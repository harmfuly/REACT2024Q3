import React, { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedSearchTerm);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
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
