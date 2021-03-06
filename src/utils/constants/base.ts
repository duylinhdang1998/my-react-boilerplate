import { Platform, Dimensions, StatusBar } from 'react-native';

export const sizeBase = 14;

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const isIphoneX = () => {
  const { width, height } = Dimensions.get('window');
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812 || height === 896 || width === 896);
};

export const bottomBarHeight = isIphoneX() ? 23 : 0;

export const statusBarHeight = Platform.select({
  ios: 24,
  android: StatusBar.currentHeight,
});

export const lights = {
  dark1: '#111111',
  dark2: '#444444',
  dark3: '#888888',
  dark4: '#cccccc',
  gray1: '#d6d6da',
  gray2: '#e7e7ed',
  gray3: '#f0f0f3',
  gray4: '#fafafb',
  gray5: '#fbfbfc',
  light: '#ffffff',
};

export const darks = {
  dark1: '#F1F1F1',
  dark2: '#E3E3E3',
  dark3: '#909090',
  dark4: '#585858',
  gray1: '#50504C',
  gray2: '#42423D',
  gray3: '#3B3B37',
  gray4: '#333332',
  gray5: '#323231',
  light: '#2F2F2F',
};
