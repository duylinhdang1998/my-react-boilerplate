import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Auth from '@containers/Auth/Auth';
import MyTab from './TabNavigator';
import { RootStackParamList, WrapStackParamList } from './screenTypes';

const WrapStack = createStackNavigator<WrapStackParamList>();

function WrapperStack() {
  return (
    <WrapStack.Navigator headerMode="none" initialRouteName="MyTab">
      <WrapStack.Screen name="MyTab" component={MyTab} />
    </WrapStack.Navigator>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator({ token }: { token: string }) {
  return (
    <RootStack.Navigator headerMode="none" screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      {!token ? (
        <RootStack.Screen name="Auth" component={Auth} options={{ animationTypeForReplace: 'pop', gestureEnabled: false }} />
      ) : (
        <RootStack.Screen name="Main" component={WrapperStack} options={{ gestureEnabled: false }} />
      )}
    </RootStack.Navigator>
  );
}
