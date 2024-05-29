// app/features/VocabularySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VocabularyState {
  selectedSection: string | null;
  selectedLesson: string | null;
  selectedDialogue: string | null;
}

const initialState: VocabularyState = {
  selectedSection: null,
  selectedLesson: null,
  selectedDialogue: null,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setSelectedSection: (state, action: PayloadAction<string>) => {
      state.selectedSection = action.payload;
    },
    setSelectedLesson: (state, action: PayloadAction<string>) => {
      state.selectedLesson = action.payload;
    },
    setSelectedDialogue: (state, action: PayloadAction<string>) => {
      state.selectedDialogue = action.payload;
    },
  },
});

export const { setSelectedSection, setSelectedLesson, setSelectedDialogue } = vocabularySlice.actions;
export default vocabularySlice.reducer;
