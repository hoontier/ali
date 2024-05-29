// index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionList from './SectionList';

export default function Index() {
  return (
    <View style={styles.container}>
      <SectionList />
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
});
