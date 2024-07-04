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
  currentGroupIndex: number;
  userInput: string;
  removedCards: DataItem[];
  wasIncorrect: boolean;
  showSettings: boolean;
  settings: LearnGameSettings;
  startTime: number;
  endTime: number;
  popupVisible: boolean;
  popupCorrect: boolean;
  lastWord: DataItem | null;
  lastUserAnswer: string;
}

const initialState: LearnGameState = {
  deck: [],
  groups: [],
  currentCardIndex: 0,
  currentGroupIndex: 0,
  userInput: '',
  removedCards: [],
  wasIncorrect: false,
  showSettings: false,
  settings: { front: 'english', back: 'simplified' }, // Default settings
  startTime: 0,
  endTime: 0,
  popupVisible: false,
  popupCorrect: false,
  lastWord: null,
  lastUserAnswer: '',
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
    setCurrentGroupIndex: (state, action: PayloadAction<number>) => {
      state.currentGroupIndex = action.payload;
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    removeCardFromDeck: (state, action: PayloadAction<number>) => {
      const cardToRemove = state.deck[action.payload];
      state.removedCards.push(cardToRemove);
      state.deck = state.deck.filter((_, index) => index !== action.payload);
    },
    setWasIncorrect: (state, action: PayloadAction<boolean>) => {
      state.wasIncorrect = action.payload;
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
    setPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.popupVisible = action.payload;
    },
    setPopupCorrect: (state, action: PayloadAction<boolean>) => {
      state.popupCorrect = action.payload;
    },
    setLastWord: (state, action: PayloadAction<DataItem | null>) => {
      state.lastWord = action.payload;
    },
    setLastUserAnswer: (state, action: PayloadAction<string>) => {
      state.lastUserAnswer = action.payload;
    },
    resetGame: (state) => {
      state.currentCardIndex = 0;
      state.currentGroupIndex = 0;
      state.userInput = '';
      state.removedCards = [];
      state.wasIncorrect = false;
      state.showSettings = false;
      state.startTime = 0;
      state.endTime = 0;
      state.popupVisible = false;
      state.popupCorrect = false;
      state.lastWord = null;
      state.lastUserAnswer = '';
    },
    updateSettings: (state, action: PayloadAction<LearnGameSettings>) => {
      state.settings = action.payload;
    },
    startGame: (state) => {
      state.startTime = Date.now();
      state.endTime = 0;
      state.currentGroupIndex = 0;
      state.currentCardIndex = 0;
      state.wasIncorrect = false;
      state.userInput = '';
    },
    checkAnswer: (state) => {
      const currentCard = state.groups[state.currentGroupIndex][state.currentCardIndex];
      const correct = currentCard[state.settings.back] === state.userInput;
      state.popupCorrect = correct;
      state.popupVisible = true;
      state.lastWord = currentCard;
      state.lastUserAnswer = state.userInput;

      if (correct) {
        if (state.currentCardIndex + 1 >= state.groups[state.currentGroupIndex].length) {
          if (state.wasIncorrect) {
            state.currentCardIndex = 0;
            state.wasIncorrect = false;
          } else if (state.currentGroupIndex + 1 < state.groups.length) {
            state.currentGroupIndex += 1;
            state.currentCardIndex = 0;
          } else {
            state.endTime = Date.now();
          }
        } else {
          state.currentCardIndex += 1;
        }
      } else {
        state.wasIncorrect = true;
        if (state.currentCardIndex + 1 >= state.groups[state.currentGroupIndex].length) {
          state.currentCardIndex = 0;
        } else {
          state.currentCardIndex += 1;
        }
      }

      state.userInput = '';
    },
  },
});

export const {
  setDeck,
  setGroups,
  setCurrentCardIndex,
  setCurrentGroupIndex,
  setUserInput,
  removeCardFromDeck,
  setWasIncorrect,
  setShowSettings,
  setPopupVisible,
  setPopupCorrect,
  setLastWord,
  setLastUserAnswer,
  resetGame,
  updateSettings,
  startGame,
  checkAnswer,
} = learnGameSlice.actions;

export default learnGameSlice.reducer;
