import React,{useEffect,useState} from "react"
import {View,Image,AsyncStorage} from "react-native"
import {Link,Space} from "./ButtonGroup"
import {DrawerItems} from "react-navigation"
import {Content} from "./text"

function TitleComponent(props){
    
    const [title, setTitle] = useState("")
    
    useEffect(() => {
       AsyncStorage.getItem('username').then(
           username =>{
               if (username) {
                   setTitle(username)
               }
           }
       )

    }, [])
    return  <Content type={'heading'} align={'center'}>
    {title}
</Content>    

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
                            borderWidth:1
                        }}

                    >
                        <Image 
                            source={require('./../assets/images/avatar.png')}
                            style ={{
                                width:80,
                                height:80,
                                borderRadius:50
                            }}
                        />

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