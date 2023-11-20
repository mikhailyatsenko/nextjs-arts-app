import { createSlice } from '@reduxjs/toolkit';
// import { useSearchParams } from 'react-router-dom';

// const [searchParams, setSearchParams] = useSearchParams();

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    query: localStorage.getItem('query') || '',
    currentPage: '1',
    itemsPerPage: 5,
  },
  reducers: {
    searchClick(state, action) {
      state.query = action.payload;
      localStorage.setItem('query', action.payload);
    },
    changeItemsPerPage(state, action) {
      state.itemsPerPage = Number(action.payload);
      state.currentPage = '1';
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { searchClick, setCurrentPage, changeItemsPerPage } =
  commonSlice.actions;

export default commonSlice.reducer;
