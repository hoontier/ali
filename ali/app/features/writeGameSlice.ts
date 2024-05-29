//writeGameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataItem = {
  simplified: string;
  traditional?: string;
  pinyin: string;
  english: string;
  structure?: string;
};

interface WriteGameSettings {
  front: keyof DataItem;
  back: keyof DataItem;
}

interface WriteGameState {
  deck: DataItem[];
  currentCardIndex: number;
  userInput: string;
  removedCards: DataItem[];
  showSettings: boolean;
  settings: WriteGameSettings;
}

const initialState: WriteGameState = {
  deck: [],
  currentCardIndex: 0,
  userInput: '',
  removedCards: [],
  showSettings: false,
  settings: { front: 'english', back: 'simplified' }, // Default settings
};

const writeGameSlice = createSlice({
  name: 'writeGame',
  initialState,
  reducers: {
    setDeck: (state, action: PayloadAction<DataItem[]>) => {
      state.deck = action.payload;
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
    updateSettings: (state, action: PayloadAction<WriteGameSettings>) => {
      state.settings = action.payload;
    },
  },
});

export const {
  setDeck,
  setCurrentCardIndex,
  setUserInput,
  removeCardFromDeck,
  setShowSettings,
  resetGame,
  updateSettings,
} = writeGameSlice.actions;

export default writeGameSlice.reducer;
