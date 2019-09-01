import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Earnings from "./../screens/Earning"
import ProfileView from '../screens/ProfileView';
/* const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};
 */

const DashStack = createStackNavigator({Home:{
  screen:HomeScreen
}})

DashStack.navigationOptions = ({navigation}) => {
  
  const screenP = navigation.getScreenProps()
  
  return {
    tabBarLabel: screenP.t('home'),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home${focused ? '' : '-outline'}`
            : 'md-home'
        }
      />
    ),
  }
};


const EarningStack = createStackNavigator({
  Earnings
})

EarningStack.navigationOptions = ({navigation}) => {
  
  const screenP = navigation.getScreenProps()
  return {
    tabBarLabel: screenP.t('earnings'),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'logo-usd' : 'logo-usd'}
      />
    ),
  }
};

/*const SettingsStack = createStackNavigator({
  Refferels: LinksScreen,
  EditSettings:SettingsScreen
},{
  initialRouteName:'Refferels'
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Referrels',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'}
    />
  ),
};
*/

export default createBottomTabNavigator({
  DashStack,
  EarningStack
},);


