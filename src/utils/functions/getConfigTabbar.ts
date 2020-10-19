import { TabStackParamList } from '@navigation/screenTypes';
import { FeatherNameType } from '@shared/types/FeatherNameType';

export const getIconTabbar = (routeName: string): FeatherNameType => {
  switch (routeName) {
    case 'Overview':
      return 'bar-chart';
    case 'Content':
      return 'youtube';
    case 'LiveRoom':
      return 'globe';
    case 'Account':
      return 'user';
    default:
      return 'activity';
  }
};

export const getLabel = (routeName: string) => {
  switch (routeName) {
    case 'Overview':
      return 'Overview';
    case 'Content':
      return 'Nội dung';
    case 'LiveRoom':
      return 'Trực tuyến';
    case 'Account':
      return 'Nhân viên';
    default:
      return routeName;
  }
};
