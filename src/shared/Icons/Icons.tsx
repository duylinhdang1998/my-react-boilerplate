import { Color, useTheme } from '@shared/ThemeContext/ThemeContext';
import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { FeatherNameType } from '@shared/types/FeatherNameType';
import { FontAwesome5NameType } from '@shared/types/FontAwesome5NameType';

export interface IconProps<T> {
  name: T;
  size?: number;
  color?: Color;
  colorNative?: string;
  style?: StyleProp<TextStyle>;
}

export const Icons = {
  FontAwesome5: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<FontAwesome5NameType>) => {
    const { colors } = useTheme();
    return <FontAwesome5 {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  Feather: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<FeatherNameType>) => {
    const { colors } = useTheme();
    return <Feather {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
};
