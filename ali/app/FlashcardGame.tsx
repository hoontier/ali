//FlashcardGame.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import {
  setDeck,
  setCurrentCardIndex,
  toggleCardSide,
  removeCardFromDeck,
  setShowSettings,
  resetFlashcards,
  resetCardSide,
} from './features/flashcardSlice';
import { shuffleArray } from './utils/shuffleArray';
import { Link } from 'expo-router';
import CompletedFlashcards from './CompletedFlashcards';
import FlashcardSettings from './FlashcardSettings';
import vocabulary from '../vocabulary.json';
import grammar from '../grammar.json';
import dialogue from '../dialogue.json';

type DataItem = {
  simplified: string;
  traditional?: string;
  pinyin: string;
  english: string;
  structure?: string;
};

type Lesson = {
  [key: string]: DataItem[];
};

type Section = {
  [key: string]: Lesson;
};

type Vocabulary = {
  [key: string]: Section;
};

const vocabData: Vocabulary = vocabulary as Vocabulary;
const grammarData: Vocabulary = grammar as Vocabulary;
const dialogueData: Vocabulary = dialogue as Vocabulary;

type CardKey = keyof DataItem;

const FlashcardGame: React.FC = () => {
  const dispatch = useDispatch();
  const { deck, currentCardIndex, isFront, settings, showSettings } = useSelector(
    (state: RootState) => state.flashcard
  );
  const selectedSection = useSelector((state: RootState) => state.select.selectedSection);
  const selectedLesson = useSelector((state: RootState) => state.select.selectedLesson);
  const selectedDialogue = useSelector((state: RootState) => state.select.selectedDialogue);
  const viewType = useSelector((state: RootState) => state.select.viewType);

  const dataSources: { [key: string]: Vocabulary } = {
    Vocabulary: vocabData,
    Grammar: grammarData,
    Dialogue: dialogueData,
  };

  const fetchDeck = async () => {
    if (selectedSection && selectedLesson && selectedDialogue && viewType) {
      const data = dataSources[viewType][selectedSection]?.[selectedLesson]?.[selectedDialogue] || [];
      dispatch(setDeck(shuffleArray(data)));
    }
  };

  useEffect(() => {
    fetchDeck();
  }, [selectedSection, selectedLesson, selectedDialogue, viewType, dispatch]);

  const handleNextCard = () => {
    if (deck.length > 0) {
      const newIndex = currentCardIndex < deck.length - 1 ? currentCardIndex + 1 : 0;
      dispatch(setCurrentCardIndex(newIndex));
      dispatch(resetCardSide());
    }
  };

  const handleStudyAgain = () => {
    handleNextCard();
  };

  const handleComplete = () => {
    dispatch(removeCardFromDeck(currentCardIndex));
    setTimeout(() => {
      if (deck.length > 1) {
        handleNextCard();
      }
    }, 0);
  };

  const handleSettingsToggle = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const handleReset = () => {
    dispatch(resetFlashcards());
    fetchDeck();
  };

  const currentCard = deck[currentCardIndex];

  const renderCardContent = (keys: CardKey[]) => {
    return keys.map((key) => (
      <Text key={key} style={styles.cardText}>
        {currentCard[key as keyof DataItem]}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.cardContainer}>
        {currentCard ? (
          <Pressable style={styles.card} onPress={() => dispatch(toggleCardSide())}>
            {isFront ? renderCardContent(settings.front) : renderCardContent(settings.back)}
          </Pressable>
        ) : (
          <CompletedFlashcards onReset={handleReset} />
        )}
      </View>
      {currentCard && (
        <View style={styles.buttonsContainer}>
          <Button title="Study Again" onPress={handleStudyAgain} />
          <Button title="Complete" onPress={handleComplete} />
          <Button title="Settings" onPress={handleSettingsToggle} />
        </View>
      )}
      {showSettings && <FlashcardSettings />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DDE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#ACBAE0',
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 600,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    borderColor: '#ACBAE0',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  settings: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#ACBAE0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlashcardGame;
