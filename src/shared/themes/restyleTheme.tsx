import React, { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeProvider as ReStyleThemeProvider, createText, createBox, useTheme as useReTheme } from '@shopify/restyle';
import { colors } from '@utils/constants/colors';

const theme = {
  colors: colors,
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  radius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      color: 'background',
      textAlign: 'center',
    },
    title1: {
      fontSize: 30,
      color: 'dark1',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      color: 'secondary',
    },
    title3: {
      fontSize: 16,
      color: 'secondary',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      color: 'secondary',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const ReThemeProvider = ({ children }: { children: ReactNode }) => <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>;

export type ReTheme = typeof theme;

const useTheme = () => useReTheme<ReTheme>();
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T>>(styles: (theme: ReTheme) => T) => () => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};
