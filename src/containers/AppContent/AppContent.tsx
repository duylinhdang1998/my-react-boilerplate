import React from 'react';
import { View } from 'react-native';
import HomeScreen from '@containers/Home/HomeScreen';
import configureApp from '@utils/constants/configureApp';
import { ThemeProvider } from '@shared';
import { lights } from '@utils/constants/base';
import AppContainer from '@navigation/AppContainer';

export default function AppContent() {
  return (
    <ThemeProvider
      themeOverrides={{
        colors: {
          primary: configureApp?.settings?.colorPrimary,
          ...lights,
        },
      }}>
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    </ThemeProvider>
  );
}
