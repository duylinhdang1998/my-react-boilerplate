import React from 'react';
import { View } from 'react-native';
import HomeScreen from '@containers/Home/HomeScreen';
import configureApp from '@utils/constants/configureApp';
import { ThemeProvider } from '@shared';
import { lights } from '@utils/constants/base';

export default function AppContent() {
  return (
    <ThemeProvider
      themeOverrides={{
        colors: {
          primary: configureApp?.settings?.colorPrimary,
          ...lights,
        },
      }}>
      <View style={{ flex: 1, borderColor: 'red', borderWidth: 5, justifyContent: 'center', alignItems: 'center' }}>
        <HomeScreen />
      </View>
    </ThemeProvider>
  );
}
