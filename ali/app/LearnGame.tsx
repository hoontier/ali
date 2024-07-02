// LearnGame.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import {
  setDeck,
  setGroups,
  setCurrentCardIndex,
  setUserInput,
  removeCardFromDeck,
  setShowSettings,
  resetGame,
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

type CardKey = keyof DataItem;
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
  const { deck, groups, currentCardIndex, userInput, showSettings, removedCards, settings } = useSelector(
    (state: RootState) => state.learn
  );

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupCorrect, setPopupCorrect] = useState(false);
  const [lastWord, setLastWord] = useState<DataItem | null>(null);
  const [lastUserAnswer, setLastUserAnswer] = useState('');
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [currentGroup, setCurrentGroup] = useState<DataItem[]>([]);
  const [wasIncorrect, setWasIncorrect] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

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
      console.log('Grouped Deck:', groupedDeck);
      setCurrentGroup(shuffleArray(groupedDeck[currentGroupIndex]));
      console.log('Current Group:', groupedDeck[currentGroupIndex]);
    }
  }, [deck, currentGroupIndex, dispatch]);

  const startGame = () => {
    setStartTime(Date.now());
    setEndTime(0);
    setCurrentGroupIndex(0);
    dispatch(setCurrentCardIndex(0));
    setWasIncorrect(false);
    dispatch(setUserInput(''));
  };

  const handleNextCard = useCallback(() => {
    if (currentCardIndex + 1 >= currentGroup.length) {
      if (wasIncorrect) {
        console.log('Repeating current group due to incorrect answer.');
        setCurrentGroup(shuffleArray(groups[currentGroupIndex]));
        setWasIncorrect(false);
      } else if (currentGroupIndex + 1 < groups.length) {
        setCurrentGroupIndex(currentGroupIndex + 1);
        console.log('Current Group:', groups[currentGroupIndex + 1]);
        setCurrentGroup(shuffleArray(groups[currentGroupIndex + 1]));
        dispatch(setCurrentCardIndex(0));
      } else {
        setEndTime(Date.now());
      }
    } else {
      dispatch(setCurrentCardIndex(currentCardIndex + 1));
    }
    dispatch(setUserInput(''));
  }, [currentCardIndex, currentGroup, currentGroupIndex, groups, wasIncorrect, dispatch]);

  const handleCheckAnswer = () => {
    const currentCard = currentGroup[currentCardIndex];
    const correct = currentCard[settings.back] === userInput;
    setPopupCorrect(correct);
    setPopupVisible(true);
    setLastWord(currentCard);
    setLastUserAnswer(userInput);

    if (correct) {
      handleNextCard();
    } else {
      setWasIncorrect(true);
      handleNextCard();
    }
  };

  const handleInputChange = (text: string) => {
    dispatch(setUserInput(text));
  };

  const handleMarkCorrect = () => {
    dispatch(removeCardFromDeck(currentCardIndex));
    setPopupVisible(false);
    handleNextCard();
  };

  const handleSettingsToggle = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const handleReset = () => {
    dispatch(resetGame());
    fetchDeck();
    startGame();
  };

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
