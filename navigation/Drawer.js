import React from "react"
import {createDrawerNavigator,createStackNavigator} from "react-navigation"
import {Icon} from "expo"
import {Platform} from "react-native"
import TestScreen from "./../screens/TestScreen"
import SideMenu from "../components/SideMenu";
import MainTabNavigator from "./MainTabNavigator"
import ProfileView from "./../screens/ProfileView"
import History from "./../screens/History"

import RideDetail from "./../screens/RideDetail"

export const asset = (x,y) => Platform.OS == 'ios' ? x:y 

const HistoryStack = createStackNavigator({
    RideHistory:History,
    RideDetail:RideDetail,
},{
    initialRouteName:'RideHistory'
})


export default createDrawerNavigator({
    
    Ride:MainTabNavigator,
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
        screen:HistoryStack,
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
        screen:ProfileView,
        navigationOptions:{
            drawerLabel:'Settings',
            drawerIcon:({tintColor}) =><Icon.Ionicons name={asset('ios-options','md-options')} size={20} color={'black'} />
        }
    }

},{
    initialRouteName:'Ride',
        contentComponent:SideMenu
})