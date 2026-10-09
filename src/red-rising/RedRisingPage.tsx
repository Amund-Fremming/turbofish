import { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import characters from './characters.md';
import { Markdown } from '../privacy-policy/Markdown';
import { useTheme } from '../privacy-policy/useTheme';
import { useDocumentBackground } from '../useDocumentBackground';

const PORTRAITS: Record<string, { name: string; images: ImageSourcePropType[] }> = {
  adrius: { name: 'Adrius au Augustus', images: [require('../../assets/red-rising/adrius_au_augustus.webp')] },
  nero: { name: 'Nero au Augustus', images: [require('../../assets/red-rising/nero_au_augustus.webp')] },
  virginia: { name: 'Virginia au Augustus', images: [require('../../assets/red-rising/virginia_au_augustus.jpg')] },
  cassius: { name: 'Cassius au Bellona', images: [require('../../assets/red-rising/cassius_au_bellona.jpg')] },
  fitchner: { name: 'Fitchner au Barca', images: [require('../../assets/red-rising/fitchner_au_barca.webp')] },
  sevro: { name: 'Sevro au Barca', images: [require('../../assets/red-rising/sevro_au_barca.webp')] },
  aja: { name: 'Aja au Grimmus', images: [require('../../assets/red-rising/aja_au_grimmus.webp')] },
  victra: { name: 'Victra au Julii', images: [require('../../assets/red-rising/vicra_au_julii.webp')] },
  octavia: { name: 'Octavia au Lune', images: [require('../../assets/red-rising/octavia_au_lune.webp')] },
  lorn: { name: 'Lorn au Arcos', images: [require('../../assets/red-rising/lorn_au_arcos.webp')] },
  roque: { name: 'Roque au Fabii', images: [require('../../assets/red-rising/roque_au_fabii.webp')] },
  daxo: { name: 'Daxo au Telemanus', images: [require('../../assets/red-rising/daxo_au_telemanus.webp')] },
  kavax: { name: 'Kavax au Telemanus', images: [require('../../assets/red-rising/kavax_au_telemanus.webp')] },
  tactus: { name: 'Tactus au Valii', images: [require('../../assets/red-rising/tactus_au_valii-rath.webp')] },
  romulus: { name: 'Romulus au Raa', images: [require('../../assets/red-rising/romulus_au_raa.jpg')] },
  ragnar: { name: 'Ragnar Volarus', images: [require('../../assets/red-rising/ragnar_volarus.webp')] },
  sefi: { name: 'Sefi Volarus', images: [require('../../assets/red-rising/sefi_volarus.webp')] },
  darrow: { name: 'Darrow of Lykos', images: [require('../../assets/red-rising/darrow_lykos.webp'), require('../../assets/red-rising/darrow_lykos.jpg')] },
  eo: { name: 'Eo of Lykos', images: [require('../../assets/red-rising/eo_au_lykos.jpg')] },
  harmony: { name: 'Harmony', images: [require('../../assets/red-rising/harmony.jpg')] },
  quicksilver: { name: 'Quicksilver', images: [require('../../assets/red-rising/quicksilver.webp')] },
};

const PALETTE = {
  light: { background: '#F4EEE2', surface: '#FBF7EF', text: '#2E2418', muted: '#756752', accent: '#9E2631', border: '#D7CBB7' },
  dark: { background: '#1C1712', surface: '#28211A', text: '#EFE6D6', muted: '#B9AC96', accent: '#E06A70', border: '#58483A' },
};

export function RedRisingPage() {
  const { theme, toggle } = useTheme();
  const colors = PALETTE[theme];
  useDocumentBackground(colors.background);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const selectedPortrait = selectedCharacter ? PORTRAITS[selectedCharacter] : null;
  const imageHeight = Math.min(Dimensions.get('window').height * 0.56, 520);

  function handleLinkPress(href: string): boolean {
    const prefix = 'character:';
    if (!href.startsWith(prefix)) return false;

    const characterId = href.slice(prefix.length);
    if (!(characterId in PORTRAITS)) return true;

    setSelectedCharacter(characterId);
    return true;
  }

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <View style={[styles.topbar, { borderBottomColor: colors.border }]}>
        <Text style={[styles.wordmark, { color: colors.accent }]}>THE SOCIETY</Text>
        <Pressable
          onPress={toggle}
          style={[styles.themeButton, { borderColor: colors.border }]}
          accessibilityRole="button"
          accessibilityLabel={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600' }}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.kicker, { color: colors.muted }]}>ARCHIVE 01 / CHARACTER INDEX</Text>
        <Markdown
          source={characters}
          theme={theme}
          onLinkPress={handleLinkPress}
          linkColor={colors.accent}
        />
      </ScrollView>
      <Modal
        visible={selectedPortrait !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCharacter(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {selectedPortrait?.name}
              </Text>
              <Pressable
                onPress={() => setSelectedCharacter(null)}
                accessibilityRole="button"
                accessibilityLabel="Close portrait"
                style={[styles.closeButton, { borderColor: colors.border }]}
              >
                <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600' }}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.portraitRow}>
              {selectedPortrait?.images.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  resizeMode="contain"
                  style={[styles.portrait, { height: imageHeight }]}
                  accessibilityLabel={selectedPortrait.name}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 'env(safe-area-inset-top)' : 0,
    paddingBottom: Platform.OS === 'web' ? 'env(safe-area-inset-bottom)' : 0,
  },
  topbar: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  wordmark: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  themeButton: { borderWidth: 1, borderRadius: 4, paddingVertical: 6, paddingHorizontal: 12 },
  content: { maxWidth: 760, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  kicker: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 16 },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(12, 10, 8, 0.82)',
  },
  modalContent: { width: '100%', maxWidth: 680, padding: 16, borderRadius: 4 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  modalTitle: { flex: 1, fontSize: 18, fontWeight: '700', marginRight: 12 },
  closeButton: { borderWidth: 1, borderRadius: 4, paddingVertical: 6, paddingHorizontal: 12 },
  portraitRow: { flexDirection: 'row', gap: 8 },
  portrait: { flex: 1 },
});