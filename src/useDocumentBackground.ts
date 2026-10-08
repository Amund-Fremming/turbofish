import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useDocumentBackground(color: string) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  }, [color]);
}
