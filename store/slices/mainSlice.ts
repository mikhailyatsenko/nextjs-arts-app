import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  query: string;
  currentPage: string;
  itemsPerPage: number;
  isArtsListLoading: boolean;
  isSelectedArtLoading: boolean;
  totalPages: number;
  selectedArtId: string;
  error: string | undefined;
}

const initialState: InitialState = {
  query: '',
  currentPage: '1',
  itemsPerPage: 5,
  isArtsListLoading: false,
  isSelectedArtLoading: false,
  totalPages: 0,
  selectedArtId: '',
  error: '',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    searchClick(state, action: PayloadAction<string>) {
      state.query = action.payload;
      localStorage.setItem('query', action.payload);
    },
    changeItemsPerPage(state, action: PayloadAction<string>) {
      state.itemsPerPage = Number(action.payload);
      state.currentPage = '1';
    },
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setSelectedArtId(state, action: PayloadAction<string>) {
      state.selectedArtId = action.payload;
    },
    setIsArtsListLoading(state, action: PayloadAction<boolean>) {
      state.isArtsListLoading = action.payload;
    },
    setIsSelectedArtIdLoading(state, action: PayloadAction<boolean>) {
      state.isSelectedArtLoading = action.payload;
    },
  },
});

export const {
  searchClick,
  setCurrentPage,
  changeItemsPerPage,
  setTotalPages,
  setSelectedArtId,
  setIsSelectedArtIdLoading,
  setIsArtsListLoading,
} = mainSlice.actions;

export default mainSlice.reducer;
