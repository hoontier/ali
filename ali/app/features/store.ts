// app/features/store.ts
import { configureStore } from '@reduxjs/toolkit';
import selectReducer from './selectSlice';
import flashcardReducer from './flashcardSlice';

const store = configureStore({
  reducer: {
    select: selectReducer,
    flashcard: flashcardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;