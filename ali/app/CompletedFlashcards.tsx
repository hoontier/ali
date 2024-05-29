//CompletedFlashcards.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type CompletedFlashcardsProps = {
  onReset: () => void;
};

const CompletedFlashcards: React.FC<CompletedFlashcardsProps> = ({ onReset }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations! You've completed the flashcards.</Text>
      <View style={styles.buttonsContainer}>
        <Link href="/List" asChild>
          <Button title="Return to List" />
        </Link>
        <Button title="Reset Flashcards" onPress={onReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#ACBAE0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default CompletedFlashcards;
