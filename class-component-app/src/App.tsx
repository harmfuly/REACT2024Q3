import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import { store } from './redux/store';
import Flyout from './components/Flyout';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';

const App: React.FC = () => {
  const searchPageKey = 'searchPage';

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
                <Route path="/react-hook-form" element={<ReactHookFormPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Flyout />
            </div>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
