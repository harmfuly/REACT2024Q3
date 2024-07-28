import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { unselectAllItems } from '../redux/reducers';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { SearchResult } from './SearchResults';

const Flyout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector((state: RootState) => state.search.selectedItems);
  const results = useSelector((state: RootState) => state.search.results);

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    const selectedResults = results.filter(result => selectedItems.includes(result.name));
    const csvData = Papa.unparse(selectedResults);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  return (
    <div className="flyout">
      <p>{selectedItems.length} items are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
