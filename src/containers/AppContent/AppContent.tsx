import React from 'react';
import { View } from 'react-native';
import HomeScreen from '@containers/Home/HomeScreen';
import ThemeProvider from '@shared/ThemeContext/ThemeContext';
import configureApp from '@utils/constants/configureApp';

export default function AppContent() {
  return (
    <ThemeProvider
      themeOverrides={{
        colors: {
          primary: configureApp?.settings?.colorPrimary,
        },
      }}>
      <View style={{ flex: 1, borderColor: 'red', borderWidth: 5, justifyContent: 'center', alignItems: 'center' }}>
        <HomeScreen />
      </View>
    </ThemeProvider>
  );
}
