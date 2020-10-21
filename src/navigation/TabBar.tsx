import React, { memo, useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, StyleSheet, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabItem from '@components/TabItem/TabItem';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shared';
import { screenWidth } from '@utils/constants/base';
import { getIconTabbar, getLabel } from '@utils/functions/getConfigTabbar';
import { useSpring } from '@shared/hooks';

export interface TabBarProps extends BottomTabBarProps {}

function TabBar({ state, navigation, descriptors }: TabBarProps) {
  const theme = useTheme();
  const inset = useSafeAreaInsets();
  const tabWidth = screenWidth / state.routes.length;

  const isVisible = state.index === 0 ? descriptors[state.routes[0].key].options.tabBarVisible : true;
  const valueAnimated = useRef(new Animated.Value(1)).current;
  const transXAnimated = useSpring({ to: 0 });
  useEffect(() => {
    if (state.index === 0) {
      if (!isVisible) {
        Animated.timing(valueAnimated, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(valueAnimated, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    } else {
      valueAnimated.setValue(0);
    }
  }, [isVisible, state.index]);

  const transY = valueAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const startAnimation = (index: number) => {
    Animated.timing(transXAnimated, {
      toValue: tabWidth * index,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, { paddingBottom: inset.bottom, paddingTop: 10, ...(state.index === 0 && { transform: [{ translateY: transY }] }) }]}>
      <Animated.View
        style={[styles.overlay, { transform: [{ translateX: transXAnimated }], width: tabWidth, backgroundColor: theme.colors.primary }]}
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
