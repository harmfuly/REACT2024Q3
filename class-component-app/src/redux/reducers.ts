import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, RootState as FormRootState } from '../redux/types/formTypes';
import { SearchResult } from '../components/SearchResults';

interface SearchState {
  selectedItems: string[];
  results: SearchResult[];
}

const initialSearchState: SearchState = {
  selectedItems: [],
  results: [],
};

const initialFormState: FormRootState = {
  formData: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
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

function formReducer(state = initialFormState, action: any): FormRootState {
  switch (action.type) {
    case 'SUBMIT_FORM':
      return {
        ...state,
        formData: [...state.formData, action.payload],
      };
    default:
      return state;
  }
}

export const rootReducer = {
  search: searchSlice.reducer,
  form: formReducer,
};

export const { unselectAllItems, toggleSelectedItem } = searchSlice.actions;
