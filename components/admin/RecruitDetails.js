//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

// create a component
class RecruitDetails extends Component {
    constructor(){
        super()
        this.state = {
            recruitData: {},
            loading: false,
            fullname: ''
        }
    }

    componentDidMount = async() => {
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        this.setState({
            recruitData: this.props.navigation.state.params,
            loading: true,
        })
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <Text style={styles.mainText}>Full Name: {this.state.recruitData.fullname} {this.state.recruitData.secondname} {this.state.recruitData.lastname}</Text>
                    <Text style={styles.mainText}>Skills: {this.state.recruitData.skills}</Text>
                    <Text style={styles.mainText}>Education: {this.state.recruitData.education}</Text>
                    <Text style={styles.mainText}>Achievements: {this.state.recruitData.qualification}</Text>
                    <Text style={styles.mainText}>City: {this.state.recruitData.city}</Text>
                    <Text style={styles.mainText}>Email: {this.state.recruitData.email}</Text>
                </View>
            );
        }
        else{
            return <ActivityIndicator style={styles.container}/>
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#302F31',
        paddingLeft: 20,
        paddingTop:20
    },
    mainText: {
        color: '#fff',
        marginBottom: 20,
        fontFamily: 'Montserrat-Light',
    }
});

//make this component available to the app
export default RecruitDetails;
