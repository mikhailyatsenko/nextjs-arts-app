import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isArtsListLoading: boolean;
  isSelectedArtLoading: boolean;
  totalPages: number;
  selectedArtId: string;
  error: string | undefined;
}

const initialState: InitialState = {
  isArtsListLoading: false,
  isSelectedArtLoading: false,
  totalPages: 0,
  selectedArtId: '',
  error: '',
};

const asyncSlice = createSlice({
  name: 'asyncData',
  initialState,
  reducers: {
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setSelectedArtId(state, action) {
      state.selectedArtId = action.payload;
    },
    setIsArtsListLoading(state, action) {
      state.isArtsListLoading = action.payload;
    },
    setIsSelectedArtIdLoading(state, action) {
      state.isSelectedArtLoading = action.payload;
    },
  },
});

export const {
  setTotalPages,
  setSelectedArtId,
  setIsSelectedArtIdLoading,
  setIsArtsListLoading,
} = asyncSlice.actions;

export default asyncSlice.reducer;
