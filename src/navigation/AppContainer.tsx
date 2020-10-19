import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react';
import { navigate, navigationRef } from './navigationServices';
import RootNavigator from './RootNavigator';

export default function AppContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator token="12321" />
    </NavigationContainer>
  );
}
