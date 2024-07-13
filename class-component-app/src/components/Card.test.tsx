import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

describe('Card component', () => {
  it('renders the card with given data', () => {
    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    render(<Card result={mockData} onCardClick={() => {}} />);
    const cardElement = screen.getByText(/luke skywalker/i);
    expect(cardElement).toBeInTheDocument();
  });
});
