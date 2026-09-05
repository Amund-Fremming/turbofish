import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

export type ThemeName = 'light' | 'dark';

const STORAGE_KEY = 'privacy-policy-theme';

function readStoredTheme(): ThemeName | null {
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeName>(
    () => readStoredTheme() ?? (systemScheme === 'dark' ? 'dark' : 'light')
  );

  useEffect(() => {
    try {
      window.localStorage?.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore — e.g. private browsing with storage disabled
    }
  }, [theme]);

  const toggle = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  return { theme, toggle };
}
