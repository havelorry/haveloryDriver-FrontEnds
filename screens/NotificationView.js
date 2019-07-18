import React,{useEffect,useState} from "react"
import { View , Switch, AsyncStorage} from "react-native";
import {Header,ListItem} from "react-native-elements"
import {Bubbles} from "react-native-loader"
import { Notifications,Permissions} from "expo"

function parseBool(str) {

    if (str.length == null) {
      return str == 1 ? true : false;
    } else {
      return str == "true" ? true : false;
    }
  
}


function NotificationView(props){
   const [inProgress, setInProgress] = useState(false)
    const [enabled, setEnabled] = useState(false)
    useEffect(() => {
        AsyncStorage.getItem('notificationState').then(
            abool => {
                setEnabled(parseBool(abool))
            }
        )
    }, [])


    const askPermissions = async () => {
        const permissions = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        console.log('====================================');
        console.log(permissions);
        console.log('====================================');
        return 0
    }
    const valueChangeListener = (value) =>{
        if (parseBool(value)) {
            askPermissions().then(
                () => console.log('OPER FIN')
            )
            AsyncStorage.setItem('notificationState',"true")
        }else{
            AsyncStorage.setItem('notificationState',"false")
        }
    }

    return <View style={{flex:1}}>
        <Header
            leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{
                props.navigation.toggleDrawer()
            } }}
            centerComponent={{ text: 'Notifications', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />


        <ListItem 
            title={'Enable Notifications'}
            bottomDivider={true}
            topDivider={true}
            rightElement={
                <Switch 
                    value={enabled}
                    onValueChange={valueChangeListener}
                />
            }
        />
    </View>
}


export default NotificationView