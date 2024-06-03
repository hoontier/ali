//WritePopup.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';

type WritePopupProps = {
  visible: boolean;
  correct: boolean;
  word: {
    simplified: string;
    pinyin: string;
    english: string;
  };
  userAnswer: string;
  onClose: () => void;
  onMarkCorrect: () => void; // Add this prop
};

const WritePopup: React.FC<WritePopupProps> = ({
  visible,
  correct,
  word,
  userAnswer,
  onClose,
  onMarkCorrect, // Destructure this prop
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.resultText}>
            {correct ? 'Correct!' : 'Incorrect'}
          </Text>
          <View style={styles.wordDetails}>
            <Text style={styles.wordText}>Simplified: {word.simplified}</Text>
            <Text style={styles.wordText}>Pinyin: {word.pinyin}</Text>
            <Text style={styles.wordText}>English: {word.english}</Text>
            <Text style={styles.wordText}>Your Answer: {userAnswer}</Text>
          </View>
          {!correct && ( // Only show the button if the answer was incorrect
            
            <Button title="I was correct" onPress={onMarkCorrect} />
          )}
          <Button title="Close" onPress={onClose} />

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wordDetails: {
    marginBottom: 20,
  },
  wordText: {
    fontSize: 18,
    marginBottom: 5,
  } 
});

export default WritePopup;