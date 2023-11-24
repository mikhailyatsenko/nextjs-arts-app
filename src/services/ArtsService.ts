import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Arts } from '../contatiners/ArtsLoader';
import { setIsArtsListLoading } from '../store/slices/asyncSlice';
import { setIsSelectedArtIdLoading } from '../store/slices/asyncSlice';
import { DetailArt } from '../contatiners/ArtsLoader';

export interface ArtsListDataResponse {
  data: Arts[];
  pagination: { total_pages: number };
}

interface DetailArtResponse {
  data: DetailArt;
}

export const artsApi = createApi({
  reducerPath: 'artsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/artworks/',
  }),

  endpoints: (builder) => ({
    fetchAllArts: builder.query<ArtsListDataResponse, string>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setIsArtsListLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setIsArtsListLoading(false));
        }
      },
      query: (searchQuery) =>
        `search?q=${searchQuery}&fields=artist_display,title,image_id,id`,
    }),

    fetchSelectedArt: builder.query<DetailArtResponse, string>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setIsSelectedArtIdLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setIsSelectedArtIdLoading(false));
        }
      },
      query: (selectedArtId) =>
        `${selectedArtId}?fields=artist_display,title,image_id,provenance_text`,
    }),
  }),
});
