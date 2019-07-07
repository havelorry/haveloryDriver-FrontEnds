import React,{useState, useEffect} from "react"
import { HistoryUrl, driverHistory } from "../components/constants/api";
import {ListItem} from "react-native-elements"
import {FlatList,View,AsyncStorage} from "react-native"
import {FontAwesome} from "@expo/vector-icons"
import {Bubbles} from "react-native-loader"
function History(props){
    const [history, setHistory] = useState([])
    const [loading,setLoading] = useState(false)

    const FetchHistory = (link) => {
        console.log(link)
        fetch(link).then(
            res => res.json() 
        ).catch(err => console.log(err))
        .then(data => {
            console.log(data)
            setHistory(data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    useEffect(()=> {

        setLoading(true)
        AsyncStorage.getItem('username').then(
            driver => {
                FetchHistory(driverHistory(driver))
            }
        )
        
    },[])

    console.log('HISTORY'+history)
    return (<View style={{flex:1}}>
        
        {
            loading 
            &&
            <View style = {{height:50,justifyContent:'center', alignItems:'center'}}>
                <Bubbles size={10}/>
            </View>
        }

        {
            (!loading)
             &&
            <FlatList 
                keyExtractor = { (item,index) => index.toString()}
                data={history}
                renderItem = {
                    ({item}) => <ListItem 
                        title= {item.status}
                        subtitle=  {
                            item.dest_string
                        }

                        leftIcon={
                            <FontAwesome 
                             name='dot-circle-o'
                             size={22}
                             color={'#8e2be2'}
                            />
                        }

                        rightIcon={
                            <FontAwesome 
                                name="chevron-right" 
                                size={22}
                                color={'#000'}
                                onPress={
                                    ()=>{
                                        props.navigation.navigate('RideDetail',{
                                            ride:{
                                                ...item
                                            }
                                        })
                                    }
                                }
                            />
                            
                        }
                    />
                }
                
            
            />
            
        }
    </View>)
}

History.navigationOptions ={
    title:'Ride History'
}

export default History