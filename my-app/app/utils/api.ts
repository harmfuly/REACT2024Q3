import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../components/SearchResults';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<ApiResponse, string>({
      query: (searchTerm) => `people/?search=${searchTerm}`,
    }),
  }),
});

export const { useGetPeopleQuery } = api;
