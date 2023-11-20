import { createSlice } from '@reduxjs/toolkit';
import { fetchArts } from '../asyncActions/fetchArts';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Arts {
  id: string;
  artist_display: string;
  title: string;
  image_id: string;
}

interface InitialState {
  isLoading: boolean;
  arts: Arts[];
  totalPages: number;
  selectedArtId: string;
  error: string | undefined;
}

const initialState: InitialState = {
  isLoading: false,
  arts: [],
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
  },

  extraReducers(builder) {
    builder.addCase(fetchArts.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchArts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.arts = action.payload;
    });
    builder.addCase(
      fetchArts.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { setTotalPages, setSelectedArtId } = asyncSlice.actions;

export default asyncSlice.reducer;
