import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
