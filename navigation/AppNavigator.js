import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Drawer from "./Drawer"
import AuthLoadingScreen from "./../screens/AuthLoadingScreen"
import LoginScreen from "./../screens/LoginScreen"
import * as Localization from "expo-localization"
import i18n from "i18n-js"


const en = require('./../constants/lang/en.json')
const ar = require('./../constants/lang/ar.json')

i18n.translations  = {en,'en-GB':en,ar}


const  AppContainer =  createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth:AuthLoadingScreen,
  Main: Drawer,
  Login:LoginScreen
},{
  initialRouteName:'Auth'
}));

export default class AppWithLocalization extends React.Component {
  state = {
    locale: Localization.locale.search('en') !=-1?'en':'ar',
  };

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  render() {
    return (
      <AppContainer
        screenProps={{
          t: this.t,
          locale: this.state.locale,
          setLocale: this.setLocale,
        }}
      />
    );
  }
}

