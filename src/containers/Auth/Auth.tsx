import { navigationRef } from '@navigation/navigationServices';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Home" onPress={() => console.log('123')} />
    </View>
  );
}
