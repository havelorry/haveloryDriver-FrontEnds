import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import Button from "../components/Button";
import {FormTextInput} from "./../components/FormTextInput";
import imageLogo from "../assets/images/logo.jpeg";
import { Platform,Alert,AsyncStorage } from "react-native";


const {loginUrl} = require('./../components/constants/api')

const strings = {
    LOGIN: "Log In",
    WELCOME_TO_LOGIN: "Welcome to the login screen!",
    EMAIL_PLACEHOLDER: "username",
    PASSWORD_PLACEHOLDER: "Password",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required"
  };


class LoginScreen extends React.Component {
  passwordInputRef = React.createRef();

  constructor(props){
      super(props)
      this.state = {
        email: "",
        password: "",
        emailTouched: false,
        passwordTouched: false,
        fetching:false
    }
  }



  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  handleLoginPress = () => {
    this.setState({fetching:true})
    
    console.log(JSON.stringify({
      username:this.state.email,
      password:this.state.password
    }))
    
    fetch(loginUrl,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:this.state.email,
        password:this.state.password
      })
    }).then(resp => resp.json())
      .catch(err =>{
        this.setState({fetching:true})
      })
      .then(result => {
        const {token= null,driverId=null} = result
        if (token && driverId) {
          AsyncStorage.setItem('token',token).then(
            ()=> {
              AsyncStorage.setItem('username',this.state.email).then(
                ()=> {
                  AsyncStorage.setItem('userId',`${driverId}`).then(
                    ()=> {
                      this.props.navigation.navigate('Auth')
                    }
                  )
                  
                }
              )
            }
          )

        }else{
          const {error} = result
          Alert.alert('Login Failed',error,[
            {
              text:'dismiss',
              onPress:()=>{
                this.setState({
                  email: "",
                  password: "",
                  emailTouched: false,
                  passwordTouched: false,
                  fetching:false
              })
              }
            }
          ])
        }

        this.setState({fetching:true})
      }).catch(w => {
        this.setState({fetching:true})
      })
  };

  render() {
    const {
      email,
      password,
      emailTouched,
      passwordTouched
    } = this.state;
    const emailError =
      !email && emailTouched
        ? strings.EMAIL_REQUIRED
        : undefined;
    const passwordError =
      !password && passwordTouched
        ? strings.PASSWORD_REQUIRED
        : undefined;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // On Android the keyboard behavior is handled
        // by Android itself, so we should disable it
        // by passing `undefined`.
        behavior={Platform.OS=="ios" ? "padding" : 'padding'}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={strings.EMAIL_PLACEHOLDER}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onBlur={this.handleEmailBlur}
            error={emailError}
            // `blurOnSubmit` causes a keyboard glitch on
            // Android when we want to manually focus the
            // next input.
            blurOnSubmit={Platform.OS=="ios"}
          />
          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
          <Button
            label={this.state.fetching ? 'Logging In ..':strings.LOGIN}
            onPress={this.handleLoginPress}
            disabled={!email || !password}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;
