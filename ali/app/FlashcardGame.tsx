//FlashcardGame.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import {
  setDeck,
  setCurrentCardIndex,
  toggleCardSide,
  addStudiedCard,
  addCompletedCard,
  setShowSettings,
  resetFlashcards,
} from './features/flashcardSlice';
import { shuffleArray } from './utils/shuffleArray'; // A utility function to shuffle the array
import { Link } from 'expo-router';
import CompletedFlashcards from './CompletedFlashcards';

const FlashcardGame: React.FC = () => {
  const dispatch = useDispatch();
  const { deck, currentCardIndex, isFront, settings, showSettings, completedCards } = useSelector(
    (state: RootState) => state.flashcard
  );

  useEffect(() => {
    // Fetch and shuffle the deck of flashcards
    const fetchDeck = async () => {
      // Simulate fetching data based on selected section, lesson, dialogue, and viewType
      const data = [
        { simplified: '走', pinyin: 'zǒu', english: 'to walk' },
        { simplified: '路人', pinyin: 'lùrén', english: 'pedestrian' },
      ]; // Replace with actual data fetching
      dispatch(setDeck(shuffleArray(data)));
    };
    fetchDeck();
  }, [dispatch]);

  const handleNextCard = () => {
    if (currentCardIndex < deck.length - 1) {
      dispatch(setCurrentCardIndex(currentCardIndex + 1));
    } else {
      console.log('No more cards in the deck');
    }
  };

  const handleStudyAgain = () => {
    dispatch(addStudiedCard(deck[currentCardIndex]));
    handleNextCard();
  };

  const handleComplete = () => {
    dispatch(addCompletedCard(deck[currentCardIndex]));
    handleNextCard();
  };

  const handleSettingsToggle = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const handleReset = () => {
    dispatch(resetFlashcards());
  };

  const currentCard = deck[currentCardIndex];

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.cardContainer}>
        {currentCard && (
          <Pressable style={styles.card} onPress={() => dispatch(toggleCardSide())}>
            <Text style={styles.cardText}>
              {isFront ? currentCard[settings.front] as string : currentCard[settings.back] as string}
            </Text>
          </Pressable>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Study Again" onPress={handleStudyAgain} />
        <Button title="Complete" onPress={handleComplete} />
        <Button title="Settings" onPress={handleSettingsToggle} />
      </View>
      {showSettings && (
        <View style={styles.settings}>
          <Text>Settings Modal (to be implemented)</Text>
        </View>
      )}
      {completedCards.length === deck.length && (
        <CompletedFlashcards onReset={handleReset} />
      )}
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
    width: '80%',
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
