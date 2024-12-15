import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page.toString());
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Back
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
