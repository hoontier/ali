//_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './features/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="SectionList" options={{ title: 'Section List', headerShown: false}} />
          <Stack.Screen name="ContentSelect" options={{ title: 'Content Selection', headerShown: false}} />
          <Stack.Screen name="List" options={{ title: 'List', headerShown: false}} />
          <Stack.Screen name="FlashcardGame" options={{ title: 'Flashcard Game', headerShown: false}} />
          <Stack.Screen name="WriteGame" options={{ title: 'Write Game', headerShown: false}} />
        </Stack>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DDE8',
  },
});
