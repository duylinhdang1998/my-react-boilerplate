import React, { memo, ReactNode } from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import BoxView from '../Box/Box';
import styles from './styles';
import { Color } from '@shared/ThemeContext/ThemeContext';
import { tachyonsStyles } from '@shared/themes/tachyons';
import { colors } from '@utils/constants/colors';
import Loading from '../Loading/Loading';
import Text from '../Text/Text';

type Size = 'extra-small' | 'small' | 'medium' | 'large' | undefined;

export interface ButtonProps extends TouchableOpacityProps {
  children?: ReactNode;
  block?: boolean;
  backgroundColor?: Color;
  color?: Color;
  loading?: boolean;
  LoadingComponent?: ReactNode;
  size?: Size;
}

function _getSizeStyle(size: Size) {
  switch (size) {
    case 'extra-small':
      return styles.extraSmall;
    case 'small':
      return styles.small;
    case 'medium':
      return styles.medium;
    case 'large':
      return styles.large;
    default:
      return {};
  }
}

function _getFontSizeStyle(size: Size) {
  if (size === 'large' || size === 'medium') {
    return tachyonsStyles['f5'];
  }
  if (size === 'extra-small') {
    return tachyonsStyles['f7'];
  }
  return {};
}
function Button({
  block = false,
  children,
  backgroundColor = 'primary',
  color = 'light',
  loading = false,
  LoadingComponent,
  style,
  size = 'medium',
  onPress,
  ...otherProps
}: ButtonProps) {
  const blockStyle = block ? {} : tachyonsStyles['flexWrap'];
  const sizeStyle = _getSizeStyle(size);
  const fontSizeStyle = _getFontSizeStyle(size);
  return (
    <BoxView style={[blockStyle]}>
      <TouchableOpacity
        {...otherProps}
        disabled={loading}
        onPress={onPress}
        style={[
          styles.touchable,
          sizeStyle,
          {
            backgroundColor: colors[backgroundColor],
            borderRadius: 4,
          },
          style,
        ]}>
        <BoxView flexDirection="row" justifyContent="center" alignItems="center">
          {loading ? (
            LoadingComponent ?? <Loading size="small" />
          ) : typeof children === 'string' ? (
            <Text color={color} fontWeight="600" textAlign="center" style={fontSizeStyle}>
              {children}
            </Text>
          ) : (
            children
          )}
        </BoxView>
      </TouchableOpacity>
    </BoxView>
  );
}

export default memo(Button);
