import React from 'react';
import {Input,Button,Card, Divider} from "react-native-elements"
import {View} from "react-native"
import {transformInput} from "./ProfileView"

import {saveProfile} from "./../components/constants/api"

export default class SettingsScreen extends React.Component {
  static navigationOptions = (navigation) =>({
    title:'Edit'
  })

  constructor(props){
    super(props)
    this.state ={

    }
  }


  componentDidMount() {
    this.setState(state=> ({
      ...this.state,
      ...this.props.navigation.state.params,
      saving:false
    }))  
  }

  render() {
    console.log('====================================');
    const {property,inputValue,user} = this.state
    console.log('====================================');
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={{flex:1}}>
       <Card title={property && transformInput(property)} titleStyle={{textAlign:'left'}}>
        <Input 
            placeholder={inputValue && inputValue}
            defaultValue={inputValue && inputValue}
            onChangeText= {
              (value) =>  {
                this.setState(state => ({
                  user:{
                    ...state.user,
                    [property]:value
                  }
                }))
              }
            }       
        />

        <Divider style={{ backgroundColor: '#eee' }} />
        <View style={{height:10}} />
        <Button
          onPress = {
            () => {
              fetch(saveProfile,{
                method:'post',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  ...this.state.user
                })
              }).then(
                (resp) => {
                  console.log(resp)
                  this.props.navigation.goBack()
                }
              ).catch(
                err => Alert.alert('Some error')
              )
            }
          }
          disabled={this.state.saving} 
          title={ this.state.saving ? 'Saving ...':'Save'}
        />
       </Card>
    </View>;
  }
}
