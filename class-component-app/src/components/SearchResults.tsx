import React, { Component } from 'react';
import axios from 'axios';

interface SearchResultsProps {
  searchTerm: string;
}

interface SearchResult {
  title: string;
  uid: string;
}

interface SearchResultsState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchResults(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchResults(this.props.searchTerm);
    }
  }

  fetchResults = (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    const url = searchTerm
      ? `https://stapi.co/api/v1/rest/season/search?title=${searchTerm}`
      : `https://stapi.co/api/v1/rest/season/search`;
    axios
      .post(url, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        this.setState({ results: response.data.seasons, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  render() {
    const { results, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h2>{result.title}</h2>
            <p>{result.uid}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;