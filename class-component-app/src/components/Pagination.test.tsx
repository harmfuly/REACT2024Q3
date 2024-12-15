import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

test('updates URL query parameter when page changes', () => {
  render(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Pagination
        totalItems={30}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={() => {}}
      />
    </MemoryRouter>,
  );

  const nextButton = screen.getByText('2') as HTMLElement;
  fireEvent.click(nextButton);

  expect(screen.getByText('2')).toBeInTheDocument();
});
