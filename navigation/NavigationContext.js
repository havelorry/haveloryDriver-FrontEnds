import React,{useState,useEffect} from 'react';
import {AsyncStorage} from "react-native"
const {Provider,Consumer} = React.createContext({})

export function NavigationContextProvider(props){
    const [displayName, setDisplayName] = useState("")
    const [profilePic, setProfilePic] = useState("")

    useEffect(()=>{
        AsyncStorage.multiGet(['first_name','profilePic']).then(values => {
            const [ [_,first_name],[__,p]] = values
            console.log('===============Navigtion Context =====================');
            console.log({first_name,p});
            setDisplayName(first_name)
            setProfilePic(p)
            console.log('====================================');
        })
        
    })
 return <Provider value={{profilePic,displayName,setDisplayName,setProfilePic}}>
     {props.children}
 </Provider>
}

export const NavigationContextConsumer = Consumer;