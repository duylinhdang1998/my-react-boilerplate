import React from 'react';
import { View, Text, StyleProp, ViewStyle, TouchableWithoutFeedbackProps, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icons } from '@shared';
import { Color, useTheme } from '@shared/ThemeContext/ThemeContext';
import { FeatherNameType } from '@shared/types/FeatherNameType';

const inactiveColor: Color = 'dark3';

export interface TabItemProps {
  style?: StyleProp<ViewStyle>;
  icon: FeatherNameType;
  label: string;
  active: boolean;
  onPress: TouchableWithoutFeedbackProps['onPress'];
}

export default function TabItem({ style, icon, label, active, onPress }: TabItemProps) {
  const theme = useTheme();
  const colorIcon = active ? 'primary' : inactiveColor;
  const colorText = active ? theme.colors.primary : theme.colors.dark3;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={styles.center}>
          <View>
            <Icons.Feather name={icon} size={25} color={colorIcon} />
          </View>
          <Text style={[styles.label, { color: colorText }]}>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
    paddingVertical: 5,
  },
});
