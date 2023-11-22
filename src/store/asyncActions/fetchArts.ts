import { RootState } from '..';

import { Arts } from '../../contatiners/ArtsLoader';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTotalPages } from '../slices/asyncSlice';

export const fetchArts = createAsyncThunk<
  Arts[],
  undefined,
  { rejectValue: string; state: RootState }
>('asyncData/fetchArts', async (_, { rejectWithValue, getState, dispatch }) => {
  try {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${
      getState().common.query
    }&limit=${getState().common.itemsPerPage}&page=${
      getState().common.currentPage
    }&fields=artist_display,title,image_id,id`;

    const response = await fetch(url);
    const dataArts = await response.json();

    if (dataArts.data.length !== undefined) {
      dispatch(setTotalPages(dataArts.pagination.total_pages));
      return dataArts.data;
    } else {
      return [];
    }
  } catch (e) {
    return rejectWithValue('Server error: ' + e);
  }
});
