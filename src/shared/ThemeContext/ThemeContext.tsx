import React, { createContext, ReactNode, useContext } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors as defaultColors } from '@utils/constants/colors';
import defaultSize from '@utils/constants/sizes';

export type ColorTypes = typeof defaultColors;
export type SizeTypes = typeof defaultSize;

export interface ThemeOverrides {
  colors?: Partial<ColorTypes>;
  size?: Partial<SizeTypes>;
}

export interface ThemeProviderProps {
  themeOverrides?: ThemeOverrides;
  children: ReactNode;
}

export const defaultTheme = {
  colors: defaultColors,
  size: defaultSize,
};
export type Theme = typeof defaultTheme;

const ThemeContext = createContext(defaultTheme);

export default function ThemeProvider({ themeOverrides = defaultTheme, children }: ThemeProviderProps) {
  const colors = { ...defaultColors, ...themeOverrides.colors };
  const size = { ...defaultSize, ...themeOverrides.size };

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ ...themeOverrides, colors, size }}>{children}</ThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export const ThemeConsumer = ThemeContext.Consumer;

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
