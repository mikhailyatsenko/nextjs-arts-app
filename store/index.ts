import { configureStore } from '@reduxjs/toolkit';
// import mainReducer from './slices/mainSlice';
import { artsApi } from '@/services/ArtService';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: {
    // main: mainReducer,
    [artsApi.reducerPath]: artsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
const makeStore: MakeStore<AppStore> = () => store;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

export default store;
