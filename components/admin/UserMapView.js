//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// create a component
class UserMapView extends Component {
    constructor(){
        super()
        this.state = {
            locationData: {},
            loading: false,
            fullname: '',
        }
    }

    componentDidMount = () => {
        const obj = this.props.navigation.state.params
        this.setState({
            locationData: obj, 
            loading: true,
            fullname: obj.firstname + ' ' + obj.lastname,
        })
    }

    render() {
        if(this.state.loading){
            return (
                <MapView
                    style={{
                    flex: 1
                    }}
                    initialRegion={{
                    latitude: this.state.locationData.location.latitude,
                    longitude: this.state.locationData.location.longitude,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0021
                    }}
                >
                    <Marker 
                    coordinate={{
                    latitude: this.state.locationData.location.latitude,
                    longitude: this.state.locationData.location.longitude
                    }}
                    title={this.state.fullname}
                    >
                        {/* <Text>{this.state.locationData.firstname} {this.state.locationData.lastname}</Text> */}
                    </Marker>
                </MapView>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default UserMapView;
