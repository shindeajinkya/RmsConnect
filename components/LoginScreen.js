//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView , AsyncStorage, ActivityIndicatorBase} from 'react-native';
import * as Font from 'expo-font';
import Axios from 'axios';

// create a component
class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      username: '',
      password: '',
      loading: false,
    }
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    });
    this.setState({ fontLoaded: true })
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      let obj = JSON.parse(value)
      if(obj.role == 'user'){
        this.setState({loading: true})
        this.props.navigation.navigate('UserViewDrawer', {name: `${obj.firstname} ${obj.lastname}`})
      }
      else{
        this.setState({loading: true})
        this.props.navigation.navigate('AdminViewDrawer', {name: `${obj.firstname} ${obj.lastname}`})
      }
    }
    else{
      this.setState({loading: true})
    }
  }

  render() {
      if(this.state.fontLoaded && this.state.loading){
      return (
        <View style={styles.container}>
            <View>
            <View style={styles.first}>
              <Text style={styles.greets}>Welcome!</Text>
            </View>
            <View style={styles.second}>

              <TextInput 
              style={styles.textbox} 
              onChangeText={(username) => this.setState({username})}
              placeholder="Username" 
              placeholderTextColor="rgba(255,140,4,0.54)" 
              />

              <TextInput 
              style={[styles.textbox, styles.textbox2]}
              onChangeText={(password) => this.setState({password})} 
              secureTextEntry 
              placeholder="Password" 
              placeholderTextColor="rgba(255,140,4,0.54)" 
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.login}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgetButton}>Forget Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.touchability} onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.accountButton} >Create a account</Text>
              </TouchableOpacity>

            </View>
            </View>
        </View>
      );
    }
    else {
      return <ActivityIndicator style={styles.container}/>
    }
  }
  login = () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    Axios.post('http://192.168.2.5:3000/auth', data)
    .then(res => {
      var obj = res.data;
      if(obj.success === true){
        AsyncStorage.setItem('user', JSON.stringify(obj))
        if(obj.role == 'admin'){
          this.props.navigation.navigate('AdminViewDrawer', obj);
        }else{
          this.props.navigation.navigate('UserViewDrawer', obj);
        }
      }else{
        alert("Wrong credentials")
      }
    })
    .catch(err => console.log(err))
    .done();
    // alert(JSON.stringify(data));
    // fetch(`http://192.168.2.4:3000/auth`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    //   })
    //   .then(response => response.json())
    //   .then((res => {
    //     var response = JSON.parse(res);
    //     console.log(response);
    //     if(response.success == true){
    //       AsyncStorage.setItem('user', res);
    //       this.props.navigation.navigate('Home');
    //     }else{
    //       alert("Wrong credentials")
    //     }
    //   })
    //   ).done()
  }
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#302F31',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greets: {
    flex: 1,
    color: '#FF8C04',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    fontFamily: 'Montserrat-Light',
    top: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  first: {
    flex: 1,
  },
  second: {
    flex: 2,
    top: 60,
  },
  textbox: {
    width: 279,
    height: 54,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#FFF',
    borderStyle: 'solid',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
    color: '#C4C4C4',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textbox2: {
    marginTop: 26,
    marginBottom: 26,
  },
  loginButton: {
    width: 200,
    height: 54,
    borderRadius: 15,
    backgroundColor: '#111011',
    marginLeft: 43,
    marginBottom: 32,
  },
  buttonText: {
    color: '#FF8C04',
    fontSize: 30,
    textAlign: "center",
    marginTop: 4,
    fontFamily: 'Montserrat-Light',
    marginTop: 6,
  },
  forgetButton: {
    width: 279,
    height: 54,
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    textDecorationLine: 'underline',
    color: '#FF8C04',
    textAlign: 'center',
  },
  accountButton: {
    width: 279,
    height: 54,
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    color: '#FF8C04',
    textDecorationLine: 'underline',
  },
});

//make this component available to the app
export default LoginScreen;
