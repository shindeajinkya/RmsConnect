//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as Font from 'expo-font';

// create a component
class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    }
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    });
    this.setState({ fontLoaded: true })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <View style={styles.first}>
            <Text style={styles.greets}>Welcome!</Text>
          </View>
        ) : (
            <ActivityIndicator size="large" />
          )}
        <View style={styles.second}>
          <TextInput style={styles.textbox} placeholder="Username" placeholderTextColor="rgba(255,140,4,0.54)" />
          <TextInput style={[styles.textbox, styles.textbox2]} secureTextEntry placeholder="Password" placeholderTextColor="rgba(255,140,4,0.54)" />
          <TouchableOpacity
            style={styles.loginButton}
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
    );
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
    top: 160,
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
