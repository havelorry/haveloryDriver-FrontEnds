import React from "react"
import {View,Image,ActivityIndicator,AsyncStorage} from 'react-native'
// import AsyncStorage from "@react-native-community/async-storage"
export default class AuthLoadingScreen extends React.Component {

    static navigationOptions = {
        header:null
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem('token')
        if(token)
            this.props.navigation.navigate('Main')
        else
        this.props.navigation.navigate('Login')
    }

    render(){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image
             style={{
                 height:100,
                 width:250
             }} 
             source ={require('./../assets/images/logo.jpeg')}
            />

            <ActivityIndicator 
             size={"large"}
             color={'#8a2be2'}
            />
        </View>
    }
}

