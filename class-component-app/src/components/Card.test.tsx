import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

const mockResult = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

describe('Card component', () => {
  it('renders the card with correct data', () => {
    const mockOnCardClick = jest.fn();
    render(<Card result={mockResult} onCardClick={mockOnCardClick} />);
    const card = screen.getByRole('button', { name: /luke skywalker/i });
    expect(card).toBeInTheDocument();
  });

  it('calls onCardClick when clicked', () => {
    const mockOnCardClick = jest.fn();
    render(<Card result={mockResult} onCardClick={mockOnCardClick} />);
    const card = screen.getByRole('button', { name: /luke skywalker/i });
    userEvent.click(card);
    expect(mockOnCardClick).toHaveBeenCalledWith(mockResult.name);
  });
});
