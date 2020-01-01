import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './components/LoginScreen';
import CreateAccount from './components/CreateAccount';
import Constants from 'expo-constants';
import {Provider} from 'react-redux';
import store from './src/config/store'

const RootStack = createStackNavigator({
  Login: LoginScreen,
  Register: CreateAccount,
}, {
  initialRouteName: 'Login',
}
)

LoginScreen.navigationOptions = {
  header: null,
}

CreateAccount.navigationOptions = {
  header: null,
}

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (<Provider store={store}><AppContainer style={{ height: Constants.statusBarHeight }} /></Provider>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#302F31',
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.statusBarHeight,
  },
});
