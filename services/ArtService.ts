import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Arts } from '@/pages/layout';
import { setIsArtsListLoading } from '@/store/slices/mainSlice';
import { setIsSelectedArtIdLoading } from '@/store/slices/mainSlice';
import { DetailArt } from '@/pages/layout';
import { HYDRATE } from 'next-redux-wrapper';

export interface ArtsListDataResponse {
  data: Arts[];
  pagination: { total_pages: number };
}

interface DetailArtResponse {
  data: DetailArt;
}

export interface TransformedArtsListResponse {
  arts: Arts[];
  totalPages: number;
}

export const artsApi = createApi({
  reducerPath: 'artsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/artworks/',
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    fetchAllArts: builder.query<TransformedArtsListResponse, string>({
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
      transformResponse: (response: ArtsListDataResponse) => ({
        arts: response.data,
        totalPages: response.pagination.total_pages,
      }),
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

export const { fetchAllArts, fetchSelectedArt } = artsApi.endpoints;
