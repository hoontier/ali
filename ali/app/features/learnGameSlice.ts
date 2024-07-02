// learnGameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataItem = {
  simplified: string;
  traditional?: string;
  pinyin: string;
  english: string;
  structure?: string;
};

interface LearnGameSettings {
  front: keyof DataItem;
  back: keyof DataItem;
}

interface LearnGameState {
  deck: DataItem[];
  groups: DataItem[][];
  currentCardIndex: number;
  userInput: string;
  removedCards: DataItem[];
  showSettings: boolean;
  settings: LearnGameSettings;
}

const initialState: LearnGameState = {
  deck: [],
  groups: [],
  currentCardIndex: 0,
  userInput: '',
  removedCards: [],
  showSettings: false,
  settings: { front: 'english', back: 'simplified' }, // Default settings
};

const learnGameSlice = createSlice({
  name: 'learnGame',
  initialState,
  reducers: {
    setDeck: (state, action: PayloadAction<DataItem[]>) => {
      state.deck = action.payload;
    },
    setGroups: (state, action: PayloadAction<DataItem[][]>) => {
      state.groups = action.payload;
    },
    setCurrentCardIndex: (state, action: PayloadAction<number>) => {
      state.currentCardIndex = action.payload;
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    removeCardFromDeck: (state, action: PayloadAction<number>) => {
      const cardToRemove = state.deck[action.payload];
      state.removedCards.push(cardToRemove);
      state.deck = state.deck.filter((_, index) => index !== action.payload);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
    resetGame: (state) => {
      state.currentCardIndex = 0;
      state.userInput = '';
      state.removedCards = [];
      state.showSettings = false;
    },
    updateSettings: (state, action: PayloadAction<LearnGameSettings>) => {
      state.settings = action.payload;
    },
  },
});

export const {
  setDeck,
  setGroups,
  setCurrentCardIndex,
  setUserInput,
  removeCardFromDeck,
  setShowSettings,
  resetGame,
  updateSettings,
} = learnGameSlice.actions;

export default learnGameSlice.reducer;
