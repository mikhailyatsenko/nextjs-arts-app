import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import asyncReducer from './slices/asyncSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
    async: asyncReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
