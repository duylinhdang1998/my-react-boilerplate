import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const data = Array.from({ length: 30 });

export default function OverviewScreen() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const offset = useRef(0);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    navigation.setParams({ direction });
  }, [direction]);

  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > offset.current && currentOffset > 0 ? 'down' : 'up';

    offset.current = currentOffset;
    setDirection(direction);
  };

  return (
    <View style={{ flex: 1, paddingTop: inset.top }}>
      <ScrollView style={{ flex: 1 }} onScroll={_onScroll} scrollEventThrottle={16}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
