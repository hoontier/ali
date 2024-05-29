//flashcardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CardKey = 'simplified' | 'traditional' | 'pinyin' | 'english' | 'structure' ;

type DataItem = {
  simplified: string;
  traditional?: string;
  pinyin: string;
  english: string;
  structure?: string;
};

interface FlashcardState {
  deck: DataItem[];
  currentCardIndex: number;
  isFront: boolean;
  settings: { front: CardKey[]; back: CardKey[] };
  removedCards: DataItem[];
  showSettings: boolean;
}

const initialState: FlashcardState = {
  deck: [],
  currentCardIndex: 0,
  isFront: true,
  settings: { front: ['simplified'], back: ['english'] },
  removedCards: [],
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
    resetCardSide: (state) => {
      state.isFront = true;
    },
    updateSettings: (state, action: PayloadAction<{ front: CardKey[]; back: CardKey[] }>) => {
      state.settings = action.payload;
    },
    removeCardFromDeck: (state, action: PayloadAction<number>) => {
      const removedCard = state.deck.splice(action.payload, 1)[0];
      state.removedCards.push(removedCard);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
    resetFlashcards: (state) => {
      state.currentCardIndex = 0;
      state.isFront = true;
      state.removedCards = [];
    },
  },
});

export const {
  setDeck,
  setCurrentCardIndex,
  toggleCardSide,
  resetCardSide,
  updateSettings,
  removeCardFromDeck,
  setShowSettings,
  resetFlashcards,
} = flashcardSlice.actions;

export default flashcardSlice.reducer;
