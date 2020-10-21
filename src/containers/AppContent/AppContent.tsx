import React from 'react';
import { View } from 'react-native';
import HomeScreen from '@containers/Home/HomeScreen';
import configureApp from '@utils/constants/configureApp';
import { ThemeProvider } from '@shared';
import { lights } from '@utils/constants/base';
import AppContainer from '@navigation/AppContainer';
import { ReThemeProvider } from '@shared/themes/restyleTheme';

export default function AppContent() {
  return (
    <ThemeProvider
      themeOverrides={{
        colors: {
          primary: configureApp?.settings?.colorPrimary,
          ...lights,
        },
      }}>
      <ReThemeProvider>
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
      </ReThemeProvider>
    </ThemeProvider>
  );
}
