import React from 'react';
import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {Provider} from 'react-redux';
import store from './src/config/store';
import { AppContainer } from './components/routes';
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
