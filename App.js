import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>::&lt;TurboFish&gt;</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#b366ff',
    fontSize: 28,
    fontWeight: '600',
    textShadowColor: '#b366ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});
