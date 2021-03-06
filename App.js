import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import RideStore from "./stores/RideStore"
import HistoryStore from "./stores/HistoryStore"
import {Provider} from "mobx-react"
import { observer,inject } from "mobx-react";
import {NavigationContextProvider} from './navigation/NavigationContext'
import { NavigationContextConsumer } from './navigation/NavigationContext';

console.disableYellowBox = true

const stores = {
    RideStore,
    rides:HistoryStore
}

const AppWithState = (props) =>  <Provider {...stores}>
  <NavigationContextProvider>
    <NavigationContextConsumer>
      {
        (values) => (<AppNavigator {...values} />)
      }
    </NavigationContextConsumer>
  </NavigationContextProvider>
</Provider>

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppWithState />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
        'GothamMedium': require('./assets/fonts/GothamMedium.ttf'),
        'GothamBold': require('./assets/fonts/GothamBold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
