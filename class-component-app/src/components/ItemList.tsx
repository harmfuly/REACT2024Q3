// ItemList.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';

const ItemList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [items, setItems] = useState<any[]>([]); // Replace with your item type
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Simulated data fetching
    const fetchData = async () => {
      // Replace with actual API call to fetch items
      // Example: const response = await fetch(`/api/items?page=${currentPage}`);
      // const data = await response.json();
      // setItems(data.items);
      // setTotalPages(data.totalPages);

      // Simulated data
      const totalItems = 50; // Example total items
      const itemsPerPage = 10; // Example items per page
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
      const itemsData = Array.from({ length: endIndex - startIndex }, (_, index) => ({
        id: startIndex + index + 1,
        name: `Item ${startIndex + index + 1}`,
      }));
      setItems(itemsData);
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    // Update query parameter in URL
    const newUrl = `/search/${page}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default ItemList;
