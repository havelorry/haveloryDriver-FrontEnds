import React from "react"
import {AsyncStorage,View,Button,Image, ScrollView} from "react-native"
import {loginUrl, profileUrl,MAIN_API} from "./../components/constants/api"
import { ListItem,Header } from 'react-native-elements'
import {DocumentPicker} from "expo"
import {NavigationEvents} from "react-navigation"
import {FontAwesome} from "@expo/vector-icons"
export function transformInput(value){
    return value.indexOf('_') > -1 ? value.split('_').join(' ') :value 
}

export default class ProfileView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            formData:{},
            fields:[],
            readOnly:{},
            profileUrl:""
        }
    }

    static navigationOptions = {
        title:'Settings'
    }

    componentDidMount() {
        this.pullProfile();
    }


    pullProfile = () =>{
        AsyncStorage.getItem('username').then((username) => {
            const url = profileUrl(username);
            fetch(url).then(data => data.json()).then(j => {
                delete j['id']
                console.log('====================================');
                console.log(j);
                console.log('====================================');
                this.setState(state => ({
                    ...state,
                    readOnly: j,
                    fields: Object.keys(j),
                    profileUrl:j['profilePic']
                }));
            });
        });
    }

    uploadToServer = ({uri},username) => {
        const parts = uri.split('.')
        const fileType = parts[parts.length -1]
        let data = new FormData()
        const uploadURL = `${MAIN_API}/driver/image/`
        data.append('file',{
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        })

        data.append('username',username)

        return fetch(uploadURL,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            body:data
        })
    }

    operate = (functionCallback) => AsyncStorage.getItem('username').then(functionCallback).catch(err => console.log(err.message))
    
    selectFileWithUserName = (username) => {
       DocumentPicker.getDocumentAsync({
            type:'image/jpeg',
            copyToCacheDirectory:true
        }).then(
            result => {
                this.uploadToServer(result,username).then(res=>res.json()).then( response => {
                    this.pullProfile()
                })
            }
        ).catch(err => console.log(err.message))     
    }
    render(){
        const {readOnly} = this.state
        const entries = Object.entries(readOnly).filter(([key,_])=>key != "profilePic").map(
            ([key,value])=>{
                return {
                    left:transformInput(key),
                    original:key,
                    right:value
                }
            }
        )

        return <View>
            <NavigationEvents 
                onDidFocus={this.pullProfile}
            />

            <Header
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>{
                    this.props.navigation.navigate('Main')
                }}}
                backgroundColor={'#8a2be2'}
                centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress:()=>{
                    this.props.navigation.navigate('Main')
                } }}
                />

             <View style={{justifyContent:'center',alignItems:'center', maxHeight:200,paddingVertical:10}} >
                <Image 
                 source={
                     this.state.profileUrl != ""?{
                         uri:`${MAIN_API}/media/${this.state.profileUrl}`
                     }:require('./../assets/images/avatar.png')
                 }

                 style={{
                     width:100,
                     height:100,
                     borderWidth:2,
                     borderRadius:60
                 }}
                />

                 <View style={{height:10}}/>
               <FontAwesome 
                 name={'edit'}
                 color={'#8a2be2'}
                 size={32}
                 onPress={
                     ()=>{
                         this.operate(
                             (username)=>{
                               this.selectFileWithUserName(username)     
                             }
                         )
                     }
                 }
               />  
             </View>   

            <ScrollView>
            {
                entries.map(
                    ({left,right,original},index) => <ListItem 
                        key={index}
                        title={left && left}
                        subtitle={right && right}
                        rightIcon={
                            {
                                name:'arrow-forward'
                            }
                        }
                        bottomDivider={true} 
                        onPress= {
                            ()=>{
                                this.props.navigation.navigate({
                                    routeName:'EditSettings',
                                    params:{
                                        user:this.state.readOnly,
                                        property:original,
                                        inputValue:right
                                    }
                                })
                            }
                        }
                    />
                )
            }
            </ScrollView>
        </View>
    }


}
