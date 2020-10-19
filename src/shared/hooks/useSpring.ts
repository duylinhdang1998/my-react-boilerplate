import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export interface SpringAnimationConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface TimingAnimationConfig {
  duration: number;
}

export function useSpring(value: { to: number }, config?: SpringAnimationConfig, cb?: () => void): Animated.Value {
  const animatedValue = useRef(new Animated.Value(value.to)).current;
  useEffect(() => {
    const animation = Animated.spring(animatedValue, {
      ...config,
      toValue: value.to,
      useNativeDriver: true,
      isInteraction: true,
      restSpeedThreshold: 0.0001,
    });
    animation.start(cb);
    return () => animation.stop();
  }, [value.to]);
  return animatedValue;
}

export function useTiming(value: { to: number }, config?: TimingAnimationConfig, cb?: () => void): Animated.Value {
  const animatedValue = useRef(new Animated.Value(value.to)).current;
  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: value.to,
      duration: config?.duration,
      useNativeDriver: true,
    });
    animation.start(cb);
    return () => animation.stop();
  }, [value.to]);
  return animatedValue;
}
