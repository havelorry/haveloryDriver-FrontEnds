import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Drawer from "./Drawer"
import AuthLoadingScreen from "./../screens/AuthLoadingScreen"
import LoginScreen from "./../screens/LoginScreen"
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth:AuthLoadingScreen,
  Main: Drawer,
  Login:LoginScreen
},{
  initialRouteName:'Auth'
}));