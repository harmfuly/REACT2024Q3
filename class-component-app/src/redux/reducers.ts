import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../components/SearchResults';

interface SearchState {
  results: SearchResult[];
  selectedCard: SearchResult | null;
  selectedItems: string[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: SearchState = {
  results: [],
  selectedCard: null,
  selectedItems: [],
  loading: false,
  error: null,
  currentPage: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload;
    },
    setSelectedCard(state, action: PayloadAction<SearchResult | null>) {
      state.selectedCard = action.payload;
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
    toggleSelectedItem(state, action: PayloadAction<string>) {
      const index = state.selectedItems.indexOf(action.payload);
      if (index > -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    unselectAllItems(state) {
      state.selectedItems = [];
    },
  },
});

export const {
  setResults,
  setSelectedCard,
  setLoading,
  setError,
  setCurrentPage,
  toggleSelectedItem,
  unselectAllItems,
} = searchSlice.actions;

export default searchSlice.reducer;
