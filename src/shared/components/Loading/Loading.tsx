import React, { memo } from 'react';
import { CircleSnail } from 'react-native-progress';
import BoxView from '../Box/Box';

export interface LoadingProps {
  size?: 'medium' | 'small' | 'large' | number;
}

function Loading({ size = 'medium' }: LoadingProps) {
  const _getSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'medium':
        return 30;
      case 'large':
        return 40;
      default:
        return size;
    }
  };

  return (
    <BoxView flex={1} justifyContent="center" alignItems="center">
      <CircleSnail size={_getSize()} duration={800} spinDuration={2000} thickness={2} color={['#3ece7e', '#f4b34d', '#FE5E33']} />
    </BoxView>
  );
}

export default memo(Loading);
