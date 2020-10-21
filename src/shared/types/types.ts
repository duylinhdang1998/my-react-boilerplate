import { tachyonsStyles } from '@shared/themes/tachyons';
import { ViewStyle } from 'react-native';

export type KeyTachyons = keyof typeof tachyonsStyles;

export type Tachyons = KeyTachyons | KeyTachyons[];

export type Flex = ViewStyle['flex'];

export type FlexWrap = ViewStyle['flexWrap'];

export type Column = '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '6/6';
