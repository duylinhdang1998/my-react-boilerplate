import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '@containers/Account/AccountScreen';
import { TabStackParamList } from './screenTypes';
import OverviewScreen from '@containers/Overview/OverviewScreen';
import ContentScreen from '@containers/Content/ContentScreen';
import LiveRoomScreen from '@containers/LiveRoom/LiveRoomScreen';
import TabBar from './TabBar';
import { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function MyTab() {
  const getTabbarVisible = (route: RouteProp<TabStackParamList, 'Overview'>) => {
    const params = route.params;
    if (params) {
      if (params.direction === 'down') {
        return false;
      }
    }
    return true;
  };
  return (
    <Tab.Navigator initialRouteName="Overview" tabBar={(props) => <TabBar {...props} />} tabBarOptions={{ keyboardHidesTabBar: true }}>
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={({ route }) => {
          return {
            tabBarVisible: getTabbarVisible(route),
          };
        }}
      />
      <Tab.Screen name="Content" component={ContentScreen} />
      <Tab.Screen name="LiveRoom" component={LiveRoomScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
