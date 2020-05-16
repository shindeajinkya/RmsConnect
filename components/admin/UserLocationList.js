//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import * as Font from 'expo-font';

// create a component
class UserLocationList extends Component {
    constructor(){
        super()
        this.state = {
            locationArray: [],
            loading: false,
        }
    }

    componentDidMount = async () =>{
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        await Axios.post('http://192.168.2.5:3000/gatherlocations')
        .then(res => {
            this.setState({locationArray: res.data.data, loading: true})
        })
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    {
                            this.state.locationArray.map(locationData => {
                                return <TouchableOpacity 
                                        onPress={() => this.goToMap(locationData)} 
                                        style={styles.locationList} 
                                        key={locationData._id}>
                                            <Text 
                                            style={styles.userText}
                                            >
                                            {locationData.firstname} {locationData.lastname}
                                            </Text>
                                        </TouchableOpacity>
                            })
                        }
                </View>
            );
        }
        else{
            return <ActivityIndicator style={styles.container}/>
        }
    }

    goToMap = (locationData) => {
        this.props.navigation.navigate('UserMapView', locationData)
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#302F31'
    },
    locationList: {
        width: Dimensions.get('window').width,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 20,
    },
    userText: {
        flex: 1,
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Light',
    }
});

//make this component available to the app
export default UserLocationList;
