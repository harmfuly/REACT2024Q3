import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import '@testing-library/jest-dom';

describe('DetailedCard component', () => {
  it('renders the detailed card with given character data', () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    const mockProps = {
      character: mockCharacter,
      onClose: jest.fn(),
    };

    render(<DetailedCard {...mockProps} />);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/skin color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
  });
});
