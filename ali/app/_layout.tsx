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
          <Stack.Screen name="SectionList" options={{ title: 'Section List' }} />
          <Stack.Screen name="ContentSelect" options={{ title: 'Content Selection' }} />
          <Stack.Screen name="List" options={{ title: 'Vocabulary List' }} />
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
