//List.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from './features/store';
import vocabulary from '../vocabulary.json';
import grammar from '../grammar.json';
import dialogue from '../dialogue.json';

type Dialogue = {
  simplified: string;
  traditional: string;
  pinyin: string;
  english: string;
};

type Lesson = {
  [key: string]: Dialogue[];
};

type Section = {
  [key: string]: Lesson;
};

type Vocabulary = {
  [key: string]: Section;
};

const vocabData: Vocabulary = vocabulary as Vocabulary;
const grammarData: Vocabulary = grammar as Vocabulary;
const dialogueData: Vocabulary = dialogue as Vocabulary;

const List: React.FC = () => {
  const selectedSection = useSelector((state: RootState) => state.select.selectedSection);
  const selectedLesson = useSelector((state: RootState) => state.select.selectedLesson);
  const selectedDialogue = useSelector((state: RootState) => state.select.selectedDialogue);
  const viewType = useSelector((state: RootState) => state.select.viewType);

  const dataSources: { [key: string]: Vocabulary } = {
    Vocabulary: vocabData,
    Grammar: grammarData,
    Dialogue: dialogueData,
  };

  const getWords = () => {
    if (selectedSection && selectedLesson && selectedDialogue && viewType) {
      const data = dataSources[viewType];
      return data[selectedSection]?.[selectedLesson]?.[selectedDialogue] || [];
    }
    return [];
  };

  const words = getWords();

  const renderItem = ({ item }: { item: Dialogue }) => (
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
        {words.length > 0 ? (
          <FlatList
            data={words}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noDataText}>No data available.</Text>
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
