import React,{useEffect,useState} from 'react'
import { View, Text,AsyncStorage } from 'react-native'
import { earningUrl } from '../components/constants/api';
import { Divider } from 'react-native-elements';
import {NavigationEvents, withNavigation} from "react-navigation"
const CompactCard = {
    justifyContent:'center',
    alignItems:'center',
    width:'45%',
    height:120,
    elevation:1,
    borderRadius:10
}

const CompactText = {
    fontSize:55,
    color:'#fff',
    textAlign:'center'
}

const HeadngTxt = {
    fontSize:21,
    textAlign:'center',
    marginTop:10
}
const Card = ({text,color}) => <View style={[CompactCard,{backgroundColor:color}]}>
        
        <Text style={{...CompactText}}>
            {text}
        </Text>
</View>

const MoneyCard = withNavigation((props) => {
    
    const {navigation} = props
    const screenProps = navigation.getScreenProps()
        
    return (<View style={{width:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:30,paddingVertical:20}}>
    <Card {...props}/>

    <Divider />

    <Text style={HeadngTxt}>
        {screenProps.t(props.heading)}
    </Text>


</View>)
})

function Earning(){
    const [earning, setEarning] = useState(0)
    const [cancelled, setCancelled] = useState(0)
    const [completed, setCompleted] = useState(0)
    
    const getSumaries = (param) =>{
        fetch(earningUrl(param)).then(r => r.json())
                                .catch(err => console.log(err.message))
                                .then(summaries =>{
                                    console.log(summaries)
                                    const sume = summaries.summary
                                    const {total} = summaries
                                    const cancel = sume.filter(({status}) => status == 'CANCELLED').length
                                    const success = sume.filter(({status}) => status == 'COMPLETED').length
                                    setCancelled(cancel || 0)
                                    setCompleted(success || 0)
                                    setEarning(total || 0)
                                }).catch(err => console.log(err.message))
    }

    useEffect(() => {
        AsyncStorage.getItem('username').then(
            (userId) =>{
                console.log('====================================');
                console.log('called');
                console.log('====================================');
                    getSumaries(userId)
            }
        )
        return () => {
            console.log('CWUM called');
            
        };
    }, [])
    
    console.log({earning,cancelled,completed})
    return (
        <View style={{justifyContent:'space-around',alignItems:'center'}}>
            <NavigationEvents 
            onDidFocus={
                ()=>{
                    AsyncStorage.getItem('username').then(
            (userId) =>{
                console.log('====================================');
                console.log('called');
                console.log('====================================');
                    getSumaries(userId)
            }
        )
                }
            }
            />
            <MoneyCard color={'#d00'} text={cancelled} heading={'Cancelled Rides'}/>
            <MoneyCard color={'#0a0'} text={completed} heading={'Completed Rides'}/>
            <MoneyCard color={'#8e2be2'} text={`${earning} kd`} heading={'Total Earnings'}/>
        </View>
    )
}

Earning.navigationOptions = ({navigation}) =>{
    const screenProps = navigation.getScreenProps()
    return {
        title:screenProps.t('earnings')
    }
}

export default Earning