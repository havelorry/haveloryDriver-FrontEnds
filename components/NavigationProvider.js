import React from "react"
import {Platform,PermissionsAndroid,AsyncStorage} from "react-native"
import {updateLocationUrl} from "./../components/constants/api"
async function requestPermissions(func){
    if (Platform.OS == 'android') {
        try {
         const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
         if (check) {
             console.log('permission already exists')
             await func()
         }else{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title:'Location request',
                    message:'Havelorry requires Location permissions',
                    buttonNeutral:'Ask me later',
                    buttonNegative:'cancel',
                    buttonPositive:'Grant'
                }
            )


            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permission have taken')
                await func()
            }else{
                console.log('permisson denied')
            }
         }    

        } catch (error) {
            console.log(error.message);    
        }
    }
}



class LocationProvider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lat:0,
            lng:0,
            fetched:false,
            region:{},
        }

        this.watchId = null
        this.changeRegion = this.changeRegion.bind(this)
        this.getLocation = this.getLocation.bind(this)
    }

    _updateRegion = (region) => {
        console.log('working')
        AsyncStorage.getItem('username').then(
          name => {
              const {latitude:x,longitude:y} = region
              url = updateLocationUrl
              fetch(url,{
                  method:'post',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                      active:1,
                      username:name,
                      location:JSON.stringify({
                        x,y
                        })
                  })
              })
              .then( res => res.json())
              .then(res => console.log(res))

          }
        )    
      }

      
    async getLocation(){
        await navigator.geolocation.getCurrentPosition(
            (postion) => {
                console.log(postion)
                this.setState(
                    state => ({
                        ...state,
                        lat:postion.coords.latitude,
                        lng:postion.coords.longitude,
                        fetched:true,
                    }),
                    ()=> {
                        console.log('====================================');
                        this._updateRegion(postion.coords)
                        console.log('====================================');
                    }
                )
            },
            (error) => {
                console.log(error);
                                
            }
        )
    }



    changeRegion(region){
        this.setState(state =>({...state,lat:region.latitude,lng:region.longitude}))
    }

    async componentDidMount(){
        await  requestPermissions(
            this.getLocation
        )
    }
    render() {
        const {lat,lng, fetched, region} = this.state
      return <React.Fragment>
          {
              this.props.children({
                lat ,lng ,fetched ,region, c:this.changeRegion                  
              })
          }
      </React.Fragment>
    }


    componentWillUnmount(){
        if (this.watchId != null) {
            navigator.geolocation.clearWatch(this.watchId)
        }
    }
}


export default LocationProvider