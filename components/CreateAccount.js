//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

// create a component
class CreateAccount extends Component {
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
      <KeyboardAvoidingView behavior='height'>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {this.state.fontLoaded ? (
            <View style={styles.first}>
              <Text style={styles.greets}>Create Your Account</Text>
            </View>
          ) : (
              <ActivityIndicator size="large" />
            )}
          <View style={styles.second}>
            <TextInput multiline={true} style={styles.textbox} placeholder="First name" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox2]} placeholder="Middle name" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox3]} placeholder="Last name" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox3]} placeholder="Age" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox3]} placeholder="Gender" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox3]} placeholder="Group Code" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} keyboardType='phone-pad' style={[styles.textbox, styles.textbox3]} placeholder="Phone Number" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TextInput multiline={true} style={[styles.textbox, styles.textbox3]} placeholder="Email" placeholderTextColor="rgba(255,140,4,0.54)" />
            <TouchableOpacity
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Sign Up!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchability} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.accountButton} >Back to Login?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#302F31',
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.statusBarHeight,
  },
  scrollview: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#302F31',
    alignItems: 'center',
    display: 'flex',
  },
  greets: {
    flex: 1,
    color: '#FF8C04',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    fontFamily: 'Montserrat-Light',
    top: 51,
    textAlign: 'center',
  },
  first: {
    flex: 1,
    width: 275,
  },
  second: {
    flex: 2,
    top: 80,
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
  textbox3: {
    marginBottom: 26,
  },
  loginButton: {
    width: 200,
    height: 54,
    borderRadius: 15,
    backgroundColor: '#111011',
    marginLeft: 43,
  },
  buttonText: {
    color: '#FF8C04',
    fontSize: 30,
    textAlign: "center",
    marginTop: 4,
    fontFamily: 'Montserrat-Light',
  },
  accountButton: {
    width: 279,
    height: 54,
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    color: '#FF8C04',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

//make this component available to the app
export default CreateAccount;
