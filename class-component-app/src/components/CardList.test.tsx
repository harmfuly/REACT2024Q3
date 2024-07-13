import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import '@testing-library/jest-dom/extend-expect';

const mockResults = [
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
];

describe('CardList component', () => {
  it('renders the correct number of cards', () => {
    render(<CardList results={mockResults} onCardClick={() => {}} />);
    const cards = screen.getAllByRole('button', { name: /luke skywalker/i });
    expect(cards.length).toBe(mockResults.length);
  });

  it('displays a message when no cards are present', () => {
    render(<CardList results={[]} onCardClick={() => {}} />);
    const message = screen.getByText(/no results found/i);
    expect(message).toBeInTheDocument();
  });
});
