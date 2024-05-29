import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

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

type SectionCardProps = {
  name: string;
  lessons: string[];
  vocab: Vocabulary;
  image: any;
};

const SectionCard: React.FC<SectionCardProps> = ({ name, lessons, vocab, image }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const toggleCard = (name: string) => {
    setExpandedCard(expandedCard === name ? null : name);
    setExpandedLesson(null); // Collapse any expanded lesson when a different card is expanded
  };

  const toggleLesson = (name: string) => {
    setExpandedLesson(expandedLesson === name ? null : name);
  };

  const isExpanded = expandedCard === name;
  const totalDialogues = lessons.reduce(
    (acc, lesson) => acc + (vocab[name][lesson] ? Object.keys(vocab[name][lesson]).length : 0),
    0
  );
  const expandedHeight = 150 + 80 * lessons.length + 60 * totalDialogues; // Adjust height to fit lesson and dialogue cards

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

export default SectionCard;
