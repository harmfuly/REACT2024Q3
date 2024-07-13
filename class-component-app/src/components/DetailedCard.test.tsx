import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import '@testing-library/jest-dom/extend-expect';

describe('DetailedCard component', () => {
  it('renders the detailed card with given data', () => {
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

    render(<DetailedCard data={mockData} />);
    const detailedCardElement = screen.getByText(/luke skywalker/i);
    expect(detailedCardElement).toBeInTheDocument();
  });
});
