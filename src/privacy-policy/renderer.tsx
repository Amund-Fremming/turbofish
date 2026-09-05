import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Markdown } from './Markdown';
import { parsePolicy, type ParsedPolicy } from './parsePolicy';
import { rawPolicies } from './policies';
import { useTheme } from './useTheme';

export const PRIVACY_BASE_PATH = '/privacy';

function fullPathFor(policy: ParsedPolicy): string {
  const suffix = policy.path.startsWith('/') ? policy.path : `/${policy.path}`;
  return `${PRIVACY_BASE_PATH}${suffix}`;
}

function normalize(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

export function matchPolicy(pathname: string): ParsedPolicy | null {
  const target = normalize(pathname);
  for (const raw of rawPolicies) {
    const policy = parsePolicy(raw);
    if (policy && normalize(fullPathFor(policy)) === target) {
      return policy;
    }
  }
  return null;
}

const PALETTE = {
  light: { background: '#FBF3E1', border: '#2E2418', text: '#2E2418' },
  dark: { background: '#1C1712', border: '#EFE6D6', text: '#EFE6D6' },
};

export function PrivacyPolicyPage({ policy }: { policy: ParsedPolicy }) {
  const { theme, toggle } = useTheme();
  const colors = PALETTE[theme];

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable
          onPress={toggle}
          style={[styles.toggle, { borderColor: colors.border }]}
          accessibilityRole="button"
          accessibilityLabel={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600' }}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Markdown source={policy.body} theme={theme} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  toggle: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  content: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});
