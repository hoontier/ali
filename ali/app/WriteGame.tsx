// WriteGame.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import {
 setDeck,
 setCurrentCardIndex,
 setUserInput,
 removeCardFromDeck,
 setShowSettings,
 resetGame,
} from './features/writeGameSlice';
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


const WriteGame: React.FC = () => {
 const dispatch = useDispatch();
 const { deck, currentCardIndex, userInput, showSettings, removedCards, settings } = useSelector(
   (state: RootState) => state.write
 );


 const [popupVisible, setPopupVisible] = useState(false);
 const [popupCorrect, setPopupCorrect] = useState(false);
 const [lastWord, setLastWord] = useState<DataItem | null>(null);
 const [lastUserAnswer, setLastUserAnswer] = useState(''); // To store the last user answer


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


 const handleNextCard = () => {
   if (deck.length > 0) {
     const newIndex = currentCardIndex < deck.length - 1 ? currentCardIndex + 1 : 0;
     dispatch(setCurrentCardIndex(newIndex));
   }
 };


 const handleCheckAnswer = () => {
   const currentCard = deck[currentCardIndex];
   const correct = currentCard[settings.back] === userInput;
   setPopupCorrect(correct);
   setPopupVisible(true);
   setLastWord(currentCard); // Store the current word details
   setLastUserAnswer(userInput); // Store the last user answer


   if (correct) {
     dispatch(removeCardFromDeck(currentCardIndex));
     if (currentCardIndex >= deck.length - 1) {
       dispatch(setCurrentCardIndex(0));
     }
   } else {
     handleNextCard();
   }


   dispatch(setUserInput(''));
 };


 const handleSettingsToggle = () => {
   dispatch(setShowSettings(!showSettings));
 };


 const handleReset = () => {
   dispatch(resetGame());
   fetchDeck();
 };


 const currentCard = deck[currentCardIndex];


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
             onChangeText={(text) => dispatch(setUserInput(text))}
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
       />
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
});


export default WriteGame;



