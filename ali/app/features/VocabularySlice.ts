// app/features/VocabularySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VocabularyState {
  selectedSection: string | null;
  selectedLesson: string | null;
  selectedDialogue: string | null;
  expandedSection: string | null;
  expandedLesson: string | null;
}

const initialState: VocabularyState = {
  selectedSection: null,
  selectedLesson: null,
  selectedDialogue: null,
  expandedSection: null,
  expandedLesson: null,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setSelectedSection: (state, action: PayloadAction<string | null>) => {
      state.selectedSection = action.payload;
    },
    setSelectedLesson: (state, action: PayloadAction<string | null>) => {
      state.selectedLesson = action.payload;
    },
    setSelectedDialogue: (state, action: PayloadAction<string | null>) => {
      state.selectedDialogue = action.payload;
    },
    setExpandedSection: (state, action: PayloadAction<string | null>) => {
      state.expandedSection = action.payload;
    },
    setExpandedLesson: (state, action: PayloadAction<string | null>) => {
      state.expandedLesson = action.payload;
    },
  },
});

export const {
  setSelectedSection,
  setSelectedLesson,
  setSelectedDialogue,
  setExpandedSection,
  setExpandedLesson,
} = vocabularySlice.actions;
export default vocabularySlice.reducer;
