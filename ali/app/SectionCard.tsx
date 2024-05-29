//SectionCard.tsx
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedSection,
  setSelectedLesson,
  setSelectedDialogue,
  setExpandedSection,
  setExpandedLesson,
} from './features/selectSlice';
import { RootState } from './features/store';

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

type SectionCardProps = {
  name: string;
  lessons: string[];
  vocab: Vocabulary;
  image: any;
};

const SectionCard: React.FC<SectionCardProps> = ({ name, lessons, vocab, image }) => {
  const dispatch = useDispatch();
  const expandedSection = useSelector((state: RootState) => state.select.expandedSection);
  const expandedLesson = useSelector((state: RootState) => state.select.expandedLesson);

  const toggleCard = (sectionName: string) => {
    if (expandedSection === sectionName) {
      dispatch(setExpandedSection(null));
      dispatch(setExpandedLesson(null));
      dispatch(setSelectedSection(null));
    } else {
      dispatch(setExpandedSection(sectionName));
      dispatch(setExpandedLesson(null));
      dispatch(setSelectedSection(sectionName));
    }
  };

  const toggleLesson = (lessonName: string) => {
    if (expandedLesson === lessonName) {
      dispatch(setExpandedLesson(null));
      dispatch(setSelectedLesson(null));
    } else {
      dispatch(setExpandedLesson(lessonName));
      dispatch(setSelectedLesson(lessonName));
    }
  };

  const handleDialoguePress = (event: GestureResponderEvent, dialogue: string) => {
    event.stopPropagation();
    dispatch(setSelectedDialogue(dialogue));
  };

  const isExpanded = expandedSection === name;
  const isLessonExpanded = (lessonName: string) => expandedLesson === lessonName;

  const totalDialogues = lessons.reduce(
    (acc, lesson) => acc + (vocab[name][lesson] ? Object.keys(vocab[name][lesson]).length : 0),
    0
  );
  const expandedHeight = 150 + 80 * lessons.length + 60 * totalDialogues;

  return (
    <TouchableOpacity onPress={() => toggleCard(name)}>
      <View style={[styles.card, isExpanded && { height: expandedHeight }]}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={image}
            onError={(error) => console.error(`Failed to load image for ${name}`, error.nativeEvent.error)}
          />
          <Text style={styles.text}>{name}</Text>
        </View>
        {isExpanded && (
          <View style={styles.lessonsContainer}>
            {lessons.map((lesson, lessonIndex) => {
              const dialogues = vocab[name][lesson] ? Object.keys(vocab[name][lesson]) : [];
              return (
                <TouchableOpacity key={lessonIndex} onPress={() => toggleLesson(lesson)}>
                  <View style={[styles.lessonCard, isLessonExpanded(lesson) && { height: 60 + 60 * dialogues.length }]}>
                    <View style={styles.lessonHeader}>
                      <Text style={styles.lessonText}>{lesson}</Text>
                    </View>
                    {isLessonExpanded(lesson) && (
                      <View style={styles.dialoguesContainer}>
                        {dialogues.map((dialogue, dialogueIndex) => (
                          <TouchableOpacity
                            key={dialogueIndex}
                            onPress={(e) => handleDialoguePress(e, dialogue)}
                          >
                            <Link href="/ContentSelect" asChild>
                              <View style={styles.dialogueCard}>
                                <Text style={styles.dialogueText}>{dialogue}</Text>
                              </View>
                            </Link>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginBottom: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 101,
    height: 130.71,
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28,
    textAlign: 'center',
    marginLeft: 10,
  },
  lessonsContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center', // Center the lesson cards
  },
  lessonCard: {
    width: '85%', // Slightly narrower than the parent card
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    backgroundColor: '#FFF',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonText: {
    fontSize: 16,
    color: '#000',
  },
  dialoguesContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center', // Center the dialogue cards
    zIndex: 1,
  },
  dialogueCard: {
    width: '85%', // Slightly narrower than the lesson card
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  dialogueText: {
    fontSize: 14,
    color: '#000',
  },
});

export default SectionCard;
