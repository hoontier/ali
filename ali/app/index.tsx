import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import vocabulary from '../vocabulary.json';

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

export default function Index() {
  const arrayNames = Object.keys(vocabulary);

  // Debugging: log the imported images and paths
  console.log('Imported images:', images);

  return (
    <View style={styles.container}>
      {arrayNames.map((name, index) => (
        <View key={index} style={styles.card}>
          <Image
            style={styles.image}
            source={images[name]}
            onError={(error) => console.error(`Failed to load image for ${name}`, error.nativeEvent.error)}
          />
          <Text style={styles.text}>{name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D9DDE8',
    paddingTop: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    padding: 10,
    paddingLeft: 23,
    paddingRight: 30,
    marginBottom: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ACBAE0',
    backgroundColor: '#FFF',
  },
  image: {
    width: 101,
    height: 130.71,
    marginRight: 14,
  },
  text: {
    color: '#000',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28, // lineHeight should be a number
  },
});