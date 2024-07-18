import { Component, ChangeEvent, FormEvent } from 'react';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchInputState {
  searchTerm: string;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedSearchTerm };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    );
  }
}

export default SearchInput;
