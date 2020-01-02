import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import CreateAccount from './CreateAccount';
import Home from './Home';

const SignedOut = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: CreateAccount,
        navigationOptions: {
            header:null,
        }
    },
    HomeScreen: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    }
  }, {
    initialRouteName: 'Login',
  }
)

const AppContainer = createAppContainer(SignedOut);

export {
    SignedOut,
    AppContainer
}