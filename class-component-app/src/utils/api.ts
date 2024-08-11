import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: string;
  title: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], string>({
      query: (searchTerm) => `/posts?search=${searchTerm}`,
    }),
  }),
});

export const { useGetPostsQuery } = api;
