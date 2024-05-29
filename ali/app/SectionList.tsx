import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SectionCard from './SectionCard';
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
  const arrayNames = Object.keys(vocab);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {arrayNames.map((name, index) => {
        const lessons = vocab[name] ? Object.keys(vocab[name]) : [];
        return (
          <SectionCard
            key={index}
            name={name}
            lessons={lessons}
            vocab={vocab}
            image={images[name]}
          />
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
});
