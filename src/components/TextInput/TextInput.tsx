import React, { forwardRef, memo } from 'react';
import { TextInput as RNInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FeatherNameType } from '@shared/types/FeatherNameType';
import { BoxView, Icons, Text, useTheme } from '@shared';
import { Color } from '@shared/ThemeContext/ThemeContext';

export interface InputProps extends TextInputProps {
  textColor?: Color;
  icon?: FeatherNameType;
  touched?: boolean;
  errors?: boolean;
}

const TextInput = forwardRef<RNInput, InputProps>(({ textColor = 'dark2', icon = 'user', touched, errors, ...props }, ref) => {
  const theme = useTheme();
  const validationColor: Color = errors ? 'danger' : 'dark2';
  const color = !touched ? textColor : validationColor;
  return (
    <BoxView
      flexDirection="row"
      height={48}
      alignItems="center"
      borderRadius={theme.size.radius}
      borderWidth={StyleSheet.hairlineWidth}
      borderColor={color}
      padding="s">
      <BoxView padding="s">
        <Text color={color}>
          <Icons.Feather name={icon} size={16} color={color} />
        </Text>
      </BoxView>
      <BoxView flex={1}>
        <RNInput underlineColorAndroid="transparent" placeholderTextColor={theme.colors[color]} style={{ height: 48 }} ref={ref} {...props} />
      </BoxView>
      {touched && !!errors && <Icon name="alert-circle" size={18} color={theme.colors.danger} />}
    </BoxView>
  );
});

export default TextInput;
