import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from 'react-native';
import { WebBrowser,Icon,MapView, PROVIDER_GOOGLE } from 'expo';

import { MonoText } from '../components/StyledText';
import LocationProvider from '../components/NavigationProvider';
import MainTabNavigator from './../navigation/MainTabNavigator';

const latitudeDelta= 0.0922 
const longitudeDelta= 0.0421

export default class HomeScreen extends React.Component {
  
  static navigationOptions = ({ navigate, navigation }) => ({
    title:'Dashboard',
    headerRight: (
      <Icon.Ionicons 
        name={Platform.OS=='ios'?'ios-more':'md-more'}
        size={26}
        style={{ marginRight: 20 }}
        onPress={()=>Alert.alert('Worked')}
      />
    ),

    headerLeft:(
      <Icon.Ionicons 
        name={Platform.OS=='ios'?'ios-menu':'md-menu'}
        size={26}
        style={{ marginLeft: 10 }}
        onPress={()=> navigation.toggleDrawer()}
      />
    )
  })


  componentDidMount() {
    // this.props.navigation.toggleDrawer()
  }
  
  

  render() {
    return (
      <View style={styles.container}>
        <LocationProvider>
          {value=>(<MapView 
            style={{
              flex:1
            }}

            region={{ 
              latitude:value.lat,
              longitude:value.lng,
              latitudeDelta,
              longitudeDelta
             }}
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete={
              (region) =>{
                value.c(region)
                
              }
            }
        />)}
        </LocationProvider>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
