import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import store from './redux/store';
import './App.css';

const App: React.FC = () => {
  const searchPageKey = 'searchPage';

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <Routes>
              <Route key={searchPageKey} path="/" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
