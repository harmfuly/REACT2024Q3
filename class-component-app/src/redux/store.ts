import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers';
import { api } from '../utils/api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
