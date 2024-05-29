// app/features/store.ts
import { configureStore } from '@reduxjs/toolkit';
import selectReducer from './selectSlice';

const store = configureStore({
  reducer: {
    select: selectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;