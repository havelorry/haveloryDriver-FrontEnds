import React,{useState,useEffect} from "react"
import {View,FlatList,Text,Button,Alert} from "react-native"
import {ListItem} from "react-native-elements"
import {FontAwesome} from "@expo/vector-icons"
import { RideStatus, FetchDirections } from "../components/constants/api";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";


function RideDetail(props) {    
    
    const [ride,setRide] = useState([])
    const [id,setId] = useState(null)
    const [update,setUpdate] = useState(false)
    const updateRideStatus = (data) => {
        setUpdate(true)
        fetch(RideStatus,{
            method:'put',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then( r => r.json()).catch(err => console.log(err)).then(
            j => {
                setUpdate(false)
                Alert.alert('Info',j.message,[{
                    dismiss:()=>{
                        props.navigation.navigate('Home')
                    }
                }])
            }
        ).catch(err => {
            Alert.alert('Info',err.message,[
                {'dismiss':()=>{
                    props.navigation.navigate('Home')
                }}
            ])
        })
    }

    useEffect(()=>{
        const {ride} = props.navigation.state.params
        const details = [
            {key:'Destination'   ,value:ride.dest_string || 'unnamed location'},
            {key:'Start'         ,value:ride.origin_string || 'unnamed location'},
           {key:'status'        ,value:ride.status || 'unknown Status'},
//            {key:'Driver Contact',value:ride.driver.username || 'No Contact'}
        ]

        setRide(details)
        setId(ride.id)

        console.log('====================================');
        console.log(ride.status);
        console.log('====================================');
    },[])


    const getPath = (coord1,coord2) => {
        fetch(FetchDirections(coord1,coord2))
            .then( response => response.json())
            .then(respJson => {
                const path = respJson.routes[0].overview_polyline.points
                props.RideStore.setPathString(path)                        
            })
    }
    const {RideStore} = props
    return <View>
        <FlatList 
            keyExtractor ={(item,index) => index.toString()}
            data = {ride}
            renderItem={
                ({item}) => <ListItem 
                        title ={item.key}
                        subtitle={item.value}
                        leftIcon = {<FontAwesome name={'dot-circle-o'} size={20} color={'#000'}/>}
                        bottomDivider={true}
                />
            }
        />

        <View  style={{height:10}}/>     
       
       <Button
        style={{height:40}}
        disabled={ride['status'] == 'COMPLETED' || ride['status'] == 'CANCELLED'} 
        title={ update ? 'loading ...':'Get Directions'}
        
        onPress={
            
            () => {
                const {dest_latitude,origin_latitude,dest_longitude,origin_longitude} = props.navigation.state.params.ride
                console.log('====================================');
                const origin = `${origin_latitude},${origin_longitude}`
                const dest = `${dest_latitude},${dest_longitude}`
                console.log(
                    {
                        "CURR":props.RideStore.current,
                        origin,dest
                    }
                )
                /* RideStore.update({
                    latitude:origin_latitude,
                    longitude:origin_longitude
                },{
                    latitude:dest_latitude,
                    longitude:dest_longitude
                })

                props.navigation.navigate('Ride')
                */
                console.log('====================================');
            }        
        }
       />


       <View  style={{height:10}}/>     
       
       

       <View  style={{height:10}}/>

       {
       ride.status == "ACCEPTED" || ride.status == "CANCELLED"
       ? null :
       <Button
        style={{height:40}}
        disabled = {ride['status'] == 'COMPLETED' || ride['status'] == 'CANCELLED'} 
        title={update ? 'loading ...':'Cancel'}
        color={'#d00'}
        onPress={
            ()=> {
                updateRideStatus({
                    id,
                    status:4
                })
            }
        }
       />
}
    <View  style={{height:10}}/>
        
    <Button
        style={{height:40}} 
        title={update ? 'loading ...':'ACCEPT'}
        color={'#a00'}
        onPress={
            ()=> {
                updateRideStatus({
                    id,
                    status:2
                })
            }
        }
       />
     
    </View>
}

RideDetail.navigationOptions = {
    title:'Ride Details'
}

export default inject('RideStore')(observer(RideDetail));