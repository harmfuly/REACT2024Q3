import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../components/SearchResults';

interface SearchState {
  results: SearchResult[];
  selectedItems: string[];
  error: string | null;
  loading: boolean;
  currentPage: number;
}

const initialState: SearchState = {
  results: [],
  selectedItems: [],
  error: null,
  loading: false,
  currentPage: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload;
    },
    setSelectedItems(state, action: PayloadAction<string[]>) {
      state.selectedItems = action.payload;
    },
    unselectAllItems(state) {
      state.selectedItems = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setResults, setSelectedItems, unselectAllItems, setLoading, setError, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;