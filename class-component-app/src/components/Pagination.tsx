// Pagination.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPageLink = (page: number) => `/search/${page}`; // Assuming "/search/:page" route structure

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <Link key={pageNumber} to={getPageLink(pageNumber)} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
};

export default Pagination;
