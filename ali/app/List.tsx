//List.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useSelector, Provider } from 'react-redux';
import { RootState } from './features/store';
import vocabulary from '../vocabulary.json';
import store from './features/store';

const List: React.FC = () => {
  const selectedSection = useSelector((state: RootState) => state.vocabulary.selectedSection);
  const selectedLesson = useSelector((state: RootState) => state.vocabulary.selectedLesson);
  const selectedDialogue = useSelector((state: RootState) => state.vocabulary.selectedDialogue);

  const vocabData = vocabulary as any;

  const getVocabularyWords = () => {
    if (selectedSection && selectedLesson && selectedDialogue) {
      return vocabData[selectedSection]?.[selectedLesson]?.[selectedDialogue] || [];
    }
    return [];
  };

  const vocabularyWords = getVocabularyWords();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.vocabItem}>
      <Text style={styles.vocabText}>{item.simplified} ({item.traditional}) - {item.pinyin}: {item.english}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Link href="/ContentSelect" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.content}>
        {vocabularyWords.length > 0 ? (
          <FlatList
            data={vocabularyWords}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noDataText}>No vocabulary available.</Text>
        )}
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
    paddingTop: 100,
  },
  noDataText: {
    fontSize: 18,
    color: '#000',
  },
  vocabItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderColor: '#ACBAE0',
    borderWidth: 1,
    width: '90%',
  },
  vocabText: {
    fontSize: 16,
    color: '#000',
  },
});

export default List;
