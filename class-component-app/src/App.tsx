import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App: React.FC = () => {

  const searchPageKey = 'searchPage';

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <Routes>
            <Route key={searchPageKey} path="/" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
