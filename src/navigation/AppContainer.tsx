import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { navigate, navigationRef } from './navigationServices';
import RootNavigator from './RootNavigator';
import { tokenSelector } from '@containers/Auth/selector';
import { NavigationContainer } from '@react-navigation/native';

export default function AppContainer() {
  const token = useSelector(tokenSelector);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator token={token} />
    </NavigationContainer>
  );
}
