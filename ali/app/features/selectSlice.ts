// app/features/selectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectState {
  selectedSection: string | null;
  selectedLesson: string | null;
  selectedDialogue: string | null;
  expandedSection: string | null;
  expandedLesson: string | null;
  viewType: 'Vocabulary' | 'Grammar' | 'Dialogue' | null; // New state to track the view type
}

const initialState: SelectState = {
  selectedSection: null,
  selectedLesson: null,
  selectedDialogue: null,
  expandedSection: null,
  expandedLesson: null,
  viewType: null, // Initialize the new state
};

const selectSlice = createSlice({
  name: 'select',
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
    setViewType: (state, action: PayloadAction<'Vocabulary' | 'Grammar' | 'Dialogue' | null>) => {
      state.viewType = action.payload;
    },
  },
});

export const {
  setSelectedSection,
  setSelectedLesson,
  setSelectedDialogue,
  setExpandedSection,
  setExpandedLesson,
  setViewType, // Export the new action
} = selectSlice.actions;
export default selectSlice.reducer;
