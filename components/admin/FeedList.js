//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import Axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// create a component
class FeedList extends Component {
    constructor(){
        super();
        this.state = {
            listArray: [],
            loading: false
        }
    }

    componentDidMount = async () => {
        let user = await AsyncStorage.getItem('user')
        let userData = JSON.parse(user)
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        if(userData){
            await Axios.post("http://192.168.2.5:3000/allfeeds")
            .then(res => {
                this.setState({listArray: res.data, loading: true})
            })
            .catch(err => console.log(err))
        }else{
            this.props.navigation.navigate('SignedOut')
        }
    }

    render() {
        if(this.state.loading){
            return (
            <ScrollView style={styles.container}>
                {
                    this.state.listArray.map(feed => {
                        return <TouchableOpacity 
                                onPress={() => this.goToFeed(feed.subject, feed.description, feed.username)} 
                                style={styles.feed} 
                                key={feed.subject}>
                                    <Text style={styles.feedText}>{feed.subject}</Text>
                                </TouchableOpacity>
                    })
                }
            </ScrollView>
            )
        }else{
            return <ActivityIndicator style={styles.container}/>
        }
    }
    goToFeed = (subject, description, username) => {
        this.props.navigation.navigate('SingleFeedView', {subject, description, username})
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#302F31'
    },
    feed: {
        width: Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 10,
    },
    feedText: {
        flex: 1,
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Light',
    }
});

//make this component available to the app
export default FeedList;
