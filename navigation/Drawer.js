import React from "react"
import {createDrawerNavigator} from "react-navigation"
import {Icon} from "expo"
import {Platform} from "react-native"
import TestScreen from "./../screens/TestScreen"
import HomeScreen from './../screens/HomeScreen'
import SideMenu from "../components/SideMenu";
// import SideMenu from "./../components/SideMenu"

export const asset = (x,y) => Platform.OS == 'ios' ? x:y 

export default createDrawerNavigator({
    
    Ride:{
        screen:HomeScreen,
        navigationOptions:{
            drawerLabel:'My Rides',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-car','md-car')} size={20} color={'black'} />
        }
    },
    Stats:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'Driver Stats',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-card','md-card')} size={20} color={'black'} />
        }
    },
    Notifications:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'Notifications',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-notifications-outline','md-notifications-outline')} size={20} color={'black'} />
        }
    },
    Invites:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'My Referels',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-gift','md-gift')} size={20} color={'black'} />
        }
    },
    History:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'Ride History',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-refresh','md-refresh')} size={20} color={'black'} />
        }
    },
    
    Help:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'Help',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-help','md-help')} size={20} color={'black'} />
        }
    },
    Settings:{
        screen:TestScreen,
        navigationOptions:{
            drawerLabel:'Settings',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-options','md-options')} size={20} color={'black'} />
        }
    }

},{
    initialRouteName:'Ride',
        contentComponent:SideMenu
})