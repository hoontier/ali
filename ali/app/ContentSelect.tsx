import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContentSelect: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleVocabularyPress = () => {
    // Placeholder for navigation to the vocabulary screen
    console.log('Vocabulary button pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity style={styles.vocabularyButton} onPress={handleVocabularyPress}>
          <Text style={styles.vocabularyButtonText}>Vocabulary</Text>
        </TouchableOpacity>
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
