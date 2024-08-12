"use client";

import React from 'react';
import Card from './Card';
import { SearchResult } from './SearchResults';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleSelectedItem } from '../redux/reducers';

interface CardListProps {
  results: SearchResult[];
  onCardClick: (result: SearchResult) => void;
}

const CardList: React.FC<CardListProps> = ({ results, onCardClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.search.selectedItems,
  );

  const handleCheckboxChange = (name: string) => {
    dispatch(toggleSelectedItem(name));
  };

  return (
    <div className="results-grid">
      {results.map((result: SearchResult, index: number) => (
        <div key={index} className="result-item">
          <input
            type="checkbox"
            checked={selectedItems.includes(result.name)}
            onChange={() => handleCheckboxChange(result.name)}
          />
          <Card result={result} onCardClick={onCardClick} />
        </div>
      ))}
      {results.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default CardList;