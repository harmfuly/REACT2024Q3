import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { submitForm } from '../redux/store';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

interface SearchResult {
  name: string;
}

const Flyout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector((state: RootState) => state.formData);
  const results = useSelector((state: RootState) => state.formData);

  if (!selectedItems || selectedItems.length === 0) return null;

  const handleUnselectAll = () => {};

  const handleDownload = () => {
    const selectedResults = results.filter((result: SearchResult) =>
      selectedItems.some((item) => item.name === result.name),
    );
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
