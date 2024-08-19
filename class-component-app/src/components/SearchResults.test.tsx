import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SearchResults from './SearchResults';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

jest.mock('axios');

const renderWithRedux = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SearchResults component', () => {
  it('renders loading state and results correctly', async () => {
    const mockData = {
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          },
        ],
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockData,
    );

    render(<SearchResults searchTerm="Luke" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('handles error state correctly', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
      new Error('Failed to fetch data'),
    );

    renderWithRedux(<SearchResults searchTerm="Anakin" />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
