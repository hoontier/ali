// ContentSelect.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setViewType } from './features/selectSlice';

const ContentSelect: React.FC = () => {
  const dispatch = useDispatch();

  const handleVocabularyPress = () => {
    dispatch(setViewType('Vocabulary'));
    console.log('Vocabulary button pressed');
  };

  const handleGrammarPress = () => {
    dispatch(setViewType('Grammar'));
    console.log('Grammar button pressed');
  };

  const handleDialoguePress = () => {
    dispatch(setViewType('Dialogue'));
    console.log('Dialogue button pressed');
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
          <Pressable style={styles.button} onPress={handleVocabularyPress}>
            <Text style={styles.buttonText}>Vocabulary</Text>
          </Pressable>
        </Link>
        <Link href="/List" asChild>
          <Pressable style={styles.button} onPress={handleGrammarPress}>
            <Text style={styles.buttonText}>Grammar</Text>
          </Pressable>
        </Link>
        <Link href="/List" asChild>
          <Pressable style={styles.button} onPress={handleDialoguePress}>
            <Text style={styles.buttonText}>Dialogue</Text>
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
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ACBAE0',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ContentSelect;
