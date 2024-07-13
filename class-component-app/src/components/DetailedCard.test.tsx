import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import DetailedCard from './DetailedCard';

jest.mock('axios');

const mockDetailedData = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

describe('DetailedCard component', () => {
  it('displays loading indicator while fetching data', () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockDetailedData });
    render(<DetailedCard name="Luke Skywalker" onClose={() => {}} />);
    const loadingIndicator = screen.getByText(/loading/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders detailed card data when fetched successfully', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockDetailedData });
    render(<DetailedCard name="Luke Skywalker" onClose={() => {}} />);
    await waitFor(() => {
      const cardName = screen.getByText(/luke skywalker/i);
      expect(cardName).toBeInTheDocument();
    });
  });

  it('handles error state correctly', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch data'));
    render(<DetailedCard name="Luke Skywalker" onClose={() => {}} />);
    await waitFor(() => {
      const errorMessage = screen.getByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const mockOnClose = jest.fn();
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockDetailedData });
    render(<DetailedCard name="Luke Skywalker" onClose={mockOnClose} />);
    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i });
      userEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});