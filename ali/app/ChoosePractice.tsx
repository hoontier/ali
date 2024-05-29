//ChoosePractice.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const ChoosePractice: React.FC = () => {
  const handleFlashcardsPress = () => {
    console.log('Flashcards button pressed');
  };

  const handleWritingPress = () => {
    console.log('Writing button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Choose How to Practice</Text>
        <Link href="/FlashcardGame" asChild>
          <Pressable style={styles.button} onPress={handleFlashcardsPress}>
            <Text style={styles.buttonText}>Flashcards</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.button} onPress={handleWritingPress}>
          <Text style={styles.buttonText}>Writing</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderColor: '#ACBAE0',
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ACBAE0',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ChoosePractice;
