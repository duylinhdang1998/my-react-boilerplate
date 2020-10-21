import React, { ReactNode } from 'react';
import { ReTheme } from '@shared/themes/restyleTheme';
import { createBox, BoxProps } from '@shopify/restyle';
import { StyleProp, ViewStyle } from 'react-native';
import { Tachyons } from '@shared/types/types';
import { getTachyonsStyle } from '@shared/utils/getTachyonsStyle';

const Box = createBox<ReTheme>();

export interface BoxViewProps extends BoxProps<ReTheme> {
  style?: StyleProp<ViewStyle>;
  tachyons?: Tachyons;
  children?: ReactNode;
}

function BoxView({ style = {}, tachyons = [], children, ...props }: BoxViewProps) {
  return (
    <Box {...props} style={[style, getTachyonsStyle(tachyons)]}>
      {children}
    </Box>
  );
}

export default BoxView;
