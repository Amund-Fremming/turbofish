import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { RedRisingPage } from './src/red-rising/RedRisingPage';
import { matchPolicy, PrivacyPolicyPage } from './src/privacy-policy/renderer';

export default function App() {
  const [showRedRising, setShowRedRising] = useState(false);

  if (Platform.OS === 'web') {
    const policy = matchPolicy(window.location.pathname);
    if (policy) {
      return <PrivacyPolicyPage policy={policy} />;
    }
    if (window.location.pathname.replace(/\/+$/, '') === '/red-rising') {
      return <RedRisingPage />;
    }
  }

  if (showRedRising) return <RedRisingPage />;

  return (
    <View style={styles.container}>
      <View style={styles.sign}>
        <Text style={styles.title}>Hold your horses</Text>
        <Text style={styles.subtitle}>building in prosess</Text>
      </View>
      <Image source={require('./assets/horse.webp')} style={styles.horse} resizeMode="contain" />
      <Pressable
        onPress={() => {
          if (Platform.OS === 'web') {
            window.location.assign('/red-rising');
            return;
          }
          setShowRedRising(true);
        }}
        accessibilityRole="link"
        style={styles.redRisingLink}
      >
        <Text style={styles.redRisingLinkText}>Explore the Red Rising character index</Text>
      </Pressable>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E6D2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sign: {
    backgroundColor: '#FBF3E1',
    borderWidth: 2,
    borderColor: '#2E2418',
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    transform: [{ rotate: '-2deg' }],
    marginBottom: -8,
    zIndex: 1,
  },
  title: {
    color: '#2E2418',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#5B4C39',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  horse: {
    width: '65%',
    aspectRatio: 339 / 736,
  },
  redRisingLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  redRisingLinkText: {
    color: '#8E1B25',
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
