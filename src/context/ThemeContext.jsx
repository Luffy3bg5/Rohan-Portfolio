import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Studio',
    shortName: 'Midnight',
    description: 'Charcoal & Lime',
    metaColor: '#0A0B0E',
    colorScheme: 'dark',
    accentColor: '#B8F36B'
  },
  {
    id: 'cyber',
    name: 'Cyber Neon',
    shortName: 'Cyber',
    description: 'Obsidian, Cyan & Violet',
    metaColor: '#06070B',
    colorScheme: 'dark',
    accentColor: '#00F0FF'
  },
  {
    id: 'daylight',
    name: 'Daylight',
    shortName: 'Daylight',
    description: 'Warm White & Sage',
    metaColor: '#FBFBF9',
    colorScheme: 'light',
    accentColor: '#1F6E43'
  }
];

const THEME_STORAGE_KEY = 'rohan_portfolio_theme';
const DEFAULT_THEME = 'midnight';

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
  currentThemeConfig: THEMES[0]
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch {
      // localStorage may be disabled
    }
    return DEFAULT_THEME;
  });

  const setTheme = (newTheme) => {
    if (!THEMES.some(t => t.id === newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // localStorage may be disabled
    }
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const themeConfig = THEMES.find(t => t.id === theme) || THEMES[0];
    const root = document.documentElement;

    // Apply data-theme attribute for CSS scoping
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = themeConfig.colorScheme;

    // Update browser theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeConfig.metaColor);
    }

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', themeConfig.colorScheme);
    }
  }, [theme]);

  const currentThemeConfig = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, currentThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
