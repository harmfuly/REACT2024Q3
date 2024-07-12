import { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchResultsProps {
  searchTerm: string;
}

interface SearchResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async (searchTerm: string) => {
      setLoading(true);
      setError(null);
      const url = searchTerm
        ? `https://swapi.dev/api/people/?search=${searchTerm}`
        : 'https://swapi.dev/api/people/';
      try {
        const response = await axios.get(url);
        setResults(response.data.results);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchResults(searchTerm);
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="results-grid">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h2>{result.name}</h2>
          <p>Height: {result.height}</p>
          <p>Mass: {result.mass}</p>
          <p>Hair Color: {result.hair_color}</p>
          <p>Skin Color: {result.skin_color}</p>
          <p>Eye Color: {result.eye_color}</p>
          <p>Birth Year: {result.birth_year}</p>
          <p>Gender: {result.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
