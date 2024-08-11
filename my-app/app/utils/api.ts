import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], string>({
      query: (searchTerm) => `posts?search=${searchTerm}`,
    }),
  }),
});

export const { useGetPostsQuery } = api;