import React, { Component, ChangeEvent, FormEvent } from 'react';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchInputState {
  searchTerm: string;
  searchTerms: string[]; // Добавлено поле searchTerms
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    const savedSearchTerms = JSON.parse(localStorage.getItem('searchTerms') || '[]');
    this.state = { searchTerm: '', searchTerms: savedSearchTerms };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm, searchTerms } = this.state;
    const updatedSearchTerms = [...searchTerms, searchTerm];
    this.props.onSearch(searchTerm);
    localStorage.setItem('searchTerms', JSON.stringify(updatedSearchTerms));
    this.setState({ searchTerm: '', searchTerms: updatedSearchTerms });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchInput;
