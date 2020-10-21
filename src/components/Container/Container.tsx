import React, { memo, ReactNode } from 'react';
import BoxView from '@shared/components/Box/Box';
import { useTheme } from '@shared';
import { StatusBar } from 'react-native';

export interface ContainerProps {
  children: ReactNode;
  Header?: ReactNode;
}

function Container({ children, Header }: ContainerProps) {
  const { size } = useTheme();
  return (
    <BoxView flex={1} backgroundColor="white">
      <StatusBar barStyle="dark-content" />
      {Header}
      <BoxView maxWidth={size.container} flex={1}>
        {children}
      </BoxView>
    </BoxView>
  );
}

export default memo(Container);
