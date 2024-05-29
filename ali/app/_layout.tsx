import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SectionList" options={{ title: 'Section List' }} />
        <Stack.Screen name="ContentSelect" options={{ title: 'Content Selection' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DDE8',
  },
});
