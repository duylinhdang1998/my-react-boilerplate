import React, { memo, useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, StyleSheet, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabItem from '@components/TabItem/TabItem';
import { BottomTabBarProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shared';
import { useSpring } from '@shared/hooks';
import { screenWidth } from '@utils/constants/base';
import { getIconTabbar, getLabel } from '@utils/functions/getConfigTabbar';
import { TabStackParamList } from './screenTypes';
import { visible } from '@shopify/restyle';
import { useTiming } from '@shared/hooks/useSpring';

export interface TabBarProps extends BottomTabBarProps {}

function TabBar({ state, navigation, descriptors }: TabBarProps) {
  const theme = useTheme();
  const inset = useSafeAreaInsets();
  const tabWidth = screenWidth / state.routes.length;

  const isVisible = state.index === 0 ? descriptors[state.routes[0].key].options.tabBarVisible : true;
  const valueAnimated = useSpring({
    to: !isVisible ? 1 : 0,
  });

  const transY = valueAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: !isVisible ? [0, 100] : [1, 0],
    extrapolate: 'clamp',
  });

  const startAnimation = (index: number) => {
    Animated.timing(valueAnimated, {
      toValue: tabWidth * index,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { paddingBottom: inset.bottom, paddingTop: 10, transform: [{ translateY: transY }] }]}>
      <Animated.View
        style={[styles.overlay, { transform: [{ translateX: valueAnimated }], width: tabWidth, backgroundColor: theme.colors.primary }]}
      />
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = getLabel(route.name);
        const icon = getIconTabbar(route.name);
        if (isFocused) {
          startAnimation(index);
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return <TabItem key={index} active={isFocused} style={[styles.item, { width: tabWidth }]} onPress={onPress} icon={icon} label={label} />;
      })}
    </Animated.View>
  );
}

export default memo(TabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  item: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 2,
  },
});
