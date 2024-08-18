import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Character[], string>({
      query: (searchTerm) => `people/?search=${searchTerm}`,
      transformResponse: (response: { results: Character[] }) => response.results,
    }),
  }),
});

export const { useGetCharactersQuery } = api;