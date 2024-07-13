import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import '@testing-library/jest-dom';

describe('CardList component', () => {
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
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
    },
  ];

  it('renders the correct number of cards', () => {
    render(<CardList results={mockResults} onCardClick={() => {}} />);
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(mockResults.length);
  });

  it('displays a message when no cards are present', () => {
    render(<CardList results={[]} onCardClick={() => {}} />);
    const message = screen.getByText(/no results found/i);
    expect(message).toBeInTheDocument();
  });
});
