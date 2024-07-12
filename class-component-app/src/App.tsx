import { Component } from 'react';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

interface AppState {
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  throwError = () => {
    throw new Error('This is a test error');
  };

  render() {
    return (
      <ErrorBoundary>
        <div className='app-container'>
          <div className='search-input-container'>
            <SearchInput onSearch={this.handleSearch} />
          </div>
          <div className='search-results-container'>
            <SearchResults searchTerm={this.state.searchTerm} />
          </div>
          <div className='error-test-container'>
            <button onClick={this.throwError}>Throw Error</button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
