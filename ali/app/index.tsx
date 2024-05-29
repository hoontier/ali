// index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionList from './SectionList';
import { Provider } from 'react-redux';
import store from './features/store'

export default function Index() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SectionList />
      </View>
    </Provider>
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
