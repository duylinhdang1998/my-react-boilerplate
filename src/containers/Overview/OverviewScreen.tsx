import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BoxView from '@shared/components/Box/Box';

const data = Array.from({ length: 30 });

export default function OverviewScreen() {
  const inset = useSafeAreaInsets();

  return (
    <BoxView flex={1} justifyContent="center" alignItems="center">
      <Text>12312312</Text>
    </BoxView>
  );
}
const styles = StyleSheet.create({
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
