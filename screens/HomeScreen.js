import React, { Component } from 'react';
import { Text, View, StyleSheet,Dimensions,Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import {Ionicons,FontAwesome} from "@expo/vector-icons"
import MapView,{Marker, Polyline} from "react-native-maps"
import { inject } from 'mobx-react';
import { observer } from 'mobx-react';

const {height} = Dimensions.get('window')

const Modded = inject('RideStore')(observer((props) =>{
  const {RideStore:{fixed, origin,dst}, current} = props
  console.log(props)

  return <React.Fragment>
    {
      props.current && <Marker coordinate={{...props.current}}>
      <FontAwesome name={'map-pin'} color={'#0d0'} size={32}/>
    </Marker>
    }
    {
      fixed ? <React.Fragment>
         <Marker coordinate={{...origin}}>
            <FontAwesome name={'map-pin'} color={'#d00'} size={32}/>
         </Marker>

         <Marker coordinate={{...dst}}>
            <FontAwesome name={'map-pin'} color={'#00d'} size={32}/>
         </Marker>

         {
          current && <Polyline 
          coordinates={[{...current},{...origin},{...dst}]}
          strokeColor={'#8e2be2'}
          strokeWidth={3}
        />
        }
      </React.Fragment>
      :null
    }
    
    
  </React.Fragment>
}))

class HomeScreen extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  static navigationOptions = ({ navigate, navigation }) => ({
    title:'Dashboard',
    headerRight: (
      <Ionicons 
        name={Platform.OS=='ios'?'ios-more':'md-more'}
        size={26}
        style={{ marginRight: 20 }}
        onPress={()=>Alert.alert('Worked')}
      />
    ),
  
    headerLeft:(
      <Ionicons 
        name={Platform.OS=='ios'?'ios-menu':'md-menu'}
        size={26}
        style={{ marginLeft: 10 }}
        onPress={()=> navigation.toggleDrawer()}
      />
    )
  })

  
  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    const  {latitude, longitude} = mapRegion
      
      const newRegion = this.state.mapRegion
      const oldLat = parseFloat(newRegion.latitude).toFixed(3)
      const oldLng = parseFloat(newRegion.latitude).toFixed(3)

      const newLat = latitude.toFixed(3)
      const newLng = longitude.toFixed(3)

      if (newLat - oldLat == 0 && newLng - oldLng == 0) {
        console.log('Equel coordinates making request is waste')
      }else{
        this.setState({ mapRegion });
      }  
  };

  componentWillReceiveProps(nextProps , nextState){
    console.log('=================NXT PRPS===============');
    console.log(nextProps);
    console.log(nextState);
    console.log('====================================');
  }
  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   this.props.RideStore.setCurrent(location.coords) 
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              style={{ alignSelf: 'stretch', height:height }}
              region={this.state.mapRegion}
              onRegionChangeComplete={this._handleMapRegionChange}
            >
              <Modded current={this.state.mapRegion}/>
            </MapView>
            
        }

                
      </View>
        
    );
  }
}


export default inject('RideStore')(observer(HomeScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
