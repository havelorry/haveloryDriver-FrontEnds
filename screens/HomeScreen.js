import React, { Component } from 'react';
import { Text, View, StyleSheet,Dimensions,Platform,AsyncStorage } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import {Ionicons,FontAwesome} from "@expo/vector-icons"
import MapView,{Marker, Polyline} from "react-native-maps"
import { inject } from 'mobx-react';
import { observer } from 'mobx-react';
import {updateLocationUrl} from "./../components/constants/api"
const {height} = Dimensions.get('window')

const PolyLine = require('@mapbox/polyline')

const Modded = inject('RideStore')(observer((props) =>{
  const {RideStore:{fixed, origin,dst,path}, current} = props
  
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
          current && path && path.length > 0 && <Polyline 
          coordinates={[{...current},...path]}
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
    locationResult: null,
    path:[]
  };


  _resetPath = () => {this.setState(state=> ({...state,path:[]}))}


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
    console.log('====================================');
    console.log(this.props.RideStore);
    console.log('====================================');
    this._getLocationAsync();
    this._watchPostion()
  }

  
  updateLocation = (data) =>{
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      fetch(updateLocationUrl,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }).then(jso => {
        console.log('LOcation Updated')
        return jso.json()
      }).then(d => console.log(d)).catch(err => console.log(err.message))
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


  _watchPostion = () =>{
    this.watchId = navigator.geolocation.watchPosition((position) =>{
      const {coords} =position
      const {latitude,longitude} = coords
      AsyncStorage.getItem('username').then(
        username => {
          if(username){
           this.updateLocation({
             location:JSON.stringify({
               x:latitude,
               y:longitude
             }),
             username,
             active:1
          })

         }else{
           console.log("USERNAME NOT FOUND");
         }
        }
      )   
    })
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

   AsyncStorage.getItem('username').then(
     username => {
       if(username){
        this.updateLocation({
          location:JSON.stringify({
            x:location.coords.latitude,
            y:location.coords.longitude
          }),
          username,
          active:1
       })
      }else{
        console.log("USERNAME NOT FOUND");
      }
     }
   ) 
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };


  componentWillUnmount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId)
    }
  }

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
              <Modded 
                  
                  current={this.state.mapRegion} 
                  path={this.state.path}
                  reset={this._resetPath}
                  
                  />
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
