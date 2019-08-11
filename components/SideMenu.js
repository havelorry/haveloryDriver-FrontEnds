import React,{useEffect,useState} from "react"
import {View,Image,AsyncStorage,Text} from "react-native"
import {Link,Space} from "./ButtonGroup"
import {DrawerItems} from "react-navigation"
import {Content} from "./text"
import { MAIN_API } from "./constants/api";
import {NavigationContextConsumer} from "./../navigation/NavigationContext"
function TitleComponent(props){

    return  <NavigationContextConsumer>
        {
        ({displayName}) =>(<Content type={'heading'} align={'center'}>
            {
               displayName
            }
        </Content>)
        }
    </NavigationContextConsumer>    

}



export default class SideMenu extends React.Component {

    constructor(props){
        super(props)
       
    }

    render(){
        return <View>
                    <View 
                        style={{
                            backgroundColor: '#fff',
                            width:'100.3%',
                            height: 180,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomColor:'#eee',
                            borderWidth:1,
                            marginTop:30
                        }}

                    >
                        <NavigationContextConsumer>
                            {
                                ({profilePic}) => (<View>
                                    <Image 
                                    source={
                                        (profilePic != "" || profilePic !== null) 
                                        ?
                                        {uri:`${MAIN_API}/media/${profilePic}`}
                                        :
                                        require('./../assets/images/avatar.png') 
                                    }
                                    style ={{
                                        width:80,
                                        height:80,
                                        borderRadius:50
                                    }}
                                />
                                
                            </View>)
                            }
                        </NavigationContextConsumer>

                        <Space/>

                        <TitleComponent />    
                        <Space/>

                        <Link isUnderlined={false} color={'#8a2be2'} onPress={
                            ()=> {
                                this.props.navigation.navigate('Settings')
                            }
                        }>
                        View Profile
                        </Link>    
                    </View>
                    <DrawerItems {...this.props} />

        </View> 

    }
}