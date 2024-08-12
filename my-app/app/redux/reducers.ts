import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../components/SearchResults';

interface SearchState {
  selectedItems: string[];
  results: SearchResult[];
}

const initialState: SearchState = {
  selectedItems: [],
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    unselectAllItems(state) {
      state.selectedItems = [];
    },
    toggleSelectedItem(state, action: PayloadAction<string>) {
      const index = state.selectedItems.indexOf(action.payload);
      if (index > -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
  },
});

export const { unselectAllItems, toggleSelectedItem } = searchSlice.actions;

export default searchSlice.reducer;
