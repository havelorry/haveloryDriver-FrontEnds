import React from "react"
import {AsyncStorage,View,Text,TextInput} from "react-native"
import {loginUrl, profileUrl} from "./../components/constants/api"
import { ListItem,Header } from 'react-native-elements'

export function transformInput(value){
    return value.indexOf('_') > -1 ? value.split('_').join(' ') :value 
}


export default class ProfileView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            formData:{},
            fields:[],
            readOnly:{}
        }
    }

    static navigationOptions = {
        title:'Settings'
    }

    componentDidMount() {
        AsyncStorage.getItem('username').then(
            (username) => {
                const url = profileUrl(username)
                fetch(url).then(
                    data => data.json()
                ).then(
                    j => {
                        this.setState(
                            state => ({
                                ...state,
                                readOnly:j,
                                fields:Object.keys(j)
                            })
                        )
                    }
                )
            }
        )
    }


    render(){
        const {readOnly} = this.state
        const entries = Object.entries(readOnly).map(
            ([key,value])=>{
                return {
                    left:transformInput(key),
                    right:value
                }
            }
        )

        return <View>

            <Header
            leftComponent={{ icon: 'menu', color: '#fff', onPress:()=>{
                this.props.navigation.toggledrawer()
            }}}
            
            centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
            {
                entries.map(
                    ({left,right},index) => <ListItem 
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
                                        property:left,
                                        inputValue:right
                                    }
                                })
                            }
                        }
                    />
                )
            }
        </View>
    }


}
