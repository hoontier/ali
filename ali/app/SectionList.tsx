// SectionList.tsx
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import vocabulary from '../vocabulary.json';

// Define the type for the vocabulary data
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

const vocab: Vocabulary = vocabulary as Vocabulary;

// Define the type for images
type ImageMap = {
  [key: string]: any;
};

// Manually import images using require
const images: ImageMap = {
  'Clemson Section A': require('../assets/images/Clemson Section A Cover.png'),
  'Clemson Section B': require('../assets/images/Clemson Section B Cover.png'),
  // Add more mappings as needed
};

export default function SectionList() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const arrayNames = Object.keys(vocab);

  const toggleCard = (name: string) => {
    setExpandedCard(expandedCard === name ? null : name);
    setExpandedLesson(null); // Collapse any expanded lesson when a different card is expanded
  };

  const toggleLesson = (name: string) => {
    setExpandedLesson(expandedLesson === name ? null : name);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {arrayNames.map((name, index) => {
        const isExpanded = expandedCard === name;
        const lessons = vocab[name] ? Object.keys(vocab[name]) : [];
        const totalDialogues = lessons.reduce((acc, lesson) => acc + (vocab[name][lesson] ? Object.keys(vocab[name][lesson]).length : 0), 0);
        const expandedHeight = 150 + 80 * lessons.length + 60 * totalDialogues; // Adjust height to fit lesson and dialogue cards
        return (
          <TouchableOpacity key={index} onPress={() => toggleCard(name)}>
            <View style={[styles.card, isExpanded && { height: expandedHeight }]}>
              <View style={styles.header}>
                <Image
                  style={styles.image}
                  source={images[name]}
                  onError={(error) => console.error(`Failed to load image for ${name}`, error.nativeEvent.error)}
                />
                <Text style={styles.text}>{name}</Text>
              </View>
              {isExpanded && (
                <View style={styles.lessonsContainer}>
                  {lessons.map((lesson, lessonIndex) => {
                    const isLessonExpanded = expandedLesson === lesson;
                    const dialogues = vocab[name][lesson] ? Object.keys(vocab[name][lesson]) : [];
                    return (
                      <TouchableOpacity key={lessonIndex} onPress={() => toggleLesson(lesson)}>
                        <View style={[styles.lessonCard, isLessonExpanded && { height: 60 + 60 * dialogues.length }]}>
                          <View style={styles.lessonHeader}>
                            <Text style={styles.lessonText}>{lesson}</Text>
                          </View>
                          {isLessonExpanded && (
                            <View style={styles.dialoguesContainer}>
                              {dialogues.map((dialogue, dialogueIndex) => (
                                <View key={dialogueIndex} style={styles.dialogueCard}>
                                  <Text style={styles.dialogueText}>{dialogue}</Text>
                                </View>
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
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D9DDE8',
    paddingTop: 100,
  },
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
  },
  dialogueCard: {
    width: '85%', // Slightly narrower than the lesson card
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    backgroundColor: '#FFF',
  },
  dialogueText: {
    fontSize: 14,
    color: '#000',
  },
});
