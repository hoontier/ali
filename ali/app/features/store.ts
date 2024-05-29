// app/features/store.ts
import { configureStore } from '@reduxjs/toolkit';
import vocabularyReducer from './VocabularySlice';

const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;