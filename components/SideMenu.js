import React,{useEffect,useState} from "react"
import {View,Image,AsyncStorage,Text} from "react-native"
import {Link,Space} from "./ButtonGroup"
import {DrawerItems} from "react-navigation"
import {Content} from "./text"
import { MAIN_API } from "./constants/api";

function TitleComponent(props){
    
    const [title, setTitle] = useState("")
    
    useEffect(() => {
       AsyncStorage.getItem('first_name').then(
           username =>{
               if (username) {
                   setTitle(username)
               }else{
                   setTitle("User Name")
               }
           }
       )

    }, [])
    return  <Content type={'heading'} align={'center'}>
    {title}
</Content>    

}

class WithProfile extends React.Component{
    state ={
        pic:""
    }
    componentDidMount() {
        AsyncStorage.getItem('profilePic').then( pic => this.setState(state=>({
            ...state,
            pic
        })))
    }

    render(){
        return this.props.children(this.state.pic)
    }
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
                        <WithProfile>
                            {
                                profilePic => (<View>
                                    <Image 
                                    source={
                                        profilePic != null 
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
                        </WithProfile>

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