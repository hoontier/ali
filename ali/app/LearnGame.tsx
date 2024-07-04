// LearnGame.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import {
  setDeck,
  setGroups,
  setUserInput,
  setShowSettings,
  resetGame,
  startGame,
  checkAnswer,
  setPopupVisible,
} from './features/learnGameSlice';
import { shuffleArray } from './utils/shuffleArray';
import { Link } from 'expo-router';
import CompletedFlashcards from './CompletedFlashcards';
import WritePopup from './WritePopup';
import WriteSettings from './WriteSettings';
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

type Vocabulary = {
  [key: string]: {
    [key: string]: {
      [key: string]: DataItem[];
    };
  };
};

const groupItems = (items: DataItem[]): DataItem[][] => {
  const grouped: DataItem[][] = [];
  for (let i = 0; i < items.length; i += 7) {
    grouped.push(items.slice(i, i + 7));
  }
  if (grouped.length > 1 && grouped[grouped.length - 1].length < 7) {
    const lastGroup = grouped.pop() || [];
    grouped[grouped.length - 1] = grouped[grouped.length - 1].concat(lastGroup);
  }
  return grouped;
};

const LearnGame: React.FC = () => {
  const dispatch = useDispatch();
  const { deck, groups, currentCardIndex, currentGroupIndex, userInput, showSettings, settings, popupVisible, popupCorrect, lastWord, lastUserAnswer, endTime, startTime } = useSelector((state: RootState) => state.learn);

  const selectedSection = useSelector((state: RootState) => state.select.selectedSection);
  const selectedLesson = useSelector((state: RootState) => state.select.selectedLesson);
  const selectedDialogue = useSelector((state: RootState) => state.select.selectedDialogue);
  const viewType = useSelector((state: RootState) => state.select.viewType);

  const dataSources: { [key: string]: Vocabulary } = {
    Vocabulary: vocabulary as Vocabulary,
    Grammar: grammar as Vocabulary,
    Dialogue: dialogue as Vocabulary,
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

  useEffect(() => {
    if (deck.length > 0) {
      const groupedDeck = groupItems(deck);
      dispatch(setGroups(groupedDeck));
    }
  }, [deck, dispatch]);

  const handleInputChange = (text: string) => {
    dispatch(setUserInput(text));
  };

  const handleCheckAnswer = () => {
    dispatch(checkAnswer());
  };

  const handleSettingsToggle = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const handleReset = () => {
    dispatch(resetGame());
    fetchDeck();
    dispatch(startGame());
  };

  const handleMarkCorrect = () => {
    dispatch(setPopupVisible(false));
  };

  const currentGroup = groups[currentGroupIndex] || [];
  const currentCard = currentGroup[currentCardIndex];
  
  return (
    <View style={styles.container}>
      <Link href="/List" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.cardContainer}>
        {currentCard ? (
          <View style={styles.card}>
            <Text style={styles.promptText}>Answer with {settings.back}:</Text>
            <Text style={styles.cardText}>{currentCard[settings.front]}</Text>
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={handleInputChange}
              onSubmitEditing={handleCheckAnswer}
              returnKeyType="done"
            />
            <Button title="Check" onPress={handleCheckAnswer} />
          </View>
        ) : (
          <CompletedFlashcards onReset={handleReset} />
        )}
      </View>
      {currentCard && (
        <View style={styles.buttonsContainer}>
          <Button title="Settings" onPress={handleSettingsToggle} />
        </View>
      )}
      {showSettings && <WriteSettings />}
      {popupVisible && lastWord && (
        <WritePopup
          visible={popupVisible}
          correct={popupCorrect}
          word={lastWord}
          userAnswer={lastUserAnswer}
          onClose={() => setPopupVisible(false)}
          onMarkCorrect={handleMarkCorrect}
        />
      )}
      {endTime > 0 && (
        <View>
          <Text style={styles.completionText}>
            Game Over! Your score: {currentGroupIndex}. Time taken: {(endTime - startTime) / 1000} seconds.
          </Text>
          <Button title="Restart Game" onPress={handleReset} />
        </View>
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
    width: 340,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    borderColor: '#ACBAE0',
    borderWidth: 1,
  },
  promptText: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LearnGame;
