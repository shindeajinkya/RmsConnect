//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Clipboard, AsyncStorage, ActivityIndicatorBase, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

// create a component
class ReferPage extends Component {
    constructor() {
        super()
        this.state = {
            link: 'http://192.168.2.5:3001',
            referralCode: '',
            clipboardContent: '',
            loading: false,
            name: ''
        }
    }

    static navigationOptions = {
        title: 'Referral',
        // header: (headerProps) => <Header {... headerProps} />,
    };

    componentDidMount = async() => {
        let objData = await AsyncStorage.getItem('user')
        let obj = JSON.parse(objData)
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        if(obj){
            this.setState({
                referralCode: obj._id,
                loading: true
            })
        }
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <Text style={styles.mainText}>{this.state.link}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.writeLinkClipBoard}>
                        <Text style={styles.buttonText}>Copy link!</Text>
                    </TouchableOpacity>
                    <Text style={styles.mainText}>{this.state.referralCode}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.writeCodeClipBoard}>
                        <Text style={styles.buttonText}>Copy Referral Code!</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return <ActivityIndicator style={styles.container} />
        }
    }

    writeLinkClipBoard = async() => {
        await Clipboard.setString(this.state.link)
        alert('Link Copied')
    }

    writeCodeClipBoard = async() => {
        await Clipboard.setString(this.state.referralCode)
        alert('Code Copied')
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#302F31'
    },
    mainText: {
        color: '#fff',
        marginBottom: 30,
        fontSize: 25,
        width: 300,
        textAlign: "center",
        fontFamily: 'Montserrat-Light',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#000',
        marginBottom: 30,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: '#FF8C04',
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
    }
});

//make this component available to the app
export default ReferPage;
