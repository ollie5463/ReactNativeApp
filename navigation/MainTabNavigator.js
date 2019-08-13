import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused} // maybe add some functionality here like a highlight
      name={
        `ios-home`
      }
    />
  ),
};

HomeStack.path = '';

const PlaylistsStack = createStackNavigator(
  {
    PlaylistsStack: LinksScreen,
  },
  config
);

PlaylistsStack.navigationOptions = {
  tabBarLabel: 'Playlists',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='ios-musical-notes' />
  ),
};

PlaylistsStack.path = '';

const SearchStack = createStackNavigator(
  {
    SearchStack: SettingsScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-search'} />
  ),
};

SearchStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PlaylistsStack,
  SearchStack,
});

tabNavigator.path = '';

export default tabNavigator;
