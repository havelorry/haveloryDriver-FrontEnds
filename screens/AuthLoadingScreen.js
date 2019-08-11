import React from "react"
import {View,Image,ActivityIndicator,AsyncStorage} from 'react-native'
import {profileUrl} from "./../components/constants/api"

export default class AuthLoadingScreen extends React.Component {

    static navigationOptions = {
        header:null
    }

    async componentDidMount(){
        console.log('====================================');
        console.log('ON MOUNT');
        console.log('====================================');
        const token = await AsyncStorage.getItem('token')
        if(token)
            await AsyncStorage.getItem('username').then(username => {
                this.pullProfile(username,()=>{
                    console.log('============PULLING========================');
                    this.props.navigation.navigate('Main')
                    console.log('====================================');
                    
                })
            })
            
        else
            this.props.navigation.navigate('Login')

    
    }

    pullProfile = (token,callBack) => {
        fetch(profileUrl(token)).then(response => response.json())
        .then( async data => {
                     const {first_name , profilePic} = data
                     console.log('====================================');
                     await AsyncStorage.multiSet([
                         ['first_name',first_name],
                         ['profilePic',profilePic]
                     ])
                     console.log('====================================');
                    callBack()
            })
        .catch(err => console.log(err))
            
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

