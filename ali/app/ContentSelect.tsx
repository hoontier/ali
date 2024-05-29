import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const ContentSelect: React.FC = () => {
  const handleVocabularyPress = () => {
    // Placeholder for navigation to the vocabulary screen
    console.log('Vocabulary button pressed');
  };

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.content}>
        <Link href="/List" asChild>
          <Pressable style={styles.vocabularyButton} onPress={handleVocabularyPress}>
            <Text style={styles.vocabularyButtonText}>Vocabulary</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DDE8',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vocabularyButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ACBAE0',
    borderRadius: 5,
  },
  vocabularyButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ContentSelect;
