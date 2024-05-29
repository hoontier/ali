//flashcardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataItem = {
  simplified: string;
  traditional?: string;
  pinyin: string;
  english: string;
  structure?: string;
  negation?: boolean;
};

interface FlashcardState {
  deck: DataItem[];
  currentCardIndex: number;
  isFront: boolean;
  settings: { front: keyof DataItem; back: keyof DataItem };
  studiedCards: DataItem[];
  completedCards: DataItem[];
  showSettings: boolean;
}

const initialState: FlashcardState = {
  deck: [],
  currentCardIndex: 0,
  isFront: true,
  settings: { front: 'simplified', back: 'english' },
  studiedCards: [],
  completedCards: [],
  showSettings: false,
};

const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState,
  reducers: {
    setDeck: (state, action: PayloadAction<DataItem[]>) => {
      state.deck = action.payload;
    },
    setCurrentCardIndex: (state, action: PayloadAction<number>) => {
      state.currentCardIndex = action.payload;
    },
    toggleCardSide: (state) => {
      state.isFront = !state.isFront;
    },
    updateSettings: (state, action: PayloadAction<{ front: keyof DataItem; back: keyof DataItem }>) => {
      state.settings = action.payload;
    },
    addStudiedCard: (state, action: PayloadAction<DataItem>) => {
      state.studiedCards.push(action.payload);
    },
    addCompletedCard: (state, action: PayloadAction<DataItem>) => {
      state.completedCards.push(action.payload);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
    resetFlashcards: (state) => {
      state.currentCardIndex = 0;
      state.isFront = true;
      state.studiedCards = [];
      state.completedCards = [];
      state.showSettings = false;
    },
  },
});

export const {
  setDeck,
  setCurrentCardIndex,
  toggleCardSide,
  updateSettings,
  addStudiedCard,
  addCompletedCard,
  setShowSettings,
  resetFlashcards,
} = flashcardSlice.actions;

export default flashcardSlice.reducer;
