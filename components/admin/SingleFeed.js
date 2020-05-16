//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';

// create a component
class SingleFeed extends Component {
    constructor(){
        super()
        this.state = {
            loading: false,
            feedData: {},
        }
    }
    componentDidMount = async () => {
        this.setState({
            feedData: this.props.navigation.state.params,
            loading: true
        })
    }
    render() {
        if(this.state.loading){
            return (
                <ScrollView style={styles.container}>
                    <Text style={styles.subject}>{this.state.feedData.subject}</Text>
                    <Text style={styles.username}>By {this.state.feedData.username}</Text>
                    <Text style={styles.description}>{this.state.feedData.description}</Text>
                </ScrollView>
            );
        }else{
            return <ActivityIndicator style={styles.container}/>
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#302F31',
        // width: 
    },
    subject: {
        width: Dimensions.get('window').width,
        height: 'auto',
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 35,
        paddingVertical: 20,
        paddingHorizontal: 20,
        fontFamily: 'Montserrat-Light',
    },
    username: {
        color: '#fff',
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    description: {
        color: '#fff',
        paddingHorizontal: 20,
        fontFamily: 'Montserrat-Light',
        fontSize: 20,
        paddingBottom: 20,
    },
});

//make this component available to the app
export default SingleFeed;
