//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

// create a component
class RecruitList extends Component {
    constructor(){
        super()
        this.state = {
            recruitsArray: [],
            loading: false,
        }
    }

    componentDidMount = async() => {
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        await Axios.post('http://192.168.2.5:3000/giveallrecruits')
        .then(res => {
            this.setState({ recruitsArray: res.data.data, loading: true })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if(this.state.loading){
            return (
                <ScrollView style={styles.container}>
                    {
                        this.state.recruitsArray.map(recruit => {
                            return <TouchableOpacity 
                                    onPress={() => {this.goToFeed(recruit)}}
                                    style={styles.recruit}
                                    key={recruit._id}>
                                <Text style={styles.recruitText}>{recruit.fullname} {recruit.lastname}</Text>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
            );
        }
        else{
            return <ActivityIndicator style={styles.container} />
        }
    }
    goToFeed = (recruit) => {
        // console.log(recruit)
        this.props.navigation.navigate('RecruitDetails', recruit)
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#302F31'
    },
    recruit: {
        width: Dimensions.get('window').width,
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 20,
    },
    recruitText: {
        flex: 1,
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Light',
    }
});

//make this component available to the app
export default RecruitList;
