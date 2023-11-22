import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import asyncReducer from './slices/asyncSlice';
import { artsApi } from '../services/ArtsService';

const store = configureStore({
  reducer: {
    common: commonReducer,
    async: asyncReducer,
    [artsApi.reducerPath]: artsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
